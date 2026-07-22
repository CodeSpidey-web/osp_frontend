"use client";
import { useEffect, useState } from "react";
import { getProducts, getCategories, MedusaProduct, MedusaCategory } from "@/lib/medusa";
import { useCart } from "@/lib/CartContext";

function formatPrice(amount: number, currencyCode: string = "inr") {
  if (!amount) return "₹0.00";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}

export default function MainContent() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<MedusaProduct[]>([]);
  const [categories, setCategories] = useState<MedusaCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [selectedBuildTopic, setSelectedBuildTopic] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts({ limit: 8 }),
          getCategories(),
        ]);
        setProducts(productsData.products || []);
        setCategories(categoriesData || []);
      } catch (err) {
        console.error("Failed to load homepage data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

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

  // Recommended Category based on project filter selection
  const handleBuildTopicClick = (topic: string, catName: string) => {
    setSelectedBuildTopic(topic);
    const matchedCat = categories.find(c => c.name.toLowerCase().includes(catName.toLowerCase()));
    if (matchedCat) {
      setTimeout(() => {
        window.location.href = `/shop?category_id=${matchedCat.id}`;
      }, 800);
    } else {
      setTimeout(() => {
        window.location.href = `/shop`;
      }, 800);
    }
  };

  return (
    <>
      <style>{`
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
      `}</style>

      {/* Hero Section */}
      <div className="premium-hero">
        <div className="glowing-circle gc-1"></div>
        <div className="glowing-circle gc-2"></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 pr--50">
              <div className="hero-glass-card">
                <span className="hero-badge mb--16">INDIA'S STUDENT PROJECT HUB</span>
                <h1 className="hero-title text-gradient font-bold h2 mb--20 leading-tight">
                  High-Quality Electronics for Innovation & Prototyping
                </h1>
                <p className="hero-desc text-white-50 b1 mb--32">
                  Get premium microcontrollers, sensors, modules, development boards, and DIY kits. Super-fast shipping, fully validated inventory, and 100% responsive customer support.
                </p>
                <div className="rbt-banner-btn gap-3 d-flex flex-wrap">
                  <a className="rbt-btn btn-premium rbt-btn-lg" href="/shop">Start Building</a>
                  <a className="rbt-btn rbt-btn-border rbt-btn-lg text-white" href="#topic-finder" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>DIY Kits Finder</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0 text-center position-relative">
              <div className="rbt-product-img bg-transparent">
                <video autoPlay loop muted playsInline preload="metadata" style={{ maxHeight: '600px', width: '100%', borderRadius: '16px', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))' }}>
                  <source src="/assets/videos/hero-video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Project Finder Section */}
      <div className="rbt-component-area rbt-section-gap rbt-bg-color-white reveal" id="topic-finder">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="rbt-component-section-title border-0 p-0 mb--32">
                <span className="subtitle text-primary font-bold">INTERACTIVE FINDER</span>
                <h2 className="rbt-title mt--8">What are you <span className="rbt-bold--text">building today?</span></h2>
                <p className="b2 text-muted mt--8">Select your project focus area and we will highlight the exact component collections you need.</p>
              </div>
              <div className="d-flex flex-wrap justify-content-center gap-3 mt--16">
                <button className={`interactive-tag ${selectedBuildTopic === 'boards' ? 'active' : ''}`} onClick={() => handleBuildTopicClick('boards', 'development')}>
                  <i className="fa-solid fa-microchip mr--8"></i> Microcontrollers & Boards
                </button>
                <button className={`interactive-tag ${selectedBuildTopic === 'kits' ? 'active' : ''}`} onClick={() => handleBuildTopicClick('kits', 'starter')}>
                  <i className="fa-solid fa-graduation-cap mr--8"></i> IoT & DIY Starter Kits
                </button>
                <button className={`interactive-tag ${selectedBuildTopic === 'sensors' ? 'active' : ''}`} onClick={() => handleBuildTopicClick('sensors', 'sensors')}>
                  <i className="fa-solid fa-radar mr--8"></i> Sensors & Modules
                </button>
                <button className={`interactive-tag ${selectedBuildTopic === 'cables' ? 'active' : ''}`} onClick={() => handleBuildTopicClick('cables', 'cables')}>
                  <i className="fa-solid fa-plug mr--8"></i> Cables & Adapters
                </button>
              </div>
              {selectedBuildTopic && (
                <div className="mt--24 text-success font-semibold animation-fade-in">
                  <span className="spinner-border spinner-border-sm mr--8" role="status"></span>
                  Redirecting to matching products...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      {categories.length > 0 && (
        <div className="rbt-component-area rbt-catagories-area rbt-section-gapTop rbt-bg-color-gray-light pb--80 reveal">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mb--32">
                <div className="rbt-component-section-title text-center border-0 p-0">
                  <span className="subtitle text-primary font-bold">POPULAR CATEGORIES</span>
                  <h2 className="rbt-title mt--8">
                    Browse By <span className="rbt-bold--text">Engineering Component</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row row--12 mt_dec--24 justify-content-center">
              {categories.map((cat, i) => (
                <div key={cat.id} className={`col-lg-3 col-md-4 col-sm-6 col-12 mt--24 reveal reveal-delay-${(i % 4) + 1}`}>
                  <div className="rbt-cat-box rbt-cat-box-5 card-hover-effect text-center bg-white p-4 rbt-rounded--16">
                    <div className="inner">
                      <div className="rbt-image-portion mb--16 overflow-hidden rbt-rounded--12">
                        <a href={`/shop?category_id=${cat.id}`}>
                          <img src={`/assets/images/catagory-img/cat-bg-electro-c-0${(i % 6) + 1}.webp`} alt={cat.name} className="product-grid-image w-100" />
                        </a>
                      </div>
                      <h4 className="h6 font-bold" style={{marginBottom: '40px'}}>{cat.name}</h4>
                      <a href={`/shop?category_id=${cat.id}`} className="rbt-btn btn-premium rbt-btn-sm w-100">
                        Explore
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Products Grid */}
      <div className="rbt-component-area rbt-products-area rbt-bg-color-white rbt-section-gap reveal">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb--40">
              <div className="rbt-component-section-title text-center border-0 p-0">
                <span className="subtitle text-primary font-bold">OUR COMPONENTS INVENTORY</span>
                <h2 className="rbt-title mt--8">
                  Highly Requested <span className="rbt-bold--text">Project Essentials</span>
                </h2>
                <p className="b2 text-muted mt--8">All products are actively stocked and shipped with technical documentation reference guides.</p>
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
            <div className="row row--12">
              {products.map((product, pi) => {
                const variant = product.variants?.[0];
                const price = variant?.prices?.[0];
                const calculated = variant?.calculated_price;
                const displayPrice = calculated ? calculated.calculated_amount : price?.amount;
                const originalPrice = calculated?.original_amount;

                return (
                  <div key={product.id} className={`col-lg-3 col-md-4 col-6 mt--24 reveal reveal-delay-${(pi % 4) + 1}`}>
                    <div className="rbt-card rbt-product-card card-hover-effect h-100 bg-white rbt-rounded--16 overflow-hidden d-flex flex-column">
                      <div className="rbt-card-img position-relative overflow-hidden">
                        <a href={`/product/${product.handle || product.id}`}>
                          <img
                            src={product.thumbnail || product.images?.[0]?.url || "/assets/images/product-img/electronics/electro-c-01.webp"}
                            alt={product.title}
                            className="product-grid-image w-100"
                          />
                        </a>
                      </div>
                      <div className="rbt-card-body p-4 d-flex flex-column flex-grow-1 justify-content-between">
                        <div>
                          {product.collection && (
                            <span className="rbt-card-subtitle rbt-card-catagories-text text-primary text-uppercase font-semibold tracking-wider d-block mb--8" style={{ fontSize: '0.75rem' }}>
                              {product.collection.title}
                            </span>
                          )}
                          <h3 className="rbt-card-title h6 font-bold mb--12">
                            <a href={`/product/${product.handle || product.id}`} className="text-dark hover-text-primary">
                              {product.title}
                            </a>
                          </h3>
                        </div>
                        <div>
                          <div className="pricing-part mb--16 d-flex align-items-center gap-2">
                            {originalPrice && originalPrice !== displayPrice && (
                              <del className="text-muted" style={{ fontSize: '0.875rem' }}>{formatPrice(originalPrice)}</del>
                            )}
                            <span className="price-text text-success font-bold" style={{ fontSize: '1.125rem' }}>{formatPrice(displayPrice || 0)}</span>
                          </div>
                          {variant && (
                            <button
                              className="rbt-btn btn-premium rbt-btn-sm w-100 d-flex align-items-center justify-content-center gap-2"
                              onClick={() => handleAddToCart(variant.id, product.id)}
                              disabled={addingId === product.id}
                              style={{ border: 'none', cursor: 'pointer' }}
                            >
                              <i className="fa-regular fa-cart-shopping"></i>
                              {addingId === product.id ? "Adding..." : "Add To Cart"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-center mt--48">
            <a className="rbt-btn btn-premium rbt-btn-md px-5" href="/shop">View Full Catalog</a>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="rbt-component-area rbt-section-gap rbt-bg-color-gray-light reveal">
        <div className="container">
          <div className="row row--12 mt_dec--24 justify-content-center">
            <div className="col-lg-3 col-md-6 col-sm-6 mt--24 reveal reveal-delay-1">
              <div className="trust-card text-center bg-white p-4 rbt-rounded--16 h-100 card-hover-effect">
                <div className="trust-icon-wrapper"><i className="fa-solid fa-truck-fast"></i></div>
                <h4 className="trust-title h6 font-bold mb--8">Free Express Delivery</h4>
                <p className="trust-text b3 text-muted">Free shipping on orders above ₹499 directly from hubs across India.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mt--24 reveal reveal-delay-2">
              <div className="trust-card text-center bg-white p-4 rbt-rounded--16 h-100 card-hover-effect">
                <div className="trust-icon-wrapper"><i className="fa-solid fa-rotate-left"></i></div>
                <h4 className="trust-title h6 font-bold mb--8">100% Quality Guarantee</h4>
                <p className="trust-text b3 text-muted">Each board and sensor is batch-tested for pin continuity and voltage stability.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mt--24 reveal reveal-delay-3">
              <div className="trust-card text-center bg-white p-4 rbt-rounded--16 h-100 card-hover-effect">
                <div className="trust-icon-wrapper"><i className="fa-solid fa-lock"></i></div>
                <h4 className="trust-title h6 font-bold mb--8">Secure Payments</h4>
                <p className="trust-text b3 text-muted">Protected transactions via UPI, card, net banking, or secure cash on delivery.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mt--24 reveal reveal-delay-4">
              <div className="trust-card text-center bg-white p-4 rbt-rounded--16 h-100 card-hover-effect">
                <div className="trust-icon-wrapper"><i className="fa-solid fa-headset"></i></div>
                <h4 className="trust-title h6 font-bold mb--8">Dedicated Student Support</h4>
                <p className="trust-text b3 text-muted">Expert technical engineers to resolve datasheet questions or circuit assembly queries.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="rbt-component-area rbt-section-gap rbt-bg-color-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center bg-white p-5" style={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <span className="hero-badge mb--16">MAKER COMMUNITY</span>
                <h3 className="rbt-title mb--12 h4">
                  Join the Maker <span className="rbt-bold--text text-primary">Community</span>
                </h3>
                <p className="mb--24 text-muted b2" style={{ maxWidth: '540px', margin: '0 auto' }}>
                  Subscribe to receive schematics, new sensor datasheets, and exclusive student project coupon codes.
                </p>
                <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="d-flex mx-auto" style={{ maxWidth: '480px', gap: '12px' }}>
                    <input 
                      type="email" 
                      placeholder="Enter college/personal email" 
                      className="form-control bg-white" 
                      required 
                      style={{ 
                        height: '46px', 
                        borderRadius: '8px', 
                        border: '1px solid #cbd5e1', 
                        padding: '10px 16px',
                        fontSize: '0.92rem',
                        boxShadow: 'none',
                        outline: 'none',
                        background: '#ffffff'
                      }} 
                    />
                    <button 
                      type="submit" 
                      className="btn" 
                      style={{ 
                        background: '#136c39', 
                        color: '#ffffff', 
                        fontWeight: '600', 
                        borderRadius: '8px', 
                        padding: '0 24px',
                        height: '46px',
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        border: 'none'
                      }}
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
