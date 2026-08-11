"use client";
import { useEffect, useState } from "react";
import { getProducts, getCategories, MedusaProduct, MedusaCategory, getValidImageUrl, fetchApi, getVariantPrice } from "@/lib/medusa";
import { useCart } from "@/lib/CartContext";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import HeroSwiper from "@/components/HeroSwiper";
import Brand from "@/components/Brand";
import PromoBanner from "@/components/PromoBanner";
import NewsletterSection from "@/components/NewsletterSection";


function formatPrice(amount: number, currencyCode: string = "inr") {
  if (!amount) return "₹0.00";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}

function getPricing(product: MedusaProduct): { display: string; min: number; max: number } {
  const amounts = product.variants?.map(v => getVariantPrice(v)).filter(a => a > 0) || []
  if (amounts.length === 0) return { display: '', min: 0, max: 0 }
  const min = Math.min(...amounts)
  const max = Math.max(...amounts)
  if (min === max) return { display: `₹${min.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, min, max }
  return { display: `₹${min.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} - ₹${max.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, min, max }
}

function getParentCategoryName(productCategories: any[], allCategories: MedusaCategory[]): string {
  if (!productCategories || productCategories.length === 0) {
    return "Electronic Components";
  }

  const findParentInTree = (
    targetId: string, 
    nodes: MedusaCategory[], 
    parent: MedusaCategory | null
  ): MedusaCategory | null => {
    for (const node of nodes) {
      if (node.id === targetId) {
        return parent;
      }
      if (node.category_children && node.category_children.length > 0) {
        const foundParent = findParentInTree(targetId, node.category_children, node);
        if (foundParent) return foundParent;
      }
    }
    return null;
  };

  for (const prodCat of productCategories) {
    const parentNode = findParentInTree(prodCat.id, allCategories, null);
    if (parentNode) {
      return parentNode.name;
    }
  }

  return productCategories[0]?.name || "Electronic Components";
}

interface MainContentProps {
  initialProducts?: MedusaProduct[];
  initialCategories?: MedusaCategory[];
  initialCategoryImages?: Record<string, string>;
  initialLatestProducts?: MedusaProduct[];
  initialPopularCategories?: any[];
}

export default function MainContent({
  initialProducts = [],
  initialCategories = [],
  initialCategoryImages = {},
  initialLatestProducts = [],
  initialPopularCategories = [],
}: MainContentProps) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<MedusaProduct[]>(initialProducts);
  const [categories, setCategories] = useState<MedusaCategory[]>(initialCategories);
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>(initialCategoryImages);
  const [latestProducts, setLatestProducts] = useState<MedusaProduct[]>(initialLatestProducts);
  const [popularCategories, setPopularCategories] = useState<any[]>(initialPopularCategories);
  const [loading, setLoading] = useState(initialProducts.length === 0);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [inventoryMap, setInventoryMap] = useState<Record<string, number>>({});

  useEffect(() => {
    if (initialProducts.length > 0) {
      return;
    }
    async function fetchData() {
      try {
        const [productsData, categoriesData, latestProductsData, popularCategoriesData] = await Promise.all([
          getProducts({ limit: 24 }),
          getCategories(),
          fetchApi<{ products: MedusaProduct[] }>("/store/latest-products").catch(() => ({ products: [] })),
          fetchApi<{ popular_categories: any[] }>("/store/popular-categories").catch(() => ({ popular_categories: [] })),
        ]);
        const allProducts = productsData.products || [];
        const shuffled = [...allProducts];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setProducts(shuffled);
        setLatestProducts(latestProductsData.products || []);
        setPopularCategories(popularCategoriesData.popular_categories || []);
        const cats = categoriesData || [];
        setCategories(cats);

        // Fetch first product image for parent categories
        const parentCats = cats.filter((cat: any) => !cat.parent_category_id && cat.name?.toLowerCase() !== 'uncategorized');
        const categoryImageMap: Record<string, string> = {};
        
        await Promise.all(
          parentCats.map(async (cat) => {
            try {
              const getDescendantIds = (c: any): string[] => {
                const ids = [c.id];
                if (c.category_children) {
                  c.category_children.forEach((child: any) => {
                    ids.push(child.id);
                    const fullChild = cats.find((x: any) => x.id === child.id);
                    if (fullChild && fullChild.category_children) {
                      fullChild.category_children.forEach((gc: any) => {
                        ids.push(gc.id);
                      });
                    }
                  });
                }
                return ids;
              };

              const res = await getProducts({ category_id: getDescendantIds(cat), limit: 1 });
              if (res.products && res.products.length > 0) {
                const prod = res.products[0];
                const img = getValidImageUrl(prod.thumbnail || prod.images?.[0]?.url, '', prod.handle);
                if (img) {
                  categoryImageMap[cat.id] = img;
                }
              }
            } catch (err) {
              console.warn(`Failed to fetch image for category ${cat.id}:`, err);
            }
          })
        );
        setCategoryImages(categoryImageMap);
      } catch (err) {
        console.error("Failed to load homepage data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Fetch live inventory for products on home page
  useEffect(() => {
    const allHomeProducts = [...products, ...latestProducts];
    if (allHomeProducts.length === 0) return;
    const variantIds = allHomeProducts.map(p => p.variants?.[0]?.id).filter(Boolean);
    if (variantIds.length === 0) return;

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
        console.error("Failed to load inventory for homepage:", err);
      });
  }, [products, latestProducts]);

  useEffect(() => {
    const handleReveal = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 200) {
          el.classList.add("visible");
        }
      });
    };

    handleReveal();
    const timeout = setTimeout(handleReveal, 100);
    window.addEventListener("scroll", handleReveal);
    window.addEventListener("resize", handleReveal);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "200px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleReveal);
      window.removeEventListener("resize", handleReveal);
      observer.disconnect();
    };
  }, [loading, categories, products]);

  const handleAddToCart = async (variantId: string, productId: string) => {
    setAddingId(productId);
    try {
      await addToCart(variantId, 1);
      const drawer = document.querySelector('.rbt-cart-side-menu');
      if (drawer) {
        drawer.classList.add('active');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAddingId(null);
    }
  };

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .latest-products-marquee-container {
          overflow: hidden;
          width: 100%;
          position: relative;
          padding: 10px 0;
        }
        .latest-products-marquee-content {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .latest-products-marquee-content:hover {
          animation-play-state: paused;
        }
        .latest-product-marquee-card {
          width: 290px;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .latest-products-marquee-content {
            gap: 12px;
            animation: marquee 20s linear infinite;
          }
          .latest-product-marquee-card {
            width: calc(50vw - 18px) !important;
          }
        }

        .premium-hero {
          background: linear-gradient(135deg, #051f0f 0%, #0c331a 50%, #124b27 100%);
          position: relative;
          overflow: hidden;
          padding: 80px 0;
        }
        .glowing-circle {
          position: absolute;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(254,208,0,0.12) 0%, rgba(254,208,0,0) 75%);
          border-radius: 50%;
          filter: blur(40px);
          pointer-events: none;
        }
        .gc-1 { top: -50px; right: 10%; }
        .gc-2 { bottom: -100px; left: 5%; }
        .hero-glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 40px;
        }
        .hero-badge {
          background: rgba(254, 208, 0, 0.12);
          color: #fed000;
          font-weight: 600;
          letter-spacing: 0.1em;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 0.8125rem;
          display: inline-block;
          border: 1px solid rgba(254, 208, 0, 0.2);
        }
        .text-gradient {
          background: linear-gradient(90deg, #ffffff 0%, #e0e0e0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .card-hover-effect {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        .card-hover-effect:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 5px 15px rgba(19, 108, 57, 0.05);
          border-color: rgba(19, 108, 57, 0.15);
        }
        .btn-premium {
          background: linear-gradient(90deg, #136c39 0%, #1c8c4c 100%);
          color: white !important;
          border: none;
          transition: all 0.3s ease;
          font-weight: 500;
          border-radius: 8px;
        }
        .btn-premium:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 24px rgba(19, 108, 57, 0.25);
        }
        .trust-icon-wrapper {
          width: 60px;
          height: 60px;
          background: rgba(19, 108, 57, 0.06);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #136c39;
          font-size: 1.5rem;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }
        .trust-card:hover .trust-icon-wrapper {
          background: #136c39;
          color: white;
          transform: rotateY(360deg);
        }
        .interactive-tag {
          padding: 10px 20px;
          border-radius: 50px;
          border: 1px solid rgba(19, 108, 57, 0.15);
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
          color: #136c39;
          font-weight: 500;
        }
        .interactive-tag:hover, .interactive-tag.active {
          background: #136c39;
          color: white;
          box-shadow: 0 4px 12px rgba(19, 108, 57, 0.2);
        }
        .product-grid-image {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .rbt-product-card:hover .product-grid-image {
          transform: scale(1.08);
        }
        .rbt-cat-box-5 .rbt-btn,
        .rbt-cat-box-5 .rbt-btn-md,
        .rbt-cat-box-5 .inner > .rbt-btn {
          font-size: 0.7125rem !important;
          font-weight: 600 !important;
          padding: 6px 12px !important;
          white-space: nowrap !important;
          max-width: 90% !important;
          word-break: normal !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        }
        .rbt-cat-box-5.wider-coloumn .content .title {
          font-size: 1.1rem !important;
          font-weight: 500 !important;
        }
        @media (max-width: 768px) {
          .rbt-mobile-row {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            padding-bottom: 12px !important;
            justify-content: flex-start !important;
          }
          .rbt-mobile-row > [class*="col-"] {
            flex: 0 0 240px !important;
            max-width: 240px !important;
            scroll-snap-align: start !important;
          }
          .rbt-catagories-area .rbt-mobile-row > [class*="col-"] {
            flex: 0 0 50% !important;
            max-width: 50% !important;
          }
          .rbt-cat-box-5.wider-coloumn .content .title {
            font-size: 0.9rem !important;
          }
          .trust-card {
            padding: 16px !important;
          }
          .trust-icon-wrapper {
            width: 48px !important;
            height: 48px !important;
            font-size: 1.25rem !important;
            margin-bottom: 12px !important;
          }
          .trust-title {
            font-size: 0.875rem !important;
          }
          .trust-text {
            font-size: 0.75rem !important;
          }
        }
        .rbt-product-nav-grp li button.rbt-product-nav {
          border: none !important;
          background: transparent;
          cursor: pointer;
          padding: 6px 16px !important;
          border-radius: 50px !important;
          transition: all 0.2s ease !important;
        }
        .rbt-product-nav-section .rbt-product-nav-grp li button.rbt-product-nav.active,
        .rbt-product-nav-grp li .rbt-product-nav.active {
          background: #ffffff !important;
          color: #111111 !important;
          font-weight: 600 !important;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08) !important;
          position: relative;
          z-index: 2;
        }
      `}</style>

      {/* Hero Section Swiper */}
      <HeroSwiper />

      {/* Feature & Trust Strip */}
      <div className="w-100 feature-trust-strip border-bottom">
        <div className="container">
          <div className="row g-1 text-center align-items-center">
            <div className="col-3">
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fa-solid fa-truck-fast"></i>
                </div>
                <div className="text-start">
                  <h6 className="feature-title d-none d-sm-block">Fast Express Shipping</h6>
                  <h6 className="feature-title d-block d-sm-none">Fast Dispatch</h6>
                  <p className="feature-subtitle">Same day dispatch before 2 PM</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fa-solid fa-shield-check"></i>
                </div>
                <div className="text-start">
                  <h6 className="feature-title d-none d-sm-block">100% Tested Components</h6>
                  <h6 className="feature-title d-block d-sm-none">Tested Parts</h6>
                  <p className="feature-subtitle">Verified by lab engineers</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fa-solid fa-rotate-left"></i>
                </div>
                <div className="text-start">
                  <h6 className="feature-title d-none d-sm-block">Easy Returns</h6>
                  <h6 className="feature-title d-block d-sm-none">Easy Returns</h6>
                  <p className="feature-subtitle">Hassle-free replacement policy</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fa-solid fa-headset"></i>
                </div>
                <div className="text-start">
                  <h6 className="feature-title d-none d-sm-block">Expert Tech Support</h6>
                  <h6 className="feature-title d-block d-sm-none">Tech Support</h6>
                  <p className="feature-subtitle">Live assistance for projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Categories Grid */}
      {(() => {
        const displayCategories = popularCategories.length > 0 ? popularCategories : categories.filter(
          cat => !cat.parent_category_id && cat.name?.toLowerCase() !== 'uncategorized'
        );
        return displayCategories.length > 0 && (
          <div className="rbt-component-area rbt-catagories-area rbt-section-gapTop rbt-bg-color-gray-light pb--30 reveal">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 mb--10">
                  <div className="rbt-component-section-title text-center border-0 p-0">
                    <div>
                      <span className="osp-brand-chip">POPULAR CATEGORIES</span>
                    </div>
                    <h2 className="rbt-title mt--4">
                      Browse By <span className="rbt-bold--text text-success">Engineering Component</span>
                    </h2>
                  </div>
                </div>
              </div>
              <div className="row row--12 mt_dec--24 justify-content-center rbt-mobile-row">
                {displayCategories.map((cat, i) => {
                  const imgUrl = cat.image_url || categoryImages[cat.id] || `/assets/images/catagory-img/cat-bg-electro-c-0${(i % 6) + 1}.webp`;

                  return (
                    <div key={cat.id} className={`col-lg-1-5 col-lg-4 col-md-4 col-sm-12 col-6 mt--24 reveal reveal-delay-${(i % 4) + 1}`}>
                      <div className="rbt-cat-box rbt-cat-box-5 rbt-card-has-animated text-center">
                        <div className="inner">
                          <div className="rbt-image-portion">
                            <a href={`/shop?category_id=${cat.id}`}>
                              <img 
                                src={imgUrl} 
                                alt={cat.name} 
                                style={{ objectFit: 'contain', height: '130px', width: '100%', background: '#fff', borderRadius: '6px', padding: '5px' }} 
                                loading="lazy"
                              />
                            </a>
                          </div>
                          <a href={`/shop?category_id=${cat.id}`} className="rbt-btn rbt-btn-white rbt-btn-md">
                            {cat.name}
                          </a>
                        </div>
                        <div className="rbt-right-corner-portion">
                          <div className="rbt-corner-portion-wrapper">
                            <a href={`/shop?category_id=${cat.id}`} className="rbt-card-link-btn">
                              <i className="fa-solid fa-arrow-up-right"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        );
      })()}

      {/* Latest Products Section */}
      {latestProducts.length > 0 && (
        <div className="rbt-component-area rbt-products-area rbt-bg-color-gray-light py-5 reveal">
          <div className="container">
            <div className="row mb--32">
              <div className="col-lg-12 d-flex justify-content-center flex-row align-items-center flex-wrap rbt-gap--16">
                <div className="rbt-component-section-title rbt-gap--4 p-0 mb--0 border-0 text-center">
                  <div>
                    <span className="osp-brand-chip mb-1">NEW ARRIVALS</span>
                  </div>
                  <h2 className="rbt-title">
                    Latest <span className="rbt-bold--text text-success">Products</span>
                  </h2>
                </div>
              </div>
            </div>

            <div className="latest-products-marquee-container">
              <div className="latest-products-marquee-content">
                {(() => {
                  let list = [...latestProducts];
                  while (list.length < 10) {
                    list = [...list, ...latestProducts];
                  }
                  const marqueeItems = [...list, ...list];

                  return marqueeItems.map((product, pi) => {
                    const variant = product.variants?.[0];
                    const pricing = getPricing(product);
                    const fallbackImg = `/assets/images/product-img/electronics/electro-c-0${(pi % 6) + 1}.webp`;
                    const stock = variant ? (inventoryMap[variant.id] ?? 10) : 0;

                    return (
                      <div key={`${product.id}-${pi}`} className="latest-product-marquee-card">
                        <div className="rbt-card rbt-product-card w-100 h-100 d-flex flex-column justify-content-between">
                          <div className="rbt-card-img rbt-rounded--12 rbt-scroll-trigger zoom_in flex-grow-1 d-flex align-items-center justify-content-center position-relative" style={{ minHeight: '280px', background: '#ffffff' }}>
                            <a href={`/product/${product.handle || product.id}`} className="w-100 h-100 d-flex align-items-center justify-content-center">
                              {stock === 0 && (
                                <span style={{
                                  position: 'absolute',
                                  top: '16px',
                                  left: '16px',
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
                              <img
                                src={getValidImageUrl(product.thumbnail || product.images?.[0]?.url, fallbackImg, product.handle)}
                                alt={product.title}
                                style={{ maxHeight: '240px', objectFit: 'contain' }}
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = fallbackImg;
                                }}
                              />
                            </a>
                            {variant && (
                              stock === 0 ? (
                                <a
                                  className="rbt-btn hover-appear-element bottom-position text-center rbt-btn-sm d-block"
                                  href={`/product/${product.handle || product.id}`}
                                  style={{
                                    border: "none",
                                    left: "16px",
                                    right: "16px",
                                    width: "calc(100% - 32px)",
                                    borderRadius: "50px",
                                    margin: "0 auto",
                                    backgroundColor: "#1b2a47",
                                    color: "#ffffff"
                                  }}
                                >
                                  READ MORE
                                </a>
                              ) : (
                                <button
                                  className="rbt-btn hover-appear-element bottom-position text-center rbt-btn-sm d-block has-left-icon rbt-cart-sidenav-activation"
                                  onClick={() => handleAddToCart(variant.id, product.id)}
                                  disabled={addingId === product.id}
                                  style={{
                                    border: "none",
                                    left: "16px",
                                    right: "16px",
                                    width: "calc(100% - 32px)",
                                    borderRadius: "50px",
                                    cursor: "pointer",
                                    margin: "0 auto",
                                  }}
                                >
                                  <i className="fa-regular fa-cart-shopping"></i> {addingId === product.id ? "Adding..." : "Add To Cart"}
                                </button>
                              )
                            )}
                          </div>
                          <div className="rbt-card-body rbt-card-body-center-align">
                            <a href="/shop" className="rbt-card-subtitle rbt-card-catagories-text">
                              {getParentCategoryName(product.categories || [], categories)}
                            </a>
                            <h2 className="rbt-card-title product-title-clamp">
                              <a href={`/product/${product.handle || product.id}`}>{product.title}</a>
                            </h2>
                            <div className="pricing-part">
                              <span className="price-text">{pricing.display}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popular Products Area */}
      <div className="rbt-component-area rbt-products-area rbt-bg-color-white rbt-section-gapTop reveal">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center flex-row align-items-center flex-wrap rbt-gap--16 mb--32">
              <div className="rbt-component-section-title rbt-gap--4 p-0 mb--0 border-0 text-center">
                <div>
                  <span className="osp-brand-chip mb-1">TOP SELECTION</span>
                </div>
                <h2 className="rbt-title rbt-scroll-trigger fade_in animation-order-1">
                  Popular <span className="rbt-bold--text text-success">Products</span>
                </h2>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading products...</span>
              </div>
              <p className="mt--16">Synchronizing with live inventory...</p>
            </div>
          ) : (
            <>
              {(() => {
                const displayProducts = products || [];

                return (
                  <>
                    <div className="row row--12 mt_dec--24">
                      <div className="col-lg-6 col-12 mt--24">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="rbt-product-banner rbt-product-banner-style-two h-100 rbt-bg-color-gray-150 border-0">
                              <div className="rbt-banner-inner">
                                <div className="rbt-product-banner-img rbt-full-width-img">
                                  <img
                                    src="/assets/images/product-banner/product-banner-electro-c-01.webp"
                                    alt="Ecommerce Product Banner Image"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="rbt-product-banner-content w-100">
                                  <div className="rbt-content-section">
                                    <h2 className="title mb--16">
                                      <span className="rbt-bold--text">Automatic Water Pump Controller <br /> Module XHM203</span>
                                    </h2>
                                  </div>
                                  <div className="rbt-banner-btn mt--16">
                                    <a className="rbt-btn rbt-btn-md border-0" href="/shop">SHOP NOW</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6 col-12 mt--24">
                        <div className="row row--12 mt_dec--24 h-100">
                          {displayProducts.slice(0, 2).map((product, pi) => {
                            const variant = product.variants?.[0];
                            const pricing = getPricing(product);
                            const fallbackImg = `/assets/images/product-img/electronics/electro-c-0${(pi % 6) + 1}.webp`;
                            const stock = variant ? (inventoryMap[variant.id] ?? 10) : 0;

                            return (
                              <div key={product.id} className="col-lg-6 col-6 mt--24 d-flex">
                                <div className="rbt-card rbt-product-card rbt-scroll-trigger fade_in w-100 h-100 d-flex flex-column justify-content-between">
                                  <div className="rbt-card-img rbt-rounded--12 rbt-scroll-trigger zoom_in flex-grow-1 d-flex align-items-center justify-content-center position-relative" style={{ minHeight: '320px', background: '#ffffff' }}>
                                    <a href={`/product/${product.handle || product.id}`} className="w-100 h-100 d-flex align-items-center justify-content-center">
                                      {stock === 0 && (
                                        <span style={{
                                          position: 'absolute',
                                          top: '16px',
                                          left: '16px',
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
                                      <img
                                        src={getValidImageUrl(product.thumbnail || product.images?.[0]?.url, fallbackImg, product.handle)}
                                        alt={product.title}
                                        style={{ maxHeight: '280px', objectFit: 'contain' }}
                                        loading="lazy"
                                        onError={(e) => {
                                          e.currentTarget.onerror = null;
                                          e.currentTarget.src = fallbackImg;
                                        }}
                                      />
                                    </a>
                                    {variant && (
                                      stock === 0 ? (
                                        <a
                                          className="rbt-btn hover-appear-element bottom-position text-center rbt-btn-sm d-block"
                                          href={`/product/${product.handle || product.id}`}
                                          style={{
                                            border: "none",
                                            left: "16px",
                                            right: "16px",
                                            width: "calc(100% - 32px)",
                                            borderRadius: "50px",
                                            margin: "0 auto",
                                            backgroundColor: "#1b2a47",
                                            color: "#ffffff"
                                          }}
                                        >
                                          READ MORE
                                        </a>
                                      ) : (
                                        <button
                                          className="rbt-btn hover-appear-element bottom-position text-center rbt-btn-sm d-block has-left-icon rbt-cart-sidenav-activation"
                                          onClick={() => handleAddToCart(variant.id, product.id)}
                                          disabled={addingId === product.id}
                                          style={{
                                            border: "none",
                                            left: "16px",
                                            right: "16px",
                                            width: "calc(100% - 32px)",
                                            borderRadius: "50px",
                                            cursor: "pointer",
                                            margin: "0 auto",
                                          }}
                                        >
                                          <i className="fa-regular fa-cart-shopping"></i> {addingId === product.id ? "Adding..." : "Add To Cart"}
                                        </button>
                                      )
                                    )}
                                  </div>
                                  <div className="rbt-card-body rbt-card-body-center-align">
                                    <a href="/shop" className="rbt-card-subtitle rbt-card-catagories-text">
                                      {getParentCategoryName(product.categories || [], categories)}
                                    </a>
                                    <h2 className="rbt-card-title product-title-clamp">
                                      <a href={`/product/${product.handle || product.id}`}>{product.title}</a>
                                    </h2>
                                    <div className="pricing-part">
                                      <span className="price-text">{pricing.display}</span>

                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {displayProducts.length > 2 && (
                      <div className="row row--12 mt--24">
                        {displayProducts.slice(2, 6).map((product, pi) => {
                          const variant = product.variants?.[0];
                          const pricing = getPricing(product);
                          const fallbackImg = `/assets/images/product-img/electronics/electro-c-0${((pi + 2) % 6) + 1}.webp`;
                          const stock = variant ? (inventoryMap[variant.id] ?? 10) : 0;

                          return (
                            <div key={product.id} className="col-lg-3 col-6 mt--24">
                              <div className="rbt-card rbt-product-card rbt-scroll-trigger fade_in">
                                <div className="rbt-card-img rbt-rounded--12 rbt-scroll-trigger zoom_in position-relative">
                                  <a href={`/product/${product.handle || product.id}`}>
                                    {stock === 0 && (
                                      <span style={{
                                        position: 'absolute',
                                        top: '16px',
                                        left: '16px',
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
                                    <img
                                      src={getValidImageUrl(product.thumbnail || product.images?.[0]?.url, fallbackImg, product.handle)}
                                      alt={product.title}
                                      loading="lazy"
                                      onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = fallbackImg;
                                      }}
                                    />
                                  </a>
                                  {variant && (
                                    stock === 0 ? (
                                      <a
                                        className="rbt-btn hover-appear-element bottom-position text-center rbt-btn-sm d-block"
                                        href={`/product/${product.handle || product.id}`}
                                        style={{
                                          border: "none",
                                          left: "16px",
                                          right: "16px",
                                          width: "calc(100% - 32px)",
                                          borderRadius: "50px",
                                          margin: "0 auto",
                                          backgroundColor: "#1b2a47",
                                          color: "#ffffff"
                                        }}
                                      >
                                        READ MORE
                                      </a>
                                    ) : (
                                      <button
                                        className="rbt-btn hover-appear-element bottom-position text-center rbt-btn-sm d-block has-left-icon rbt-cart-sidenav-activation"
                                        onClick={() => handleAddToCart(variant.id, product.id)}
                                        disabled={addingId === product.id}
                                        style={{
                                          border: "none",
                                          left: "16px",
                                          right: "16px",
                                          width: "calc(100% - 32px)",
                                          borderRadius: "50px",
                                          cursor: "pointer",
                                          margin: "0 auto",
                                        }}
                                      >
                                        <i className="fa-regular fa-cart-shopping"></i> {addingId === product.id ? "Adding..." : "Add To Cart"}
                                      </button>
                                    )
                                  )}
                                </div>
                                <div className="rbt-card-body rbt-card-body-center-align">
                                  <a href="/shop" className="rbt-card-subtitle rbt-card-catagories-text">
                                    {getParentCategoryName(product.categories || [], categories)}
                                  </a>
                                  <h2 className="rbt-card-title product-title-clamp">
                                    <a href={`/product/${product.handle || product.id}`}>{product.title}</a>
                                  </h2>
                                  <div className="pricing-part">
                                    <span className="price-text">{pricing.display}</span>

                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}


                  </>
                );
              })()}
            </>
          )}

          <div className="text-center mt--30 mb--36">
            <a className="rbt-btn btn-premium rbt-btn-md px-5 !rounded-full" href="/shop" style={{ borderRadius: "10px" }}>View Full Catalog</a>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="rbt-component-area rbt-section-gap rbt-bg-color-gray-light reveal">
        <div className="container">
          <div className="row row--12 mt_dec--24 justify-content-center">
            <div className="col-lg-3 col-md-6 col-sm-6 col-6 mt--24 reveal reveal-delay-1">
              <div className="trust-card text-center bg-white p-4 rbt-rounded--16 h-100 card-hover-effect">
                <div className="trust-icon-wrapper"><i className="fa-solid fa-truck-fast"></i></div>
                <h4 className="trust-title h6 font-bold mb--8">Free Express Delivery</h4>
                <p className="trust-text b3 text-muted">Free shipping on orders above ₹499 directly from hubs across India.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-6 mt--24 reveal reveal-delay-2">
              <div className="trust-card text-center bg-white p-4 rbt-rounded--16 h-100 card-hover-effect">
                <div className="trust-icon-wrapper"><i className="fa-solid fa-rotate-left"></i></div>
                <h4 className="trust-title h6 font-bold mb--8">100% Quality Guarantee</h4>
                <p className="trust-text b3 text-muted">Each board and sensor is batch-tested for pin continuity and voltage stability.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-6 mt--24 reveal reveal-delay-3">
              <div className="trust-card text-center bg-white p-4 rbt-rounded--16 h-100 card-hover-effect">
                <div className="trust-icon-wrapper"><i className="fa-solid fa-lock"></i></div>
                <h4 className="trust-title h6 font-bold mb--8">Secure Payments</h4>
                <p className="trust-text b3 text-muted">Protected transactions via UPI, card, net banking, or secure cash on delivery.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-6 mt--24 reveal reveal-delay-4">
              <div className="trust-card text-center bg-white p-4 rbt-rounded--16 h-100 card-hover-effect">
                <div className="trust-icon-wrapper"><i className="fa-solid fa-headset"></i></div>
                <h4 className="trust-title h6 font-bold mb--8">Dedicated Student Support</h4>
                <p className="trust-text b3 text-muted">Expert technical engineers to resolve datasheet questions or circuit assembly queries.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Electronic Accessories Banner Component */}
      <PromoBanner />

      {/* Google Reviews Section */}
      <GoogleReviewsSection />

      {/* Brand Logos Marquee */}
      <Brand />

      {/* Newsletter */}
      <NewsletterSection />
    </>
  );
}
