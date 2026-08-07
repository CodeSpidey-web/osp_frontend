"use client";
import React, { useEffect } from 'react';

const OFFER_ITEMS = [
  { icon: "fa-solid fa-microchip", title: "Development Boards", text: "Arduino, Raspberry Pi, ESP32, STM32 and more to power every idea you can imagine.", accent: "#136c39" },
  { icon: "fa-solid fa-satellite-dish", title: "Sensors & Modules", text: "A vast range of sensors, actuators and wireless modules for IoT and automation.", accent: "#0b2545" },
  { icon: "fa-solid fa-robot", title: "Robotics Kits", text: "Complete robotics kits for students and makers — from line followers to full bots.", accent: "#eb7f23" },
  { icon: "fa-solid fa-gears", title: "Electronic Components", text: "Resistors, ICs, motors, displays, connectors and everything your project needs.", accent: "#136c39" },
  { icon: "fa-solid fa-cube", title: "3D Printing Solutions", text: "Printers, filaments and accessories to turn digital designs into real objects.", accent: "#0b2545" },
  { icon: "fa-solid fa-lightbulb", title: "Project Support", text: "Expert guidance and engineering support at every stage of your project journey.", accent: "#eb7f23" },
];

const WHY_CHOOSE = [
  {
    icon: "fa-solid fa-award",
    title: "35+ Years of Experience",
    text: "Serving students, educators, engineers, and innovators with trusted products and reliable service for over three decades.",
    stat: "35+",
  },
  {
    icon: "fa-solid fa-gem",
    title: "Premium Quality Products",
    text: "We source and supply dependable products from trusted manufacturers to ensure consistent performance and long-term reliability.",
    stat: "100%",
  },
  {
    icon: "fa-solid fa-store",
    title: "One-Stop Technology Store",
    text: "Everything you need for robotics, electronics, IoT, embedded systems, drones, automation, and engineering projects — all under one roof.",
    stat: "10K+",
  },
];

const TIMELINE = [
  { year: "1989", icon: "fa-solid fa-seedling", title: "The Beginning", desc: "Founded with a vision to make quality electronics accessible to every student and innovator in Chennai." },
  { year: "2005", icon: "fa-solid fa-store", title: "Expanding Horizons", desc: "Became Chennai's trusted go-to destination for engineering project components and complete robotics kits." },
  { year: "2015", icon: "fa-solid fa-microchip", title: "Digital Revolution", desc: "Launched dedicated IoT, Arduino and embedded systems division to support India's growing maker movement." },
  { year: "Today", icon: "fa-solid fa-globe", title: "Digital First", desc: "Proudly serving 50,000+ customers across India via online store + offline experience centre." },
];

