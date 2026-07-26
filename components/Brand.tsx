"use client";

import React from "react";

export default function Brand() {
  const row1 = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg"];
  const row2 = ["12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg", "21.jpg"];

  return (
    <div className="pt-20 pb-16 bg-white overflow-hidden w-full border-t border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-[140px] mb-12">
        <div className="flex items-center gap-4">
          <h3 className="!text-[#009966] text-lg sm:text-xl md:text-2xl font-bold whitespace-nowrap m-0" style={{ margin: 0, lineHeight: 1 }}>
            Our Featured Brands
          </h3>
          <div className="h-[1px] bg-slate-200 flex-1" />
        </div>
      </div>

      <div className="relative flex flex-col gap-8 w-full">
        {/* Row 1 (slides left) */}
        <div className="marquee-wrapper w-full overflow-hidden flex">
          <div className="marquee-track flex gap-8 animate-marquee-left">
            {[...row1, ...row1, ...row1].map((logo, idx) => (
              <div
                key={`r1-${idx}`}
                className="flex items-center justify-center border border-[#f1f5f9] rounded-full px-5 py-2 shadow-[0_3px_10px_rgba(0,0,0,0.015)] min-w-[180px] h-[64px] shrink-0"
                style={{ backgroundColor: "#FDFDFD" }}
              >
                <img
                  src={`/assets/images/brand-logos/${logo}`}
                  alt="Brand Logo"
                  className="max-h-[44px] max-w-[140px] object-contain opacity-100 transition-all duration-300 scale-[1.35]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 (slides right) */}
        <div className="marquee-wrapper w-full overflow-hidden flex">
          <div className="marquee-track flex gap-8 animate-marquee-right">
            {[...row2, ...row2, ...row2].map((logo, idx) => (
              <div
                key={`r2-${idx}`}
                className="flex items-center justify-center border border-[#f1f5f9] rounded-full px-5 py-2 shadow-[0_3px_10px_rgba(0,0,0,0.015)] min-w-[180px] h-[64px] shrink-0"
                style={{ backgroundColor: "#FDFDFD" }}
              >
                <img
                  src={`/assets/images/brand-logos/${logo}`}
                  alt="Brand Logo"
                  className="max-h-[44px] max-w-[140px] object-contain opacity-100 transition-all duration-300 scale-[1.35]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
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
        .marquee-track {
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000px;
        }
        .animate-marquee-left {
          animation: marqueeLeft 35s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 35s linear infinite;
        }
        .marquee-wrapper {
          mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
        }
      `}</style>
    </div>
  );
}

