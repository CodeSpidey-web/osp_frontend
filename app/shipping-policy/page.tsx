"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import ShopHeader from "@/components/ShopHeader";
import Footer from "@/components/Footer";
import PolicyLayout from "@/components/policy/PolicyLayout";

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), { ssr: false });
const SideNavs = dynamic(() => import("@/components/SideNavs"), { ssr: false });
const Modals = dynamic(() => import("@/components/Modals"), { ssr: false });

const COURIER_PARTNERS = [
  { name: "ST Courier", type: "South India & Regional Express", icon: "fa-bolt-lightning" },
  { name: "Professional Couriers", type: "Pan-India Network", icon: "fa-route" },
  { name: "DTDC", type: "Express Air & Surface", icon: "fa-plane-departure" },
  { name: "Shree Maruti Courier", type: "National Express", icon: "fa-truck" },
  { name: "Shree Tirupathi Courier", type: "Commercial Logistics", icon: "fa-box" },
];

export default function ShippingPolicyPage() {
  return (
    <>
      <ShopHeader />
      <MobileMenu />
      <SideNavs />
      <main className="rbt-main-wrapper">
        <PolicyLayout
          title="Shipping Policy"
          subtitle="Everything you need to know about order processing times, courier partners, tracking, and delivery timelines."
          lastUpdated="February 2026"
          badge="Shipping & Delivery"
        >
          {/* Introduction */}
          <div className="policy-section">
            <p className="policy-p">
              At <strong>Ocean Student Projects</strong>, we take great pride in carefully inspecting, packaging, and dispatching all electronics components, microcontrollers, development boards, and project kits so that they reach your doorstep safely and swiftly.
            </p>
          </div>

          {/* Section 1: Order Processing */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">1</span>
              Order Processing &amp; Dispatch
            </h3>
            <div className="policy-callout info">
              <div className="policy-callout-title">
                <i className="fa-solid fa-clock"></i>
                Processing Timeline: 1 to 2 Business Days
              </div>
              <p>
                Orders are generally verified, packaged, and handed over to our shipping carriers within <strong>1–2 business days</strong> after payment confirmation.
              </p>
            </div>
            <p className="policy-p">
              Please note that order processing may occasionally take slightly longer during public holidays, Sundays, clearance sales, high-volume academic project seasons, or sudden supply chain delays.
            </p>
          </div>

          {/* Section 2: Shipping Partners */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">2</span>
              Our Trusted Courier Partners
            </h3>
            <p className="policy-p">
              We ship orders through reputable, insured logistics partners selected based on your pincode, serviceability, transit speed, and shipment weight:
            </p>
            <div className="row g-3 my-2">
              {COURIER_PARTNERS.map((c, i) => (
                <div className="col-sm-6 col-12" key={i}>
                  <div
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '14px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: '#e8f7f0',
                        color: '#136c39',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        flexShrink: 0
                      }}
                    >
                      <i className={`fa-solid ${c.icon}`}></i>
                    </div>
                    <div>
                      <h5 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', margin: '0 0 2px' }}>
                        {c.name}
                      </h5>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        {c.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="policy-p" style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '12px' }}>
              <em>The choice of courier is determined automatically by Ocean Student Projects to ensure the most reliable route for your location.</em>
            </p>
          </div>

          {/* Section 3: Delivery Timelines */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">3</span>
              Estimated Delivery Times
            </h3>
            <div className="policy-callout">
              <div className="policy-callout-title" style={{ color: '#136c39' }}>
                <i className="fa-solid fa-truck-ramp-box"></i>
                Estimated Transit: 2 to 7 Business Days
              </div>
              <p>
                Once dispatched, the typical delivery timeframe is <strong>2–7 business days</strong> depending on your destination city, state, and regional courier connectivity.
              </p>
            </div>
            <ul className="policy-list">
              <li className="policy-list-item">
                <i className="fa-solid fa-location-dot"></i>
                <span><strong>Chennai &amp; Tamil Nadu:</strong> Usually 1–3 business days after dispatch.</span>
              </li>
              <li className="policy-list-item">
                <i className="fa-solid fa-location-dot"></i>
                <span><strong>South India (Bangalore, Hyderabad, Kerala):</strong> Usually 2–4 business days.</span>
              </li>
              <li className="policy-list-item">
                <i className="fa-solid fa-location-dot"></i>
                <span><strong>Rest of India (Metros &amp; Tier 2/3 Cities):</strong> Usually 3–7 business days.</span>
              </li>
            </ul>
            <p className="policy-p" style={{ fontSize: '0.88rem', color: '#64748b' }}>
              <em>Note: Delivery timelines are estimates provided by courier companies. Unforeseen weather conditions, state border checks, strikes, or remote addresses may cause occasional delays.</em>
            </p>
          </div>

          {/* Section 4: Tracking */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">4</span>
              Tracking Your Consignment
            </h3>
            <p className="policy-p">
              Once your package is picked up and scanned by our courier partner, tracking information (courier name and AWB consignment number) will be shared with you via email, SMS, or WhatsApp on the contact details provided during checkout.
            </p>
            <p className="policy-p">
              You can also track your orders live by logging into your <Link href="/profile" style={{ color: '#136c39', fontWeight: '600', textDecoration: 'underline' }}>Account Profile</Link> on our website.
            </p>
          </div>

          {/* Section 5: Address Accuracy */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">5</span>
              Accurate Shipping Details &amp; Customer Responsibility
            </h3>
            <p className="policy-p">
              Customers are strictly responsible for providing complete and accurate shipping information:
            </p>
            <ul className="policy-list">
              <li className="policy-list-item"><i className="fa-solid fa-circle-check"></i><span>Recipient full legal name &amp; department/college (if applicable)</span></li>
              <li className="policy-list-item"><i className="fa-solid fa-circle-check"></i><span>Door/Flat number, building name, street address &amp; nearby landmark</span></li>
              <li className="policy-list-item"><i className="fa-solid fa-circle-check"></i><span>Correct 6-digit postal PIN code</span></li>
              <li className="policy-list-item"><i className="fa-solid fa-circle-check"></i><span>Working 10-digit mobile number for courier OTP/call verification</span></li>
            </ul>
            <div className="policy-callout warning">
              <div className="policy-callout-title">
                <i className="fa-solid fa-triangle-exclamation"></i>
                Failed Delivery Disclaimer
              </div>
              <p>
                Ocean Student Projects cannot be held responsible for transit delays, failed delivery attempts, or return-to-origin (RTO) charges caused by incorrect addresses, wrong pincodes, or unreachable phone numbers.
              </p>
            </div>
          </div>

          {/* Section 6: Damaged Packages */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">6</span>
              Damaged or Tampered Packages
            </h3>
            <p className="policy-p">
              If the outer courier parcel appears crushed, torn, wet, or visibly tampered with at the time of delivery:
            </p>
            <ul className="policy-list">
              <li className="policy-list-item"><i className="fa-solid fa-video"></i><span>Record a clear video and photos of the unopened parcel and shipping label before accepting or opening it.</span></li>
              <li className="policy-list-item"><i className="fa-solid fa-clock-rotate-left"></i><span>Report the issue to us within 24–48 hours of delivery along with photographic evidence.</span></li>
            </ul>
            <p className="policy-p">
              For complete replacement and support guidelines on damaged items, please refer to our{' '}
              <Link href="/return-and-refund-policy" style={{ color: '#136c39', fontWeight: '600', textDecoration: 'underline' }}>
                Return &amp; Refund Policy
              </Link>.
            </p>
          </div>

          {/* Section 7: Delivery Delays */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">7</span>
              Delivery Delays &amp; Carrier Assistance
            </h3>
            <p className="policy-p">
              Once an order has been handed over to the courier partner, delivery operations fall under the carrier&apos;s logistics network. While we cannot guarantee exact delivery hours, our support team actively follows up with carrier hubs to expedite any delayed consignments.
            </p>
          </div>
        </PolicyLayout>
      </main>
      <Modals />
      <Footer />
    </>
  );
}