export default function AboutContent() {
  useEffect(() => {
    const handleReveal = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100) {
          el.classList.add("visible");
        }
      });
    };
    handleReveal();
    const t = setTimeout(handleReveal, 100);
    window.addEventListener("scroll", handleReveal);
    window.addEventListener("resize", handleReveal);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "150px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", handleReveal);
      window.removeEventListener("resize", handleReveal);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        /* ========== SECTION WRAPPERS ========== */
        .about-section {
          padding: 80px 0;
        }
        .about-section-gray {
          background: linear-gradient(180deg, #f8faf9 0%, #f1f5f3 100%);
        }
        @media (max-width: 768px) {
          .about-section { padding: 56px 0; }
        }

        /* ========== SECTION HEADERS ========== */
        .section-header {
          text-align: center;
          margin-bottom: 52px;
        }
        .section-header-left {
          text-align: left;
          margin-bottom: 36px;
        }
        .section-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #136c39;
          padding: 6px 16px;
          background: rgba(19,108,57,0.08);
          border-radius: 50px;
          margin-bottom: 14px;
        }
        .section-kicker i { font-size: 0.7rem; }
        .section-title {
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.015em;
          color: #0b2545;
          margin: 0 0 12px;
        }
        .section-title .highlight {
          color: #136c39;
        }
        .section-subtitle {
          font-size: 1rem;
          line-height: 1.75;
          color: #64748b;
          max-width: 620px;
          margin: 0 auto;
        }
        .section-header-left .section-subtitle {
          margin: 0;
        }

        /* ========== STORY SECTION ========== */
        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .story-text p {
          font-size: 1rem;
          line-height: 1.85;
          color: #52606d;
          margin: 0 0 18px;
        }
        .story-text p:last-child { margin-bottom: 0; }
        .story-highlight {
          display: flex;
          gap: 16px;
          padding: 20px 22px;
          background: linear-gradient(135deg, rgba(19,108,57,0.05), rgba(254,208,0,0.04));
          border-left: 4px solid #136c39;
          border-radius: 0 14px 14px 0;
          margin-top: 24px;
        }
        .story-highlight .hi-icon {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 12px;
          background: #136c39;
          color: #fed000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .story-highlight p {
          margin: 0 !important;
          font-size: 0.95rem !important;
          font-weight: 500;
          color: #0b2545;
          line-height: 1.6;
        }
        .story-visual {
          position: relative;
        }
        .story-visual-main {
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(11,37,69,0.18);
        }
        .story-visual-main-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 14px;
          padding: 30px;
        }
        .svc-tile {
          border-radius: 14px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 10px;
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
        }
        .svc-tile:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-2px);
        }
        .svc-tile i {
          font-size: 1.6rem;
          color: #fed000;
          margin-bottom: 6px;
        }
        .svc-tile span {
          font-size: 0.65rem;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.03em;
        }
        .svc-tile:nth-child(5) {
          grid-column: span 2;
          grid-row: span 2;
          background: linear-gradient(135deg, rgba(254,208,0,0.18), rgba(255,255,255,0.04));
          border-color: rgba(254,208,0,0.3);
        }
        .svc-tile:nth-child(5) i {
          font-size: 3rem;
          color: #ffffff;
          margin-bottom: 10px;
        }
        .svc-tile:nth-child(5) span {
          font-size: 0.85rem;
          color: #ffffff;
          font-weight: 700;
        }
        .story-badge-float {
          position: absolute;
          bottom: -20px;
          left: -20px;
          background: #ffffff;
          padding: 16px 22px;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 14px;
          z-index: 2;
        }
        .story-badge-float .icon-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #136c39, #0c331a);
          color: #fed000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .story-badge-float .num {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0b2545;
          line-height: 1;
        }
        .story-badge-float .txt {
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        @media (max-width: 991px) {
          .story-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .story-badge-float {
            left: 20px;
          }
        }

        /* ========== VALUES / COMMITMENT ========== */
        .commit-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .commit-card {
          position: relative;
          padding: 36px 28px;
          border-radius: 18px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        .commit-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #136c39, #fed000);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .commit-card:hover {
          transform: translateY(-6px);
          border-color: rgba(19,108,57,0.2);
          box-shadow: 0 20px 40px rgba(11,37,69,0.08);
        }
        .commit-card:hover::before {
          transform: scaleX(1);
        }
        .commit-icon {
          width: 58px;
          height: 58px;
          border-radius: 16px;
          background: rgba(19,108,57,0.1);
          color: #136c39;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-bottom: 22px;
          transition: all 0.3s ease;
        }
        .commit-card:hover .commit-icon {
          background: #136c39;
          color: #fed000;
          transform: rotate(-4deg) scale(1.05);
        }
        .commit-card h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0b2545;
          margin: 0 0 10px;
        }
        .commit-card p {
          font-size: 0.92rem;
          line-height: 1.75;
          color: #64748b;
          margin: 0;
        }
        @media (max-width: 991px) {
          .commit-grid { grid-template-columns: 1fr; }
        }

        /* ========== FOUNDER ========== */
        .founder-wrapper {
          display: grid;
          grid-template-columns: 42% 1fr;
          gap: 56px;
          align-items: center;
        }
        .founder-card {
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(11,37,69,0.1);
          background: #ffffff;
        }
        .founder-head {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          min-height: 320px;
          background: #0b2545;
        }
        .founder-head::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(11,37,69,0.08) 0%,
            rgba(11,37,69,0.12) 45%,
            rgba(11,37,69,0.65) 72%,
            rgba(11,37,69,0.92) 100%);
          z-index: 1;
        }
        .founder-head-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 22%;
          display: block;
          z-index: 0;
        }
        .founder-head-corner {
          position: absolute;
          top: 18px;
          left: 18px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 14px;
          background: rgba(11,37,69,0.55);
          border: 1px solid rgba(254,208,0,0.4);
          color: #fed000;
          border-radius: 50px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .founder-head-corner i { font-size: 0.7rem; }
        .founder-head-bottom {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 28px 28px 26px;
          text-align: center;
          z-index: 2;
        }
        .founder-name {
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.005em;
          line-height: 1.25;
          background: linear-gradient(90deg, #ffffff 0%, #fff4b8 50%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 8px;
        }
        .founder-role {
          display: inline-block;
          padding: 5px 13px;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #0b2545;
          background: linear-gradient(90deg, #fed000 0%, #ffe34d 100%);
          border-radius: 50px;
          margin: 0;
        }
        .founder-quote {
          padding: 30px 32px 34px;
          margin: 0;
          font-size: 0.98rem;
          line-height: 1.85;
          color: #475569;
          font-style: italic;
          border-top: 4px solid #fed000;
          background: #ffffff;
          text-align: center;
          position: relative;
        }
        .founder-quote::before {
          content: '\\201C';
          font-size: 3.5rem;
          line-height: 1;
          color: rgba(19,108,57,0.15);
          position: absolute;
          top: 12px;
          left: 20px;
          font-family: Georgia, serif;
        }
        .founder-text h3 {
          font-size: clamp(1.5rem, 2.5vw, 1.85rem);
          font-weight: 800;
          color: #0b2545;
          line-height: 1.25;
          letter-spacing: -0.01em;
          margin: 0 0 18px;
        }
        .founder-text h3 em {
          background: linear-gradient(90deg, #136c39, #0c331a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-style: normal;
        }
        .founder-text > p {
          font-size: 1rem;
          line-height: 1.85;
          color: #52606d;
          margin: 0 0 16px;
        }
        .founder-values {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
        }
        .fv-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: #ffffff;
          border: 1px solid rgba(19,108,57,0.15);
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #0b2545;
          transition: all 0.2s ease;
        }
        .fv-pill:hover {
          border-color: #136c39;
          background: rgba(19,108,57,0.04);
          transform: translateY(-1px);
        }
        .fv-pill i {
          color: #136c39;
          font-size: 0.8rem;
        }
        @media (max-width: 991px) {
          .founder-wrapper {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }

        /* ========== MISSION & VISION ========== */
        .mv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }
        .mv-card {
          position: relative;
          padding: 48px 40px;
          border-radius: 22px;
          overflow: hidden;
          color: #ffffff;
          transition: all 0.4s ease;
        }
        .mv-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(11,37,69,0.18);
        }
        .mv-card.mission {
          background: linear-gradient(135deg, #136c39 0%, #0c331a 100%);
        }
        .mv-card.vision {
          background: linear-gradient(135deg, #0b2545 0%, #132744 100%);
        }
        .mv-card::before {
          content: '';
          position: absolute;
          top: -60px;
          right: -60px;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(254,208,0,0.18), transparent 65%);
        }
        .mv-card::after {
          content: '';
          position: absolute;
          bottom: -80px;
          left: -40px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.05), transparent 65%);
        }
        .mv-icon {
          width: 68px;
          height: 68px;
          border-radius: 18px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          color: #fed000;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
          backdrop-filter: blur(4px);
        }
        .mv-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fed000;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
        }
        .mv-title {
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          margin: 0 0 10px;
          position: relative;
          z-index: 1;
          background: linear-gradient(135deg, #ffffff 0%, #fed000 50%, #ffe34d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 1px 0 rgba(0,0,0,0.04);
        }
        .mv-tagline {
          font-size: 0.95rem;
          color: #ffffff;
          margin-bottom: 18px;
          position: relative;
          z-index: 1;
          font-weight: 600;
          opacity: 0.92;
        }
        .mv-desc {
          font-size: 0.96rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.85);
          margin: 0;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 768px) {
          .mv-grid { grid-template-columns: 1fr; }
          .mv-card { padding: 36px 28px; }
        }

        /* ========== TIMELINE ========== */
        .timeline-wrapper {
          position: relative;
          padding: 30px 0 10px;
          max-width: 1040px;
          margin: 0 auto;
        }
        .tl-item {
          display: flex;
          align-items: flex-start;
          gap: 28px;
          margin-bottom: 40px;
          position: relative;
        }
        .tl-item:last-child { margin-bottom: 0; }
        .tl-left {
          width: 180px;
          min-width: 180px;
          padding-top: 6px;
          position: relative;
        }
        .tl-year-box {
          background: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 14px;
          padding: 18px 14px;
          text-align: center;
          position: relative;
          transition: all 0.3s ease;
        }
        .tl-item:hover .tl-year-box {
          border-color: rgba(19,108,57,0.3);
          box-shadow: 0 10px 24px rgba(11,37,69,0.07);
          transform: translateY(-2px);
        }
        .tl-year-box::after {
          content: '';
          position: absolute;
          right: -15px;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #136c39;
          border: 3px solid #fed000;
          box-shadow: 0 0 0 4px #f0f5f2, 0 4px 10px rgba(19,108,57,0.2);
          z-index: 3;
        }
        .tl-year-num {
          font-size: 1.65rem;
          font-weight: 800;
          line-height: 1;
          background: linear-gradient(135deg, #136c39, #0b2545);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 5px;
          letter-spacing: -0.02em;
        }
        .tl-step {
          display: inline-block;
          padding: 3px 10px;
          background: linear-gradient(135deg, rgba(254,208,0,0.2), rgba(254,208,0,0.05));
          color: #a17a00;
          border: 1px solid rgba(254,208,0,0.35);
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .tl-spine {
          position: absolute;
          left: 196px;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, rgba(19,108,57,0.15) 0%, #136c39 12%, #136c39 88%, rgba(254,208,0,0.35) 100%);
          border-radius: 3px;
        }
        .tl-spine::before,
        .tl-spine::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 11px;
          height: 11px;
          border-radius: 50%;
        }
        .tl-spine::before {
          top: 0;
          background: #136c39;
          box-shadow: 0 0 0 4px rgba(19,108,57,0.1);
        }
        .tl-spine::after {
          bottom: 0;
          background: #fed000;
          box-shadow: 0 0 0 4px rgba(254,208,0,0.2);
        }
        .tl-right {
          flex: 1;
          min-width: 0;
        }
        .tl-card {
          position: relative;
          padding: 22px 26px 22px 26px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        .tl-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #136c39, #fed000);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .tl-item:hover .tl-card {
          border-color: rgba(19,108,57,0.25);
          box-shadow: 0 16px 34px rgba(11,37,69,0.08);
          transform: translateY(-3px);
        }
        .tl-item:hover .tl-card::before {
          transform: scaleX(1);
        }
        .tl-card-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 10px;
        }
        .tl-icon {
          width: 46px;
          height: 46px;
          min-width: 46px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(19,108,57,0.12), rgba(19,108,57,0.04));
          color: #136c39;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.3s ease;
        }
        .tl-item:hover .tl-icon {
          background: linear-gradient(135deg, #136c39, #0c331a);
          color: #fed000;
          transform: rotate(-5deg) scale(1.08);
        }
        .tl-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0b2545;
          margin: 0;
          line-height: 1.35;
          letter-spacing: -0.005em;
        }
        .tl-desc {
          font-size: 0.93rem;
          line-height: 1.8;
          color: #52606d;
          margin: 0 0 0 60px;
        }
        .tl-end {
          margin-top: 24px;
          margin-left: 208px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          background: linear-gradient(135deg, rgba(19,108,57,0.08), rgba(254,208,0,0.1));
          border: 1px solid rgba(19,108,57,0.18);
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #136c39;
          letter-spacing: 0.04em;
        }
        .tl-end i { color: #a17a00; }
        @media (max-width: 768px) {
          .timeline-wrapper { padding: 10px 0 10px 0; }
          .tl-left { display: none; }
          .tl-spine {
            left: 18px;
          }
          .tl-item {
            gap: 0;
            margin-bottom: 28px;
          }
          .tl-right {
            margin-left: 52px;
            position: relative;
          }
          .tl-right::before {
            content: '';
            position: absolute;
            left: -42px;
            top: 18px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #136c39;
            border: 3px solid #fed000;
            box-shadow: 0 0 0 4px #ffffff, 0 4px 10px rgba(19,108,57,0.25);
            z-index: 3;
          }
          .tl-card { padding: 18px 20px; }
          .tl-desc { margin-left: 0; margin-top: 8px; }
          .tl-card-head { gap: 12px; }
          .tl-icon {
            width: 42px;
            height: 42px;
            min-width: 42px;
            border-radius: 12px;
            font-size: 16px;
          }
          .tl-year-inline {
            display: inline-block;
            padding: 3px 10px;
            background: linear-gradient(135deg, #136c39, #0c331a);
            color: #fed000;
            font-weight: 700;
            font-size: 0.75rem;
            border-radius: 50px;
            letter-spacing: 0.05em;
            margin-left: auto;
          }
          .tl-end {
            margin-left: 52px;
            margin-top: 10px;
            font-size: 0.8rem;
            padding: 10px 16px;
          }
        }
        @media (min-width: 769px) {
          .tl-year-inline { display: none; }
        }

        /* ========== OFFER GRID ========== */
        .offer-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .offer-card {
          padding: 34px 28px;
          border-radius: 18px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .offer-card::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 90px;
          height: 90px;
          background: radial-gradient(circle at top right, var(--accent-glow, rgba(19,108,57,0.06)), transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .offer-card:hover {
          transform: translateY(-6px);
          border-color: rgba(19,108,57,0.2);
          box-shadow: 0 22px 40px rgba(11,37,69,0.08);
        }
        .offer-card:hover::after { opacity: 1; }
        .offer-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin-bottom: 20px;
          transition: all 0.35s ease;
        }
        .offer-card:hover .offer-icon {
          transform: scale(1.1) rotate(-5deg);
        }
        .offer-card h4 {
          font-size: 1.08rem;
          font-weight: 700;
          color: #0b2545;
          margin: 0 0 10px;
          position: relative;
          z-index: 1;
        }
        .offer-card p {
          font-size: 0.9rem;
          line-height: 1.75;
          color: #64748b;
          margin: 0;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 991px) {
          .offer-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 576px) {
          .offer-grid { grid-template-columns: 1fr; }
        }

        /* ========== WHY CHOOSE ========== */
        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .why-card {
          border-radius: 20px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        .why-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 50px -10px rgba(11,37,69,0.12);
          border-color: transparent;
        }
        .why-top {
          padding: 32px 28px 0;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }
        .why-icon-wrap {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .why-icon {
          width: 58px;
          height: 58px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(19,108,57,0.12), rgba(19,108,57,0.04));
          color: #136c39;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          transition: all 0.3s ease;
        }
        .why-card:hover .why-icon {
          background: linear-gradient(135deg, #136c39, #0c331a);
          color: #fed000;
          transform: scale(1.05);
        }
        .why-stat {
          font-size: 2.4rem;
          font-weight: 800;
          line-height: 1;
          background: linear-gradient(135deg, #136c39, #0b2545);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .why-body {
          padding: 10px 28px 30px;
        }
        .why-body h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0b2545;
          margin: 0 0 10px;
        }
        .why-body p {
          font-size: 0.92rem;
          line-height: 1.8;
          color: #64748b;
          margin: 0;
        }
        .why-bottom-bar {
          height: 5px;
          background: linear-gradient(90deg, #136c39 0%, #fed000 100%);
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .why-card:hover .why-bottom-bar {
          transform: scaleX(1);
        }
        @media (max-width: 991px) {
          .why-grid { grid-template-columns: 1fr; }
        }

        /* ========== CTA ========== */
        .cta-wrap {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          background: linear-gradient(135deg, #0b2545 0%, #136c39 55%, #1a8c4e 100%);
          padding: 68px 60px;
          text-align: center;
          color: #ffffff;
        }
        .cta-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 12% 18%, rgba(254,208,0,0.18), transparent 45%),
            radial-gradient(circle at 88% 82%, rgba(255,255,255,0.08), transparent 45%);
          pointer-events: none;
        }
        .cta-inner { position: relative; z-index: 1; }
        .cta-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 18px;
          background: rgba(254,208,0,0.15);
          border: 1px solid rgba(254,208,0,0.3);
          color: #fed000;
          border-radius: 50px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .cta-title {
          font-size: clamp(1.75rem, 3vw, 2.4rem);
          font-weight: 800;
          letter-spacing: -0.015em;
          line-height: 1.2;
          margin: 0 0 14px;
          background: linear-gradient(90deg, #ffffff 0%, #fff7cc 55%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cta-title .gold {
          background: linear-gradient(90deg, #fed000 0%, #ffe34d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cta-desc {
          font-size: 1.02rem;
          color: rgba(255,255,255,0.88);
          max-width: 640px;
          margin: 0 auto 32px;
          line-height: 1.8;
        }
        .cta-btns {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 36px;
        }
        .btn-primary-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 30px;
          background: linear-gradient(90deg, #fed000, #ffe34d);
          color: #0b2545;
          font-weight: 700;
          border-radius: 50px;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          border: none;
          box-shadow: 0 10px 28px rgba(254,208,0,0.25);
        }
        .btn-primary-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 34px rgba(254,208,0,0.35);
          color: #0b2545;
        }
        .btn-outline-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: transparent;
          color: #ffffff;
          font-weight: 600;
          border-radius: 50px;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          border: 1.5px solid rgba(255,255,255,0.5);
        }
        .btn-outline-cta:hover {
          border-color: #fed000;
          color: #fed000;
          background: rgba(254,208,0,0.06);
          transform: translateY(-2px);
        }
        .cta-contact-row {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 32px;
          padding-top: 28px;
          border-top: 1px solid rgba(255,255,255,0.12);
        }
        .cta-contact-row a {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.85);
          font-size: 0.92rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .cta-contact-row a:hover {
          color: #fed000;
          transform: translateY(-1px);
        }
        .cta-contact-row a i {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(254,208,0,0.12);
          border: 1px solid rgba(254,208,0,0.25);
          color: #fed000;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
        }
        @media (max-width: 768px) {
          .cta-wrap { padding: 44px 24px; }
          .cta-contact-row { gap: 18px; }
        }
      `}</style>

      {/* ============================ STORY ============================ */}
      <section className="about-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-text reveal">
              <span className="section-kicker">
                <i className="fa-solid fa-book-open"></i>
                Our Story
              </span>
              <h2 className="section-title section-header-left" style={{marginBottom: '20px'}}>
                A legacy of <span className="highlight">empowering innovators</span> since 1989
              </h2>
              <p>
                For more than <strong style={{color: '#0b2545'}}>35 years</strong>, Ocean Student Projects has been a trusted name in
                electronics, robotics, embedded systems, and engineering education. Established
                with a simple yet powerful vision — to support students and innovators — we have grown
                into one of Chennai&rsquo;s leading destinations for quality electronic components,
                development boards, robotics kits, IoT solutions, and educational technologies.
              </p>
              <p>
                From students building their very first Arduino circuit to professional engineers
                developing advanced automation systems, we proudly serve <strong style={{color: '#0b2545'}}>learners, educators,
                institutions, startups, hobbyists, and professionals</strong> across India with
                products they can rely on.
              </p>
              <div className="story-highlight">
                <div className="story-highlight .hi-icon">
                  <i className="fa-solid fa-bullseye"></i>
                </div>
                <p>
                  <strong>Our promise:</strong> Every product we ship, every answer we give,
                  and every project we help you build — backed by 35+ years of engineering expertise.
                </p>
              </div>
            </div>

            <div className="story-visual reveal reveal-delay-2">
              <div className="story-visual-main" style={{ background: 'none' }}>
                <img
                  src="/assets/images/about/osp_shop.png"
                  alt="Ocean Student Projects Shop Front"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
              <div className="story-badge-float">
                <div className="icon-circle"><i className="fa-solid fa-medal"></i></div>
                <div>
                  <div className="num">35+</div>
                  <div className="txt">Years of Trust</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ COMMITMENT / VALUES ============================ */}
      <section className="about-section about-section-gray">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-kicker">
              <i className="fa-solid fa-handshake"></i>
              Our Commitment
            </span>
            <h2 className="section-title">
              Committed to helping every <span className="highlight">customer build</span> with confidence
            </h2>
            <p className="section-subtitle">
              Our commitment goes beyond supplying products — we provide reliable technology
              solutions, expert guidance, and exceptional customer support at every step.
            </p>
          </div>

          <div className="commit-grid">
            <div className="commit-card reveal reveal-delay-1">
              <div className="commit-icon"><i className="fa-regular fa-circle-check"></i></div>
              <h4>Reliable Technology Solutions</h4>
              <p>Dependable components and solutions sourced from trusted manufacturers — rigorously checked so your project works, every single time.</p>
            </div>
            <div className="commit-card reveal reveal-delay-2">
              <div className="commit-icon"><i className="fa-regular fa-user-graduate"></i></div>
              <h4>Expert Guidance</h4>
              <p>Knowledgeable technical support to help you choose the right components, understand specifications, and build with total confidence.</p>
            </div>
            <div className="commit-card reveal reveal-delay-3">
              <div className="commit-icon"><i className="fa-regular fa-headset"></i></div>
              <h4>Exceptional Customer Support</h4>
              <p>Friendly, patient assistance for students, hobbyists, educators and professionals — before, during and long after your purchase.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ FOUNDER ============================ */}
      <section className="about-section">
        <div className="container">
          <div className="founder-wrapper">
            <div className="reveal">
              <div className="founder-card">
                <div className="founder-head">
                  <img
                    className="founder-head-img"
                    src="/osp_founder.png"
                    alt="Al Haj. Late. Athaur Rahaman — Founder of Ocean Student Projects"
                    loading="eager"
                    draggable={false}
                  />
                  <div className="founder-head-corner">
                    <i className="fa-solid fa-torch"></i>
                    Our Founder
                  </div>
                  <div className="founder-head-bottom">
                    <h4 className="founder-name">Al Haj. Late. Athaur Rahaman</h4>
                    <p className="founder-role">Founder &amp; Visionary</p>
                  </div>
                </div>
                <p className="founder-quote">
                  His vision was to make quality electronics, engineering resources, and project
                  solutions accessible to every student and innovator — regardless of background.
                </p>
              </div>
            </div>

            <div className="founder-text reveal reveal-delay-2">
              <span className="section-kicker">
                <i className="fa-solid fa-torch"></i>
                Honoring Our Founder
              </span>
              <h3>
                A <em>vision that continues</em> to inspire generations
              </h3>
              <p>
                Ocean Student Projects was founded by <strong>Al Haj. Late. Athaur Rahaman</strong>,
                whose vision was to make quality electronics, engineering resources, and project
                solutions accessible to students and innovators from all walks of life.
              </p>
              <p>
                His dedication to education, technology, and humble customer service laid the
                foundation for a company that has proudly served the community for more than
                35 years. His values live on in everything we do.
              </p>
              <p style={{marginBottom: 0}}>
                Today, we proudly carry forward his legacy by empowering the next generation of
                engineers, creators, and innovators — one project at a time.
              </p>
              <div className="founder-values">
                <span className="fv-pill"><i className="fa-solid fa-shield-halved"></i> Integrity</span>
                <span className="fv-pill"><i className="fa-solid fa-star"></i> Excellence</span>
                <span className="fv-pill"><i className="fa-solid fa-heart"></i> Commitment</span>
                <span className="fv-pill"><i className="fa-solid fa-lightbulb"></i> Innovation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ MISSION & VISION ============================ */}
      <section className="about-section about-section-gray">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-kicker">
              <i className="fa-solid fa-compass"></i>
              Mission & Vision
            </span>
            <h2 className="section-title">
              Guided by purpose. <span className="highlight">Driven by passion.</span>
            </h2>
            <p className="section-subtitle">
              Two clear statements that shape every decision, every product and every conversation at Ocean Student Projects.
            </p>
          </div>

          <div className="mv-grid">
            <div className="mv-card mission reveal reveal-delay-1">
              <div className="mv-icon"><i className="fa-solid fa-rocket"></i></div>
              <div className="mv-label">Our Mission</div>
              <h3 className="mv-title">Building the future through innovation</h3>
              <p className="mv-tagline">Empowering creators with accessible technology</p>
              <p className="mv-desc">
                Our mission is to empower students, educators, engineers, makers, and businesses by
                providing high-quality electronics, robotics, IoT, embedded systems, and educational
                products that encourage creativity, innovation, and practical hands-on learning.
                We strive to make advanced technology accessible to everyone through reliable products,
                expert support, and affordable solutions.
              </p>
            </div>
            <div className="mv-card vision reveal reveal-delay-2">
              <div className="mv-icon"><i className="fa-solid fa-eye"></i></div>
              <div className="mv-label">Our Vision</div>
              <h3 className="mv-title">Inspiring tomorrow's innovators</h3>
              <p className="mv-tagline">India's most trusted STEM technology partner</p>
              <p className="mv-desc">
                Our vision is to become India&rsquo;s most trusted technology partner for robotics,
                electronics, embedded systems, and STEM education by continuously delivering innovative
                products, exceptional customer experiences, and industry-leading technical solutions.
                We aspire to inspire the next generation of engineers and innovators who will shape
                the future through technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ JOURNEY TIMELINE ============================ */}
      <section className="about-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-kicker">
              <i className="fa-solid fa-timeline"></i>
              Our Journey
            </span>
            <h2 className="section-title">
              Milestones across <span className="highlight">35+ years</span>
            </h2>
            <p className="section-subtitle">
              From a small shop to Chennai's most trusted technology destination — here are the moments that define us.
            </p>
          </div>

          <div className="timeline-wrapper">
            <div className="tl-spine"></div>
            {TIMELINE.map((t, i) => (
              <div key={t.year + '-' + i} className="tl-item reveal" style={{transitionDelay: `${i * 0.12}s`}}>
                <div className="tl-left">
                  <div className="tl-year-box">
                    <div className="tl-year-num">{t.year}</div>
                    <span className="tl-step">Step {i + 1}</span>
                  </div>
                </div>
                <div className="tl-right">
                  <div className="tl-card">
                    <div className="tl-card-head">
                      <div className="tl-icon"><i className={t.icon}></i></div>
                      <h4 className="tl-title">{t.title}</h4>
                      <span className="tl-year-inline">{t.year}</span>
                    </div>
                    <p className="tl-desc">{t.desc}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="tl-end reveal">
              <i className="fa-solid fa-infinity"></i>
              The Journey Continues…
            </div>
          </div>
        </div>
      </section>

      {/* ============================ WHAT WE OFFER ============================ */}
      <section className="about-section about-section-gray">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-kicker">
              <i className="fa-solid fa-boxes-stacked"></i>
              What We Offer
            </span>
            <h2 className="section-title">
              Everything you need to <span className="highlight">build, learn &amp; innovate</span>
            </h2>
            <p className="section-subtitle">
              Whether you're a student, hobbyist, educator, startup, or industry professional —
              a comprehensive range of products and solutions for every stage of innovation.
            </p>
          </div>

          <div className="offer-grid">
            {OFFER_ITEMS.map((item, i) => (
              <div key={item.title} className="offer-card reveal" style={{
                transitionDelay: `${(i % 3) * 0.08}s`,
                '--accent-glow': `rgba(${item.accent === '#136c39' ? '19,108,57' : item.accent === '#0b2545' ? '11,37,69' : '235,127,35'},0.12)`,
              } as React.CSSProperties}>
                <div className="offer-icon" style={{
                  background: `linear-gradient(135deg, ${item.accent}15, ${item.accent}08)`,
                  color: item.accent,
                }}>
                  <i className={item.icon}></i>
                </div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ WHY CHOOSE US ============================ */}
      <section className="about-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-kicker">
              <i className="fa-solid fa-circle-question"></i>
              Why Choose Us
            </span>
            <h2 className="section-title">
              Trusted by <span className="highlight">thousands</span> since day one
            </h2>
            <p className="section-subtitle">
              The reasons students, educators and professionals keep coming back to Ocean Student Projects.
            </p>
          </div>

          <div className="why-grid">
            {WHY_CHOOSE.map((item, i) => (
              <div key={item.title} className="why-card reveal" style={{transitionDelay: `${i * 0.1}s`}}>
                <div className="why-top">
                  <div className="why-icon-wrap">
                    <div className="why-icon"><i className={item.icon}></i></div>
                  </div>
                  <div className="why-stat">{item.stat}</div>
                </div>
                <div className="why-body">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
                <div className="why-bottom-bar"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ CTA ============================ */}
      <section className="about-section" style={{paddingTop: '20px'}}>
        <div className="container">
          <div className="cta-wrap reveal">
            <div className="cta-inner">
              <span className="cta-kicker">
                <i className="fa-solid fa-bolt"></i>
                Let's Build Something Great
              </span>
              <h2 className="cta-title">
                Ready to build your <span className="gold">next big idea?</span>
              </h2>
              <p className="cta-desc">
                From a simple hobby circuit to a full final-year engineering project — Ocean
                Student Projects has the products, the parts, and the people to help you make it happen.
              </p>
              <div className="cta-btns">
                <a className="btn-primary-cta" href="/shop">
                  Shop Now <i className="fa-solid fa-arrow-right"></i>
                </a>
                <a className="btn-outline-cta" href="/contact">
                  Get Project Help <i className="fa-regular fa-comments"></i>
                </a>
              </div>
              <div className="cta-contact-row">
                <a href="tel:+917338975699">
                  <i className="fa-solid fa-phone"></i>
                  +91-7338975699
                </a>
                <a href="mailto:oceanstudentprojects@gmail.com">
                  <i className="fa-regular fa-envelope"></i>
                  oceanstudentprojects@gmail.com
                </a>
                <a href="/contact">
                  <i className="fa-solid fa-location-dot"></i>
                  Chennai, Tamil Nadu
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
