"use client";
import React, { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { useCategories } from '@/lib/hooks';
import { useAuth } from '@/lib/AuthContext';

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
  
  const cartCount = cart?.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;
  const cartTotal = cart?.total || 0;
  const currencyCode = cart?.currency_code || 'inr';

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
                        <div className="input-sectition position-relative w-100 mr--12 mr_sm--4">
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
                            />
                            <i className="fa-sharp fa-regular inner-search-icon fa-magnifying-glass"></i>
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
