'use client'
import React, { useState } from 'react';
import { MedusaProduct } from '@/lib/medusa';
import { useCart } from '@/lib/CartContext';

interface ProductGridProps {
  products: MedusaProduct[]
  loading: boolean
}

function getPricing(product: MedusaProduct): { display: string; min: number; max: number } {
  const amounts = product.variants?.flatMap(v =>
    v.prices?.map(p => p.amount) || []
  ) || []
  if (amounts.length === 0) return { display: '', min: 0, max: 0 }
  const min = Math.min(...amounts)
  const max = Math.max(...amounts)
  if (min === max) return { display: `₹${(min / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, min, max }
  return { display: `₹${(min / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} - ₹${(max / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, min, max }
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  const { addToCart } = useCart();
  const [addingId, setAddingId] = useState<string | null>(null);

  async function handleAddToCart(product: MedusaProduct) {
    const variantId = product.variants?.[0]?.id;
    if (!variantId) return;
    setAddingId(product.id);
    try {
      await addToCart(variantId, 1);
    } catch (err) {
      console.error(err);
    } finally {
      setAddingId(null);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="rbt-shop-tool-content rbt-shop-view-var-wrapper justify-content-between">
        <p className="rbt-shop-tools-title h6 rbt-text-color-heading">
          Showing {products.length} {products.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      <div className="row row--12 mt_sm--8 mt_md--8">
        {products.map((product) => {
          const pricing = getPricing(product)
          const categoryName = product.collection?.title || product.categories?.[0]?.name || ''
          return (
            <div key={product.id} className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt--24">
              <div className="rbt-card rbt-product-card has-hover-box-shadow">
                <div className="inner">
                  <div className="rbt-card-img rbt-has-hover-img rbt-bg-color-default">
                    <a href={`/product/${product.handle || product.id}`}>
                      <img className="rbt-prd-img"
                        src={product.thumbnail || product.images?.[0]?.url || '/assets/images/product-img/electronics/electronics-bg-trans-10-a-1.webp'}
                        alt={product.title} />
                      <img className="rbt-hover-img"
                        src={product.thumbnail || product.images?.[0]?.url || '/assets/images/product-img/electronics/electronics-bg-trans-10-a-1.webp'}
                        alt={product.title} />
                    </a>
                    <div className="rbt-quick-btn-grp has-mixup-midlayer bottom-right--position">
                      <button className="rbt-search-btn rbt-quick-btn tooltips" type="button" data-bs-toggle="modal"
                        data-bs-target="#quickviewModal" data-tooltip="Quick View" data-tooltip-position="left"><i
                          className="fa-regular fa-magnifying-glass-plus"></i></button>
                      <button className="rbt-wishlisted-btn rbt-quick-btn tooltips" type="button" data-bs-toggle="modal"
                        data-bs-target="#wishlistModal" data-tooltip="Add to wishlist"
                        data-tooltip-position="left"><i className="fa-regular fa-heart"></i></button>
                    </div>
                  </div>
                  <div className="rbt-card-body">
                    {categoryName && (
                      <a href="/shop" className="rbt-card-subtitle rbt-card-catagories-text">{categoryName}</a>
                    )}
                    <h2 className="rbt-card-title"><a href={`/product/${product.handle || product.id}`}>{product.title}</a></h2>
                    <div className="pricing-part">
                      <span className="price-text">{pricing.display}</span>
                    </div>
                    <div className="prd-btn-grp">
                      <button className="rbt-btn rbt-btn-border rbt-btn-sm rbt-square-btn d-block has-left-icon"
                        onClick={() => handleAddToCart(product)} disabled={addingId === product.id}><i className="fa-regular fa-cart-shopping"></i> {addingId === product.id ? 'Adding...' : 'Add To Cart'}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
}
