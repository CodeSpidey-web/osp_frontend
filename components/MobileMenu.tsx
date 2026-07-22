

export default function MobileMenu() {
    return (
        <>




            {/*  Mobile Menu Section  */}
            <div className="popup-mobile-menu">
                <div className="inner-wrapper">
                    <div className="mobile-menu-top">
                        <div className="inner-top">
                            <div className="content">
                                <div className="logo">
                                    <a href="/">
                                        <img src="/assets/images/logo/fixed_logo.webp" alt="Ocean Student Projects Logo" />
                                    </a>
                                </div>
                                <div className="rbt-btn-close">
                                    <button className="close-button rbt-round-btn"><i className="fa-solid fa-xmark"></i></button>
                                </div>
                            </div>
                            <p className="description">Ocean Student Projects - India's trusted online store for electronics, components, and student projects.</p>
                            <div className="rbt-inner-search-field style-one rbt-search-field-rounded rbt-search-field-sm-width">
                                <input type="text" placeholder="Search for products" />
                                <button className="rbt-round-btn search-btn rbt-text-color-gray-500" type="submit"><i
                                    className="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                        </div>
                        <div className="rbt-tab rbt-round-shape-tab">
                            <ul className="nav nav-tabs mb--0" id="mobile-menuTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="rbt-tab-mobilemenu-1" data-bs-toggle="tab"
                                        data-bs-target="#rbt-tab-pane-mobilemenu-1" type="button" role="tab"
                                        aria-controls="rbt-tab-pane-mobilemenu-1" aria-selected="true">
                                        <i className="fa-solid fa-bars-sort"></i>
                                        Menu
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="rbt-tab-mobilemenu-2" data-bs-toggle="tab"
                                        data-bs-target="#rbt-tab-pane-mobilemenu-2" type="button" role="tab"
                                        aria-controls="rbt-tab-pane-mobilemenu-2" aria-selected="false">
                                        <i className="fa-sharp fa-regular fa-layer-group"></i>
                                        Catagories
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content" id="mobile-menuTabContent">
                                <div className="tab-pane fade show active" id="rbt-tab-pane-mobilemenu-1" role="tabpanel"
                                    aria-labelledby="rbt-tab-mobilemenu-1" tabIndex={0}>
                                    <nav className="rbt-mainmenu-nav">
                                        <ul className="mainmenu">
                                            <li className="with-rbt-megamenu has-menu-child-item position-static">
                                                <a href="#!">Home <i className="fa-regular fa-chevron-down"></i></a>
                                                {/*  Start Mega Menu   */}
                                                <div className="rbt-megamenu rbt-prsentation-megamenu rbt-width-fullscreen">
                                                    <div className="rbt-megamenu-wrapper">
                                                        <div className="container p_sm--0 p_md--0 p_lg--0">
                                                            <div
                                                                className="row row--12 home-plesentation-wrapper single-dropdown-menu-presentation mt_dec--24 mb_sm--0">

                                                                {/*  Start Single Demo   */}
                                                                <div
                                                                    className="col-lg-1-5 col-md-12 col-sm-12 col-12 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <div
                                                                        className="demo-single rbt-scroll-trigger zoom_in animation-order-1">
                                                                        <div className="inner">
                                                                            <div className="thumbnail">
                                                                                <a href="home-electronics.html"><img
                                                                                    src="/assets/images/splash/demo-pages/demo-1.webp"
                                                                                    alt="Demo Images" /></a>
                                                                            </div>
                                                                            <div className="content">
                                                                                <h2 className="rbt-title h4"><a
                                                                                    href="home-electronics.html">Electronics
                                                                                    One</a></h2>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/*  End Single Demo   */}

                                                                {/*  Start Single Demo   */}
                                                                <div
                                                                    className="col-lg-1-5 col-md-12 col-sm-12 col-12 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <div
                                                                        className="demo-single rbt-scroll-trigger zoom_in animation-order-2">
                                                                        <div className="inner">
                                                                            <div className="thumbnail">
                                                                                <a href="home-fashion.html"><img
                                                                                    src="/assets/images/splash/demo-pages/demo-5.webp"
                                                                                    alt="Demo Images" /></a>
                                                                            </div>
                                                                            <div className="content">
                                                                                <h2 className="rbt-title h4"><a
                                                                                    href="home-fashion.html">Fashion One</a>
                                                                                </h2>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/*  End Single Demo   */}

                                                                {/*  Start Single Demo   */}
                                                                <div
                                                                    className="col-lg-1-5 col-md-12 col-sm-12 col-12 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <div
                                                                        className="demo-single rbt-scroll-trigger zoom_in animation-order-3">
                                                                        <div className="inner">
                                                                            <div className="thumbnail">
                                                                                <a href="home-furniture.html"><img
                                                                                    src="/assets/images/splash/demo-pages/demo-8.webp"
                                                                                    alt="Demo Images" /></a>
                                                                            </div>
                                                                            <div className="content">
                                                                                <h2 className="rbt-title h4"><a
                                                                                    href="home-furniture.html">Furniture
                                                                                    One</a></h2>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/*  End Single Demo   */}

                                                                {/*  Start Single Demo   */}
                                                                <div
                                                                    className="col-lg-1-5 col-md-12 col-sm-12 col-12 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <div
                                                                        className="demo-single rbt-scroll-trigger zoom_in animation-order-4">
                                                                        <div className="inner">
                                                                            <div className="thumbnail">
                                                                                <a href="home-printing-service.html"><img
                                                                                    src="/assets/images/splash/demo-pages/demo-6.webp"
                                                                                    alt="Demo Images" /></a>
                                                                            </div>
                                                                            <div className="content">
                                                                                <h2 className="rbt-title h4"><a
                                                                                    href="home-printing-service.html">Print
                                                                                    Service One</a></h2>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/*  End Single Demo   */}

                                                                {/*  Start Single Demo   */}
                                                                <div
                                                                    className="col-lg-1-5 col-md-12 col-sm-12 col-12 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <div
                                                                        className="demo-single rbt-scroll-trigger zoom_in animation-order-5">
                                                                        <div className="inner">
                                                                            <div className="thumbnail">
                                                                                <a href="home-cosmetic-beauty.html"><img
                                                                                    src="/assets/images/splash/demo-pages/demo-2.webp"
                                                                                    alt="Demo Images" /></a>
                                                                            </div>
                                                                            <div className="content">
                                                                                <h2 className="rbt-title h4"><a
                                                                                    href="home-cosmetic-beauty.html">Cosmetic
                                                                                    Beauty One</a>
                                                                                </h2>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/*  End Single Demo   */}

                                                                {/*  Start Single Demo   */}
                                                                <div
                                                                    className="col-lg-1-5 col-md-12 col-sm-12 col-12 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <div
                                                                        className="demo-single rbt-scroll-trigger zoom_in animation-order-6">
                                                                        <div className="inner">
                                                                            <div className="thumbnail">
                                                                                <a href="home-sports.html"><img
                                                                                    src="/assets/images/splash/demo-pages/demo-9.webp"
                                                                                    alt="Demo Images" /></a>
                                                                            </div>
                                                                            <div className="content">
                                                                                <h2 className="rbt-title h4"><a
                                                                                    href="home-sports.html">Sports One</a>
                                                                                </h2>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/*  End Single Demo   */}

                                                                {/*  Start Single Demo   */}
                                                                <div
                                                                    className="col-lg-1-5 col-md-12 col-sm-12 col-12 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <div
                                                                        className="demo-single rbt-scroll-trigger zoom_in animation-order-7">
                                                                        <div className="inner">
                                                                            <div className="thumbnail">
                                                                                <a href="home-glass.html"><img
                                                                                    src="/assets/images/splash/demo-pages/demo-3.webp"
                                                                                    alt="Demo Images" /></a>
                                                                            </div>
                                                                            <div className="content">
                                                                                <h2 className="rbt-title h4"><a
                                                                                    href="home-glass.html">Glass One</a>
                                                                                </h2>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/*  End Single Demo   */}

                                                                {/*  Start Single Demo   */}
                                                                <div
                                                                    className="col-lg-1-5 col-md-12 col-sm-12 col-12 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <div
                                                                        className="demo-single rbt-scroll-trigger zoom_in animation-order-8">
                                                                        <div className="inner">
                                                                            <div className="thumbnail">
                                                                                <a href="home-phone-case.html"><img
                                                                                    src="/assets/images/splash/demo-pages/demo-4.webp"
                                                                                    alt="Demo Images" /></a>
                                                                            </div>
                                                                            <div className="content">
                                                                                <h2 className="rbt-title h4"><a
                                                                                    href="home-phone-case.html">Phone
                                                                                    One</a></h2>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/*  End Single Demo   */}

                                                                {/*  Start Single Demo   */}
                                                                <div
                                                                    className="col-lg-1-5 col-md-12 col-sm-12 col-12 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <div
                                                                        className="demo-single rbt-scroll-trigger zoom_in animation-order-9">
                                                                        <div className="inner">
                                                                            <div className="thumbnail">
                                                                                <a href="home-accessories.html"><img
                                                                                    src="/assets/images/splash/demo-pages/demo-10.webp"
                                                                                    alt="Demo Images" /></a>
                                                                            </div>
                                                                            <div className="content">
                                                                                <h2 className="rbt-title h4"><a
                                                                                    href="home-accessories.html">Accessories
                                                                                    One</a></h2>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/*  End Single Demo   */}

                                                                {/*  Start Single Demo   */}
                                                                <div
                                                                    className="col-lg-1-5 col-md-12 col-sm-12 col-12 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <div
                                                                        className="demo-single rbt-scroll-trigger zoom_in animation-order-10">
                                                                        <div className="inner">
                                                                            <div className="thumbnail">
                                                                                <a href="home-jewellery.html"><img
                                                                                    src="/assets/images/splash/demo-pages/demo-11.webp"
                                                                                    alt="Demo Images" /></a>
                                                                            </div>
                                                                            <div className="content">
                                                                                <h2 className="rbt-title h4"><a
                                                                                    href="home-jewellery.html">jewellery
                                                                                    One</a></h2>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/*  End Single Demo   */}

                                                            </div>

                                                            <div
                                                                className="load-demo-btn text-center pt--24 pt_sm--0 pt_lg--0 position-relative">
                                                                <a href="/#rbt-demo-presentation-section"
                                                                    className="rbt-btn-grp rbt-has-separator-shape justify-content-center rbt-scroll-trigger fade_in animation-order-2 pb_sm--0">
                                                                    <span
                                                                        className="rbt-btn rbt-btn-single rbt-btn rbt-marquee-btn marquee-auto rbt-btn-md has-primary-overlay has-no-hover-transform">
                                                                        <span data-text="View All The Trending Collection">
                                                                            VIEW ALL DEMOS (81+) New drops every month 🔥
                                                                        </span>
                                                                    </span>
                                                                    <span
                                                                        className="rbt-btn rbt-btn-single animated-icon-btn round-sm defalt-primary-bg p--0">
                                                                        <span className="animated-icon">
                                                                            <svg className="icon_external"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 15.5 15.5">
                                                                                <g className="icon-wrapper">
                                                                                    <path className="icon-rectangle"
                                                                                        d="m7.75,0c.41,0,.75.34.75.75s-.34.75-.75.75H3.08c-.87,0-1.58.71-1.58,1.58v9.33c0,.87.71,1.58,1.58,1.58h9.33c.87,0,1.58-.71,1.58-1.58v-4.67c0-.41.34-.75.75-.75s.75.34.75.75v4.67c0,1.7-1.38,3.08-3.08,3.08H3.08c-1.7,0-3.08-1.38-3.08-3.08V3.08C0,1.38,1.38,0,3.08,0h4.67Z"
                                                                                        strokeWidth="0">
                                                                                    </path>
                                                                                    <path className="icon-arrow-el-one"
                                                                                        d="m15.5,0v4.29c0,.41-.34.75-.75.75s-.75-.34-.75-.75V1.5h-2.75c-.38,0-.69-.28-.74-.65v-.1c0-.41.33-.75.74-.75h4.25Z"
                                                                                        strokeWidth="0"
                                                                                        style={{ translate: "none", rotate: "none", scale: "none", transformOrigin: "0px 0px 0px" }}
                                                                                        data-svg-origin="15.5 0"
                                                                                        transform="matrix(1,0,0,1,0,0)">
                                                                                    </path>
                                                                                    <path className="icon-arrow-line-one"
                                                                                        d="m14.22.22c.29-.29.77-.29,1.06,0,.29.29.29.77,0,1.06L5.95,10.61c-.29.29-.77.29-1.06,0-.29-.29-.29-.77,0-1.06.4-.4.76-.76,1.09-1.09l.47-.47c.37-.37.7-.7,1-1l.34-.34.46-.46.41-.41c.74-.74,1.29-1.29,2.09-2.09l.61-.61c.17-.17.34-.34.53-.53.13-.13.25-.25.36-.36l.59-.59c.08-.08.16-.16.23-.23l.36-.36c.1-.1.19-.19.26-.26l.42-.42s.07-.07.11-.11Z"
                                                                                        strokeWidth="0"
                                                                                        style={{ translate: "none", rotate: "none", scale: "none", transformOrigin: "0px 0px 0px" }}
                                                                                        data-svg-origin="15.4975004196167 0.002499997615814209"
                                                                                        transform="matrix(1,0,0,1,0,0)">
                                                                                    </path>
                                                                                    <path className="icon-arrow-el-two"
                                                                                        d="m15.5,0v4.29c0,.41-.34.75-.75.75s-.75-.34-.75-.75V1.5h-2.75c-.38,0-.69-.28-.74-.65v-.1c0-.41.33-.75.74-.75h4.25Z"
                                                                                        strokeWidth="0"
                                                                                        style={{ translate: "none", rotate: "none", scale: "none", transformOrigin: "0px 0px 0px" }}
                                                                                        data-svg-origin="15.5 0"
                                                                                        transform="matrix(1,0,0,1,0,0)">
                                                                                    </path>
                                                                                    <path className="icon-arrow-line-two"
                                                                                        d="m14.22.22c.29-.29.77-.29,1.06,0,.29.29.29.77,0,1.06L5.95,10.61c-.29.29-.77.29-1.06,0-.29-.29-.29-.77,0-1.06.4-.4.76-.76,1.09-1.09l.47-.47c.37-.37.7-.7,1-1l.34-.34.46-.46.41-.41c.74-.74,1.29-1.29,2.09-2.09l.61-.61c.17-.17.34-.34.53-.53.13-.13.25-.25.36-.36l.59-.59c.08-.08.16-.16.23-.23l.36-.36c.1-.1.19-.19.26-.26l.42-.42s.07-.07.11-.11Z"
                                                                                        strokeWidth="0"
                                                                                        style={{ translate: "none", rotate: "none", scale: "none", transformOrigin: "0px 0px 0px" }}
                                                                                        data-svg-origin="15.4975004196167 0.002499997615814209"
                                                                                        transform="matrix(1,0,0,1,0,0)">
                                                                                    </path>
                                                                                </g>
                                                                            </svg>
                                                                        </span>
                                                                    </span>
                                                                </a>
                                                                <span
                                                                    className="rbt-overlay-counter counter-md rbt-scroll-trigger fade_in animation-order-4">
                                                                    <span className="odometer" data-count="100">00</span>
                                                                    <span className="counter-suffix">+</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div >
                                                {/*  End Mega Menu   */}
                                            </li >

                                            <li className="with-rbt-megamenu has-menu-child-item">
                                                <a href="#!">Shop <i className="fa-regular fa-chevron-down"></i></a>
                                                {/*  Start Mega Menu   */}
                                                <div className="rbt-megamenu grid-item-3 pl_sm--0 pl_md--0 pl_lg--0">
                                                    <div className="rbt-megamenu-wrapper">
                                                        <div className="row d-none d-xl-flex">
                                                            <div className="col-lg-12">
                                                                <div className="mega-top-banner bg-two">
                                                                    <div className="rbt-banner-inner justify-content-start">
                                                                        <div className="rbt-banner-content">
                                                                            <h2 className="title">Buy One and Get 50% Off the Second
                                                                                Purchase Now</h2>
                                                                            <p className="b3 desc">Send us your idea, it may appear
                                                                                on Ocean Student Projects.</p>
                                                                        </div>
                                                                        <div
                                                                            className="pricing-action d-flex flex-column align-items-center rbt-gap--8">
                                                                            <div className="rbt-pricing-part d-flex">
                                                                                <span
                                                                                    className="rbt-price-text offer-price">₹189.00</span>
                                                                                <del className="rbt-dis-price-text">₹295.00</del>
                                                                            </div>
                                                                            <a className="rbt-btn rbt-btn-sm rbt-btn-black"
                                                                                href="product-single-default.html">View
                                                                                Details</a>
                                                                        </div>
                                                                        <a href="#" className="product-img position-bottom"><img
                                                                            src="/assets/images/splash/menu-banner/menu-prd-01.webp"
                                                                            alt="Eccommerce Product" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row row--16">
                                                            <div
                                                                className="col-lg-12 col-xl-6 col-xxl-4 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                <p className="rbt-short-title h5">Shop Pages</p>
                                                                <ul className="mega-menu-item">
                                                                    <li>
                                                                        <a href="shop.html">
                                                                            Shop Default
                                                                            <div
                                                                                className="rbt-product-badge rbt-product-badge-bg-green border-rounded">
                                                                                SHOP
                                                                            </div>
                                                                        </a>
                                                                    </li>
                                                                    <li><a href="shop-right-sidebar.html">Shop Right Sidebar</a>
                                                                    </li>
                                                                    <li><a href="shop-filter-list-left-sidebar.html">Shop List
                                                                        Left Sidebar</a></li>
                                                                    <li><a href="shop-filter-list-right-sidebar.html">Shop List
                                                                        Right Sidebar</a></li>
                                                                    <li><a href="shop-left-sidebar.html">Shop Left Sidebar</a>
                                                                    </li>
                                                                    <li><a href="shop-sticky-sidebar.html">Sticky Sidebar Shop
                                                                        <div
                                                                            className="rbt-product-badge rbt-product-badge-bg-primary border-rounded">
                                                                            POPULAR
                                                                        </div>
                                                                    </a></li>
                                                                    <li><a href="shop-collapsible-sidebar.html">Collapse Sidebar
                                                                        Shop</a></li>
                                                                    <li><a href="shop-scroll-sidebar.html">Scroll Sidebar
                                                                        Shop</a></li>
                                                                    <li><a href="shop-loadmore.html">Load More Button</a></li>
                                                                    <li><a href="shop-sm-categories.html">Shop Small
                                                                        Categories</a></li>
                                                                    <li><a href="products-inside-border-column-shop.html">Bordered
                                                                        inside
                                                                        Products Shop</a></li>
                                                                    <li><a href="products-show-rating-shop.html">
                                                                        Products Show Rating
                                                                        <div
                                                                            className="rbt-product-badge rbt-product-badge-bg-danger border-rounded">
                                                                            HOT
                                                                        </div>
                                                                    </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div
                                                                className="col-lg-12 col-xl-6 col-xxl-4 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                <p className="rbt-short-title h5">Custom Pages</p>
                                                                <ul className="mega-menu-item">
                                                                    <li><a href="shop-filter-grid-two.html">Two Columns</a></li>
                                                                    <li><a href="/shop">Three Columns</a>
                                                                    </li>
                                                                    <li><a href="shop-filter-grid-four.html">Four Columns
                                                                        <div
                                                                            className="rbt-product-badge rbt-product-badge-bg-danger border-rounded ml--8">
                                                                            POPULAR
                                                                        </div>
                                                                    </a></li>
                                                                    <li><a href="shop-wider.html">Three Columns Wide</a></li>
                                                                    <li><a href="shop-wider-four.html">
                                                                        Four Columns
                                                                        <div
                                                                            className="rbt-product-badge rbt-product-badge-bg-green border-rounded ml--8">
                                                                            POPULAR
                                                                        </div>
                                                                    </a></li>
                                                                    <li><a href="shop-wider-five.html">Five Columns Wide</a>
                                                                    </li>

                                                                    <li><a href="shop-wider-six.html">Six Columns Wide</a></li>

                                                                    <li><a href="shop-featured.html">Featured Products</a></li>
                                                                    <li><a href="shop-best-prds.html">Best Selling Products</a>
                                                                    </li>
                                                                    <li><a href="shop-collapse-filter-top.html">Hidden Side Bar
                                                                        Shop</a></li>
                                                                    <li><a href="products-show-countdown-shop-style-two.html">Products
                                                                        Show
                                                                        Countdown Two</a>
                                                                    </li>
                                                                    <li><a href="products-even-list-shop.html">Even List
                                                                        Products</a></li>
                                                                </ul>
                                                            </div>
                                                            <div
                                                                className="col-lg-12 col-xl-6 col-xxl-4 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                <p className="rbt-short-title h5">Custom Pages</p>
                                                                <ul className="mega-menu-item">
                                                                    <li><a href="shop-no-page-heading.html">Shop No Page
                                                                        Heading</a></li>
                                                                    <li><a href="shop-only-category.html">Shop Only Category</a>
                                                                    </li>
                                                                    <li><a href="shop-offcanvas-sidebar-left.html">Shop
                                                                        offcanvas Left</a></li>
                                                                    <li><a href="shop-offcanvas-sidebar-right.html">Shop
                                                                        offcanvas Right</a></li>
                                                                    <li><a href="shop-offcanvas-sidebar-top.html">Shop offcanvas
                                                                        top</a></li>
                                                                    <li><a href="shop-offcanvas-sidebar-bottom.html">Shop
                                                                        offcanvas Bottom</a></li>
                                                                    <li><a href="shop-collapse-filter-bottom.html">Shop Filter
                                                                        Collapse Bottom</a></li>
                                                                    <li><a href="shop-collapse-filter-left.html">Shop Filter
                                                                        Collapse Left</a></li>
                                                                    <li><a href="shop-collapse-filter-right.html">Shop Filter
                                                                        Collapse Right</a></li>
                                                                    <li><a href="products-show-progressbar-shop.html">Products
                                                                        Show
                                                                        Progress-bar</a></li>
                                                                    <li><a href="products-show-countdown-shop.html">Products
                                                                        Show
                                                                        Countdown</a></li>
                                                                    <li><a href="#!">Infinite Scroll
                                                                        <div
                                                                            className="rbt-product-badge rbt-product-badge-bg-yellow border-rounded">
                                                                            Coming Soon
                                                                        </div>
                                                                    </a>
                                                                    </li>
                                                                    <li><a href="#!">Shop Classic
                                                                        <div
                                                                            className="rbt-product-badge rbt-product-badge-bg-yellow border-rounded">
                                                                            Coming Soon
                                                                        </div>
                                                                    </a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*  End Mega Menu   */}
                                            </li>

                                            <li className="with-rbt-megamenu has-menu-child-item position-static">
                                                <a href="#!">Pages <i className="fa-regular fa-chevron-down"></i></a>
                                                {/*  Start Mega Menu   */}
                                                <div className="rbt-megamenu rbt-width-fullscreen mega-has-bg-img mega-bg-one p-0 ">
                                                    {/*  Start Mega Menu   */}
                                                    <div className="rbt-megamenu-wrapper bg-transparent">
                                                        <div className="wrapper">
                                                            <div className="row row--12 mt_dec--12">
                                                                <div className="col-xl-9">
                                                                    <div
                                                                        className="h-100 d-flex flex-column justify-content-between">
                                                                        <div className="row">
                                                                            <div
                                                                                className="col-12 col-lg-1-5 single-mega-item rbt-scroll-trigger fade_in animation-order-1 mt--16">
                                                                                <p className="rbt-short-title h5">Inner Pages</p>
                                                                                <ul className="mega-menu-item">
                                                                                    <li><a href="/contact">Contact Page
                                                                                        One</a></li>
                                                                                    <li><a href="about.html">About Us One</a>
                                                                                    </li>
                                                                                    <li><a href="faq-page-01.html">FAQs One</a>
                                                                                    </li>
                                                                                    <li><a href="/contact">Contact Page
                                                                                        Two</a></li>
                                                                                    <li><a href="/about">About Us
                                                                                        Two</a></li>
                                                                                    <li><a href="/contact">Contact Page
                                                                                        Four</a></li>
                                                                                    <li><a href="faq-page-02.html">FAQs Two</a>
                                                                                    </li>
                                                                                    <li><a href="find-store.html">Find A
                                                                                        Store</a></li>
                                                                                    <li><a href="compare-product.html">Compare
                                                                                        Products</a></li>
                                                                                    <li><a href="compare-empty-page.html">Compare
                                                                                        Empty</a></li>
                                                                                </ul>
                                                                            </div>
                                                                            <div
                                                                                className="col-12 col-lg-1-5 single-mega-item rbt-scroll-trigger fade_in animation-order-1 mt--16">
                                                                                <p className="rbt-short-title h5">Inner Pages</p>
                                                                                <ul className="mega-menu-item">
                                                                                    <li><a href="team-page-one.html">Team
                                                                                        One</a></li>
                                                                                    <li><a href="team-page-two.html">Team
                                                                                        Two</a></li>
                                                                                    <li><a href="team-page-three.html">Team
                                                                                        Three</a></li>
                                                                                    <li><a href="team-page-four.html">Team
                                                                                        Four</a></li>
                                                                                    <li><a href="privacy-policy.html">Privacy
                                                                                        Policy</a></li>
                                                                                    <li><a href="error-404.html">Error 404</a>
                                                                                    </li>
                                                                                    <li><a
                                                                                        href="error-maintanance.html">Maintanace</a>
                                                                                    </li>
                                                                                    <li><a href="portfolio-default.html">Portfolio
                                                                                        Default</a></li>
                                                                                    <li><a
                                                                                        href="portfolio-grid-layout-full-width.html">Portfolio
                                                                                        Full Width</a></li>
                                                                                    <li><a href="portfolio-details.html">Portfolio
                                                                                        Details</a></li>
                                                                                </ul>
                                                                            </div>
                                                                            <div
                                                                                className="col-12 col-lg-1-5 single-mega-item rbt-scroll-trigger fade_in animation-order-1 mt--16">
                                                                                <p className="rbt-short-title h5">Inner Pages</p>
                                                                                <ul className="mega-menu-item">
                                                                                    <li><a href="blog-default.html">Blog
                                                                                        Default</a></li>
                                                                                    <li><a href="blog-grid.html">Blog Grid</a>
                                                                                    </li>
                                                                                    <li><a href="blog-sidebar.html">Blog
                                                                                        Sidebar</a></li>
                                                                                    <li><a href="blog-modern.html">Blog
                                                                                        Modern</a></li>
                                                                                    <li><a href="blog-infinite-scroll.html">Blog
                                                                                        Infinite Scroll</a></li>
                                                                                    <li><a href="blog-load-more.html">Blog
                                                                                        load-more</a></li>
                                                                                    <li><a href="blog-single.html">Blog
                                                                                        Details</a></li>
                                                                                    <li><a href="brand-list.html">Brand List</a>
                                                                                    </li>
                                                                                    <li><a href="#!">Blog Timeline
                                                                                        <div
                                                                                            className="rbt-product-badge rbt-product-badge-bg-primary border-rounded">
                                                                                            Coming
                                                                                        </div>
                                                                                    </a></li>
                                                                                    <li><a href="#!">Blog Gallery
                                                                                        <div
                                                                                            className="rbt-product-badge rbt-product-badge-bg-primary border-rounded">
                                                                                            Coming
                                                                                        </div>
                                                                                    </a></li>

                                                                                </ul>
                                                                            </div>
                                                                            <div
                                                                                className="col-12 col-lg-1-5 single-mega-item rbt-scroll-trigger fade_in animation-order-1 mt--16">
                                                                                <p className="rbt-short-title h5">Shop User Pages
                                                                                </p>
                                                                                <ul className="mega-menu-item">
                                                                                    <li><a href="my-order-history.html">Order
                                                                                        History</a></li>
                                                                                    <li><a href="my-wishlist.html">Wishlist</a>
                                                                                    </li>
                                                                                    <li><a href="my-payment-methods.html">Payment
                                                                                        Methods</a></li>
                                                                                    <li><a href="account-info.html">Personal
                                                                                        info</a></li>
                                                                                    <li><a
                                                                                        href="account-notifications.html">Notifications</a>
                                                                                    </li>
                                                                                    <li><a href="help-center.html">User Help
                                                                                        Center</a></li>
                                                                                    <li><a href="terms-policy.html">Terms and
                                                                                        conditions</a></li>
                                                                                    <li><a href="signin.html">Sign In</a></li>
                                                                                    <li><a href="signup.html">Sign Up</a></li>
                                                                                    <li><a href="#!">Membership Details
                                                                                        <div
                                                                                            className="rbt-product-badge rbt-product-badge-bg-success border-rounded">
                                                                                            Coming
                                                                                        </div>
                                                                                    </a>
                                                                                    </li>

                                                                                </ul>
                                                                            </div>
                                                                            <div
                                                                                className="col-12 col-lg-1-5 single-mega-item rbt-scroll-trigger fade_in animation-order-1 mt--16">
                                                                                <p className="rbt-short-title h5">E-commerce</p>
                                                                                <ul className="mega-menu-item">
                                                                                    <li><a href="cart.html">Cart Page</a></li>
                                                                                    <li><a href="return-policy.html">
                                                                                        Return Policy
                                                                                        <div
                                                                                            className="rbt-product-badge rbt-product-badge-bg-yellow border-rounded">
                                                                                            New
                                                                                        </div>
                                                                                    </a></li>
                                                                                    <li><a href="wishlist.html">Wishlist
                                                                                        Page</a></li>
                                                                                    <li><a
                                                                                        href="checkout-delivery-step-one.html">Checkout
                                                                                        Page</a></li>
                                                                                    <li><a
                                                                                        href="checkout-delivery-step-two.html">Checkout
                                                                                        Delivary Info</a></li>
                                                                                    <li><a href="checkout-payment.html">Checkout
                                                                                        Payment</a></li>
                                                                                    <li><a href="checkout-shipping.html">Checkout
                                                                                        Shipping</a></li>
                                                                                    <li><a href="checkout-thankyou.html">Thank
                                                                                        You</a></li>
                                                                                    <li><a href="categories-list.html">Categories
                                                                                        List</a></li>
                                                                                    <li><a href="offer-list-page.html">Offer
                                                                                        List</a></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-12">
                                                                                <hr
                                                                                    className="rbt-separator rbt-separator-gray200 mb--16 mt--16 mt_sm--12 mb_sm--12 rbt-bg-color-gray-100" />
                                                                            </div>
                                                                            <div className="col-lg-12">
                                                                                <ul
                                                                                    className="rbt-nav-brand-list liststyle d-flex justify-content-xl-between">
                                                                                    <li><a href="shop-by-brands.html"><img
                                                                                        src="/assets/images/brands/brand-a-01.webp"
                                                                                        alt="Ecommerce Brand Image" /></a>
                                                                                    </li>
                                                                                    <li><a href="shop-by-brands.html"><img
                                                                                        src="/assets/images/brands/brand-a-02.webp"
                                                                                        alt="Ecommerce Brand Image" /></a>
                                                                                    </li>
                                                                                    <li><a href="shop-by-brands.html"><img
                                                                                        src="/assets/images/brands/brand-a-03.webp"
                                                                                        alt="Ecommerce Brand Image" /></a>
                                                                                    </li>
                                                                                    <li><a href="shop-by-brands.html"><img
                                                                                        src="/assets/images/brands/brand-a-04.webp"
                                                                                        alt="Ecommerce Brand Image" /></a>
                                                                                    </li>
                                                                                    <li><a href="shop-by-brands.html"><img
                                                                                        src="/assets/images/brands/brand-a-05.webp"
                                                                                        alt="Ecommerce Brand Image" /></a>
                                                                                    </li>
                                                                                    <li><a href="shop-by-brands.html"><img
                                                                                        src="/assets/images/brands/brand-a-06.webp"
                                                                                        alt="Ecommerce Brand Image" /></a>
                                                                                    </li>
                                                                                    <li><a href="shop-by-brands.html"><img
                                                                                        src="/assets/images/brands/brand-a-07.webp"
                                                                                        alt="Ecommerce Brand Image" /></a>
                                                                                    </li>
                                                                                    <li><a href="shop-by-brands.html"><img
                                                                                        src="/assets/images/brands/brand-a-01.webp"
                                                                                        alt="Ecommerce Brand Image" /></a>
                                                                                    </li>
                                                                                    <li><a href="shop-by-brands.html"><img
                                                                                        src="/assets/images/brands/brand-a-02.webp"
                                                                                        alt="Ecommerce Brand Image" /></a>
                                                                                    </li>
                                                                                    <li><a href="shop-by-brands.html"><img
                                                                                        src="/assets/images/brands/brand-a-03.webp"
                                                                                        alt="Ecommerce Brand Image" /></a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/*  End Mega Menu   */}
                                                </div>
                                                {/*  End Mega Menu   */}
                                            </li>

                                            <li className="with-rbt-megamenu has-menu-child-item position-static">
                                                <a href="#!">Elements <i className="fa-regular fa-chevron-down"></i></a>
                                                {/*  Start Mega Menu   */}
                                                <div className="rbt-megamenu container pl_sm--0 pl_md--0 pl_lg--0">
                                                    <div className="rbt-megamenu-wrapper">
                                                        <div className="row row--12 d-flex justify-content-between">
                                                            <div className="col-xl-9">
                                                                <div className="h-100 d-flex flex-column justify-content-between">
                                                                    <div className="row row--12">
                                                                        <div
                                                                            className="col-xl-3 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                            <p className="rbt-short-title h5">Base Elements</p>
                                                                            <ul className="mega-menu-item">
                                                                                <li><a href="element-titles.html">Title
                                                                                    Styles</a></li>
                                                                                <li><a href="element-carousels.html">Carosels
                                                                                    Styles</a></li>
                                                                                <li><a href="element-sliders.html">Sliders
                                                                                    Styles</a></li>
                                                                                <li><a href="element-product-banner.html">Banner
                                                                                    Styles</a></li>
                                                                                <li><a href="element-button.html">Button
                                                                                    Styles</a></li>
                                                                                <li><a href="element-brands.html">Brands
                                                                                    Styles</a></li>
                                                                                <li><a href="element-list-styles.html">List
                                                                                    Styles</a></li>
                                                                                <li><a href="#!">Icon Box Styles
                                                                                    <div
                                                                                        className="rbt-product-badge rbt-product-badge-bg-primary border-rounded">
                                                                                        Coming
                                                                                    </div>
                                                                                </a></li>
                                                                            </ul>
                                                                        </div>
                                                                        <div
                                                                            className="col-xl-3 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                            <p className="rbt-short-title h5">Template Elements</p>
                                                                            <ul className="mega-menu-item">
                                                                                <li><a href="element-hotspot-styles.html">Hotspot
                                                                                    Styles</a></li>
                                                                                <li><a href="element-countdown-styles.html">Countdown
                                                                                    Styles</a></li>
                                                                                <li><a href="element-insta-post.html">Instagram
                                                                                    Posts</a></li>
                                                                                <li><a href="element-products.html">Product Card
                                                                                    Styles</a></li>
                                                                                <li><a href="element-catagories-style.html">Catagories
                                                                                    Card Styles</a></li>
                                                                                <li><a href="element-video-styles.html">Video
                                                                                    Styles</a></li>
                                                                                <li><a href="element-header-styles.html">Header
                                                                                    Styles</a></li>
                                                                                <li><a href="element-footer-styles.html">Footer
                                                                                    Styles</a></li>
                                                                            </ul>
                                                                        </div>
                                                                        <div
                                                                            className="col-xl-3 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                            <p className="rbt-short-title h5">Template Elements</p>
                                                                            <ul className="mega-menu-item">
                                                                                <li><a href="element-table-styles.html">Table
                                                                                    Styles</a></li>
                                                                                <li><a href="element-social-buttons.html">Social
                                                                                    Buttons</a></li>
                                                                                <li><a href="element-image-gallary.html">Image
                                                                                    Gallary</a></li>
                                                                                <li><a href="element-team-styles.html">Team Card
                                                                                    Styles</a></li>
                                                                                <li><a href="element-accordion-styles.html">Accordion
                                                                                    Styles</a></li>
                                                                                <li><a href="element-portfolio-styles.html">PortFolio
                                                                                    Card Styles</a></li>
                                                                                <li><a href="element-blog-styles.html">Blog Card
                                                                                    Styles</a></li>
                                                                                <li><a href="element-review-card.html">Review
                                                                                    Cards</a></li>
                                                                            </ul>
                                                                        </div>
                                                                        <div
                                                                            className="col-xl-3 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                            <p className="rbt-short-title h5">E-Commerce</p>
                                                                            <ul className="mega-menu-item">
                                                                                <li><a href="element-recent-products.html">Recent
                                                                                    Products</a></li>
                                                                                <li><a href="element-featured-products.html">Featured
                                                                                    Products</a></li>
                                                                                <li><a
                                                                                    href="element-best-selling-products.html">Best
                                                                                    Selling Products</a></li>
                                                                                <li><a href="element-single-product.html">Single
                                                                                    Product</a></li>
                                                                                <li><a href="element-sale-products.html">Sale
                                                                                    Products</a></li>
                                                                                <li><a href="element-pricing.html">Pricing
                                                                                    Styles</a></li>
                                                                                <li><a href="element-cart.html">Cart Styles</a>
                                                                                </li>
                                                                                <li><a href="#">Order Tracking
                                                                                    <div
                                                                                        className="rbt-product-badge rbt-product-badge-bg-primary border-rounded">
                                                                                        Coming
                                                                                    </div>
                                                                                </a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row row--12 d-none d-xl-flex">
                                                                        <div className="col-12">
                                                                            <hr
                                                                                className="rbt-separator rbt-separator-gray200 mb--16 mt--16 mt_sm--12 mb_sm--12 rbt-bg-color-gray-100" />
                                                                        </div>
                                                                        <div className="col-lg-12">
                                                                            <ul
                                                                                className="rbt-nav-brand-list liststyle d-flex justify-content-xl-between">
                                                                                <li><a href="shop-by-brands.html"><img
                                                                                    src="/assets/images/brands/brand-a-01.webp"
                                                                                    alt="Ecommerce Brand Image" /></a>
                                                                                </li>
                                                                                <li><a href="shop-by-brands.html"><img
                                                                                    src="/assets/images/brands/brand-a-02.webp"
                                                                                    alt="Ecommerce Brand Image" /></a>
                                                                                </li>
                                                                                <li><a href="shop-by-brands.html"><img
                                                                                    src="/assets/images/brands/brand-a-03.webp"
                                                                                    alt="Ecommerce Brand Image" /></a>
                                                                                </li>
                                                                                <li><a href="shop-by-brands.html"><img
                                                                                    src="/assets/images/brands/brand-a-04.webp"
                                                                                    alt="Ecommerce Brand Image" /></a>
                                                                                </li>
                                                                                <li><a href="shop-by-brands.html"><img
                                                                                    src="/assets/images/brands/brand-a-05.webp"
                                                                                    alt="Ecommerce Brand Image" /></a>
                                                                                </li>
                                                                                <li><a href="shop-by-brands.html"><img
                                                                                    src="/assets/images/brands/brand-a-06.webp"
                                                                                    alt="Ecommerce Brand Image" /></a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="col-xl-3 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                <div className="rbt-menu-offer-card rbt-bg-style-box rbt-bg-two">
                                                                    <div className="mega-top-banner">
                                                                        <div
                                                                            className="rbt-banner-inner flex-column justify-content-center rbt-gap--8 align-items-center text-center">
                                                                            <div className="rbt-banner-content">
                                                                                <h2 className="title rbt-text-color-white">New
                                                                                    Aurora Watch</h2>
                                                                                <p className="b3 desc rbt-text-color-gray-200">Send
                                                                                    your idea on Ocean Student Projects.</p>
                                                                            </div>
                                                                            <a className="rbt-btn rbt-btn-sm" href="#">View
                                                                                Details</a>
                                                                            <a href="#"
                                                                                className="product-img position-bottom mt--24"><img
                                                                                    src="/assets/images/splash/menu-banner/menu-prd-03-lg.webp"
                                                                                    alt="Eccommerce Product" /></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*  End Mega Menu   */}
                                            </li>

                                            <li className="with-rbt-megamenu has-menu-child-item position-static">
                                                <a href="#!">Core Features <i className="fa-regular fa-chevron-down"></i></a>
                                                {/*  Start Mega Menu   */}
                                                <div className="rbt-megamenu p-0 container">
                                                    {/*  Start Mega Menu   */}
                                                    <div className="rbt-megamenu-wrapper p--0">
                                                        <div className="wrapper">
                                                            <div className="row row--0 mt_dec--32">
                                                                <div
                                                                    className="col-xl-8 mt--24 rbt-scroll-trigger zoom_in animation-order-2">
                                                                    <div
                                                                        className="rbt-inner-menu-wrapper p--24 p_sm--0 p_md--0 p_lg--0">
                                                                        <div className="row row-12 mt_dec--16">
                                                                            <div
                                                                                className="col-12 col-xl-4 single-mega-item rbt-scroll-trigger fade_in animation-order-1 mt--16">
                                                                                <p className="rbt-short-title h5">Ultimate User
                                                                                    Experience</p>
                                                                                <ul className="mega-menu-item">
                                                                                    <li><a href="customize-options.html">Easy to
                                                                                        Customize Codes</a></li>
                                                                                    <li><a href="page-customizability.html">Highly
                                                                                        Customizable Elements</a></li>
                                                                                    <li><a href="performance.html">Fast
                                                                                        Performance
                                                                                        <div
                                                                                            className="rbt-product-badge rbt-product-badge-bg-red border-rounded">
                                                                                            Hot
                                                                                        </div>
                                                                                    </a></li>
                                                                                    <li><a href="header-builder.html">Ultimate
                                                                                        Header Layouts</a></li>
                                                                                    <li><a href="footer-builder.html">Excessive
                                                                                        Footer Variation</a></li>
                                                                                    <li><a href="advanced-megamenu.html">Advanced
                                                                                        Mega Menu</a></li>
                                                                                    <li><a href="popup-builder.html">Popup &
                                                                                        Sidebar Search</a></li>
                                                                                    <li><a href="boost-features.html">All Boost
                                                                                        Sales Features
                                                                                        <div
                                                                                            className="rbt-product-badge rbt-product-badge-bg-primary border-rounded">
                                                                                            New
                                                                                        </div>
                                                                                    </a></li>
                                                                                    <li><a href="mobile-first.html">Mobile-first
                                                                                        Experience</a></li>
                                                                                    <li><a href="#!">User Feedback
                                                                                        <div
                                                                                            className="rbt-product-badge rbt-product-badge-bg-yellow border-rounded">
                                                                                            Coming
                                                                                        </div>
                                                                                    </a></li>
                                                                                    <li><a href="#!">Seamless Integration
                                                                                        <div
                                                                                            className="rbt-product-badge rbt-product-badge-bg-yellow border-rounded">
                                                                                            Coming
                                                                                        </div>
                                                                                    </a></li>
                                                                                </ul>
                                                                            </div>
                                                                            <div
                                                                                className="col-12 col-xl-4 single-mega-item rbt-scroll-trigger fade_in animation-order-1 mt--16">
                                                                                <p className="rbt-short-title h5">Flexible Shopping
                                                                                </p>
                                                                                <ul className="mega-menu-item">
                                                                                    <li><a href="product-filtering.html">Smart
                                                                                        Product Filtering</a></li>
                                                                                    <li><a href="variant-switcher.html">Variant
                                                                                        Swatches
                                                                                        <div
                                                                                            className="rbt-product-badge rbt-product-badge-bg-secondary border-rounded">
                                                                                            Fully Ready
                                                                                        </div>
                                                                                    </a></li>
                                                                                    <li><a href="compare-table-builder.html">Product
                                                                                        Compare</a></li>
                                                                                    <li><a href="wishlist-builder.html">WishLists
                                                                                        Builder</a></li>
                                                                                    <li><a href="quick-view.html">Quick View</a>
                                                                                    </li>
                                                                                    <li><a href="flash-sell-management.html">Flash
                                                                                        Sales Management</a></li>
                                                                                    <li><a href="cart-builder.html">Cart Upsell
                                                                                        <div
                                                                                            className="rbt-product-badge rbt-product-badge-bg-primary border-rounded">
                                                                                            New
                                                                                        </div>
                                                                                    </a></li>
                                                                                    <li><a href="size-chart-builder.html">Size
                                                                                        Chart Variation</a></li>
                                                                                    <li><a href="sticky-cart-builder.html">Sticky
                                                                                        Add To Cart</a></li>
                                                                                    <li><a href="product-display.html">Product
                                                                                        Video & 3D View</a></li>
                                                                                    <li><a href="multi-step-checkout.html">Multi-Step
                                                                                        Checkout</a></li>
                                                                                </ul>
                                                                            </div>
                                                                            <div
                                                                                className="col-12 col-xl-4 single-mega-item rbt-scroll-trigger fade_in animation-order-1 mt--16">
                                                                                <p className="rbt-short-title h5">Boost Sales</p>
                                                                                <ul className="mega-menu-item">
                                                                                    <li><a href="notifications.html">Back To
                                                                                        Stock Notification</a></li>
                                                                                    <li><a href="sales-popup.html">Sales
                                                                                        Popup</a></li>
                                                                                    <li><a href="pre-order.html">Pre Order</a>
                                                                                    </li>
                                                                                    <li><a href="backorder.html">Backorder</a>
                                                                                    </li>
                                                                                    <li><a href="partial-payment.html">Partial
                                                                                        Payment</a></li>
                                                                                    <li><a href="shareable-cart.html">Shareable
                                                                                        Cart</a></li>
                                                                                    <li><a href="bulk-amount-purchase.html">Bulk
                                                                                        Amount Purchase</a></li>
                                                                                    <li><a href="stock-progressbar.html">Stock
                                                                                        Progress Bar</a></li>
                                                                                    <li><a href="sale-push-notification.html">Sales
                                                                                        Push Notification</a></li>
                                                                                    <li><a href="offer-management.html">Special
                                                                                        Offers Management</a></li>
                                                                                    <li><a href="free-shipping.html">Free
                                                                                        Shipping Threshold</a></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="col-xl-4 mt--24 single-mega-item rbt-scroll-trigger zoom_in animation-order-2">
                                                                    <img className="h-100"
                                                                        src="/assets/images/header-bg/megamenu-banner-hr-01.webp"
                                                                        alt="Eccommerce Banner" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/*  End Mega Menu   */}
                                                </div>
                                                {/*  End Mega Menu   */}
                                            </li>

                                            <li className="has-dropdown position-relative">
                                                <a href="#!">More <i className="fa-regular fa-chevron-down"></i></a>
                                                <ul className="submenu">
                                                    <li><a href="docs/index.html">Documentation</a></li>
                                                    <li><a href="https://www.youtube.com/@rainbow-themes/videos">Video
                                                        Tutorials</a></li>
                                                    <li>
                                                        <a href="https://support.rainbowit.net/support/login">
                                                            Support Center
                                                            <div
                                                                className="rbt-product-badge rbt-product-badge-bg-green border-rounded">
                                                                24/7
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li><a href="docs/doc-changelog.html">Change Log</a></li>
                                                    <li><a href="https://rainbowthemes.net/contact/">Contact Us</a></li>
                                                    <li><a href="https://rainbowthemes.net/faqs/">FAQ</a></li>
                                                    <li><a href="https://rainbowthemes.net/services/">Customization</a></li>
                                                </ul>
                                            </li>
                                        </ul >
                                    </nav >
                                </div >
                                <div className="tab-pane fade" id="rbt-tab-pane-mobilemenu-2" role="tabpanel"
                                    aria-labelledby="rbt-tab-mobilemenu-2" tabIndex={0}>
                                    <nav className="rbt-mainmenu-nav">
                                        <ul className="mainmenu">
                                            <li className="with-rbt-megamenu has-menu-child-item position-static">
                                                <a href="shop-by-categories.html">
                                                    <span><i
                                                        className="rbt-catagories-icon mr--8 fa-regular fa-house-chimney"></i></span>Home
                                                    & Garden
                                                    <span className="rbt-chevron-right"><i
                                                        className="fa-regular fa-chevron-right"></i></span>
                                                </a>
                                                {/*  Start Mega Menu   */}
                                                <div className="rbt-megamenu grid-item-5 pl_sm--0 pl_md--0 pl_lg--0">
                                                    <div className="container p_sm--0 p_md--0 p_lg--0">
                                                        <div className="rbt-megamenu-wrapper">
                                                            {/*  Start Card Area  */}
                                                            <div className="row row--12">
                                                                <div
                                                                    className="col-lg-12 col-xl-3 col-xxl-3 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <p className="rbt-short-title h5">Home & Garden</p>
                                                                    <ul className="mega-menu-item">
                                                                        <li><a href="shop-by-category.html">Furniture</a></li>
                                                                        <li><a href="shop-by-category.html">Living Room Sets</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">Sofas & Couches</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">Coffee Tables</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">Bedroom
                                                                            Furniture</a></li>
                                                                        <li><a href="shop-by-category.html">Mattresses &
                                                                            Bedding</a></li>
                                                                        <li><a href="shop-by-category.html">Wardrobes &
                                                                            Storage</a></li>
                                                                    </ul>
                                                                </div>
                                                                <div
                                                                    className="col-lg-12 col-xl-3 col-xxl-3 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <p className="rbt-short-title h5">More Home & Garden</p>
                                                                    <ul className="mega-menu-item">
                                                                        <li><a href="shop-by-category.html">Home Decor</a></li>
                                                                        <li><a href="shop-by-category.html">Clocks & Mirrors</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">Curtains &
                                                                            Blinds</a></li>
                                                                        <li><a href="shop-by-category.html">Rugs & Carpets</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">Lighting & Lamps</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">Outdoor
                                                                            Furniture</a></li>
                                                                        <li><a href="shop-by-category.html">BBQ & Grills</a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div
                                                                    className="col-lg-12 col-xl-3 col-xxl-3 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <div className="rbt-menu-offer-card">
                                                                        <div className="mega-top-banner rbt-bg-color-extra-six">
                                                                            <div
                                                                                className="rbt-banner-inner flex-column justify-content-center rbt-gap--8 align-items-center text-center">
                                                                                <div className="rbt-banner-content">
                                                                                    <h2 className="title">All For Garden</h2>
                                                                                    <p className="b3 desc">Send your idea, appear
                                                                                        on Ocean Student Projects.</p>
                                                                                </div>
                                                                                <a className="rbt-btn rbt-btn-sm rbt-btn-black"
                                                                                    href="product-single-default.html">View
                                                                                    Details</a>
                                                                                <a href="#"
                                                                                    className="product-img position-bottom mt--24"><img
                                                                                        src="/assets/images/splash/menu-banner/menu-prd-garden.webp"
                                                                                        alt="Eccommerce Product" /></a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/*  End Card Area  */}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*  End Mega Menu   */}
                                            </li>

                                            <li className="with-rbt-megamenu has-menu-child-item position-static">
                                                <a href="shop-by-categories.html">
                                                    <span><i
                                                        className="rbt-catagories-icon mr--8 fa-regular fa-mobile-notch"></i></span>Smart
                                                    Phones
                                                    <span className="rbt-chevron-right"><i
                                                        className="fa-regular fa-chevron-right"></i></span>
                                                </a>
                                                {/*  Start Mega Menu   */}
                                                <div className="rbt-megamenu grid-item-5 pl_sm--0 pl_md--0 pl_lg--0">
                                                    <div className="container p_sm--0 p_md--0 p_lg--0">
                                                        <div className="rbt-megamenu-wrapper">
                                                            {/*  Start Card Area  */}
                                                            <div className="row row--12">
                                                                <div
                                                                    className="col-lg-12 col-xl-3 col-xxl-3 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <p className="rbt-short-title h5">Smart Phones</p>
                                                                    <ul className="mega-menu-item">
                                                                        <li><a href="shop-by-category.html">Latest Models</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">5G Phones</a></li>
                                                                        <li><a href="shop-by-category.html">Android Phones</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">iPhones</a></li>
                                                                        <li><a href="shop-by-category.html">Gaming Phones</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">Budget Phones</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">Accessories</a></li>
                                                                    </ul>
                                                                </div>
                                                                <div
                                                                    className="col-lg-12 col-xl-3 col-xxl-3 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <p className="rbt-short-title h5">Tablets & Accessories</p>
                                                                    <ul className="mega-menu-item">
                                                                        <li><a href="shop-by-category.html">Latest Tablets</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">Android Tablets</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">iPads</a></li>
                                                                        <li><a href="shop-by-category.html">Tablet Keyboards</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">Stylus Pens</a></li>
                                                                        <li><a href="shop-by-category.html">Screen
                                                                            Protectors</a></li>
                                                                        <li><a href="shop-by-category.html">Tablet Cases</a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div
                                                                    className="col-lg-12 col-xl-3 col-xxl-3 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <div
                                                                        className="rbt-menu-offer-card rbt-bg-style-box rbt-bg-two">
                                                                        <div className="mega-top-banner">
                                                                            <div
                                                                                className="rbt-banner-inner flex-column justify-content-center rbt-gap--8 align-items-center text-center">
                                                                                <div className="rbt-banner-content">
                                                                                    <h2 className="title rbt-text-color-white">Apple
                                                                                        16 Pro</h2>
                                                                                    <p className="b3 desc rbt-text-color-gray-200">
                                                                                        Send your idea on Ocean Student Projects.</p>
                                                                                </div>
                                                                                <a className="rbt-btn rbt-btn-sm" href="#">View
                                                                                    Details</a>
                                                                                <a href="#"
                                                                                    className="product-img position-bottom mt--24"><img
                                                                                        src="/assets/images/splash/menu-banner/menu-prd-apple.webp"
                                                                                        alt="Eccommerce Product" /></a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/*  End Card Area  */}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*  End Mega Menu   */}
                                            </li>
                                            <li className="with-rbt-megamenu has-menu-child-item position-static">
                                                <a href="shop-by-categories.html">
                                                    <span><i
                                                        className="rbt-catagories-icon mr--8 fa-regular fa-desktop"></i></span>Electronics
                                                    Gadgets
                                                    <span className="rbt-chevron-right"><i
                                                        className="fa-regular fa-chevron-right"></i></span>
                                                </a>
                                                {/*  Start Mega Menu   */}
                                                <div className="rbt-megamenu grid-item-5 pl_sm--0 pl_md--0 pl_lg--0">
                                                    <div className="container p_sm--0 p_md--0 p_lg--0">
                                                        <div className="rbt-megamenu-wrapper">
                                                            {/*  Start Card Area  */}
                                                            <div className="row row--12">
                                                                <div
                                                                    className="col-lg-12 col-xl-3 col-xxl-3 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <p className="rbt-short-title h5">Wearable Tech</p>
                                                                    <ul className="mega-menu-item">
                                                                        <li><a href="shop-by-category.html">Smartwatches</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">Fitness Trackers</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">VR & AR Headsets</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">Smart Glasses</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">Sleep Trackers</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">Wearable Cameras</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">Wireless Earbuds</a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div
                                                                    className="col-lg-12 col-xl-3 col-xxl-3 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <p className="rbt-short-title h5">Smart Home & Office</p>
                                                                    <ul className="mega-menu-item">
                                                                        <li><a href="shop-by-category.html">Smart Speakers</a>
                                                                        </li>
                                                                        <li><a href="shop-by-category.html">Smart Plugs &
                                                                            Lights</a></li>
                                                                        <li><a href="shop-by-category.html">Home Security
                                                                            Systems</a></li>
                                                                        <li><a href="shop-by-category.html">Streaming
                                                                            Devices</a></li>
                                                                        <li><a href="shop-by-category.html">External
                                                                            Monitors</a></li>
                                                                        <li><a href="shop-by-category.html">Portable
                                                                            Projectors</a></li>
                                                                    </ul>
                                                                </div>
                                                                <div
                                                                    className="col-lg-12 col-xl-3 col-xxl-3 single-mega-item rbt-scroll-trigger fade_in animation-order-1">
                                                                    <div
                                                                        className="rbt-menu-offer-card rbt-bg-color-brand-50 rbt-rounded--12">
                                                                        <div className="mega-top-banner">
                                                                            <div
                                                                                className="rbt-banner-inner flex-column justify-content-center rbt-gap--8 align-items-center text-center">
                                                                                <div className="rbt-banner-content">
                                                                                    <h2 className="title">Straps of Colors</h2>
                                                                                    <p className="b3 desc">Send your idea, appear
                                                                                        on Ocean Student Projects.</p>
                                                                                </div>
                                                                                <a className="rbt-btn rbt-btn-sm rbt-btn-black"
                                                                                    href="product-single-default.html">View
                                                                                    Details</a>
                                                                                <a href="#"
                                                                                    className="product-img position-bottom mt--24"><img
                                                                                        src="/assets/images/splash/menu-banner/menu-prd-02-lg.webp"
                                                                                        alt="Eccommerce Product" /></a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/*  End Card Area  */}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*  End Mega Menu   */}
                                            </li>
                                            <li>
                                                <a href="shop-by-categories.html">
                                                    <span><i
                                                        className="rbt-catagories-icon mr--8 fa-regular fa-microchip"></i></span>Arduino Boards
                                                </a>
                                            </li>
                                            <li>
                                                <a href="shop-by-categories.html">
                                                    <span><i
                                                        className="rbt-catagories-icon mr--8 fa-regular fa-laptop-code"></i></span>Raspberry Pi
                                                </a>
                                            </li>
                                            <li>
                                                <a href="shop-by-categories.html">
                                                    <span><i
                                                        className="rbt-catagories-icon mr--8 fa-regular fa-gears"></i></span>Sensors & Modules
                                                </a>
                                            </li>
                                            <li>
                                                <a href="shop-by-categories.html">
                                                    <span><i
                                                        className="rbt-catagories-icon mr--8 fa-regular fa-tv"></i></span>Displays & Screens
                                                </a>
                                            </li>
                                            <li>
                                                <a href="categories-list.html">
                                                    View All Categories
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div >
                        </div >
                    </div >
                    <div className="mobile-menu-bottom">
                        <div className="social-share-wrapper">
                            <span className="rbt-short-title d-block">Find With Us</span>
                            <ul className="rbt-social-icon-list mt--12">
                                <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-whatsapp"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-telegram"></i></a></li>
                            </ul>
                        </div>
                        <ul className="navbar-top-left rbt-information-list justify-content-center">
                            <li>
                                <a href="cdn-cgi/l/email-protection.html#29414c454546694c51484459454c074a4644"><i
                                    className="fa-light fa-envelope"></i><span className="__cf_email__"
                                        data-cfemail="a7c2dfc6cad7cbc2e7c0cac6cecb89c4c8ca">[email&#160;protected]</span></a>
                            </li>
                            <li>
                                <a href="tel:+302555-0107"><i className="fa-regular fa-phone"></i>(302) 555-0107</a>
                            </li>
                        </ul>
                    </div>
                </div >
            </div >
        </>
    );
}