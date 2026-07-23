"use client";
import React, { useState, useEffect, useRef } from 'react';

const devices = {
  iphone: { name: 'iPhone 14', width: 390, height: 844, border: '32px', notch: true, defaultScale: 0.75 },
  galaxy: { name: 'Galaxy S22', width: 360, height: 800, border: '24px', notch: false, defaultScale: 0.75 },
  ipad: { name: 'iPad Mini', width: 768, height: 1024, border: '16px', notch: false, defaultScale: 0.60 }
};

export default function MobilePreviewPage() {
  const [device, setDevice] = useState(devices.iphone);
  const [currentPath, setCurrentPath] = useState('/');
  const [zoom, setZoom] = useState(0.75);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Sync zoom to device default scale
  useEffect(() => {
    setZoom(device.defaultScale);
    setIsLandscape(false);
  }, [device]);

  // Inject CSS inside iframe on load to hide the vertical scrollbar track
  const handleIframeLoad = () => {
    try {
      const iframe = iframeRef.current;
      if (iframe) {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
          const style = doc.createElement('style');
          style.innerHTML = `
            /* Hide scrollbar for Chrome, Safari and Opera */
            ::-webkit-scrollbar {
              display: none !important;
            }
            /* Hide scrollbar for IE, Edge and Firefox */
            html, body {
              -ms-overflow-style: none !important;
              scrollbar-width: none !important;
            }
          `;
          doc.head.appendChild(style);
        }
      }
    } catch (err) {
      console.error('Failed to inject scrollbar-hiding style inside iframe:', err);
    }
  };

  const handleRotate = () => {
    setIsSpinning(true);
    setIsLandscape(!isLandscape);
    setTimeout(() => {
      setIsSpinning(false);
    }, 600); // matches the animation duration
  };

  const finalWidth = isLandscape ? device.height : device.width;
  const finalHeight = isLandscape ? device.width : device.height;

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Dynamic Keyframes for smooth scaling & physical rotation */}
      <style>{`
        @keyframes physical-spin {
          0% {
            transform: scale(${zoom}) rotate(0deg);
          }
          50% {
            transform: scale(${zoom * 0.7}) rotate(180deg);
            box-shadow: 0 40px 80px rgba(0, 0, 0, 0.8);
          }
          100% {
            transform: scale(${zoom}) rotate(360deg);
          }
        }
        .spin-active {
          animation: physical-spin 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      {/* Control Panel Sidebar */}
      <div style={{
        width: '280px',
        backgroundColor: '#1e293b',
        borderRight: '1px solid #334155',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        boxSizing: 'border-box',
        justifyContent: 'space-between',
        zIndex: 20
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
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
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

            {/* Rotation Control */}
            <button
              onClick={handleRotate}
              disabled={isSpinning}
              style={{
                width: '100%',
                backgroundColor: isLandscape ? '#10b981' : '#475569',
                color: isLandscape ? '#0f172a' : '#f8fafc',
                border: 'none',
                padding: '10px',
                borderRadius: '8px',
                cursor: isSpinning ? 'not-allowed' : 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              🔄 Rotate to {isLandscape ? 'Portrait' : 'Landscape'}
            </button>
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
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Top Control Bar for Zoom */}
        <div style={{
          height: '60px',
          borderBottom: '1px solid #334155',
          backgroundColor: '#1e293b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 24px',
          gap: '16px',
          zIndex: 10
        }}>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>Zoom: {Math.round(zoom * 100)}%</span>
          <button 
            onClick={() => setZoom(prev => Math.max(0.4, prev - 0.05))}
            style={{ padding: '4px 10px', background: '#334155', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer' }}
          >-</button>
          <input 
            type="range" 
            min="0.4" 
            max="1.2" 
            step="0.05"
            value={zoom} 
            onChange={(e) => setZoom(parseFloat(e.target.value))} 
            style={{ width: '120px', cursor: 'pointer', accentColor: '#10b981' }}
          />
          <button 
            onClick={() => setZoom(prev => Math.min(1.2, prev + 0.05))}
            style={{ padding: '4px 10px', background: '#334155', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer' }}
          >+</button>
          <button 
            onClick={() => setZoom(device.defaultScale)}
            style={{ padding: '4px 10px', background: '#10b981', border: 'none', borderRadius: '4px', color: '#0f172a', fontWeight: 'bold', cursor: 'pointer' }}
          >Reset</button>
        </div>

        {/* Workspace canvas */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          overflow: 'auto',
          padding: '40px',
          boxSizing: 'border-box'
        }}>
          {/* Animated wrapper container */}
          <div 
            className={isSpinning ? 'spin-active' : ''}
            style={{
              transform: isSpinning ? undefined : `scale(${zoom})`,
              transformOrigin: 'center center',
              transition: isSpinning ? undefined : 'transform 0.2s ease-out',
              flexShrink: 0
            }}
          >
            <div style={{
              backgroundColor: '#000',
              borderRadius: '40px',
              padding: '12px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 4px #475569',
              position: 'relative',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              {/* Mock Camera Notch (Only in portrait view) */}
              {device.notch && !isLandscape && (
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
                width: `${finalWidth}px`,
                height: `${finalHeight}px`,
                borderRadius: device.border,
                overflow: 'hidden',
                backgroundColor: '#fff',
                position: 'relative',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                <iframe
                  ref={iframeRef}
                  src={currentPath}
                  onLoad={handleIframeLoad}
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
      </div>
    </div>
  );
}
