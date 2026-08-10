"use client";
import React, { useEffect, useState, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { useCategories } from '@/lib/hooks';
import { useAuth } from '@/lib/AuthContext';
import { fetchApi } from '@/lib/medusa';
import Link from 'next/link';

function formatPrice(amount: number, currencyCode: string = 'inr') {
  if (!amount) return '₹0.00';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

function ShopHeaderContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart } = useCart();
  const { categories } = useCategories();
  const { customer } = useAuth();
  
  const [searchVal, setSearchVal] = React.useState('');
  const [selectedCatId, setSelectedCatId] = React.useState('');
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  // Live search suggestions state
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  
  const cartCount = cart?.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;
  const cartTotal = cart?.total || 0;
  const currencyCode = cart?.currency_code || 'inr';

  // Debounced search query when 3 or more characters are entered
  useEffect(() => {
    const query = searchVal.trim();
    if (query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetchApi<{ products: any[] }>(
          `/store/products?q=${encodeURIComponent(query)}&limit=6&fields=id,title,handle,thumbnail,categories,variants.prices`
        );
        setSuggestions(res.products || []);
        setShowSuggestions(true);
      } catch (err) {
        console.error('Failed to fetch search suggestions:', err);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [searchVal]);

  // Close suggestions dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node) &&
        mobileSearchRef.current && !mobileSearchRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setSearchVal(searchParams.get('q') || '');
      setSelectedCatId(searchParams.get('category_id') || '');
    }
  }, [searchParams, pathname]);

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      const htmlEl = document.documentElement;
      if (isSearchOpen) {
        htmlEl.classList.add('menu-nav-opened');
        htmlEl.classList.add('header-top-menu-nav-opened');
      } else {
        htmlEl.classList.remove('menu-nav-opened');
        htmlEl.classList.remove('header-top-menu-nav-opened');
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        const htmlEl = document.documentElement;
        htmlEl.classList.remove('menu-nav-opened');
        htmlEl.classList.remove('header-top-menu-nav-opened');
      }
    };
  }, [isSearchOpen]);

  React.useEffect(() => {
    const handleSync = (e: Event) => {
      setSearchVal((e as CustomEvent).detail || '');
    };
    window.addEventListener('sync-search', handleSync);
    return () => {
      window.removeEventListener('sync-search', handleSync);
    };
  }, []);

  const getHierarchicalCategories = () => {
    const rootCategories = categories.filter(c => !c.parent_category_id);
    const result: any[] = [];
    
    rootCategories.forEach(root => {
      result.push({ id: root.id, name: root.name, level: 0 });
      if (root.category_children) {
        root.category_children.forEach((child: any) => {
          result.push({ id: child.id, name: child.name, level: 1 });
          const fullChild = categories.find(c => c.id === child.id);
          if (fullChild && fullChild.category_children) {
            fullChild.category_children.forEach((grandchild: any) => {
              result.push({ id: grandchild.id, name: grandchild.name, level: 2 });
            });
          }
        });
      }
    });
    
    return result;
  };

  const renderCategoriesDropdown = () => {
    const parentCategories = categories.filter(
      cat => !cat.parent_category_id && cat.name?.toLowerCase() !== 'uncategorized'
    );
    const isCategoryActive = pathname === '/shop' && !!selectedCatId;

    return (
      <li className="relative group-dropdown-main" style={{ margin: '0 15px', display: 'flex', alignItems: 'center' }}>
        <a className="categories-trigger-btn" href="/shop">
          <i className="fa-solid fa-bars"></i>
          <span>Categories</span>
          <i className="fa-solid fa-chevron-down" style={{ fontSize: '11px' }}></i>
        </a>
        
        {/* Level 1 Dropdown */}
        <ul className="categories-dropdown-menu">
          {parentCategories.map((parent) => {
            const hasChildren = parent.category_children && parent.category_children.length > 0;
            return (
              <li key={parent.id} className="categories-dropdown-item">
                <a href={`/shop?category_id=${parent.id}`} className="dropdown-link">
                  <span>{parent.name}</span>
                  {hasChildren && <i className="fa-solid fa-chevron-right text-[10px] text-gray-400" style={{ fontSize: '10px' }}></i>}
                </a>
                
                {/* Level 2 Subcategories */}
                {hasChildren && (
                  <ul className="categories-sub-dropdown-menu">
                    {parent.category_children.map((child) => {
                      const fullChild = categories.find(c => c.id === child.id);
                      const hasGrandchildren = fullChild && fullChild.category_children && fullChild.category_children.length > 0;
                      return (
                        <li key={child.id} className="categories-dropdown-item">
                          <a href={`/shop?category_id=${child.id}`} className="dropdown-link">
                            <span>{child.name}</span>
                            {hasGrandchildren && <i className="fa-solid fa-chevron-right text-[10px] text-gray-400" style={{ fontSize: '10px' }}></i>}
                          </a>
                          
                          {/* Level 3 Grandchildren */}
                          {hasGrandchildren && (
                            <ul className="categories-sub-dropdown-menu">
                              {fullChild.category_children.map((grandchild) => (
                                <li key={grandchild.id} className="categories-dropdown-item">
                                  <a href={`/shop?category_id=${grandchild.id}`} className="dropdown-link">
                                    <span>{grandchild.name}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </li>
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchOpen(false);
    const params = new URLSearchParams();
    if (searchVal.trim()) {
      params.set('q', searchVal.trim());
    }
    if (selectedCatId) {
      params.set('category_id', selectedCatId);
    }
    router.push(`/shop?${params.toString()}`);
  };
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).$) {
      setTimeout(() => {
        const $ = (window as any).$;
        if ($('.rbt-select-activation').length && typeof ($('.rbt-select-activation') as any).selectpicker === 'function') {
          ($('.rbt-select-activation') as any).selectpicker('refresh');
        }
      }, 500);
    }
  }, []);
  // Helper to highlight matching substring
  const highlightMatch = (text: string, query: string) => {
    if (!query || !text) return text;
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
    const before = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const after = text.substring(index + query.length);
    return (
      <span>
        {before}
        <strong style={{ color: '#0f172a', fontWeight: '800' }}>{match}</strong>
        <span style={{ color: '#334155', fontWeight: '500' }}>{after}</span>
      </span>
    );
  };

  // Extract smart keyword queries like Amazon/Flipkart
  const getKeywordSuggestions = () => {
    const q = searchVal.toLowerCase().trim();
    if (!q) return [];
    const keywordsSet = new Set<string>();
    
    suggestions.forEach(p => {
      const title = p.title || '';
      const words = title.split(/[\s-]+/);
      if (words.length >= 2) {
        const phrase2 = words.slice(0, 2).join(' ');
        if (phrase2.toLowerCase().includes(q)) keywordsSet.add(phrase2);
      }
      if (words.length >= 3) {
        const phrase3 = words.slice(0, 3).join(' ');
        if (phrase3.toLowerCase().includes(q)) keywordsSet.add(phrase3);
      }
      if (title.toLowerCase().includes(q) && title.length <= 35) {
        keywordsSet.add(title);
      }
    });

    return Array.from(keywordsSet).slice(0, 4);
  };

  // Get matching category predictions
  const getMatchingCategories = () => {
    const q = searchVal.toLowerCase().trim();
    if (!q) return [];
    return categories
      .filter(c => c.name?.toLowerCase().includes(q) && c.name?.toLowerCase() !== 'uncategorized')
      .slice(0, 2);
  };

  const TRENDING_SEARCHES = [
    'Arduino Boards',
    'Sensors',
    'LiPo Battery',
    'BLDC Motors',
    'Raspberry Pi',
    'Drone Kits',
    'ESP32 Wi-Fi',
    'Relay Modules'
  ];

  const handleKeywordClick = (keyword: string) => {
    setSearchVal(keyword);
    setShowSuggestions(false);
    setIsSearchOpen(false);
    router.push(`/shop?q=${encodeURIComponent(keyword)}`);
  };

  const handleCategorySearchClick = (catId: string, catName: string) => {
    setShowSuggestions(false);
    setIsSearchOpen(false);
    const params = new URLSearchParams();
    if (searchVal.trim()) params.set('q', searchVal.trim());
    params.set('category_id', catId);
    router.push(`/shop?${params.toString()}`);
  };

  const renderSuggestionsDropdown = (isMobile: boolean = false) => {
    if (!showSuggestions) return null;
    const query = searchVal.trim();
    const isUnderThreshold = query.length < 3;

    // Amazon/Flipkart Initial State: Show Trending Searches when clicking empty/short input
    if (isUnderThreshold) {
      return (
        <div 
          className="live-search-suggestions-dropdown"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 20px 45px -8px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(0, 0, 0, 0.08)',
            zIndex: 999999,
            overflow: 'hidden',
            padding: '12px 16px 16px',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', color: '#64748b', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <i className="fa-solid fa-fire" style={{ color: '#ea580c' }}></i>
            <span>Popular & Trending Searches</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {TRENDING_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => handleKeywordClick(term)}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#1e293b',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e2e8f0';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <i className="fa-regular fa-magnifying-glass" style={{ fontSize: '10px', color: '#64748b' }}></i>
                <span>{term}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    const keywordSuggestions = getKeywordSuggestions();
    const matchingCats = getMatchingCategories();

    return (
      <div 
        className="live-search-suggestions-dropdown"
        style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: 0,
          right: 0,
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.08)',
          zIndex: 999999,
          overflow: 'hidden',
          maxHeight: '520px',
          overflowY: 'auto',
          textAlign: 'left'
        }}
      >
        {/* Amazon/Flipkart Top Header */}
        <div style={{ padding: '8px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b' }}>
            {isSearching ? 'Searching catalog...' : `Suggestions for "${query}"`}
          </span>
          {isSearching && (
            <span className="spinner-border spinner-border-sm text-success" style={{ width: '13px', height: '13px' }}></span>
          )}
        </div>

        {/* Section 1: Category Scope Predictions (Like Amazon "search in...") */}
        {matchingCats.length > 0 && (
          <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0', background: '#f8fafc' }}>
            {matchingCats.map(cat => (
              <div
                key={cat.id}
                onClick={() => handleCategorySearchClick(cat.id, cat.name)}
                style={{
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: '#1e293b',
                  transition: 'background 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <i className="fa-solid fa-layer-group" style={{ fontSize: '12px', color: '#136c39' }}></i>
                <span>
                  Search &ldquo;<strong>{query}</strong>&rdquo; in <strong style={{ color: '#136c39' }}>{cat.name}</strong>
                </span>
                <i className="fa-solid fa-arrow-up-right-from-square ms-auto" style={{ fontSize: '10px', color: '#94a3b8' }}></i>
              </div>
            ))}
          </div>
        )}

        {/* Section 2: Predictive Keyword Autocompletions */}
        {keywordSuggestions.length > 0 && (
          <div style={{ borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
            {keywordSuggestions.map((kw, i) => (
              <div
                key={i}
                onClick={() => handleKeywordClick(kw)}
                style={{
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: '#334155',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f0fdf4';
                  e.currentTarget.style.paddingLeft = '20px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.paddingLeft = '16px';
                }}
              >
                <i className="fa-regular fa-magnifying-glass" style={{ fontSize: '12px', color: '#94a3b8' }}></i>
                <div style={{ flex: 1 }}>
                  {highlightMatch(kw, query)}
                </div>
                <i className="fa-solid fa-arrow-left" style={{ fontSize: '11px', color: '#cbd5e1', transform: 'rotate(45deg)' }}></i>
              </div>
            ))}
          </div>
        )}

        {/* Section 3: Exact Matching Products with Images and Real Price */}
        {suggestions.length > 0 ? (
          <div>
            <div style={{ padding: '8px 16px 4px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
              Matching Products
            </div>
            <div className="suggestion-items-list" style={{ padding: '2px 0' }}>
              {suggestions.map((p) => {
                const variant = p.variants?.[0];
                const priceObj = variant?.prices?.find((pr: any) => pr.currency_code === 'inr') || variant?.prices?.[0];
                const priceVal = priceObj?.amount || 0;
                const categoryName = p.categories?.[0]?.name;

                return (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    onClick={() => {
                      setShowSuggestions(false);
                      setIsSearchOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 16px',
                      gap: '12px',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease',
                      borderBottom: '1px solid #f8fafc'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f0fdf4';
                      e.currentTarget.style.paddingLeft = '20px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.paddingLeft = '16px';
                    }}
                  >
                    <div style={{ width: '46px', height: '46px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {p.thumbnail ? (
                        <img src={p.thumbnail} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <i className="fa-solid fa-cube" style={{ color: '#94a3b8', fontSize: '18px' }}></i>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {highlightMatch(p.title, query)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#136c39' }}>
                          {formatPrice(priceVal)}
                        </span>
                        {categoryName && (
                          <span style={{ fontSize: '10px', background: '#f1f5f9', color: '#475569', padding: '1px 7px', borderRadius: '4px', fontWeight: '600' }}>
                            {categoryName}
                          </span>
                        )}
                      </div>
                    </div>
                    <i className="fa-solid fa-chevron-right" style={{ fontSize: '11px', color: '#94a3b8' }}></i>
                  </Link>
                );
              })}

              <div style={{ padding: '10px 16px 8px', borderTop: '1px solid #f1f5f9', textAlign: 'center', background: '#fafafa' }}>
                <button
                  type="button"
                  onClick={(e) => handleSearchSubmit(e)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#136c39',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>See all {suggestions.length}+ results for &ldquo;{searchVal}&rdquo;</span>
                  <i className="fa-solid fa-arrow-right" style={{ fontSize: '10px' }}></i>
                </button>
              </div>
            </div>
          </div>
        ) : (
          !isSearching && (
            <div style={{ padding: '28px 16px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
              <i className="fa-regular fa-face-frown mb-2 d-block" style={{ fontSize: '24px', color: '#94a3b8' }}></i>
              No products found matching &ldquo;<strong>{searchVal}</strong>&rdquo;
            </div>
          )
        )}
      </div>
    );
  };

  const renderSearchDropdown = () => (
    <div className={`rbt-search-dropdown rbt-search-dropdown-activation rbt-common-search-dropdown-activation ${isSearchOpen ? 'active' : ''}`}>
        <div className="wrapper" style={{ position: 'relative' }}>
            <button 
                type="button" 
                className="rbt-close-search-btn"
                style={{
                    position: 'absolute',
                    top: '0px',
                    right: '15px',
                    border: 'none',
                    background: '#f1f5f9',
                    color: '#64748b',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    zIndex: 10
                }}
                onClick={() => setIsSearchOpen(false)}
            >
                <i className="fa-solid fa-xmark" style={{ fontSize: '16px' }}></i>
            </button>
            <div className="row">
                <div className="col-lg-12">
                    <div className="rbt-component-section-title border-0 p-0 text-center">
                        <h2 className="rbt-title text-start text-md-center"><span className="rbt-bold--text">Search For
                                Products</span></h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <form className="rbt-search-form" onSubmit={handleSearchSubmit}>
                        <div ref={mobileSearchRef} className="input-sectition position-relative w-100 mr--12 mr_sm--4">
                            <input 
                                className="search-input" 
                                type="text" 
                                placeholder="What Are You Looking For?" 
                                value={searchVal}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSearchVal(val);
                                    window.dispatchEvent(new CustomEvent('sync-search-shop', { detail: val }));
                                }}
                                onFocus={() => {
                                  if (searchVal.trim().length >= 3 && suggestions.length > 0) {
                                    setShowSuggestions(true);
                                  }
                                }}
                            />
                            <i className="fa-sharp fa-regular inner-search-icon fa-magnifying-glass"></i>
                            {renderSuggestionsDropdown(true)}
                        </div>
                        <div className="submit-btn">
                            <button type="submit" className="rbt-btn btn-md">Search</button>
                        </div>
                        <a href="#" className="rbt-ms-dismiss-outsider" onClick={(e) => { e.preventDefault(); setIsSearchOpen(false); }}></a>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <>
<header className="rbt-header-2">

    <div className="rbt-header-wrapper rbt-header-wrapper-one header-space-between rbt-bg-color-white header-not-transparent plr--0 position-relative z-5">
    <div className="rbt-separator-mid">
        <hr className="rbt-separator rbt-separator-gray100 m-0" />
    </div>
    <div className="rbt-wrapper-middle rbt-header-middle-one">
        <div className="container">
            <div className="mainbar-row @@navigationEnd align-items-center">
                <div className="header-left">
                    {/* Start Mobile-Menu-Bar */}
                    <div className="mobile-menu-bar d-block d-xl-none">
                        <div className="hamberger">
                            <button className="hamberger-button rbt-round-btn">
                                <i className="fa-solid fa-bars"></i>
                            </button>
                        </div>
                    </div>
                    {/* Start Mobile-Menu-Bar */}
                    <div className="rbt-header-content">
                        <div className="header-info">
                            <div className="logo">
                                <a href="/">
                                    <img
                                        src="/assets/images/logo/bitmap_cropped.png"
                                        alt="Ocean Student Projects Logo"
                                        style={{
                                            height: '86px',
                                            maxHeight: 'none',
                                            width: 'auto',
                                            objectFit: 'contain',
                                            display: 'block'
                                        }}
                                    />
                                </a>
                            </div>
                        </div>

                        <div className="header-info p-0 d-none">
                            <a className="rbt-offcanvas-trigger-btn rbt-offcanvas-trigger-transparent-btn rbt-cat-offcanvas-activation rbt-burger-menu-bar"
                                href="#!">
                                <div className="rbt-burger-menu-bar-wrapper">
                                    <i className="rbt-line-btn">
                                        <span className="rbt-lines"></span>
                                    </i>
                                    <i className="rbt-line-btn rbt-hover-effect">
                                        <span className="rbt-lines"></span>
                                    </i>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>


                <div className="rbt-header-content d-none d-xl-block w-100" style={{ maxWidth: '420px' }}>
                    <div className="header-info w-100">
                        <form onSubmit={handleSearchSubmit} className="w-100">
                            <div 
                                ref={searchContainerRef}
                                className="premium-nav-search-bar"
                                style={{ 
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    background: '#f3f4f6',
                                    borderRadius: '50px',
                                    border: '1px solid rgba(0, 0, 0, 0.08)',
                                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.04)'
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.background = '#ffffff';
                                    e.currentTarget.style.borderColor = '#136c39';
                                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(19, 108, 57, 0.08), 0 2px 6px rgba(19, 108, 57, 0.04)';
                                    if (searchVal.trim().length >= 3 && suggestions.length > 0) {
                                      setShowSuggestions(true);
                                    }
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.background = '#f3f4f6';
                                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                                    e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.04)';
                                }}
                                onMouseEnter={(e) => {
                                    if (document.activeElement !== e.currentTarget.querySelector('input')) {
                                        e.currentTarget.style.borderColor = 'rgba(19, 108, 57, 0.3)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(19, 108, 57, 0.04)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (document.activeElement !== e.currentTarget.querySelector('input')) {
                                        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                                        e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.04)';
                                    }
                                }}
                            >
                                <button 
                                    type="submit" 
                                    style={{ 
                                        background: 'none', 
                                        border: 'none', 
                                        padding: '0 0 0 18px',
                                        cursor: 'pointer',
                                        color: '#136c39',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '15px',
                                        transition: 'transform 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    aria-label="Search"
                                >
                                    <i className="fa-regular fa-magnifying-glass"></i>
                                </button>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchVal}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setSearchVal(val);
                                        window.dispatchEvent(new CustomEvent('sync-search-shop', { detail: val }));
                                    }}
                                    style={{ 
                                        width: '100%', 
                                        padding: '12px 18px 12px 12px', 
                                        borderRadius: '50px',
                                        border: 'none',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        backgroundColor: 'transparent',
                                        color: '#111111',
                                        outline: 'none'
                                    }}
                                />
                                {renderSuggestionsDropdown(false)}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="header-right">
                    {/* Navbar Icons */}
                    <ul className="rbt-quick-access">

                        <li
                            className="rbt-access-box rbt-scroll-trigger fade_in animation-order-3 rbt-access-box-has-bg-hover rbt-mini-cart">
                            <a href="#" className="rbt-cart-sidenav-activation">
                                <div className="rbt-round-btn rbt-bg-static-gray">
                                    <i className="fa-regular fa-bag-shopping"></i>
                                    <span className="access-box-count rbt-shiny">{cartCount}</span>
                                </div>
                            </a>
                        </li>
                        <li
                            className="rbt-access-box rbt-scroll-trigger fade_in animation-order-3 rbt-access-box-has-bg-hover d-flex d-lg-none">
                            <a 
                                className={`rbt-round-btn rbt-bg-static-gray rbt-modern-close-btn search-trigger-active ${isSearchOpen ? 'open' : ''}`}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsSearchOpen(!isSearchOpen);
                                }}
                            >
                                <i className="fa-regular fa-search search-icon"></i>
                                <div className="modern-close-wrapper"></div>
                            </a>
                        </li>
                        <li
                            className="rbt-access-box rbt-scroll-trigger fade_in animation-order-3 rbt-access-box-has-bg-hover d-none d-lg-flex">
                            <a href={customer ? "/profile" : "/login"} className="rbt-access-box-wrapper">
                                <div className="rbt-round-btn rbt-bg-static-gray">
                                    <i className="fa-regular fa-user"></i>
                                </div>
                                <div className="content">
                                    <p>{customer ? `Hello, ${customer.first_name}` : 'Log in/Sign Up'}</p>
                                    <span>{customer ? 'My Account' : 'Access Account'}</span>
                                </div>
                            </a>
                        </li>
                    </ul>


                </div>
            </div>
        </div>
    </div>
    {renderSearchDropdown()}
</div>
    {/* Start Header Mid */}
<div className="rbt-header-middle position-relative rbt-header-mid-1 rbt-bg-color-primary d-none d-xl-block">
    <div className="container">
        <div className="rbt-header-sec align-items-center @@flexDirection">

            <div className="rbt-main-navigation d-none d-xl-block">
                        <nav className="rbt-mainmenu-nav">
                            <ul className="mainmenu has-nav-bg-shape-hover">
                                {renderCategoriesDropdown()}
                                <li style={{ margin: '0 15px' }}><a className={pathname === '/' ? 'active' : ''} href="/">Home</a></li>
                                <li style={{ margin: '0 15px' }}><a className={pathname === '/shop' && !selectedCatId ? 'active' : ''} href="/shop">Educational Kits</a></li>
                                <li style={{ margin: '0 15px' }}><a href="/contact">Project Enquiry</a></li>
                                <li style={{ margin: '0 15px' }}><a href="https://wa.me/919042686793?text=Hi,%20I%20am%20interested%20in%20making%20a%20bulk%20purchase%20with%20Ocean%20Student%20Projects." target="_blank" rel="noopener noreferrer">Bulk purchase</a></li>
                                <li style={{ margin: '0 15px' }}><a className={pathname === '/about' ? 'active' : ''} href="/about">About Us</a></li>
                                <li style={{ margin: '0 15px' }}><a className={pathname === '/contact' ? 'active' : ''} href="/contact">Contact Us</a></li>
                            </ul>
                        </nav>
            </div>

                            <div className="rbt-header-sec-col rbt-header-right d-none d-xl-flex align-items-center gap-3" style={{ marginLeft: 'auto' }}>
                                <a 
                                    href="mailto:oceanstudentprojects@gmail.com" 
                                    className="nav-header-contact-link"
                                    style={{
                                        color: '#ffffff',
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        letterSpacing: '0.5px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        textTransform: 'uppercase',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <i className="fa-regular fa-envelope"></i>
                                    <span>Email</span>
                                </a>
                                <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '12px' }}>|</span>
                                <a 
                                    href="https://wa.me/919042686793?text=Hi,%20I%20am%20interested%20in%20buying%20electronics%20components%20from%20Ocean%20Student%20Projects." 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="nav-header-contact-link"
                                    style={{
                                        color: '#ffffff',
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        letterSpacing: '0.5px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        textTransform: 'uppercase',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <i className="fa-brands fa-whatsapp"></i>
                                    <span>Whatsapp</span>
                                </a>
                            </div>
        </div>  
    </div>
</div>
{/* End Header Top */}



    
    
    <div className="rbt-header-common-sticky-activation rbt-header-wrapper-common justify-content-between rbt-bg-color-white">
    <div className="container">
        <div className="mainbar-row rbt-mainbar-row-md-height  align-items-center">
            <div className="header-left">
                <div className="rbt-header-content d-flex">
                    <div className="header-info p-0 d-none">
                        <a className="rbt-offcanvas-trigger-btn rbt-cat-offcanvas-activation rbt-burger-menu-bar" href="#!">
                            <div className="rbt-burger-menu-bar-wrapper">
                                <i className="rbt-line-btn">
                                    <span className="rbt-lines"></span>
                                </i>
                                <i className="rbt-line-btn rbt-hover-effect">
                                    <span className="rbt-lines"></span>
                                </i>
                            </div>
                        </a>
                    </div>
                    <div className="header-info d-xl-block d-none">
                        <div className="logo rbt-logo-height-sm">
                            <a href="/">
                                <img
                                    src="/assets/images/logo/bitmap_cropped.png"
                                    alt="Ocean Student Projects Logo"
                                    style={{
                                        height: '86px',
                                        maxHeight: 'none',
                                        width: 'auto',
                                        objectFit: 'contain',
                                        display: 'block'
                                    }}
                                />
                            </a>
                        </div>
                    </div>
                </div>
                {/* Start Mobile-Menu-Bar */}
                <div className="mobile-menu-bar d-block d-xl-none">
                    <div className="hamberger">
                        <button onClick={() => {
                            if (typeof document !== 'undefined') {
                                const mobileMenu = document.querySelector('.popup-mobile-menu');
                                if (mobileMenu) {
                                    mobileMenu.classList.add('active');
                                }
                            }
                        }} className="hamberger-button rbt-round-btn">
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    </div>
                </div>
                {/* Start Mobile-Menu-Bar */}
            </div>

            <div className="header-info d-xl-none d-block">
                <div className="logo">
                    <a href="/">
                        <img
                            src="/assets/images/logo/bitmap_cropped.png"
                            alt="Ocean Student Projects Logo"
                            style={{
                                height: '86px',
                                maxHeight: 'none',
                                width: 'auto',
                                objectFit: 'contain',
                                display: 'block'
                            }}
                        />
                    </a>
                </div>
            </div>

            <div className="rbt-header-content d-none d-xl-block">
                <div className="header-info">
                                <nav className="rbt-mainmenu-nav">
                                    <ul className="mainmenu mainmenu has-nav-bg-shape-hover">
                                        {renderCategoriesDropdown()}
                                        <li style={{ margin: '0 15px' }}><a className={pathname === '/' ? 'active' : ''} href="/">Home</a></li>
                                        <li style={{ margin: '0 15px' }}><a className={pathname === '/shop' && !selectedCatId ? 'active' : ''} href="/shop">Educational Kits</a></li>
                                        <li style={{ margin: '0 15px' }}><a href="/contact">Project Enquiry</a></li>
                                        <li style={{ margin: '0 15px' }}><a href="https://wa.me/919042686793?text=Hi,%20I%20am%20interested%20in%20making%20a%20bulk%20purchase%20with%20Ocean%20Student%20Projects." target="_blank" rel="noopener noreferrer">Bulk purchase</a></li>
                                        <li style={{ margin: '0 15px' }}><a className={pathname === '/about' ? 'active' : ''} href="/about">About Us</a></li>
                                        <li style={{ margin: '0 15px' }}><a className={pathname === '/contact' ? 'active' : ''} href="/contact">Contact Us</a></li>
                                    </ul>
                                </nav>
                </div>
            </div>

            <div className="header-right">
                {/* Navbar Icons */}
                <ul className="rbt-quick-access rbt-gap--12">

                    <li className="rbt-access-box rbt-scroll-trigger fade_in animation-order-3 rbt-access-box-has-bg-hover rbt-mini-cart tooltips tooltip-distance-lg"
                        data-tooltip="Search" data-tooltip-position="bottom">
                        <a 
                            className={`rbt-round-btn has-rbt-md-fsize rbt-common-search-trigger-active rbt-modern-close-btn ${isSearchOpen ? 'open' : ''}`}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsSearchOpen(!isSearchOpen);
                            }}
                        >
                            <i className="fa-regular fa-search search-icon"></i>
                            <div className="modern-close-wrapper"></div>
                        </a>
                    </li>

                    <li className="rbt-access-box rbt-scroll-trigger fade_in animation-order-3 rbt-access-box-has-bg-hover rbt-mini-cart tooltips tooltip-distance-lg"
                        data-tooltip="Cart" data-tooltip-position="bottom">
                        <a className="rbt-cart-sidenav-activation" href="#!">
                            <span className="rbt-round-btn has-rbt-md-fsize">
                                <i className="fa-regular fa-bag-shopping"></i>
                                <span className="access-box-count rbt-shiny">{cartCount}</span>
                            </span>
                        </a>
                    </li>

                    <li className="rbt-access-box rbt-scroll-trigger fade_in animation-order-5 d-none d-lg-flex tooltips tooltip-distance-lg"
                        data-tooltip={customer ? "My Profile" : "Sign In"} data-tooltip-position="bottom">
                        <a className="rbt-round-btn has-rbt-md-fsize" href={customer ? "/profile" : "/login"}>
                            <i className="fa-regular fa-user"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    {renderSearchDropdown()}
</div>
</header>
    </>
  );
}

export default function ShopHeader() {
  return (
    <React.Suspense fallback={<div className="rbt-header-2" style={{ minHeight: '120px' }}></div>}>
      <ShopHeaderContent />
    </React.Suspense>
  );
}
