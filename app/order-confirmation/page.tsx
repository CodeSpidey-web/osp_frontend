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

function formatPrice(amount: number, currencyCode: string = 'usd') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount / 100);
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

  const currency = order?.region?.currency_code || 'usd';

  return (
    <>
      <ShopHeader />
      <MobileMenu />
      <SideNavs />
      <main className="rbt-main-wrapper">
        <div className="rbt-breadcrumb-two rbt-bg-color-white">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="rbt-breadcrumb-inner text-left">
                  <ul className="rbt-breadcrumb-page-list justify-content-start mt--0">
                    <li className="rbt-breadcrumb-item"><a href="/">Home</a></li>
                    <li>
                      <div className="icon-right"><i className="fa-solid fa-chevron-right"></i></div>
                    </li>
                    <li className="rbt-breadcrumb-item"><a href="#">Checkout</a></li>
                    <li>
                      <div className="icon-right"><i className="fa-solid fa-chevron-right"></i></div>
                    </li>
                    <li className="rbt-breadcrumb-item active">Thank You</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rbt-component-area rbt-cart-page rbt-section-gapBottom rbt-bg-color-white">
          <div className="container">
            <div className="row row--12 mt_dec--24 justify-content-center">
              <div className="col-xl-8 col-12 col-md-12 col-lg-12 mt--24 rbt-scrollable-content rbt-checkout-single-content">
                <div className="w-100 pt-sm-2 pt-md-3 pt-lg-4 pb-lg-4 pb-xl-5 px-3 px-sm-4 pe-lg-0 ps-lg-5">
                  {loading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : !order ? (
                    <div className="text-center py-5">
                      <h4>No order found</h4>
                      <a href="/shop" className="rbt-btn mt--16">Continue Shopping</a>
                    </div>
                  ) : (
                    <>
                      <div className="rbt-checkout-step rbt-bg-color-success rbt-text-color-white">
                        <i className="fa-regular fa-check"></i>
                      </div>
                      <h2 className="h1 mt--0 mb--0">Thank You!</h2>
                      <p className="desc mt--0">Your Order Successfully Placed</p>
                      <ul className="rbt-list-style-one mt--16">
                        <li><span className="rbt-bold--text">Order Number :</span> <span className="rbt-text-color-gray-500">{order.id || order.display_id || 'N/A'}</span></li>
                        <li><span className="rbt-bold--text">Date :</span> <span className="rbt-text-color-gray-500">{order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN') : 'N/A'}</span></li>
                        <li><span className="rbt-bold--text">Total :</span> <span className="rbt-text-color-gray-500">{order.total != null ? formatPrice(order.total, currency) : 'N/A'}</span></li>
                        <li><span className="rbt-bold--text">Payment method :</span> <span className="rbt-text-color-gray-500">Cash on Delivery / Razorpay</span></li>
                      </ul>

                      <div className="rbt-separator-mid">
                        <hr className="rbt-separator m-0" />
                      </div>

                      <div className="mt--24">
                        <h3 className="h5">Order Details</h3>
                        <div className="rbt-transparent-table-one-wrapper rbt-has-bg-gray mt--16">
                          <table className="rbt-transparent-table-one table-variation-one mb--0">
                            <thead>
                              <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items?.map((item: any) => (
                                <tr key={item.id}>
                                  <td>
                                    <div className="cart-product-card">
                                      <div className="product-thumbnail">
                                        <img src={item.thumbnail || '/assets/images/wishlist/wishlist-prd-1.webp'} alt={item.title} style={{ width: 60, height: 60, objectFit: 'cover' }} />
                                      </div>
                                      <div className="d-flex flex-column">
                                        <h3 className="rbt-wish-product-name h6 mb--0">{item.title}</h3>
                                        <span className="rbt-product-id">Qty: {item.quantity}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="price-text h6 d-block">{formatPrice(item.total, currency)}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="rbt-separator-mid">
                        <hr className="rbt-separator m-0" />
                      </div>

                      <div className="mt--24">
                        <a href="/shop" className="rbt-btn rbt-btn-md">Continue Shopping</a>
                      </div>

                      <div className="rbt-quick-info-tag d-flex transparent mt--24">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M18.9706 14.9359C18.8148 18.8649 15.7493 22 11.9891 22C8.12909 22 5 18.5858 5 14.6221C5 14.0924 4.99101 13.0336 5.74352 11.2472C6.19387 10.1781 6.47633 9.50646 6.63574 8.89253C6.72333 8.55511 6.89367 8.01904 7.37926 8.89253C7.66559 9.40757 7.67666 10.1483 7.67666 10.1483C7.67666 10.1483 8.74197 9.28536 9.4611 7.63673C10.5153 5.21985 9.67419 3.77512 9.38675 2.77048C9.28727 2.42294 9.22481 1.79833 9.90721 2.06409C10.6025 2.33495 12.4408 3.69334 13.4017 5.12512C14.7732 7.16855 15.2605 9.128 15.2605 9.128C15.2605 9.128 15.6997 8.55268 15.8553 7.95068C16.0312 7.27089 16.0338 6.59763 16.5988 7.32285C17.1361 8.01253 17.9341 9.3086 18.3833 10.5408C19.1989 12.7784 18.9706 14.9359 18.9706 14.9359Z" fill="url(#paint0_linear_47_23656)" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 22C9.23852 22 7 19.7944 7 17.0735C7 15.4318 7.67145 14.435 9.0689 13.0833C9.96366 12.2179 10.8011 11.1549 11.157 10.4311C11.2271 10.2886 11.3866 9.54605 12.0014 10.4155C12.3239 10.8714 12.8296 11.6823 13.1538 12.3744C13.7127 13.5676 13.8461 14.7239 13.8461 14.7239C13.8461 14.7239 14.3938 14.4059 14.7692 13.5871C14.8902 13.3232 15.1348 12.3241 15.8186 13.323C16.3204 14.0561 17.0097 15.3741 16.9999 17.0735C16.9999 19.7944 14.7613 22 11.9999 22Z" fill="#FC9502" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M12.1019 16C12.8497 16 12.8497 17.4475 13.7996 19.3803C14.4321 20.6672 13.486 22 12.1019 22C10.7178 22 10 20.8271 10 19.3803C10 17.9335 11.3541 16 12.1019 16Z" fill="#FCE202" />
                          <defs>
                            <linearGradient id="paint0_linear_47_23656" x1="11.9995" y1="22.0148" x2="11.9995" y2="2.01511" gradientUnits="userSpaceOnUse">
                              <stop offset="1" stopColor="#FF4C0D" />
                              <stop offset="1" stopColor="#FC9502" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <p className="rbt-link-hover b1">Unlock <strong>256 points</strong> rewards! <a href="#" data-bs-toggle="modal" data-bs-target="#signinModal">Sign in</a> to your account.</p>
                      </div>
                    </>
                  )}
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
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="text-center py-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>}>
      <OrderConfirmationPageInner />
    </Suspense>
  );
}
