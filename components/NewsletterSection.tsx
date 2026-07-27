"use client";

export default function NewsletterSection() {
  return (
    <>
      <style>{`
        /* ── Outer container wrap ── */
        .osp-nl-wrap {
          padding: 48px 0;
          background: transparent;
        }

        /* ── Card with dark green background & square grid ── */
        .osp-nl-card {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          padding: 44px 52px;
          background: #091a0f;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 12px 48px rgba(0,0,0,0.2);
        }

        /* Square grid overlay inside card */
        .osp-nl-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

        /* Green glow top-left */
        .osp-nl-glow1 {
          position: absolute;
          top: -80px;
          left: -80px;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(22,163,74,0.22) 0%, transparent 65%);
          pointer-events: none;
        }

        /* Cyan glow bottom-right */
        .osp-nl-glow2 {
          position: absolute;
          bottom: -60px;
          right: -60px;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 65%);
          pointer-events: none;
        }

        /* ── Left ── */
        .osp-nl-left {
          flex: 1;
          min-width: 0;
          position: relative;
          z-index: 1;
        }
        .osp-nl-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(74,222,128,0.1);
          border: 1px solid rgba(74,222,128,0.32);
          color: #4ade80;
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 4px 13px;
          border-radius: 100px;
          margin-bottom: 14px;
        }
        .osp-nl-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 5px #4ade80;
          animation: nl-pulse 2s ease-in-out infinite;
        }
        @keyframes nl-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }
        .osp-nl-title {
          font-size: clamp(1.3rem, 2.4vw, 1.85rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.25;
          margin: 0 0 8px;
          letter-spacing: -0.025em;
        }
        .osp-nl-title .osp-gr {
          background: linear-gradient(90deg, #4ade80, #22d3ee);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .osp-nl-sub {
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
          margin: 0;
        }

        /* ── Right ── */
        .osp-nl-right {
          flex-shrink: 0;
          width: 400px;
          position: relative;
          z-index: 1;
        }
        /* Pill wrapper */
        .osp-nl-pill {
          display: flex;
          align-items: center;
          height: 52px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50px;
          padding: 0 6px 0 18px;
          gap: 10px;
          transition: border-color 0.2s, box-shadow 0.2s;
          margin-bottom: 12px;
          overflow: hidden;
        }
        .osp-nl-pill:focus-within {
          border-color: rgba(74,222,128,0.6);
          box-shadow: 0 0 0 3px rgba(74,222,128,0.12);
        }
        .osp-nl-icon {
          color: rgba(255,255,255,0.5);
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
        /* Input */
        .osp-nl-input {
          flex: 1;
          width: 0;
          min-width: 0;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          color: #ffffff;
          font-size: 0.88rem;
          padding: 0;
          height: 100%;
        }
        .osp-nl-input::placeholder { color: rgba(255,255,255,0.5); }

        /* Button */
        .osp-nl-btn {
          flex-shrink: 0;
          background: linear-gradient(135deg, #16a34a, #15803d);
          color: #ffffff;
          border: none;
          border-radius: 50px;
          padding: 0 22px;
          height: 40px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(22,163,74,0.4);
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .osp-nl-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 7px 20px rgba(22,163,74,0.52);
        }
        .osp-nl-btn:active { transform: translateY(0); }
        .osp-nl-btn svg { transition: transform 0.18s; }
        .osp-nl-btn:hover svg { transform: translateX(2px); }

        /* Privacy Note — Right-aligned & visible high-contrast color */
        .osp-nl-note {
          font-size: 0.76rem;
          color: rgba(255,255,255,0.75);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
          margin: 0;
        }
        .osp-nl-note svg {
          color: #4ade80;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .osp-nl-card {
            flex-direction: column;
            padding: 32px 24px;
            text-align: center;
          }
          .osp-nl-right { width: 100%; }
          .osp-nl-note { justify-content: center; }
        }
        @media (max-width: 480px) {
          .osp-nl-pill {
            height: auto;
            flex-direction: column;
            border-radius: 14px;
            padding: 10px;
            align-items: stretch;
            gap: 8px;
          }
          .osp-nl-icon { display: none; }
          .osp-nl-input { height: 36px; padding: 0 10px; width: 100%; }
          .osp-nl-btn { justify-content: center; border-radius: 10px; height: 40px; }
        }
      `}</style>

      <div className="osp-nl-wrap">
        <div className="container">
          <div className="osp-nl-card">
            {/* Glow blobs inside card */}
            <div className="osp-nl-glow1" />
            <div className="osp-nl-glow2" />

            {/* Left — Text */}
            <div className="osp-nl-left">
              <div className="osp-nl-chip">
                <span className="osp-nl-dot" />
                Maker Community
              </div>
              <h2 className="osp-nl-title">
                Join the{" "}
                <span className="osp-gr">Maker Community</span>
              </h2>

              <p className="osp-nl-sub">
                Schematics, datasheets &amp; exclusive coupons — free.
              </p>
            </div>

            {/* Right — Form */}
            <div className="osp-nl-right">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="osp-nl-pill">
                  <span className="osp-nl-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </span>
                  <input
                    id="newsletter-email"
                    type="email"
                    className="osp-nl-input"
                    placeholder="Enter your email address"
                    required
                  />
                  <button type="submit" className="osp-nl-btn">
                    Subscribe
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                </div>
              </form>
              <p className="osp-nl-note">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                No spam. Unsubscribe anytime.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
