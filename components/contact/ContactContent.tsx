"use client";
import React, { useState } from 'react';

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <>
      <style>{`
        .contact-container {
          background-color: #ffffff;
          padding: 80px 0;
          color: #2b303a;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .contact-content {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .contact-grid {
          display: flex;
          gap: 60px;
          margin-bottom: 60px;
          align-items: flex-start;
        }
        .contact-info-col {
          flex: 1;
        }
        .contact-form-col {
          flex: 1.2;
        }
        .contact-title {
          font-size: 36px;
          font-weight: 800;
          color: #0b2545;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }
        .contact-subtitle {
          font-size: 16px;
          line-height: 1.6;
          color: #6c757d;
          margin-bottom: 40px;
        }
        .contact-item {
          margin-bottom: 30px;
        }
        .contact-item-title {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #136c39;
          margin-bottom: 8px;
        }
        .contact-item-detail {
          font-size: 15px;
          line-height: 1.7;
          color: #333333;
        }
        .contact-item-detail a {
          color: #1c61e7 !important;
          text-decoration: underline !important;
        }
        .minimal-input-group {
          margin-bottom: 24px;
        }
        .minimal-input-label {
          font-size: 12px;
          font-weight: 600;
          color: #495057;
          margin-bottom: 8px;
          display: block;
        }
        .minimal-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          color: #000000;
          background: #ffffff;
          outline: none;
          transition: all 0.3s ease;
        }
        .minimal-input:focus {
          border-color: #136c39;
          box-shadow: 0 0 0 3px rgba(19, 108, 57, 0.1);
        }
        .minimal-button {
          background-color: #136c39;
          color: #ffffff;
          border: none;
          font-weight: 600;
          padding: 12px 30px;
          border-radius: 50px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .minimal-button:hover {
          background-color: #0f542c;
          transform: translateY(-1px);
        }
        .map-section {
          border-top: 1px solid #eef0f2;
          padding-top: 50px;
        }
        @media (max-width: 768px) {
          .contact-grid {
            flex-direction: column;
            gap: 40px;
          }
        }
      `}</style>

      <div className="contact-container">
        <div className="contact-content">
          
          <div className="contact-grid">
            
            {/* Left Info Column */}
            <div className="contact-info-col">
              <h1 className="contact-title">Contact Us</h1>
              <p className="contact-subtitle">
                Have a question about a product, order, or project? Get in touch and our team will get back to you shortly.
              </p>
              
              <div className="contact-item">
                <h3 className="contact-item-title">Registered Office</h3>
                <div className="contact-item-detail">
                  Ocean Student Projects<br />
                  12, Narasingapuram Street,<br />
                  Near Ritchie Street, Mount Road,<br />
                  Chennai - 600002, Tamil Nadu, India.
                </div>
              </div>
              
              <div className="contact-item">
                <h3 className="contact-item-title">Phone Contact</h3>
                <div className="contact-item-detail">
                  +91-7338975699
                </div>
              </div>
              
              <div className="contact-item">
                <h3 className="contact-item-title">Email Inquiries</h3>
                <div className="contact-item-detail">
                  <a href="mailto:support@oceanstudentprojects.in">support@oceanstudentprojects.in</a>
                </div>
              </div>
            </div>
            
            {/* Right Form Column */}
            <div className="contact-form-col">
              <div 
                style={{ 
                  background: '#ffffff', 
                  border: '1px solid #eef0f2', 
                  borderRadius: '16px', 
                  padding: '40px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)'
                }}
              >
                {submitted ? (
                  <div className="text-center py-4" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#d1e7dd', color: '#0f5132', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '16px' }}>
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f5132', marginBottom: '8px' }}>Message Sent!</h3>
                    <p style={{ fontSize: '14px', color: '#41464b', lineHeight: '1.6', marginBottom: 0 }}>
                      Thank you for reaching out. We will get back to you within 24 hours.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="minimal-button mt--24"
                      style={{ padding: '8px 24px', fontSize: '12px' }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="minimal-input-group">
                      <label className="minimal-input-label" htmlFor="user_name">Full Name *</label>
                      <input 
                        type="text" 
                        id="user_name" 
                        required
                        className="minimal-input"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    
                    <div className="minimal-input-group">
                      <label className="minimal-input-label" htmlFor="user_email">Email Address *</label>
                      <input 
                        type="email" 
                        id="user_email" 
                        required
                        className="minimal-input"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    
                    <div className="minimal-input-group">
                      <label className="minimal-input-label" htmlFor="user_subject">Subject</label>
                      <input 
                        type="text" 
                        id="user_subject" 
                        className="minimal-input"
                        placeholder="Message topic (optional)"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>
                    
                    <div className="minimal-input-group">
                      <label className="minimal-input-label" htmlFor="user_message">Your Message *</label>
                      <textarea 
                        id="user_message" 
                        required
                        rows={4}
                        className="minimal-input"
                        placeholder="Write your comments or questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        style={{ minHeight: '120px', resize: 'vertical' }}
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="minimal-button w-100"
                      disabled={loading}
                    >
                      {loading ? "Sending Message..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
            
          </div>
          
          {/* Map Section */}
          <div className="map-section">
            <div 
              style={{ 
                borderRadius: '16px', 
                overflow: 'hidden', 
                boxShadow: '0 15px 40px rgba(0,0,0,0.04)', 
                border: '1px solid #eef0f2'
              }}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.4776323142755!2d80.26828627588819!3d13.068887512736245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267b09d5ff91b%3A0xc1a5a013b7da86fa!2sOcean%20Student%20Projects!5e0!3m2!1sen!2sin!4v1785832554350!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{ border: 0, display: 'block' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
