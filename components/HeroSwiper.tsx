"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const HERO_IMAGES = [
  { id: 1, src: "/assets/images/hero/1.jpg", alt: "Hero Banner 1" },
  { id: 2, src: "/assets/images/hero/2.jpg", alt: "Hero Banner 2" },
  { id: 3, src: "/assets/images/hero/3.jpg", alt: "Hero Banner 3" },
  { id: 4, src: "/assets/images/hero/4.jpg", alt: "Hero Banner 4" },
  { id: 5, src: "/assets/images/hero/5.jpg", alt: "Hero Banner 5" },
  { id: 6, src: "/assets/images/hero/6.jpg", alt: "Hero Banner 6" },
];

export default function HeroSwiper() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_IMAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchEndX.current - touchStartX.current > 50) {
      handlePrev();
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden select-none bg-slate-900 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider Images Container */}
      <div
        className="flex transition-transform duration-700 ease-out w-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {HERO_IMAGES.map((img, index) => (
          <div
            key={img.id}
            className="w-full shrink-0 relative overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={1920}
              height={600}
              priority={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              className="w-full h-auto block"
              sizes="100vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
