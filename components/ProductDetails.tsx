'use client';
import React, { useState, useEffect } from 'react';
import { MedusaProduct, MedusaProductVariant, getValidImageUrl, fetchApi, getVariantPrice, getVariantOriginalPrice } from '@/lib/medusa';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

interface ProductDetailsProps {
  product: MedusaProduct;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const { customer } = useAuth();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<MedusaProductVariant | null>(
    product.variants?.[0] || null
  );
  const [stockQuantity, setStockQuantity] = useState<number | null>(null);
  const [loadingStock, setLoadingStock] = useState(false);

  useEffect(() => {
    if (!selectedVariant) {
      setStockQuantity(null);
      return;
    }
    
    // Check if it's a fallback product (no real variant ID in DB)
    const mockVariantIds = ['variant_rpi4', 'variant_ard_kit', 'variant_uno', 'variant_sr04', 'variant_esp32', 'variant_bb'];
    if (mockVariantIds.includes(selectedVariant.id)) {
      setStockQuantity(10); // Standard fallback
      return;
    }

    const fetchStock = async () => {
      setLoadingStock(true);
      try {
        const res = await fetchApi<{ inventory: Record<string, number> }>(
          `/store/inventory?variant_ids=${selectedVariant.id}`
        );
        const qty = res.inventory[selectedVariant.id] ?? 0;
        setStockQuantity(qty);
      } catch (err) {
        console.error("Failed to load inventory:", err);
        setStockQuantity(0); // Treat as out of stock on error
      } finally {
        setLoadingStock(false);
      }
    };

    fetchStock();
  }, [selectedVariant]);

  const initialMainImage = getValidImageUrl(
    product.thumbnail || (product.images?.[0]?.url) || '',
    '/assets/images/product-img/electronics/electro-c-01.webp',
    product.handle
  );

