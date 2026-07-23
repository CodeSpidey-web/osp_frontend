"use client";
import React from 'react';
import { usePathname } from 'next/navigation';

export default function DebugToolbar() {
  const pathname = usePathname();

  // Do not render the debug button on the mobile previewer itself
  if (pathname === '/mobile') return null;

  return (
    <a
      href="/mobile"
      className="mobile-preview-debug-btn d-none d-lg-flex"
      title="Open Mobile Preview"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: '#10b981',
        color: '#0f172a',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4), 0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'transform 0.2s ease, background-color 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.backgroundColor = '#059669';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.backgroundColor = '#10b981';
      }}
    >
      <i className="fa-solid fa-mobile-screen-button" style={{ fontSize: '24px' }}></i>
    </a>
  );
}
