"use client";

import React from "react";
import dynamic from "next/dynamic";
import ShopHeader from "@/components/ShopHeader";
import Footer from "@/components/Footer";
import PolicyLayout from "@/components/policy/PolicyLayout";

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), { ssr: false });
const SideNavs = dynamic(() => import("@/components/SideNavs"), { ssr: false });
const Modals = dynamic(() => import("@/components/Modals"), { ssr: false });

export default function PrivacyPolicyPage() {
  return (
    <>
      <ShopHeader />
      <MobileMenu />
      <SideNavs />
      <main className="rbt-main-wrapper">
        <PolicyLayout
          title="Privacy Policy"
          subtitle="Learn how Ocean Student Projects collects, uses, protects, and handles your personal information when you visit or make a purchase."
          lastUpdated="February 2026"
          badge="Data Privacy & Security"
        >
          {/* Introduction */}
          <div className="policy-section">
            <p className="policy-p">
              At <strong>Ocean Student Projects</strong>, we value the trust you place in us when you visit our website and purchase our electronic components, kits, and development boards. This Privacy Policy outlines how your personal data is collected, utilized, stored, and protected in compliance with applicable laws of India.
            </p>
          </div>

          {/* Section 1 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">1</span>
              Information We Collect
            </h3>
            <p className="policy-p">
              When you place an order, create an account, or browse our website, we may collect the following personal and technical details:
            </p>
            <ul className="policy-list">
              <li className="policy-list-item">
                <i className="fa-solid fa-circle-check"></i>
                <span><strong>Personal Contact Details:</strong> Your full name, email address, and telephone/mobile number.</span>
              </li>
              <li className="policy-list-item">
                <i className="fa-solid fa-circle-check"></i>
                <span><strong>Delivery & Billing Information:</strong> Complete shipping address, billing address, postal code, and specific delivery instructions.</span>
              </li>
              <li className="policy-list-item">
                <i className="fa-solid fa-circle-check"></i>
                <span><strong>Order Details:</strong> Products purchased, quantities, order reference numbers, and transaction history.</span>
              </li>
              <li className="policy-list-item">
                <i className="fa-solid fa-circle-check"></i>
                <span><strong>Technical Information:</strong> IP address, browser type and version, operating system, device identifiers, and website navigation patterns to ensure site performance and security.</span>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">2</span>
              How We Use Your Information
            </h3>
            <p className="policy-p">
              We collect and process your information for legitimate business purposes, including:
            </p>
            <div className="policy-grid-cards">
              <div className="policy-card-item">
                <i className="fa-solid fa-box-open"></i>
                <span>Processing & dispatching orders</span>
              </div>
              <div className="policy-card-item">
                <i className="fa-solid fa-receipt"></i>
                <span>Processing payments & invoicing</span>
              </div>
              <div className="policy-card-item">
                <i className="fa-solid fa-headset"></i>
                <span>Providing responsive customer support</span>
              </div>
              <div className="policy-card-item">
                <i className="fa-solid fa-arrow-rotate-left"></i>
                <span>Handling returns, refunds & warranty</span>
              </div>
              <div className="policy-card-item">
                <i className="fa-solid fa-shield"></i>
                <span>Preventing fraud & misuse</span>
              </div>
              <div className="policy-card-item">
                <i className="fa-solid fa-bullhorn"></i>
                <span>Promotions (where opted-in)</span>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">3</span>
              Consent
            </h3>
            <p className="policy-p">
              By providing your information and placing an order with Ocean Student Projects, you consent to the collection and use of your data for the fulfillment of your order and standard customer service.
            </p>
            <p className="policy-p">
              Where consent is required for additional purposes (such as optional marketing emails or newsletters), we will request your explicit permission. You may withdraw your consent for promotional communications at any time by contacting our support team.
            </p>
          </div>

          {/* Section 4 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">4</span>
              Disclosure & Data Sharing
            </h3>
            <div className="policy-callout info">
              <div className="policy-callout-title">
                <i className="fa-solid fa-shield-halved"></i>
                We Never Sell Your Data
              </div>
              <p>
                We do not sell, rent, or trade your personal information to any third parties for advertising or commercial gains.
              </p>
            </div>
            <p className="policy-p">
              We may share necessary data strictly with trusted service partners required to operate our store and deliver your orders, including:
            </p>
            <ul className="policy-list">
              <li className="policy-list-item">
                <i className="fa-solid fa-circle-check"></i>
                <span><strong>Logistics & Courier Partners:</strong> To print shipping labels, deliver your parcels, and send tracking SMS/updates.</span>
              </li>
              <li className="policy-list-item">
                <i className="fa-solid fa-circle-check"></i>
                <span><strong>Payment Gateways:</strong> Secure RBI-authorized payment processors to complete financial transactions.</span>
              </li>
              <li className="policy-list-item">
                <i className="fa-solid fa-circle-check"></i>
                <span><strong>Legal & Compliance Authorities:</strong> When required under applicable laws, court orders, or governmental regulations to prevent fraud and protect rights.</span>
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">5</span>
              Payment & Security
            </h3>
            <p className="policy-p">
              All payment transactions are handled through encrypted, secure third-party payment gateways. <strong>Ocean Student Projects does NOT store sensitive payment credentials</strong> such as credit/debit card numbers, CVVs, PINs, OTPs, or net banking passwords on our servers.
            </p>
            <p className="policy-p">
              We employ standard technical and organizational security measures to protect personal information against unauthorized access, alteration, or disclosure. However, please note that no method of transmission over the Internet is 100% immune from security risks.
            </p>
          </div>

          {/* Section 6 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">6</span>
              Cookies & Tracking
            </h3>
            <p className="policy-p">
              Our website uses cookies and similar technologies to ensure seamless navigation, retain items in your shopping cart, remember user preferences, and analyze website traffic to optimize overall performance. You can manage or disable cookie settings directly through your browser controls.
            </p>
          </div>

          {/* Section 7 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">7</span>
              Third-Party Services
            </h3>
            <p className="policy-p">
              Our store interacts with third-party providers such as payment gateways, shipping aggregators, hosting servers, and analytics tools. These external services maintain their own privacy terms and policies. We encourage you to review their respective privacy statements when interacting with their platforms.
            </p>
          </div>

          {/* Section 8 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">8</span>
              Changes to This Privacy Policy
            </h3>
            <p className="policy-p">
              We reserve the right to modify or update this Privacy Policy at any time to reflect operational, legal, or regulatory changes. Any updates will be published directly on this page with a revised &quot;Last Updated&quot; date.
            </p>
          </div>

          {/* Questions & Contact */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge"><i className="fa-solid fa-envelope"></i></span>
              Questions & Contact Information
            </h3>
            <p className="policy-p">
              For any privacy-related inquiries, data requests, or concerns, please get in touch with our team:
            </p>
            <div className="policy-callout">
              <div className="policy-callout-title" style={{ color: '#136c39' }}>
                <i className="fa-solid fa-building"></i>
                Ocean Student Projects
              </div>
              <p style={{ marginTop: '8px' }}>
                <strong>Address:</strong> No. 12, Shop No. 7, Narasingapuram Street, (Jothi Lodge Building), Mount Road, Chennai – 600 002, Tamil Nadu, India.<br />
                <strong>Email:</strong> <a href="mailto:oceanstudentprojects@gmail.com" style={{ color: '#136c39', textDecoration: 'underline' }}>oceanstudentprojects@gmail.com</a><br />
                <strong>Phone:</strong> <a href="tel:+919042686793" style={{ color: '#136c39', textDecoration: 'underline' }}>+91 90426 86793</a> / <a href="tel:+917338975699" style={{ color: '#136c39', textDecoration: 'underline' }}>+91 73389 75699</a>
              </p>
            </div>
            <p className="policy-p" style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '10px' }}>
              All matters are governed and handled in accordance with the applicable laws of India.
            </p>
          </div>
        </PolicyLayout>
      </main>
      <Modals />
      <Footer />
    </>
  );
}
