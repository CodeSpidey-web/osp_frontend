"use client";

import React from "react";

export default function PromoBanner() {
  return (
    <>
      <style jsx global>{`
        .custom-electronics-banner {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          min-height: 360px;
          display: flex;
          align-items: center;
          background-color: #f1f3f5;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          margin-left: 15px;
          margin-right: 15px;
        }
        .custom-banner-bg-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .custom-banner-bg-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: right center;
        }
        .custom-electronics-banner .content {
          position: relative;
          z-index: 2;
          padding: 40px 0px 40px 220px;
          max-width: 650px;
        }
        @media (max-width: 991px) {
          .custom-electronics-banner .content {
            padding: 30px 40px 30px 60px;
          }
          .custom-electronics-banner {
            min-height: 315px;
          }
        }
        @media (max-width: 767px) {
          .custom-electronics-banner {
            position: relative;
            min-height: 280px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-left: 10px;
            margin-right: 10px;
          }
          .custom-banner-bg-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
          }
          .custom-banner-bg-image img {
            object-fit: cover;
            object-position: 72% center;
          }
          .custom-electronics-banner .content {
            position: relative;
            z-index: 2;
            padding: 24px 20px;
            max-width: 60%;
            margin: 0;
            border: none;
            box-shadow: none;
            background: linear-gradient(90deg, rgba(234, 234, 234, 0.98) 45%, rgba(234, 234, 234, 0.8) 75%, rgba(234, 234, 234, 0) 100%);
          }
          .custom-electronics-banner .banner-title {
            font-size: 20px !important;
          }
          .custom-electronics-banner .banner-subtitle {
            font-size: 15px !important;
            margin-bottom: 10px !important;
          }
          .custom-electronics-banner .subtitle {
            font-size: 11px !important;
            margin-bottom: 4px !important;
          }
          .custom-electronics-banner .starting {
            font-size: 12px !important;
          }
          .custom-electronics-banner .price {
            font-size: 20px !important;
          }
          .custom-electronics-banner .discount-badge {
            font-size: 9px !important;
            padding: 3px 6px !important;
          }
          .custom-electronics-banner .pricing-info {
            margin-bottom: 14px !important;
            gap: 6px !important;
          }
          .custom-electronics-banner .rbt-btn {
            height: 30px !important;
            padding: 0 16px !important;
            font-size: 11px !important;
          }
        }
      `}</style>

      {/* Electronic Accessories Banner */}
      <div className="rbt-component-area pt--60 pb--60">
        <div className="container">
          <div className="custom-electronics-banner" style={{
            fontFamily: "'Poppins', 'Inter', sans-serif"
          }}>
            <div className="custom-banner-bg-image">
              <img
                src="/assets/images/product-banner/electronics-hero-c-01.webp"
                alt="Electronic Accessories Banner"
              />
            </div>
            <div className="content">
              <span className="subtitle" style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#7e7e7e",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                marginBottom: "8px",
                display: "block"
              }}>Modify Yourself</span>
              <h2 className="title banner-title" style={{
                fontSize: "40px",
                fontWeight: "700",
                color: "#1e1e1e",
                lineHeight: "1.2",
                marginBottom: "4px",
                letterSpacing: "-0.5px"
              }}>Electronic Accessories</h2>
              <h3 className="sub-title banner-subtitle" style={{
                fontSize: "34px",
                fontWeight: "600",
                color: "#1e1e1e",
                marginBottom: "16px",
                letterSpacing: "-0.5px",
                lineHeight: "1.2"
              }}>Stay powered up</h3>
              <div className="pricing-info" style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
                flexWrap: "wrap"
              }}>
                <span className="starting" style={{
                  fontSize: "14px",
                  color: "#777777",
                  fontWeight: "400"
                }}>Starting From</span>
                <span className="price" style={{
                  fontSize: "26px",
                  fontWeight: "700",
                  color: "#009966",
                  marginRight: "6px"
                }}>₹179.98</span>
                <span className="discount-badge" style={{
                  background: "#e52e2e",
                  color: "#ffffff",
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "4px 8px",
                  borderRadius: "5px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  display: "inline-block",
                  lineHeight: "1.2"
                }}>SAVE 50%</span>
              </div>
              <a href="/shop" className="rbt-btn" style={{
                background: "#009966",
                color: "#ffffff",
                padding: "0 38px",
                height: "44px",
                borderRadius: "30px",
                fontWeight: "600",
                fontSize: "14px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                textDecoration: "none",
                boxShadow: "0 4px 15px rgba(0,153,102,0.2)",
                transition: "all 0.3s ease",
                lineHeight: "1"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,153,102,0.3)";
                e.currentTarget.style.background = "#008055";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,153,102,0.2)";
                e.currentTarget.style.background = "#009966";
              }}
              >Shop Now</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
