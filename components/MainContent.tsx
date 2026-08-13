"use client";
import { useEffect, useState, useRef } from "react";
import { getProducts, getCategories, MedusaProduct, MedusaCategory, getValidImageUrl, fetchApi, getVariantPrice, isProjectProduct } from "@/lib/medusa";
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

interface UseInfiniteCarouselOptions {
  itemCount: number;
  autoplayInterval?: number;
}

function useInfiniteCarousel({ itemCount, autoplayInterval = 3000 }: UseInfiniteCarouselOptions) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);
  const isTransitioningRef = useRef(false);

  // Helper to calculate N-item set width from DOM
  const getSetWidth = () => {
    const container = scrollRef.current;
    if (!container || container.children.length < itemCount || itemCount === 0) return 0;
    const parentRect = container.getBoundingClientRect();
    const targetChild = container.children[itemCount] as HTMLElement;
    if (!targetChild) return 0;
    const childRect = targetChild.getBoundingClientRect();
    return childRect.left - parentRect.left + container.scrollLeft;
  };

  // Perform instant boundary reset if needed
  const checkAndResetBoundary = () => {
    const container = scrollRef.current;
    if (!container || itemCount === 0) return;
    const setWidth = getSetWidth();
    if (setWidth === 0) return;

    const { scrollLeft } = container;

    if (scrollLeft >= setWidth * 2) {
      container.style.scrollBehavior = 'auto';
      const newScroll = scrollLeft - setWidth;
      container.scrollLeft = newScroll;
      scrollTargetRef.current = newScroll;
      void container.offsetHeight; // force reflow
      container.style.scrollBehavior = 'smooth';
    } else if (scrollLeft < setWidth) {
      container.style.scrollBehavior = 'auto';
      const newScroll = scrollLeft + setWidth;
      container.scrollLeft = newScroll;
      scrollTargetRef.current = newScroll;
      void container.offsetHeight; // force reflow
      container.style.scrollBehavior = 'smooth';
    }
  };

  // Handle scrollend event
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let fallbackTimeout: NodeJS.Timeout;
    const handleScrollEnd = () => {
      isTransitioningRef.current = false;
      checkAndResetBoundary();
    };

    const onScroll = () => {
      clearTimeout(fallbackTimeout);
      fallbackTimeout = setTimeout(handleScrollEnd, 100);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    container.addEventListener('scrollend', handleScrollEnd, { passive: true });

    return () => {
      container.removeEventListener('scroll', onScroll);
      container.removeEventListener('scrollend', handleScrollEnd);
      clearTimeout(fallbackTimeout);
    };
  }, [itemCount]);

  // Initialize scroll position to start of second set
  const initializeScrollPosition = () => {
    const container = scrollRef.current;
    if (!container || itemCount === 0) return;

    requestAnimationFrame(() => {
      const setWidth = getSetWidth();
      if (setWidth > 0) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = setWidth;
        scrollTargetRef.current = setWidth;
        void container.offsetHeight; // force reflow
        container.style.scrollBehavior = 'smooth';
      }
    });
  };

  // Run initialization when itemCount changes
  useEffect(() => {
    initializeScrollPosition();
  }, [itemCount]);

  // Programmatic scroll (Next / Previous buttons)
  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container || itemCount === 0) return;

    const setWidth = getSetWidth();
    if (setWidth === 0) return;

    if (scrollTargetRef.current === null) {
      scrollTargetRef.current = container.scrollLeft;
    }

    const currentScroll = container.scrollLeft;
    if (currentScroll >= setWidth * 2 || currentScroll < setWidth) {
      checkAndResetBoundary();
    }

    const computedStyle = window.getComputedStyle(container);
    const gap = parseFloat(computedStyle.gap) || 0;
    const clientWidth = container.clientWidth;
    const firstItem = container.querySelector('.osp-cat-item') as HTMLElement;
    const itemWidth = firstItem ? firstItem.offsetWidth : 150;
    const scrollAmount = itemWidth + gap;

    let target = scrollTargetRef.current;
    if (direction === 'left') {
      target -= scrollAmount;
    } else {
      target += scrollAmount;
    }

    const maxScroll = container.scrollWidth - clientWidth;
    target = Math.max(0, Math.min(target, maxScroll));

    scrollTargetRef.current = target;
    isTransitioningRef.current = true;
    container.scrollTo({ left: target, behavior: 'smooth' });
  };

  // Autoplay interval
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || itemCount === 0) return;

    const intervalId = setInterval(() => {
      if (isHoveredRef.current || isTransitioningRef.current) return;

      const setWidth = getSetWidth();
      if (setWidth === 0) return;

      if (scrollTargetRef.current === null) {
        scrollTargetRef.current = container.scrollLeft;
      }

      const currentScroll = container.scrollLeft;
      if (currentScroll >= setWidth * 2 || currentScroll < setWidth) {
        checkAndResetBoundary();
      }

      const computedStyle = window.getComputedStyle(container);
      const gap = parseFloat(computedStyle.gap) || 0;
      const firstItem = container.querySelector('.osp-cat-item') as HTMLElement;
      const itemWidth = firstItem ? firstItem.offsetWidth : 150;
      const scrollAmount = itemWidth + gap;

      let target = scrollTargetRef.current + scrollAmount;
      const maxScroll = container.scrollWidth - container.clientWidth;
      target = Math.max(0, Math.min(target, maxScroll));

      scrollTargetRef.current = target;
      isTransitioningRef.current = true;
      container.scrollTo({ left: target, behavior: 'smooth' });
    }, autoplayInterval);

    return () => clearInterval(intervalId);
  }, [itemCount, autoplayInterval]);

  return {
    scrollRef,
    isHoveredRef,
    scroll,
    initializeScrollPosition
  };
}

