'use client'
import React, { useState, useEffect } from 'react';
import { MedusaProduct, getValidImageUrl, fetchApi, getVariantPrice } from '@/lib/medusa';
import { useCart } from '@/lib/CartContext';

interface ProductGridProps {
  products: MedusaProduct[]
  loading: boolean
  count: number
  offset: number
  limit: number
}

function getPricing(product: MedusaProduct): { display: string; min: number; max: number } {
  const amounts = product.variants?.map(v => getVariantPrice(v)).filter(a => a > 0) || []
  if (amounts.length === 0) return { display: '', min: 0, max: 0 }
  const min = Math.min(...amounts)
  const max = Math.max(...amounts)
  if (min === max) return { display: `₹${min.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, min, max }
  return { display: `₹${min.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} - ₹${max.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, min, max }
}

export default function ProductGrid({ products, loading, count, offset, limit }: ProductGridProps) {
  const { addToCart } = useCart();
  const [addingId, setAddingId] = useState<string | null>(null);
  const [inventoryMap, setInventoryMap] = useState<Record<string, number>>({});

  useEffect(() => {
    if (products.length === 0) return;
    const variantIds = products.map(p => p.variants?.[0]?.id).filter(Boolean);
    if (variantIds.length === 0) return;
    
    // Check mock fallbacks
    const mockVariantIds = ['variant_rpi4', 'variant_ard_kit', 'variant_uno', 'variant_sr04', 'variant_esp32', 'variant_bb'];
    
    fetchApi<{ inventory: Record<string, number> }>(`/store/inventory?variant_ids=${variantIds.join(',')}`)
      .then(res => {
        const map = { ...res.inventory };
        mockVariantIds.forEach(id => {
          if (variantIds.includes(id)) {
            map[id] = 10;
          }
        });
        setInventoryMap(map);
      })
      .catch(err => {
        console.error("Failed to load inventory for grid:", err);
      });
  }, [products]);

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
      <>
        <div className="mb--20" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ margin: 0, fontWeight: '600', color: 'var(--color-heading)', fontSize: '15px' }}>
            Loading products...
          </p>
        </div>
        <div className="row row--12 mt_sm--8 mt_md--8">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 mt--24 d-flex animate-pulse">
              <div className="rbt-card rbt-product-card w-100 h-100 d-flex flex-column" style={{ opacity: 0.6 }}>
                <div className="inner w-100 h-100 d-flex flex-column">
                  <div className="rbt-card-img" style={{ background: '#f1f3f5', minHeight: '260px', borderRadius: '6px' }}></div>
                  <div className="rbt-card-body mt--16" style={{ flexGrow: 1, padding: '16px' }}>
                    <div style={{ height: '14px', backgroundColor: '#e9ecef', width: '40%', marginBottom: '10px', borderRadius: '4px' }}></div>
                    <div style={{ height: '20px', backgroundColor: '#e9ecef', width: '90%', marginBottom: '10px', borderRadius: '4px' }}></div>
                    <div style={{ height: '16px', backgroundColor: '#e9ecef', width: '60%', borderRadius: '4px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  const startResult = count === 0 ? 0 : offset + 1;
  const endResult = Math.min(offset + limit, count);

  return (
    <>
      <div className="mb--20" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ margin: 0, fontWeight: '600', color: 'var(--color-heading)', fontSize: '15px' }}>
          Showing {startResult}–{endResult} of {count} {count === 1 ? 'result' : 'results'}
        </p>
      </div>

      <div className="row row--12 mt_sm--8 mt_md--8">
        {products.map((product) => {
          const pricing = getPricing(product)
          const categoryName = product.collection?.title || product.categories?.[0]?.name || ''
          const firstVariantId = product.variants?.[0]?.id;
          const stock = firstVariantId ? (inventoryMap[firstVariantId] ?? 10) : 0;

          return (
            <div key={product.id} className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 mt--24 d-flex">
              <div className="rbt-card rbt-product-card w-100 h-100 d-flex flex-column justify-content-between">
                <div className="inner w-100 h-100 d-flex flex-column justify-content-between">
                  <div className="rbt-card-img flex-grow-1 d-flex align-items-center justify-content-center position-relative" style={{ background: '#ffffff', minHeight: '260px' }}>
                    <a href={`/product/${product.handle || product.id}`} className="w-100 h-100 d-flex align-items-center justify-content-center">
                      {stock === 0 && (
                        <span style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backgroundColor: '#ef4444',
                          color: '#ffffff',
                          fontSize: '10px',
                          fontWeight: '700',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          zIndex: 2
                        }}>
                          Out of stock
                        </span>
                      )}
                      <img className="rbt-prd-img"
                        src={getValidImageUrl(product.thumbnail || product.images?.[0]?.url, '/assets/images/product-img/electronics/electro-c-01.webp', product.handle)}
                        alt={product.title}
                        style={{ maxHeight: '220px', objectFit: 'contain' }}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/assets/images/product-img/electronics/electro-c-01.webp';
                        }}
                      />
                    </a>
                  </div>
                  <div className="rbt-card-body d-flex flex-column justify-content-between flex-grow-0" style={{ minHeight: '170px' }}>
                    <div>
                      {categoryName && (
                        <a href="/shop" className="rbt-card-subtitle rbt-card-catagories-text">{categoryName}</a>
                      )}
                      <h2 className="rbt-card-title product-title-clamp">
                        <a href={`/product/${product.handle || product.id}`}>{product.title}</a>
                      </h2>
                    </div>
                    <div>
                      <div className="pricing-part mb--12">
                        <span className="price-text">{pricing.display}</span>
                      </div>
                      <div className="prd-btn-grp">
                        {stock === 0 ? (
                          <a href={`/product/${product.handle || product.id}`} className="rbt-btn rbt-btn-border rbt-btn-sm text-center d-block w-100" style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.05em', borderRadius: '4px', border: '1px solid #1b2a47', backgroundColor: '#1b2a47', color: '#ffffff' }}>
                            READ MORE
                          </a>
                        ) : (
                          <button className="rbt-btn rbt-btn-border rbt-btn-sm rbt-square-btn d-block has-left-icon w-100"
                            onClick={() => handleAddToCart(product)} disabled={addingId === product.id}>
                            <i className="fa-regular fa-cart-shopping"></i> {addingId === product.id ? 'Adding...' : 'Add To Cart'}
                          </button>
                        )}
                      </div>
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
