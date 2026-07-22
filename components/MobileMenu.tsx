'use client'
import React from 'react';
import { useCategories } from '@/lib/hooks';

export default function MobileMenu() {
    const { categories } = useCategories();

    return (
        <>
            {/*  Mobile Menu Section  */}
            <div className="popup-mobile-menu">
                <div className="inner-wrapper">
                    <div className="mobile-menu-top">
                        <div className="inner-top">
                            <div className="content">
                                <div className="logo">
                                    <a href="/">
                                        <img src="/assets/images/logo/transperent_logo.webp" alt="Ocean Student Projects Logo" />
                                    </a>
                                </div>
                                <div className="rbt-btn-close">
                                    <button className="close-button rbt-round-btn"><i className="fa-solid fa-xmark"></i></button>
                                </div>
                            </div>
                            <p className="description">Ocean Student Projects - India's trusted online store for electronics, components, and student projects.</p>
                        </div>
                        <div className="rbt-tab rbt-round-shape-tab">
                            <ul className="nav nav-tabs mb--0" id="mobile-menuTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="rbt-tab-mobilemenu-1" data-bs-toggle="tab"
                                        data-bs-target="#rbt-tab-pane-mobilemenu-1" type="button" role="tab"
                                        aria-controls="rbt-tab-pane-mobilemenu-1" aria-selected="true">
                                        <i className="fa-solid fa-bars-sort"></i>
                                        Menu
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="rbt-tab-mobilemenu-2" data-bs-toggle="tab"
                                        data-bs-target="#rbt-tab-pane-mobilemenu-2" type="button" role="tab"
                                        aria-controls="rbt-tab-pane-mobilemenu-2" aria-selected="false">
                                        <i className="fa-sharp fa-regular fa-layer-group"></i>
                                        Categories
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content" id="mobile-menuTabContent">
                                <div className="tab-pane fade show active" id="rbt-tab-pane-mobilemenu-1" role="tabpanel"
                                    aria-labelledby="rbt-tab-mobilemenu-1" tabIndex={0}>
                                    <nav className="rbt-mainmenu-nav">
                                        <ul className="mainmenu">
                                            <li><a href="/">Home</a></li>
                                            <li><a href="/shop">Shop</a></li>
                                            <li><a href="/about">About Us</a></li>
                                            <li><a href="/contact">Contact Us</a></li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="tab-pane fade" id="rbt-tab-pane-mobilemenu-2" role="tabpanel"
                                    aria-labelledby="rbt-tab-mobilemenu-2" tabIndex={0}>
                                    <nav className="rbt-mainmenu-nav">
                                        <ul className="mainmenu">
                                            {categories && categories.length > 0 ? (
                                                categories.map((cat) => (
                                                    <li key={cat.id}>
                                                        <a href={`/shop?category=${cat.id}`}>
                                                            {cat.name}
                                                        </a>
                                                    </li>
                                                ))
                                            ) : (
                                                <li><a href="/shop">All Products</a></li>
                                            )}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mobile-menu-bottom">
                        <div className="social-share-wrapper">
                            <span className="rbt-short-title d-block">Find With Us</span>
                            <ul className="rbt-social-icon-list mt--12">
                                <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-whatsapp"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-telegram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}