interface MainContentProps {
  initialProducts?: MedusaProduct[];
  initialCategories?: MedusaCategory[];
  initialCategoryImages?: Record<string, string>;
  initialLatestProducts?: MedusaProduct[];
  initialPopularCategories?: any[];
  initialExploreProjects?: any[];
}

export default function MainContent({
  initialProducts = [],
  initialCategories = [],
  initialCategoryImages = {},
  initialLatestProducts = [],
  initialPopularCategories = [],
  initialExploreProjects = [],
}: MainContentProps) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<MedusaProduct[]>(initialProducts);
  const [categories, setCategories] = useState<MedusaCategory[]>(initialCategories);
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>(initialCategoryImages);
  const [latestProducts, setLatestProducts] = useState<MedusaProduct[]>(initialLatestProducts);
  const [popularCategories, setPopularCategories] = useState<any[]>(initialPopularCategories);
  const [exploreProjects, setExploreProjects] = useState<any[]>(initialExploreProjects);
  const [loading, setLoading] = useState(initialProducts.length === 0);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [inventoryMap, setInventoryMap] = useState<Record<string, number>>({});

  const displayCategories = popularCategories.length > 0 ? popularCategories : categories.filter(
    cat => !cat.parent_category_id && cat.name?.toLowerCase() !== 'uncategorized'
  );
  const displayExplore = exploreProjects.length > 0 ? exploreProjects : [];

  const {
    scrollRef: popularCategoriesScrollRef,
    isHoveredRef: isPopularHoveredRef,
    scroll: scrollPopularCategories
  } = useInfiniteCarousel({
    itemCount: displayCategories.length,
    autoplayInterval: 3000
  });

  const {
    scrollRef: exploreProjectsScrollRef,
    isHoveredRef: isExploreHoveredRef,
    scroll: scrollExploreProjects
  } = useInfiniteCarousel({
    itemCount: displayExplore.length,
    autoplayInterval: 3000
  });

  useEffect(() => {
    if (initialProducts.length > 0) {
      return;
    }
    async function fetchData() {
      try {
        const [productsData, categoriesData, latestProductsData, popularCategoriesData, exploreProjectsData] = await Promise.all([
          getProducts({ limit: 24 }),
          getCategories(),
          fetchApi<{ products: MedusaProduct[] }>("/store/latest-products").catch(() => ({ products: [] })),
          fetchApi<{ popular_categories: any[] }>("/store/popular-categories").catch(() => ({ popular_categories: [] })),
          fetchApi<{ explore_projects: any[] }>("/store/explore-projects").catch(() => ({ explore_projects: [] })),
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
        setExploreProjects(exploreProjectsData.explore_projects || []);
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
                  <i className="fa-solid fa-award"></i>
                </div>
                <div className="text-start">
                  <h6 className="feature-title d-none d-sm-block">Premium Quality</h6>
                  <h6 className="feature-title d-block d-sm-none">High Quality</h6>
                  <p className="feature-subtitle">Premium grade components</p>
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

      {/* Categories Carousel */}
      {(() => {
        const displayCategories = popularCategories.length > 0 ? popularCategories : categories.filter(
          cat => !cat.parent_category_id && cat.name?.toLowerCase() !== 'uncategorized'
        );
        return displayCategories.length > 0 && (
          <div className="rbt-component-area rbt-catagories-area rbt-section-gapTop rbt-bg-color-gray-light pb--30 reveal" style={{ paddingTop: '60px' }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12 mb--24">
                  <div className="rbt-component-section-title text-center border-0 p-0">
                    <div>
                      <span className="osp-brand-chip">POPULAR CATEGORIES</span>
                    </div>
                    <h2 className="rbt-title mt--4">
                      Shop By <span className="rbt-bold--text text-success">Category</span>
                    </h2>
                  </div>
                </div>
              </div>

              {/* Custom CSS Style Injection for the premium pill categories bar */}
              <style dangerouslySetInnerHTML={{
                __html: `
                .osp-popular-categories-bar-wrapper {
                  position: relative;
                  background-color: #136c39;
                  border-radius: 9999px;
                  height: 120px;
                  margin-top: 220px;
                  display: flex;
                  align-items: center;
                  box-shadow: 0 10px 25px -5px rgba(19, 108, 57, 0.3);
                }
                
                @media (max-width: 991px) {
                  .osp-popular-categories-bar-wrapper {
                    border-radius: 24px;
                    height: 100px;
                    margin-top: 160px;
                  }
                }

                .osp-scroll-wrapper {
                  margin: 0 70px;
                  overflow: hidden;
                  height: 475px;
                  margin-top: -355px;
                  padding-top: 80px;
                  flex: 1;
                  min-width: 0;
                }

                .osp-scroll-container {
                  display: flex;
                  gap: 32px;
                  overflow-x: auto;
                  overflow-y: visible;
                  width: 100%;
                  height: 100%;
                  scrollbar-width: none;
                  -ms-overflow-style: none;
                  scroll-snap-type: x mandatory;
                  scroll-padding: 0;
                }

                .osp-scroll-container::-webkit-scrollbar {
                  display: none;
                }

                .osp-cat-item {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: space-between;
                  flex: 0 0 calc((100% - 96px) / 4);
                  width: calc((100% - 96px) / 4);
                  min-width: 0;
                  height: 350px;
                  text-decoration: none !important;
                  position: relative;
                  scroll-snap-align: start;
                }

                @media (max-width: 991px) {
                  .osp-scroll-wrapper {
                    margin: 0 48px;
                    height: 350px;
                    margin-top: -250px;
                    padding-top: 60px;
                  }
                  .osp-scroll-container {
                    gap: 24px;
                  }
                  .osp-cat-item {
                    flex: 0 0 calc((100% - 48px) / 3);
                    width: calc((100% - 48px) / 3);
                    min-width: 0;
                    height: 240px;
                  }
                  @media (max-width: 767px) {
                    .osp-popular-categories-bar-wrapper {
                      height: 50px;
                      margin-top: 160px;
                    }
                    .osp-scroll-wrapper {
                      margin: 0 40px;
                      height: 280px;
                      margin-top: -210px;
                      padding-top: 45px;
                    }
                    .osp-scroll-container {
                      gap: 16px;
                    }
                    .osp-cat-item {
                      flex: 0 0 calc((100% - 16px) / 2);
                      width: calc((100% - 16px) / 2);
                      min-width: 0;
                      height: 100%;
                    }
                  }
                }

                .osp-cat-img-box {
                  width: 245px;
                  height: 245px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: relative;
                  margin-top: 10px;
                  background-color: #ffffff;
                  border: 2.5px solid #136c39;
                  border-radius: 16px;
                  padding: 4px;
                  box-shadow: 0 4px 15px rgba(19, 108, 57, 0.25), 0 0 10px rgba(19, 108, 57, 0.15);
                  overflow: hidden;
                  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .osp-cat-item:hover .osp-cat-img-box {
                  box-shadow: 0 8px 24px rgba(19, 108, 57, 0.45), 0 0 15px rgba(19, 108, 57, 0.25);
                  border-color: #22c55e;
                }

                @media (max-width: 991px) {
                  .osp-cat-img-box {
                    width: 170px;
                    height: 170px;
                    border-radius: 14px;
                    padding: 3px;
                  }
                }

                @media (max-width: 767px) {
                  .osp-cat-img-box {
                    width: 100%;
                    max-width: 145px;
                    height: auto;
                    aspect-ratio: 1 / 1;
                    border-radius: 12px;
                    padding: 2px;
                  }
                }

                .osp-cat-img-box img {
                  width: 100%;
                  height: 100%;
                  max-width: 100%;
                  max-height: 100%;
                  object-fit: contain;
                  border-radius: 14px;
                  transform: scale(1.0);
                  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                  mix-blend-mode: multiply;
                }

                .osp-cat-item:hover .osp-cat-img-box img {
                  transform: scale(1.1);
                }

                @media (max-width: 991px) {
                  .osp-cat-img-box img {
                    border-radius: 12px;
                  }
                  .osp-cat-item:hover .osp-cat-img-box img {
                    transform: scale(1.08);
                  }
                }

                @media (max-width: 767px) {
                  .osp-cat-img-box img {
                    border-radius: 10px;
                  }
                  .osp-cat-item:hover .osp-cat-img-box img {
                    transform: scale(1.08);
                  }
                }

                .osp-cat-name {
                  color: #ffffff;
                  font-size: 16px;
                  font-weight: 700;
                  margin-bottom: 24px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  width: 100%;
                  text-align: center;
                  z-index: 5;
                  position: relative;
                  transition: color 0.2s ease;
                }

                .osp-cat-item:hover .osp-cat-name {
                  color: #4ade80;
                }

                .osp-scroll-btn {
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  width: 44px;
                  height: 44px;
                  border-radius: 50%;
                  background-color: #ffffff;
                  border: none;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
                  z-index: 10;
                  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .osp-scroll-btn:hover {
                  transform: translateY(-50%) scale(1.1);
                  box-shadow: 0 6px 14px rgba(0,0,0,0.22);
                  background-color: #f8fafc;
                }

                .osp-scroll-btn-left {
                  left: 15px;
                }

                .osp-scroll-btn-right {
                  right: 15px;
                }

                .osp-scroll-btn i {
                  color: #136c39;
                  font-size: 16px;
                  font-weight: bold;
                }

                @media (max-width: 767px) {
                  .osp-scroll-btn {
                    width: 32px;
                    height: 32px;
                    top: 50%;
                  }
                  .osp-scroll-btn i {
                    font-size: 12px;
                  }
                  .osp-scroll-btn-left {
                    left: 10px;
                  }
                  .osp-scroll-btn-right {
                    right: 10px;
                  }
                  .osp-cat-name {
                    font-size: 13px;
                    font-weight: 700;
                    margin-bottom: 5px;
                    white-space: normal;
                    overflow: visible;
                    text-overflow: clip;
                    line-height: 1.2;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 40px;
                  }
                }

                /* Premium highlighted headers styling */
                .rbt-component-section-title h2.rbt-title,
                .osp-brand-title,
                .osp-reviews-title {
                  position: relative;
                  display: inline-block;
                  padding-bottom: 24px;
                  margin-bottom: 0 !important;
                  font-weight: 800 !important;
                }

                .rbt-component-section-title h2.rbt-title::after,
                .osp-brand-title::after,
                .osp-reviews-title::after {
                  content: '';
                  position: absolute;
                  bottom: 0;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 120px;
                  height: 3px;
                  background: linear-gradient(90deg, transparent, #136c39 20%, #22c55e 50%, #136c39 80%, transparent);
                  border-radius: 99px;
                }

                .rbt-component-section-title h2.rbt-title::before,
                .osp-brand-title::before,
                .osp-reviews-title::before {
                  content: '';
                  position: absolute;
                  bottom: -3.5px;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 10px;
                  height: 10px;
                  background-color: #136c39;
                  border: 2px solid #ffffff;
                  border-radius: 50%;
                  box-shadow: 0 0 8px rgba(34, 197, 94, 0.8);
                  z-index: 1;
                }





                /* Custom styling overrides for osp-brand-chip */
                .osp-brand-chip {
                  background-color: #eaf4ed !important;
                  color: #136c39 !important;
                  border: 1px solid #c2e2cc !important;
                  padding: 4px 14px !important;
                  border-radius: 50px !important;
                  font-size: 11px !important;
                  font-weight: 700 !important;
                  letter-spacing: 1.5px !important;
                  display: inline-block !important;
                  box-shadow: 0 2px 4px rgba(19, 108, 57, 0.05) !important;
                }
              ` }} />

              <div className="osp-popular-categories-bar-wrapper">
                <button
                  type="button"
                  className="osp-scroll-btn osp-scroll-btn-left"
                  onClick={() => scrollPopularCategories('left')}
                  aria-label="Scroll left"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>

                <div
                  className="osp-scroll-wrapper"
                  onMouseEnter={() => { isPopularHoveredRef.current = true; }}
                  onMouseLeave={() => { isPopularHoveredRef.current = false; }}
                  onTouchStart={() => { isPopularHoveredRef.current = true; }}
                  onTouchEnd={() => {
                    setTimeout(() => { isPopularHoveredRef.current = false; }, 1000);
                  }}
                >
                  <div className="osp-scroll-container" ref={popularCategoriesScrollRef}>
                    {[...displayCategories, ...displayCategories, ...displayCategories].map((cat, i) => {
                      const imgUrl = getValidImageUrl(cat.image_url) || categoryImages[cat.id] || `/assets/images/catagory-img/cat-bg-electro-c-0${(i % 6) + 1}.webp`;
                      const originalCount = displayCategories.length;
                      const setIndex = Math.floor(i / originalCount);
                      const uniqueKey = `${cat.id}-clone-${setIndex}-${i}`;

                      return (
                        <a key={uniqueKey} href={`/shop?category_id=${cat.id}`} className="osp-cat-item">
                          <div className="osp-cat-img-box">
                            <img
                              src={imgUrl}
                              alt={cat.name}
                              loading="lazy"
                            />
                          </div>
                          <span className="osp-cat-name">{cat.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  className="osp-scroll-btn osp-scroll-btn-right"
                  onClick={() => scrollPopularCategories('right')}
                  aria-label="Scroll right"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* Latest Products Section */}
      {latestProducts.length > 0 && (
        <div
          className="rbt-component-area rbt-products-area py-5 reveal"
          style={{ backgroundColor: "#eaf4ed" }}
        >
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
                              isProjectProduct(product) ? (
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
                                    backgroundColor: "#c85a17",
                                    color: "#ffffff"
                                  }}
                                >
                                  VIEW PROJECT
                                </a>
                              ) : stock === 0 ? (
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
                              <span className="price-text">
                                {isProjectProduct(product) ? "Get a Quote" : pricing.display}
                              </span>
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

      {/* Explore Our Projects Slider */}
      {(() => {
        const displayExplore = exploreProjects.length > 0 ? exploreProjects : [];
        return displayExplore.length > 0 && (
          <div className="rbt-component-area rbt-catagories-area rbt-section-gapTop rbt-bg-color-gray-light pb--30 reveal" style={{ paddingTop: '60px' }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12 mb--24">
                  <div className="rbt-component-section-title text-center border-0 p-0">
                    <div>
                      <span className="osp-brand-chip">PROJECT COLLECTIONS</span>
                    </div>
                    <h2 className="rbt-title mt--4">
                      Explore Our <span className="rbt-bold--text text-success">Projects</span>
                    </h2>
                  </div>
                </div>
              </div>

              <div className="osp-popular-categories-bar-wrapper">
                <button
                  type="button"
                  className="osp-scroll-btn osp-scroll-btn-left"
                  onClick={() => scrollExploreProjects('left')}
                  aria-label="Scroll left"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>

                <div
                  className="osp-scroll-wrapper"
                  onMouseEnter={() => { isExploreHoveredRef.current = true; }}
                  onMouseLeave={() => { isExploreHoveredRef.current = false; }}
                  onTouchStart={() => { isExploreHoveredRef.current = true; }}
                  onTouchEnd={() => {
                    setTimeout(() => { isExploreHoveredRef.current = false; }, 1000);
                  }}
                >
                  <div className="osp-scroll-container" ref={exploreProjectsScrollRef}>
                    {[...displayExplore, ...displayExplore, ...displayExplore].map((cat, i) => {
                      const imgUrl = getValidImageUrl(cat.image_url) || categoryImages[cat.id] || `/assets/images/catagory-img/cat-bg-electro-c-0${(i % 6) + 1}.webp`;
                      const originalCount = displayExplore.length;
                      const setIndex = Math.floor(i / originalCount);
                      const uniqueKey = `${cat.id}-clone-${setIndex}-${i}`;

                      return (
                        <a key={uniqueKey} href={`/shop?category_id=${cat.id}`} className="osp-cat-item">
                          <div className="osp-cat-img-box">
                            <img
                              src={imgUrl}
                              alt={cat.name}
                              loading="lazy"
                            />
                          </div>
                          <span className="osp-cat-name">{cat.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  className="osp-scroll-btn osp-scroll-btn-right"
                  onClick={() => scrollExploreProjects('right')}
                  aria-label="Scroll right"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>

            </div>
          </div>
        );
      })()}

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
                                      isProjectProduct(product) ? (
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
                                            backgroundColor: "#c85a17",
                                            color: "#ffffff"
                                          }}
                                        >
                                          VIEW PROJECT
                                        </a>
                                      ) : stock === 0 ? (
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
                                      <span className="price-text">
                                        {isProjectProduct(product) ? "Get a Quote" : pricing.display}
                                      </span>

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
                                    isProjectProduct(product) ? (
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
                                          backgroundColor: "#c85a17",
                                          color: "#ffffff"
                                        }}
                                      >
                                        VIEW PROJECT
                                      </a>
                                    ) : stock === 0 ? (
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
                                    <span className="price-text">
                                      {isProjectProduct(product) ? "Get a Quote" : pricing.display}
                                    </span>

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
