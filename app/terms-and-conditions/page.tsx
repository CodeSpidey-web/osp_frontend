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

export default function TermsAndConditionsPage() {
  return (
    <>
      <ShopHeader />
      <MobileMenu />
      <SideNavs />
      <main className="rbt-main-wrapper">
        <PolicyLayout
          title="Terms & Conditions"
          subtitle="Please read these terms and conditions carefully before using our website or purchasing products from Ocean Student Projects."
          lastUpdated="February 2026"
          badge="Terms of Service"
        >
          {/* Introduction */}
          <div className="policy-section">
            <p className="policy-p">
              Welcome to <strong>Ocean Student Projects</strong>. These Terms &amp; Conditions govern your access to and use of our website (including browsing, creating accounts, placing orders, and purchasing components or kits).
            </p>
            <p className="policy-p">
              By accessing our website, placing an order, or purchasing any product from Ocean Student Projects, you acknowledge that you have read, understood, and agreed to be bound by these Terms &amp; Conditions.
            </p>
          </div>

          {/* Section 1 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">1</span>
              About Our Products
            </h3>
            <p className="policy-p">
              Ocean Student Projects sells electronic components, development boards (Arduino, ESP32, Raspberry Pi, etc.), sensors, modules, robotics products, educational kits, DIY kits, cables, accessories, and related engineering products.
            </p>
            <p className="policy-p">
              Product images are provided for representation and reference. Actual products may have minor differences in colour, markings, packaging, PCB revision, component manufacturer, or appearance while remaining functionally equivalent, where applicable.
            </p>
          </div>

          {/* Section 2 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">2</span>
              Product Information &amp; Accuracy
            </h3>
            <p className="policy-p">
              We make reasonable efforts to ensure that product descriptions, technical specifications, images, pinouts, prices, and other information displayed on our website are accurate.
            </p>
            <p className="policy-p">
              However, minor variations may occur due to manufacturer revisions, component availability, packaging changes, production batches, supplier modifications, or product design updates. We reserve the right to correct errors or update product information whenever necessary.
            </p>
          </div>

          {/* Section 3 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">3</span>
              Pricing
            </h3>
            <p className="policy-p">
              All prices displayed on the website are in Indian Rupees (INR) and are subject to change without prior notice. Applicable taxes, shipping charges, discounts, and offers will be calculated and displayed during checkout.
            </p>
            <p className="policy-p">
              If an obvious pricing or listing error occurs due to a typographical or system error, we reserve the right to cancel the affected order and provide an appropriate refund or resolution.
            </p>
          </div>

          {/* Section 4 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">4</span>
              Orders &amp; Acceptance
            </h3>
            <p className="policy-p">
              Placing an order on our website constitutes an offer to purchase the selected products. An order is subject to verification and acceptance by Ocean Student Projects. We reserve the right to cancel or decline an order in circumstances including:
            </p>
            <ul className="policy-list">
              <li className="policy-list-item"><i className="fa-solid fa-angle-right"></i><span>Product unavailability or stock depletion</span></li>
              <li className="policy-list-item"><i className="fa-solid fa-angle-right"></i><span>Incorrect pricing or listing errors</span></li>
              <li className="policy-list-item"><i className="fa-solid fa-angle-right"></i><span>Suspected fraudulent activity or unauthorized payment</span></li>
              <li className="policy-list-item"><i className="fa-solid fa-angle-right"></i><span>Incomplete or incorrect customer contact/address details</span></li>
              <li className="policy-list-item"><i className="fa-solid fa-angle-right"></i><span>Technical errors or other legitimate business/legal reasons</span></li>
            </ul>
            <p className="policy-p">
              If an order is cancelled after payment has been received, any applicable refund will be processed in accordance with our refund procedures and applicable banking guidelines.
            </p>
          </div>

          {/* Section 5 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">5</span>
              Customer Responsibility
            </h3>
            <p className="policy-p">
              Customers are responsible for providing complete and accurate information during checkout (Full Name, Billing &amp; Shipping Address with Pincode, Active Phone Number, Email, and exact Product Variant/Quantity selection).
            </p>
            <div className="policy-callout warning">
              <div className="policy-callout-title">
                <i className="fa-solid fa-triangle-exclamation"></i>
                Address Accuracy
              </div>
              <p>
                Ocean Student Projects shall not be held liable for shipment delays, re-delivery costs, or failed deliveries resulting from inaccurate or incomplete address details supplied by the customer.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">6</span>
              Electronic Product Usage &amp; Safety
            </h3>
            <p className="policy-p">
              Many products sold by Ocean Student Projects are intended for educational, experimental, prototyping, engineering, and development purposes. Customers are solely responsible for ensuring that products are used correctly and safely.
            </p>
            <p className="policy-p">
              <strong>Before connecting or powering any electronic product, customers must verify:</strong>
            </p>
            <div className="policy-grid-cards">
              <div className="policy-card-item"><i className="fa-solid fa-bolt"></i><span>Operating &amp; Input Voltage</span></div>
              <div className="policy-card-item"><i className="fa-solid fa-wave-square"></i><span>Current Requirements</span></div>
              <div className="policy-card-item"><i className="fa-solid fa-diagram-project"></i><span>Pin Configuration &amp; Pinout</span></div>
              <div className="policy-card-item"><i className="fa-solid fa-plus-minus"></i><span>Polarity (+ / -)</span></div>
              <div className="policy-card-item"><i className="fa-solid fa-plug"></i><span>Wiring &amp; Connections</span></div>
              <div className="policy-card-item"><i className="fa-solid fa-microchip"></i><span>Datasheet Specifications</span></div>
            </div>
            <p className="policy-p" style={{ marginTop: '12px' }}>
              <em>Incorrect wiring, excessive voltage, reverse polarity, short circuits, improper soldering, or misuse may permanently damage electronic components and will void any applicable warranty.</em>
            </p>
          </div>

          {/* Section 7 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">7</span>
              No Guarantee of Project Compatibility
            </h3>
            <p className="policy-p">
              Purchasing an individual component or module does not guarantee that it will function with every project, custom circuit, software library, development framework, microcontroller, operating system, or power supply.
            </p>
            <p className="policy-p">
              Customers are responsible for determining compatibility with their intended hardware and software environment prior to purchasing.
            </p>
          </div>

          {/* Section 8 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">8</span>
              Warranty
            </h3>
            <p className="policy-p">
              Where a product carries a specific warranty, the applicable warranty terms will apply. Warranty coverage may vary depending on the product and manufacturer.
            </p>
            <p className="policy-p">
              Warranty coverage does not apply to damage caused by misuse, incorrect wiring, reverse polarity, physical damage, liquid exposure, voltage surges, short circuits, hardware modifications, improper soldering, unauthorized repairs, or normal wear and tear.
            </p>
          </div>

          {/* Section 9 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">9</span>
              Returns &amp; Refunds
            </h3>
            <p className="policy-p">
              Due to the sensitive electronic nature of our items, Ocean Student Projects generally does not accept returns or provide refunds for change of mind, incorrect variant selection, or project cancellations once an order has been delivered.
            </p>
            <p className="policy-p">
              For complete details regarding damaged shipments, defective items, and replacement procedures, please review our comprehensive{' '}
              <Link href="/return-and-refund-policy" style={{ color: '#136c39', fontWeight: '600', textDecoration: 'underline' }}>
                Return &amp; Refund Policy
              </Link>.
            </p>
          </div>

          {/* Section 10 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">10</span>
              Shipping &amp; Delivery
            </h3>
            <p className="policy-p">
              We make reasonable efforts to dispatch orders within our stated processing window. Delivery times vary depending on the destination and shipping partner. Please review our{' '}
              <Link href="/shipping-policy" style={{ color: '#136c39', fontWeight: '600', textDecoration: 'underline' }}>
                Shipping Policy
              </Link>{' '}
              for carrier details and delivery timelines.
            </p>
          </div>

          {/* Section 11 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">11</span>
              Intellectual Property
            </h3>
            <p className="policy-p">
              All website content (including logos, brand names, product descriptions, photography, graphics, UI layout, diagrams, and code) is the intellectual property of Ocean Student Projects or its licensors. Unauthorized copying, distribution, or commercial exploitation is strictly prohibited without prior written consent.
            </p>
          </div>

          {/* Section 12 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">12</span>
              Website Use &amp; Conduct
            </h3>
            <p className="policy-p">
              Users agree not to use the website for unlawful purposes, fraudulent purchases, probing security vulnerabilities, uploading malicious code, or impersonating individuals or entities. We reserve the right to suspend or terminate accounts engaging in unauthorized activities.
            </p>
          </div>

          {/* Section 13 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">13</span>
              Third-Party Services
            </h3>
            <p className="policy-p">
              Our store utilizes external third-party services including payment gateways and courier tracking. Ocean Student Projects is not liable for disruptions or performance issues originating from external third-party infrastructure.
            </p>
          </div>

          {/* Section 14 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">14</span>
              Limitation of Liability
            </h3>
            <p className="policy-p">
              To the fullest extent permitted under applicable law, Ocean Student Projects shall not be liable for any indirect, incidental, special, punitive, or consequential damages resulting from the use, installation, modification, or misuse of products purchased from us.
            </p>
          </div>

          {/* Section 15 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">15</span>
              Force Majeure
            </h3>
            <p className="policy-p">
              Ocean Student Projects will not be liable for any delay or failure in performance resulting from causes beyond our reasonable control, including natural disasters, acts of God, transport strikes, supply chain disruptions, government restrictions, or telecommunications outages.
            </p>
          </div>

          {/* Section 16 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">16</span>
              Changes to These Terms
            </h3>
            <p className="policy-p">
              We reserve the right to revise or update these Terms &amp; Conditions at any time. Any changes will become effective immediately upon posting to this website.
            </p>
          </div>

          {/* Section 17 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">17</span>
              Governing Law &amp; Jurisdiction
            </h3>
            <p className="policy-p">
              These Terms &amp; Conditions are governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts in Chennai, Tamil Nadu, India.
            </p>
          </div>

          {/* Section 18 */}
          <div className="policy-section">
            <h3 className="policy-section-title">
              <span className="policy-section-badge">18</span>
              Contact Us
            </h3>
            <p className="policy-p">
              If you have any questions regarding these Terms &amp; Conditions, products, orders, or warranties, please contact Ocean Student Projects:
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
          </div>
        </PolicyLayout>
      </main>
      <Modals />
      <Footer />
    </>
  );
}
