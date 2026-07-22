"use client";
import React from 'react';
import { useCategories } from '@/lib/hooks';

export default function ShopBannerAndCategories() {
  const { categories } = useCategories();

  return (
    <>
      {categories.length > 0 && (
      <div className="rbt-component-area rbt-catagories-area pt--0 pt_sm--16 pt_md--16 rbt-bg-color-white">
        <div className="container">
          <div className="row row--12 align-items-end rbt-tablet-row rbt-mobile-row">
            {categories.slice(0, 8).map((cat, i) => (
              <div key={cat.id} className="col-lg-1-8 col-md-2 col-sm-3 col-3">
                <a className="rbt-cat-box rbt-cat-box-1 text-center" href={`/shop${cat.handle ? `?category_id=${cat.id}` : ''}`}>
                  <div className="inner">
                    <div className="rbt-image-portion">
                      <img src={`/assets/images/catagory-img/cat-img-0${(i % 6) + 1}.webp`} alt={cat.name} />
                    </div>
                    <div className="content">
                      <p className="title">{cat.name}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}
    </>
  );
}
