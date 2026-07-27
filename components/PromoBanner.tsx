"use client";

import React, { useState, useEffect, useRef } from "react";

const BANNER_SLIDES = [
  {
    id: 1,
    bgImage: "/assets/images/product-banner/electronics-hero-c-01.webp",
    subtitle: "MODIFY YOURSELF",
    title: "Electronic Accessories",
    subTitleText: "Stay powered up",
    btnText: "Shop Now",
    btnLink: "/shop",
    bgClass: "slide-1-bg",
  },
  {
    id: 2,
    bgImage: "/assets/images/product-banner/product-banner-img-03.webp",
    subtitle: "EXPLORE & FLY",
    title: "FPV Drones & Modules",
    subTitleText: "Next-Gen Aerial Robotics",
    btnText: "Explore Drones",
    btnLink: "/shop",
    bgClass: "slide-2-bg",
  },
];

export default function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? BANNER_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 40) {
      handleNext();
    }
    if (touchEndX.current - touchStartX.current > 40) {
      handlePrev();
    }
  };

  return (
    <>
      <style jsx global>{`
        .custom-electronics-banner-wrapper {
          position: relative;
          width: 100%;
        }
        .custom-electronics-banner {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          min-height: 360px;
          display: flex;
          align-items: center;
          background-color: #eaeaea;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          margin-left: 15px;
          margin-right: 15px;
        }
        .banner-slider-track {
          display: flex;
          width: 100%;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .banner-slide-item {
          width: 100%;
          flex-shrink: 0;
          position: relative;
          min-height: 360px;
          display: flex;
          align-items: center;
          background-color: #eaeaea;
        }
        .custom-banner-bg-image {
          position: absolute;
          top: 0;
          right: 0;
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
        /* Specific alignment adjustments per slide image */
        .slide-1-bg img {
          object-position: right center;
          transform: scale(1.05);
          transform-origin: right center;
        }
        .slide-2-bg img {
          object-position: right center;
        }

        .custom-electronics-banner .content {
          position: relative;
          z-index: 2;
          padding: 40px 0px 40px 150px;
          max-width: 650px;
        }
        .banner-arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: #1e1e1e;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(4px);
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          opacity: 0;
        }
        .custom-electronics-banner-wrapper:hover .banner-arrow-btn {
          opacity: 1;
        }
        .banner-arrow-btn:hover {
          background: #009966;
          color: #ffffff;
          border-color: #009966;
        }
        .banner-arrow-prev {
          left: 28px;
        }
        .banner-arrow-next {
          right: 28px;
        }
        .banner-dots-container {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          gap: 8px;
        }
        .banner-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.2);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
        }
        .banner-dot.active {
          width: 28px;
          border-radius: 10px;
          background: #009966;
        }
        .custom-banner-btn {
          background: #009966;
          color: #ffffff;
          padding: 0 38px;
          height: 44px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(0,153,102,0.2);
          transition: all 0.3s ease;
          line-height: 1;
        }
        .custom-banner-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,153,102,0.3);
          background: #008055;
          color: #ffffff;
        }

        @media (max-width: 991px) {
          .custom-electronics-banner .content {
            padding: 30px 40px 30px 50px;
          }
          .custom-electronics-banner, .banner-slide-item {
            min-height: 315px;
          }
          .banner-arrow-btn {
            opacity: 1;
            width: 36px;
            height: 36px;
          }
          .banner-arrow-prev { left: 20px; }
          .banner-arrow-next { right: 20px; }
        }
        @media (max-width: 767px) {
          .custom-electronics-banner, .banner-slide-item {
            min-height: 280px;
            margin-left: 10px;
            margin-right: 10px;
          }
          .custom-banner-bg-image img {
            object-fit: cover;
            object-position: 72% center;
          }
          .custom-electronics-banner .content {
            padding: 24px 20px;
            max-width: 65%;
            margin: 0;
            background: linear-gradient(90deg, rgba(234, 234, 234, 0.95) 50%, rgba(234, 234, 234, 0.7) 80%, rgba(234, 234, 234, 0) 100%);
          }
          .custom-electronics-banner .banner-title {
            font-size: 20px !important;
          }
          .custom-electronics-banner .banner-subtitle {
            font-size: 15px !important;
            margin-bottom: 10px !important;
            font-weight: 600;
          }
          .custom-electronics-banner .subtitle {
            font-size: 11px !important;
            margin-bottom: 4px !important;
          }
          .custom-banner-btn {
            height: 32px !important;
            padding: 0 18px !important;
            font-size: 11px !important;
          }
        }
      `}</style>

      {/* Electronic Accessories Banner Swiper */}
      <div className="rbt-component-area pt--60 pb--60">
        <div className="container">
          <div
            className="custom-electronics-banner-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="custom-electronics-banner" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>
              {/* Slides Track */}
              <div
                className="banner-slider-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {BANNER_SLIDES.map((slide) => (
                  <div key={slide.id} className="banner-slide-item">
                    <div className={`custom-banner-bg-image ${slide.bgClass}`}>
                      <img src={slide.bgImage} alt={slide.title} />
                    </div>
                    <div className="content">
                      <span
                        className="subtitle"
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#009966",
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          marginBottom: "8px",
                          display: "block",
                        }}
                      >
                        {slide.subtitle}
                      </span>
                      <h2
                        className="title banner-title"
                        style={{
                          fontSize: "40px",
                          fontWeight: "700",
                          color: "#1e1e1e",
                          lineHeight: "1.2",
                          marginBottom: "4px",
                          letterSpacing: "-0.5px",
                        }}
                      >
                        {slide.title}
                      </h2>
                      <h3
                        className="sub-title banner-subtitle"
                        style={{
                          fontSize: "34px",
                          fontWeight: "600",
                          color: "#1e1e1e",
                          marginBottom: "16px",
                          letterSpacing: "-0.5px",
                          lineHeight: "1.2",
                        }}
                      >
                        {slide.subTitleText}
                      </h3>
                      <a
                        href={slide.btnLink}
                        className="rbt-btn custom-banner-btn"
                      >
                        {slide.btnText}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Dots */}
              <div className="banner-dots-container">
                {BANNER_SLIDES.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`banner-dot ${index === currentSlide ? "active" : ""}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
