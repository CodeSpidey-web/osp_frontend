'use client';

import React, { useState, useEffect } from 'react';
import { MedusaProduct, fetchApi } from '@/lib/medusa';
import { useAuth } from '@/lib/AuthContext';

interface ProductDetailsBottomProps {
  product: MedusaProduct;
}

export default function ProductDetailsBottom({ product }: ProductDetailsBottomProps) {
  const { customer } = useAuth();

  const [reviewsList, setReviewsList] = useState<Array<{
    id: string;
    product_id: string;
    author: string;
    rating: number;
    title: string;
    content: string;
    verified: boolean;
    created_at: string;
  }>>([]);

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Load reviews from Backend on mount and when product.id changes
  useEffect(() => {
    setLoadingReviews(true);
    fetchApi<{ reviews: typeof reviewsList }>(`/store/reviews?product_id=${product.id}`)
      .then(data => {
        if (data && data.reviews) {
          setReviewsList(data.reviews);
        }
      })
      .catch(err => console.error("Error loading reviews from database:", err))
      .finally(() => setLoadingReviews(false));
  }, [product.id]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) {
      alert("You must be logged in to submit a review.");
      return;
    }
    if (!reviewTitle || !reviewText) {
      alert("Please fill in all fields.");
      return;
    }

    fetchApi<{ success: boolean; reviews: typeof reviewsList }>('/store/reviews', {
      method: 'POST',
      body: JSON.stringify({
        product_id: product.id,
        rating: rating,
        title: reviewTitle,
        content: reviewText
      })
    })
      .then(data => {
        if (data && data.reviews) {
          setReviewsList(data.reviews);
          setReviewTitle('');
          setReviewText('');
          setRating(5);
        }
      })
      .catch(err => {
        console.error("Error saving review to database:", err);
        alert("Failed to submit review. Please try again.");
      });
  };

  // Format date helper
  const formatReviewDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }).replace(',', ' at');
    } catch (e) {
      return dateStr;
    }
  };

  // Compute stats
  const totalReviews = reviewsList.length;
  const avgRating = totalReviews > 0 
    ? (reviewsList.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : '0.0';

  const getPercentage = (stars: number) => {
    if (totalReviews === 0) return 0;
    const count = reviewsList.filter(r => r.rating === stars).length;
    return Math.round((count / totalReviews) * 100);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .product-details-tabs .nav-tabs {
          border-bottom: 1px solid #e2e8f0 !important;
        }
        .product-details-tabs .nav-link {
          text-transform: uppercase !important;
          font-weight: 700 !important;
          font-size: 12px !important;
          letter-spacing: 0.05em !important;
          padding: 14px 28px !important;
          border: 1px solid transparent !important;
          border-bottom: none !important;
          color: #64748b !important;
          background: none !important;
          margin-right: 4px !important;
          transition: all 0.2s ease !important;
          position: relative;
        }
        .product-details-tabs .nav-link.active {
          color: #c85a17 !important;
          font-weight: 800 !important;
        }
        .product-details-tabs .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #c85a17;
          border-radius: 3px 3px 0 0;
        }
        .product-details-tabs .nav-link:hover:not(.active) {
          color: #1e293b !important;
        }
        
        .premium-review-input {
          color: #1a1a1a !important;
          background-color: #ffffff !important;
          border: 1.5px solid #cbd5e1 !important;
          border-radius: 6px !important;
          padding: 10px 14px !important;
          font-size: 13px !important;
          outline: none !important;
          transition: all 0.2s ease !important;
        }
        .premium-review-input:focus {
          border-color: #c85a17 !important;
          box-shadow: 0 0 0 3px rgba(200, 90, 23, 0.1) !important;
        }
        .premium-review-input::placeholder {
          color: #94a3b8 !important;
        }
      ` }} />

      <div className="rbt-component-area rbt-section-gap rbt-bg-color-gray-light pt--0">
        <div className="container">
          <div className="row row--12 mt_dec--24">
            <div className="col-xl-12 mt--24">
              <div className="rbt-tab rbt-product-single-details-tab product-details-tabs">
                <div className="rbt-tab-nav-wrapper">
                  <ul className="nav nav-tabs" id="rbt-single-productTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <a 
                        aria-controls="rbt-description" 
                        aria-selected="true" 
                        className="nav-link active" 
                        data-bs-toggle="tab" 
                        href="#rbt-description" 
                        id="rbt-description-tab" 
                        role="tab"
                      >
                        Description
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a 
                        aria-controls="rbt-reviews" 
                        aria-selected="false" 
                        className="nav-link" 
                        data-bs-toggle="tab" 
                        href="#rbt-reviews" 
                        id="rbt-reviews-tab" 
                        role="tab"
                      >
                        Reviews ({totalReviews})
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderTop: 'none', padding: '32px', borderRadius: '0 0 8px 8px' }}>
                  
                  {/* DESCRIPTION TAB PANEL */}
                  <div aria-labelledby="rbt-description-tab" className="tab-pane fade show active" id="rbt-description" role="tabpanel">
                    <div className="rbt-product-single-description">
                      <div 
                        className="rbt-block-desc b1 mb--0"
                        dangerouslySetInnerHTML={{ __html: product.description || 'No description available.' }}
                        style={{ color: '#334155', lineHeight: '1.7', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  
                  {/* REVIEWS TAB PANEL */}
                  <div aria-labelledby="rbt-reviews-tab" className="tab-pane fade" id="rbt-reviews" role="tabpanel">
                    <div className="rbt-product-single-reviews-area">
                      
                      {/* Reviews statistics summary */}
                      <div className="rbt-review-statistics-section" style={{ marginBottom: '32px' }}>
                        <div className="row align-items-center">
                          <div className="col-12 col-md-4 mb-4 mb-md-0">
                            <div className="rbt-avr-review" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', padding: '30px', borderRadius: '12px', border: '1px solid #f1f5f9', textAlign: 'center' }}>
                              <span className="rbt-abr-review-number-text" style={{ fontSize: '54px', fontWeight: '800', color: '#0f172a', lineHeight: '1' }}>{avgRating}</span>
                              <div className="rbt-abr-review-content mt--12">
                                <ul className="rbt-rating-icon-list" style={{ color: '#f59e0b', display: 'flex', listStyle: 'none', padding: 0, margin: '0 0 8px 0', gap: '4px', justifyContent: 'center' }}>
                                  {Array.from({ length: 5 }).map((_, i) => {
                                    const starsVal = i + 1;
                                    const isFilled = parseFloat(avgRating) >= starsVal;
                                    return (
                                      <li key={i}>
                                        <i className={`fa-solid fa-star${isFilled ? ' rbt-rated-icon' : ''}`} style={{ color: isFilled ? '#f59e0b' : '#cbd5e1', fontSize: '16px' }}></i>
                                      </li>
                                    );
                                  })}
                                </ul>
                                <p className="rating-text b3 rbt-text-color-gray-700" style={{ margin: 0, fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
                                  Based on {totalReviews} Review{totalReviews !== 1 ? 's' : ''}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 col-md-8">
                            <div className="rbt-rating-breakdown" style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 10px' }}>
                              {[5, 4, 3, 2, 1].map((stars) => {
                                const percent = getPercentage(stars);
                                const count = reviewsList.filter(r => r.rating === stars).length;
                                return (
                                  <div key={stars} className="rbt-rating-item" style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '13px' }}>
                                    <span className="number-text" style={{ color: '#334155', fontWeight: '700', width: '40px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                      {stars} <i className="fa-solid fa-star" style={{ color: '#f59e0b', fontSize: '11px' }}></i>
                                    </span>
                                    <div className="progress" style={{ flexGrow: 1, height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                      <div className="progress-bar" style={{ width: `${percent}%`, backgroundColor: '#f59e0b', height: '100%', borderRadius: '4px', transition: 'width 0.4s ease' }}></div>
                                    </div>
                                    <span className="number-text" style={{ color: '#64748b', width: '32px', textAlign: 'right', fontWeight: '500' }}>{count}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Reviews comments list */}
                      <div className="rbt-prd-single-reviews-list-area" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '32px', marginBottom: '40px' }}>
                        {loadingReviews ? (
                          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b', fontSize: '14px' }}>
                            <p style={{ margin: 0, fontWeight: '500' }}>Loading reviews from database...</p>
                          </div>
                        ) : reviewsList.length === 0 ? (
                          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b', fontSize: '14px', borderBottom: '1px solid #f1f5f9', marginBottom: '40px' }}>
                            <p style={{ margin: 0, fontWeight: '500' }}>There are no reviews for this product yet.</p>
                            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>Be the first to share your thoughts!</p>
                          </div>
                        ) : (
                          <ul className="rbt-comment-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '28px' }}>
                            {reviewsList.map((rev) => {
                              const firstLetter = rev.author.charAt(0).toUpperCase();
                              return (
                                <li className="comment" key={rev.id} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '24px' }}>
                                  <div className="comment-body">
                                    <div className="single-comment" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                      {/* Premium Letter Avatar */}
                                      <div style={{ 
                                        width: '48px', 
                                        height: '48px', 
                                        borderRadius: '50%', 
                                        backgroundColor: '#f1f5f9', 
                                        color: '#475569', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        fontWeight: '700', 
                                        fontSize: '18px',
                                        border: '2px solid #cbd5e1',
                                        flexShrink: 0
                                      }}>
                                        {firstLetter}
                                      </div>
                                      <div className="comment-inner" style={{ flexGrow: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                                          <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                              <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: 0 }}>{rev.author}</h5>
                                              {rev.verified && (
                                                <span style={{ fontSize: '10px', color: '#10b981', backgroundColor: '#ecfdf5', padding: '2px 6px', borderRadius: '10px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '2px' }}>
                                                  <i className="fa-solid fa-circle-check" style={{ fontSize: '8px' }}></i> Verified Purchaser
                                                </span>
                                              )}
                                            </div>
                                            <ul className="rbt-rating-icon-list mt--4" style={{ color: '#f59e0b', display: 'flex', listStyle: 'none', padding: 0, margin: '4px 0 8px 0', gap: '2px' }}>
                                              {Array.from({ length: 5 }).map((_, i) => (
                                                <li key={i}>
                                                  <i className="fa-solid fa-star" style={{ color: i < rev.rating ? '#f59e0b' : '#e2e8f0', fontSize: '11px' }}></i>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                          <div className="time-spent" style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>{formatReviewDate(rev.created_at)}</div>
                                        </div>
                                        <div className="comment-text mt--4">
                                          <p className="title" style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0' }}>{rev.title}</p>
                                          <p className="b1" style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: '1.6' }}>{rev.content}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>

                      {/* Add Review Form */}
                      {!customer ? (
                        <div style={{ backgroundColor: '#f8fafc', padding: '36px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                          <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '8px', color: '#0f172a' }}>
                            Add A Review
                          </h3>
                          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
                            You must be logged in to submit a review for this product.
                          </p>
                          <a 
                            href="/login" 
                            className="rbt-btn btn-sm btn-gradient" 
                            style={{ display: 'inline-block', border: 'none', height: 'auto', padding: '12px 28px', fontSize: '13px', fontWeight: '700', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#c85a17', color: '#ffffff', textDecoration: 'none', transition: 'all 0.2s' }}
                          >
                            Log In / Register
                          </a>
                        </div>
                      ) : (
                        <div className="rbt-reviews-form" style={{ backgroundColor: '#f8fafc', padding: '32px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                          <form className="rbt-contact-form" onSubmit={handleSubmitReview}>
                            <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '20px', color: '#0f172a', letterSpacing: '-0.01em' }}>
                              Add A Review
                            </h3>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                              {/* Premium Interactive Star Rating Selector */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Your Rating *</label>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                  {[1, 2, 3, 4, 5].map((val) => (
                                    <button
                                      key={val}
                                      type="button"
                                      onClick={() => setRating(val)}
                                      onMouseEnter={() => setHoverRating(val)}
                                      onMouseLeave={() => setHoverRating(null)}
                                      style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer' }}
                                    >
                                      <i 
                                        className="fa-solid fa-star" 
                                        style={{ 
                                          color: val <= (hoverRating ?? rating) ? '#f59e0b' : '#cbd5e1', 
                                          fontSize: '24px',
                                          transition: 'color 0.15s ease'
                                        }}
                                      />
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Review Title */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label htmlFor="review_title" style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Review Title *</label>
                                <input 
                                  className="premium-review-input" 
                                  id="review_title" 
                                  required
                                  type="text" 
                                  value={reviewTitle}
                                  onChange={(e) => setReviewTitle(e.target.value)}
                                  placeholder="Summarize your review"
                                />
                              </div>

                              {/* Review Content */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label htmlFor="review_message" style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Your Review *</label>
                                <textarea 
                                  className="premium-review-input" 
                                  id="review_message" 
                                  required
                                  name="message" 
                                  value={reviewText}
                                  onChange={(e) => setReviewText(e.target.value)}
                                  placeholder="Write your review details here..."
                                  style={{ minHeight: '120px' }}
                                ></textarea>
                              </div>

                              <div className="mt--8">
                                <button 
                                  type="submit" 
                                  className="rbt-btn btn-sm btn-gradient" 
                                  style={{ border: 'none', height: 'auto', padding: '14px 28px', fontSize: '13px', fontWeight: '700', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#c85a17', color: '#ffffff', transition: 'all 0.2s' }}
                                >
                                  Submit Review
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
