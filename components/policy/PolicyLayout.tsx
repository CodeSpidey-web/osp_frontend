'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PolicyLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated?: string;
  badge?: string;
  children: React.ReactNode;
}

const POLICY_NAV_LINKS = [
  {
    title: 'Privacy Policy',
    href: '/privacy-policy',
    icon: 'fa-shield-halved',
    desc: 'How we handle and protect your personal data'
  },
  {
    title: 'Terms & Conditions',
    href: '/terms-and-conditions',
    icon: 'fa-file-contract',
    desc: 'Rules and guidelines for website use and purchases'
  },
  {
    title: 'Shipping Policy',
    href: '/shipping-policy',
    icon: 'fa-truck-fast',
    desc: 'Dispatch times, delivery estimates & couriers'
  },
  {
    title: 'Return & Refund Policy',
    href: '/return-and-refund-policy',
    icon: 'fa-arrow-rotate-left',
    desc: 'Guidelines for returns, replacements & damaged items'
  }
];

export default function PolicyLayout({
  title,
  subtitle,
  lastUpdated = 'February 2026',
  badge = 'Legal & Customer Policies',
  children
}: PolicyLayoutProps) {
  const pathname = usePathname();

  return (
    <>
      <style>{`
        .policy-hero-banner {
          position: relative;
          background: linear-gradient(135deg, #051f0f 0%, #0c331a 45%, #136c39 100%);
          overflow: hidden;
          padding: 70px 0 80px;
        }
        .policy-hero-banner::before {
          content: '';
          position: absolute;
          top: -60px;
          right: 5%;
          width: 360px;
          height: 360px;
          background: radial-gradient(circle, rgba(254,208,0,0.14) 0%, rgba(254,208,0,0) 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .policy-hero-banner::after {
          content: '';
          position: absolute;
          bottom: -100px;
          left: -40px;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .policy-hero-inner {
          position: relative;
          z-index: 2;
        }
        .policy-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(254,208,0,0.12);
          border: 1px solid rgba(254,208,0,0.28);
          color: #fed000;
          padding: 6px 18px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .policy-hero-title {
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin-bottom: 14px;
        }
        .policy-hero-title .accent {
          background: linear-gradient(90deg, #fed000 0%, #ffe34d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .policy-hero-desc {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.82);
          max-width: 680px;
          margin: 0 auto 24px;
        }
        .policy-breadcrumb-nav {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 20px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 50px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          font-size: 0.875rem;
        }
        .policy-breadcrumb-nav a {
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .policy-breadcrumb-nav a:hover {
          color: #fed000;
        }
        .policy-breadcrumb-nav .sep {
          color: rgba(254,208,0,0.6);
          font-size: 0.75rem;
        }
        .policy-breadcrumb-nav .current {
          color: #ffffff;
          font-weight: 600;
        }

        /* Policy Main Layout */
        .policy-container {
          background-color: #f8fafc;
          padding: 60px 0 90px;
          color: #1e293b;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .policy-main-card {
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          padding: 44px 48px;
        }
        @media (max-width: 768px) {
          .policy-main-card {
            padding: 24px 20px;
            border-radius: 14px;
          }
          .policy-hero-banner {
            padding: 50px 0 60px;
          }
        }

        /* Sidebar Styling */
        .policy-sidebar {
          position: sticky;
          top: 100px;
        }
        .policy-sidebar-card {
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          margin-bottom: 24px;
        }
        .policy-sidebar-title {
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #136c39;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .policy-sidebar-menu {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .policy-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          text-decoration: none;
          color: #475569;
          font-size: 0.92rem;
          font-weight: 500;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }
        .policy-nav-item i {
          font-size: 1rem;
          width: 20px;
          text-align: center;
          color: #94a3b8;
          transition: color 0.2s ease;
        }
        .policy-nav-item:hover {
          background-color: #f1f5f9;
          color: #0f172a;
          border-color: #e2e8f0;
        }
        .policy-nav-item:hover i {
          color: #136c39;
        }
        .policy-nav-item.active {
          background: linear-gradient(135deg, #136c39 0%, #0d522a 100%);
          color: #ffffff;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(19, 108, 57, 0.25);
        }
        .policy-nav-item.active i {
          color: #fed000;
        }

        /* Help Box in Sidebar */
        .policy-help-box {
          background: linear-gradient(135deg, #0b2545 0%, #133a6b 100%);
          border-radius: 18px;
          padding: 26px;
          color: #ffffff;
          box-shadow: 0 10px 25px rgba(11, 37, 69, 0.15);
        }
        .policy-help-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .policy-help-desc {
          font-size: 0.85rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 18px;
        }
        .policy-contact-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 10px 16px;
          background: #fed000;
          color: #0b2545;
          font-weight: 700;
          font-size: 0.875rem;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .policy-contact-btn:hover {
          background: #ffe34d;
          transform: translateY(-1px);
          color: #0b2545;
        }

        /* Policy Typography & Section Elements */
        .policy-meta-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 24px;
          margin-bottom: 32px;
          border-bottom: 1px solid #e2e8f0;
          gap: 12px;
        }
        .policy-meta-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 500;
        }
        .policy-meta-tag i {
          color: #136c39;
        }

        .policy-section {
          margin-bottom: 36px;
        }
        .policy-section:last-child {
          margin-bottom: 0;
        }
        .policy-section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          letter-spacing: -0.01em;
        }
        .policy-section-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 28px;
          height: 28px;
          background: #e8f7f0;
          color: #136c39;
          font-size: 0.8rem;
          font-weight: 700;
          border-radius: 8px;
          padding: 0 8px;
        }
        .policy-p {
          font-size: 0.95rem;
          line-height: 1.75;
          color: #334155;
          margin-bottom: 14px;
        }
        .policy-list {
          list-style: none;
          padding: 0;
          margin: 0 0 16px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .policy-list-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.93rem;
          line-height: 1.65;
          color: #334155;
        }
        .policy-list-item i {
          color: #136c39;
          margin-top: 5px;
          font-size: 0.75rem;
          flex-shrink: 0;
        }
        .policy-list-item.danger i {
          color: #ef4444;
        }

        /* Callout Cards */
        .policy-callout {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-left: 4px solid #16a34a;
          border-radius: 12px;
          padding: 18px 20px;
          margin: 20px 0;
        }
        .policy-callout.warning {
          background: #fffbeb;
          border-color: #fde68a;
          border-left-color: #f59e0b;
        }
        .policy-callout.info {
          background: #f0f9ff;
          border-color: #bae6fd;
          border-left-color: #0284c7;
        }
        .policy-callout-title {
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .policy-callout.warning .policy-callout-title {
          color: #92400e;
        }
        .policy-callout.info .policy-callout-title {
          color: #0369a1;
        }
        .policy-callout p {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #334155;
          margin: 0;
        }

        /* Grid Cards for Items/Categories */
        .policy-grid-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          margin: 16px 0;
        }
        .policy-card-item {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 0.88rem;
          font-weight: 500;
          color: #334155;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .policy-card-item i {
          color: #136c39;
        }

        /* Quick Contact Footnote Box */
        .policy-footer-note {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 24px;
          margin-top: 40px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
      `}</style>

      {/* Hero Banner with breadcrumbs */}
      <div className="policy-hero-banner">
        <div className="container">
          <div className="policy-hero-inner text-center">
            <div className="policy-hero-badge">
              <i className="fa-solid fa-scale-balanced"></i>
              {badge}
            </div>
            <h1 className="policy-hero-title">
              {title.split(' ')[0]} <span className="accent">{title.substring(title.indexOf(' ') + 1)}</span>
            </h1>
            <p className="policy-hero-desc">
              {subtitle}
            </p>
            <div className="policy-breadcrumb-nav">
              <Link href="/">
                <i className="fa-solid fa-house" style={{ marginRight: '6px' }}></i>
                Home
              </Link>
              <span className="sep">
                <i className="fa-solid fa-chevron-right"></i>
              </span>
              <span className="current">{title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="policy-container">
        <div className="container">
          <div className="row g-4">
            
            {/* Sidebar Navigation */}
            <div className="col-lg-4 col-md-12">
              <div className="policy-sidebar">
                <div className="policy-sidebar-card">
                  <h4 className="policy-sidebar-title">
                    <i className="fa-solid fa-book-bookmark"></i>
                    All Legal Policies
                  </h4>
                  <ul className="policy-sidebar-menu">
                    {POLICY_NAV_LINKS.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={`policy-nav-item ${isActive ? 'active' : ''}`}
                          >
                            <i className={`fa-solid ${item.icon}`}></i>
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Support Box */}
                <div className="policy-help-box">
                  <h4 className="policy-help-title">
                    <i className="fa-solid fa-headset" style={{ color: '#fed000' }}></i>
                    Need Help or Clarification?
                  </h4>
                  <p className="policy-help-desc">
                    Our team is here to assist you with order inquiries, component compatibility questions, or policy guidance.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a href="tel:+919042686793" className="policy-contact-btn">
                      <i className="fa-solid fa-phone"></i>
                      Call +91 90426 86793
                    </a>
                    <a
                      href="https://wa.me/919042686793?text=Hi,%20I%20have%20a%20question%20regarding%20Ocean%20Student%20Projects%20policies."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="policy-contact-btn"
                      style={{ background: '#25D366', color: '#ffffff' }}
                    >
                      <i className="fa-brands fa-whatsapp"></i>
                      WhatsApp Support
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Policy Content */}
            <div className="col-lg-8 col-md-12">
              <div className="policy-main-card">
                <div className="policy-meta-bar">
                  <div className="policy-meta-tag">
                    <i className="fa-solid fa-calendar-check"></i>
                    <span>Last Updated: {lastUpdated}</span>
                  </div>
                  <div className="policy-meta-tag">
                    <i className="fa-solid fa-building-columns"></i>
                    <span>Governing Jurisdiction: India</span>
                  </div>
                </div>

                {children}

                {/* Footer Note */}
                <div className="policy-footer-note">
                  <div>
                    <h5 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                      Ocean Student Projects
                    </h5>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                      Electronics • Robotics • Embedded Systems • STEM Education
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Link
                      href="/contact"
                      className="btn btn-sm btn-outline-secondary"
                      style={{ borderRadius: '8px', fontSize: '0.85rem', padding: '6px 14px' }}
                    >
                      Contact Support
                    </Link>
                    <button
                      onClick={() => window.print()}
                      className="btn btn-sm btn-light"
                      style={{ borderRadius: '8px', fontSize: '0.85rem', padding: '6px 14px', border: '1px solid #cbd5e1' }}
                    >
                      <i className="fa-solid fa-print me-1"></i> Print
                    </button>
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
