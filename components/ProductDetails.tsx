'use client';
import React, { useState } from 'react';
import { MedusaProduct, MedusaProductVariant } from '@/lib/medusa';
import { useCart } from '@/lib/CartContext';

interface ProductDetailsProps {
  product: MedusaProduct;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<MedusaProductVariant | null>(
    product.variants?.[0] || null
  );

  const mainImage = product.thumbnail || (product.images?.[0]?.url) || '';
  const images = product.images?.length ? product.images : [{ id: 'default', url: mainImage }];
  const price = selectedVariant?.prices?.find(p => p.currency_code === 'inr') || selectedVariant?.prices?.[0];
  const formattedPrice = price ? `₹${price.amount.toLocaleString('en-IN')}` : '';

  return (
    <>
      <div className="rbt-component-area rbt-single-product-area rbt-bg-color-white rbt-section-gapBottom">
        <div className="container">
          <div className="row row--20 mt_dec--16 justify-content-center">
            <div className="col-xl-7 col-lg-12 col-12 mt--16">
              <div className="rbt-single-product-media-area position-sticky-top rbt-single-product-media-has-folder-shape d-flex row row--12 rbt-gap--0">
                <div className="col-lg-1-5 col-lg-2 order-2 order-lg-1">
                  <div className="swiper product-single-slider-two-thumb-activation rbt-arrow-show-dfl rbt-thumb-has-bg-shape-overlay rbt-swiper-right-bottom-one rbt-arrow-between rbt-swiper-arrow-transparent">
                    <div className="swiper-wrapper rbt-store-thumb-variation-1">
                      {images.map((img, i) => (
                        <div key={img.id} className={`swiper-slide rbt-scroll-trigger fade_in animation-order-${i + 1}`}>
                          <button className="thumbnail d-block position-relative">
                            <span className="rbt-thumb-img-sm">
                              <img alt={product.title} className="w-100" src={img.url} />
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="rbt-swiper-arrow rbt-arrow-right">
                      <i className="fa-regular fa-chevron-down"></i>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4-5 col-lg-10 order-1 order-lg-2">
                  <div className="swiper rbt-medea-lg-img-area-md-wider product-single-slider-two-activation rbt-arrow-between rbt-arrow-show-dfl">
                    <div className="rbt-product-badge rbt-product-badge-bg-yellow rbt-badge-top-left--position">
                      {(product.status || 'published') === 'published' ? 'NEW' : product.status?.toUpperCase()}
                    </div>
                    <button className="rbt-enlarge-btn position-bottom-right" data-fancybox="product-single-image" data-src={mainImage}>
                      <span className="rbt-icon"><i className="fa-regular fa-arrows-maximize"></i></span>
                      <span className="rbt-enlarge-text">Enlarge View</span>
                    </button>
                    <div className="swiper-wrapper rbt-store-thumb-main-1">
                      {images.map((img, i) => (
                        <div key={img.id} className={`swiper-slide rbt-scroll-trigger fade_in animation-order-${i + 1}`}>
                          <div className="thumbnail">
                            <div className="rbt-product-single-img">
                              <img alt={product.title} className="w-100" data-fancybox="product-single-image" src={img.url} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="rbt-swiper-arrow rbt-arrow-left">
                      <div className="custom-overflow">
                        <i className="rbt-icon fa-regular fa-arrow-left"></i>
                        <i className="rbt-icon-top fa-regular fa-arrow-left"></i>
                      </div>
                    </div>
                    <div className="rbt-swiper-arrow rbt-arrow-right">
                      <div className="custom-overflow">
                        <i className="rbt-icon fa-regular fa-arrow-right"></i>
                        <i className="rbt-icon-top fa-regular fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-12 col-12 mt--16">
              <div className="rbt-single-product-content ptb--0">
                <a className="rbt-card-subtitle rbt-card-catagories-text mt--16" href="#">
                  {product.collection?.title || product.categories?.[0]?.name || 'Category'}
                </a>
                <h2 className="rbt-card-title mt--12">{product.title}</h2>
                <p className="description-text b2 mt--16">
                  {product.description || ''}
                </p>
                <div className="rbt-info-wrapper d-flex justify-content-between mt--16">
                  <div className="rbt-store-price-1">
                    <div className="pricing-part mt--0">
                      <span className="price-text">{formattedPrice}</span>
                    </div>
                  </div>
                </div>
                <div className="rbt-info-wrapper d-flex mt--24 rbt-gap--12 flex-wrap">
                  <div className="prd-info-section">
                    <a className="rbt-quick-info-tag d-flex align-items-center rbt-gap--8 rbt-flash-animation" href="#">
                      <p><strong>In Stock</strong></p>
                    </a>
                  </div>
                </div>
                {product.options?.map((option) => (
                  <div key={option.id} className="rbt-store-variation-controls mt--16">
                    <label className="b1 rbt-text-bold">{option.title}</label>
                    <div className="rbt-variation-items d-flex rbt-gap--8 mt--8">
                      {option.values.map((val) => (
                        <button
                          key={val.value}
                          className="rbt-btn rbt-btn-xs rbt-btn-border"
                        >
                          {val.value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="product-btn-grp mt--24">
                  <div className="rbt-qty-area">
                    <button 
                      className="qty-item-btn qty-item-btn-decr"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <input 
                      className="items-qty-input" 
                      min="1" 
                      type="number" 
                      value={quantity} 
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    />
                    <button 
                      className="qty-item-btn qty-item-btn-incr"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <button 
                    className="rbt-btn rbt-btn-border has-left-icon d-block text-center flex-grow-1" 
                    onClick={async () => {
                      if (!selectedVariant) return;
                      setIsAdding(true);
                      await addToCart(selectedVariant.id, quantity);
                      setIsAdding(false);
                    }}
                    disabled={isAdding || !selectedVariant}
                    style={{ border: 'none', cursor: 'pointer' }}
                  >
                    <i className="fa-regular fa-cart-shopping"></i> {isAdding ? 'Adding...' : 'Add To Cart'}
                  </button>
                </div>
                <div className="prd-btn-grp mt--8">
                  <a className="rbt-btn d-block text-center" href="#">Buy Now</a>
                </div>
                <div className="rbt-quick-link-grp mt--16">
                  <button className="rbt-quick-link" type="button"><i className="fa-sharp fa-regular fa-heart"></i>Add To Wishlist</button>
                  <button className="rbt-quick-link" type="button"><i className="fa-sharp fa-regular fa-share-nodes"></i>Share</button>
                </div>
                <hr className="rbt-separator rbt-separator-gray200 mt--24" />
                <div className="rbt-info-wrapper d-block mt--24">
                  <ul className="product-details-list shipment-details-list">
                    <li>
                      <span className="rbt-bold--text mr--4">SKU :</span>
                      <span className="text">{selectedVariant?.sku || product.id}</span>
                    </li>
                    {product.subtitle && (
                      <li>
                        <span className="rbt-bold--text mr--4">Subtitle :</span>
                        <span className="text">{product.subtitle}</span>
                      </li>
                    )}
                    {product.collection && (
                      <li>
                        <span className="rbt-bold--text mr--4">Collection :</span>
                        <span className="text">{product.collection.title}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
