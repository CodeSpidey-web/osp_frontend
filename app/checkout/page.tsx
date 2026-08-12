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
  fetchApi,
  getValidImageUrl
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
  const [processingPayment, setProcessingPayment] = useState(false);
  
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
            setProcessingPayment(true);
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
      
      {/* Premium Injected Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .osp-checkout-wrapper {
          background: linear-gradient(135deg, #0b2545 0%, #136c39 50%, #0b2545 100%);
          padding: 60px 0 100px;
          min-height: 100vh;
        }

        .osp-checkout-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .osp-checkout-badge {
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 11px;
          font-weight: 700;
          color: #10b981;
          background-color: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 6px 16px;
          border-radius: 50px;
          margin-bottom: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .osp-checkout-title {
          font-size: 32px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.75px;
          margin-bottom: 24px;
        }

        /* Stepper progress */
        .osp-checkout-stepper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          max-width: 500px;
          margin: 0 auto;
        }

        .osp-step {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #64748b;
          font-size: 13px;
          font-weight: 600;
        }

        .osp-step.active {
          color: #4ade80;
        }

        .osp-step.completed {
          color: #10b981;
        }

        .osp-step-num {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 2px solid #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          background-color: #1e293b;
          color: #64748b;
        }

        .osp-step.active .osp-step-num {
          border-color: #4ade80;
          background-color: #4ade80;
          color: #0b1f13;
        }

        .osp-step.completed .osp-step-num {
          border-color: #10b981;
          background-color: #eafdf5;
          color: #10b981;
        }

        .osp-step-line {
          flex: 1;
          height: 2px;
          background-color: #334155;
          min-width: 30px;
        }

        .osp-step-line.completed {
          background-color: #10b981;
        }

        /* Cards styles */
        .osp-checkout-card {
          background-color: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01);
          padding: 32px;
          margin-bottom: 30px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .osp-checkout-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 20px -3px rgba(19, 108, 57, 0.04), 0 4px 6px -2px rgba(19, 108, 57, 0.02);
          border-color: #c2e2cc;
        }

        .osp-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
        }

        .osp-card-badge {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          color: #ffffff;
          background: linear-gradient(135deg, #136c39 0%, #10b981 100%);
          box-shadow: 0 4px 10px rgba(19, 108, 57, 0.15);
        }

        .osp-card-header-details {
          display: flex;
          flex-direction: column;
        }

        .osp-card-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .osp-card-subtitle {
          font-size: 12px;
          color: #64748b;
          margin-top: 1px;
        }

        /* Saved addresses */
        .osp-address-section {
          margin-bottom: 28px;
          background-color: #f8fafc;
          border-radius: 12px;
          padding: 20px;
          border: 1px dashed #e2e8f0;
        }

        .osp-address-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 8px;
        }

        @media (min-width: 768px) {
          .osp-address-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .osp-address-card {
          width: 100%;
          text-align: left;
          padding: 16px;
          border: 1px solid #e2e8f0;
          background-color: #ffffff;
          color: #1f2937;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .osp-address-card.active {
          border: 2px solid #136c39;
          background-color: #f0fdf4;
          box-shadow: 0 4px 12px rgba(19, 108, 57, 0.04);
        }

        .osp-address-card:hover:not(.active) {
          border-color: #10b981;
          background-color: #f8fafc;
          transform: translateY(-1px);
        }

        /* Form elements */
        .osp-input-group {
          margin-bottom: 20px;
        }

        .osp-form-label {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
          display: block;
        }

        .osp-form-control {
          width: 100%;
          padding: 11px 16px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          color: #0f172a;
          background-color: #ffffff;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .osp-form-control:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }

        .osp-divider {
          border-bottom: 1px solid #f1f5f9;
          width: 100%;
          margin: 16px 0 24px;
        }

        /* Delivery Card */
        .osp-estimate-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 18px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          background: linear-gradient(135deg, #ffffff, #f8fafc);
          height: 48px;
        }

        .osp-estimate-icon {
          font-size: 16px;
          color: #136c39;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .osp-estimate-details {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-grow: 1;
        }

        .osp-estimate-value {
          font-size: 14px;
          color: #0f172a;
          font-weight: 700;
        }

        .osp-estimate-badge {
          font-size: 10px;
          font-weight: 700;
          color: #136c39;
          background-color: #eaf4ed;
          border: 1px solid #c2e2cc;
          padding: 2px 8px;
          border-radius: 99px;
        }

        /* Summary Sidebar */
        .osp-summary-card {
          background-color: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
          padding: 28px;
          position: sticky;
          top: 20px;
        }

        .osp-summary-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 20px;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 12px;
        }

        .osp-summary-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
          max-height: 320px;
          overflow-y: auto;
          padding-right: 6px;
        }

        /* custom scrollbar */
        .osp-summary-items::-webkit-scrollbar {
          width: 4px;
        }
        .osp-summary-items::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 99px;
        }
        .osp-summary-items::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 99px;
        }

        .osp-summary-item {
          display: flex;
          gap: 12px;
          padding-bottom: 14px;
          border-bottom: 1px solid #f1f5f9;
          align-items: center;
        }

        .osp-item-thumb {
          width: 56px;
          height: 56px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          background-color: #ffffff;
          flex-shrink: 0;
          padding: 4px;
        }

        .osp-item-details {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .osp-item-title {
          font-size: 13px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .osp-item-price {
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
          white-space: nowrap;
        }

        .osp-total-row {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #64748b;
          margin-bottom: 8px;
        }

        .osp-total-final {
          border-top: 1px solid #f1f5f9;
          padding-top: 16px;
          margin-top: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .osp-shipping-progress {
          margin-top: 20px;
          background-color: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          padding: 16px;
        }

        .osp-progress-bar-container {
          height: 6px;
          border-radius: 6px;
          background-color: #e2e8f0;
          overflow: hidden;
          margin-top: 8px;
        }

        .osp-progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #136c39 0%, #10b981 100%);
          transition: width 0.3s ease;
        }

        /* Buttons */
        .osp-btn-primary {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          background: linear-gradient(135deg, #136c39 0%, #10b981 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 15px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 4px 12px rgba(19, 108, 57, 0.15);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .osp-btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(19, 108, 57, 0.25);
          filter: brightness(1.05);
        }

        .osp-btn-primary:active:not(:disabled) {
          transform: translateY(0);
        }

        .osp-btn-primary:disabled {
          background: #cbd5e1;
          color: #94a3b8;
          box-shadow: none;
          cursor: not-allowed;
        }

        .osp-badge-sec {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #10b981;
          font-weight: 600;
          background-color: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 4px 12px;
          border-radius: 6px;
        }

        .osp-badge-list {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
        }

        .osp-badge-pay {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #475569;
          font-size: 11px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 6px;
        }

        /* Overlay loader */
        .osp-loader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(8px);
          z-index: 2147483647;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .osp-spinner {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 4px solid #f1f5f9;
          border-top-color: #10b981;
          animation: ospSpin 1s cubic-bezier(0.5, 0.1, 0.1, 0.5) infinite;
          box-shadow: 0 4px 10px rgba(16, 185, 129, 0.1);
        }

        @keyframes ospSpin {
          to { transform: rotate(360deg); }
        }
      ` }} />

      <main className="osp-checkout-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Ambient Glowing Blobs */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(254, 208, 0, 0.15) 0%, transparent 75%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-10%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(19, 108, 57, 0.3) 0%, transparent 75%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Section Header */}
          <div className="osp-checkout-header">
            <span className="osp-checkout-badge">Secure Checkout</span>
            <h2 className="osp-checkout-title">Confirm Your Details</h2>
            
            <div className="osp-checkout-stepper">
              <div className="osp-step completed">
                <span className="osp-step-num"><i className="fa-solid fa-check"></i></span>
                <span className="osp-step-label">Cart</span>
              </div>
              <div className="osp-step-line completed"></div>
              <div className="osp-step active">
                <span className="osp-step-num">2</span>
                <span className="osp-step-label">Details &amp; Payment</span>
              </div>
              <div className="osp-step-line"></div>
              <div className="osp-step">
                <span className="osp-step-num">3</span>
                <span className="osp-step-label">Confirmation</span>
              </div>
            </div>
          </div>

          <div className="row g-4 g-lg-5">
            {/* LEFT SIDE: FORMS */}
            <div className="col-12 col-lg-8">
              <form onSubmit={handleContinue}>
                
                {/* 1. Contact & Delivery Card */}
                <div className="osp-checkout-card">
                  <div className="osp-card-header">
                    <div className="osp-card-badge">1</div>
                    <div className="osp-card-header-details">
                      <h3 className="osp-card-title">Contact &amp; Shipping</h3>
                      <span className="osp-card-subtitle">Where should we deliver your project components?</span>
                    </div>
                  </div>

                  {/* Saved Address Selector */}
                  {savedAddresses.length > 0 && (
                    <div className="osp-address-section">
                      <label className="osp-form-label mb-2">Select a Saved Address</label>
                      <div className="osp-address-grid">
                        {savedAddresses.map((addr: any) => {
                          const isActive = selectedAddressId === addr.id;
                          return (
                            <button
                              type="button"
                              key={addr.id}
                              className={`osp-address-card ${isActive ? 'active' : ''}`}
                              onClick={() => applyAddress(addr)}
                            >
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                <span style={{ color: isActive ? '#10b981' : '#94a3b8', fontSize: '13px', paddingTop: '2px' }}>
                                  <i className={isActive ? 'fa-regular fa-circle-check' : 'fa-regular fa-circle'}></i>
                                </span>
                                <div>
                                  <div style={{ fontWeight: '700', fontSize: '13px', marginBottom: '2px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                                    {addr.first_name} {addr.last_name}
                                    {addr.is_default_shipping && (
                                      <span style={{ background: '#10b981', color: '#fff', fontSize: '9px', fontWeight: '800', padding: '1px 6px', borderRadius: '99px' }}>Default</span>
                                    )}
                                  </div>
                                  <div style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>
                                    {addr.address_1}{addr.address_2 ? `, ${addr.address_2}` : ''}, {addr.city}, {addr.province} - {addr.postal_code}
                                  </div>
                                  {addr.phone && (
                                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', fontWeight: '500' }}>
                                      <i className="fa-solid fa-phone me-1"></i> {addr.phone}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <div className="text-end mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAddressId(null);
                            setAddress1('');
                            setCity('');
                            setProvince('');
                            setPostalCode('');
                          }}
                          style={{ background: 'none', border: 'none', color: '#136c39', fontSize: '12px', fontWeight: '700', cursor: 'pointer', outline: 'none' }}
                        >
                          <i className="fa-solid fa-plus me-1"></i> Add new address
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Form fields */}
                  <div className="row g-3">
                    <div className="col-12 col-md-6 osp-input-group">
                      <label htmlFor="shipping-email" className="osp-form-label">Email address *</label>
                      <input 
                        type="email" 
                        className="osp-form-control" 
                        id="shipping-email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                      />
                    </div>
                    <div className="col-12 col-md-6 osp-input-group">
                      <label htmlFor="shipping-mobile" className="osp-form-label">Phone number (+91) *</label>
                      <input 
                        type="text" 
                        className="osp-form-control" 
                        id="shipping-mobile" 
                        required 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)} 
                      />
                    </div>
                    
                    <div className="col-12">
                      <div className="osp-divider"></div>
                    </div>

                    <div className="col-12 col-md-6 osp-input-group">
                      <label htmlFor="shipping-fn" className="osp-form-label">First name *</label>
                      <input 
                        type="text" 
                        className="osp-form-control" 
                        id="shipping-fn" 
                        required 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} 
                      />
                    </div>
                    <div className="col-12 col-md-6 osp-input-group">
                      <label htmlFor="shipping-ln" className="osp-form-label">Last name *</label>
                      <input 
                        type="text" 
                        className="osp-form-control" 
                        id="shipping-ln" 
                        required 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)} 
                      />
                    </div>
                    
                    <div className="col-12 osp-input-group">
                      <label htmlFor="shipping-address" className="osp-form-label">Street address / apartment *</label>
                      <input 
                        type="text" 
                        className="osp-form-control" 
                        id="shipping-address" 
                        required 
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)} 
                      />
                    </div>
                    
                    <div className="col-12 col-md-6 osp-input-group">
                      <label htmlFor="shipping-city" className="osp-form-label">City *</label>
                      <input 
                        type="text" 
                        className="osp-form-control" 
                        id="shipping-city" 
                        required 
                        value={city}
                        onChange={(e) => setCity(e.target.value)} 
                        placeholder="Enter city" 
                      />
                    </div>
                    <div className="col-12 col-md-6 osp-input-group">
                      <label htmlFor="shipping-prov" className="osp-form-label">State / Province *</label>
                      <input 
                        type="text" 
                        className="osp-form-control" 
                        id="shipping-prov" 
                        required 
                        value={province}
                        onChange={(e) => setProvince(e.target.value)} 
                        placeholder="Enter state" 
                      />
                    </div>
                    
                    <div className="col-12 col-md-6 osp-input-group">
                      <label htmlFor="shipping-postcode" className="osp-form-label">Pincode *</label>
                      <input 
                        type="text" 
                        className="osp-form-control" 
                        id="shipping-postcode" 
                        required 
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)} 
                      />
                    </div>
                    <div className="col-12 col-md-6 osp-input-group">
                      <label className="osp-form-label">Delivery Estimate</label>
                      <div className="osp-estimate-card">
                        <span className="osp-estimate-icon">
                          <i className="fa-solid fa-truck-fast"></i>
                        </span>
                        <div className="osp-estimate-details">
                          <span className="osp-estimate-value">
                            {deliveryEstimateDisplay}
                          </span>
                        </div>
                        <span className="osp-estimate-badge">
                          Standard Shipping
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Payment Card */}
                <div className="osp-checkout-card">
                  <div className="osp-card-header">
                    <div className="osp-card-badge">2</div>
                    <div className="osp-card-header-details">
                      <h3 className="osp-card-title">Secure Payment</h3>
                      <span className="osp-card-subtitle">Pay securely using Razorpay gateway</span>
                    </div>
                  </div>

                  <div className="osp-badge-sec">
                    <i className="fa-solid fa-shield-halved"></i>
                    <span>Payment processed securely via Razorpay</span>
                  </div>

                  <div className="osp-badge-list">
                    <span className="osp-badge-pay">UPI</span>
                    <span className="osp-badge-pay">Credit / Debit Cards</span>
                    <span className="osp-badge-pay">Net Banking</span>
                    <span className="osp-badge-pay">Wallets</span>
                  </div>

                  <button 
                    type="submit"
                    disabled={submitting || itemCount === 0}
                    className="osp-btn-primary mt-4"
                  >
                    <span>{submitting ? 'Completing Order...' : 'Place Order'}</span>
                    <i className="fa-solid fa-chevron-right" style={{ fontSize: '12px' }}></i>
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT SIDE: ORDER SUMMARY */}
            <div className="col-12 col-lg-4">
              <div className="osp-summary-card">
                <h3 className="osp-summary-title">Order Summary</h3>

                {/* Products List */}
                <div className="osp-summary-items">
                  {cart?.items?.map((item) => (
                    <div className="osp-summary-item" key={item.id}>
                      <div className="osp-item-thumb">
                        <img 
                          src={getValidImageUrl(item.thumbnail, '/assets/images/catagory-img/cat-transp-img-07.webp')} 
                          alt={item.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>
                      <div className="osp-item-details">
                        <h4 className="osp-item-title">{item.title}</h4>
                        <span className="text-muted small">Qty: {item.quantity}</span>
                      </div>
                      <span className="osp-item-price">
                        {formatPrice(item.unit_price * item.quantity, currency)}
                      </span>
                    </div>
                  ))}
                  {(!cart?.items || cart.items.length === 0) && (
                    <div style={{ textAlign: 'center', padding: '24px 0', color: '#64748b', fontSize: '13px' }}>
                      Your cart is empty.
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div>
                  <div className="osp-total-row">
                    <span>Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
                    <span className="fw-semibold text-dark">{formatPrice(subtotal, currency)}</span>
                  </div>
                  <div className="osp-total-row">
                    <span>Shipping</span>
                    <span className="fw-semibold text-dark">{isFree ? 'Free' : formatPrice(displayShipping, currency)}</span>
                  </div>
                  {displayedTax > 0 && (
                    <div className="osp-total-row">
                      <span>Tax (incl.)</span>
                      <span className="fw-semibold text-dark">{formatPrice(displayedTax, currency)}</span>
                    </div>
                  )}
                  
                  <div className="osp-total-final">
                    <span className="fw-bold" style={{ color: '#0f172a', fontSize: '16px' }}>Total</span>
                    <span className="fw-bold" style={{ color: '#136c39', fontSize: '22px' }}>{formatPrice(displayTotal, currency)}</span>
                  </div>
                </div>

                {/* Free shipping progress */}
                <div className="osp-shipping-progress">
                  {amountNeeded > 0 ? (
                    <p className="small text-muted mb-2" style={{ margin: 0 }}>
                      Add <strong style={{ color: '#0f172a' }}>₹{amountNeeded.toFixed(2)}</strong> more to get <strong style={{ color: '#10b981' }}>Free Shipping</strong>
                    </p>
                  ) : (
                    <p className="small mb-2" style={{ margin: 0, color: '#10b981', fontWeight: '700' }}>
                      <i className="fa-solid fa-truck-fast me-1"></i> You qualify for Free Shipping!
                    </p>
                  )}
                  <div className="osp-progress-bar-container">
                    <div 
                      className="osp-progress-bar-fill" 
                      style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modals />
      <Footer />

      {/* Payment Success Overlay Loader */}
      {processingPayment && (
        <div className="osp-loader-overlay">
          <div className="osp-spinner"></div>
          <div className="text-center">
            <div className="fw-bold" style={{ color: '#0f172a', fontSize: '18px' }}>
              Payment Successful!
            </div>
            <div className="text-muted" style={{ fontSize: '13px', marginTop: '4px' }}>
              Confirming your order, please wait...
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
