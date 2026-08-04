"use client";
import React from 'react';
import { useCategories } from '@/lib/hooks';

const ELECTRONICS_CAT_IMAGES: Record<string, string> = {
  'development boards': '/assets/images/product-img/electronics/raspberry-pi-4.png',
  'iot & diy starter kits': '/assets/images/product-img/electronics/arduino-starter-kit.png',
  'sensors & modules': '/assets/images/product-img/electronics/ultrasonic-sensor.png',
  'cables & power accessories': '/assets/images/product-img/electronics/breadboard-kit.png',
  'robotics components': '/assets/images/catagory-img/cat-bg-electro-c-05.webp',
  'microcontrollers & sbcs': '/assets/images/product-img/electronics/esp32-nodemcu.png',
  'communication modules': '/assets/images/product-img/electronics/arduino-uno.png',
  'tools & prototyping': '/assets/images/catagory-img/cat-bg-electro-c-04.webp',
};

export default function ShopBannerAndCategories() {
  const { categories } = useCategories();

  // Filter to show only root-level parent categories, ignoring generic "Uncategorized"
  const parentCategories = categories.filter(
    cat => !cat.parent_category_id && cat.name?.toLowerCase() !== 'uncategorized'
  );

  return (
    <>
      {parentCategories.length > 0 && (
      <div className="rbt-component-area rbt-catagories-area pt--0 pt_sm--16 pt_md--16 rbt-bg-color-white mb--32">
        <div className="container">
          <div className="row row--12 rbt-tablet-row rbt-mobile-row justify-content-center">
            {parentCategories.map((cat, i) => {
              const catKey = (cat.name || '').toLowerCase();
              const imgSrc = ELECTRONICS_CAT_IMAGES[catKey] || `/assets/images/catagory-img/cat-bg-electro-c-0${(i % 6) + 1}.webp`;

              return (
                <div key={cat.id} className="col-lg-1-8 col-md-3 col-sm-4 col-6 mt--16">
                  <a className="rbt-cat-box rbt-cat-box-1 text-center d-block" href={`/shop${cat.id ? `?category_id=${cat.id}` : ''}`}>
                    <div className="inner">
                      <div className="rbt-image-portion mx-auto d-flex align-items-center justify-content-center" style={{ width: '135px', height: '135px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #e2e8f0', background: '#f8fafc', boxShadow: '0 6px 16px rgba(0,0,0,0.06)', padding: '8px' }}>
                        <img
                          src={imgSrc}
                          alt={cat.name}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `/assets/images/catagory-img/cat-bg-electro-c-0${(i % 6) + 1}.webp`;
                          }}
                        />
                      </div>
                      <div className="content mt--8">
                        <p className="title font-medium text-dark b2 mb-0" style={{ fontSize: '0.675rem', fontWeight: 600, lineHeight: '1.25' }}>{cat.name}</p>
                      </div>


                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      )}
    </>
  );
}

