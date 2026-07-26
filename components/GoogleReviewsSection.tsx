"use client";

import { useState, useEffect, useRef } from "react";

interface ReviewItem {
  id: string;
  author_name: string;
  rating: number;
  review_text: string;
  review_time: string | null;
  profile_photo_url: string | null;
  review_url: string | null;
}

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const avatarColors = [
  "bg-[#2e7d32]",
  "bg-[#00796b]",
  "bg-[#1565c0]",
  "bg-[#6a1b9a]",
  "bg-[#37474f]",
];

const getAvatarBg = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
};

const getInitials = (name: string) => {
  if (!name) return "A";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export default function GoogleReviewsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
        const res = await fetch(`${backendUrl}/store/google-reviews`, {
          headers: {
            "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.reviews && data.reviews.length > 0) {
            setReviews(data.reviews);
          }
        }
      } catch (err) {
        console.error("Error loading Google reviews:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const formatTime = (timeStr: string | null) => {
    if (!timeStr) return "1 month ago";
    try {
      const date = new Date(timeStr);
      const diffMs = Date.now() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays < 7) return `${diffDays || 1} days ago`;
      const diffWeeks = Math.floor(diffDays / 7);
      if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
      const diffMonths = Math.floor(diffDays / 30);
      if (diffMonths < 12) return `${diffMonths || 1} month ago`;
      return `${Math.floor(diffMonths / 12)} years ago`;
    } catch {
      return "1 month ago";
    }
  };

  const displayReviews: ReviewItem[] = reviews.length > 0 ? reviews : [
    {
      id: "demo1",
      author_name: "Lakshminarayana M",
      rating: 5,
      review_text: "The best digital marketing and electronics components supplier in Ongole.",
      review_time: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      profile_photo_url: null,
      review_url: "https://google.com",
    },
    {
      id: "demo2",
      author_name: "Puchakayala Sreenadh",
      rating: 5,
      review_text: "Ocean Student Projects is one of the best institutes and suppliers for learning IoT & Robotics. Srinivas Sir and Pradeep Sir have excellent teaching...",
      review_time: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      profile_photo_url: null,
      review_url: "https://google.com",
    },
    {
      id: "demo3",
      author_name: "KM Reddy",
      rating: 5,
      review_text: "Ocean Student Projects is an excellent place to learn digital marketing and hardware projects. Easy-to-understand teaching, hands-on practice, and very helpful...",
      review_time: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      profile_photo_url: null,
      review_url: "https://google.com",
    },
    {
      id: "demo4",
      author_name: "uma sankar",
      rating: 5,
      review_text: "One of the best AI & engineering project centers in Ongole. Great trainers, practical learning, and good placement support for beginners...",
      review_time: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      profile_photo_url: null,
      review_url: "https://google.com",
    },
    {
      id: "demo5",
      author_name: "Rajasekhar Reddy",
      rating: 5,
      review_text: "Super fast shipping and 100% genuine tested components. Outstanding final year project assistance!",
      review_time: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      profile_photo_url: null,
      review_url: "https://google.com",
    },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardsPerPage = isMobile ? 1 : 4;
  const totalPages = Math.ceil(displayReviews.length / cardsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayReviews.length - cardsPerPage : Math.max(0, prev - 1)));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + cardsPerPage >= displayReviews.length ? 0 : prev + 1));
  };

  const visibleReviews = displayReviews.slice(currentIndex, currentIndex + cardsPerPage);

  return (
    <section className="py-12 bg-slate-50/70 text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Badge & Title */}
        <div className="text-center mb-6">
          {/* Single Clean GOOGLE REVIEWS Pill Badge */}
          <div className="flex justify-center mb-3">
            <div className="bg-white text-emerald-600 border border-emerald-300 px-6 py-2.5 rounded-full font-extrabold text-xs tracking-wider inline-flex items-center gap-2.5 shadow-sm">
              <GoogleIcon />
              <span className="text-emerald-600 font-extrabold">GOOGLE REVIEWS</span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
            What Creators Say On{" "}
            <span className="text-emerald-600 font-black">
              Google Reviews
            </span>
          </h2>

          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-normal">
            Real feedback from engineering students, makers, and innovators.
          </p>
        </div>
        <div
          className="relative px-1 sm:px-4 select-none"
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchMove={(e) => { touchEndX.current = e.touches[0].clientX; }}
          onTouchEnd={() => {
            if (touchStartX.current - touchEndX.current > 40) handleNext();
            if (touchEndX.current - touchStartX.current > 40) handlePrev();
          }}
        >
          {/* Left Arrow Button */}
          <div
            role="button"
            tabIndex={0}
            onClick={handlePrev}
            onKeyDown={(e) => e.key === 'Enter' && handlePrev()}
            onMouseEnter={() => setIsLeftHovered(true)}
            onMouseLeave={() => setIsLeftHovered(false)}
            aria-label="Previous reviews"
            className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 transition-all hover:scale-105 active:scale-95 border"
            style={{
              width: "36px",
              height: "36px",
              minWidth: "36px",
              minHeight: "36px",
              borderRadius: "50%",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              backgroundColor: isLeftHovered ? "#376628" : "#ffffff",
              color: isLeftHovered ? "#ffffff" : "#475569",
              borderColor: isLeftHovered ? "#376628" : "#e2e8f0",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>

          {/* Right Arrow Button */}
          <div
            role="button"
            tabIndex={0}
            onClick={handleNext}
            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
            onMouseEnter={() => setIsRightHovered(true)}
            onMouseLeave={() => setIsRightHovered(false)}
            aria-label="Next reviews"
            className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 transition-all hover:scale-105 active:scale-95 border"
            style={{
              width: "36px",
              height: "36px",
              minWidth: "36px",
              minHeight: "36px",
              borderRadius: "50%",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              backgroundColor: isRightHovered ? "#376628" : "#ffffff",
              color: isRightHovered ? "#ffffff" : "#475569",
              borderColor: isRightHovered ? "#376628" : "#e2e8f0",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>

          {/* Review Cards Grid - Compact Proportions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {visibleReviews.map((rev) => {
              const isLongText = rev.review_text.length > 110;
              const isExpanded = expandedReviewId === rev.id;
              const displayText = isLongText && !isExpanded ? rev.review_text.slice(0, 95) + "..." : rev.review_text;

              return (
                <div
                  key={rev.id}
                  className="bg-white rounded-[20px] p-4.5 sm:p-5 border border-gray-100 shadow-[0_4px_18px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full"
                  style={{ borderRadius: "20px" }}
                >
                  <div>
                    {/* Card Header: Avatar, Name, Subtitle, Google Icon */}
                    <div className="flex items-start justify-between mb-3 gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {rev.profile_photo_url ? (
                          <img
                            src={rev.profile_photo_url}
                            alt={rev.author_name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] rounded-full object-cover border border-slate-100 shrink-0"
                            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                          />
                        ) : (
                          <div
                            className="w-10 h-10 min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] rounded-full bg-[#376628] text-white font-bold text-sm shrink-0 flex items-center justify-center shadow-xs"
                            style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#376628" }}
                          >
                            {getInitials(rev.author_name).charAt(0)}
                          </div>
                        )}

                        <div className="min-w-0 overflow-hidden">
                          <h6 className="font-bold text-slate-800 text-sm leading-tight truncate">
                            {rev.author_name}
                          </h6>
                          <span className="text-[11px] text-[#8ea0b5] font-semibold block mt-0.5 truncate">
                            Google Reviewer
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 mt-0.5">
                        <GoogleIcon />
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-0.5 mb-0.5 text-[#f59e0b] text-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>

                    {/* Relative Time */}
                    <p className="text-[11px] text-[#8ea0b5] font-semibold mb-3">
                      {formatTime(rev.review_time)}
                    </p>

                    {/* Review Text Quote */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3 font-normal">
                      &ldquo;{displayText}&rdquo;
                    </p>
                  </div>

                  {/* Card Footer: Read More & View on Google */}
                  <div className="flex items-center justify-between pt-2.5 mt-auto border-t border-gray-100">
                    {isLongText ? (
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={() => setExpandedReviewId(isExpanded ? null : rev.id)}
                        className="text-[11px] font-bold text-[#376628] hover:text-emerald-800 transition-colors cursor-pointer"
                      >
                        {isExpanded ? "Show less" : "Read more"}
                      </span>
                    ) : (
                      <div />
                    )}

                    {rev.review_url && (
                      <a
                        href={rev.review_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-[#8ea0b5] hover:text-blue-600 transition-colors flex items-center gap-1 ml-auto no-underline"
                      >
                        <span>View on Google</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot Pagination Controls */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {Array.from({ length: totalPages || 1 }).map((_, idx) => {
            const isActive = Math.floor(currentIndex / cardsPerPage) === idx;
            return (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                onClick={() => setCurrentIndex(idx * cardsPerPage)}
                aria-label={`Go to slide page ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${isActive
                  ? "w-5 h-1.5 bg-[#376628]"
                  : "w-1.5 h-1.5 bg-slate-200 hover:bg-slate-400"
                  }`}
                style={{ borderRadius: "9999px" }}
              />
            );
          })}
        </div>

        {/* Write a Google Review Button */}
        <div className="flex justify-center mt-4">
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJz7sXYCGRyzsRHsL9V-R9xLc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-[#e5e7eb] rounded-full font-semibold text-sm text-[#374151] shadow-xs cursor-pointer no-underline"
          >
            <GoogleIcon />
            <span>Write a Google Review</span>
          </a>
        </div>
      </div>
    </section>
    );
  }


  