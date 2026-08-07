"use client";

import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';
import Script from 'next/script';

import ShopHeader from '@/components/ShopHeader';
import Footer from '@/components/Footer';
import { 
  setShippingAddress, 
  getShippingOptions, 
  addShippingMethod, 
  createPaymentCollection, 
  initializePaymentSession,
  completeCart, 
  MedusaCart,
  fetchApi
} from '@/lib/medusa';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), { ssr: false });
const SideNavs = dynamic(() => import("@/components/SideNavs"), { ssr: false });
const Modals = dynamic(() => import("@/components/Modals"), { ssr: false });

function formatPrice(amount: number, currencyCode: string = 'inr') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, loading: cartLoading, refreshCart } = useCart();
  const { customer } = useAuth();
  
  const [submitting, setSubmitting] = useState(false);
  
  // Shipping and tax settings loaded from public store endpoint
  const DEFAULT_DELIVERY_ESTIMATE = "Within 3-5 working days";

  const [flatShippingRate, setFlatShippingRate] = useState<number>(70);
  const [shippingGst, setShippingGst] = useState<number>(18);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState<number>(999);
  const [deliveryEstimate, setDeliveryEstimate] = useState<string>(DEFAULT_DELIVERY_ESTIMATE);

  // Page loading state (only for initial mount)
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    console.log("[Checkout] Fetching /store/client-settings...");
    fetchApi<{ flat_shipping_rate: number; shipping_gst: number; free_shipping_threshold: number; delivery_estimate: string }>('/store/client-settings')
      .then(data => {
        console.log("[Checkout] /store/client-settings RAW response:", JSON.stringify(data));
        console.log("[Checkout] response.delivery_estimate raw value:", data.delivery_estimate, "type:", typeof data.delivery_estimate, "length:", typeof data.delivery_estimate === 'string' ? data.delivery_estimate.length : 'N/A');

        if (data.flat_shipping_rate !== undefined && data.flat_shipping_rate !== null) {
          const n = Number(data.flat_shipping_rate);
          if (!isNaN(n)) setFlatShippingRate(n);
        }
        if (data.shipping_gst !== undefined && data.shipping_gst !== null) {
          const n = Number(data.shipping_gst);
          if (!isNaN(n)) setShippingGst(n);
        }
        if (data.free_shipping_threshold !== undefined && data.free_shipping_threshold !== null) {
          const n = Number(data.free_shipping_threshold);
          if (!isNaN(n)) setFreeShippingThreshold(n);
        }
        const rawEstimate = data.delivery_estimate;
        const safeEstimate = (typeof rawEstimate === "string" && rawEstimate.trim() !== "")
          ? rawEstimate
          : DEFAULT_DELIVERY_ESTIMATE;
        console.log("[Checkout] Setting deliveryEstimate state to:", safeEstimate, "(fallback used:", safeEstimate === DEFAULT_DELIVERY_ESTIMATE, ")");
        setDeliveryEstimate(safeEstimate);
      })
      .catch(err => {
        console.error("[Checkout] Error loading store settings for checkout:", err);
      });
  }, []);

  useEffect(() => {
    if (!cartLoading) {
      setIsInitialLoading(false);
    }
  }, [cartLoading]);

  useEffect(() => {
    console.log("[Checkout] deliveryEstimate state CHANGED:", deliveryEstimate, "type:", typeof deliveryEstimate, "length:", typeof deliveryEstimate === 'string' ? deliveryEstimate.length : 'N/A');
  }, [deliveryEstimate]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [province, setProvince] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  // Saved addresses from the customer profile
  const savedAddresses = (customer as any)?.addresses || [];

  const applyAddress = (addr: any) => {
    setSelectedAddressId(addr.id || null);
    setFirstName(addr.first_name || customer?.first_name || '');
    setLastName(addr.last_name || customer?.last_name || '');
    setPhone(addr.phone || customer?.phone || '');
    setAddress1(addr.address_1 || '');
    setCity(addr.city || '');
    setProvince(addr.province || '');
    setPostalCode(addr.postal_code || '');
  };

  // Pre-fill fields from customer profile / default saved address
  useEffect(() => {
    if (customer) {
      const cust = customer as any;
      if (!email) setEmail(cust.email || '');
      if (!firstName) setFirstName(cust.first_name || '');
      if (!lastName) setLastName(cust.last_name || '');
      if (!phone) setPhone(cust.phone || '');

      if ((cust.addresses && cust.addresses.length > 0) && !selectedAddressId && !address1) {
        const def = cust.addresses.find((a: any) => a.is_default_shipping) || cust.addresses[0];
        applyAddress(def);
      }
    }
  }, [customer]);

  async function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    if (!cart) return;
    setSubmitting(true);

    try {
      const cartId = cart.id;

      const updatedCart = await setShippingAddress(cartId, {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address_1: address1,
        city,
        postal_code: postalCode,
        province,
        country_code: 'in',
      });

      const options = await getShippingOptions(cartId);
      if (options && options.length > 0) {
        const isFree = (cart?.subtotal || 0) >= (freeShippingThreshold * 100);
        const targetOption = options.find(o => isFree ? o.name === "Free Shipping" : o.name === "Standard Shipping") || options[0];
        await addShippingMethod(cartId, targetOption.id);
      }

      const pcRes = await createPaymentCollection(cartId);
      const paymentCollectionId = pcRes.payment_collection.id;

      // Initialize Razorpay payment session
      const payCol = await initializePaymentSession(paymentCollectionId, "pp_razorpay_razorpay");
      
      const razorpaySession = payCol.payment_collection?.payment_sessions?.find(
        (s: any) => s.provider_id === "pp_razorpay_razorpay"
      );

      const razorpayOrder = razorpaySession.data?.razorpayOrder;

      if (!razorpaySession || !razorpaySession.data || !razorpayOrder || !razorpayOrder.id) {
        console.error("Could not find Razorpay session data. Available sessions:", payCol.payment_collection?.payment_sessions);
        throw new Error("Could not initialize Razorpay payment session properly. Please ensure the backend is running and the Razorpay provider is registered in the active region.");
      }

      const razorpayOrderId = razorpayOrder.id;
      const razorpayAmount = razorpayOrder.amount;

      if (!(window as any).Razorpay) {
        throw new Error("Razorpay SDK not loaded. Please wait a moment and try again.");
      }

      const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY || '';

      if (!razorpayKey || razorpayKey === 'rzp_test_your_key_id') {
        throw new Error("Please configure your NEXT_PUBLIC_RAZORPAY_KEY in the frontend .env.local file.");
      }

      const rzpOptions = {
        key: razorpayKey,
        amount: razorpayAmount,
        currency: 'INR',
        name: 'Ocean Student Projects',
        description: 'Order Payment',
        order_id: razorpayOrderId,
        handler: async function (response: any) {
          try {
            // Verify signature on backend via fetchApi (sends publishable API key header)
            await fetchApi<any>(`/store/razorpay/callback`, {
              method: 'POST',
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
          } catch (e) {
            console.error("Signature verification response check:", e);
          }
          
          try {
            // Complete the cart to create the order
            const completeRes = await completeCart(cartId);
            if (completeRes && completeRes.order) {
              localStorage.setItem('medusa_order_id', completeRes.order.id);
              localStorage.removeItem('medusa_cart_id');
              window.location.href = `/order-confirmation?orderId=${completeRes.order.id}`;
            } else {
              localStorage.removeItem('medusa_cart_id');
              window.location.href = `/order-confirmation`;
            }
          } catch (err: any) {
            console.error("Cart completion error:", err);
            localStorage.removeItem('medusa_cart_id');
            window.location.href = `/order-confirmation`;
          }
        },
        prefill: {
          name: `${firstName} ${lastName}`,
          email: email,
          contact: phone,
        },
        theme: {
          color: '#c85a17',
        },
      };

      const rzp = new (window as any).Razorpay(rzpOptions);
      rzp.open();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "An error occurred during checkout. Please verify your details.");
    } finally {
      setSubmitting(false);
    }
  }

  const currency = cart?.region?.currency_code || 'inr';
  const itemCount = cart?.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;

  const subtotal = cart?.items?.reduce((sum, i) => sum + (i.unit_price * i.quantity), 0) || 0;
  const isFree = subtotal >= freeShippingThreshold;
  const displayShipping = isFree ? 0 : flatShippingRate;
  const displayTotal = subtotal + displayShipping;
  const shippingTax = isFree ? 0 : Math.round(displayShipping * (1 - 1 / (1 + shippingGst / 100)));
  const productTax = Math.round((subtotal - (cart?.discount_total || 0)) * (1 - 1 / 1.18));
  const displayedTax = productTax + shippingTax;
  const amountNeeded = freeShippingThreshold - subtotal;

  if (isInitialLoading) {
    return (
      <>
        <ShopHeader />
        <main className="rbt-main-wrapper" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text-center">
            <h3 className="h4">Loading your checkout...</h3>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const deliveryEstimateDisplay: string = (() => {
    let result: string;
    if (typeof deliveryEstimate === "string" && deliveryEstimate.trim() !== "") {
      result = deliveryEstimate;
    } else {
      result = DEFAULT_DELIVERY_ESTIMATE;
    }
    console.log("[Checkout] RENDER deliveryEstimateDisplay:", result, "| state raw:", JSON.stringify(deliveryEstimate), "| fallback?:", result === DEFAULT_DELIVERY_ESTIMATE);

    if (typeof window !== "undefined") {
      (window as any).__CHECKOUT_DEBUG = {
        deliveryEstimate_state: deliveryEstimate,
        deliveryEstimate_type: typeof deliveryEstimate,
        deliveryEstimateDisplay: result,
        DEFAULT_DELIVERY_ESTIMATE: DEFAULT_DELIVERY_ESTIMATE,
        timestamp: new Date().toISOString(),
      };
      console.log("[Checkout] window.__CHECKOUT_DEBUG set to:", (window as any).__CHECKOUT_DEBUG);
    }

    return result;
  })();

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <ShopHeader />
      <MobileMenu />
      <SideNavs />
      <main className="rbt-main-wrapper">
        <div className="rbt-wrapper rbt-section-gapTop" style={{ background: 'transparent', padding: '40px 0 80px' }}>
          <div className="container">
            {/* Page header */}
            <div className="text-center mb-5">
              <p style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '12px', fontWeight: '600', color: '#10b981', marginBottom: '8px' }}>Secure Checkout</p>
              <h2 className="h3 fw-bold mb-2" style={{ fontSize: '30px', color: '#0b2545', letterSpacing: '-0.5px' }}>Confirm Your Details</h2>
              <p className="text-muted small mb-0" style={{ fontSize: '14px' }}>A few details and your order is on its way</p>
            </div>

            <div className="row g-4 g-lg-5">
              <div className="col-12 col-lg-8">
                <form onSubmit={handleContinue}>
                  {/* Contact + Shipping card */}
                  <div className="bg-white rounded-4 shadow-sm border mb-4 p-4 p-md-5">
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold" style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg, #0b2545 0%, #136c39 100%)' }}>1</div>
                      <div>
                        <h3 className="h5 fw-bold mb-0" style={{ color: '#0b2545' }}>Contact &amp; Delivery</h3>
                        <span className="text-muted small">Where should we send it?</span>
                      </div>
                    </div>

                    {/* Saved address selection */}
                    {savedAddresses.length > 0 && (
                      <div style={{ marginBottom: '22px' }}>
                        <label className="form-label small fw-semibold mb-2" style={{ color: '#111827' }}>Choose a saved address</label>
                        <div className="row g-2">
                          {savedAddresses.map((addr: any) => {
                            const isActive = selectedAddressId === addr.id;
                            return (
                              <div className="col-12 col-md-6" key={addr.id}>
                                <button
                                  type="button"
                                  onClick={() => applyAddress(addr)}
                                  style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '12px 14px',
                                    border: isActive ? '2px solid #10b981' : '1px solid #e5e7eb',
                                    background: isActive ? '#ecfdf5' : '#ffffff',
                                    color: '#111827',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease',
                                    fontFamily: 'inherit',
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                    <span style={{ color: isActive ? '#10b981' : '#9ca3af', fontSize: '13px', paddingTop: '1px' }}>
                                      <i className={isActive ? 'fa-regular fa-circle-check' : 'fa-regular fa-circle'}></i>
                                    </span>
                                    <div>
                                      <div style={{ fontWeight: '700', fontSize: '13px', marginBottom: '2px' }}>
                                        {addr.first_name} {addr.last_name}
                                        {addr.is_default_shipping && (
                                          <span style={{ background: '#10b981', color: '#fff', fontSize: '10px', fontWeight: '700', padding: '1px 6px', borderRadius: '99px', marginLeft: '8px' }}>Default</span>
                                        )}
                                      </div>
                                      <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.4' }}>
                                        {addr.address_1}{addr.address_2 ? `, ${addr.address_2}` : ''}, {addr.city}, {addr.province} - {addr.postal_code}
                                      </div>
                                      {addr.phone && (
                                        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                                          <i className="fa-solid fa-phone" style={{ marginRight: '5px' }}></i>{addr.phone}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                        <div className="text-end mt-2">
                          <button
                            type="button"
                            onClick={() => { setSelectedAddressId(null); setAddress1(''); setCity(''); setProvince(''); setPostalCode(''); }}
                            style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                          >
                            + Enter a new address
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="row g-3 g-md-4">
                      <div className="col-12 col-md-6">
                        <label htmlFor="shipping-email" className="form-label small fw-semibold mb-1">Email address *</label>
                        <input type="email" className="form-control" id="shipping-email" required value={email}
                          onChange={(e) => setEmail(e.target.value)} style={{ padding: '11px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', color: '#111827' }} />
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="shipping-mobile" className="form-label small fw-semibold mb-1">Phone number (+91) *</label>
                        <input type="text" className="form-control" id="shipping-mobile" required value={phone}
                          onChange={(e) => setPhone(e.target.value)} style={{ padding: '11px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', color: '#111827' }} />
                      </div>
                      <div className="col-12">
                        <div className="border-bottom w-100 my-1"></div>
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="shipping-fn" className="form-label small fw-semibold mb-1">First name *</label>
                        <input type="text" className="form-control" id="shipping-fn" required value={firstName}
                          onChange={(e) => setFirstName(e.target.value)} style={{ padding: '11px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', color: '#111827' }} />
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="shipping-ln" className="form-label small fw-semibold mb-1">Last name *</label>
                        <input type="text" className="form-control" id="shipping-ln" required value={lastName}
                          onChange={(e) => setLastName(e.target.value)} style={{ padding: '11px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', color: '#111827' }} />
                      </div>
                      <div className="col-12">
                        <label htmlFor="shipping-address" className="form-label small fw-semibold mb-1">Street address / apartment *</label>
                        <input type="text" className="form-control" id="shipping-address" required value={address1}
                          onChange={(e) => setAddress1(e.target.value)} style={{ padding: '11px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', color: '#111827' }} />
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="shipping-city" className="form-label small fw-semibold mb-1">City *</label>
                        <input type="text" className="form-control" id="shipping-city" required value={city}
                          onChange={(e) => setCity(e.target.value)} placeholder="Enter city" style={{ padding: '11px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', color: '#111827' }} />
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="shipping-prov" className="form-label small fw-semibold mb-1">State / Province *</label>
                        <input type="text" className="form-control" id="shipping-prov" required value={province}
                          onChange={(e) => setProvince(e.target.value)} placeholder="Enter state" style={{ padding: '11px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', color: '#111827' }} />
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="shipping-postcode" className="form-label small fw-semibold mb-1">Pincode *</label>
                        <input type="text" className="form-control" id="shipping-postcode" required value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)} style={{ padding: '11px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', color: '#111827' }} />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label small fw-semibold mb-1">Delivery estimate</label>
                        <table style={{ width: '100%', border: 'none', borderCollapse: 'separate', borderSpacing: 0, tableLayout: 'fixed', margin: 0, padding: 0 }} cellPadding="0" cellSpacing="0">
                          <tbody>
                            <tr>
                              <td style={{
                                width: '100%',
                                height: '44px',
                                minHeight: '44px',
                                padding: '0',
                                margin: 0,
                                boxSizing: 'border-box',
                                borderRadius: '8px',
                                border: '2px solid #d1d5db',
                                background: 'linear-gradient(135deg, #ffffff, #f3f4f6)',
                                verticalAlign: 'middle',
                              }}>
                                <div style={{
                                  display: 'block',
                                  width: '100%',
                                  height: '44px',
                                  boxSizing: 'border-box',
                                  padding: '0 12px',
                                  margin: 0,
                                  lineHeight: '40px',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  color: '#0b2545',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  textAlign: 'left',
                                  verticalAlign: 'middle',
                                  borderRadius: '8px',
                                }}>
                                  {(
                                    (deliveryEstimateDisplay && typeof deliveryEstimateDisplay === 'string' && deliveryEstimateDisplay.trim().length > 0)
                                      ? deliveryEstimateDisplay
                                      : DEFAULT_DELIVERY_ESTIMATE
                                  ) + ''}
                                  <span style={{
                                    display: 'inline-block',
                                    float: 'right',
                                    marginTop: '10px',
                                    marginLeft: '10px',
                                    fontSize: '11px',
                                    color: '#136c39',
                                    fontWeight: 700,
                                    padding: '2px 9px',
                                    lineHeight: '18px',
                                    height: '22px',
                                    borderRadius: '999px',
                                    background: 'linear-gradient(135deg, rgba(19,108,57,0.1), rgba(254,208,0,0.14))',
                                    border: '1px solid rgba(19,108,57,0.2)',
                                  }}>
                                    INFO
                                  </span>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Payment card */}
                  <div className="bg-white rounded-4 border p-md-5 p-4" style={{ background: 'transparent', border: 'none' }}>
                    <div className="bg-white rounded-4 border p-4 p-md-5">
                      <div className="d-flex align-items-center gap-3 mb-4">
                        <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold" style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg, #0b2545, #136c39 100%)' }}>2</div>
                        <div>
                          <h3 className="h5 fw-bold mb-0" style={{ color: '#0b2545' }}>Payment</h3>
                          <span className="text-muted small">Pay securely with Razorpay</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 text-muted small mb-2">
                        <i className="fa-solid fa-lock" style={{ color: '#10b981' }}></i>
                        <span>Your payment details are encrypted and processed securely via Razorpay.</span>
                      </div>
<div className="d-flex flex-wrap align-items-center gap-2 mt-2">
                      <span className="badge border px-3 py-2" style={{ background: '#f3f4f6', color: '#111827', fontWeight: '600' }}>UPI</span>
                      <span className="badge border px-3 py-2" style={{ background: '#f3f4f6', color: '#111827', fontWeight: '600' }}>Cards</span>
                      <span className="badge border px-3 py-2" style={{ background: '#f3f4f6', color: '#111827', fontWeight: '600' }}>Net Banking</span>
                      <span className="badge border px-3 py-2" style={{ background: '#f3f4f6', color: '#111827', fontWeight: '600' }}>Wallet</span>
                    </div>
                      <button type="submit"
                        disabled={submitting || itemCount === 0}
                        className="w-100 btn border-0 text-white fw-bold mt-4"
                        style={{ padding: '15px', borderRadius: '10px', background: 'linear-gradient(135deg, #0b2545 0%, #136c39 50%, #0b2545 100%)', letterSpacing: '0.3px' }}>
                        <span>{submitting ? 'Completing Order...' : 'Place Order'}</span>
                        <i className="fa-regular fa-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* SIDEBAR: ORDER SUMMARY */}
              <div className="col-12 col-lg-4">
                <div className="sticky-top" style={{ top: '20px' }}>
                  <div className="bg-white rounded-4 shadow-sm border p-4" style={{ opacity: cartLoading ? 0.8 : 1, transition: 'opacity 0.2s ease', pointerEvents: cartLoading ? 'none' : 'auto' }}>
                    <h3 className="h5 fw-bold mb-4" style={{ color: '#0b2545' }}>Order Summary</h3>

                    {/* Products List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px', maxHeight: '340px', overflowY: 'auto', paddingRight: '4px' }}>
                      {cart?.items?.map((item) => (
                        <div key={item.id} style={{ display: 'flex', gap: '12px', paddingBottom: '14px', borderBottom: '1px solid #f1f3f5', alignItems: 'center' }}>
                          <div style={{ width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e9ecef', background: '#ffffff', flexShrink: 0, padding: '4px' }}>
                            <img 
                              src={item.thumbnail || '/assets/images/catagory-img/cat-transp-img-07.webp'} 
                              alt={item.title} 
                              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                          </div>
                          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a1a', margin: 0, lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {item.title}
                            </h4>
                            <span className="text-muted small">Qty: {item.quantity}</span>
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: '#111827', whiteSpace: 'nowrap' }}>
                            {formatPrice(item.unit_price * item.quantity, currency)}
                          </span>
                        </div>
                      ))}
                      {(!cart?.items || cart.items.length === 0) && (
                        <div style={{ textAlign: 'center', padding: '20px 0', color: '#71717a', fontSize: '13px' }}>
                          Your cart is empty.
                        </div>
                      )}
                    </div>

                    {/* Totals */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
                        <span className="fw-semibold text-dark">{formatPrice(subtotal, currency)}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Shipping</span>
                        <span className="fw-semibold text-dark">{isFree ? 'Free' : formatPrice(displayShipping, currency)}</span>
                      </div>
                      {displayedTax > 0 && (
                        <div className="d-flex justify-content-between">
                          <span className="text-muted">Tax (incl.)</span>
                          <span className="fw-semibold text-dark">{formatPrice(displayedTax, currency)}</span>
                        </div>
                      )}
                      <div className="border-top pt-3 d-flex justify-content-between align-items-center mt-1">
                        <span className="fw-bold" style={{ color: '#0b2545' }}>Total</span>
                        <span className="fw-bold" style={{ color: '#10b981', fontSize: '20px' }}>{formatPrice(displayTotal, currency)}</span>
                      </div>
                    </div>

                    {/* Free shipping progress */}
                    <div style={{ marginTop: '20px', background: '#f9fafb', border: '1px solid #f1f3f5', borderRadius: '10px', padding: '14px' }}>
                      {amountNeeded > 0 ? (
                        <p className="small text-muted mb-2" style={{ margin: 0 }}>
                          Add <strong style={{ color: '#0b2545' }}>₹{amountNeeded.toFixed(2)}</strong> more to get <strong style={{ color: '#10b981' }}>Free Shipping</strong>
                        </p>
                      ) : (
                        <p className="small mb-2" style={{ margin: 0, color: '#10b981', fontWeight: '600' }}>
                          <i className="fa-solid fa-truck-fast me-1"></i> You qualify for Free Shipping!
                        </p>
                      )}
                      <div className="progress" style={{ height: '6px', borderRadius: '6px', background: '#e9ecef' }}>
                        <div className="progress-bar" style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`, background: 'linear-gradient(90deg, #0b2545, #10b981)' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Modals />
      <Footer />
    </>
  );
};

export default CheckoutPage;
