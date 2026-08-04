'use client'

import React from 'react';
import { useAuth } from '@/lib/AuthContext';

const Footer = () => {
    const { customer } = useAuth();
    return (
        <>
            <footer className="rbt-footer rbt-footer-style-ten rbt-bg-color-gray-light">
                <div className="rbt-footer-top rbt-section-gap2">
                    <div className="container">
                        <div className="row mt_dec--24 justify-content-between">
                            {/* Column 1: Logo, Description & Contact */}
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12 mt--24 text-center text-md-start">
                                <div className="footer-widget">
                                    <div className="logo d-flex justify-content-center justify-content-md-start">
                                        <a href="/">
                                            <img alt="Ocean Student Projects Logo" src="/assets/images/logo/logo.webp" style={{ maxHeight: '80px' }} />
                                        </a>
                                    </div>
                                    <p className="description mt--16">
                                        Your one-stop destination for electronics components, development boards, and student projects in India.
                                    </p>
                                    <ul className="ft-link mt--16 p-0 list-unstyled">
                                        <li>
                                            <a href="tel:+917338975699" className="d-inline-flex align-items-center">
                                                <i className="fa-regular fa-phone mr--8 text-primary"></i>+91 733 897 5699
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Column 2: Get to Know Us */}
                            <div className="col-lg-2 col-md-6 col-sm-6 col-12 mt--24 text-center text-md-start">
                                <div className="footer-widget rbt-link-hover">
                                    <h3 className="ft-title">Get to Know Us</h3>
                                    <ul className="ft-link p-0 list-unstyled">
                                        <li><a href="/about">About Us</a></li>
                                        <li><a href="/contact">Contact Us</a></li>
                                        <li><a href="#!" className="rbt-cart-sidenav-activation">Shopping Cart</a></li>
                                    </ul>
                                </div>
                            </div>

                            {/* Column 3: Shop Categories */}
                            <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt--24 text-center text-md-start">
                                <div className="footer-widget rbt-link-hover">
                                    <h3 className="ft-title">Shop Categories</h3>
                                    <ul className="ft-link p-0 list-unstyled">
                                        <li><a href="/shop">Development Boards</a></li>
                                        <li><a href="/shop">Sensors &amp; Modules</a></li>
                                        <li><a href="/shop">IoT &amp; DIY Starter Kits</a></li>
                                        <li><a href="/shop">All Products</a></li>
                                    </ul>
                                </div>
                            </div>

                            {/* Column 4: Help & Policies */}
                            <div className="col-lg-3 col-md-6 col-sm-12 col-12 mt--24 text-center text-md-start">
                                <div className="footer-widget rbt-link-hover">
                                    <h3 className="ft-title">Let Us Help You</h3>
                                    <ul className="ft-link p-0 list-unstyled">
                                        <li><a href="#">Returns Policies</a></li>
                                        <li><a href="#">Refund and Returns</a></li>
                                        <li><a href="#">Privacy Policy</a></li>
                                        <li><a href="#">Terms and Conditions</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rbt-separator-mid">
                    <div className="container">
                        <hr className="rbt-separator m-0"/>
                    </div>
                </div>

                {/* Start Copyright Area  */}
                <div className="copyright-area copyright-style-1">
                    <div className="container">
                        <div className="row mt_dec--24 align-items-center justify-content-between text-center">
                            <div className="col-lg-4 col-md-12 col-12 mt--24 text-lg-start">
                                <div className="rbt-footer-social-area justify-content-center justify-content-lg-start d-flex flex-wrap rbt-gap--16">
                                    <p className="title mb--0">Follow Us :</p>
                                    <ul className="rbt-social-icon-list p-0 m-0 list-unstyled">
                                        <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-whatsapp"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-telegram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 col-12 mt--24">
                                <p className="rbt-link-hover mb-0">Copyright <span className="copyright-year">2026</span> © <a className="rbt-text-bold rbt-text-color-heading" href="/">Ocean Student Projects</a></p>
                            </div>
                            <div className="col-lg-4 col-md-12 col-12 mt--24 text-lg-end">
                                <ul className="payment-img-link justify-content-center justify-content-lg-end p-0 m-0 list-unstyled">
                                    <li><a href="#"><img alt="Payment Brand Image" src="/assets/images/payment-brand/image-01.webp"/></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Copyright Area  */}
            </footer>

            {/* Start Mobile bottom toolbar */}
            <div className="rbt-toolbar rbt-toolbar--bottom d-block d-xl-none">
                <div className="container p--0">
                    <div className="row row--0">
                        <div className="col-md-12">
                            <ul className="rbt-quick-access justify-content-around">
                                <li className="rbt-access-box">
                                    <a className="rbt-round-btn has-rbt-md-fsize" href="/">
                                        <i className="fa-regular fa-house"></i>
                                        <span className="rbt-toolbar-label"> Home</span>
                                    </a>
                                </li>

                                <li className="rbt-access-box">
                                    <a href="/shop" className="rbt-round-btn has-rbt-md-fsize">
                                        <i className="fa-regular fa-bag-shopping"></i>
                                        <span className="rbt-toolbar-label"> Shop</span>
                                    </a>
                                </li>

                                {/* Highly useful WhatsApp Support shortcut */}
                                <li className="rbt-access-box">
                                    <a className="rbt-round-btn has-rbt-md-fsize" href="https://wa.me/917338975699?text=Hi,%20I%20am%20interested%20in%20buying%20electronics%20components%20from%20Ocean%20Student%20Projects." target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#e8f7f0', color: '#136c39' }}>
                                        <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.2rem' }}></i>
                                        <span className="rbt-toolbar-label" style={{ color: '#136c39', fontWeight: 'bold' }}> WhatsApp</span>
                                    </a>
                                </li>

                                <li className="rbt-access-box">
                                     <a className="rbt-round-btn has-rbt-md-fsize rbt-cart-sidenav-activation" href="#!">
                                         <i className="fa-regular fa-cart-shopping"></i>
                                         <span className="rbt-toolbar-label"> Cart</span>
                                     </a>
                                 </li>

                                <li className="rbt-access-box">
                                    <a className="rbt-round-btn has-rbt-md-fsize" href={customer ? "/profile" : "/login"}>
                                        <i className="fa-regular fa-user"></i>
                                        <span className="rbt-toolbar-label"> Profile</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Mobile bottom toolbar */}
        </>
    );
};

export default Footer;
