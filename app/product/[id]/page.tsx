"use client";
import React from 'react';
import dynamic from "next/dynamic";
import ShopHeader from "@/components/ShopHeader";
import Footer from "@/components/Footer";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import ProductDetails from "@/components/ProductDetails";
import ProductDetailsBottom from "@/components/ProductDetailsBottom";
import { useProduct } from "@/lib/hooks";

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), { ssr: false });
const SideNavs = dynamic(() => import("@/components/SideNavs"), { ssr: false });
const Modals = dynamic(() => import("@/components/Modals"), { ssr: false });

export default function ProductSingle({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const { product, loading } = useProduct(resolvedParams.id);

  const [showLoader, setShowLoader] = React.useState(true);
  const [loaderOpacity, setLoaderOpacity] = React.useState(1);

  React.useEffect(() => {
    if (loading) {
      setShowLoader(true);
      setLoaderOpacity(1);
    } else {
      // Force a minimum loading time of 500ms so the user sees a smooth loading transition
      const timer = setTimeout(() => {
        setLoaderOpacity(0);
        // Unmount loader after the 400ms fade transition completes
        const unmountTimer = setTimeout(() => {
          setShowLoader(false);
        }, 400);
        return () => clearTimeout(unmountTimer);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <>
      <ShopHeader />
      <MobileMenu />
      <SideNavs />
      <main className="main-wrapper" style={{ position: 'relative', minHeight: '60vh' }}>
        {showLoader && (
          <div 
            className="rbt-preloader" 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              zIndex: 10,
              background: '#fff',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              opacity: loaderOpacity,
              transition: 'opacity 0.4s ease-out',
              pointerEvents: 'none',
              height: '60vh'
            }}
          >
            <div className="rbt-preloader-inner">
              <svg className="rbt-preloader-cart" role="img" aria-label="Shopping cart line animation" viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
                  <g className="rbt-preloader-cart-track" stroke="hsla(0,10%,10%,0.1)">
                    <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                    <circle cx="43" cy="111" r="13" />
                    <circle cx="102" cy="111" r="13" />
                  </g>
                  <g className="rbt-preloader-cart-lines" stroke="currentColor">
                    <polyline className="rbt-preloader-cart-top" points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" strokeDasharray="338 338" strokeDashoffset="-338" />
                    <g className="rbt-preloader-cart-wheel1" transform="rotate(-90,43,111)">
                      <circle className="rbt-preloader-cart-wheel-stroke" cx="43" cy="111" r="13" strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                    </g>
                    <g className="rbt-preloader-cart-wheel2" transform="rotate(90,102,111)">
                      <circle className="rbt-preloader-cart-wheel-stroke" cx="102" cy="111" r="13" strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                    </g>
                  </g>
                </g>
              </svg>
              <div className="preloader-text">
                <p className="preloader-msg">Loading product...</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !product ? (
          <div className="container text-center py--80">
            <h2>Product not found</h2>
          </div>
        ) : product ? (
          <div 
            style={{ 
              opacity: loaderOpacity === 0 ? 1 : 0, 
              transition: 'opacity 0.4s ease-in-out' 
            }}
          >
            <ProductBreadcrumb product={product} />
            <ProductDetails product={product} />
            <ProductDetailsBottom product={product} />
          </div>
        ) : null}
      </main>
      <Modals />
      <Footer />
    </>
  );
}
