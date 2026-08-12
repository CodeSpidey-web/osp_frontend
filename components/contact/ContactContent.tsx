"use client";
import React, { useState } from 'react';

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    message: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.college || !formData.message) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setErrorMsg('');

    try {
      let file_data = null;
      let file_name = null;
      let file_type = null;

      if (file) {
        file_name = file.name;
        file_type = file.type;
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (err) => reject(err);
        });
        reader.readAsDataURL(file);
        file_data = await base64Promise;
      }

      const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'pk_abd8e27126ac664d0d8042bea1fc954747cfdc4ad40a24974833f10a727a1211';
      const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
      const response = await fetch(`${BACKEND_URL}/store/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': PUBLISHABLE_API_KEY
        },
        body: JSON.stringify({
          ...formData,
          file_name,
          file_data,
          file_type
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit enquiry");
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', college: '', message: '' });
      setFile(null);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .contact-container {
          background: linear-gradient(135deg, #e6f7ec 0%, #d7eedf 50%, #ebf5ee 100%) !important;
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
          border-top: 1px solid #cfead6;
          padding-top: 50px;
        }
        .osp-contact-form-card {
          background: #ffffff;
          border: 1px solid #eef0f2;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
        }
        @media (max-width: 768px) {
          .contact-container {
            padding: 30px 0 60px 0 !important;
          }
          .contact-grid {
            flex-direction: column-reverse;
            gap: 40px;
          }
          .osp-contact-form-card {
            padding: 24px 20px;
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
                  OCEAN STUDENT PROJECTS<br />
                  No. 12, Shop No. 7,<br />
                  Narasingapuram Street,<br />
                  (Jothi Lodge Building),<br />
                  Mount Road,<br />
                  Chennai – 600 002, Tamil Nadu, India.
                </div>
              </div>
              
              <div className="contact-item">
                <h3 className="contact-item-title">Phone Contact</h3>
                <div className="contact-item-detail">
                  <a href="tel:+919042686793">+91 90426 86793</a>
                  <br />
                  <a href="tel:04442131795">044-4213 1795</a>
                </div>
              </div>
              
              <div className="contact-item">
                <h3 className="contact-item-title">Email Inquiries</h3>
                <div className="contact-item-detail">
                  <a href="mailto:oceanstudentprojects@gmail.com">oceanstudentprojects@gmail.com</a>
                </div>
              </div>
            </div>
            
            {/* Right Form Column */}
            <div className="contact-form-col">
              <div className="osp-contact-form-card">
                <h2 
                  style={{ 
                    fontSize: '22px', 
                    fontWeight: '700', 
                    color: '#0b2545', 
                    marginBottom: '24px', 
                    borderBottom: '2px solid #eef7f2', 
                    paddingBottom: '12px' 
                  }}
                >
                  Project Enquiry
                </h2>
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
                    {errorMsg && (
                      <div style={{ color: '#ef4444', backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', fontWeight: '500' }}>
                        {errorMsg}
                      </div>
                    )}

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
                      <label className="minimal-input-label" htmlFor="user_phone">Phone Number *</label>
                      <input 
                        type="tel" 
                        id="user_phone" 
                        required
                        className="minimal-input"
                        placeholder="e.g. +91 733 897 569"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="minimal-input-group">
                      <label className="minimal-input-label" htmlFor="user_college">College Name *</label>
                      <input 
                        type="text" 
                        id="user_college" 
                        required
                        className="minimal-input"
                        placeholder="Name of your institution"
                        value={formData.college}
                        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      />
                    </div>

                    <div className="minimal-input-group">
                      <label className="minimal-input-label" htmlFor="user_file">Project Abstract / Proposal (PPT or PDF - Optional)</label>
                      <input 
                        type="file" 
                        id="user_file" 
                        accept=".pdf,.ppt,.pptx"
                        className="minimal-input"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setFile(e.target.files[0]);
                          } else {
                            setFile(null);
                          }
                        }}
                      />
                      {file && (
                        <div style={{ marginTop: '8px', fontSize: '12px', color: '#136c39', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>📁 {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                          <button 
                            type="button" 
                            onClick={() => {
                              setFile(null);
                              const inputEl = document.getElementById('user_file') as HTMLInputElement;
                              if (inputEl) inputEl.value = '';
                            }}
                            style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '11px', textDecoration: 'underline' }}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="minimal-input-group">
                      <label className="minimal-input-label" htmlFor="user_message">Project Details *</label>
                      <textarea 
                        id="user_message" 
                        required
                        rows={4}
                        className="minimal-input"
                        placeholder="Describe your project concept, requirements, or help needed..."
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
                      {loading ? "Submitting Enquiry..." : "Submit Enquiry"}
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
                src="https://maps.google.com/maps?q=No.%2012%2C%20Narasingapuram%20Street%2C%20Mount%20Road%2C%20Chennai%20600002%2C%20Tamil%20Nadu%2C%20India&t=&z=16&ie=UTF8&iwloc=&output=embed" 
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
