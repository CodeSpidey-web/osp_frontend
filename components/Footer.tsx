'use client'

import React from 'react';
import { useAuth } from '@/lib/AuthContext';

const Footer = () => {
    const { customer } = useAuth();
    return (
        <>
            <style jsx>{`
                .osp-footer-root {
                    background: linear-gradient(180deg, #071f12 0%, #031008 100%);
                    color: #94a3b8;
                    position: relative;
                    overflow: hidden;
                    border-top: 3px solid #136c39;
                }
                .osp-footer-root::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 20%;
                    width: 500px;
                    height: 250px;
                    background: radial-gradient(circle, rgba(19, 108, 57, 0.18) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                }
                .osp-footer-root::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    right: 15%;
                    width: 400px;
                    height: 250px;
                    background: radial-gradient(circle, rgba(254, 208, 0, 0.06) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                }
                .osp-footer-title {
                    color: #ffffff;
                    font-size: 16px;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    margin-bottom: 20px;
                    position: relative;
                    display: inline-block;
                }
                .osp-footer-title::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: -6px;
                    width: 28px;
                    height: 2.5px;
                    background: #22c55e;
                    border-radius: 2px;
                }
                .osp-footer-desc {
                    color: #94a3b8;
                    font-size: 14px;
                    line-height: 1.65;
                }
                .osp-footer-link-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .osp-footer-link-list li {
                    margin-bottom: 12px;
                }
                .osp-footer-link-list li a {
                    color: #cbd5e1;
                    font-size: 14px;
                    text-decoration: none;
                    transition: all 0.2s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                }
                .osp-footer-link-list li a:hover {
                    color: #4ade80;
                    transform: translateX(4px);
                }
                .osp-footer-logo-wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                }
                @media (min-width: 768px) {
                    .osp-footer-logo-wrapper {
                        justify-content: flex-start;
                    }
                }
                .osp-footer-logo-link {
                    display: inline-block;
                    transition: opacity 0.2s ease;
                }
                .osp-footer-logo-link:hover {
                    opacity: 0.9;
                }
                .osp-footer-contact-pill {
                    background: rgba(19, 108, 57, 0.25);
                    border: 1px solid rgba(74, 222, 128, 0.3);
                    color: #4ade80;
                    padding: 8px 18px;
                    border-radius: 30px;
                    font-size: 14px;
                    font-weight: 600;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.2s ease;
                }
                .osp-footer-contact-pill:hover {
                    background: #136c39;
                    color: #ffffff;
                    border-color: #22c55e;
                    box-shadow: 0 0 16px rgba(34, 197, 94, 0.35);
                }
                .osp-social-btn {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.06);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    color: #cbd5e1;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 15px;
                    text-decoration: none;
                    transition: all 0.2s ease;
                }
                .osp-social-btn:hover {
                    background: #136c39;
                    border-color: #22c55e;
                    color: #ffffff;
                    transform: translateY(-3px);
                    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.35);
                }
                .osp-footer-separator {
                    border-color: rgba(255, 255, 255, 0.08);
                }
                .osp-copyright-text {
                    color: #64748b;
                    font-size: 13px;
                }
                .osp-copyright-brand-link {
                    color: #4ade80;
                    font-weight: 600;
                    text-decoration: none;
                    transition: color 0.2s ease;
                }
                .osp-copyright-brand-link:hover {
                    color: #fed000;
                }
            `}</style>

            <footer className="rbt-footer rbt-footer-style-ten osp-footer-root">
                <div className="rbt-footer-top rbt-section-gap2">
                    <div className="container">
                        <div className="row mt_dec--24 justify-content-between">
                            {/* Column 1: Logo, Description & Contact */}
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12 mt--24 text-center text-md-start">
                                <div className="footer-widget">
                                    <div className="osp-footer-logo-wrapper mb--16">
                                        <a href="/" className="osp-footer-logo-link">
                                            <img
                                                alt="Ocean Student Projects Logo"
                                                src="/assets/images/logo/bitmap_cropped.png"
                                                style={{
                                                    maxHeight: '62px',
                                                    width: 'auto',
                                                    objectFit: 'contain',
                                                    display: 'block'
                                                }}
                                            />
                                        </a>
                                    </div>
                                    <p className="osp-footer-desc mb--16">
                                        Your one-stop destination for electronics components, development boards, and student projects in India.
                                    </p>
                                    <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
                                        <a href="tel:+919042686793" className="osp-footer-contact-pill">
                                            <i className="fa-solid fa-phone"></i>
                                            <span>+91 904 268 6793</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Column 2: Get to Know Us */}
                            <div className="col-lg-2 col-md-6 col-sm-6 col-12 mt--24 text-center text-md-start">
                                <div className="footer-widget">
                                    <h3 className="osp-footer-title">Get to Know Us</h3>
                                    <ul className="osp-footer-link-list">
                                        <li><a href="/about"><i className="fa-solid fa-angle-right" style={{ fontSize: '10px', color: '#136c39' }}></i> About Us</a></li>
                                        <li><a href="/contact"><i className="fa-solid fa-angle-right" style={{ fontSize: '10px', color: '#136c39' }}></i> Contact Us</a></li>
                                        <li><a href="#!" className="rbt-cart-sidenav-activation"><i className="fa-solid fa-angle-right" style={{ fontSize: '10px', color: '#136c39' }}></i> Shopping Cart</a></li>
                                        <li><a href="http://140.245.223.92.nip.io:9000/app" target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-angle-right" style={{ fontSize: '10px', color: '#136c39' }}></i> Admin Login</a></li>
                                    </ul>
                                </div>
                            </div>

                            {/* Column 3: Shop Categories */}
                            <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt--24 text-center text-md-start">
                                <div className="footer-widget">
                                    <h3 className="osp-footer-title">Product Categories</h3>
                                    <ul className="osp-footer-link-list">
                                        <li><a href="/shop"><i className="fa-solid fa-angle-right" style={{ fontSize: '10px', color: '#136c39' }}></i> Development Boards</a></li>
                                        <li><a href="/shop"><i className="fa-solid fa-angle-right" style={{ fontSize: '10px', color: '#136c39' }}></i> Sensors &amp; Modules</a></li>
                                        <li><a href="/shop"><i className="fa-solid fa-angle-right" style={{ fontSize: '10px', color: '#136c39' }}></i> IoT &amp; DIY Starter Kits</a></li>
                                        <li><a href="/shop"><i className="fa-solid fa-angle-right" style={{ fontSize: '10px', color: '#136c39' }}></i> All Products</a></li>
                                    </ul>
                                </div>
                            </div>

                            {/* Column 4: Help & Policies */}
                            <div className="col-lg-3 col-md-6 col-sm-12 col-12 mt--24 text-center text-md-start">
                                <div className="footer-widget">
                                    <h3 className="osp-footer-title">Let Us Help You</h3>
                                    <ul className="osp-footer-link-list">
                                        <li><a href="/privacy-policy"><i className="fa-solid fa-angle-right" style={{ fontSize: '10px', color: '#136c39' }}></i> Privacy Policy</a></li>
                                        <li><a href="/terms-and-conditions"><i className="fa-solid fa-angle-right" style={{ fontSize: '10px', color: '#136c39' }}></i> Terms &amp; Conditions</a></li>
                                        <li><a href="/shipping-policy"><i className="fa-solid fa-angle-right" style={{ fontSize: '10px', color: '#136c39' }}></i> Shipping Policy</a></li>
                                        <li><a href="/return-and-refund-policy"><i className="fa-solid fa-angle-right" style={{ fontSize: '10px', color: '#136c39' }}></i> Return &amp; Refund Policy</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rbt-separator-mid">
                    <div className="container">
                        <hr className="osp-footer-separator m-0"/>
                    </div>
                </div>

                {/* Start Copyright Area  */}
                <div className="copyright-area copyright-style-1" style={{ padding: '24px 0', background: 'rgba(0, 0, 0, 0.25)' }}>
                    <div className="container">
                        <div className="row align-items-center justify-content-between text-center">
                            <div className="col-lg-4 col-md-12 col-12 text-lg-start mb-3 mb-lg-0">
                                <div className="rbt-footer-social-area justify-content-center justify-content-lg-start d-flex align-items-center flex-wrap gap-2">
                                    <span style={{ color: '#cbd5e1', fontSize: '13px', fontWeight: '600' }}>Follow Us:</span>
                                    <div className="d-flex gap-2">
                                        <a href="https://www.facebook.com/profile.php?id=61576958505445" target="_blank" rel="noopener noreferrer" className="osp-social-btn" aria-label="Facebook">
                                            <i className="fa-brands fa-facebook-f"></i>
                                        </a>
                                        <a href="https://www.instagram.com/ocean_student_projects?utm_source=qr&igsh=eWdnNXd5aHY0OHRi" target="_blank" rel="noopener noreferrer" className="osp-social-btn" aria-label="Instagram">
                                            <i className="fa-brands fa-instagram"></i>
                                        </a>
                                        <a href="https://www.youtube.com/@OceanStudentProjects-r1p" target="_blank" rel="noopener noreferrer" className="osp-social-btn" aria-label="YouTube">
                                            <i className="fa-brands fa-youtube"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 col-12 text-lg-end">
                                <p className="osp-copyright-text mb-0">
                                    Copyright © <span className="copyright-year">2026</span> <a className="osp-copyright-brand-link" href="/">Ocean Student Projects</a>. All rights reserved.
                                </p>
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
                                        <span className="rbt-toolbar-label"> Kits</span>
                                    </a>
                                </li>

                                {/* Dynamic WhatsApp (unlogged) or Orders (logged-in) */}
                                <li className="rbt-access-box">
                                    {customer ? (
                                        <a className="rbt-round-btn has-rbt-md-fsize" href="/profile?tab=orders">
                                            <i className="fa-regular fa-clipboard-list" style={{ fontSize: '1.2rem' }}></i>
                                            <span className="rbt-toolbar-label"> Orders</span>
                                        </a>
                                    ) : (
                                        <a className="rbt-round-btn has-rbt-md-fsize" href="https://wa.me/917338975699?text=Hi,%20I%20am%20interested%20in%20buying%20electronics%20components%20from%20Ocean%20Student%20Projects." target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#e8f7f0', color: '#136c39' }}>
                                            <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.2rem' }}></i>
                                            <span className="rbt-toolbar-label" style={{ color: '#136c39', fontWeight: 'bold' }}> WhatsApp</span>
                                        </a>
                                    )}
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
