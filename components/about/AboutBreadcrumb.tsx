import React from 'react';
import Link from 'next/link';

export default function AboutBreadcrumb() {
  return (
    <>
      <style>{`
        .about-hero-banner {
          position: relative;
          background: linear-gradient(135deg, #051f0f 0%, #0c331a 40%, #136c39 100%);
          overflow: hidden;
          padding: 80px 0 90px;
        }
        .about-hero-banner::before {
          content: '';
          position: absolute;
          top: -80px;
          right: 5%;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(254,208,0,0.15) 0%, rgba(254,208,0,0) 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .about-hero-banner::after {
          content: '';
          position: absolute;
          bottom: -120px;
          left: -60px;
          width: 340px;
          height: 340px;
          background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .about-hero-inner {
          position: relative;
          z-index: 2;
        }
        .about-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(254,208,0,0.12);
          border: 1px solid rgba(254,208,0,0.25);
          color: #fed000;
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .about-hero-badge i {
          font-size: 0.75rem;
        }
        .about-hero-title {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin-bottom: 16px;
        }
        .about-hero-title .accent {
          background: linear-gradient(90deg, #fed000 0%, #ffe34d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .about-hero-desc {
          font-size: 1.05rem;
          line-height: 1.75;
          color: rgba(255,255,255,0.78);
          max-width: 620px;
          margin: 0 auto 32px;
        }
        .about-breadcrumb-nav {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 22px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .about-breadcrumb-nav a {
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .about-breadcrumb-nav a:hover {
          color: #fed000;
        }
        .about-breadcrumb-nav .sep {
          color: rgba(254,208,0,0.6);
          font-size: 0.75rem;
        }
        .about-breadcrumb-nav .current {
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 600;
        }
        .about-hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 56px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }
        .about-hero-stat {
          text-align: center;
          padding: 20px 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .about-hero-stat:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(254,208,0,0.3);
          transform: translateY(-3px);
        }
        .about-hero-stat .num {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 800;
          background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .about-hero-stat .num .plus {
          color: #fed000;
          -webkit-text-fill-color: #fed000;
        }
        .about-hero-stat .label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
        }
        @media (max-width: 768px) {
          .about-hero-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
            margin-top: 40px;
          }
          .about-hero-banner {
            padding: 60px 0 70px;
          }
        }
      `}</style>

      <div className="about-hero-banner">
        <div className="container">
          <div className="about-hero-inner text-center">
            <div className="about-hero-badge">
              <i className="fa-solid fa-leaf"></i>
              About Ocean Student Projects
            </div>
            <h1 className="about-hero-title">
              Empowering <span className="accent">35+ Years</span> of<br />Innovation & Learning
            </h1>
            <p className="about-hero-desc">
              Chennai's most trusted destination for electronics, robotics, IoT, and engineering education.
              Powering the next generation of innovators with quality components and expert guidance.
            </p>
            <div className="about-breadcrumb-nav">
              <Link href="/">
                <i className="fa-solid fa-house" style={{ marginRight: '6px' }}></i>
                Home
              </Link>
              <span className="sep">
                <i className="fa-solid fa-chevron-right"></i>
              </span>
              <span className="current">About Us</span>
            </div>

            <div className="about-hero-stats">
              <div className="about-hero-stat reveal reveal-delay-1">
                <div className="num">35<span className="plus">+</span></div>
                <div className="label">Years Experience</div>
              </div>
              <div className="about-hero-stat reveal reveal-delay-2">
                <div className="num">50K<span className="plus">+</span></div>
                <div className="label">Happy Customers</div>
              </div>
              <div className="about-hero-stat reveal reveal-delay-3">
                <div className="num">10K<span className="plus">+</span></div>
                <div className="label">Products & Kits</div>
              </div>
              <div className="about-hero-stat reveal reveal-delay-4">
                <div className="num">100<span className="plus">+</span></div>
                <div className="label">Colleges Served</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
