"use client";

import { useEffect, useState, useRef } from "react";

export default function GoogleReviewsSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const scriptId = "elfsight-platform-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-12 bg-slate-50/70 text-slate-800 font-sans min-h-[300px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Elfsight Google Reviews Widget */}
        {isInView ? (
          <div 
            className="elfsight-app-49b78c59-895e-496f-bff3-22ff29d0cee1" 
            data-elfsight-app-lazy 
          />
        ) : (
          <div className="flex items-center justify-center py-12" style={{ minHeight: "150px" }}>
            <span className="text-muted small">Loading reviews...</span>
          </div>
        )}
      </div>
    </section>
  );
}