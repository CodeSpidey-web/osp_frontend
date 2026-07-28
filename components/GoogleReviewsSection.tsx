"use client";

import { useEffect } from "react";

export default function GoogleReviewsSection() {
  useEffect(() => {
    const scriptId = "elfsight-platform-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="py-12 bg-slate-50/70 text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Elfsight Google Reviews Widget */}
        <div 
          className="elfsight-app-a92c4b10-c673-415e-994e-34521f4eb825" 
          data-elfsight-app-lazy 
        />
      </div>
    </section>
  );
}