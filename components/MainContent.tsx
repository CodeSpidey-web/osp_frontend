"use client";
import { useEffect, useState } from "react";
import { getProducts, getCategories, MedusaProduct, MedusaCategory, getValidImageUrl } from "@/lib/medusa";
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
  const [popularTab, setPopularTab] = useState<'week' | 'month' | 'year' | 'all'>('week');

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
            <div className="row row--12 mt_dec--24 justify-content-center rbt-mobile-row">
              {categories.slice(0, 8).map((cat, i) => {

                if (i === 3) {
                  return (
                    <div key={cat.id} className="col-lg-2-5 col-lg-8 col-md-8 col-sm-12 col-6 mt--24 reveal">
                      <div className="rbt-cat-box rbt-cat-box-5 rbt-card-has-animated wider-coloumn">
                        <div className="inner">
                          <div className="rbt-image-portion">
                            <a href={`/shop?category_id=${cat.id}`}>
                              <img src="/assets/images/catagory-img/cat-bg-electro-c-lg-01.webp" alt={cat.name} />
                            </a>
                          </div>
                          <div className="content">
                            <div className="top-content">
                              <span className="rbt-badge rbt-badge-small">EXCLUSIVE</span>
                              <p className="subtitle">NEW ARRIVALS</p>
                              <h2 className="title h5"><span className="rbt-bold--text">{cat.name}</span></h2>
                            </div>
                            <div className="bottom-content">
                              <a href={`/shop?category_id=${cat.id}`} className="rbt-btn rbt-btn-white rbt-btn-md">
                                See Collection
                              </a>
                            </div>
                          </div>
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
                }

                if (i === 5) {
                  return (
                    <div key={cat.id} className="col-lg-2-5 col-lg-8 col-md-8 col-sm-12 col-6 mt--24 reveal">
                      <div className="rbt-cat-box rbt-cat-box-5 rbt-card-has-animated wider-coloumn">
                        <div className="inner">
                          <div className="rbt-image-portion">
                            <a href={`/shop?category_id=${cat.id}`}>
                              <img src="/assets/images/catagory-img/cat-bg-electro-c-lg-02.webp" alt={cat.name} />
                            </a>
                          </div>
                          <div className="content">
                            <div className="top-content">
                              <span className="rbt-badge rbt-badge-small">TRENDING</span>
                              <p className="subtitle">ONLINE EXCLUSIVE</p>
                              <h2 className="title h5"><span className="rbt-bold--text">{cat.name}</span></h2>
                            </div>
                            <div className="bottom-content">
                              <a href={`/shop?category_id=${cat.id}`} className="rbt-btn rbt-marquee-btn marquee-auto rbt-btn-white rbt-btn-md">
                                <span data-text="View All The Trending Collection">
                                  View All The Trending Collection
                                </span>
                              </a>
                            </div>
                          </div>
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
                }

                return (
                  <div key={cat.id} className={`col-lg-1-5 col-lg-4 col-md-4 col-sm-12 col-6 mt--24 reveal reveal-delay-${(i % 4) + 1}`}>
                    <div className="rbt-cat-box rbt-cat-box-5 rbt-card-has-animated text-center">
                      <div className="inner">
                        <div className="rbt-image-portion">
                          <a href={`/shop?category_id=${cat.id}`}>
                            <img src={`/assets/images/catagory-img/cat-bg-electro-c-0${(i % 6) + 1}.webp`} alt={cat.name} />
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
      )}

      {/* Popular Products Area */}
      <div className="rbt-component-area rbt-products-area rbt-bg-color-white rbt-section-gapTop reveal">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-between flex-row align-items-center flex-wrap rbt-gap--16 mb--32">
              <div className="rbt-component-section-title rbt-gap--4 p-0 mb--0 border-0">
                <h2 className="rbt-title rbt-scroll-trigger fade_in animation-order-1">
                  <span className="rbt-bold--text">Popular products</span>
                </h2>
              </div>

              <div className="mobile-horizontal-scroll-section">
                <div className="rbt-product-nav-section rbt-nav-effect-activation rbt-scroll-trigger fade_in animation-order-2 justify-content-center">
                  <ul className="rbt-product-nav-grp">
                    <li>
                      <button
                        type="button"
                        className={`rbt-product-nav ${popularTab === 'week' ? 'active' : ''}`}
                        onClick={() => setPopularTab('week')}
                      >
                        This Week
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className={`rbt-product-nav ${popularTab === 'month' ? 'active' : ''}`}
                        onClick={() => setPopularTab('month')}
                      >
                        This Month
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className={`rbt-product-nav ${popularTab === 'year' ? 'active' : ''}`}
                        onClick={() => setPopularTab('year')}
                      >
                        This Year
                      </button>
                    </li>
                  </ul>
                  <ul className="rbt-product-nav-grp">
                    <li>
                      <button
                        type="button"
                        className={`rbt-product-nav ${popularTab === 'all' ? 'active' : ''}`}
                        onClick={() => setPopularTab('all')}
                      >
                        All Time
                      </button>
                    </li>
                  </ul>
                  <span className="rbt-bg-highlight"></span>
                </div>
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
                const getFilteredPopularProducts = () => {
                  if (!products || products.length === 0) return [];
                  const list = [...products];
                  if (popularTab === 'month') {
                    return list.reverse();
                  } else if (popularTab === 'year') {
                    return list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
                  } else if (popularTab === 'all') {
                    return list;
                  }
                  return list;
                };

                const displayProducts = getFilteredPopularProducts();

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
                                  />
                                </div>
                                <div className="rbt-product-banner-content w-100">
                                  <div className="rbt-content-section">
                                    <p className="rbt-banner-subtitle mb-0">SALE UPTO 70%</p>
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
                            const price = variant?.prices?.[0];
                            const calculated = variant?.calculated_price;
                            const displayPrice = calculated ? calculated.calculated_amount : price?.amount;
                            const originalPrice = calculated?.original_amount;
                            const fallbackImg = `/assets/images/product-img/electronics/electro-c-0${(pi % 6) + 1}.webp`;

                            return (
                              <div key={product.id} className="col-lg-6 col-6 mt--24 d-flex">
                                <div className="rbt-card rbt-product-card rbt-scroll-trigger fade_in w-100 h-100 d-flex flex-column justify-content-between">
                                  <div className="rbt-card-img rbt-rounded--12 rbt-scroll-trigger zoom_in flex-grow-1 d-flex align-items-center justify-content-center" style={{ minHeight: '320px', background: '#ffffff' }}>
                                    <a href={`/product/${product.handle || product.id}`} className="w-100 h-100 d-flex align-items-center justify-content-center">
                                      <img
                                        src={getValidImageUrl(product.thumbnail || product.images?.[0]?.url, fallbackImg, product.handle)}
                                        alt={product.title}
                                        style={{ maxHeight: '280px', objectFit: 'contain' }}
                                        onError={(e) => {
                                          e.currentTarget.onerror = null;
                                          e.currentTarget.src = fallbackImg;
                                        }}
                                      />
                                    </a>
                                    <div className="rbt-product-badge rbt-product-badge-bg-primary rbt-badge-top-left--position">
                                      SALE
                                    </div>
                                    <button
                                      className="rbt-wishlisted-btn rbt-round-btn bg-light-one rbt-top-right--position tooltips"
                                      type="button"
                                      data-tooltip="Add to wishlist"
                                      data-tooltip-position="left"
                                    >
                                      <i className="fa-regular fa-heart"></i>
                                    </button>
                                    {variant && (
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
                                    )}
                                  </div>
                                  <div className="rbt-card-body rbt-card-body-center-align">
                                    <a href="/categories" className="rbt-card-subtitle rbt-card-catagories-text">
                                      {product.collection?.title || "Electronic Components"}
                                    </a>
                                    <h2 className="rbt-card-title">
                                      <a href={`/product/${product.handle || product.id}`}>{product.title}</a>
                                    </h2>
                                    <div className="rbt-card-rating">
                                      <ul className="rbt-rating-icon-list">
                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                        <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                      </ul>
                                      <p className="rating-digit">(25)</p>
                                      <span className="icon"><i className="fa-sharp fa-solid fa-truck-fast"></i></span>
                                    </div>
                                    <div className="pricing-part">
                                      {originalPrice && originalPrice !== displayPrice && (
                                        <del className="price-text">{formatPrice(originalPrice)}</del>
                                      )}
                                      <span className="price-text">{formatPrice(displayPrice || 0)}</span>
                                      <span className="rbt-offer-badge">-30%</span>
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
                        {displayProducts.slice(2).map((product, pi) => {
                          const variant = product.variants?.[0];
                          const price = variant?.prices?.[0];
                          const calculated = variant?.calculated_price;
                          const displayPrice = calculated ? calculated.calculated_amount : price?.amount;
                          const originalPrice = calculated?.original_amount;
                          const fallbackImg = `/assets/images/product-img/electronics/electro-c-0${((pi + 2) % 6) + 1}.webp`;

                          return (
                            <div key={product.id} className="col-lg-3 col-6 mt--24">
                              <div className="rbt-card rbt-product-card rbt-scroll-trigger fade_in">
                                <div className="rbt-card-img rbt-rounded--12 rbt-scroll-trigger zoom_in">
                                  <a href={`/product/${product.handle || product.id}`}>
                                    <img
                                      src={getValidImageUrl(product.thumbnail || product.images?.[0]?.url, fallbackImg, product.handle)}
                                      alt={product.title}
                                      onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = fallbackImg;
                                      }}
                                    />
                                  </a>
                                  <div className="rbt-product-badge rbt-product-badge-bg-primary rbt-badge-top-left--position">
                                    SALE
                                  </div>
                                  <button
                                    className="rbt-wishlisted-btn rbt-round-btn bg-light-one rbt-top-right--position tooltips"
                                    type="button"
                                    data-tooltip="Add to wishlist"
                                    data-tooltip-position="left"
                                  >
                                    <i className="fa-regular fa-heart"></i>
                                  </button>
                                  {variant && (
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
                                  )}
                                </div>
                                <div className="rbt-card-body rbt-card-body-center-align">
                                  <a href="/categories" className="rbt-card-subtitle rbt-card-catagories-text">
                                    {product.collection?.title || "Electronic Components"}
                                  </a>
                                  <h2 className="rbt-card-title">
                                    <a href={`/product/${product.handle || product.id}`}>{product.title}</a>
                                  </h2>
                                  <div className="rbt-card-rating">
                                    <ul className="rbt-rating-icon-list">
                                      <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                      <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                      <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                      <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                      <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                    </ul>
                                    <p className="rating-digit">(25)</p>
                                    <span className="icon"><i className="fa-sharp fa-solid fa-truck-fast"></i></span>
                                  </div>
                                  <div className="pricing-part">
                                    {originalPrice && originalPrice !== displayPrice && (
                                      <del className="price-text">{formatPrice(originalPrice)}</del>
                                    )}
                                    <span className="price-text">{formatPrice(displayPrice || 0)}</span>
                                    <span className="rbt-offer-badge">-30%</span>
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
