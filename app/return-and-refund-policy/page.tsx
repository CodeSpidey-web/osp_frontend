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

const SENSITIVE_CATEGORIES = [
  "Arduino & Microcontroller Boards",
  "ESP32 / ESP8266 Wi-Fi & BLE Modules",
  "Sensors, Transducers & Modules",
  "Semiconductors, ICs & Discrete Components",
  "Motors, Steppers & Motor Drivers",
  "Lithium Batteries & Power Converters",
  "Embedded Development & Evaluation Boards",
  "Robotics Chassis & DIY Electronics Kits",
  "Cables, Connectors & Jumper Wires",
  "Display Panels & TFT Touchscreens"
];

export default function ReturnAndRefundPolicyPage() {
  return (
    <>
      <ShopHeader />
      <MobileMenu />
      <SideNavs />
      <main className="rbt-main-wrapper">
        <PolicyLayout
          title="Return & Refund Policy"
          subtitle="Clear, fair guidelines regarding returns, replacements, transit damages, and warranty terms for electronic components and DIY kits."
          lastUpdated="February 2026"
          badge="Returns & Replacements"
        >
          {/* Introduction */}
          <div className="policy-section">
            <p className="policy-p">
              At <strong>Ocean Student Projects</strong>, we take utmost care in testing, inspecting, packing, and dispatching all electronic components, development boards, sensors, modules, robotics products, and DIY project kits ordered through our platform.
            </p>
            <div className="policy-callout warning">
              <div className="policy-callout-title">
                <i className="fa-solid fa-microchip"></i>
                Nature of Technical &amp; Electronic Products
              </div>
              <p>
                Due to the sensitive electronic and electrical nature of our products (susceptible to voltage irregularities, electrostatic discharge, reverse polarity, and soldering heat), <strong>we generally do not accept returns or provide refunds once an order has been delivered</strong>, except in specific cases outlined in this policy or where required under applicable Indian consumer law.
              </p>
            </div>
          </div>

          {/* Section 1: No Change-of-Mind Returns */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">1</span>
              No Change-of-Mind Returns
            </h3>
            <p className="policy-p">
              We do not accept returns, replacements, or refunds for any of the following circumstances:
            </p>
            <ul className="policy-list">
              <li className="policy-list-item danger"><i className="fa-solid fa-circle-xmark"></i><span>Change of mind after placing or receiving an order</span></li>
              <li className="policy-list-item danger"><i className="fa-solid fa-circle-xmark"></i><span>Ordering the wrong component or incorrect model/variant/size</span></li>
              <li className="policy-list-item danger"><i className="fa-solid fa-circle-xmark"></i><span>Ordering excess or wrong quantities</span></li>
              <li className="policy-list-item danger"><i className="fa-solid fa-circle-xmark"></i><span>Compatibility issues with the customer&apos;s project, circuit, software, or operating system</span></li>
              <li className="policy-list-item danger"><i className="fa-solid fa-circle-xmark"></i><span>Customer&apos;s inability to operate, code, solder, or configure the product</span></li>
              <li className="policy-list-item danger"><i className="fa-solid fa-circle-xmark"></i><span>Products purchased for academic or commercial projects that are subsequently cancelled</span></li>
              <li className="policy-list-item danger"><i className="fa-solid fa-circle-xmark"></i><span>Minor cosmetic variations in silkscreen, PCB color, or component markings that do not affect functionality</span></li>
              <li className="policy-list-item danger"><i className="fa-solid fa-circle-xmark"></i><span>Damage occurring after delivery due to improper handling, reverse polarity, short circuits, or incorrect supply voltage</span></li>
            </ul>
            <div className="policy-callout info">
              <p>
                <strong>Tip for Students &amp; Makers:</strong> Please verify pinouts, voltage levels (3.3V vs 5V), interface protocols (I2C, SPI, UART), and product documentation carefully before placing an order.
              </p>
            </div>
          </div>

          {/* Section 2: Electronic Components & Modules */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">2</span>
              Electronic Components &amp; Modules
            </h3>
            <p className="policy-p">
              Electronic components and development modules are delicate hardware. We cannot accept returns simply because a user is unable to establish communication, configure drivers, program firmware, or integrate the board with their custom circuit.
            </p>
            <p className="policy-p">
              This policy applies to all hardware categories including:
            </p>
            <div className="policy-grid-cards">
              {SENSITIVE_CATEGORIES.map((cat, i) => (
                <div className="policy-card-item" key={i}>
                  <i className="fa-solid fa-microchip"></i>
                  <span>{cat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Damaged Products */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">3</span>
              Physically Damaged Products on Arrival
            </h3>
            <p className="policy-p">
              If an item is received physically broken or damaged during transit, please notify our customer support team <strong>within 48 hours of delivery</strong> with clear evidence:
            </p>
            <ul className="policy-list">
              <li className="policy-list-item"><i className="fa-solid fa-camera"></i><span>Photographs of the outer cardboard box and courier shipping label</span></li>
              <li className="policy-list-item"><i className="fa-solid fa-video"></i><span>Unboxing video showing the sealed package being opened</span></li>
              <li className="policy-list-item"><i className="fa-solid fa-magnifying-glass"></i><span>High-resolution close-up photos highlighting the physical damage</span></li>
            </ul>
            <p className="policy-p">
              Our technical team will review the claim promptly. Upon approval, we will arrange a <strong>free replacement</strong>, store credit, or refund.
            </p>
          </div>

          {/* Section 4: Wrong Product Received */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">4</span>
              Wrong Product Received
            </h3>
            <p className="policy-p">
              If you receive a product that is materially different from what was ordered (e.g. incorrect component model or sensor type), contact us within <strong>48 hours</strong> with:
            </p>
            <ul className="policy-list">
              <li className="policy-list-item"><i className="fa-solid fa-check"></i><span>Your Order ID and registered phone number</span></li>
              <li className="policy-list-item"><i className="fa-solid fa-check"></i><span>Clear photo of the incorrect item received along with the package label</span></li>
            </ul>
            <p className="policy-p">
              We will promptly dispatch the correct replacement at zero additional shipping cost or issue an immediate refund if out of stock.
            </p>
          </div>

          {/* Section 5: Defective Products & Warranty */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">5</span>
              Defective Products &amp; Warranty Exclusions
            </h3>
            <p className="policy-p">
              Certain products may be covered by manufacturer or seller warranties where explicitly indicated on the product page. Warranty claims do <strong>NOT</strong> cover failures resulting from:
            </p>
            <ul className="policy-list">
              <li className="policy-list-item danger"><i className="fa-solid fa-bolt"></i><span>Incorrect wiring or reverse polarity connection</span></li>
              <li className="policy-list-item danger"><i className="fa-solid fa-fire"></i><span>Excessive voltage, current surges, or short circuits</span></li>
              <li className="policy-list-item danger"><i className="fa-solid fa-droplet"></i><span>Liquid ingress, moisture exposure, or chemical corrosion</span></li>
              <li className="policy-list-item danger"><i className="fa-solid fa-screwdriver-wrench"></i><span>Improper soldering, burnt pads, or trace cuts</span></li>
              <li className="policy-list-item danger"><i className="fa-solid fa-triangle-exclamation"></i><span>Unauthorized modifications, component removal, or firmware bricking</span></li>
              <li className="policy-list-item danger"><i className="fa-solid fa-clock"></i><span>Normal wear and tear or improper storage</span></li>
            </ul>
          </div>

          {/* Section 6: Refunds */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">6</span>
              Refund Process
            </h3>
            <p className="policy-p">
              Where a refund is approved by Ocean Student Projects, it will be initiated back to your <strong>original payment method</strong> (UPI, Debit/Credit Card, Net Banking) within <strong>3–7 working days</strong>, subject to bank processing cycles.
            </p>
          </div>

          {/* Section 7: Order Cancellation */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">7</span>
              Order Cancellation
            </h3>
            <p className="policy-p">
              You may request order cancellation prior to the order being packed or dispatched from our hub. Once a consignment has been handed over to the courier partner, cancellation is no longer possible.
            </p>
          </div>

          {/* Section 8: Products Sold as Kits */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">8</span>
              Products Sold as Kits &amp; Combos
            </h3>
            <p className="policy-p">
              For DIY kits, robotics combos, and starter kits, please inspect the box contents upon arrival against the included packing checklist. If any component is missing, report it within <strong>48 hours</strong> with photographs of all contents received so we can dispatch the missing item immediately.
            </p>
          </div>

          {/* Section 9: Important Notice */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">9</span>
              Support &amp; Resolution Process
            </h3>
            <p className="policy-p">
              Ocean Student Projects reserves the right to inspect and verify reported issues before authorizing any return, replacement, or refund.
            </p>
            <p className="policy-p">
              To raise a replacement or refund query, please contact our support team via email or WhatsApp with your Order ID:
            </p>
            <div className="policy-callout">
              <div className="policy-callout-title" style={{ color: '#136c39' }}>
                <i className="fa-solid fa-headset"></i>
                Customer Support Assistance
              </div>
              <p style={{ marginTop: '8px' }}>
                <strong>Email:</strong> <a href="mailto:oceanstudentprojects@gmail.com" style={{ color: '#136c39', textDecoration: 'underline' }}>oceanstudentprojects@gmail.com</a><br />
                <strong>Phone &amp; WhatsApp:</strong> <a href="tel:+919042686793" style={{ color: '#136c39', textDecoration: 'underline' }}>+91 90426 86793</a><br />
                <strong>Support Hours:</strong> Monday – Saturday (10:00 AM – 7:00 PM IST)
              </p>
            </div>
          </div>
        </PolicyLayout>
      </main>
      <Modals />
      <Footer />
    </>
  );
}
