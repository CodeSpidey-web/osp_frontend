"use client";
import React, { useState } from 'react';

const devices = {
  iphone: { name: 'iPhone 14', width: '390px', height: '844px', border: '32px', notch: true },
  galaxy: { name: 'Galaxy S22', width: '360px', height: '800px', border: '24px', notch: false },
  ipad: { name: 'iPad Mini', width: '768px', height: '1024px', border: '16px', notch: false }
};

export default function MobilePreviewPage() {
  const [device, setDevice] = useState(devices.iphone);
  const [currentPath, setCurrentPath] = useState('/');

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Control Panel Sidebar */}
      <div style={{
        width: '280px',
        backgroundColor: '#1e293b',
        borderRight: '1px solid #334155',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        boxSizing: 'border-box',
        justifyContent: 'space-between'
      }}>
        <div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '700', color: '#10b981' }}>
            Mobile Previewer
          </h2>
          <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: '#94a3b8' }}>
            Instant mobile emulator dashboard
          </p>

          {/* Device Selection */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', margin: '0 0 12px 0' }}>
              Select Device
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {Object.keys(devices).map((key) => {
                const dev = devices[key as keyof typeof devices];
                return (
                  <button
                    key={key}
                    onClick={() => setDevice(dev)}
                    style={{
                      flex: 1,
                      backgroundColor: device.name === dev.name ? '#10b981' : '#334155',
                      color: device.name === dev.name ? '#0f172a' : '#f8fafc',
                      border: 'none',
                      padding: '8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {dev.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', margin: '0 0 12px 0' }}>
              Quick Navigation
            </h3>
            {[
              { label: '🏠 Home Page', path: '/' },
              { label: '🛍️ Shop / Products', path: '/shop' },
              { label: '🛒 Shopping Cart', path: '/cart' },
              { label: '✉️ Contact Us', path: '/contact' }
            ].map((link) => (
              <button
                key={link.path}
                onClick={() => setCurrentPath(link.path)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  backgroundColor: currentPath === link.path ? '#10b981' : '#334155',
                  color: currentPath === link.path ? '#0f172a' : '#f8fafc',
                  border: 'none',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  marginBottom: '8px',
                  fontWeight: currentPath === link.path ? '600' : 'normal',
                  transition: 'all 0.2s ease'
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ fontSize: '11px', color: '#64748b', textAlign: 'center', lineHeight: '1.4' }}>
          Running on: <br />
          <strong>Same-Origin Mode</strong><br />
          Perfect security compatibility.
        </div>
      </div>

      {/* Screen Frame Display Workspace */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        position: 'relative'
      }}>
        <div style={{
          backgroundColor: '#000',
          borderRadius: '40px',
          padding: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 4px #475569',
          position: 'relative',
          transition: 'all 0.3s ease'
        }}>
          {/* Mock Camera Notch */}
          {device.notch && (
            <div style={{
              position: 'absolute',
              top: '22px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '110px',
              height: '24px',
              backgroundColor: '#000',
              borderRadius: '12px',
              zIndex: 10
            }} />
          )}

          {/* Interactive Iframe Screen */}
          <div style={{
            width: device.width,
            height: device.height,
            borderRadius: device.border,
            overflow: 'hidden',
            backgroundColor: '#fff',
            position: 'relative',
            transition: 'all 0.3s ease'
          }}>
            <iframe
              src={currentPath}
              style={{
                border: 'none',
                width: '100%',
                height: '100%',
                display: 'block'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
