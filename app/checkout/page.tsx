"use client";
import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';

import ShopHeader from '@/components/ShopHeader';
import Footer from '@/components/Footer';
import { getCart, createCart, getRegions, setShippingAddress, getShippingOptions, addShippingMethod, createPaymentCollection, completeCart, MedusaCart } from '@/lib/medusa';

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), { ssr: false });
const SideNavs = dynamic(() => import("@/components/SideNavs"), { ssr: false });
const Modals = dynamic(() => import("@/components/Modals"), { ssr: false });

function formatPrice(amount: number, currencyCode: string = 'usd') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount / 100);
}

const CheckoutPage = () => {
  const router = useRouter();
  const [cart, setCart] = useState<MedusaCart | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [province, setProvince] = useState('');

  useEffect(() => {
    initCheckout();
  }, []);

  async function initCheckout() {
    try {
      let cartId = localStorage.getItem('medusa_cart_id');
      let cartData: MedusaCart | null = null;

      if (cartId) {
        try {
          cartData = await getCart(cartId);
        } catch {
          cartId = null;
        }
      }

      if (!cartData) {
        const regions = await getRegions();
        const defaultRegion = regions[0];
        if (!defaultRegion) {
          setLoading(false);
          return;
        }
        cartData = await createCart(defaultRegion.id);
        localStorage.setItem('medusa_cart_id', cartData.id);
      }

      setCart(cartData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

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
      setCart(updatedCart);

      const options = await getShippingOptions(cartId);
      if (options && options.length > 0) {
        await addShippingMethod(cartId, options[0].id);
      }

      await createPaymentCollection(cartId);

      const result = await completeCart(cartId);
      if (result.type === 'order' && result.order) {
        localStorage.setItem('medusa_order_id', result.order.id);
        router.push(`/order-confirmation?orderId=${result.order.id}`);
      } else {
        console.error('Cart completion did not return an order', result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  const currency = cart?.region?.currency_code || 'usd';
  const itemCount = cart?.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;

  return (
    <>
      <ShopHeader />
      <MobileMenu />
      <SideNavs />
      <main className="rbt-main-wrapper">
        <div className="rbt-component-area rbt-cart-page rbt-section-gapBottom rbt-bg-color-white">
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
                          <div className="rbt-link-hover"><a href="#">Edit</a>
                          </div>
                        </div>
                        <div className="content">
                          <h3 className="h6 mb-0">Pincode</h3>
                          <p className="desc mt--12">{cart?.shipping_address?.postal_code || 'Not set'}</p>
                          <h3 className="h6 mb-0 mt--12">Estimated delivery date</h3>
                          <p className="desc mt--12">Monday, 13 | 12:00 - 16:00</p>
                        </div>
                      </div>
                    </div>
                    <div className="rbt-checkout-single-content active">
                      <span className="rbt-checkout-step">2</span>
                      <div className="inners">
                        <h3 className="title h5">Shipping Options</h3>
                        <form className="needs-validation d-block mt--12" onSubmit={handleContinue}>
                          <div className="row row-cols-1 row-cols-sm-2 g-3 g-sm-4 mb-4">
                            <div className="col">
                              <label htmlFor="shipping-fn" className="form-label">First name <span
                                  className="text-danger">*</span></label>
                              <input type="text" className="form-control form-control-lg" id="shipping-fn"
                                required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="col">
                              <label htmlFor="shipping-ln" className="form-label">Last name <span
                                  className="text-danger">*</span></label>
                              <input type="text" className="form-control form-control-lg" id="shipping-ln"
                                required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className="col">
                              <label htmlFor="shipping-email" className="form-label">Email address <span
                                  className="text-danger">*</span></label>
                              <input type="email" className="form-control form-control-lg"
                                id="shipping-email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="col">
                              <label htmlFor="shipping-mobile" className="form-label">Phone (+91)</label>
                              <input type="text" className="form-control form-control-lg"
                                id="shipping-mobile" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="col">
                              <label className="form-label">City <span
                                  className="text-danger">*</span></label>

                              <div
                                className="filter-select rbt-modern-select rbt-modern-select-btn search-by-category">
                                <select className="rbt-select-activation" data-live-search="true"
                                  data-live-search-placeholder="Search City" value={city} onChange={(e) => setCity(e.target.value)}>
                                  <option>Select your City</option>
                                  <option>Mumbai</option>
                                  <option>Delhi</option>
                                  <option>Bangalore</option>
                                  <option>Chennai</option>
                                  <option>Hyderabad</option>
                                  <option>Kolkata</option>
                                  <option>Pune</option>
                                  <option>Ahmedabad</option>
                                  <option>Jaipur</option>
                                  <option>Lucknow</option>
                                </select>
                              </div>
                            </div>
                            <div className="col">
                              <label htmlFor="shipping-postcode" className="form-label">Pincode <span
                                  className="text-danger">*</span></label>
                              <input type="text" className="form-control form-control-lg"
                                id="shipping-postcode" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="shipping-address" className="form-label">House / apartment number
                              and street address <span className="text-danger">*</span></label>
                            <input type="text" className="form-control form-control-lg"
                              id="shipping-address" required value={address1} onChange={(e) => setAddress1(e.target.value)} />
                          </div>
                          <h3 className="h6 mb--8">
                            Billing address
                            <i className="fa-regular fa-circle-info align-middle ms-2 tooltips"
                              data-tooltip="Uncheck the checkbox below if your Billing address should be different from your Shipping address."
                              data-tooltip-position="right"></i>
                          </h3>
                          <div className="form-check mb-lg-4">
                            <input type="checkbox" className="form-check-input" id="same-address"
                              defaultChecked />
                            <label htmlFor="same-address" className="form-check-label">Same as delivery
                              address</label>
                          </div>
                          <div className="text-center mt--12 text-center rbt-btn-area">
                            <button type="submit"
                              className="rbt-btn splash-btn icon-reverse-left rbt-scroll-trigger fade_in animation-order-5 d-block rbt-rounded--4"
                              disabled={submitting}>
                              <span className="icon-left"><i
                                  className="fa-sharp fa-regular fa-arrow-right mr--4"></i></span>
                              <span>{submitting ? 'Processing...' : 'Continue Order Process'}</span>
                              <span className="icon-right"><i
                                  className="fa-regular fa-arrow-right ml--4"></i></span>
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

              <div className="col-12 col-md-12 col-lg-4 mt--24">
                <div className="rbt-sidebar-cart sticky-top">
                  <div className="rbt-sidebar-widget">
                    <div className="rbt-inner">
                      <div className="rbt-title-part d-flex mb--12 justify-content-between align-items-center">
                        <h3 className="title h5 mb--0 rbt-text-bold">Order summary</h3>
                        <div className="rbt-link-hover"><a href="/cart">Edit</a></div>
                      </div>
                      <div className="rbt-order-sum-area rbt-order-sum-area-sm align-items-center mb--16">
                        <a href="#!"
                          className="ordered-items-wrapper rbt-order-sidenav-activation d-flex rbt-gap--12 align-items-center">
                          {cart?.items?.slice(0, 3).map((item) => (
                            <div key={item.id} className="ordered-item ordered-item-01">
                              <img src={item.thumbnail || 'assets/images/catagory-img/cat-transp-img-07.webp'}
                                alt={item.title} />
                            </div>
                          ))}
                          {cart && itemCount > 3 && (
                            <div className="ordered-item more-icon ms-auto"><i className="fa-solid fa-chevron-right"></i></div>
                          )}
                        </a>
                      </div>
                      <div className="rbt-cart-subttotal">
                        <p>Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</p>
                        <p className="price">{formatPrice(cart?.subtotal || 0, currency)}</p>
                      </div>
                      <div className="rbt-cart-subttotal">
                        <p>Shipping</p>
                        <p className="price">{formatPrice(cart?.shipping_total || 0, currency)}</p>
                      </div>
                      <hr className="mb--8 mt--8 rbt-bg-color-gray-200" />
                      <div className="rbt-cart-subttotal mb--12">
                        <p className="subtotal"><strong>Total</strong></p>
                        <p className="price">{formatPrice(cart?.total || 0, currency)}</p>
                      </div>
                      <div className="offer-progress-area">
                        <p className="offer-text">Add <strong>₹5,000</strong> More To Get <strong>Free
                            Shipping</strong></p>
                        <div className="progress" role="progressbar" aria-label="Shipping-progress"
                          aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                          <div className="progress-bar w-75"></div>
                        </div>
                      </div>
                      <div className="rbt-minicart-bottom mt--24">
                        <div className="share-btn-grp rbt-link-hover">
                          <a href="/cart" className="share-btn"><i className="fa-regular fa-pen mr--4"></i>
                            View Cart</a>
                          <button data-bs-toggle="modal" data-bs-target="#socialShareModal" type="button"
                            className="share-btn"><i className="fa-sharp fa-solid fa-link mr--4"></i> Share
                            Cart</button>
                        </div>
                        <ul className="rbt-cart-brand-list mt--24">
                          <li>
                            <a href="#!"><img src="assets/images/payment-brand/image-01.webp"
                                alt="eCommerce Brand Image" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="rbt-sidebar-widget rbt-sidebar-widget-sm mt--24">
                    <div className="rbt-inner">
                      <div className="rbt-quick-info-tag d-flex transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                          fill="none">
                          <path fillRule="evenodd" clipRule="evenodd"
                            d="M18.9706 14.9359C18.8148 18.8649 15.7493 22 11.9891 22C8.12909 22 5 18.5858 5 14.6221C5 14.0924 4.99101 13.0336 5.74352 11.2472C6.19387 10.1781 6.47633 9.50646 6.63574 8.89253C6.72333 8.55511 6.89367 8.01904 7.37926 8.89253C7.66559 9.40757 7.67666 10.1483 7.67666 10.1483C7.67666 10.1483 8.74197 9.28536 9.4611 7.63673C10.5153 5.21985 9.67419 3.77512 9.38675 2.77048C9.28727 2.42294 9.22481 1.79833 9.90721 2.06409C10.6025 2.33495 12.4408 3.69334 13.4017 5.12512C14.7732 7.16855 15.2605 9.128 15.2605 9.128C15.2605 9.128 15.6997 8.55268 15.8553 7.95068C16.0312 7.27089 16.0338 6.59763 16.5988 7.32285C17.1361 8.01253 17.9341 9.3086 18.3833 10.5408C19.1989 12.7784 18.9706 14.9359 18.9706 14.9359Z"
                            fill="url(#paint0_linear_47_23656)" />
                          <path fillRule="evenodd" clipRule="evenodd"
                            d="M11.9999 22C9.23852 22 7 19.7944 7 17.0735C7 15.4318 7.67145 14.435 9.0689 13.0833C9.96366 12.2179 10.8011 11.1549 11.157 10.4311C11.2271 10.2886 11.3866 9.54605 12.0014 10.4155C12.3239 10.8714 12.8296 11.6823 13.1538 12.3744C13.7127 13.5676 13.8461 14.7239 13.8461 14.7239C13.8461 14.7239 14.3938 14.4059 14.7692 13.5871C14.8902 13.3232 15.1348 12.3241 15.8186 13.323C16.3204 14.0561 17.0097 15.3741 16.9999 17.0735C16.9999 19.7944 14.7613 22 11.9999 22Z"
                            fill="#FC9502" />
                          <path fillRule="evenodd" clipRule="evenodd"
                            d="M12.1019 16C12.8497 16 12.8497 17.4475 13.7996 19.3803C14.4321 20.6672 13.486 22 12.1019 22C10.7178 22 10 20.8271 10 19.3803C10 17.9335 11.3541 16 12.1019 16Z"
                            fill="#FCE202" />
                          <defs>
                            <linearGradient id="paint0_linear_47_23656" x1="11.9995" y1="22.0148"
                              x2="11.9995" y2="2.01511" gradientUnits="userSpaceOnUse">
                              <stop offset="1" stopColor="#FF4C0D" />
                              <stop offset="1" stopColor="#FC9502" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <p className="rbt-link-hover b1">
                          Unlock <strong>256 points</strong> rewards!
                          <a href="#!" data-bs-toggle="modal" data-bs-target="#signinModal">Sign in</a> to
                          your account.
                        </p>
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
