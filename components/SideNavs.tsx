"use client";
import React, { useState, useEffect } from 'react';
import { useCart } from '@/lib/CartContext';
import { getProducts, MedusaProduct } from '@/lib/medusa';

function formatPrice(amount: number, currencyCode: string = 'inr') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

export default function SideNavs() {
  const { cart, updateLineItem, removeLineItem } = useCart();
  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const shipping = cart?.shipping_total || 0;
  const total = cart?.total || 0;
  const currencyCode = cart?.currency_code || 'inr';
  const fallbackProducts: MedusaProduct[] = [
    { id: '1', title: 'Raspberry Pi 4 Model B', handle: 'raspberry-pi-4', thumbnail: '/assets/images/product-img/electronics/electronics-bg-trans-03-a-1-hover.webp', variants: [{ prices: [{ amount: 5000, currency_code: 'inr' }] }], images: [] } as any,
    { id: '2', title: 'Arduino Uno R3 Board', handle: 'arduino-uno', thumbnail: '/assets/images/product-img/electronics/electronics-bg-trans-06-a-1-hover.webp', variants: [{ prices: [{ amount: 1600, currency_code: 'inr' }] }], images: [] } as any,
    { id: '3', title: 'ESP32 NodeMCU Development Board', handle: 'esp32-nodemcu', thumbnail: '/assets/images/product-img/electronics/electronics-bg-trans-08-a-1-hover.webp', variants: [{ prices: [{ amount: 850, currency_code: 'inr' }] }], images: [] } as any,
    { id: '4', title: 'Ultrasonic Distance Sensor HC-SR04', handle: 'ultrasonic-sensor', thumbnail: '/assets/images/product-img/electronics/electronics-bg-trans-07-a-1-hover.webp', variants: [{ prices: [{ amount: 300, currency_code: 'inr' }] }], images: [] } as any,
  ];
  const [suggestedProducts, setSuggestedProducts] = useState<MedusaProduct[]>(fallbackProducts);
  useEffect(() => {
    getProducts({ limit: 6 }).then(res => { if (res.products.length) setSuggestedProducts(res.products); }).catch(() => {});
  }, []);
  return (
    <>
    {/*  Start Side Nav  */}
    <div className="rbt-offcanvas-cat-side-menu rbt-category-sidemenu ">
        <div className="inner-wrapper">
            <div className="rbt-categories-sidebar d-flex">
                <div className="rbt-sidebar-left-content">
                    <div className="rbt-sidebar-left-inner">
                        {/*  Start sidebar left header  */}
                        <div className="rbt-sidebar-left-content-head">
                            <div className="rbt-categories-sidebar-top-content mb--24">
                                <div className="logo">
                                    <a href="/">
                                        <img src="/assets/images/logo/transperent_logo.webp" alt="Ocean Student Projects Logo" />
                                    </a>
                                </div>
                                <button className="rbt-sidebar-close-btn">
                                    <i className="fa-sharp fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <div
                                className="rbt-access-box rbt-scroll-trigger fade_in animation-order-1 rbt-access-box-has-bg-hover rbt-access-box-has-bg-hover-white d-inline-block">
                                <a href="#!" className="rbt-access-box-wrapper" data-bs-toggle="modal"
                                    data-bs-target="#signinModal">
                                    <div
                                        className="rbt-round-btn rbt-bg-color-brand-300 rbt-text-color-primary has-rbt-sm-fsize">
                                        <i className="fa-regular fa-user"></i>
                                    </div>
                                    <div className="content">
                                        <p>Log in/Sign Up</p>
                                        <span>Access Account</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                        {/*  End sidebar left header  */}

                        <div className="rbt-sidebar-tabs-wrapper">
                            <div className="rbt-sidebar-tabs-inner">
                                {/*  Start tabs  */}
                                <ul className="rbt-sidebar-sub-categories nav flex-column nav-pills" id="v-pills-tab"
                                    role="tablist" aria-orientation="vertical">
                                    <li>
                                        <button className="rbt-nav-link nav-link" id="rbt-tab-cat-sidebar-1"
                                            data-bs-toggle="pill" data-bs-target="#rbt-nav-pill-1" type="button"
                                            role="tab" aria-controls="rbt-nav-pill-1" aria-selected="true">
                                            <span className="rbt-round-btn">
                                                <i className="fa-regular fa-camera"></i>
                                            </span>
                                            <span className="rbt-content">
                                                <span className="rbt-sub-category-title">
                                                    <span>Camera & Photo</span>
                                                </span>
                                                <span className="description">Popular Camera & Photo accessories</span>
                                            </span>
                                            <span className="icon">
                                                <i className="fa-regular fa-chevron-right"></i>
                                            </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="rbt-nav-link nav-link" id="rbt-tab-cat-sidebar-2"
                                            data-bs-toggle="pill" data-bs-target="#rbt-nav-pill-2" type="button"
                                            role="tab" aria-controls="rbt-nav-pill-2" aria-selected="false">
                                            <span className="rbt-round-btn">
                                                <i className="fa-regular fa-watch-apple"></i>
                                            </span>
                                            <span className="rbt-content">
                                                <span className="rbt-sub-category-title">
                                                    <span>All Watches</span>
                                                    <span
                                                        className="rbt-product-badge rbt-product-badge-bg-primary">EXCLUSIVE</span>
                                                </span>
                                                <span className="description">Pages with a demonstration
                                                    of Smartwatches</span>
                                            </span>
                                            <span className="icon">
                                                <i className="fa-regular fa-chevron-right"></i>
                                            </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="rbt-nav-link nav-link" id="rbt-tab-cat-sidebar-3"
                                            data-bs-toggle="pill" data-bs-target="#rbt-nav-pill-3" type="button"
                                            role="tab" aria-controls="rbt-nav-pill-3" aria-selected="false">
                                            <span className="rbt-round-btn">
                                                <i className="fa-sharp fa-regular fa-camcorder"></i>
                                            </span>
                                            <span className="rbt-content">
                                                <span className="rbt-sub-category-title">
                                                    <span>TVs, Audio-Video</span>
                                                </span>
                                                <span className="description">Top TVs, Audio-Videothe most famous
                                                    brands</span>
                                            </span>
                                            <span className="icon">
                                                <i className="fa-regular fa-chevron-right"></i>
                                            </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="rbt-nav-link nav-link" id="rbt-tab-cat-sidebar-4"
                                            data-bs-toggle="pill" data-bs-target="#rbt-nav-pill-4" type="button"
                                            role="tab" aria-controls="rbt-nav-pill-4" aria-selected="false">
                                            <span className="rbt-round-btn">
                                                <i className="fa-light fa-game-console-handheld"></i>
                                            </span>
                                            <span className="rbt-content">
                                                <span className="rbt-sub-category-title">
                                                    <span>Gaming</span>
                                                    <span className="rbt-product-badge rbt-bg-color-green">TRENDING</span>
                                                </span>
                                                <span className="description">Accessories for Games from
                                                    the best brands</span>
                                            </span>
                                            <span className="icon">
                                                <i className="fa-regular fa-chevron-right"></i>
                                            </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="rbt-nav-link nav-link" id="rbt-tab-cat-sidebar-5"
                                            data-bs-toggle="pill" data-bs-target="#rbt-nav-pill-5" type="button"
                                            role="tab" aria-controls="rbt-nav-pill-5" aria-selected="false">
                                            <span className="rbt-round-btn">
                                                <i className="fa-sharp fa-regular fa-headphones"></i>
                                            </span>
                                            <span className="rbt-content">
                                                <span className="rbt-sub-category-title">
                                                    <span>Headphones & Music</span>
                                                </span>
                                                <span className="description">Catalog best Headphones
                                                    & Music here now</span>
                                            </span>
                                            <span className="icon">
                                                <i className="fa-regular fa-chevron-right"></i>
                                            </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="rbt-nav-link nav-link" id="rbt-tab-cat-sidebar-6"
                                            data-bs-toggle="pill" data-bs-target="#rbt-nav-pill-6" type="button"
                                            role="tab" aria-controls="rbt-nav-pill-6" aria-selected="false">
                                            <span className="rbt-round-btn">
                                                <i className="fa-sharp fa-regular fa-blender-phone"></i>
                                            </span>
                                            <span className="rbt-content">
                                                <span className="rbt-sub-category-title">
                                                    <span>Appliances</span>
                                                    <span className="rbt-product-badge rbt-bg-color-danger">HOT</span>
                                                </span>
                                                <span className="description">Full list links of all
                                                    House Appliances active</span>
                                            </span>
                                            <span className="icon">
                                                <i className="fa-regular fa-chevron-right"></i>
                                            </span>
                                        </button>
                                    </li>
                                </ul>
                                {/*  End tabs  */}

                                {/*  Start quick links  */}
                                <div className="rbt-sidebar-quick-links-part">
                                    <div className="rbt-sidebar-bottom-inner">
                                        <hr className="rbt-separator rbt-separator-gray200 mb--24" />
                                        <nav className="rbt-sidebar-nav">
                                            <h2 className="rbt-sub-category-title h4">
                                                <a data-bs-toggle="collapse" href="#collapseExample" role="button"
                                                    aria-expanded="false" aria-controls="collapseExample">
                                                    Quick Links
                                                    <span className="icon"><i className="fa-regular fa-chevron-down"></i></span>
                                                </a>
                                            </h2>
                                            <div className="collapse" id="collapseExample">
                                                <ul className="rbt-sidebar-quick-links">
                                                    <li><a href="about.html">About us</a></li>
                                                    <li><a href="#">Reviews</a></li>
                                                    <li><a href="#">Delivery & payment</a></li>
                                                    <li><a href="blogs.html">Blog Articles</a></li>
                                                </ul>
                                            </div>
                                        </nav>
                                        <hr className="rbt-separator rbt-separator-gray200 mb--24 mt--24" />
                                        <nav className="rbt-sidebar-nav">
                                            <h2 className="rbt-sub-category-title h4">
                                                <a data-bs-toggle="collapse" href="#collapseExample2" role="button"
                                                    aria-expanded="false" aria-controls="collapseExample2">
                                                    More Links
                                                    <span className="icon"><i className="fa-regular fa-chevron-down"></i></span>
                                                </a>
                                            </h2>
                                            <div className="collapse" id="collapseExample2">
                                                <ul className="rbt-sidebar-quick-links">
                                                    <li><a href="contact.html">Contacts</a></li>
                                                    <li><a href="#">Information</a></li>
                                                    <li><a href="terms-policy.html">Terms & Conditions</a></li>
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                                {/*  End quick links  */}
                            </div>
                        </div>

                        {/*  Start sidebar footer  */}
                        <div className="rbt-sidebar-left-content-footer">
                            <div className="rbt-sidebar-contact-area">
                                <div className="rbt-sidebar-contact-inner rbt-link-hover">
                                    <p className="rbt-contact-text">Boston, 44 Main street</p>
                                    <a className="rbt-contact-links" href="tel:+1(917)722-7425">+1(917)722-7425 (the call is
                                        free)</a>
                                    <p className="rbt-contact-text mt--12">Mon-Sun 9.00 - 18.00</p>
                                    <a className="rbt-contact-links"
                                        href="cdn-cgi/l/email-protection.html#1773727a7857726f767a677b723974787a"><span
                                            className="__cf_email__"
                                            data-cfemail="e185848c8ea18499808c918d84cf828e8c">[email&#160;protected]</span></a>
                                    <a className="rbt-contact-links d-block" href="find-store.html">View on map</a>
                                </div>
                            </div>
                        </div>
                        {/*  End sidebar footer  */}

                    </div>
                </div>

                <div className="rbt-sidebar-right-content">
                    <div className="rbt-sidebar-right-inner">

                        {/*  Start tab content  */}
                        <div className="tab-content" id="v-pills-tabContent">

                            {/*  Start single Category Tab content  */}
                            <div className="rbt-tab-content tab-pane fade show active" id="rbt-nav-pill-1" role="tabpanel"
                                aria-labelledby="rbt-tab-cat-sidebar-1" tabIndex={0}>
                                <div className="rbt-sub-category-products">
                                    <div className="rbt-category-products-inner">

                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-7.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Action Camera</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Sports Cameras</a></li>
                                                <li><a href="shop-by-category.html">Underwater Cameras</a></li>
                                                <li><a href="shop-by-category.html">360 Cameras</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-8.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Camera lenses</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">VR Cameras</a></li>
                                                <li><a href="shop-by-category.html">Panoramic Cameras </a></li>
                                                <li><a href="shop-by-category.html">3D Cameras</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-9.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Digital Camera</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Drone Cameras</a></li>
                                                <li><a href="shop-by-category.html">Helmet Cameras</a></li>
                                                <li><a href="shop-by-category.html">Dual-Lens Cameras</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-10.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">DSLR</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Compact 360 Cameras</a></li>
                                                <li><a href="shop-by-category.html">DSLR Cameras</a></li>
                                                <li><a href="shop-by-category.html">Mirrorless Cameras</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-11.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Handycam</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Point-and-Shoot Cameras</a></li>
                                                <li><a href="shop-by-category.html">Bridge Cameras</a></li>
                                                <li><a href="shop-by-category.html">Compact Cameras</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-12.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Mirrorless Camera</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Full-Frame Mirrorless</a></li>
                                                <li><a href="shop-by-category.html">APS-C Mirrorless</a></li>
                                                <li><a href="shop-by-category.html">Micro Four Thirds Mirrorless</a>
                                                </li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-13.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Dash Cam</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Compact Mirrorless</a></li>
                                                <li><a href="shop-by-category.html">Medium Format Mirrorless</a></li>
                                                <li><a href="shop-by-category.html">Panoramic</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-14.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Video Camera</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Digital Camcorders</a></li>
                                                <li><a href="shop-by-category.html">Professional Camcorders</a></li>
                                                <li><a href="shop-by-category.html">4K Camcorders</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-15.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Instant Camera</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Compact Camcorders</a></li>
                                                <li><a href="shop-by-category.html">High Definition (HD) Camcorders</a>
                                                </li>
                                                <li><a href="shop-by-category.html">Panoramic</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-16.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Camera Accessories</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">SD Cards (High-Speed)</a></li>
                                                <li><a href="shop-by-category.html">MicroSD Cards</a></li>
                                                <li><a href="shop-by-category.html">External Hard Drives</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-17.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Camera Tripod</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Travel Tripods</a></li>
                                                <li><a href="shop-by-category.html">Tabletop Tripods</a></li>
                                                <li><a href="shop-by-category.html">Monopods</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}

                                    </div>
                                    {/*  Start banner  */}
                                    <div className="rbt-sidebar-banner">
                                        <div className="rbt-banner-img">
                                            <img src="/assets/images/product-img/sidebar-category/product-banner.webp"
                                                alt="Banner Image" />
                                        </div>
                                        <div className="rbt-sidebar-banner-content">
                                            <p className="rbt-sidebar-banner-text">Camera Accessories
                                                <span className="rbt-text-color-primary rbt-text-semi-bold ml--4">11th
                                                    December</span>
                                            </p>
                                            <h2 className="rbt-sidebar-banner-titile h4">Up to 40% Off <span
                                                    className="rbt-text-regular">On All Brands</span>
                                            </h2>
                                            <a href="#" className="rbt-btn rbt-btn-sm">Know More</a>
                                        </div>
                                    </div>
                                    {/*  End banner  */}

                                </div>
                            </div>
                            {/*  End single Category Tab content  */}

                            {/*  Start single Category Tab content  */}
                            <div className="rbt-tab-content tab-pane fade" id="rbt-nav-pill-2" role="tabpanel"
                                aria-labelledby="rbt-tab-cat-sidebar-2" tabIndex={0}>
                                <div className="rbt-sub-category-products">
                                    <div className="rbt-category-products-inner">

                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-1.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Fitness Tracker</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Smart Bands</a></li>
                                                <li><a href="shop-by-category.html">Heart Rate Monitors</a></li>
                                                <li><a href="shop-by-category.html">Sleep Trackers</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-2.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Bluetooth</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Luxury Bluetooth Watches</a></li>
                                                <li><a href="shop-by-category.html">Hybrid Smartwatches</a></li>
                                                <li><a href="shop-by-category.html">Kids' Smartwatches</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-3.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Hybrid</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Fitness Hybrid Watches</a></li>
                                                <li><a href="shop-by-category.html">Smart Hybrid Watches</a></li>
                                                <li><a href="shop-by-category.html">Classic Hybrid Watches</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-4.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Regular</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Analog Watches</a></li>
                                                <li><a href="shop-by-category.html">Digital Watches</a></li>
                                                <li><a href="shop-by-category.html">Dress Watches</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-5.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Touchscreen</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Smartwatches</a></li>
                                                <li><a href="shop-by-category.html">Fitness Trackers</a></li>
                                                <li><a href="shop-by-category.html">Hybrid Smartwatches</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}

                                    </div>
                                    {/*  Start banner  */}
                                    <div className="rbt-sidebar-banner">
                                        <div className="rbt-banner-img">
                                            <img src="/assets/images/product-img/sidebar-category/product-banner.webp"
                                                alt="Banner Image" />
                                        </div>
                                        <div className="rbt-sidebar-banner-content">
                                            <p className="rbt-sidebar-banner-text">Starting From <span
                                                    className="rbt-text-color-primary rbt-text-semi-bold ml--4">11th
                                                    December</span></p>
                                            <h2 className="rbt-sidebar-banner-titile h4">Up to 40% Off <span
                                                    className="rbt-text-regular">On All Brands</span>
                                            </h2>
                                            <a href="#" className="rbt-btn rbt-btn-sm">Know More</a>
                                        </div>
                                    </div>
                                    {/*  End banner  */}

                                </div>
                            </div>
                            {/*  End single Category Tab content  */}

                            {/*  Start single Category Tab content  */}
                            <div className="rbt-tab-content tab-pane fade" id="rbt-nav-pill-3" role="tabpanel"
                                aria-labelledby="rbt-tab-cat-sidebar-3" tabIndex={0}>
                                <div className="rbt-sub-category-products">
                                    <div className="rbt-category-products-inner">

                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-18.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">QLED TV</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li>
                                                    <a href="shop-by-categories.html"
                                                        className="rbt-underline-btn btn-white">
                                                        View All
                                                        <i className="fa-regular fa-chevron-right"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-19.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Smart TV</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li>
                                                    <a href="shop-by-categories.html"
                                                        className="rbt-underline-btn btn-white">
                                                        View All
                                                        <i className="fa-regular fa-chevron-right"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-20.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">UHD TV</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li>
                                                    <a href="shop-by-categories.html"
                                                        className="rbt-underline-btn btn-white">
                                                        View All
                                                        <i className="fa-regular fa-chevron-right"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-21.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">HD TV</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li>
                                                    <a href="shop-by-categories.html"
                                                        className="rbt-underline-btn btn-white">
                                                        View All
                                                        <i className="fa-regular fa-chevron-right"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-22.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">LED TV</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li>
                                                    <a href="shop-by-categories.html"
                                                        className="rbt-underline-btn btn-white">
                                                        View All
                                                        <i className="fa-regular fa-chevron-right"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-23.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">4K TV</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li>
                                                    <a href="shop-by-categories.html"
                                                        className="rbt-underline-btn btn-white">
                                                        View All
                                                        <i className="fa-regular fa-chevron-right"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}

                                    </div>
                                    {/*  Start banner  */}
                                    <div className="rbt-sidebar-banner">
                                        <div className="rbt-banner-img">
                                            <img src="/assets/images/product-img/sidebar-category/product-banner.webp"
                                                alt="Banner Image" />
                                        </div>
                                        <div className="rbt-sidebar-banner-content">
                                            <p className="rbt-sidebar-banner-text">Starting From <span
                                                    className="rbt-text-color-primary rbt-text-semi-bold ml--4">11th
                                                    December</span></p>
                                            <h2 className="rbt-sidebar-banner-titile h4">Up to 40% Off <span
                                                    className="rbt-text-regular">On All Brands</span>
                                            </h2>
                                            <a href="#" className="rbt-btn rbt-btn-sm">Know More</a>
                                        </div>
                                    </div>
                                    {/*  End banner  */}

                                </div>
                            </div>
                            {/*  End single Category Tab content  */}

                            {/*  Start single Category Tab content  */}
                            <div className="rbt-tab-content tab-pane fade" id="rbt-nav-pill-4" role="tabpanel"
                                aria-labelledby="rbt-tab-cat-sidebar-4" tabIndex={0}>
                                <div className="rbt-sub-category-products">
                                    <div className="rbt-category-products-inner">

                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-24.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Gaming Keyboard</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Apex Gamer Pro</a></li>
                                                <li><a href="shop-by-category.html">Stealth Strike Keyboard</a></li>
                                                <li><a href="shop-by-category.html">Rapid Fire RGB</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-25.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Gaming Headset</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">SoundStorm Pro</a></li>
                                                <li><a href="shop-by-category.html">EchoMaster Elite</a></li>
                                                <li><a href="shop-by-category.html">BattleTune 360</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-26.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Gaming Chair</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Elite Gamer Throne</a></li>
                                                <li><a href="shop-by-category.html">Turbo Comfort Seat</a></li>
                                                <li><a href="shop-by-category.html">Pro Series Gaming Chair</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-27.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Mouse Pads</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">GlidePro Mouse Pad</a></li>
                                                <li><a href="shop-by-category.html">PixelPerfect Pad</a></li>
                                                <li><a href="shop-by-category.html">EagleEye Mouse Mat</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-28.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Joystick</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">ProGamer Joystick</a></li>
                                                <li><a href="shop-by-category.html">Precision Play Controller</a></li>
                                                <li><a href="shop-by-category.html">TurboGrip Joystick</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-29.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">VR headset</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">VisionSphere VR Headset</a></li>
                                                <li><a href="shop-by-category.html">ImmersiveEye VR Goggles</a></li>
                                                <li><a href="shop-by-category.html">RealityFusion Headset</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-30.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">PlayStation Acce...</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Crystal Clear Faceplate</a></li>
                                                <li><a href="shop-by-category.html">ComfortFit Chair</a></li>
                                                <li><a href="shop-by-category.html">Dynamic RGB LED</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-31.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Gaming Desk</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">ProGamer Desk</a></li>
                                                <li><a href="shop-by-category.html">Titan Gaming Station</a></li>
                                                <li><a href="shop-by-category.html">Arcade Pro Desk</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-32.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Gaming Sofa</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Victory Lounge</a></li>
                                                <li><a href="shop-by-category.html">Pixel Perch</a></li>
                                                <li><a href="shop-by-category.html">Gamer's Retreat</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}

                                    </div>
                                    {/*  Start banner  */}
                                    <div className="rbt-sidebar-banner">
                                        <div className="rbt-banner-img">
                                            <img src="/assets/images/product-img/sidebar-category/product-banner.webp"
                                                alt="Banner Image" />
                                        </div>
                                        <div className="rbt-sidebar-banner-content">
                                            <p className="rbt-sidebar-banner-text">Starting From <span
                                                    className="rbt-text-color-primary rbt-text-semi-bold ml--4">11th
                                                    December</span></p>
                                            <h2 className="rbt-sidebar-banner-titile h4">Up to 40% Off <span
                                                    className="rbt-text-regular">On All Brands</span>
                                            </h2>
                                            <a href="#" className="rbt-btn rbt-btn-sm">Know More</a>
                                        </div>
                                    </div>
                                    {/*  End banner  */}

                                </div>
                            </div>
                            {/*  End single Category Tab content  */}

                            {/*  Start single Category Tab content  */}
                            <div className="rbt-tab-content tab-pane fade" id="rbt-nav-pill-5" role="tabpanel"
                                aria-labelledby="rbt-tab-cat-sidebar-5" tabIndex={0}>
                                <div className="rbt-sub-category-products">

                                    <div className="rbt-category-products-inner">
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-33.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Bluetooth Headphone</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">SoundWave Pro</a></li>
                                                <li><a href="shop-by-category.html">AeroSound Bluetooth</a></li>
                                                <li><a href="shop-by-category.html">PulseBeats Wireless</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-34.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Headphone Stand</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Audio Aegis</a></li>
                                                <li><a href="shop-by-category.html">Harmonic Holder</a></li>
                                                <li><a href="shop-by-category.html">Headset Haven</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-35.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Home Theater</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Cinematic Sound Bar</a></li>
                                                <li><a href="shop-by-category.html">Ultra HD Projector</a></li>
                                                <li><a href="shop-by-category.html">4K Smart TV</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-36.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Bluetooth Speaker</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">SoundWave Pro</a></li>
                                                <li><a href="shop-by-category.html">BassBlaster 360</a></li>
                                                <li><a href="shop-by-category.html">AeroSound Compact</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-37.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Soundbar</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Versatile Soundbar</a></li>
                                                <li><a href="shop-by-category.html">Signature Series Soundbar</a></li>
                                                <li><a href="shop-by-category.html">ProSound Soundbar</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-38.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Microphone</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">SoundWave Pro</a></li>
                                                <li><a href="shop-by-category.html">EchoSphere Mic</a></li>
                                                <li><a href="shop-by-category.html">ClearCast 3000</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-39.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Voice Recorder</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">EchoNote Pro</a></li>
                                                <li><a href="shop-by-category.html">VoxCapture 3000</a></li>
                                                <li><a href="shop-by-category.html">SoundScribe</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-40.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Sound Card</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">AeroSound Pro</a></li>
                                                <li><a href="shop-by-category.html">EchoMaster FX</a></li>
                                                <li><a href="shop-by-category.html">Vortex SoundBlaster</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}

                                    </div>
                                    {/*  Start banner  */}
                                    <div className="rbt-sidebar-banner">
                                        <div className="rbt-banner-img">
                                            <img src="/assets/images/product-img/sidebar-category/product-banner.webp"
                                                alt="Banner Image" />
                                        </div>
                                        <div className="rbt-sidebar-banner-content">
                                            <p className="rbt-sidebar-banner-text">Starting From <span
                                                    className="rbt-text-color-primary rbt-text-semi-bold ml--4">11th
                                                    December</span></p>
                                            <h2 className="rbt-sidebar-banner-titile h4">Up to 40% Off <span
                                                    className="rbt-text-regular">On All Brands</span>
                                            </h2>
                                            <a href="#" className="rbt-btn rbt-btn-sm">Know More</a>
                                        </div>
                                    </div>
                                    {/*  End banner  */}
                                </div>
                            </div>
                            {/*  End single Category Tab content  */}

                            {/*  Start single Category Tab content  */}
                            <div className="rbt-tab-content tab-pane fade" id="rbt-nav-pill-6" role="tabpanel"
                                aria-labelledby="rbt-tab-cat-sidebar-6" tabIndex={0}>
                                <div className="rbt-sub-category-products">
                                    <div className="rbt-category-products-inner">
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-41.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Air Conditioner</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">CoolBreeze Pro</a></li>
                                                <li><a href="shop-by-category.html">ChillMaster Elite</a></li>
                                                <li><a href="shop-by-category.html">AirFlow Genius</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-42.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Geyser</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">AquaFlow Geysers</a></li>
                                                <li><a href="shop-by-category.html">TurboHeat Geysers</a></li>
                                                <li><a href="shop-by-category.html">EcoHeat Geysers</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-43.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Oven</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">CrispBake Oven</a></li>
                                                <li><a href="shop-by-category.html">QuickHeat Convection Oven</a></li>
                                                <li><a href="shop-by-category.html">PerfectBake Electric Oven</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-44.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Air Fryer</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">CrispMaster Air Fryer</a></li>
                                                <li><a href="shop-by-category.html">Healthy Fry Pro</a></li>
                                                <li><a href="shop-by-category.html">QuickCrisp Air Fryer</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-45.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Washing Machine</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">EcoClean Pro</a></li>
                                                <li><a href="shop-by-category.html">UltraWash 360</a></li>
                                                <li><a href="shop-by-category.html">QuickSpin Deluxe</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-46.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Sewing Machine</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">StitchPro 300</a></li>
                                                <li><a href="shop-by-category.html">SewMaster Deluxe</a></li>
                                                <li><a href="shop-by-category.html">QuiltCraft Elite</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-47.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Air Purifier</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">PureAir Breeze</a></li>
                                                <li><a href="shop-by-category.html">FreshFlow Purifier</a></li>
                                                <li><a href="shop-by-category.html">BreatheEasy Pro</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-48.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Vacuum Cleaner</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">PowerSweep Pro</a></li>
                                                <li><a href="shop-by-category.html">UltraClean Cyclone</a></li>
                                                <li><a href="shop-by-category.html">DustBuster Max</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-49.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Blender</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Smoothie Master Pro</a></li>
                                                <li><a href="shop-by-category.html">NutriBlend Ultra</a></li>
                                                <li><a href="shop-by-category.html">EcoBlend Portable Blender</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-50.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Cooker</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">PowerMix 3000</a></li>
                                                <li><a href="shop-by-category.html">Frozen Fusion Blender</a></li>
                                                <li><a href="shop-by-category.html">UltraSmooth Blender</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-51.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Iron</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">Blender & Chop Duo</a></li>
                                                <li><a href="shop-by-category.html">TurboMix Professional</a></li>
                                                <li><a href="shop-by-category.html">BlendSmart 2-in-1</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}
                                        {/*  Start product singel  */}
                                        <div className="rbt-sub-category-product">
                                            <a href="#" className="rbt-sidebar-category-img">
                                                <img src="/assets/images/product-img/sidebar-category/category-product-52.webp"
                                                    alt="Product Image" />
                                            </a>
                                            <h2 className="rbt-category-offcanvas-header h5"><a
                                                    href="shop-by-categories.html">Mini Heater</a></h2>
                                            <ul className="rbt-product-features has-link-underline-effect">
                                                <li><a href="shop-by-category.html">HeatWave Blanket</a></li>
                                                <li><a href="shop-by-category.html">ThermoCushion </a></li>
                                                <li><a href="shop-by-category.html">SootheHeat Massager</a></li>
                                            </ul>
                                        </div>
                                        {/*  End product singel  */}

                                    </div>
                                    {/*  Start banner  */}
                                    <div className="rbt-sidebar-banner">
                                        <div className="rbt-banner-img">
                                            <img src="/assets/images/product-img/sidebar-category/product-banner.webp"
                                                alt="Banner Image" />
                                        </div>
                                        <div className="rbt-sidebar-banner-content">
                                            <p className="rbt-sidebar-banner-text">Starting From <span
                                                    className="rbt-text-color-primary rbt-text-semi-bold ml--4">11th
                                                    December</span></p>
                                            <h2 className="rbt-sidebar-banner-titile h4">Up to 40% Off <span
                                                    className="rbt-text-regular">On All Brands</span>
                                            </h2>
                                            <a href="#" className="rbt-btn rbt-btn-sm">Know More</a>
                                        </div>
                                    </div>
                                    {/*  End banner  */}

                                </div>
                            </div>
                            {/*  End single Category Tab content  */}
                        </div>

                        {/*  End tab content  */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/*  End Side Nav  */}
    {/*  Start Side Nav  */}
    <div className="rbt-cart-side-menu rbt-sidebar-cart">
        <div className="inner-wrapper">
            <div className="inner-top">
                <div className="rbt-cart-header">
                    <div className="title-section">
                        <h2 className="title mb--0 h6"><i className="fa-sharp fa-regular fa-cart-shopping mr--12"></i> Your cart
                        </h2>
                    </div>
                    <div className="rbt-quick-info-tag d-flex mt--16 rbt-flash-animation">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M18.9706 14.9359C18.8148 18.8649 15.7493 22 11.9891 22C8.12909 22 5 18.5858 5 14.6221C5 14.0924 4.99101 13.0336 5.74352 11.2472C6.19387 10.1781 6.47633 9.50646 6.63574 8.89253C6.72333 8.55511 6.89367 8.01904 7.37926 8.89253C7.66559 9.40757 7.67666 10.1483 7.67666 10.1483C7.67666 10.1483 8.74197 9.28536 9.4611 7.63673C10.5153 5.21985 9.67419 3.77512 9.38675 2.77048C9.28727 2.42294 9.22481 1.79833 9.90721 2.06409C10.6025 2.33495 12.4408 3.69334 13.4017 5.12512C14.7732 7.16855 15.2605 9.128 15.2605 9.128C15.2605 9.128 15.6997 8.55268 15.8553 7.95068C16.0312 7.27089 16.0338 6.59763 16.5988 7.32285C17.1361 8.01253 17.9341 9.3086 18.3833 10.5408C19.1989 12.7784 18.9706 14.9359 18.9706 14.9359Z"
                                fill="url(#paint0_linear_47_2365484)" />
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M11.9999 22C9.23852 22 7 19.7944 7 17.0735C7 15.4318 7.67145 14.435 9.0689 13.0833C9.96366 12.2179 10.8011 11.1549 11.157 10.4311C11.2271 10.2886 11.3866 9.54605 12.0014 10.4155C12.3239 10.8714 12.8296 11.6823 13.1538 12.3744C13.7127 13.5676 13.8461 14.7239 13.8461 14.7239C13.8461 14.7239 14.3938 14.4059 14.7692 13.5871C14.8902 13.3232 15.1348 12.3241 15.8186 13.323C16.3204 14.0561 17.0097 15.3741 16.9999 17.0735C16.9999 19.7944 14.7613 22 11.9999 22Z"
                                fill="#FC9502" />
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M12.1019 16C12.8497 16 12.8497 17.4475 13.7996 19.3803C14.4321 20.6672 13.486 22 12.1019 22C10.7178 22 10 20.8271 10 19.3803C10 17.9335 11.3541 16 12.1019 16Z"
                                fill="#FCE202" />
                            <defs>
                                <linearGradient id="paint0_linear_47_2365484" x1="11.9995" y1="22.0148" x2="11.9995"
                                    y2="2.01511" gradientUnits="userSpaceOnUse">
                                    <stop offset="1" stopColor="#FF4C0D" />
                                    <stop offset="1" stopColor="#FC9502" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <p>Limited Item, <strong>checkout within <span className="rbt-countdown-cart">10m
                                    00s</span></strong>
                        </p>
                    </div>
                    <div className="rbt-btn-close" id="btn_sideNavClose">
                        <button className="minicart-close-button rbt-round-btn"><i className="fa-solid fa-xmark"></i></button>
                    </div>
                </div>
                <nav className="side-nav w-100">
                    <ul className="rbt-minicart-wrapper" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                        {items.length === 0 ? (
                            <li className="text-center py-5">
                              <p className="b1">Your cart is empty</p>
                            </li>
                        ) : (
                            items.map((item) => (
                                    <li className="minicart-item" key={item.id}>
                                        <div className="thumbnail">
                                            <a href={`/product/${item.product_id}`}>
                                                <img src={item.thumbnail || '/assets/images/product-img/electronics/electro-c-01.webp'}
                                                    alt={item.title} />
                                            </a>
                                        </div>
                                        <div className="product-content">
                                            <h3 className="title h6">
                                                <a href={`/product/${item.product_id}`}>{item.title}</a>
                                            </h3>
                                            {item.variant_title && <span className="b3 d-block mb--4 text-muted">{item.variant_title}</span>}
                                            <span className="quantity">{item.quantity}x <span className="price">{formatPrice(item.unit_price, currencyCode)}</span></span>
                                            <div className="bottom-part">
                                                <div className="rbt-qty-area">
                                                    <button 
                                                        className="qty-item-btn qty-item-btn-decr"
                                                        onClick={() => updateLineItem(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <i className="fa-solid fa-minus"></i>
                                                    </button>
                                                    <input 
                                                        type="number" 
                                                        className="items-qty-input" 
                                                        value={item.quantity}
                                                        readOnly 
                                                    />
                                                    <button 
                                                        className="qty-item-btn qty-item-btn-incr"
                                                        onClick={() => updateLineItem(item.id, item.quantity + 1)}
                                                    >
                                                        <i className="fa-solid fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="close-btn">
                                            <button 
                                                className="rbt-round-btn"
                                                onClick={() => removeLineItem(item.id)}
                                            >
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </div>
                                    </li>
                            ))
                        )}</ul>
                    <div className="minicart-quick-access-area mt--24">
                        <a href="#" className="single-quick-access rbt-note-btn">
                            <span className="icon"><i className="fa-regular fa-pen"></i></span>
                            <span className="text">Note</span>
                        </a>
                        <span className="hr-sepator"></span>
                        <a href="#" className="single-quick-access rbt-shipping-btn">
                            <span className="icon"><i className="fa-regular fa-truck-fast"></i></span>
                            <span className="text">Shipping</span>
                        </a>
                        <span className="hr-sepator"></span>
                        <a href="#" className="single-quick-access rbt-coupon-btn">
                            <span className="icon"><i className="fa-regular fa-ticket"></i></span>
                            <span className="text">Coupon</span>
                        </a>
                    </div>
                    <div className="minicart-inc-items-area mt--12">
                        <h3 className="title h6 positin-top">You May Also Like</h3>
                        <div className="bottom-area">
                            <div
                                className="swiper rbt-dot-top-right inc-item-swiper-activation rbt-minicart-wrapper overflow-hidden">
                                <div className="swiper-wrapper">
                                  {suggestedProducts.map((p) => (
                                    <div className="swiper-slide" key={p.id}>
                                        <div className="minicart-item">
                                            <div className="thumbnail">
                                                <a href={`/product/${p.handle || p.id}`}>
                                                    <img src={p.thumbnail || p.images?.[0]?.url || '/assets/images/product-img/electronics/electro-c-01.webp'}
                                                        alt={p.title} />
                                                </a>
                                            </div>
                                            <div className="product-content">
                                                <h3 className="title h6"><a href={`/product/${p.handle || p.id}`}>{p.title}</a></h3>
                                                <span className="quantity"><span className="price">{formatPrice(p.variants?.[0]?.prices?.[0]?.amount || 0, currencyCode)}</span></span>
                                            </div>
                                            <a href="#!" className="add-itembtn tooltips" data-bs-toggle="modal"
                                                data-bs-target="#addedcartModal" data-tooltip="Add to Cart"><i
                                                    className="fa-regular fa-cart-plus"></i></a>
                                        </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="rbt-swiper-pagination"></div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="rbt-minicart-footer">
                <hr className="mb--0 mt--16" />
                <div className="rbt-cart-subttotal">
                    <p>Subtotal ({items.reduce((sum, i) => sum + i.quantity, 0)} items)</p>
                    <p className="price">{formatPrice(subtotal, currencyCode)}</p>
                </div>
                <div className="rbt-cart-subttotal">
                    <p>Shipping</p>
                    <p className="price">{shipping === 0 ? 'Free' : formatPrice(shipping, currencyCode)}</p>
                </div>
                <hr className="mb--0" />
                <div className="rbt-cart-subttotal">
                    <p className="subtotal"><strong>Total</strong></p>
                    <p className="price">{formatPrice(total, currencyCode)}</p>
                </div>

                <div className="rbt-minicart-bottom mt--24">
                    <div className="checkout-btn mt--20">
                        <a className="rbt-btn w-100 text-center" href="#">
                            <span className="btn-text">Checkout</span>
                        </a>
                    </div>

                </div>

            </div>
        </div>
        <a href="#!" className="rbt-close-inner-popup rbt-popup-close-btn"></a>
        <div className="rbt-offcanvas-inner-popup">
            <div className="rbt-offcanvas-inner-popup-card note-popup">
                <div className="rbt-offcanvas-card-inner">
                    <h3 className="rbt-title rbt-text-bold h6">
                        <span className="mr--4"><i className="fa-regular fa-pen"></i></span>
                        Add note for seller
                    </h3>
                    <form>
                        <div className="rbt-input-field-grp mb--12">
                            <textarea className="rbt-text-field" name="message"
                                placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                        </div>
                        <div className="rbt-btn-group mt--16">
                            <button className="rbt-btn rbt-btn-md rbt-btn-primary d-block w-100">Apply</button>
                            <button
                                className="rbt-btn rbt-btn-md rbt-btn-naked d-block w-100 mt--8 mb--8 rbt-popup-close-btn">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="rbt-offcanvas-inner-popup">
            <div className="rbt-offcanvas-inner-popup-card shipping-popup">
                <div className="rbt-offcanvas-card-inner">
                    <h3 className="rbt-title rbt-text-bold h6">
                        <span className="mr--4"><i className="fa-light fa-truck-fast"></i></span>
                        Estimate shipping rates
                    </h3>
                    <form>
                        <div className="rbt-input-field-grp mb--12">
                            <div className="rbt-dropdown-select filter-select rbt-modern-select search-by-category">
                                <select className="w-100 rbt-select-activation" data-live-search="true"
                                    data-live-search-placeholder="Search City">
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
                        <div className="rbt-input-field-grp mb--12">
                            <input type="text" placeholder="State" />
                        </div>
                        <div className="rbt-input-field-grp mb--12">
                            <input type="text" placeholder="City" />
                        </div>
                        <div className="rbt-input-field-grp">
                            <input type="text" placeholder="Pincode" />
                        </div>
                        <div className="rbt-btn-group mt--16">
                            <button className="rbt-btn rbt-btn-md rbt-btn-primary d-block w-100">Calculate shipping
                                rates</button>
                            <button
                                className="rbt-btn rbt-btn-md rbt-btn-naked d-block w-100 mt--8 mb--8 rbt-popup-close-btn">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="rbt-offcanvas-inner-popup">
            <div className="rbt-offcanvas-inner-popup-card coupon-popup">
                <div className="rbt-offcanvas-card-inner">
                    <h3 className="rbt-title rbt-text-bold h6">
                        <span className="mr--4"><i className="fa-regular fa-ticket"></i></span>
                        Select or input Coupon
                    </h3>
                    <div className="rbt-coupon-wrapper rbt-bg-color-white">
                        <div className="rbt-coupon">
                            <div className="inner rbt-text-copy-activation">
                                <div className="left-part">
                                    <input type="text" value="WELCOME100" readOnly
                                        className="rbt-coupon-code-text rbt-has-right-shepe-border rbt-copy-value-field" />
                                </div>
                                <div className="coupon-details">
                                    <h2 className="rbt-coupon-info-title b1">UP TO 30% OFF</h2>
                                    <p className="rbt-coupon-info-sub-title b3 mt--4">For orders over ₹9.90</p>
                                    <ul className="rbt-coupon-info-list mt--12">
                                        <li><span>12/18/2023 14:00 ~ 12/25/2023 14:00</span></li>
                                        <li><span>The minimum spend for this coupon <strong>₹200.00</strong></span></li>
                                    </ul>
                                </div>
                                <button className="copy-icon rbt-round-btn rbt-bg-primary rbt-copy-btn" data-tooltip="Copy">
                                    <i className="fa-sharp fa-regular fa-copy"></i>
                                </button>
                            </div>
                        </div>
                        <div className="rbt-coupon">
                            <div className="inner rbt-text-copy-activation">
                                <div className="left-part">
                                    <input type="text" value="WELCOME100" readOnly
                                        className="rbt-coupon-code-text rbt-has-right-shepe-border rbt-copy-value-field" />
                                </div>
                                <div className="coupon-details">
                                    <h2 className="rbt-coupon-info-title b1">UP TO 30% OFF</h2>
                                    <p className="rbt-coupon-info-sub-title b3 mt--4">For orders over ₹9.90</p>
                                    <ul className="rbt-coupon-info-list mt--12">
                                        <li><span>12/18/2023 14:00 ~ 12/25/2023 14:00</span></li>
                                        <li><span>The minimum spend for this coupon <strong>₹200.00</strong></span></li>
                                    </ul>
                                </div>
                                <button className="copy-icon rbt-round-btn rbt-bg-primary rbt-copy-btn" data-tooltip="Copy">
                                    <i className="fa-sharp fa-regular fa-copy"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <form>
                        <div className="rbt-input-field-grp mt--24">
                            <p className="b1 mb--12 rbt-text-color-gray-600">If you have coupon code, please apply it below.
                            </p>
                            <input type="text" placeholder="Coupon code" />
                        </div>
                        <div className="rbt-btn-group mt--16">
                            <button className="rbt-btn rbt-btn-md rbt-btn-primary d-block w-100">Apply</button>
                            <button
                                className="rbt-btn rbt-btn-md rbt-btn-naked d-block w-100 mt--8 mb--8 rbt-popup-close-btn">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    {/*  End Side Nav  */}
    {/*  Start Side Nav  */}
    <div className="rbt-special-offprds-side-menu rbt-special-offer-sidemenu">
        <div className="inner-wrapper p--0">
            <aside className="rbt-sidebar">
                <div className="rbt-sidebar-widget-wrapper rbt-sidebar-bg-one">

                    <div className="rbt-sidebar-top sticky-top-0 rbt-bg-color-white">
                        <h3 className="rbt-sidebar-title mb--0 h-auto"><i
                                className="fa-sharp fa-regular fa-filter-list mr--4"></i>
                            Special Offers
                        </h3>

                        <button className="rbt-sidebar-close-btn" id="btn_filtersideNavClose">
                            <i className="fa-sharp fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div className="rbt-sidebar-bottom border-0">
                        <div className="row row--12 mt_dec--24">

                            {/*  Start Single Card   */}
                            <div className="col-12 mt--24">
                                <div className="rbt-card rbt-offer-card">
                                    <div className="inner">
                                        <div className="rbt-card-img">
                                            <a href="shop-by-categories.html">
                                                <img src="/assets/images/offer-list/offer-card-image-1.webp"
                                                    alt="Offer Thumbnail" />
                                            </a>
                                        </div>
                                        <div className="rbt-card-body">
                                            <div className="ofr-meta-part">
                                                <div className="single-meta">
                                                    <i className="fa-sharp fa-regular fa-calendar"></i>
                                                    26 Mar 2025 - 16 April 2025
                                                </div>
                                                <div className="single-meta">
                                                    <a href="find-store.html">
                                                        <i className="fa-regular fa-shop"></i>
                                                        All Outlet
                                                    </a>
                                                </div>
                                            </div>

                                            <hr
                                                className="rbt-separator rbt-separator-gray200 mt--16 mb--12 rbt-bg-color-gray-100" />
                                            <div className="rbt-ofr-card-content text-center mb--8">
                                                <h3 className="rbt-ofr-card-title mb--8 rbt-text-semi-bold h6">
                                                    <a href="shop-by-categories.html">Smartphone Mega Fest</a>
                                                </h3>
                                                <p className="rbt-ofr-card-text mb--12 b1 rbt-text-color-gray-500">Grab
                                                    top-brand smartphones at
                                                    unbeatable prices.</p>
                                                <a className="rbt-btn rbt-btn-md active" href="#">View
                                                    Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  End Single Card   */}

                            {/*  Start Single Card   */}
                            <div className="col-12 mt--24">
                                <div className="rbt-card rbt-offer-card">
                                    <div className="inner">
                                        <div className="rbt-card-img">
                                            <a href="shop-by-categories.html">
                                                <img src="/assets/images/offer-list/offer-card-image-2.webp"
                                                    alt="Offer Thumbnail" />
                                            </a>
                                        </div>
                                        <div className="rbt-card-body">
                                            <div className="ofr-meta-part">
                                                <div className="single-meta">
                                                    <i className="fa-sharp fa-regular fa-calendar"></i>
                                                    25 Feb 2025 - 16 Mar 2025
                                                </div>
                                                <div className="single-meta">
                                                    <a href="find-store.html">
                                                        <i className="fa-regular fa-shop"></i>
                                                        All Outlet
                                                    </a>
                                                </div>
                                            </div>

                                            <hr
                                                className="rbt-separator rbt-separator-gray200 mt--16 mb--12 rbt-bg-color-gray-100" />
                                            <div className="rbt-ofr-card-content text-center mb--8">
                                                <h3 className="rbt-ofr-card-title mb--8 rbt-text-semi-bold h6">
                                                    <a href="shop-by-categories.html">Gadget Fiesta</a>
                                                </h3>
                                                <p className="rbt-ofr-card-text mb--12 b1 rbt-text-color-gray-500">Shop the
                                                    latest gadgets at massive
                                                    discounts.</p>
                                                <a className="rbt-btn rbt-btn-md active" href="#">View
                                                    Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  End Single Card   */}

                            {/*  Start Single Card   */}
                            <div className="col-12 mt--24">
                                <div className="rbt-card rbt-offer-card">
                                    <div className="inner">
                                        <div className="rbt-card-img">
                                            <a href="shop-by-categories.html">
                                                <img src="/assets/images/offer-list/offer-card-image-3.webp"
                                                    alt="Offer Thumbnail" />
                                            </a>
                                        </div>
                                        <div className="rbt-card-body">
                                            <div className="ofr-meta-part">
                                                <div className="single-meta">
                                                    <i className="fa-sharp fa-regular fa-calendar"></i>
                                                    28 Feb 2025 - 16 Mar 2025
                                                </div>
                                                <div className="single-meta">
                                                    <a href="find-store.html">
                                                        <i className="fa-regular fa-shop"></i>
                                                        All Outlet
                                                    </a>
                                                </div>
                                            </div>

                                            <hr
                                                className="rbt-separator rbt-separator-gray200 mt--16 mb--12 rbt-bg-color-gray-100" />
                                            <div className="rbt-ofr-card-content text-center mb--8">
                                                <h3 className="rbt-ofr-card-title mb--8 rbt-text-semi-bold h6">
                                                    <a href="shop-by-categories.html">Tech Gear Fest</a>
                                                </h3>
                                                <p className="rbt-ofr-card-text mb--12 b1 rbt-text-color-gray-500">Upgrade
                                                    your
                                                    tech with unbeatable
                                                    deals on gadgets!</p>
                                                <a className="rbt-btn rbt-btn-md active" href="#">View
                                                    Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  End Single Card   */}

                            {/*  Start Single Card   */}
                            <div className="col-12 mt--24">
                                <div className="rbt-card rbt-offer-card">
                                    <div className="inner">
                                        <div className="rbt-card-img">
                                            <a href="shop-by-categories.html">
                                                <img src="/assets/images/offer-list/offer-card-image-4.webp"
                                                    alt="Offer Thumbnail" />
                                            </a>
                                        </div>
                                        <div className="rbt-card-body">
                                            <div className="ofr-meta-part">
                                                <div className="single-meta">
                                                    <i className="fa-sharp fa-regular fa-calendar"></i>
                                                    24 April 2025 - 16 May 2025
                                                </div>
                                                <div className="single-meta">
                                                    <a href="find-store.html">
                                                        <i className="fa-regular fa-shop"></i>
                                                        All Outlet
                                                    </a>
                                                </div>
                                            </div>

                                            <hr
                                                className="rbt-separator rbt-separator-gray200 mt--16 mb--12 rbt-bg-color-gray-100" />
                                            <div className="rbt-ofr-card-content text-center mb--8">
                                                <h3 className="rbt-ofr-card-title mb--8 rbt-text-semi-bold h6">
                                                    <a href="shop-by-categories.html">Electro Deals Carnival</a>
                                                </h3>
                                                <p className="rbt-ofr-card-text mb--12 b1 rbt-text-color-gray-500">Grab top
                                                    electronics at electrifying
                                                    discounts.</p>
                                                <a className="rbt-btn rbt-btn-md active" href="#">View
                                                    Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  End Single Card   */}

                            {/*  Start Single Card   */}
                            <div className="col-12 mt--24">
                                <div className="rbt-card rbt-offer-card">
                                    <div className="inner">
                                        <div className="rbt-card-img">
                                            <a href="shop-by-categories.html">
                                                <img src="/assets/images/offer-list/offer-card-image-5.webp"
                                                    alt="Offer Thumbnail" />
                                            </a>
                                        </div>
                                        <div className="rbt-card-body">
                                            <div className="ofr-meta-part">
                                                <div className="single-meta">
                                                    <i className="fa-sharp fa-regular fa-calendar"></i>
                                                    26 May 2025 - 16 Jun 2025
                                                </div>
                                                <div className="single-meta">
                                                    <a href="find-store.html">
                                                        <i className="fa-regular fa-shop"></i>
                                                        All Outlet
                                                    </a>
                                                </div>
                                            </div>

                                            <hr
                                                className="rbt-separator rbt-separator-gray200 mt--16 mb--12 rbt-bg-color-gray-100" />
                                            <div className="rbt-ofr-card-content text-center mb--8">
                                                <h3 className="rbt-ofr-card-title mb--8 rbt-text-semi-bold h6">
                                                    <a href="shop-by-categories.html">Gadget Galaxy Fest</a>
                                                </h3>
                                                <p className="rbt-ofr-card-text mb--12 b1 rbt-text-color-gray-500">Explore
                                                    the
                                                    gadgets with
                                                    out-of-this-world discounts!</p>
                                                <a className="rbt-btn rbt-btn-md active" href="#">View
                                                    Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  End Single Card   */}

                            {/*  Start Single Card   */}
                            <div className="col-12 mt--24">
                                <div className="rbt-card rbt-offer-card">
                                    <div className="inner">
                                        <div className="rbt-card-img">
                                            <a href="shop-by-categories.html">
                                                <img src="/assets/images/offer-list/offer-card-image-6.webp"
                                                    alt="Offer Thumbnail" />
                                            </a>
                                        </div>
                                        <div className="rbt-card-body">
                                            <div className="ofr-meta-part">
                                                <div className="single-meta">
                                                    <i className="fa-sharp fa-regular fa-calendar"></i>
                                                    26 April 2025 - 16 May 2025
                                                </div>
                                                <div className="single-meta">
                                                    <a href="find-store.html">
                                                        <i className="fa-regular fa-shop"></i>
                                                        All Outlet
                                                    </a>
                                                </div>
                                            </div>

                                            <hr
                                                className="rbt-separator rbt-separator-gray200 mt--16 mb--12 rbt-bg-color-gray-100" />
                                            <div className="rbt-ofr-card-content text-center mb--8">
                                                <h3 className="rbt-ofr-card-title mb--8 rbt-text-semi-bold h6">
                                                    <a href="shop-by-categories.html">Digital Wonderland</a>
                                                </h3>
                                                <p className="rbt-ofr-card-text mb--12 b1 rbt-text-color-gray-500">Dive into
                                                    a
                                                    world of tech deals on
                                                    must-have gadgets!</p>
                                                <a className="rbt-btn rbt-btn-md active" href="#">View
                                                    Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  End Single Card   */}

                            {/*  Start Single Card   */}
                            <div className="col-12 mt--24">
                                <div className="rbt-card rbt-offer-card">
                                    <div className="inner">
                                        <div className="rbt-card-img">
                                            <a href="shop-by-categories.html">
                                                <img src="/assets/images/offer-list/offer-card-image-7.webp"
                                                    alt="Offer Thumbnail" />
                                            </a>
                                        </div>
                                        <div className="rbt-card-body">
                                            <div className="ofr-meta-part">
                                                <div className="single-meta">
                                                    <i className="fa-sharp fa-regular fa-calendar"></i>
                                                    26 May 2025 - 16 Jun 2025
                                                </div>
                                                <div className="single-meta">
                                                    <a href="find-store.html">
                                                        <i className="fa-regular fa-shop"></i>
                                                        All Outlet
                                                    </a>
                                                </div>
                                            </div>

                                            <hr
                                                className="rbt-separator rbt-separator-gray200 mt--16 mb--12 rbt-bg-color-gray-100" />
                                            <div className="rbt-ofr-card-content text-center mb--8">
                                                <h3 className="rbt-ofr-card-title mb--8 rbt-text-semi-bold h6">
                                                    <a href="shop-by-categories.html">Future Tech Expo</a>
                                                </h3>
                                                <p className="rbt-ofr-card-text mb--12 b1 rbt-text-color-gray-500">Discover
                                                    cutting-edge gadgets and
                                                    futuristic tech!</p>
                                                <a className="rbt-btn rbt-btn-md active" href="#">View
                                                    Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  End Single Card   */}

                            {/*  Start Single Card   */}
                            <div className="col-12 mt--24">
                                <div className="rbt-card rbt-offer-card">
                                    <div className="inner">
                                        <div className="rbt-card-img">
                                            <a href="shop-by-categories.html">
                                                <img src="/assets/images/offer-list/offer-card-image-8.webp"
                                                    alt="Offer Thumbnail" />
                                            </a>
                                        </div>
                                        <div className="rbt-card-body">
                                            <div className="ofr-meta-part">
                                                <div className="single-meta">
                                                    <i className="fa-sharp fa-regular fa-calendar"></i>
                                                    26 Feb 2025 - 15 April 2025
                                                </div>
                                                <div className="single-meta">
                                                    <a href="find-store.html">
                                                        <i className="fa-regular fa-shop"></i>
                                                        All Outlet
                                                    </a>
                                                </div>
                                            </div>

                                            <hr
                                                className="rbt-separator rbt-separator-gray200 mt--16 mb--12 rbt-bg-color-gray-100" />
                                            <div className="rbt-ofr-card-content text-center mb--8">
                                                <h3 className="rbt-ofr-card-title mb--8 rbt-text-semi-bold h6">
                                                    <a href="shop-by-categories.html">Summer Mobile Fest</a>
                                                </h3>
                                                <p className="rbt-ofr-card-text mb--12 b1 rbt-text-color-gray-500">Hot deals
                                                    on
                                                    the latest smartphones
                                                    for a limited time!</p>
                                                <a className="rbt-btn rbt-btn-md active" href="#">View
                                                    Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  End Single Card   */}

                            {/*  Start Single Card   */}
                            <div className="col-12 mt--24">
                                <div className="rbt-card rbt-offer-card">
                                    <div className="inner">
                                        <div className="rbt-card-img">
                                            <a href="shop-by-categories.html">
                                                <img src="/assets/images/offer-list/offer-card-image-9.webp"
                                                    alt="Offer Thumbnail" />
                                            </a>
                                        </div>
                                        <div className="rbt-card-body">
                                            <div className="ofr-meta-part">
                                                <div className="single-meta">
                                                    <i className="fa-sharp fa-regular fa-calendar"></i>
                                                    25 April 2025 - 16 Jun 2025
                                                </div>
                                                <div className="single-meta">
                                                    <a href="find-store.html">
                                                        <i className="fa-regular fa-shop"></i>
                                                        All Outlet
                                                    </a>
                                                </div>
                                            </div>

                                            <hr
                                                className="rbt-separator rbt-separator-gray200 mt--16 mb--12 rbt-bg-color-gray-100" />
                                            <div className="rbt-ofr-card-content text-center mb--8">
                                                <h3 className="rbt-ofr-card-title mb--8 rbt-text-semi-bold h6">
                                                    <a href="shop-by-categories.html">Smartphone Mega Fest</a>
                                                </h3>
                                                <p className="rbt-ofr-card-text mb--12 b1 rbt-text-color-gray-500">Grab the
                                                    hottest smartphones at
                                                    unbeatable prices!</p>
                                                <a className="rbt-btn rbt-btn-md active" href="#">View
                                                    Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  End Single Card   */}

                        </div>
                    </div>
                </div>

            </aside>
        </div>
    </div>
    {/*  End Side Nav  */}
    {/*  <a className="close_side_menu" href="javascript:void(0);"></a>  */}
    {/*  Start Wishlist Modal Area   */}
    <div className="rbt-default-modal modal fade has-rbt-top-folder-shape" id="recent-viewModal" tabIndex={-1}
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered xs-size">
            <div className="modal-content">

                <div className="rbt-folder-shape-right-portion">
                    <svg xmlns="http://www.w3.org/2000/svg" width="85" height="90" viewBox="0 0 85 90" fill="none">
                        <path
                            d="M0 0H11.1844C14.5695 0 17.7971 1.42971 20.0716 3.93671L82.1927 72.4059C83.9992 74.397 84.9999 76.9893 84.9999 79.6778C84.9999 85.6547 85.0001 90 85.0001 90H0V0Z"
                            fill="white" />
                    </svg>
                </div>

                <div className="modal-header">
                    <button type="button" className="rbt-round-btn rbt-modal-dis-btn" data-bs-dismiss="modal"
                        aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="rbt-top-folder-shape-wrapper">
                    <div className="rbt-recent-view-prd-area rbt-content-trs-portion rbt-scroll-vertical-wrapper">

                        <h3 className="rbt-title mb--16 rbt-text-bold h6">Recently Viewed Items</h3>
                        <div className="rbt-scroll-vertical">
                            <div className="row row--12 mt_dec--24 rbt-card-row-has-top-separator rbt-two-align-card-row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt--24">
                                    <div className="rbt-card rbt-product-card rbt-list-view-variation rbt-list-view-sm">
                                        <div className="inner rbt-scroll-trigger fade_in animation-order-1">
                                            <div className="rbt-card-body">
                                                <div className="rbt-card-rating">
                                                    <ul className="rbt-rating-icon-list">
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                    </ul>
                                                    <p className="rating-digit">(42)</p>
                                                </div>
                                                <h3 className="rbt-card-title h6"><a
                                                        href="product-single-default.html">Beats
                                                        Studio Pro Wireless Earbuds – Black</a></h3>

                                                <div className="pricing-part">
                                                    <del className="price-text">₹255.34</del>
                                                    <span className="price-text">₹69.78</span>
                                                </div>
                                            </div>
                                            <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                <a href="product-single-default.html"><img
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-list-01.webp"
                                                        alt="Card Image" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt--24">
                                    <div className="rbt-card rbt-product-card rbt-list-view-variation rbt-list-view-sm">
                                        <div className="inner rbt-scroll-trigger fade_in animation-order-2">
                                            <div className="rbt-card-body">
                                                <div className="rbt-card-rating">
                                                    <ul className="rbt-rating-icon-list">
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                    </ul>
                                                    <p className="rating-digit">(42)</p>
                                                </div>
                                                <h3 className="rbt-card-title h6"><a
                                                        href="product-single-default.html">Apple
                                                        12.9-inch iPad Pro Wi-Fi 512GB Gray Space</a></h3>

                                                <div className="pricing-part">
                                                    <del className="price-text">₹56.00</del>
                                                    <span className="price-text">₹26.00</span>
                                                </div>
                                            </div>
                                            <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                <a href="product-single-default.html"><img
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-list-02.webp"
                                                        alt="Card Image" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt--24">
                                    <div className="rbt-card rbt-product-card rbt-list-view-variation rbt-list-view-sm">
                                        <div className="inner rbt-scroll-trigger fade_in animation-order-3">
                                            <div className="rbt-card-body">
                                                <div className="rbt-card-rating">
                                                    <ul className="rbt-rating-icon-list">
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                    </ul>
                                                    <p className="rating-digit">(42)</p>
                                                </div>
                                                <h3 className="rbt-card-title h6"><a href="product-single-default.html"> DJI
                                                        OM
                                                        5
                                                        Handheld Smartphone Gimbal</a></h3>

                                                <div className="pricing-part">
                                                    <del className="price-text">₹116.34</del>
                                                    <span className="price-text">₹69.78</span>
                                                </div>
                                            </div>
                                            <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                <a href="product-single-default.html"><img
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-list-03.webp"
                                                        alt="Card Image" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt--24">
                                    <div className="rbt-card rbt-product-card rbt-list-view-variation rbt-list-view-sm">
                                        <div className="inner rbt-scroll-trigger fade_in animation-order-4">
                                            <div className="rbt-card-body">
                                                <div className="rbt-card-rating">
                                                    <ul className="rbt-rating-icon-list">
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                    </ul>
                                                    <p className="rating-digit">(42)</p>
                                                </div>
                                                <h3 className="rbt-card-title h6"><a
                                                        href="product-single-default.html">Apple
                                                        Watch
                                                        Ultra 2 – Titanium Case</a></h3>

                                                <div className="pricing-part">
                                                    <del className="price-text">₹96.34</del>
                                                    <span className="price-text">₹59.78</span>
                                                </div>
                                            </div>
                                            <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                <a href="product-single-default.html"><img
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-list-04.webp"
                                                        alt="Card Image" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt--24">
                                    <div className="rbt-card rbt-product-card rbt-list-view-variation rbt-list-view-sm">
                                        <div className="inner rbt-scroll-trigger fade_in animation-order-5">
                                            <div className="rbt-card-body">
                                                <div className="rbt-card-rating">
                                                    <ul className="rbt-rating-icon-list">
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                    </ul>
                                                    <p className="rating-digit">(42)</p>
                                                </div>
                                                <h3 className="rbt-card-title h6"><a
                                                        href="product-single-default.html">Apple
                                                        MacBook Pro 16-inch – M2 Chip</a></h3>

                                                <div className="pricing-part">
                                                    <del className="price-text">₹116.34</del>
                                                    <span className="price-text">₹69.78</span>
                                                </div>
                                            </div>
                                            <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                <a href="product-single-default.html"><img
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-list-05.webp"
                                                        alt="Card Image" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt--24">
                                    <div className="rbt-card rbt-product-card rbt-list-view-variation rbt-list-view-sm">
                                        <div className="inner rbt-scroll-trigger fade_in animation-order-6">
                                            <div className="rbt-card-body">
                                                <div className="rbt-card-rating">
                                                    <ul className="rbt-rating-icon-list">
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                    </ul>
                                                    <p className="rating-digit">(42)</p>
                                                </div>
                                                <h3 className="rbt-card-title h6"><a
                                                        href="product-single-default.html">Apple
                                                        iPad
                                                        Air 10.9-inch – Wi-Fi 256GB</a></h3>

                                                <div className="pricing-part">
                                                    <del className="price-text">₹219.34</del>
                                                    <span className="price-text">₹99.78</span>
                                                </div>
                                            </div>
                                            <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                <a href="product-single-default.html"><img
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-list-06.webp"
                                                        alt="Card Image" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt--24">
                                    <div className="rbt-card rbt-product-card rbt-list-view-variation rbt-list-view-sm">
                                        <div className="inner rbt-scroll-trigger fade_in animation-order-1">
                                            <div className="rbt-card-body">
                                                <div className="rbt-card-rating">
                                                    <ul className="rbt-rating-icon-list">
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                    </ul>
                                                    <p className="rating-digit">(42)</p>
                                                </div>
                                                <h3 className="rbt-card-title h6"><a
                                                        href="product-single-default.html">Beats
                                                        Studio Pro Wireless Earbuds – Black</a></h3>

                                                <div className="pricing-part">
                                                    <del className="price-text">₹255.34</del>
                                                    <span className="price-text">₹69.78</span>
                                                </div>
                                            </div>
                                            <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                <a href="product-single-default.html"><img
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-list-01.webp"
                                                        alt="Card Image" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt--24">
                                    <div className="rbt-card rbt-product-card rbt-list-view-variation rbt-list-view-sm">
                                        <div className="inner rbt-scroll-trigger fade_in animation-order-2">
                                            <div className="rbt-card-body">
                                                <div className="rbt-card-rating">
                                                    <ul className="rbt-rating-icon-list">
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                    </ul>
                                                    <p className="rating-digit">(42)</p>
                                                </div>
                                                <h3 className="rbt-card-title h6"><a
                                                        href="product-single-default.html">Apple
                                                        12.9-inch iPad Pro Wi-Fi 512GB Gray Space</a></h3>

                                                <div className="pricing-part">
                                                    <del className="price-text">₹56.00</del>
                                                    <span className="price-text">₹26.00</span>
                                                </div>
                                            </div>
                                            <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                <a href="product-single-default.html"><img
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-list-02.webp"
                                                        alt="Card Image" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt--24">
                                    <div className="rbt-card rbt-product-card rbt-list-view-variation rbt-list-view-sm">
                                        <div className="inner rbt-scroll-trigger fade_in animation-order-3">
                                            <div className="rbt-card-body">
                                                <div className="rbt-card-rating">
                                                    <ul className="rbt-rating-icon-list">
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                    </ul>
                                                    <p className="rating-digit">(42)</p>
                                                </div>
                                                <h3 className="rbt-card-title h6"><a href="product-single-default.html"> DJI
                                                        OM
                                                        5
                                                        Handheld Smartphone Gimbal</a></h3>

                                                <div className="pricing-part">
                                                    <del className="price-text">₹116.34</del>
                                                    <span className="price-text">₹69.78</span>
                                                </div>
                                            </div>
                                            <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                <a href="product-single-default.html"><img
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-list-03.webp"
                                                        alt="Card Image" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt--24">
                                    <div className="rbt-card rbt-product-card rbt-list-view-variation rbt-list-view-sm">
                                        <div className="inner rbt-scroll-trigger fade_in animation-order-4">
                                            <div className="rbt-card-body">
                                                <div className="rbt-card-rating">
                                                    <ul className="rbt-rating-icon-list">
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                    </ul>
                                                    <p className="rating-digit">(42)</p>
                                                </div>
                                                <h3 className="rbt-card-title h6"><a
                                                        href="product-single-default.html">Apple
                                                        Watch
                                                        Ultra 2 – Titanium Case</a></h3>

                                                <div className="pricing-part">
                                                    <del className="price-text">₹96.34</del>
                                                    <span className="price-text">₹59.78</span>
                                                </div>
                                            </div>
                                            <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                <a href="product-single-default.html"><img
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-list-04.webp"
                                                        alt="Card Image" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt--24">
                                    <div className="rbt-card rbt-product-card rbt-list-view-variation rbt-list-view-sm">
                                        <div className="inner rbt-scroll-trigger fade_in animation-order-5">
                                            <div className="rbt-card-body">
                                                <div className="rbt-card-rating">
                                                    <ul className="rbt-rating-icon-list">
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                    </ul>
                                                    <p className="rating-digit">(42)</p>
                                                </div>
                                                <h3 className="rbt-card-title h6"><a
                                                        href="product-single-default.html">Apple
                                                        MacBook Pro 16-inch – M2 Chip</a></h3>

                                                <div className="pricing-part">
                                                    <del className="price-text">₹116.34</del>
                                                    <span className="price-text">₹69.78</span>
                                                </div>
                                            </div>
                                            <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                <a href="product-single-default.html"><img
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-list-05.webp"
                                                        alt="Card Image" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt--24">
                                    <div className="rbt-card rbt-product-card rbt-list-view-variation rbt-list-view-sm">
                                        <div className="inner rbt-scroll-trigger fade_in animation-order-6">
                                            <div className="rbt-card-body">
                                                <div className="rbt-card-rating">
                                                    <ul className="rbt-rating-icon-list">
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                    </ul>
                                                    <p className="rating-digit">(42)</p>
                                                </div>
                                                <h3 className="rbt-card-title h6"><a
                                                        href="product-single-default.html">Apple
                                                        iPad
                                                        Air 10.9-inch – Wi-Fi 256GB</a></h3>

                                                <div className="pricing-part">
                                                    <del className="price-text">₹219.34</del>
                                                    <span className="price-text">₹99.78</span>
                                                </div>
                                            </div>
                                            <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                <a href="product-single-default.html"><img
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-list-06.webp"
                                                        alt="Card Image" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/*  End Wishlist Modal Area   */}

    </>
  );
}