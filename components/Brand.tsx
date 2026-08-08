"use client";

import React from "react";

export default function Brand() {
  const row1 = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg"];
  const row2 = ["12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg", "21.jpg"];

  return (
    <div className="osp-brand-section">
      <div className="container">
        {/* Section Header */}
        <div className="osp-brand-header">
          <div className="osp-brand-title-wrap">
            <span className="osp-brand-chip">TRUSTED PARTNERS</span>
            <h3 className="osp-brand-title">
              Our Featured <span className="highlight">Brands</span>
            </h3>
          </div>
          <div className="osp-brand-line" />
        </div>

        {/* Marquee Container */}
        <div className="osp-brand-marquee-container">
          {/* Row 1 (slides left) */}
          <div className="marquee-wrapper">
            <div className="marquee-track animate-marquee-left">
              {[...row1, ...row1, ...row1].map((logo, idx) => (
                <div key={`r1-${idx}`} className="osp-brand-card">
                  <img
                    src={`/assets/images/brand-logos/${logo}`}
                    alt="Brand Logo"
                    className="osp-brand-logo"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 (slides right) */}
          <div className="marquee-wrapper">
            <div className="marquee-track animate-marquee-right">
              {[...row2, ...row2, ...row2].map((logo, idx) => (
                <div key={`r2-${idx}`} className="osp-brand-card">
                  <img
                    src={`/assets/images/brand-logos/${logo}`}
                    alt="Brand Logo"
                    className="osp-brand-logo"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .osp-brand-section {
          padding: 60px 0;
          background: #ffffff;
          border-top: 1px solid #f1f5f9;
          border-bottom: 1px solid #f1f5f9;
          overflow: hidden;
        }

        .osp-brand-header {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 36px;
        }

        .osp-brand-title-wrap {
          flex-shrink: 0;
        }

        .osp-brand-chip {
          display: inline-block;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #16a34a;
          background: rgba(22, 163, 74, 0.08);
          border: 1px solid rgba(22, 163, 74, 0.2);
          padding: 2px 8px;
          border-radius: 100px;
          margin-bottom: 4px;
        }

        .osp-brand-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .osp-brand-title .highlight {
          color: #16a34a;
        }

        .osp-brand-line {
          height: 1px;
          background: linear-gradient(90deg, #e2e8f0 0%, transparent 100%);
          flex: 1;
        }

        .osp-brand-marquee-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
        }

        .marquee-wrapper {
          width: 100%;
          overflow: visible;
          padding: 10px 0;
          margin: -10px 0;
          display: flex;
          mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
        }

        .marquee-track {
          display: flex;
          gap: 20px;
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000px;
          padding: 4px 0;
        }

        .animate-marquee-left {
          animation: marqueeLeft 40s linear infinite;
        }

        .animate-marquee-right {
          animation: marqueeRight 40s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .osp-brand-card {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #FDFDFD;
          border: 1px solid #f1f5f9;
          border-radius: 100px;
          padding: 8px 20px;
          min-width: 175px;
          height: 72px;
          flex-shrink: 0;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.015);
          transition: all 0.25s ease;
        }

        .osp-brand-card:hover {
          border-color: #16a34a;
          box-shadow: 0 8px 24px rgba(22, 163, 74, 0.12);
        }

        .osp-brand-logo {
          max-height: 44px;
          max-width: 135px;
          object-contain: fit;
          filter: grayscale(10%);
          opacity: 0.95;
          transition: all 0.25s ease;
          transform: scale(1.05);
        }

        .osp-brand-card:hover .osp-brand-logo {
          filter: grayscale(0%);
          opacity: 1;
          transform: scale(1.10);
        }

        @keyframes marqueeLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }

        @keyframes marqueeRight {
          0% {
            transform: translate3d(-33.333%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}
