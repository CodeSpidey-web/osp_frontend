"use client";
import React from 'react';
import dynamic from "next/dynamic";
import ShopHeader from "@/components/ShopHeader";
import Footer from "@/components/Footer";

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), { ssr: false });
const SideNavs = dynamic(() => import("@/components/SideNavs"), { ssr: false });
const Modals = dynamic(() => import("@/components/Modals"), { ssr: false });

export default function AboutPage() {
  return (
    <>
      <style>{`
        .about-us-container {
          background-color: #ffffff;
          padding: 80px 0;
          color: #2b303a;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .about-us-content {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .about-heading {
          font-size: 18px;
          font-weight: 500;
          line-height: 1.6;
          color: #2b303a;
          margin-bottom: 24px;
        }
        .about-quote {
          border-left: 3px solid #1a1a1a;
          padding-left: 20px;
          margin: 24px 0;
          font-size: 20px;
          font-weight: 700;
          font-style: italic;
          color: #000000;
        }
        .about-paragraph {
          font-size: 15px;
          line-height: 1.8;
          color: #333333;
          margin-bottom: 20px;
        }
        .about-paragraph a {
          color: #1c61e7 !important;
          font-weight: 600;
          text-decoration: underline !important;
        }
        .address-section {
          margin-top: 40px;
          border-top: 1px solid #eef0f2;
          padding-top: 40px;
        }
        .address-title {
          font-size: 16px;
          font-weight: 700;
          color: #0b2545;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .address-details {
          font-size: 15px;
          line-height: 1.8;
          color: #495057;
        }
        .address-details strong {
          color: #2b303a;
        }
      `}</style>

      <ShopHeader />
      <MobileMenu />
      <SideNavs />
      
      <main className="rbt-main-wrapper">
        <div className="about-us-container">
          <div className="about-us-content">
            <h1 className="about-heading">
              Here, at this crazy world of robotics, Ocean Student Projects passionately believe that:
            </h1>
            
            <blockquote className="about-quote">
              Every technology has some ideas built in it to create innovation!!!
            </blockquote>
            
            <p className="about-paragraph">
              And here we are, helping you "Drive your Ideas towards Innovation"!
            </p>
            
            <p className="about-paragraph">
              We've faced it, lack of resources, funds, equipment, guides, like minded people etc etc which are important to get your idea rolling. Now that we've some of them, we'd like to make sure you get rolling!!!
            </p>
            
            <p className="about-paragraph">
              We're electronics store with lot of knowledge base in research areas including Robotics, Arduino, Embedded Systems, E-bike Development, 3D printing, electronics projects and Affordable Electronics, Internet of Things lot base products, etc etc etc!!!
            </p>
            
            <p className="about-paragraph">
              Yeah, we're like new generation innovators to help each core of society with our extensive experience in system design as a fast growing solution provider in India with breakthrough designs and innovations.
            </p>
            
            <p className="about-paragraph">
              For any information or for technical assistance with your projects or idea, please mail us at <a href="mailto:support@oceanstudentprojects.in">support@oceanstudentprojects.in</a> or use the <a href="/contact">Contact Us</a> form. Our shop cum institute is based out of Chennai, Tamil Nadu, India. If you ain't in Chennai, you can still mail us and we can meet online and discuss those amazing project or idea for which you are looking for mentor since long time.
            </p>
            
            <div className="address-section">
              <h2 className="address-title">Registered Address:</h2>
              <div className="address-details">
                Ocean Student Projects<br />
                Chennai, Tamil Nadu, India.<br />
                <strong>Phone:</strong> +91-7338975699<br />
                <strong>Email:</strong> <a href="mailto:support@oceanstudentprojects.in" style={{ color: '#1c61e7', textDecoration: 'underline' }}>support@oceanstudentprojects.in</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modals />
      <Footer />
    </>
  );
}
