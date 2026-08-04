"use client";
import React, { useState } from 'react';
import dynamic from "next/dynamic";

import ShopHeader from '@/components/ShopHeader';
import Footer from '@/components/Footer';
import { useProducts, useCategories } from '@/lib/hooks';

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), { ssr: false });
const SideNavs = dynamic(() => import("@/components/SideNavs"), { ssr: false });
const Modals = dynamic(() => import("@/components/Modals"), { ssr: false });

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { products, count, loading } = useProducts({ q: searchQuery || undefined, limit: 12 });
    const { categories } = useCategories();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <>
            <ShopHeader />
            <MobileMenu />
            <SideNavs />
            <main className="rbt-main-wrapper">
                <div className="rbt-breadcrumb-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-content">
                                    <ul className="rbt-breadcrumb-list">
                                        <li><a href="/">Home</a></li>
                                        <li><span>Search</span></li>
                                    </ul>
                                    <h2 className="title">Search - Electronics</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rbt-component-area rbt-page-banner-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="rbt-component-banner radius-8 rbt-scroll-trigger fade_in animation-order-1">
                                    <div className="mega-top-banner bg-three">
                                        <div className="rbt-banner-inner w-100">
                                            <div className="rbt-banner-content">
                                                <h2 className="title">Buy One and Get 50% Off the Second Purchase Now</h2>
                                                <p className="b3 desc">Send us your idea, it may appear on Ocean Student Projects.</p>
                                            </div>
                                            <div className="pricing-action d-flex align-items-center rbt-gap--8">
                                                <div className="rbt-pricing-part d-flex">
                                                    <span className="rbt-price-text offer-price">₹2,999</span>
                                                    <del className="rbt-dis-price-text">₹4,999</del>
                                                </div>
                                                <a className="rbt-btn rbt-btn-sm rbt-btn-black" href="/product/1">View Details</a>
                                            </div>
                                            <a href="#" className="product-img position-bottom d-none d-xl-block"><img
                                                    src="assets/images/splash/menu-banner/menu-prd-01.webp" alt="Eccommerce Product" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {categories && categories.length > 0 && (
                    <div className="rbt-component-area rbt-catagories-area pt--0 pt_sm--16 pt_md--16 rbt-bg-color-white">
                        <div className="container">
                            <div className="row row--12 rbt-tablet-row rbt-mobile-row">
                                {categories.slice(0, 8).map((cat, i) => (
                                    <div key={cat.id} className="col-lg-1-8 col-md-2 col-sm-3 col-3">
                                        <a className="rbt-cat-box rbt-cat-box-1 text-center" href={`/shop${cat.handle ? `?category_id=${cat.id}` : ''}`}>
                                            <div className="inner">
                                                <div className="rbt-image-portion">
                                                    <img src={`/assets/images/catagory-img/cat-bg-electro-c-0${(i % 6) + 1}.webp`} alt={cat.name} />
                                                </div>
                                                <div className="content">
                                                    <p className="title">{cat.name}</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="rbt-component-area ptb--32 ptb_sm--12 ptb_md--20">
                    <div className="container">
                        <div className="rbt-separator rbt-separator-gray200"></div>
                    </div>
                </div>

                <div className="rbt-component-area rbt-shop-filter-area rbt-bg-color-white rbt-section-gapBottom">
                    <div className="container">
                        <div className="row row--16 mt_dec--24">
                            <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12 mt--24 d-none d-lg-block">
                                <aside className="rbt-sidebar has-rbt-fshape d-none d-lg-block">
                                    <div className="rbt-sidebar-widget-wrapper rbt-sidebar-bg-one position-relative">
                                        <div className="rbt-sidebar-top">
                                            <h2 className="rbt-sidebar-title h6"><i className="fa-sharp fa-regular fa-filter-list mr--4"></i>
                                                Filter &amp; Refine
                                                <span className="rbt-fshape-right-portion">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="40" viewBox="0 0 52 50" fill="none">
                                                        <path
                                                            d="M51.5337 49.984C-64.8544 49.9977 116.427 49.9764 0.0390625 49.9901C0.0390625 31.262 0.0390625 20.7619 0.0390625 2.03378C11.2391 1.63419 16.5034 4.56468 19.5034 10.5602L30.0034 38.5311C34.0374 47.934 45.4209 49.4481 51.5337 49.984Z"
                                                            fill="var(--color-white)" />
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M13.246 1.97519C16.582 3.50685 18.8114 5.90944 20.3979 9.07997L20.4213 9.12681L30.9315 37.1248C33.053 42.053 36.807 44.7979 40.7367 46.3047C44.6934 47.8219 48.798 48.068 51.4731 47.987C51.4731 47.987 51.51 49.2041 51.5337 49.984C48.7087 50.0695 44.3134 49.8162 40.02 48.17C35.7052 46.5155 31.4643 43.4388 29.0842 37.891L29.0751 37.8698C29.0751 37.8698 19.997 12.7279 18.5857 9.92689C17.1743 7.12591 15.2591 5.09828 12.4108 3.79055C8.49554 1.49902 0.0390625 2.03378 0.0390625 2.03378C0.0390625 20.7619 0.0390625 31.262 0.0390625 49.9901L0.0408325 0.0348727C5.70805 -0.16568 9.9493 0.461575 13.246 1.97519Z"
                                                            fill="var(--color-gray-200)" />
                                                    </svg>
                                                </span>
                                            </h2>
                                        </div>
                                        <div className="rbt-sidebar-bottom">
                                            <div className="rbt-single-widget rbt-widget-categories">
                                                <div className="rbt-single-widget-inner">
                                                    <h2 className="rbt-widget-title rbt-widget-title-without-border h4">
                                                        <a data-bs-toggle="collapse" href="#rbt-collapse-3" role="button" aria-expanded="false"
                                                            aria-controls="rbt-collapse-3">
                                                            Categories
                                                            <span className="icon"><i className="fa-regular fa-chevron-down"></i></span>
                                                        </a>
                                                    </h2>
                                                    <div className="collapse show" id="rbt-collapse-3">
                                                        <ul className="rbt-sidebar-list-wrapper rbt-categories-list-check">
                                                            <li className="rbt-check-group">
                                                                <input id="cat-list-1" type="checkbox" name="cat-list-1" />
                                                                <label htmlFor="cat-list-1">Accessories <span className="rbt-lable count">(96)</span></label>
                                                            </li>
                                                            <li className="rbt-check-group">
                                                                <input id="cat-list-2" type="checkbox" name="cat-list-2" />
                                                                <label htmlFor="cat-list-2">Best seller <span className="rbt-lable count">(12)</span></label>
                                                            </li>
                                                            <li className="rbt-check-group">
                                                                <input id="cat-list-3" type="checkbox" name="cat-list-3" />
                                                                <label htmlFor="cat-list-3">Computers &amp; Tablets <span
                                                                        className="rbt-lable count">(67)</span></label>
                                                            </li>
                                                            <li className="rbt-check-group">
                                                                <input id="cat-list-4" type="checkbox" name="cat-list-4" />
                                                                <label htmlFor="cat-list-4">Home Audio &amp; Theatre<span
                                                                        className="rbt-lable count">(30)</span></label>
                                                            </li>
                                                            <li className="rbt-check-group">
                                                                <input id="cat-list-5" type="checkbox" name="cat-list-5" />
                                                                <label htmlFor="cat-list-5">Home Theatre Accessories <span
                                                                        className="rbt-lable count">(89)</span></label>
                                                            </li>
                                                            <li className="rbt-check-group">
                                                                <input id="cat-list-6" type="checkbox" name="cat-list-6" />
                                                                <label htmlFor="cat-list-6">Media Streamers<span className="rbt-lable count">(37)</span></label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rbt-single-widget rbt-widget-categories">
                                                <div className="rbt-single-widget-inner">
                                                    <h2 className="rbt-widget-title rbt-widget-title-without-border h4">
                                                        <a data-bs-toggle="collapse" href="#rbt-collapse-6" role="button" aria-expanded="false"
                                                            aria-controls="rbt-collapse-6">
                                                            Customer Reviews
                                                            <span className="icon"><i className="fa-regular fa-chevron-down"></i></span>
                                                        </a>
                                                    </h2>
                                                    <div className="collapse show" id="rbt-collapse-6">
                                                        <ul className="rbt-sidebar-list-wrapper rbt-categories-review-list">
                                                            <li className="rbt-review-group">
                                                                <a href="#" className="rbt-card-rating d-flex">
                                                                    <ul className="rbt-rating-icon-list">
                                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                        <li><i className="fa-solid fa-star"></i></li>
                                                                    </ul>
                                                                    <p className="rbt-rating-text">&amp; Up</p>
                                                                </a>
                                                            </li>
                                                            <li className="rbt-review-group">
                                                                <a href="#" className="rbt-card-rating d-flex">
                                                                    <ul className="rbt-rating-icon-list">
                                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                        <li><i className="fa-solid fa-star"></i></li>
                                                                    </ul>
                                                                    <p className="rbt-rating-text">&amp; Up</p>
                                                                </a>
                                                            </li>
                                                            <li className="rbt-review-group">
                                                                <a href="#" className="rbt-card-rating d-flex">
                                                                    <ul className="rbt-rating-icon-list">
                                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                        <li><i className="fa-solid fa-star"></i></li>
                                                                        <li><i className="fa-solid fa-star"></i></li>
                                                                    </ul>
                                                                    <p className="rbt-rating-text">&amp; Up</p>
                                                                </a>
                                                            </li>
                                                            <li className="rbt-review-group">
                                                                <a href="#" className="rbt-card-rating d-flex">
                                                                    <ul className="rbt-rating-icon-list">
                                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                        <li><i className="fa-solid fa-star"></i></li>
                                                                        <li><i className="fa-solid fa-star"></i></li>
                                                                        <li><i className="fa-solid fa-star"></i></li>
                                                                    </ul>
                                                                    <p className="rbt-rating-text">&amp; Up</p>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rbt-single-widget rbt-widget-categories">
                                                <div className="rbt-single-widget-inner">
                                                    <h2 className="rbt-widget-title rbt-widget-title-without-border h4">
                                                        <a data-bs-toggle="collapse" href="#rbt-collapse-7" role="button" aria-expanded="false"
                                                            aria-controls="rbt-collapse-7">
                                                            Filter by price
                                                            <span className="icon"><i className="fa-regular fa-chevron-down"></i></span>
                                                        </a>
                                                    </h2>
                                                    <div className="collapse show" id="rbt-collapse-7">
                                                        <ul className="rbt-sidebar-list-wrapper rbt-categories-list-check">
                                                            <li className="rbt-check-group">
                                                                <input id="rbt-cat-list-fil-1" type="checkbox" name="rbt-cat-list-fil-1" />
                                                                 <label htmlFor="rbt-cat-list-fil-1">Under ₹500 <span
                                                                         className="rbt-lable count">(9)</span></label>
                                                            </li>
                                                            <li className="rbt-check-group">
                                                                <input id="rbt-cat-list-fil-2" type="checkbox" name="rbt-cat-list-fil-2" />
                                                                 <label htmlFor="rbt-cat-list-fil-2">₹500 to ₹1,000 <span
                                                                         className="rbt-lable count">(12)</span></label>
                                                            </li>
                                                            <li className="rbt-check-group">
                                                                <input id="rbt-cat-list-fil-3" type="checkbox" name="rbt-cat-list-fil-3" />
                                                                 <label htmlFor="rbt-cat-list-fil-3">₹1,000 to ₹2,000 <span
                                                                         className="rbt-lable count">(67)</span></label>
                                                            </li>
                                                            <li className="rbt-check-group">
                                                                <input id="rbt-cat-list-fil-4" type="checkbox" name="rbt-cat-list-fil-4" />
                                                                 <label htmlFor="rbt-cat-list-fil-4">₹2,000 to ₹5,000<span
                                                                         className="rbt-lable count">(30)</span></label>
                                                            </li>
                                                            <li className="rbt-check-group">
                                                                <input id="rbt-cat-list-fil-5" type="checkbox" name="rbt-cat-list-fil-5" />
                                                                 <label htmlFor="rbt-cat-list-fil-5">₹5,000 &amp; Above<span
                                                                         className="rbt-lable count">(89)</span></label>
                                                            </li>
                                                        </ul>
                                                        <div className="rbt-price-range-slider">
                                                            <div id="rbt-slider-range" className="rbt-range-bar"></div>
                                                            <p className="rbt-range-value">
                                                                <input type="text" id="amount" readOnly />
                                                            </p>
                                                        </div>
                                                        <div className="rbt-price-input-grp">
                                                            <input type="number" min="0" placeholder="₹ Min" />
                                                            <input type="number" min="0" placeholder="₹ Max" />
                                                            <a href="#" className="rbt-btn">Go</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rbt-single-widget rbt-widget-categories">
                                                <div className="rbt-single-widget-inner">
                                                    <h2 className="rbt-widget-title rbt-widget-title-without-border pb--0 h4">
                                                        <a data-bs-toggle="collapse" href="#rbt-collapse-8" role="button" aria-expanded="false"
                                                            aria-controls="rbt-collapse-8">
                                                            Filter by color
                                                            <span className="icon"><i className="fa-regular fa-chevron-down"></i></span>
                                                        </a>
                                                    </h2>
                                                    <div className="rbt-inner-search-field border-0 pt--16 pb--16">
                                                        <div className="rbt-search-input-section rbt-sm-search-section">
                                                            <input className="rbt-filter-search-field" type="text" placeholder="Search and Select Product" />
                                                            <span className="search-btn search-btn-dark bg-transparent rbt-text-color-gray-400"><i
                                                                    className="fa-sharp fa-solid fa-magnifying-glass"></i></span>
                                                        </div>
                                                    </div>
                                                    <div className="collapse show" id="rbt-collapse-8">
                                                        <div className="rbt-has-show-more">
                                                            <span className="rbt-filter-item-not-found rbt-text-color-danger">Color not matched</span>
                                                            <ul
                                                                className="rbt-sidebar-list-wrapper rbt-categories-list-color-swatch rbt-search-filter-item-list rbt-has-show-more-inner-content">
                                                                <li className="rbt-color-swatch-group">
                                                                    <a href="#" className="rbt-color-swatch-content">
                                                                        <span className="rbt-color-swatch">
                                                                            <span className="rbt-color-swatch-bg rbt-swatch-bg-black"></span>
                                                                            <span className="rbt-color-swatch-text">Black</span>
                                                                        </span>
                                                                    </a>
                                                                    <span className="rbt-color-swatch-count">(33)</span>
                                                                </li>
                                                                <li className="rbt-color-swatch-group">
                                                                    <a href="#" className="rbt-color-swatch-content active">
                                                                        <span className="rbt-color-swatch">
                                                                            <span className="rbt-color-swatch-bg rbt-swatch-bg-blue"></span>
                                                                            <span className="rbt-color-swatch-text">Blue</span>
                                                                        </span>
                                                                    </a>
                                                                    <span className="rbt-color-swatch-count">(56)</span>
                                                                </li>
                                                                <li className="rbt-color-swatch-group">
                                                                    <a href="#" className="rbt-color-swatch-content">
                                                                        <span className="rbt-color-swatch">
                                                                            <span className="rbt-color-swatch-bg rbt-swatch-bg-brown"></span>
                                                                            <span className="rbt-color-swatch-text">Brown</span>
                                                                        </span>
                                                                    </a>
                                                                    <span className="rbt-color-swatch-count">(90)</span>
                                                                </li>
                                                                <li className="rbt-color-swatch-group">
                                                                    <a href="#" className="rbt-color-swatch-content">
                                                                        <span className="rbt-color-swatch">
                                                                            <span className="rbt-color-swatch-bg rbt-swatch-bg-gray"></span>
                                                                            <span className="rbt-color-swatch-text">Gray</span>
                                                                        </span>
                                                                    </a>
                                                                    <span className="rbt-color-swatch-count">(33)</span>
                                                                </li>
                                                                <li className="rbt-color-swatch-group">
                                                                    <a href="#" className="rbt-color-swatch-content">
                                                                        <span className="rbt-color-swatch">
                                                                            <span className="rbt-color-swatch-bg rbt-swatch-bg-green"></span>
                                                                            <span className="rbt-color-swatch-text">Green</span>
                                                                        </span>
                                                                    </a>
                                                                    <span className="rbt-color-swatch-count">(46)</span>
                                                                </li>
                                                                <li className="rbt-color-swatch-group">
                                                                    <a href="#" className="rbt-color-swatch-content">
                                                                        <span className="rbt-color-swatch">
                                                                            <span className="rbt-color-swatch-bg rbt-swatch-bg-orange"></span>
                                                                            <span className="rbt-color-swatch-text">Orange</span>
                                                                        </span>
                                                                    </a>
                                                                    <span className="rbt-color-swatch-count">(94)</span>
                                                                </li>
                                                                <li className="rbt-color-swatch-group">
                                                                    <a href="#" className="rbt-color-swatch-content">
                                                                        <span className="rbt-color-swatch">
                                                                            <span className="rbt-color-swatch-bg rbt-swatch-bg-red"></span>
                                                                            <span className="rbt-color-swatch-text">Red</span>
                                                                        </span>
                                                                    </a>
                                                                    <span className="rbt-color-swatch-count">(85)</span>
                                                                </li>
                                                                <li className="rbt-color-swatch-group">
                                                                    <a href="#" className="rbt-color-swatch-content">
                                                                        <span className="rbt-color-swatch">
                                                                            <span className="rbt-color-swatch-bg rbt-swatch-bg-yellow"></span>
                                                                            <span className="rbt-color-swatch-text">Yellow</span>
                                                                        </span>
                                                                    </a>
                                                                    <span className="rbt-color-swatch-count">(55)</span>
                                                                </li>
                                                                <li className="rbt-color-swatch-group">
                                                                    <a href="#" className="rbt-color-swatch-content">
                                                                        <span className="rbt-color-swatch">
                                                                            <span className="rbt-color-swatch-bg rbt-swatch-bg-orange"></span>
                                                                            <span className="rbt-color-swatch-text">Orange</span>
                                                                        </span>
                                                                    </a>
                                                                    <span className="rbt-color-swatch-count">(94)</span>
                                                                </li>
                                                                <li className="rbt-color-swatch-group">
                                                                    <a href="#" className="rbt-color-swatch-content">
                                                                        <span className="rbt-color-swatch">
                                                                            <span className="rbt-color-swatch-bg rbt-swatch-bg-red"></span>
                                                                            <span className="rbt-color-swatch-text">Red</span>
                                                                        </span>
                                                                    </a>
                                                                    <span className="rbt-color-swatch-count">(85)</span>
                                                                </li>
                                                                <li className="rbt-color-swatch-group">
                                                                    <a href="#" className="rbt-color-swatch-content">
                                                                        <span className="rbt-color-swatch">
                                                                            <span className="rbt-color-swatch-bg rbt-swatch-bg-yellow"></span>
                                                                            <span className="rbt-color-swatch-text">Yellow</span>
                                                                        </span>
                                                                    </a>
                                                                    <span className="rbt-color-swatch-count">(55)</span>
                                                                </li>
                                                            </ul>
                                                            <div className="rbt-show-more-btn-area">
                                                                <button className="rbt-show-more-btn">Show More</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rbt-single-widget rbt-widget-categories">
                                                <div className="rbt-single-widget-inner">
                                                    <h2 className="rbt-widget-title rbt-widget-title-without-border h4">
                                                        <a data-bs-toggle="collapse" href="#rbt-collapse-9" role="button" aria-expanded="false"
                                                            aria-controls="rbt-collapse-9">
                                                            Brand
                                                            <span className="icon"><i className="fa-regular fa-chevron-down"></i></span>
                                                        </a>
                                                    </h2>
                                                    <div className="collapse show" id="rbt-collapse-9">
                                                        <ul className="rbt-sidebar-list-wrapper rbt-categories-list-check rbt-categories-brand-list-check">
                                                            <li className="rbt-check-group">
                                                                <input id="rbt-cat-list-brand-radio-1" type="radio" name="rbt-cat-list-brand-radio" />
                                                                <label htmlFor="rbt-cat-list-brand-radio-1">
                                                                    <span className="rbt-lable-content">
                                                                        <span className="rbt-lable-img"><img
                                                                                src="assets/images/sidebar/catagory-brand/catagory-brand-img-01.webp"
                                                                                alt="Catagory Image" /></span>
                                                                        <span className="rbt-lable-text">Acme</span>
                                                                    </span>
                                                                    <span className="rbt-lable-count">(96)</span>
                                                                </label>
                                                            </li>
                                                            <li className="rbt-check-group">
                                                                <input id="rbt-cat-list-brand-radio-2" type="radio" name="rbt-cat-list-brand-radio" />
                                                                <label htmlFor="rbt-cat-list-brand-radio-2">
                                                                    <span className="rbt-lable-content">
                                                                        <span className="rbt-lable-img"><img
                                                                                src="assets/images/sidebar/catagory-brand/catagory-brand-img-02.webp"
                                                                                alt="Catagory Image" /></span>
                                                                        <span className="rbt-lable-text">Aurarts</span>
                                                                    </span>
                                                                    <span className="rbt-lable-count">(12)</span>
                                                                </label>
                                                            </li>
                                                            <li className="rbt-check-group">
                                                                <input id="rbt-cat-list-brand-radio-3" type="radio" name="rbt-cat-list-brand-radio" />
                                                                <label htmlFor="rbt-cat-list-brand-radio-3">
                                                                    <span className="rbt-lable-content">
                                                                        <span className="rbt-lable-img"><img
                                                                                src="assets/images/sidebar/catagory-brand/catagory-brand-img-03.webp"
                                                                                alt="Catagory Image" /></span>
                                                                        <span className="rbt-lable-text">Hamofy</span>
                                                                    </span>
                                                                    <span className="rbt-lable-count">(67)</span>
                                                                </label>
                                                            </li>
                                                            <li className="rbt-check-group">
                                                                <input id="rbt-cat-list-brand-radio-4" type="radio" name="rbt-cat-list-brand-radio" />
                                                                <label htmlFor="rbt-cat-list-brand-radio-4">
                                                                    <span className="rbt-lable-content">
                                                                        <span className="rbt-lable-img"><img
                                                                                src="assets/images/sidebar/catagory-brand/catagory-brand-img-04.webp"
                                                                                alt="Catagory Image" /></span>
                                                                        <span className="rbt-lable-text">Starwalks</span>
                                                                    </span>
                                                                    <span className="rbt-lable-count">(30)</span>
                                                                </label>
                                                            </li>
                                                            <li className="rbt-check-group">
                                                                <input id="rbt-cat-list-brand-radio-5" type="radio" name="rbt-cat-list-brand-radio" />
                                                                <label htmlFor="rbt-cat-list-brand-radio-5">
                                                                    <span className="rbt-lable-content">
                                                                        <span className="rbt-lable-img"><img
                                                                                src="assets/images/sidebar/catagory-brand/catagory-brand-img-05.webp"
                                                                                alt="Catagory Image" /></span>
                                                                        <span className="rbt-lable-text">Massive</span>
                                                                    </span>
                                                                    <span className="rbt-lable-count">(89)</span>
                                                                </label>
                                                            </li>
                                                            <li className="rbt-check-group">
                                                                <input id="rbt-cat-list-brand-radio-6" type="radio" name="rbt-cat-list-brand-radio" />
                                                                <label htmlFor="rbt-cat-list-brand-radio-6">
                                                                    <span className="rbt-lable-content">
                                                                        <span className="rbt-lable-img"><img
                                                                                src="assets/images/sidebar/catagory-brand/catagory-brand-img-06.webp"
                                                                                alt="Catagory Image" /></span>
                                                                        <span className="rbt-lable-text">Superga</span>
                                                                    </span>
                                                                    <span className="rbt-lable-count">(60)</span>
                                                                </label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rbt-single-widget rbt-widget-categories">
                                                <div className="rbt-single-widget-inner">
                                                    <h2 className="rbt-widget-title rbt-widget-title-without-border h4">
                                                        <a data-bs-toggle="collapse" href="#rbt-collapse-10" role="button" aria-expanded="false"
                                                            aria-controls="rbt-collapse-10">
                                                            Promotion &amp; Services
                                                            <span className="icon"><i className="fa-regular fa-chevron-down"></i></span>
                                                        </a>
                                                    </h2>
                                                    <div className="collapse show" id="rbt-collapse-10">
                                                        <div className="rbt-sidebar-list-wrapper rbt-tag-list justify-content-start pt--0">
                                                            <a href="#">Free Delivery <i className="fa-regular fa-truck-fast"></i></a>
                                                            <a href="#">Hot Deals <i className="fa-sharp fa-regular fa-stars"></i></a>
                                                            <a href="#">Authentic Brands <i className="fa-regular fa-badge-check"></i></a>
                                                            <a href="#">Cash On Delivery <i className="fa-regular fa-money-bill"></i></a>
                                                            <a href="#">Installment <i className="fa-sharp fa-regular fa-calendar-days"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rbt-sidebar-widget-wrapper">
                                        <div className="rbt-sidebar-widget-img">
                                            <a href="#"><img src="assets/images/sidebar/sidebar-banner-one.webp" alt="Sidebar Banner" /></a>
                                        </div>
                                    </div>
                                </aside>
                            </div>

                            <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12 col-12 mt--24 mt_sm--8 mt_md--8">
                                <div className="row row--12">
                                    <div className="col-md-12">
                                        <div className="rbt-shop-tools-wrapper">
                                            <div className="rbt-shop-tool-content rbt-shop-filter-tag-wrapper w-100">
                                                <p className="rbt-shop-tools-title h6">Fast Filter :</p>
                                                <div className="rbt-shop-filter-tag-list rbt-tag-list rbt-tag-list-rounded rbt-tag-list-var-one">
                                                    <a href="#"><i className="fa-regular fa-truck-fast"></i> Featured</a>
                                                    <a href="#"><i className="fa-sharp fa-regular fa-stars"></i> Best Sellers</a>
                                                    <a href="#"><i className="fa-regular fa-badge-check"></i> Top Rated </a>
                                                    <a href="#"><i className="fa-regular fa-money-bill"></i> New</a>
                                                    <a href="#"><i className="fa-sharp fa-regular fa-calendar-days"></i> Top Items</a>
                                                    <a href="#"><i className="fa-sharp fa-regular fa-stars"></i> Popular Item</a>
                                                    <a href="#"><i className="fa-regular fa-badge-check"></i> Top Rated </a>
                                                    <a href="#"><i className="fa-regular fa-palette"></i> Best Colors</a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rbt-search-box-wrapper mt--20">
                                            <div className="rbt-search-box">
                                                <div className="rbt-inner-search-field style-one rbt-search-field-rounded w-100">
                                                    <input
                                                        type="text"
                                                        placeholder="Search for products..."
                                                        value={searchQuery}
                                                        onChange={handleSearchChange}
                                                    />
                                                    <button className="rbt-round-btn search-btn" type="submit" aria-label="Search">
                                                        <i className="fa-solid fa-magnifying-glass"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            {searchQuery && (
                                                <p className="rbt-shop-tools-title h6 mt--16">
                                                    Showing results for: <strong>{searchQuery}</strong>
                                                </p>
                                            )}
                                        </div>

                                        <div className="rbt-shop-tools-wrapper rbt-shop-tools-wrapper-var-one mt--20 mt_sm--12">
                                            <div className="rbt-shop-tool-content rbt-shop-view-var-wrapper sm_w-100 md_w-100">
                                                <p className="rbt-shop-tools-title h6">{loading ? 'Loading...' : `Showing 1–${Math.min(products.length, count)} of ${count} results`}</p>
                                                <div className="rbt-shop-view-btn-list rbt-tag-list-rounded rbt-shop-view-menu d-none d-lg-flex">
                                                    <a href="#" className="tooltips" data-tooltip="List Style" data-tooltip-position="top"><i
                                                            className="fa-regular fa-list"></i></a>
                                                    <a href="#" className="tooltips" data-tooltip="Two Column" data-tooltip-position="top"><i
                                                            className="fa-regular fa-grid-2"></i></a>
                                                    <a className="active tooltips" href="#" data-tooltip="Three Column" data-tooltip-position="top"><i
                                                            className="fa-sharp fa-light fa-grid"></i></a>
                                                    <a href="#" className="tooltips" data-tooltip="Four Column" data-tooltip-position="top"><i
                                                            className="fa-sharp fa-light fa-grid-4"></i></a>
                                                </div>
                                                <div className="rbt-shop-tools-title h3 rbt--text-color-heading d-flex w-100 justify-content-end d-lg-none">
                                                    <div className="rbt-modern-select rbt-shop-view-sort-select-one rbt-shop-sort-icon-only">
                                                        <select className="rbt-select-activation rbt-select-icon-only" aria-label="Sort products">
                                                            <option value="latest">Sort by latest</option>
                                                            <option value="date">Sort by date</option>
                                                            <option value="oldest">Sort by oldest</option>
                                                            <option value="type">Sort by type</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rbt-shop-tool-content rbt-shop-view-sort-wrapper d-none d-lg-flex">
                                                <div className="rbt-tools-select-single">
                                                    <p className="rbt-shop-tools-title h6">Sort :</p>
                                                    <div className="rbt-modern-select rbt-shop-view-sort-select-one">
                                                        <select className="rbt-select-activation">
                                                            <option>Sort by latest</option>
                                                            <option>Sort by date</option>
                                                            <option>Sort by oldest</option>
                                                            <option>Sort by type</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="rbt-tools-select-single d-none d-lg-flex">
                                                    <p className="rbt-shop-tools-title h6">Show :</p>
                                                    <div className="rbt-modern-select rbt-shop-view-sort-select-two">
                                                        <select className="rbt-select-activation">
                                                            <option>16 Items</option>
                                                            <option>12 Items</option>
                                                            <option>8 Items</option>
                                                            <option>4 Items</option>
                                                            <option>2 Items</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rbt-shop-tool-content rbt-shop-view-var-wrapper d-none d-lg-flex">
                                                <div className="rbt-inner-search-field style-one rbt-search-field-rounded">
                                                    <input type="text" placeholder="Search for products" />
                                                    <button className="rbt-round-btn search-btn" type="submit" aria-label="Search"><i
                                                            className="fa-solid fa-magnifying-glass"></i></button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rbt-shop-tools-wrapper mt--20 d-none d-lg-block">
                                            <div className="rbt-shop-tool-content rbt-shop-filter-tag-wrapper">
                                                <div
                                                    className="rbt-shop-filter-tag-list rbt-tag-list rbt-tag-list-sm rbt-tag-list-bg-var-one rbt-tag-list-rounded rbt-tag-cancel-var">
                                                    <a href="#"><i className="fa-solid fa-xmark"></i> Featured</a>
                                                    <a href="#"><i className="fa-solid fa-xmark"></i> Best Products</a>
                                                    <a href="#"><i className="fa-solid fa-xmark"></i> Popular</a>
                                                    <a href="#" className="text-decoration-underline">Clear All</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rbt-shop-tool-content rbt-shop-view-var-wrapper justify-content-between d-lg-none mt--16 mt_sm--12">
                                    <p className="rbt-shop-tools-title h6 rbt-text-color-heading">
                                        <a href="#" className="rbt-filter-offcanvas-activation rbt-filter-button">
                                            <i className="fa-sharp fa-regular fa-filter mr--4"></i>
                                            <span className="filter-text">Show Filter</span>
                                        </a>
                                    </p>
                                </div>

                                <div className="rbt-filter-offcanvas-area side-menu start-from-left">
                                    <div className="inner-wrapper p--32">
                                        <aside className="rbt-sidebar position-sticky sticky-top">
                                            <div className="rbt-sidebar-widget-wrapper rbt-sidebar-bg-one position-relative">
                                                <button className="rbt-sidebar-close-btn">
                                                    <i className="fa-sharp fa-solid fa-xmark"></i>
                                                </button>
                                                <div className="rbt-sidebar-top">
                                                    <h2 className="rbt-sidebar-title h6"><i className="fa-sharp fa-regular fa-filter-list mr--4"></i>
                                                        Filter &amp; Refine
                                                    </h2>
                                                </div>
                                                <div className="rbt-sidebar-bottom">
                                                    <div className="rbt-single-widget rbt-widget-categories">
                                                        <div className="rbt-single-widget-inner">
                                                            <h2 className="rbt-widget-title rbt-widget-title-without-border h4">
                                                                <a data-bs-toggle="collapse" href="#rbt-collapse-3" role="button" aria-expanded="false"
                                                                    aria-controls="rbt-collapse-3">
                                                                    Categories
                                                                    <span className="icon"><i className="fa-regular fa-chevron-down"></i></span>
                                                                </a>
                                                            </h2>
                                                            <div className="collapse show" id="rbt-collapse-3">
                                                                <ul className="rbt-sidebar-list-wrapper rbt-categories-list-check">
                                                                    <li className="rbt-check-group">
                                                                        <input id="cat-list-1" type="checkbox" name="cat-list-1" />
                                                                        <label htmlFor="cat-list-1">Accessories <span
                                                                                className="rbt-lable count">(96)</span></label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="cat-list-2" type="checkbox" name="cat-list-2" />
                                                                        <label htmlFor="cat-list-2">Best seller <span
                                                                                className="rbt-lable count">(12)</span></label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="cat-list-3" type="checkbox" name="cat-list-3" />
                                                                        <label htmlFor="cat-list-3">Computers &amp; Tablets <span
                                                                                className="rbt-lable count">(67)</span></label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="cat-list-4" type="checkbox" name="cat-list-4" />
                                                                        <label htmlFor="cat-list-4">Home Audio &amp; Theatre<span
                                                                                className="rbt-lable count">(30)</span></label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="cat-list-5" type="checkbox" name="cat-list-5" />
                                                                        <label htmlFor="cat-list-5">Home Theatre Accessories <span
                                                                                className="rbt-lable count">(89)</span></label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="cat-list-6" type="checkbox" name="cat-list-6" />
                                                                        <label htmlFor="cat-list-6">Media Streamers<span
                                                                                className="rbt-lable count">(37)</span></label>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rbt-single-widget rbt-widget-categories">
                                                        <div className="rbt-single-widget-inner">
                                                            <h2 className="rbt-widget-title rbt-widget-title-without-border h4">
                                                                <a data-bs-toggle="collapse" href="#rbt-collapse-4" role="button" aria-expanded="false"
                                                                    aria-controls="rbt-collapse-4">
                                                                    Filter by Size
                                                                    <span className="icon"><i className="fa-regular fa-chevron-down"></i></span>
                                                                </a>
                                                            </h2>
                                                            <div className="collapse show" id="rbt-collapse-4">
                                                                <ul className="rbt-sidebar-list-wrapper rbt-size-select-btn">
                                                                    <li className="rbt-check-group">
                                                                        <input id="rbt-prd-size-1" type="radio" name="rbt-prd-size" />
                                                                        <label htmlFor="rbt-prd-size-1">
                                                                            <span>L</span>
                                                                        </label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="rbt-prd-size-2" type="radio" name="rbt-prd-size" />
                                                                        <label htmlFor="rbt-prd-size-2">
                                                                            <span>M</span>
                                                                        </label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="rbt-prd-size-3" type="radio" name="rbt-prd-size" />
                                                                        <label htmlFor="rbt-prd-size-3">
                                                                            <span>S</span>
                                                                        </label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="rbt-prd-size-4" type="radio" name="rbt-prd-size" />
                                                                        <label htmlFor="rbt-prd-size-4">
                                                                            <span>XS</span>
                                                                        </label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="rbt-prd-size-5" type="radio" name="rbt-prd-size" />
                                                                        <label htmlFor="rbt-prd-size-5">
                                                                            <span>XL</span>
                                                                        </label>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rbt-single-widget rbt-widget-categories">
                                                        <div className="rbt-single-widget-inner">
                                                            <h2 className="rbt-widget-title rbt-widget-title-without-border h4">
                                                                <a data-bs-toggle="collapse" href="#rbt-collapse-5" role="button" aria-expanded="false"
                                                                    aria-controls="rbt-collapse-5">
                                                                    Categories
                                                                    <span className="icon"><i className="fa-regular fa-chevron-down"></i></span>
                                                                </a>
                                                            </h2>
                                                            <div className="collapse show" id="rbt-collapse-5">
                                                                <ul className="rbt-sidebar-list-wrapper rbt-categories-list-check">
                                                                    <li className="rbt-check-group">
                                                                        <input id="prd-status-1" type="checkbox" name="prd-status-1" />
                                                                        <label htmlFor="prd-status-1">On sale <span
                                                                                className="rbt-lable count">(96)</span></label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="prd-status-2" type="checkbox" name="prd-status-2" />
                                                                        <label htmlFor="prd-status-2">In stock <span
                                                                                className="rbt-lable count">(12)</span></label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="prd-status-3" type="checkbox" name="prd-status-3" />
                                                                        <label htmlFor="prd-status-3">On backorder <span
                                                                                className="rbt-lable count">(67)</span></label>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rbt-single-widget rbt-widget-categories">
                                                        <div className="rbt-single-widget-inner">
                                                            <h2 className="rbt-widget-title rbt-widget-title-without-border h4">
                                                                <a data-bs-toggle="collapse" href="#rbt-collapse-6" role="button" aria-expanded="false"
                                                                    aria-controls="rbt-collapse-6">
                                                                    Customer Reviews
                                                                    <span className="icon"><i className="fa-regular fa-chevron-down"></i></span>
                                                                </a>
                                                            </h2>
                                                            <div className="collapse show" id="rbt-collapse-6">
                                                                <ul className="rbt-sidebar-list-wrapper rbt-categories-review-list">
                                                                    <li className="rbt-review-group">
                                                                        <div className="rbt-card-rating">
                                                                            <ul className="rbt-rating-icon-list">
                                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                                <li><i className="fa-solid fa-star"></i></li>
                                                                            </ul>
                                                                            <p className="rbt-rating-text">&amp; Up</p>
                                                                        </div>
                                                                    </li>
                                                                    <li className="rbt-review-group">
                                                                        <div className="rbt-card-rating">
                                                                            <ul className="rbt-rating-icon-list">
                                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                                <li><i className="fa-solid fa-star"></i></li>
                                                                            </ul>
                                                                            <p className="rbt-rating-text">&amp; Up</p>
                                                                        </div>
                                                                    </li>
                                                                    <li className="rbt-review-group">
                                                                        <div className="rbt-card-rating">
                                                                            <ul className="rbt-rating-icon-list">
                                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                                <li><i className="fa-solid fa-star"></i></li>
                                                                                <li><i className="fa-solid fa-star"></i></li>
                                                                            </ul>
                                                                            <p className="rbt-rating-text">&amp; Up</p>
                                                                        </div>
                                                                    </li>
                                                                    <li className="rbt-review-group">
                                                                        <div className="rbt-card-rating">
                                                                            <ul className="rbt-rating-icon-list">
                                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                                <li><i className="fa-solid fa-star"></i></li>
                                                                                <li><i className="fa-solid fa-star"></i></li>
                                                                                <li><i className="fa-solid fa-star"></i></li>
                                                                            </ul>
                                                                            <p className="rbt-rating-text">&amp; Up</p>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rbt-single-widget rbt-widget-categories">
                                                        <div className="rbt-single-widget-inner">
                                                            <h2 className="rbt-widget-title rbt-widget-title-without-border h4">
                                                                <a data-bs-toggle="collapse" href="#rbt-collapse-7" role="button" aria-expanded="false"
                                                                    aria-controls="rbt-collapse-7">
                                                                    Filter by price
                                                                    <span className="icon"><i className="fa-regular fa-chevron-down"></i></span>
                                                                </a>
                                                            </h2>
                                                            <div className="collapse show" id="rbt-collapse-7">
                                                                <ul className="rbt-sidebar-list-wrapper rbt-categories-list-check">
                                                                    <li className="rbt-check-group">
                                                                        <input id="rbt-cat-list-fil-1" type="checkbox" name="rbt-cat-list-fil-1" />
                                                                        <label htmlFor="rbt-cat-list-fil-1">Under ₹500 <span
                                                                                className="rbt-lable count">(9)</span></label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="rbt-cat-list-fil-2" type="checkbox" name="rbt-cat-list-fil-2" />
                                                                        <label htmlFor="rbt-cat-list-fil-2">₹500 to ₹1,000 <span
                                                                                className="rbt-lable count">(12)</span></label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="rbt-cat-list-fil-3" type="checkbox" name="rbt-cat-list-fil-3" />
                                                                        <label htmlFor="rbt-cat-list-fil-3">₹1,000 to ₹2,000 <span
                                                                                className="rbt-lable count">(67)</span></label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="rbt-cat-list-fil-4" type="checkbox" name="rbt-cat-list-fil-4" />
                                                                        <label htmlFor="rbt-cat-list-fil-4">₹2,000 to ₹5,000<span
                                                                                className="rbt-lable count">(30)</span></label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="rbt-cat-list-fil-5" type="checkbox" name="rbt-cat-list-fil-5" />
                                                                        <label htmlFor="rbt-cat-list-fil-5">₹5,000 &amp; Above<span
                                                                                className="rbt-lable count">(89)</span></label>
                                                                    </li>
                                                                </ul>
                                                                <div className="rbt-price-range-slider">
                                                                    <div id="rbt-slider-range" className="rbt-range-bar"></div>
                                                                    <p className="rbt-range-value">
                                                                        <input type="text" id="amount" readOnly />
                                                                    </p>
                                                                </div>
                                                                <div className="rbt-price-input-grp">
                                                                    <input type="number" min="0" placeholder="₹ Min" />
                                                                    <input type="number" min="0" placeholder="₹ Max" />
                                                                    <a href="#" className="rbt-btn">Go</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rbt-single-widget rbt-widget-categories">
                                                        <div className="rbt-single-widget-inner">
                                                            <h2 className="rbt-widget-title rbt-widget-title-without-border pb--0 h4">
                                                                <a data-bs-toggle="collapse" href="#rbt-collapse-8" role="button" aria-expanded="false"
                                                                    aria-controls="rbt-collapse-8">
                                                                    Filter by color
                                                                    <span className="icon"><i className="fa-regular fa-chevron-down"></i></span>
                                                                </a>
                                                            </h2>
                                                            <div className="collapse show" id="rbt-collapse-8">
                                                                <div className="rbt-has-show-more">
                                                                    <span className="rbt-filter-item-not-found rbt-text-color-danger">Color not
                                                                        matched</span>
                                                                    <ul
                                                                        className="rbt-sidebar-list-wrapper rbt-categories-list-color-swatch rbt-search-filter-item-list rbt-has-show-more-inner-content">
                                                                        <li className="rbt-color-swatch-group">
                                                                            <a href="#" className="rbt-color-swatch-content">
                                                                                <span className="rbt-color-swatch">
                                                                                    <span className="rbt-color-swatch-bg rbt-swatch-bg-black"></span>
                                                                                    <span className="rbt-color-swatch-text">Black</span>
                                                                                </span>
                                                                            </a>
                                                                            <span className="rbt-color-swatch-count">(33)</span>
                                                                        </li>
                                                                        <li className="rbt-color-swatch-group">
                                                                            <a href="#" className="rbt-color-swatch-content active">
                                                                                <span className="rbt-color-swatch">
                                                                                    <span className="rbt-color-swatch-bg rbt-swatch-bg-blue"></span>
                                                                                    <span className="rbt-color-swatch-text">Blue</span>
                                                                                </span>
                                                                            </a>
                                                                            <span className="rbt-color-swatch-count">(56)</span>
                                                                        </li>
                                                                        <li className="rbt-color-swatch-group">
                                                                            <a href="#" className="rbt-color-swatch-content">
                                                                                <span className="rbt-color-swatch">
                                                                                    <span className="rbt-color-swatch-bg rbt-swatch-bg-brown"></span>
                                                                                    <span className="rbt-color-swatch-text">Brown</span>
                                                                                </span>
                                                                            </a>
                                                                            <span className="rbt-color-swatch-count">(90)</span>
                                                                        </li>
                                                                        <li className="rbt-color-swatch-group">
                                                                            <a href="#" className="rbt-color-swatch-content">
                                                                                <span className="rbt-color-swatch">
                                                                                    <span className="rbt-color-swatch-bg rbt-swatch-bg-gray"></span>
                                                                                    <span className="rbt-color-swatch-text">Gray</span>
                                                                                </span>
                                                                            </a>
                                                                            <span className="rbt-color-swatch-count">(33)</span>
                                                                        </li>
                                                                        <li className="rbt-color-swatch-group">
                                                                            <a href="#" className="rbt-color-swatch-content">
                                                                                <span className="rbt-color-swatch">
                                                                                    <span className="rbt-color-swatch-bg rbt-swatch-bg-green"></span>
                                                                                    <span className="rbt-color-swatch-text">Green</span>
                                                                                </span>
                                                                            </a>
                                                                            <span className="rbt-color-swatch-count">(46)</span>
                                                                        </li>
                                                                        <li className="rbt-color-swatch-group">
                                                                            <a href="#" className="rbt-color-swatch-content">
                                                                                <span className="rbt-color-swatch">
                                                                                    <span className="rbt-color-swatch-bg rbt-swatch-bg-orange"></span>
                                                                                    <span className="rbt-color-swatch-text">Orange</span>
                                                                                </span>
                                                                            </a>
                                                                            <span className="rbt-color-swatch-count">(94)</span>
                                                                        </li>
                                                                        <li className="rbt-color-swatch-group">
                                                                            <a href="#" className="rbt-color-swatch-content">
                                                                                <span className="rbt-color-swatch">
                                                                                    <span className="rbt-color-swatch-bg rbt-swatch-bg-red"></span>
                                                                                    <span className="rbt-color-swatch-text">Red</span>
                                                                                </span>
                                                                            </a>
                                                                            <span className="rbt-color-swatch-count">(85)</span>
                                                                        </li>
                                                                        <li className="rbt-color-swatch-group">
                                                                            <a href="#" className="rbt-color-swatch-content">
                                                                                <span className="rbt-color-swatch">
                                                                                    <span className="rbt-color-swatch-bg rbt-swatch-bg-yellow"></span>
                                                                                    <span className="rbt-color-swatch-text">Yellow</span>
                                                                                </span>
                                                                            </a>
                                                                            <span className="rbt-color-swatch-count">(55)</span>
                                                                        </li>
                                                                    </ul>
                                                                    <div className="rbt-show-more-btn-area">
                                                                        <button className="rbt-show-more-btn">Show More</button>
                                                                    </div>
                                                                </div>
                                                                <div className="rbt-inner-search-field border-0 pt--16 pb--16">
                                                                    <div className="rbt-search-input-section rbt-sm-search-section">
                                                                        <input className="rbt-filter-search-field" type="text"
                                                                            placeholder="Search and Select Product" />
                                                                        <span
                                                                            className="search-btn search-btn-dark bg-transparent rbt-text-color-gray-400"><i
                                                                                className="fa-sharp fa-solid fa-magnifying-glass"></i></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rbt-single-widget rbt-widget-categories">
                                                        <div className="rbt-single-widget-inner">
                                                            <h2 className="rbt-widget-title rbt-widget-title-without-border h4">
                                                                <a data-bs-toggle="collapse" href="#rbt-collapse-9" role="button" aria-expanded="false"
                                                                    aria-controls="rbt-collapse-9">
                                                                    Brand
                                                                    <span className="icon"><i className="fa-regular fa-chevron-down"></i></span>
                                                                </a>
                                                            </h2>
                                                            <div className="collapse show" id="rbt-collapse-9">
                                                                <ul
                                                                    className="rbt-sidebar-list-wrapper rbt-categories-list-check rbt-categories-brand-list-check">
                                                                    <li className="rbt-check-group">
                                                                        <input id="rbt-cat-list-brand-radio-1" type="radio"
                                                                            name="rbt-cat-list-brand-radio" />
                                                                        <label htmlFor="rbt-cat-list-brand-radio-1">
                                                                            <span className="rbt-lable-content">
                                                                                <span className="rbt-lable-img"><img
                                                                                        src="assets/images/sidebar/catagory-brand/catagory-brand-img-01.webp"
                                                                                        alt="Catagory Image" /></span>
                                                                                <span className="rbt-lable-text">Acme</span>
                                                                            </span>
                                                                            <span className="rbt-lable-count">(96)</span>
                                                                        </label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="rbt-cat-list-brand-radio-2" type="radio"
                                                                            name="rbt-cat-list-brand-radio" />
                                                                        <label htmlFor="rbt-cat-list-brand-radio-2">
                                                                            <span className="rbt-lable-content">
                                                                                <span className="rbt-lable-img"><img
                                                                                        src="assets/images/sidebar/catagory-brand/catagory-brand-img-02.webp"
                                                                                        alt="Catagory Image" /></span>
                                                                                <span className="rbt-lable-text">Aurarts</span>
                                                                            </span>
                                                                            <span className="rbt-lable-count">(12)</span>
                                                                        </label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="rbt-cat-list-brand-radio-3" type="radio"
                                                                            name="rbt-cat-list-brand-radio" />
                                                                        <label htmlFor="rbt-cat-list-brand-radio-3">
                                                                            <span className="rbt-lable-content">
                                                                                <span className="rbt-lable-img"><img
                                                                                        src="assets/images/sidebar/catagory-brand/catagory-brand-img-03.webp"
                                                                                        alt="Catagory Image" /></span>
                                                                                <span className="rbt-lable-text">Hamofy</span>
                                                                            </span>
                                                                            <span className="rbt-lable-count">(67)</span>
                                                                        </label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="rbt-cat-list-brand-radio-4" type="radio"
                                                                            name="rbt-cat-list-brand-radio" />
                                                                        <label htmlFor="rbt-cat-list-brand-radio-4">
                                                                            <span className="rbt-lable-content">
                                                                                <span className="rbt-lable-img"><img
                                                                                        src="assets/images/sidebar/catagory-brand/catagory-brand-img-04.webp"
                                                                                        alt="Catagory Image" /></span>
                                                                                <span className="rbt-lable-text">Starwalks</span>
                                                                            </span>
                                                                            <span className="rbt-lable-count">(30)</span>
                                                                        </label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="rbt-cat-list-brand-radio-5" type="radio"
                                                                            name="rbt-cat-list-brand-radio" />
                                                                        <label htmlFor="rbt-cat-list-brand-radio-5">
                                                                            <span className="rbt-lable-content">
                                                                                <span className="rbt-lable-img"><img
                                                                                        src="assets/images/sidebar/catagory-brand/catagory-brand-img-05.webp"
                                                                                        alt="Catagory Image" /></span>
                                                                                <span className="rbt-lable-text">Massive</span>
                                                                            </span>
                                                                            <span className="rbt-lable-count">(89)</span>
                                                                        </label>
                                                                    </li>
                                                                    <li className="rbt-check-group">
                                                                        <input id="rbt-cat-list-brand-radio-6" type="radio"
                                                                            name="rbt-cat-list-brand-radio" />
                                                                        <label htmlFor="rbt-cat-list-brand-radio-6">
                                                                            <span className="rbt-lable-content">
                                                                                <span className="rbt-lable-img"><img
                                                                                        src="assets/images/sidebar/catagory-brand/catagory-brand-img-06.webp"
                                                                                        alt="Catagory Image" /></span>
                                                                                <span className="rbt-lable-text">Superga</span>
                                                                            </span>
                                                                            <span className="rbt-lable-count">(60)</span>
                                                                        </label>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rbt-single-widget rbt-widget-categories">
                                                        <div className="rbt-single-widget-inner">
                                                            <h2 className="rbt-widget-title rbt-widget-title-without-border h4">
                                                                <a data-bs-toggle="collapse" href="#rbt-collapse-10" role="button" aria-expanded="false"
                                                                    aria-controls="rbt-collapse-10">
                                                                    Promotion &amp; Services
                                                                    <span className="icon"><i className="fa-regular fa-chevron-down"></i></span>
                                                                </a>
                                                            </h2>
                                                            <div className="collapse show" id="rbt-collapse-10">
                                                                <div className="rbt-sidebar-list-wrapper rbt-tag-list justify-content-start pt--0">
                                                                    <a href="#">Free Delivery <i className="fa-regular fa-truck-fast"></i></a>
                                                                    <a href="#">Hot Deals <i className="fa-sharp fa-regular fa-stars"></i></a>
                                                                    <a href="#">Authentic Brands <i className="fa-regular fa-badge-check"></i></a>
                                                                    <a href="#">Cash On Delivery <i className="fa-regular fa-money-bill"></i></a>
                                                                    <a href="#">Installment <i className="fa-sharp fa-regular fa-calendar-days"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </aside>
                                    </div>
                                </div>

                                <div className="row row--12 mt_sm--8 mt_md--8">
                                    {loading ? (
                                        <div className="col-12 text-center py-5">
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : products.length === 0 ? (
                                        <div className="col-12 text-center py-5">
                                            <p className="rbt-shop-tools-title h6">No products found.</p>
                                        </div>
                                    ) : (
                                        products.map((product, index) => {
                                            const minPrice = product.variants?.length
                                                ? Math.min(...product.variants.map(v => v.prices?.[0]?.amount || 0))
                                                : 0;
                                            const maxPrice = product.variants?.length
                                                ? Math.max(...product.variants.map(v => v.prices?.[0]?.amount || 0))
                                                : 0;
                                            const order = (index % 6) + 1;
                                            const catName = product.categories?.[0]?.name || 'Category';
                                            return (
                                                <div key={product.id} className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt--24">
                                                    <div className="rbt-card rbt-product-card has-hover-box-shadow">
                                                        <div className="inner rbt-scroll-trigger fade_in animation-order-2">
                                                            <div className="rbt-card-img rbt-has-hover-img rbt-bg-color-default">
                                                                <a href={`/product/${product.handle || product.id}`}>
                                                                    {product.thumbnail ? (
                                                                        <>
                                                                            <img className="rbt-prd-img"
                                                                                src={product.thumbnail}
                                                                                alt={product.title} />
                                                                            <img className="rbt-hover-img"
                                                                                src={product.thumbnail}
                                                                                alt={product.title} />
                                                                        </>
                                                                    ) : (
                                                                        <div className="rbt-prd-img d-flex align-items-center justify-content-center rbt-bg-color-gray-100" style={{ height: 200 }}>
                                                                            <i className="fa-regular fa-image fa-3x rbt-text-color-gray-400"></i>
                                                                        </div>
                                                                    )}
                                                                </a>
                                                            </div>
                                                            <div className="rbt-card-body">
                                                                <a href={`/shop?category_id=${product.categories?.[0]?.id || ''}`} className="rbt-card-subtitle rbt-card-catagories-text">{catName}</a>
                                                                <h2 className="rbt-card-title product-title-clamp"><a href={`/product/${product.handle || product.id}`}>{product.title}</a></h2>
                                                                <div className="pricing-part">
                                                                    {minPrice > 0 && (
                                                                        <span className="price-text">
                                                                            {minPrice === maxPrice
                                                                                ? `$${(minPrice / 100).toFixed(2)}`
                                                                                : `$${(minPrice / 100).toFixed(2)} - $${(maxPrice / 100).toFixed(2)}`
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>

                                <div className="row mt--40 mt_sm--16">
                                    <div className="col-12">
                                        <nav className="rbt-nav-effect-activation text-center">
                                            <ul className="rbt-pagination d-inline-flex">
                                                <li><a href="#!" aria-label="Previous" className="active"><i className="fa-regular fa-chevron-left"></i></a></li>
                                                <li><a href="#!">1</a></li>
                                                <li><a href="#!">2</a></li>
                                                <li><a href="#!">3</a></li>
                                                <li><a href="#!" aria-label="Next" ><i className="fa-regular fa-chevron-right"></i></a></li>
                                            </ul>
                                            <div className="rbt-bg-highlight rbt-pagination-bg-highlight"></div>
                                        </nav>
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

export default SearchPage;
