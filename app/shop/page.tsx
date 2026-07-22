"use client";
import React from 'react';
import dynamic from "next/dynamic";
import Breadcrumb from '@/components/Breadcrumb';
import ShopSidebar from '@/components/ShopSidebar';
import ProductGrid from '@/components/ProductGrid';
import ShopBannerAndCategories from '@/components/ShopBannerAndCategories';
import { useProducts } from '@/lib/hooks';

import ShopHeader from '@/components/ShopHeader';
import Footer from '@/components/Footer';

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), { ssr: false });
const SideNavs = dynamic(() => import("@/components/SideNavs"), { ssr: false });
const Modals = dynamic(() => import("@/components/Modals"), { ssr: false });

const ShopPage = () => {
    const { products, loading } = useProducts();
    return (
        <>
            <ShopHeader />
            <MobileMenu />
            <SideNavs />
            <main className="rbt-main-wrapper">
                <Breadcrumb />
                <ShopBannerAndCategories />

                <div className="rbt-separator-mid">
                    <div className="container">
                        <hr className="rbt-separator m-4" />
                    </div>
                </div>

                <div className="rbt-component-area rbt-shop-filter-area rbt-bg-color-white rbt-section-gapBottom">
                    <div className="container">
                        <div className="row row--16 mt_dec--24">
                            <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12 mt--24 d-none d-lg-block">
                                <ShopSidebar />
                            </div>
                            <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12 col-12 mt--24">
                                <div className="rbt-shop-tool-content rbt-shop-view-var-wrapper justify-content-between d-lg-none mt--16 mt_sm--12">
                                    <p className="rbt-shop-tools-title h6 rbt-text-color-heading">
                                        <a href="#" className="rbt-filter-offcanvas-activation rbt-filter-button">
                                            <i className="fa-sharp fa-regular fa-filter mr--4"></i>
                                            <span className="filter-text">Show Filter</span>
                                        </a>
                                    </p>
                                </div>

                                <div className="rbt-shop-products-wrapper mt--40">
                                    <ProductGrid products={products} loading={loading} />
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

export default ShopPage;