  const [activeImage, setActiveImage] = useState(initialMainImage);

  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({
    transform: 'scale(1)',
    transformOrigin: 'center center'
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transform: 'scale(2.2)',
      transformOrigin: `${x}% ${y}%`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: 'scale(1)',
      transformOrigin: 'center center'
    });
  };

  useEffect(() => {
    setActiveImage(initialMainImage);
    setSelectedVariant(product.variants?.[0] || null);
    handleMouseLeave();
  }, [product, initialMainImage]);

  const images = product.images?.length 
    ? product.images.map(img => ({
        ...img,
        url: getValidImageUrl(img.url, '/assets/images/product-img/electronics/electro-c-01.webp', product.handle)
      })) 
    : [{ id: 'default', url: initialMainImage }];

  const priceAmount = getVariantPrice(selectedVariant);
  const originalPriceAmount = getVariantOriginalPrice(selectedVariant);

  const getBreadcrumbs = () => {
    const crumbs = ['HOME'];
    const productCategories = (product.categories || []) as any[];
    if (productCategories.length > 0) {
      const parent = productCategories.find(c => !c.parent_category_id);
      if (parent) {
        crumbs.push(parent.name.toUpperCase());
        const child = productCategories.find(c => c.parent_category_id === parent.id);
        if (child) {
          crumbs.push(child.name.toUpperCase());
          const grandchild = productCategories.find(c => c.parent_category_id === child.id);
          if (grandchild) {
            crumbs.push(grandchild.name.toUpperCase());
          }
        }
      } else {
        crumbs.push(productCategories[0].name.toUpperCase());
      }
    }
    return crumbs.join(' / ');
  };

  const categoryNames = product.categories?.map(c => c.name).join(', ') || '';

  return (
    <>
      <div className="rbt-component-area rbt-single-product-area rbt-bg-color-white rbt-section-gapBottom">
        <div className="container">
          <div className="row row--20 mt_dec--16 justify-content-center">
            {/* Left side: Images */}
            <div className="col-xl-7 col-lg-12 col-12 mt--16">
              <div className="rbt-single-product-media-area position-sticky-top d-flex flex-column gap-3">
                {/* Big Main Image */}
                <div 
                  className="w-100 position-relative" 
                  style={{ 
                    border: '1px solid #f1f3f5', 
                    borderRadius: '8px', 
                    padding: '16px', 
                    background: '#ffffff', 
                    minHeight: '420px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                    overflow: 'hidden',
                    cursor: 'crosshair'
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >

                  
                  <img 
                    alt={product.title} 
                    src={activeImage} 
                    style={{ 
                      maxHeight: '380px', 
                      maxWidth: '100%', 
                      objectFit: 'contain',
                      transition: 'transform 0.1s ease-out',
                      ...zoomStyle
                    }}
                  />
                </div>

                {/* Horizontal Thumbnails */}
                {images.length > 1 && (
                  <div className="d-flex gap-2 flex-wrap mt--8">
                    {images.map((img) => (
                      <button 
                        key={img.id} 
                        onClick={() => setActiveImage(img.url)}
                        style={{ 
                          width: '76px', 
                          height: '76px', 
                          border: activeImage === img.url ? '2px solid var(--color-primary)' : '1px solid var(--color-gray-300)',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          padding: '4px',
                          background: '#ffffff',
                          cursor: 'pointer',
                          transition: 'border-color 0.2s ease-in-out'
                        }}
                      >
                        <img alt={product.title} src={img.url} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Product Information */}
            <div className="col-xl-5 col-lg-12 col-12 mt--16">
              <div className="rbt-single-product-content ptb--0">
                {/* Breadcrumbs */}
                <div style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#8c8c8c', fontWeight: '500', marginBottom: '12px' }}>
                  {getBreadcrumbs()}
                </div>

                {/* Title */}
                <h2 className="rbt-card-title mt--0" style={{ fontSize: '26px', fontWeight: '700', color: '#1a1a1a', lineHeight: '1.25' }}>
                  {product.title}
                </h2>

                <hr style={{ border: 'none', borderTop: '2px solid #1a1a1a', width: '40px', margin: '16px 0' }} />

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '8px 0' }}>
                  {originalPriceAmount > 0 && (
                    <del style={{ fontSize: '16px', fontWeight: '600', color: '#94a3b8' }}>
                      ₹{originalPriceAmount.toFixed(2)}
                    </del>
                  )}
                  <span style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-heading)' }}>
                    ₹{priceAmount.toFixed(2)}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-body)' }}>
                    (incl. GST)
                  </span>
                </div>

                {/* Stock Status */}
                <div style={{ 
                  color: loadingStock 
                    ? '#a1a1aa' 
                    : (!stockQuantity || stockQuantity <= 0)
                      ? '#ef4444' 
                      : '#2ec4b6', 
                  fontSize: '13px', 
                  fontWeight: '700', 
                  marginBottom: '20px' 
                }}>
                  {loadingStock 
                    ? 'Checking stock...' 
                    : (!stockQuantity || stockQuantity <= 0)
                      ? 'Out of stock' 
                      : stockQuantity < 10 
                        ? `Only ${stockQuantity} left in stock - order soon` 
                        : 'In stock'
                  }
                </div>

                {/* Quantity and Actions Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0', flexWrap: 'wrap' }}>
                  {/* Quantity selector */}
                  {stockQuantity !== null && stockQuantity > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ced4da', borderRadius: '6px', height: '40px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setQuantity(prev => Math.max(1, prev - 1));
                        }}
                        style={{ background: 'none', border: 'none', width: '36px', height: '100%', cursor: 'pointer', fontSize: '12px', color: '#495057', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <input 
                        type="text" 
                        readOnly
                        value={quantity} 
                        style={{ border: 'none', background: 'none', width: '40px', textAlign: 'center', fontWeight: '700', fontSize: '15px', outline: 'none', color: '#1c1b1f', padding: 0 }}
                      />
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setQuantity(prev => Math.min(stockQuantity || 99, prev + 1));
                        }}
                        style={{ background: 'none', border: 'none', width: '36px', height: '100%', cursor: 'pointer', fontSize: '12px', color: '#495057', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  )}

                   {/* Add To Cart */}
                  <button
                    onClick={async () => {
                      if (!selectedVariant) return;
                      if (!customer) {
                        router.push('/login');
                        return;
                      }
                      setIsAdding(true);
                      await addToCart(selectedVariant.id, quantity);
                      setIsAdding(false);
                    }}
                    disabled={isAdding || !selectedVariant || !stockQuantity || stockQuantity <= 0}
                    style={{
                      backgroundColor: (!stockQuantity || stockQuantity <= 0) ? '#71717a' : '#c85a17',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '0 24px',
                      height: '40px',
                      fontWeight: '700',
                      fontSize: '12px',
                      letterSpacing: '0.05em',
                      cursor: (!stockQuantity || stockQuantity <= 0) ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    {isAdding ? 'ADDING...' : (!stockQuantity || stockQuantity <= 0) ? 'OUT OF STOCK' : 'ADD TO CART'}
                  </button>

                  {/* Buy Now */}
                  {stockQuantity !== null && stockQuantity > 0 && (
                    <button
                      onClick={async () => {
                        if (!selectedVariant) return;
                        if (!customer) {
                          router.push('/login');
                          return;
                        }
                        setIsAdding(true);
                        await addToCart(selectedVariant.id, quantity);
                        setIsAdding(false);
                        router.push('/checkout');
                      }}
                      style={{
                        backgroundColor: '#1b2a47',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '20px',
                        padding: '0 28px',
                        height: '40px',
                        fontWeight: '700',
                        fontSize: '12px',
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      BUY NOW
                    </button>
                  )}
                </div>

                {/* Metadata */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#6c757d', borderTop: '1px solid #e9ecef', paddingTop: '16px' }}>
                  <div>
                    <span style={{ fontWeight: '500' }}>SKU:</span> {selectedVariant?.sku || product.id}
                  </div>
                  <div>
                    <span style={{ fontWeight: '500' }}>Categories:</span> {categoryNames}
                  </div>
                </div>

                {/* Additional Information Box */}
                <div style={{ 
                  backgroundColor: '#f8f9fa', 
                  border: '1px solid #e9ecef', 
                  borderRadius: '4px', 
                  padding: '20px', 
                  marginTop: '28px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.01)'
                }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#1a1a1a', marginBottom: '14px', letterSpacing: '0.02em' }}>
                    Additional Information
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#495057' }}>
                      <span style={{ color: '#2ec4b6', fontWeight: 'bold', fontSize: '15px' }}>✓</span>
                      <span>Prices Includes GST (GST Invoice Available)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#495057' }}>
                      <span style={{ color: '#2ec4b6', fontWeight: 'bold', fontSize: '15px' }}>✓</span>
                      <span>Free Shipping on Orders Above ₹999</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#495057' }}>
                      <span style={{ color: '#2ec4b6', fontWeight: 'bold', fontSize: '15px' }}>✓</span>
                      <span>Items on Website is Ready Stock at our Store for Immediate Shipping</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#495057' }}>
                      <span style={{ color: '#2ec4b6', fontWeight: 'bold', fontSize: '15px' }}>✓</span>
                      <span>Secure Checkout | Trusted Payments</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#495057' }}>
                      <span style={{ color: '#2ec4b6', fontWeight: 'bold', fontSize: '15px' }}>✓</span>
                      <span style={{ textDecoration: 'underline', cursor: 'pointer', color: 'var(--color-primary)' }}>Estimated Delivery?</span>
                    </li>
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
