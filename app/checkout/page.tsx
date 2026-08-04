"use client";

import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';

import ShopHeader from '@/components/ShopHeader';
import Footer from '@/components/Footer';
import { 
  setShippingAddress, 
  getShippingOptions, 
  addShippingMethod, 
  createPaymentCollection, 
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
  }).format(amount / 100);
}

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, loading: cartLoading, updateLineItem, removeLineItem, refreshCart } = useCart();
  const { customer } = useAuth();
  
  const [submitting, setSubmitting] = useState(false);
  
  // Shipping and tax settings loaded from public store endpoint
  const [flatShippingRate, setFlatShippingRate] = useState<number>(70);
  const [shippingGst, setShippingGst] = useState<number>(18);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState<number>(999);

  // Page loading state (only for initial mount)
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    fetchApi<{ flat_shipping_rate: number; shipping_gst: number; free_shipping_threshold: number }>('/store/client-settings')
      .then(data => {
        if (data.flat_shipping_rate !== undefined) setFlatShippingRate(data.flat_shipping_rate);
        if (data.shipping_gst !== undefined) setShippingGst(data.shipping_gst);
        if (data.free_shipping_threshold !== undefined) setFreeShippingThreshold(data.free_shipping_threshold);
      })
      .catch(err => console.error("Error loading store settings for checkout:", err));
  }, []);

  useEffect(() => {
    if (!cartLoading) {
      setIsInitialLoading(false);
    }
  }, [cartLoading]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [province, setProvince] = useState('');

  // Pre-fill fields from customer profile
  useEffect(() => {
    if (customer) {
      const cust = customer as any;
      setEmail(cust.email || '');
      setFirstName(cust.first_name || '');
      setLastName(cust.last_name || '');
      setPhone(cust.phone || '');
      
      if (cust.addresses && cust.addresses.length > 0) {
        const addr = cust.addresses[0];
        setAddress1(addr.address_1 || '');
        setCity(addr.city || '');
        setPostalCode(addr.postal_code || '');
        setProvince(addr.province || '');
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

      await createPaymentCollection(cartId);

      const result = await completeCart(cartId);
      if (result.type === 'order' && result.order) {
        localStorage.setItem('medusa_order_id', result.order.id);
        localStorage.removeItem('medusa_cart_id');
        // Force reload/refresh cart context
        window.location.href = `/order-confirmation?orderId=${result.order.id}`;
      } else {
        console.error('Cart completion did not return an order', result);
        alert("Failed to complete order. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during checkout. Please verify your details.");
    } finally {
      setSubmitting(false);
    }
  }

  const currency = cart?.region?.currency_code || 'inr';
  const itemCount = cart?.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;

  const subtotal = cart?.items?.reduce((sum, i) => sum + (i.unit_price * i.quantity), 0) || 0;
  const isFree = subtotal >= (freeShippingThreshold * 100);
  const displayShipping = isFree ? 0 : (flatShippingRate * 100);
  const displayTotal = subtotal + displayShipping;
  const shippingTax = isFree ? 0 : Math.round(displayShipping * (1 - 1 / (1 + shippingGst / 100)));
  const displayedTax = (cart?.tax_total || 0) + shippingTax;
  const amountNeeded = (freeShippingThreshold * 100) - subtotal;

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

  return (
    <>
      <ShopHeader />
      <MobileMenu />
      <SideNavs />
      <main className="rbt-main-wrapper">
        <div className="rbt-component-area rbt-cart-page rbt-section-gapBottom rbt-bg-color-white" style={{ paddingTop: '40px' }}>
          <div className="container">
            <div className="row row--12 mt_dec--24">
              <div className="col-12 col-md-12 col-lg-8 mt--24">
                <div className="rbt-transparent-table-one-wrapper rbt-has-bg-gray">
                  <div className="rbt-checkout-wrapper-box">
                    <div className="rbt-checkout-single-content">
                      <span className="rbt-checkout-step"><i className="fa-regular fa-check"></i></span>
                      <div className="inner w-100">
                        <div className="d-flex justify-content-between align-items-center">
                          <h3 className="title h5">Delivery Details</h3>
                          <div className="rbt-link-hover">
                            <a 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                const pincodeInput = document.getElementById('shipping-postcode');
                                if (pincodeInput) {
                                  pincodeInput.focus();
                                  pincodeInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                              }}
                            >
                              Edit
                            </a>
                          </div>
                        </div>
                        <div className="content">
                          <h3 className="h6 mb-0">Pincode</h3>
                          <p className="desc mt--12">{cart?.shipping_address?.postal_code || postalCode || 'Not set'}</p>
                          <h3 className="h6 mb-0 mt--12">Estimated delivery date</h3>
                          <p className="desc mt--12">Within 3-5 Working Days</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rbt-checkout-single-content active">
                      <span className="rbt-checkout-step">2</span>
                      <div className="inners w-100">
                        <h3 className="title h5">Shipping Options</h3>
                        <form className="needs-validation d-block mt--12" onSubmit={handleContinue}>
                          <div className="row row-cols-1 row-cols-sm-2 g-3 g-sm-4 mb-4">
                            <div className="col">
                              <label htmlFor="shipping-fn" className="form-label">First name <span className="text-danger">*</span></label>
                              <input type="text" className="form-control form-control-lg" id="shipping-fn"
                                required value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ color: '#000000' }} />
                            </div>
                            <div className="col">
                              <label htmlFor="shipping-ln" className="form-label">Last name <span className="text-danger">*</span></label>
                              <input type="text" className="form-control form-control-lg" id="shipping-ln"
                                required value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ color: '#000000' }} />
                            </div>
                            <div className="col">
                              <label htmlFor="shipping-email" className="form-label">Email address <span className="text-danger">*</span></label>
                              <input type="email" className="form-control form-control-lg"
                                id="shipping-email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ color: '#000000' }} />
                            </div>
                            <div className="col">
                              <label htmlFor="shipping-mobile" className="form-label">Phone (+91) <span className="text-danger">*</span></label>
                              <input type="text" className="form-control form-control-lg"
                                id="shipping-mobile" required value={phone} onChange={(e) => setPhone(e.target.value)} style={{ color: '#000000' }} />
                            </div>
                            <div className="col">
                              <label className="form-label">City <span className="text-danger">*</span></label>
                              <input type="text" className="form-control form-control-lg"
                                required value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter City" style={{ color: '#000000' }} />
                            </div>
                            <div className="col">
                              <label className="form-label">State / Province <span className="text-danger">*</span></label>
                              <input type="text" className="form-control form-control-lg"
                                required value={province} onChange={(e) => setProvince(e.target.value)} placeholder="Enter State/Province" style={{ color: '#000000' }} />
                            </div>
                            <div className="col">
                              <label htmlFor="shipping-postcode" className="form-label">Pincode <span className="text-danger">*</span></label>
                              <input type="text" className="form-control form-control-lg"
                                id="shipping-postcode" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} style={{ color: '#000000' }} />
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="shipping-address" className="form-label">House / apartment number and street address <span className="text-danger">*</span></label>
                            <input type="text" className="form-control form-control-lg"
                              id="shipping-address" required value={address1} onChange={(e) => setAddress1(e.target.value)} style={{ color: '#000000' }} />
                          </div>
                          
                          <div className="text-center mt--24 text-center rbt-btn-area">
                            <button type="submit"
                              className="rbt-btn splash-btn icon-reverse-left rbt-scroll-trigger fade_in d-block rbt-rounded--4 w-100"
                              disabled={submitting || itemCount === 0}
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span>{submitting ? 'Completing Order...' : 'Place Order'}</span>
                              <span className="icon-right"><i className="fa-regular fa-arrow-right ml--4"></i></span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    
                    <div className="rbt-checkout-single-content">
                      <span className="rbt-checkout-step">3</span>
                      <h3 className="title h5">Secure Payment</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* SIDEBAR: ORDER SUMMARY */}
              <div className="col-12 col-md-12 col-lg-4 mt--24">
                <div className="rbt-sidebar-cart sticky-top">
                  <div className="rbt-sidebar-widget" style={{ opacity: cartLoading ? 0.8 : 1, transition: 'opacity 0.2s ease', pointerEvents: cartLoading ? 'none' : 'auto' }}>
                    <div className="rbt-inner">
                      <div className="rbt-title-part d-flex mb--20 justify-content-between align-items-center">
                        <h3 className="title h5 mb--0 rbt-text-bold">Order summary</h3>
                      </div>
                      
                      {/* Products List with Quantity Selector */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', maxHeight: '340px', overflowY: 'auto', paddingRight: '4px' }}>
                        {cart?.items?.map((item) => (
                          <div key={item.id} style={{ display: 'flex', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid #f1f3f5', alignItems: 'center' }}>
                            {/* Product Thumbnail */}
                            <div style={{ width: '60px', height: '60px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e9ecef', background: '#ffffff', flexShrink: 0, padding: '4px' }}>
                              <img 
                                src={item.thumbnail || '/assets/images/catagory-img/cat-transp-img-07.webp'} 
                                alt={item.title} 
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                              />
                            </div>
                            
                            {/* Title, price and quantity selector */}
                            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a1a', margin: 0, lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {item.title}
                              </h4>
                              
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                                {/* Quantity selector */}
                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ced4da', borderRadius: '4px', height: '28px', overflow: 'hidden', backgroundColor: '#f8f9fa', opacity: cartLoading ? 0.6 : 1 }}>
                                  <button 
                                    type="button"
                                    disabled={item.quantity <= 1 || cartLoading}
                                    onClick={async (e) => {
                                      e.preventDefault();
                                      if (item.quantity > 1) {
                                        await updateLineItem(item.id, item.quantity - 1);
                                      }
                                    }}
                                    style={{ background: 'none', border: 'none', width: '24px', height: '100%', cursor: item.quantity <= 1 || cartLoading ? 'not-allowed' : 'pointer', fontSize: '10px', color: item.quantity <= 1 || cartLoading ? '#ced4da' : '#495057', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                  >
                                    <i className="fa-solid fa-minus"></i>
                                  </button>
                                  <span style={{ width: '28px', textAlign: 'center', fontWeight: '700', fontSize: '12px', color: '#1c1b1f' }}>
                                    {item.quantity}
                                  </span>
                                  <button 
                                    type="button"
                                    disabled={cartLoading}
                                    onClick={async (e) => {
                                      e.preventDefault();
                                      await updateLineItem(item.id, item.quantity + 1);
                                    }}
                                    style={{ background: 'none', border: 'none', width: '24px', height: '100%', cursor: cartLoading ? 'not-allowed' : 'pointer', fontSize: '10px', color: cartLoading ? '#ced4da' : '#495057', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                  >
                                    <i className="fa-solid fa-plus"></i>
                                  </button>
                                </div>
                                
                                {/* Price */}
                                <span style={{ fontSize: '13px', fontWeight: '700', color: '#c85a17' }}>
                                  {formatPrice(item.unit_price * item.quantity, currency)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                        {(!cart?.items || cart.items.length === 0) && (
                          <div style={{ textAlign: 'center', padding: '20px 0', color: '#71717a', fontSize: '13px' }}>
                            Your cart is empty.
                          </div>
                        )}
                      </div>

                      <div className="rbt-cart-subttotal">
                        <p>Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</p>
                        <p className="price">{formatPrice(subtotal, currency)}</p>
                      </div>

                      {/* Shipment Option */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px 0', borderBottom: '1px solid #f1f3f5' }}>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a1a' }}>Shipment</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                          <input 
                            type="radio" 
                            checked 
                            readOnly 
                            style={{ accentColor: '#c85a17' }} 
                          />
                          <span style={{ fontWeight: '500' }}>
                            {isFree ? "Free Shipping" : `Flat Shipping Rate: ₹${flatShippingRate.toFixed(2)}`}
                          </span>
                        </div>
                      </div>

                      <div className="rbt-cart-subttotal">
                        <p>Shipping</p>
                        <p className="price">{formatPrice(displayShipping, currency)}</p>
                      </div>
                      <hr className="mb--8 mt--8 rbt-bg-color-gray-200" />
                      <div className="rbt-cart-subttotal mb--12" style={{ flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                          <p className="subtotal"><strong>Total</strong></p>
                          <p className="price">{formatPrice(displayTotal, currency)}</p>
                        </div>
                        {displayedTax > 0 && (
                          <span style={{ fontSize: '11px', color: '#71717a', fontWeight: '500', marginTop: '2px' }}>
                            (Includes {formatPrice(displayedTax, currency)} Tax)
                          </span>
                        )}
                      </div>
                      <div className="offer-progress-area">
                        {amountNeeded > 0 ? (
                          <p className="offer-text">Add <strong>₹{(amountNeeded / 100).toFixed(2)}</strong> More To Get <strong>Free Shipping</strong></p>
                        ) : (
                          <p className="offer-text"><strong>Congratulations! You qualify for Free Shipping.</strong></p>
                        )}
                        <div className="progress" role="progressbar" aria-label="Shipping-progress"
                          aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                          <div className="progress-bar" style={{ width: `${Math.min(100, (subtotal / (freeShippingThreshold * 100)) * 100)}%` }}></div>
                        </div>
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
