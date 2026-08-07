"use client";
import React, { useEffect, useState, Suspense } from 'react';
import dynamic from "next/dynamic";
import { useSearchParams } from 'next/navigation';
import ShopHeader from '@/components/ShopHeader';
import Footer from '@/components/Footer';
import { getOrder, MedusaOrder } from '@/lib/medusa';

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), { ssr: false });
const SideNavs = dynamic(() => import("@/components/SideNavs"), { ssr: false });
const Modals = dynamic(() => import("@/components/Modals"), { ssr: false });

function formatPrice(amount: number, currencyCode: string = 'inr') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode.toUpperCase(),
  }).format(amount);
}

function OrderConfirmationPageInner() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<MedusaOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Order Confirmation - Ocean Student Projects";
    loadOrder();
  }, []);

  async function loadOrder() {
    const orderId = searchParams.get('orderId') || (typeof window !== 'undefined' ? localStorage.getItem('medusa_order_id') : null);
    if (!orderId) {
      setLoading(false);
      return;
    }
    try {
      const data = await getOrder(orderId);
      setOrder(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const currency = order?.currency_code || order?.region?.currency_code || 'inr';

  return (
    <>
      <ShopHeader />
      <MobileMenu />
      <SideNavs />
      <main className="rbt-main-wrapper" style={{ backgroundColor: '#f9fafb' }}>
        <div className="rbt-breadcrumb-two" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '15px 0' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="rbt-breadcrumb-inner text-left">
                  <ul className="rbt-breadcrumb-page-list justify-content-start mt--0 mb--0">
                    <li className="rbt-breadcrumb-item"><a href="/">Home</a></li>
                    <li>
                      <div className="icon-right" style={{ margin: '0 8px', fontSize: '12px', color: '#9ca3af' }}>
                        <i className="fa-solid fa-chevron-right"></i>
                      </div>
                    </li>
                    <li className="rbt-breadcrumb-item"><a href="#">Checkout</a></li>
                    <li>
                      <div className="icon-right" style={{ margin: '0 8px', fontSize: '12px', color: '#9ca3af' }}>
                        <i className="fa-solid fa-chevron-right"></i>
                      </div>
                    </li>
                    <li className="rbt-breadcrumb-item active" style={{ color: '#10b981', fontWeight: 600 }}>Thank You</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rbt-component-area rbt-section-gapBottom" style={{ paddingTop: '50px', paddingBottom: '80px' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-9 col-lg-11 col-md-12 col-12">
                {loading ? (
                  <div className="text-center py-5" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : !order ? (
                  <div className="text-center py-5 bg-white rounded-3 shadow-sm border" style={{ padding: '60px 20px' }}>
                    <div className="mb-4 text-warning">
                      <i className="fa-solid fa-circle-exclamation fa-4x"></i>
                    </div>
                    <h3 className="h4 fw-bold">No Order Found</h3>
                    <p className="text-muted">We couldn't retrieve the details for this order. Please verify your order ID.</p>
                    <a href="/shop" className="rbt-btn btn-gradient mt--16" style={{ borderRadius: '6px' }}>Continue Shopping</a>
                  </div>
                ) : (
                  <div className="bg-white rounded-3 shadow-sm border p-4 p-md-5">
                    {/* Header Success Section */}
                    <div className="text-center mb-5">
                      <div className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle mb-3 shadow" style={{ width: '70px', height: '70px', backgroundColor: '#10b981' }}>
                        <i className="fa-solid fa-check fa-2x"></i>
                      </div>
                      <h2 className="h2 fw-bold text-dark mt-2 mb-1" style={{ fontSize: '32px', letterSpacing: '-0.5px' }}>Thank You!</h2>
                      <p className="text-success fw-semibold mb-0" style={{ fontSize: '18px' }}>Your order has been successfully placed</p>
                      <p className="text-muted mt-1 small">A confirmation email has been sent to {order.shipping_address?.email || 'your registered address'}</p>
                    </div>

                    {/* Order Details Grid */}
                    <div className="border rounded-3 p-4 mb-4" style={{ backgroundColor: '#f9fafb' }}>
                      <div className="row g-4">
                        <div className="col-6 col-md-3">
                          <span className="text-muted d-block small text-uppercase fw-bold mb-1" style={{ letterSpacing: '0.5px', fontSize: '11px' }}>Order Number</span>
                          <span className="h5 mb-0 text-success fw-bold" style={{ color: '#10b981' }}>#{order.display_id || order.id.slice(-6).toUpperCase()}</span>
                        </div>
                        <div className="col-6 col-md-3">
                          <span className="text-muted d-block small text-uppercase fw-bold mb-1" style={{ letterSpacing: '0.5px', fontSize: '11px' }}>Date Placed</span>
                          <span className="h6 mb-0 fw-semibold text-dark">
                            {order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                          </span>
                        </div>
                        <div className="col-6 col-md-3">
                          <span className="text-muted d-block small text-uppercase fw-bold mb-1" style={{ letterSpacing: '0.5px', fontSize: '11px' }}>Total Amount</span>
                          <span className="h6 mb-0 fw-bold text-dark">{order.total != null ? formatPrice(order.total, currency) : 'N/A'}</span>
                        </div>
                        <div className="col-6 col-md-3">
                          <span className="text-muted d-block small text-uppercase fw-bold mb-1" style={{ letterSpacing: '0.5px', fontSize: '11px' }}>Payment Method</span>
                          <span className="h6 mb-0 text-dark fw-semibold">
                            {(() => {
                              const providerId = (order as any).payment_collections?.[0]?.payments?.[0]?.provider_id;
                              if (!providerId) return "Cash on Delivery";
                              if (providerId.includes("razorpay")) return "Razorpay";
                              return providerId;
                            })()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Items Section */}
                    <div className="mt-5">
                      <h3 className="h5 fw-bold mb-3 text-dark border-bottom pb-2">Order Items</h3>
                      <div className="table-responsive">
                        <table className="table table-borderless align-middle mb-0">
                          <thead>
                            <tr className="text-muted border-bottom" style={{ fontSize: '13px' }}>
                              <th scope="col" className="ps-0 py-3">Product details</th>
                              <th scope="col" className="text-center py-3" style={{ width: '100px' }}>Quantity</th>
                              <th scope="col" className="text-end pe-0 py-3" style={{ width: '120px' }}>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items?.map((item: any) => (
                              <tr key={item.id} className="border-bottom-dashed" style={{ borderBottom: '1px dashed #e5e7eb' }}>
                                <td className="ps-0 py-3">
                                  <div className="d-flex align-items-center">
                                    <div className="rounded-2 border overflow-hidden me-3 flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                                      <img 
                                        src={item.thumbnail || '/assets/images/wishlist/wishlist-prd-1.webp'} 
                                        alt={item.title} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                      />
                                    </div>
                                    <div>
                                      <h4 className="h6 fw-semibold text-dark mb-1" style={{ fontSize: '15px' }}>{item.title}</h4>
                                      <span className="text-muted small">Standard Edition</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-center text-dark fw-medium py-3">{item.quantity}</td>
                                <td className="text-end pe-0 text-dark fw-bold py-3">{formatPrice(item.total, currency)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Pricing Summary */}
                    {(() => {
                      const displaySubtotal = order.items?.reduce((sum, item) => sum + item.total, 0) || order.subtotal || 0;
                      const displayShipping = order.shipping_total || 0;
                      const displayTotal = order.total || 0;
                      const displayTax = Math.round(
                        ((displaySubtotal - (order.discount_total || 0)) * (1 - 1 / 1.18)) +
                        (displayShipping * (1 - 1 / 1.18))
                      );
                      return (
                        <div className="row justify-content-end mt-4">
                          <div className="col-md-5 col-12">
                            <div className="p-3 rounded-3" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                              <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted small">Subtotal</span>
                                <span className="text-dark fw-medium">{formatPrice(displaySubtotal, currency)}</span>
                              </div>
                              <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted small">Shipping</span>
                                <span className="text-dark fw-medium">{formatPrice(displayShipping, currency)}</span>
                              </div>
                              <div className="border-top my-2"></div>
                              <div className="d-flex justify-content-between mb-1 align-items-center">
                                <span className="fw-bold text-dark">Grand Total</span>
                                <span className="fw-bold text-success h5 mb-0" style={{ color: '#10b981' }}>
                                  {formatPrice(displayTotal, currency)}
                                </span>
                              </div>
                              {displayTax > 0 && (
                                <div className="text-end text-muted" style={{ fontSize: '11px', marginTop: '-2px' }}>
                                  (Includes {formatPrice(displayTax, currency)} Tax)
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Actions and Rewards Footer */}
                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-between border-top mt-5 pt-4 g-3">
                      <a href="/shop" className="rbt-btn rbt-btn-md text-white btn-gradient" style={{ borderRadius: '6px', backgroundColor: '#10b981', borderColor: '#10b981' }}>
                        Continue Shopping
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Modals />
      <Footer />
    </>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="text-center py-5" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner-border text-success" role="status"><span className="visually-hidden">Loading...</span></div></div>}>
      <OrderConfirmationPageInner />
    </Suspense>
  );
}
