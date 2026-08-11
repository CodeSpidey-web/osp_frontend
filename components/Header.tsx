
"use client";
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
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

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart();
  const { categories } = useCategories();
  const { customer } = useAuth();
  
  const [searchVal, setSearchVal] = React.useState('');
  const [selectedCatId, setSelectedCatId] = React.useState('');
  
  const cartCount = cart?.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;
  const cartTotal = cart?.total || 0;
  const currencyCode = cart?.currency_code || 'inr';

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setSearchVal(params.get('q') || '');
      setSelectedCatId(params.get('category_id') || '');
    }
  }, [pathname]);

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
      <li className="relative group-dropdown-main">
        <a className={`nav-link-custom ${isCategoryActive ? 'active' : ''}`} href="/shop" style={{ display: 'inline-flex', alignItems: 'center' }}>
          Categories <i className="fa-solid fa-chevron-down text-[10px]" style={{ fontSize: '10px', marginLeft: '4px' }}></i>
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
    const params = new URLSearchParams();
    if (searchVal.trim()) {
      params.set('q', searchVal.trim());
    }
    if (selectedCatId) {
      params.set('category_id', selectedCatId);
    }
    router.push(`/shop?${params.toString()}`);
  };
  return (
    <>
    <header className="rbt-header-6 rbt-header-has-shadow">

        <div
            className="rbt-header-wrapper rbt-header-sticky-activation rbt-header-wrapper-one header-space-between rbt-bg-color-gray-light header-not-transparent header-sticky plr--0 p-0 rbt-bg-color-gray-light">
            {/*  Start Header Mid  */}
            <div className="rbt-header-middle position-relative rbt-header-mid-1 @@bgColor d-none d-xl-block z-2">
                <div className="rbt-fullwidth-wrapper">
                    <div className="rbt-header-sec align-items-center @@flexDirection">


                        <div className="rbt-header-sec-col rbt-header-left rbt-fancy-item fancy-menu-address fancy-menu-start">
                        </div>

                        <div className="rbt-main-navigation d-none d-xl-block">
                            <nav className="rbt-mainmenu-nav">
                                <ul className="mainmenu has-nav-bg-shape-hover">
                                    {renderCategoriesDropdown()}
                                    <li><a className={`nav-link-custom ${pathname === '/' ? 'active' : ''}`} href="/">Home</a></li>
                                    <li><a className={`nav-link-custom ${pathname === '/shop' && !selectedCatId ? 'active' : ''}`} href="/shop">Educational Kits</a></li>
                                    <li><a className="nav-link-custom" href="/contact">Project Enquiry</a></li>
                                    <li><a className="nav-link-custom" href="https://wa.me/917338975699?text=Hi,%20I%20am%20interested%20in%20making%20a%20bulk%20purchase%20with%20Ocean%20Student%20Projects." target="_blank" rel="noopener noreferrer">Bulk purchase</a></li>
                                    <li><a className={`nav-link-custom ${pathname === '/about' ? 'active' : ''}`} href="/about">About Us</a></li>
                                    <li><a className={`nav-link-custom ${pathname === '/contact' ? 'active' : ''}`} href="/contact">Contact Us</a></li>
                                </ul>
                            </nav>

                        </div>

                        <div className="rbt-header-sec-col rbt-header-right">
                        </div>
                    </div>
                </div>
            </div>
            {/*  End Header Top  */}

        </div>
        {/*  Start Header Mid  */}
        <div className="rbt-wrapper-middle rbt-header-middle-one rbt-bg-color-white">
            <div className="rbt-fullwidth-wrapper">
                <div className="mainbar-row @@navigationEnd align-items-center">
                    <div className="header-left header-left-md">

                        <div className="rbt-header-content rbt-gap--32 align-items-center">
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


                            {/*  Start Mobile-Menu-Bar  */}
                            <div className="mobile-menu-bar d-block d-lg-none">
                                <div className="hamberger">
                                    <button className="hamberger-button rbt-round-btn">
                                        <i className="fa-solid fa-bars"></i>
                                    </button>
                                </div>
                            </div>
                            {/*  Start Mobile-Menu-Bar  */}

                            <div className="header-info p-0  d-none d-xl-block">
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
                        </div>
                    </div>

                    <div className="rbt-header-content ">
                        <div className="header-info d-none d-xl-block">
                            <div className="rbt-search-with-category uni-header-swc-one uni-header-swc-xl" style={{maxWidth: '800px'}}>
                                <form onSubmit={handleSearchSubmit}>
                                    <div className="rbt-inner-search-field border-0">
                                        <div
                                            className="rbt-search-input-section has-left-catagory-section">
                                            <div className="filter-select rbt-modern-select search-by-category">
                                                <select 
                                                    className="header-category-select"
                                                    value={selectedCatId}
                                                    onChange={(e) => setSelectedCatId(e.target.value)}
                                                >
                                                    <option value="">All Categories</option>
                                                    {getHierarchicalCategories().map((cat) => {
                                                        const indent = "\u00A0\u00A0".repeat(cat.level * 2);
                                                        const prefix = cat.level > 0 ? "— " : "";
                                                        return (
                                                            <option key={cat.id} value={cat.id}>
                                                                {indent}{prefix}{cat.name}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>

                                            <input 
                                                type="text" 
                                                placeholder="Search for something..."
                                                value={searchVal}
                                                onChange={(e) => setSearchVal(e.target.value)}
                                                style={{
                                                    border: 'none',
                                                    outline: 'none',
                                                    width: '100%',
                                                    padding: '10px 16px',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    color: '#1a1a1a',
                                                    background: 'transparent'
                                                }}
                                            />
                                        </div>
                                        <button className="rbt-round-btn search-btn" type="submit" aria-label="Search"><i
                                                className="fa-sharp fa-solid fa-magnifying-glass"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="header-info p-0  d-block d-xl-none">
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
                    </div>

                    <div className="header-right">
                        {/*  Navbar Icons  */}
                        <ul className="rbt-quick-access">
                            <li
                                className="rbt-access-box rbt-scroll-trigger fade_in animation-order-4 rbt-access-box-has-bg-hover rbt-mini-cart">
                                <a href="#!" className="rbt-cart-sidenav-activation">
                                    <div className="rbt-round-btn rbt-bg-static-gray">
                                        <i className="fa-regular fa-bag-shopping"></i>
                                        <span className="access-box-count rbt-shiny">{cartCount}</span>
                                    </div>
                                </a>
                            </li>
                            {customer && (
                                <li className="rbt-access-box rbt-scroll-trigger fade_in animation-order-5 rbt-access-box-has-bg-hover d-none d-lg-flex">
                                    <a href="/profile?tab=orders" className="rbt-access-box-wrapper">
                                        <div className="rbt-round-btn rbt-bg-static-gray">
                                            <i className="fa-regular fa-clipboard-list"></i>
                                        </div>
                                        <div className="content">
                                            <p>My Orders</p>
                                            <span>Order History</span>
                                        </div>
                                    </a>
                                </li>
                            )}
                            <li
                                className="rbt-access-box rbt-scroll-trigger fade_in animation-order-5 rbt-access-box-has-bg-hover d-none d-lg-flex">
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
        {/*  End Header Top  */}
        <div
            className="rbt-header-common-sticky-activation rbt-header-wrapper-common justify-content-between rbt-bg-color-white">
            <div className="rbt-fullwidth-wrapper">
                <div className="mainbar-row rbt-mainbar-row-md-height @@navigationEnd align-items-center">
                    <div className="header-left">
                        <div className="rbt-header-content d-flex">
                            <div className="header-info p-0 d-none">
                                <a className="rbt-offcanvas-trigger-btn rbt-cat-offcanvas-activation rbt-burger-menu-bar"
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
                        {/*  Start Mobile-Menu-Bar  */}
                        <div className="mobile-menu-bar d-block d-lg-none">
                            <div className="hamberger">
                                <button className="hamberger-button rbt-round-btn">
                                    <i className="fa-solid fa-bars"></i>
                                </button>
                            </div>
                        </div>
                        {/*  Start Mobile-Menu-Bar  */}
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
                                    <li><a className={`nav-link-custom ${pathname === '/' ? 'active' : ''}`} href="/">Home</a></li>
                                    <li><a className={`nav-link-custom ${pathname === '/shop' && !selectedCatId ? 'active' : ''}`} href="/shop">Educational Kits</a></li>
                                    <li><a className="nav-link-custom" href="/contact">Project Enquiry</a></li>
                                    <li><a className="nav-link-custom" href="https://wa.me/917338975699?text=Hi,%20I%20am%20interested%20in%20making%20a%20bulk%20purchase%20with%20Ocean%20Student%20Projects." target="_blank" rel="noopener noreferrer">Bulk purchase</a></li>
                                    <li><a className={`nav-link-custom ${pathname === '/about' ? 'active' : ''}`} href="/about">About Us</a></li>
                                    <li><a className={`nav-link-custom ${pathname === '/contact' ? 'active' : ''}`} href="/contact">Contact Us</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="header-right">
                        {/*  Navbar Icons  */}
                        <ul className="rbt-quick-access rbt-gap--12">

                            <li className="rbt-access-box rbt-scroll-trigger fade_in animation-order-3 tooltips tooltip-distance-lg"
                                data-tooltip="Search" data-tooltip-position="bottom">
                                <a className="rbt-round-btn has-rbt-md-fsize rbt-common-search-trigger-active rbt-modern-close-btn"
                                    href="#">
                                    <i className="fa-regular fa-search search-icon"></i>
                                    <div className="modern-close-wrapper"></div>
                                </a>
                            </li>

                            <li className="rbt-access-box rbt-scroll-trigger fade_in animation-order-3 d-none d-lg-flex tooltips tooltip-distance-lg"
                                data-tooltip="Sign In" data-tooltip-position="bottom">
                                <a className="rbt-round-btn has-rbt-md-fsize" href="#!" data-bs-toggle="modal"
                                    data-bs-target="#signinModal">
                                    <i className="fa-regular fa-user"></i>
                                </a>
                            </li>

                            <li className="rbt-access-box rbt-scroll-trigger fade_in animation-order-5 rbt-access-box-has-bg-hover rbt-mini-cart tooltips tooltip-distance-lg"
                                data-tooltip="Cart" data-tooltip-position="bottom">
                                <a className="rbt-cart-sidenav-activation" href="#!">
                                    <span className="rbt-round-btn has-rbt-md-fsize">
                                        <i className="fa-regular fa-bag-shopping"></i>
                                        <span className="access-box-count rbt-shiny">{cartCount}</span>
                                    </span>
                                    <div className="content ml--4">
                                        <span className="title-text">{formatPrice(cartTotal, currencyCode)}</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            {/*  Start Search Dropdown   */}
            <div className="rbt-search-dropdown rbt-common-search-dropdown-activation">
                <div className="wrapper">
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
                            <form className="rbt-search-form">
                                <div className="input-sectition position-relative w-100 mr--12 mr_sm--4">
                                    <input className="search-input" type="text" placeholder="What Are You Looking For?" />
                                    <i className="fa-sharp fa-regular inner-search-icon fa-magnifying-glass"></i>
                                    <button className="media-search-btn media-search-popupactivation">
                                        <i className="fa-sharp fa-regular fa-camera"></i>
                                    </button>
                                </div>
                                <div className="submit-btn">
                                    <a className="rbt-btn btn-md" href="#">Search</a>
                                </div>
                                <div className="rbt-media-search-section">
                                    <div className="rbt-media-wrapper">
                                        <div className="section-title"><span className="title b1">Find product inspiration with
                                                Image
                                                Search</span></div>
                                        <div className="rbt-file-upload-container">
                                            <input type="file" className="fileInput" multiple hidden />
                                            <div className="file-upload-area fileUploadArea">
                                                <div className="file-upload-content">
                                                    <span className="rbt-icon"><i
                                                            className="fa-solid fa-cloud-arrow-up"></i></span>
                                                    <p className="rbt-title">Drag & Drop Files Here <span
                                                            className="rbt-text-color-gray-400">Or</span></p>
                                                    <button className="browseFilesButton rbt-btn rbt-btn-sm">Browse
                                                        Files</button>
                                                </div>
                                                <div className="fileList file-list"></div>
                                            </div>
                                            <p className="fileCount">0 of 10</p>
                                        </div>
                                        <div className="rbt-copy-link-part rbt-text-copy-activation">
                                            <input className="rbt-copy-value-field" type="text"
                                                value="https://oceanstudentprojects.in/wishlist" readOnly />
                                            <button className="rbt-btn rbt-btn-xs has-left-icon rbt-copy-btn"
                                                data-tooltip="Copy">
                                                <i className="fa-regular fa-copy"></i>
                                                <span className="rbt-btn-text">Copy</span>
                                            </button>
                                        </div>
                                        <button type="button" className="rbt-round-btn rbt-ms-dismiss-btn">
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>
                                </div>
                                <a href="javascript:void(0);" className="rbt-ms-dismiss-outsider"></a>
                            </form>
                        </div>
                    </div>
                    <div className="rbt-search-scroll-vertical-wrapper rbt-scroll-vertical">
                        <div className="inner">
                            <div className="row row--0">
                                <div className="col-lg-12">
                                    <div className="border-0 p-0 text-left title-sm-fsize">
                                        <h2 className="title"><span className="rbt-bold--text">Popular searches</span></h2>
                                    </div>
                                </div>

                                <div className="rbt-search-list-wrapper rbt-tag-list rbt-tag-list-rounded-lg">
                                    <a href="/shop">Raspberry Pi</a>
                                    <a href="/shop">Arduino</a>
                                    <a href="/shop">ESP32</a>
                                    <a href="/shop">Sensors</a>
                                    <a href="/shop">Displays</a>
                                    <a href="/shop">Robotics</a>
                                    <a href="/shop">DIY Kits</a>
                                    <a href="/shop">Breadboards</a>
                                    <a href="/shop">Components</a>
                                    <a href="/shop">Microcontrollers</a>
                                    <a href="/shop">IoT Devices</a>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
            {/*  End Search Dropdown   */}
        </div>
    </header>
    </>
  );
}
