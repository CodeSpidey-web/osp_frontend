export default function Modals() {
  return (
    <>
    {/*  Start Modal Area   */}
    <div className="rbt-default-modal modal fade rbt-insta-single-modal has-rbt-top-folder-shape" id="instaModal"
        tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="instaModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-0">

                <div className="rbt-folder-shape-right-portion">
                    <svg xmlns="http://www.w3.org/2000/svg" width="85" height="90" viewBox="0 0 85 90" fill="none">
                        <path
                            d="M0 0H11.1844C14.5695 0 17.7971 1.42971 20.0716 3.93671L82.1927 72.4059C83.9992 74.397 84.9999 76.9893 84.9999 79.6778C84.9999 85.6547 85.0001 90 85.0001 90H0V0Z"
                            fill="white" />
                    </svg>
                </div>

                <div className="modal-header">
                    <button type="button" className="rbt-round-btn rbt-modal-dis-btn" data-bs-dismiss="modal"
                        aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="rbt-top-folder-shape-wrapper">
                    <div className="modal-body p-0 rbt-bg-color-white rbt-content-trs-portion">
                        <div className="inner rbt-insta-single-modal">
                            <div className="row row--16">
                                <div className="col-lg-6 col-md-12 col-12">
                                    <div className="rbt-single-insta-img">
                                        <img src="/assets/images/insta-posts/insta-post-single-01.webp"
                                            alt="Ocean Student Projects instagram Single Post Image" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-12">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="rbt-component-section-title text-center">
                                                <h2 className="rbt-title h4" id="instaModalLabel">Products In <span
                                                        className="rbt-bold--text">Image</span></h2>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rbt-right-modal-content">
                                        {/*  Start Card Area  */}
                                        <div className="row row--12 mb--24 mt_dec--24">

                                            {/*  Start Single Card   */}
                                            <div className="col-lg-6 col-xl-6 col-6 mt--24">
                                                <div className="rbt-card rbt-product-card">
                                                    <div className="rbt-card-img top-rounded-md rbt-bg-color-gray-light">
                                                        <a href="product-single-default.html"><img
                                                                src="/assets/images/product-img/electronics/electro-c-01.webp"
                                                                alt="Card Image" /></a>
                                                        <div
                                                            className="rbt-product-badge rbt-product-badge-bg-primary rbt-badge-top-left--position">
                                                            SALE</div>
                                                        <button
                                                            className="rbt-wishlisted-btn rbt-round-btn bg-light-one rbt-top-right--position tooltips"
                                                            type="button" data-tooltip="Add to wishlist"
                                                            data-tooltip-position="left"><i
                                                                className="fa-regular fa-heart"></i></button>
                                                    </div>
                                                    <div className="rbt-card-body">
                                                        <a href="#"
                                                            className="rbt-card-subtitle rbt-card-catagories-text">Controllers</a>
                                                        <h3 className="rbt-card-title h6"><a
                                                                href="product-single-default.html">Bella HAY Side Table
                                                                Oxd
                                                                Awesome LadiS Bag</a></h3>
                                                        <div className="rbt-card-rating">
                                                            <ul className="rbt-rating-icon-list">
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                            </ul>
                                                            <p className="rating-digit">(25)</p>
                                                        </div>
                                                        <div className="pricing-part">
                                                            <del className="price-text">₹5,000</del>
                                                            <span className="price-text">₹2,999</span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            {/*  End Single Card   */}

                                            {/*  Start Single Card   */}
                                            <div className="col-lg-6 col-xl-6 col-6 mt--24">
                                                <div className="rbt-card rbt-product-card">
                                                    <div className="rbt-card-img top-rounded-md rbt-bg-color-gray-light">
                                                        <a href="product-single-default.html"><img
                                                                src="/assets/images/product-img/electronics/electro-c-02.webp"
                                                                alt="Card Image" /></a>
                                                        <button
                                                            className="rbt-wishlisted-btn rbt-round-btn bg-light-one rbt-top-right--position tooltips"
                                                            type="button" data-tooltip="Add to wishlist"
                                                            data-tooltip-position="left"><i
                                                                className="fa-regular fa-heart"></i></button>
                                                    </div>
                                                    <div className="rbt-card-body">
                                                        <a href="#"
                                                            className="rbt-card-subtitle rbt-card-catagories-text">SBCs</a>
                                                        <h3 className="rbt-card-title h6"><a
                                                                href="product-single-default.html">Cnvrs All Star
                                                                Disrupt Cx
                                                                Hi and most beautifull Field Tops</a></h3>
                                                        <div className="rbt-card-rating">
                                                            <ul className="rbt-rating-icon-list">
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                            </ul>
                                                            <p className="rating-digit">(25)</p>
                                                        </div>
                                                        <div className="pricing-part">
                                                            <del className="price-text">₹5,000</del>
                                                            <span className="price-text">₹2,999</span>
                                                            <span className="rbt-offer-badge">-30%</span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            {/*  End Single Card   */}

                                            {/*  Start Single Card   */}
                                            <div className="col-lg-6 col-xl-6 col-6 mt--24">
                                                <div className="rbt-card rbt-product-card">
                                                    <div className="rbt-card-img top-rounded-md rbt-bg-color-gray-light">
                                                        <a href="product-single-default.html"><img
                                                                src="/assets/images/product-img/electronics/electro-c-03.webp"
                                                                alt="Card Image" /></a>
                                                        <div
                                                            className="rbt-product-badge rbt-product-badge-bg-primary rbt-badge-top-left--position">
                                                            SALE</div>
                                                        <button
                                                            className="rbt-wishlisted-btn rbt-round-btn bg-light-one rbt-top-right--position tooltips"
                                                            type="button" data-tooltip="Add to wishlist"
                                                            data-tooltip-position="left"><i
                                                                className="fa-regular fa-heart"></i></button>
                                                    </div>
                                                    <div className="rbt-card-body">
                                                        <a href="#"
                                                            className="rbt-card-subtitle rbt-card-catagories-text">Sensors</a>
                                                        <h3 className="rbt-card-title h6"><a
                                                                href="product-single-default.html">Ultrasonic Distance Measuring Sensor HC-SR04</a></h3>
                                                        <div className="rbt-card-rating">
                                                            <ul className="rbt-rating-icon-list">
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                            </ul>
                                                            <p className="rating-digit">(25)</p>
                                                        </div>
                                                        <div className="pricing-part">
                                                            <del className="price-text">₹5,000</del>
                                                            <span className="price-text">₹2,999</span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            {/*  End Single Card   */}

                                            {/*  Start Single Card   */}
                                            <div className="col-lg-6 col-xl-6 col-6 mt--24">
                                                <div className="rbt-card rbt-product-card">
                                                    <div className="rbt-card-img top-rounded-md rbt-bg-color-gray-light">
                                                        <a href="product-single-default.html"><img
                                                                src="/assets/images/product-img/electronics/electro-c-04.webp"
                                                                alt="Card Image" /></a>
                                                        <button
                                                            className="rbt-wishlisted-btn rbt-round-btn bg-light-one rbt-top-right--position tooltips"
                                                            type="button" data-tooltip="Add to wishlist"
                                                            data-tooltip-position="left"><i
                                                                className="fa-regular fa-heart"></i></button>
                                                    </div>
                                                    <div className="rbt-card-body">
                                                        <a href="#"
                                                            className="rbt-card-subtitle rbt-card-catagories-text">Sensors</a>
                                                        <h3 className="rbt-card-title h6"><a
                                                                href="product-single-default.html">PIR Motion Sensor Module (High Sensitivity)</a></h3>
                                                        <div className="rbt-card-rating">
                                                            <ul className="rbt-rating-icon-list">
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                            </ul>
                                                            <p className="rating-digit">(25)</p>
                                                        </div>
                                                        <div className="pricing-part">
                                                            <del className="price-text">₹5,000</del>
                                                            <span className="price-text">₹2,999</span>
                                                            <span className="rbt-offer-badge">-30%</span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            {/*  End Single Card   */}

                                        </div>
                                        {/*  End Card Area  */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    {/*  End Modal Area   */}
    {/*  Start Coupon Collection Modal Area   */}
    <div className="rbt-default-modal modal fade" id="findstoreModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered xl-size">
            <div className="modal-content p--0">

                <div className="modal-header">
                    <button type="button" className="rbt-round-btn rbt-modal-dis-btn" data-bs-dismiss="modal"
                        aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="rbt-google-map bg-color-white">
                    <iframe className="w-100"
                        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2965.0824050173574!2d-93.63905729999999!3d41.998507000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWebFilings%2C+University+Boulevard%2C+Ames%2C+IA!5e0!3m2!1sen!2sus!4v1390839289319"
                        height="600" style={{ border: "0" }}></iframe>
                </div>
            </div>
        </div>
    </div>
    {/*  End Coupon Collection Modal Area   */}

    {/*  Start Quick View Modal Area   */}
    <div className="rbt-default-modal modal fade has-rbt-top-folder-shape" id="quickviewModal" tabIndex={-1}
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

                <div className="rbt-folder-shape-right-portion">
                    <svg xmlns="http://www.w3.org/2000/svg" width="85" height="90" viewBox="0 0 85 90" fill="none">
                        <path
                            d="M0 0H11.1844C14.5695 0 17.7971 1.42971 20.0716 3.93671L82.1927 72.4059C83.9992 74.397 84.9999 76.9893 84.9999 79.6778C84.9999 85.6547 85.0001 90 85.0001 90H0V0Z"
                            fill="white" />
                    </svg>
                </div>

                <div className="modal-header">
                    <button type="button" className="rbt-round-btn rbt-modal-dis-btn" data-bs-dismiss="modal"
                        aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="rbt-top-folder-shape-wrapper">
                    <div
                        className="rbt-content-trs-portion rbt-arrow-between rbt-swiper-container-one rbt-arrow-between-lg-dis">
                        {/*  Start banner part  */}
                        <div className="swiper rbt-qs-wrapper-slide-acivation">
                            <div className="swiper-wrapper">
                                {/*  Slides  */}
                                <div className="swiper-slide">
                                    {/*  Start Component Area  */}
                                    <div className="rbt-single-product-area">
                                        <div className="row row--16">
                                            <div className="col-lg-6 col-12">
                                                <div
                                                    className="rbt-product-view-slider rbt-single-product-media-area  rbt-single-product-media-has-folder-shape">
                                                    <div
                                                        className="swiper rbt-arrow-between rbt-product-single-slider-activation rbt-arrow-show-dfl">
                                                        <div className="swiper-wrapper">
                                                            <div className="swiper-slide">
                                                                <div className="thumbnail radius-16">
                                                                    <div className="rbt-product-single-img">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-1.webp"
                                                                            alt="Product Images" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <div className="thumbnail radius-16">
                                                                    <div className="rbt-product-single-img">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-2.webp"
                                                                            alt="Product Images" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <div className="thumbnail radius-16">
                                                                    <div className="rbt-product-single-img">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-3.webp"
                                                                            alt="Product Images" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <div className="thumbnail radius-16">
                                                                    <div className="rbt-product-single-img">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-4.webp"
                                                                            alt="Product Images" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <div className="thumbnail radius-16">
                                                                    <div className="rbt-product-single-img">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-1.webp"
                                                                            alt="Product Images" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <div className="thumbnail radius-16">
                                                                    <div className="rbt-product-single-img">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-2.webp"
                                                                            alt="Product Images" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <div className="thumbnail radius-16">
                                                                    <div className="rbt-product-single-img">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-3.webp"
                                                                            alt="Product Images" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <div className="thumbnail radius-16">
                                                                    <div className="rbt-product-single-img">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-4.webp"
                                                                            alt="Product Images" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-swiper-arrow rbt-modal-arrow-sm-left"
                                                            data-rbt-position-horigental="3">
                                                            <div className="custom-overflow">
                                                                <i className="rbt-icon fa-regular fa-arrow-left"></i>
                                                                <i className="rbt-icon-top fa-regular fa-arrow-left"></i>
                                                            </div>
                                                        </div>

                                                        <div className="rbt-swiper-arrow rbt-modal-arrow-sm-right"
                                                            data-rbt-position-horigental="86">
                                                            <div className="custom-overflow">
                                                                <i className="rbt-icon fa-regular fa-arrow-right"></i>
                                                                <i className="rbt-icon-top fa-regular fa-arrow-right"></i>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div
                                                        className="swiper rbt-product-thumb-slider-activation mt--24 mt_sm--16">
                                                        <div className="swiper-wrapper">
                                                            <div className="swiper-slide">
                                                                <button className="thumbnail d-block">
                                                                    <span className="rbt-thumb-img-sm">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-1.webp"
                                                                            alt="Product Images" />
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <button className="thumbnail d-block">
                                                                    <span className="rbt-thumb-img-sm">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-2.webp"
                                                                            alt="Product Images" />
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <button className="thumbnail d-block">
                                                                    <span className="rbt-thumb-img-sm">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-3.webp"
                                                                            alt="Product Images" />
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <button className="thumbnail d-block">
                                                                    <span className="rbt-thumb-img-sm">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-4.webp"
                                                                            alt="Product Images" />
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <button className="thumbnail d-block">
                                                                    <span className="rbt-thumb-img-sm">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-1.webp"
                                                                            alt="Product Images" />
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <button className="thumbnail d-block">
                                                                    <span className="rbt-thumb-img-sm">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-2.webp"
                                                                            alt="Product Images" />
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <button className="thumbnail d-block">
                                                                    <span className="rbt-thumb-img-sm">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-3.webp"
                                                                            alt="Product Images" />
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <button className="thumbnail d-block">
                                                                    <span className="rbt-thumb-img-sm">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-4.webp"
                                                                            alt="Product Images" />
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12 mt_sm--12 content">
                                                <a href="shop-by-category.html"
                                                    className="rbt-card-subtitle rbt-card-catagories-text mt--0">Headphones</a>
                                                <div className="rbt-card-title h4"><a
                                                        href="product-single-default.html">Beats
                                                        Wireless Earbuds with
                                                        Charging Case - Bluetooth In-Ear Headphones</a></div>
                                                <div className="rbt-scroll-vertical-wrapper rbt-vertical-height-sm">
                                                    <div className="rbt-scroll-vertical content">
                                                        <p className="description-text b2">
                                                            At vero eos et accusamus et iusto dignissimos ducimus
                                                            blanditiis
                                                            praesentium voluptatu
                                                            atque...
                                                        </p>
                                                        <div
                                                            className="rbt-info-wrapper d-flex justify-content-between mt--16">
                                                            <div className="pricing-part mt--0">
                                                                <del className="price-text">₹5,000</del>
                                                                <span className="price-text">₹2,999</span>
                                                                <span className="rbt-offer-badge">-30%</span>
                                                            </div>
                                                            <div className="prd-info-section has-left-separator">
                                                                <div className="prd-id-text">
                                                                    <p className="text-bold">SKU:</p>
                                                                    <p> HN-508801</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-info-wrapper d-flex mt--16">
                                                            <div className="rbt-card-rating mt--0">
                                                                <ul className="rbt-rating-icon-list">
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i>
                                                                    </li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i>
                                                                    </li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i>
                                                                    </li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i>
                                                                    </li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i>
                                                                    </li>
                                                                </ul>
                                                                <p className="rating-digit">(46)</p>
                                                                <div
                                                                    className="rbt-text-swiper-container rbt-arrow-vertical">
                                                                    <div className="swiper-wrapper">
                                                                        <div className="swiper-slide">
                                                                            <div className="rbt-text-group"> <span
                                                                                    className="icon mr--4"><i
                                                                                        className="fa-solid fa-bag-shopping"></i></span>
                                                                                90+ Sold Recently
                                                                            </div>
                                                                        </div>
                                                                        <div className="swiper-slide">
                                                                            <div className="rbt-text-group"> <span
                                                                                    className="icon mr--4"><i
                                                                                        className="fa-solid fa-truck"></i></span>
                                                                                Free shipping
                                                                            </div>
                                                                        </div>
                                                                        <div className="swiper-slide">
                                                                            <div className="rbt-text-group"> <span
                                                                                    className="icon mr--4"><i
                                                                                        className="fa-solid fa-rotate-left"></i></span>
                                                                                7 Days Return Plicy
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="rbt-verticle-arrow rbt-arrow-prev">
                                                                        <i className="fa-regular fa-chevron-up"></i>
                                                                    </div>
                                                                    <div className="rbt-verticle-arrow rbt-arrow-next">
                                                                        <i className="fa-regular fa-chevron-down"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="prd-info-section has-left-separator">
                                                                <div
                                                                    className="rbt-badge rbt-badge-bg-green rbt-badge-border rbt-badge-small rbt-badge-rounded">
                                                                    9 in Stock</div>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-info-wrapper d-flex mt--8">
                                                            <div className="prd-info-section">
                                                                <div className="prd-id-text">
                                                                    <p className="text-bold">Brand:</p>
                                                                    <a href="shop-by-brands.html"
                                                                        className="rbt-brand-img tooltips"
                                                                        data-tooltip="Product Brand"
                                                                        data-tooltip-position="top"><img
                                                                            src="/assets/images/icons/small-brand/sm-brand-b-01.webp"
                                                                            alt="Small icon Brand" /></a>
                                                                </div>
                                                            </div>
                                                            <div className="prd-info-section has-left-separator">
                                                                <div className="prd-id-text">
                                                                    <p className="text-bold">All Europe</p>
                                                                    <a href="shop-by-brands.html"
                                                                        className="rbt-brand-img tooltips"
                                                                        data-tooltip="All Europe Delivary"
                                                                        data-tooltip-position="top"><img
                                                                            src="/assets/images/icons/small-brand/sm-brand-b-02.webp"
                                                                            alt="Small icon Brand" /></a>
                                                                </div>
                                                            </div>
                                                            <div className="prd-info-section has-left-separator">
                                                                <div className="prd-id-text">
                                                                    <p className="text-bold">Verified:</p>
                                                                    <span className="rbt-brand-img tooltips"
                                                                        data-tooltip="Verified Product"
                                                                        data-tooltip-position="top"><img
                                                                            src="/assets/images/icons/small-brand/sm-brand-b-03.webp"
                                                                            alt="Small icon Brand" /></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="rbt-info-wrapper d-flex mt--16 rbt-gap--8 flex-wrap">
                                                            <div className="prd-info-section">
                                                                <a className="rbt-quick-info-tag d-flex align-items-center rbt-gap--8 rbt-shiny"
                                                                    href="#">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14"
                                                                        height="10" viewBox="0 0 14 10" fill="none">
                                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                                            d="M1.98586 5.18652C1.93484 5.12038 1.88687 5.05807 1.84423 5.00038C2.25958 4.44469 2.71871 3.92381 3.21712 3.44281C4.28087 2.42212 5.61949 1.53911 7 1.53911C8.38051 1.53911 9.71837 2.42212 10.7829 3.44281C11.2813 3.92383 11.7404 4.44471 12.1558 5.00038C11.7402 5.55588 11.2811 6.07675 10.7829 6.55796C9.71837 7.57865 8.38051 8.46166 7 8.46166C5.61949 8.46166 4.28163 7.57865 3.21712 6.55796C2.77476 6.13114 2.36329 5.67282 1.98586 5.18652ZM13.7297 4.58042L13.0916 5.00038L13.7297 5.42035L13.7282 5.42266L13.7259 5.42574L13.7183 5.43804L13.6901 5.47958C13.5374 5.70347 13.378 5.92253 13.2119 6.13645C12.789 6.68142 12.3279 7.19501 11.8322 7.67326C10.6915 8.76779 8.98433 10 7 10C5.01566 10 3.3085 8.76779 2.16785 7.67326C1.47767 7.00644 0.855254 6.27156 0.30991 5.47958C0.300444 5.46579 0.291053 5.45194 0.281736 5.43804L0.274122 5.42574L0.271837 5.42266L0.271076 5.42112C0.271076 5.42035 0.270314 5.42035 0.908409 5.00038L0.270314 4.58042L0.271837 4.57811L0.274122 4.57503L0.281736 4.56273C0.323524 4.49897 0.366683 4.43614 0.411182 4.37428C0.932338 3.63825 1.52073 2.95324 2.16861 2.32828C3.30773 1.23144 5.01566 0 7 0C8.98433 0 10.6915 1.23221 11.8322 2.32674C12.5223 2.99355 13.1448 3.72843 13.6901 4.52042L13.7183 4.56196L13.7259 4.57426L13.7282 4.57734L13.7289 4.57888L13.7297 4.58042ZM13.0916 5.00038L13.7297 4.58042L14 5.00038L13.7297 5.42035L13.0916 5.00038ZM0.270314 4.58042L0.908409 5.00038L0.270314 5.42035L0 5.00038L0.270314 4.58042ZM6.23855 5.00038C6.23855 4.79639 6.31877 4.60075 6.46157 4.4565C6.60437 4.31225 6.79805 4.23121 7 4.23121C7.20195 4.23121 7.39563 4.31225 7.53842 4.4565C7.68122 4.60075 7.76145 4.79639 7.76145 5.00038C7.76145 5.20438 7.68122 5.40002 7.53842 5.54427C7.39563 5.68852 7.20195 5.76956 7 5.76956C6.79805 5.76956 6.60437 5.68852 6.46157 5.54427C6.31877 5.40002 6.23855 5.20438 6.23855 5.00038ZM7 2.69287C6.39415 2.69287 5.81312 2.93598 5.38472 3.36873C4.95632 3.80147 4.71565 4.38839 4.71565 5.00038C4.71565 5.61238 4.95632 6.1993 5.38472 6.63204C5.81312 7.06479 6.39415 7.3079 7 7.3079C7.60585 7.3079 8.18688 7.06479 8.61528 6.63204C9.04367 6.1993 9.28435 5.61238 9.28435 5.00038C9.28435 4.38839 9.04367 3.80147 8.61528 3.36873C8.18688 2.93598 7.60585 2.69287 7 2.69287Z"
                                                                            fill="#24BD25" />
                                                                    </svg>
                                                                    <p><strong>20 people are viewing this</strong></p>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-info-wrapper d-flex mt--16">
                                                            <div className="prd-info-section">
                                                                <div className="prd-id-text">
                                                                    <p className="text-bold">Color:</p>
                                                                    <div className="rbt-color-select-area">
                                                                        <ul
                                                                            className="rbt-switcher-color-list rbt-switcher-color-list-lg product-switcher-activation">
                                                                            <li><a className="rbt-switcher--color tooltips rbt-switcher--color-one"
                                                                                    data-switcher-color="#2B2B2B"
                                                                                    data-src="/assets/images/product-single/earphone/earphone-05.webp"
                                                                                    data-tooltip="Black"
                                                                                    data-tooltip-position="top"
                                                                                    href="#">
                                                                                    <div className="rbt-color-circle"></div>
                                                                                </a></li>
                                                                            <li className="active"><a
                                                                                    className="rbt-switcher--color tooltips rbt-switcher--color-two"
                                                                                    data-switcher-color="#cc999d"
                                                                                    data-src="/assets/images/product-single/earphone/earphone-02.webp"
                                                                                    data-tooltip="Pink"
                                                                                    data-tooltip-position="top"
                                                                                    href="#">
                                                                                    <div className="rbt-color-circle"></div>
                                                                                </a></li>
                                                                            <li><a className="rbt-switcher--color tooltips rbt-switcher--color-three"
                                                                                    data-switcher-color="#9C9B9E"
                                                                                    data-src="/assets/images/product-single/earphone/earphone-04.webp"
                                                                                    data-tooltip="Dark"
                                                                                    data-tooltip-position="top"
                                                                                    href="#">
                                                                                    <div className="rbt-color-circle"></div>
                                                                                </a></li>
                                                                            <li><a className="rbt-switcher--color tooltips rbt-switcher--color-four"
                                                                                    data-switcher-color="#F2EDE7"
                                                                                    data-src="/assets/images/product-single/earphone/earphone-03.webp"
                                                                                    data-tooltip="White"
                                                                                    data-tooltip-position="top"
                                                                                    href="#">
                                                                                    <div className="rbt-color-circle"></div>
                                                                                </a></li>
                                                                            <li><a className="rbt-switcher--color tooltips rbt-switcher--color-five rbt-switcher--disable disabled"
                                                                                    data-switcher-color="#a09fa4"
                                                                                    data-src="/assets/images/product-single/earphone/earphone-03.webp"
                                                                                    data-tooltip="Gray"
                                                                                    data-tooltip-position="top"
                                                                                    href="#">
                                                                                    <div className="rbt-color-circle"></div>
                                                                                </a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-info-wrapper d-flex mt--16">
                                                            <div className="product-styles-grp d-flex mt--0">
                                                                <p className="text-bold title">Style :</p>
                                                                <div className="content d-flex flex-wrap">
                                                                    <a className="rbt-btn rbt-btn-border rbt-btn-sm rbt-square-btn active"
                                                                        href="#">Headphones
                                                                        Only</a>
                                                                    <a className="rbt-btn rbt-btn-border rbt-btn-sm rbt-square-btn"
                                                                        href="#">Charging
                                                                        Stand</a>
                                                                    <a className="rbt-btn rbt-btn-border rbt-btn-sm disabled"
                                                                        href="#">Headphones + Charging
                                                                        Stand</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="separator-top has-sm-spacer"></div>
                                                        <div className="product-btn-grp">
                                                            <div className="rbt-qty-area">
                                                                <button className="qty-item-btn qty-item-btn-decr"><i
                                                                        className="fa-solid fa-minus"></i></button>
                                                                <input type="number" className="items-qty-input" defaultValue="5"
                                                                    min="01" />
                                                                <button className="qty-item-btn qty-item-btn-incr"><i
                                                                        className="fa-solid fa-plus"></i></button>
                                                            </div>
                                                            <a className="rbt-btn rbt-btn-border has-left-icon d-block text-center"
                                                                href="#" data-bs-toggle="modal"
                                                                data-bs-target="#popup-cartModal"><i
                                                                    className="fa-regular fa-cart-shopping"></i> Add To
                                                                Cart</a>
                                                        </div>
                                                        <div className="prd-btn-grp">
                                                            <a className="rbt-btn d-block text-center" href="#">Buy Now</a>
                                                        </div>
                                                        <div className="rbt-quick-link-grp mt--12">
                                                            
                                                            <button className="rbt-quick-link" data-bs-toggle="modal"
                                                                data-bs-target="#wishlistModal" type="button"><i
                                                                    className="fa-sharp fa-regular fa-heart"></i>Add To
                                                                Wishlist</button>
                                                            <button className="rbt-quick-link" data-bs-toggle="modal"
                                                                data-bs-target="#socialShareModal" type="button"><i
                                                                    className="fa-sharp fa-regular fa-share-nodes"></i>Share</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*  End Component Area  */}
                                </div>

                                <div className="swiper-slide">
                                    {/*  Start Component Area  */}
                                    <div className="rbt-single-product-area">
                                        <div className="row row--16">
                                            <div className="col-lg-6 col-12">
                                                <div
                                                    className="rbt-product-view-slider rbt-single-product-media-area  rbt-single-product-media-has-folder-shape">
                                                    <div
                                                        className="swiper rbt-arrow-between rbt-product-single-slider-activation rbt-arrow-show-dfl">
                                                        <div className="swiper-wrapper">
                                                            <div className="swiper-slide">
                                                                <div className="thumbnail radius-16">
                                                                    <div className="rbt-product-single-img">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-4.webp"
                                                                            alt="Product Images" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <div className="thumbnail radius-16">
                                                                    <div className="rbt-product-single-img">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-2.webp"
                                                                            alt="Product Images" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <div className="thumbnail radius-16">
                                                                    <div className="rbt-product-single-img">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-3.webp"
                                                                            alt="Product Images" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <div className="thumbnail radius-16">
                                                                    <div className="rbt-product-single-img">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-1.webp"
                                                                            alt="Product Images" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <div className="thumbnail radius-16">
                                                                    <div className="rbt-product-single-img">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-4.webp"
                                                                            alt="Product Images" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <div className="thumbnail radius-16">
                                                                    <div className="rbt-product-single-img">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-2.webp"
                                                                            alt="Product Images" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <div className="thumbnail radius-16">
                                                                    <div className="rbt-product-single-img">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-3.webp"
                                                                            alt="Product Images" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <div className="thumbnail radius-16">
                                                                    <div className="rbt-product-single-img">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-1.webp"
                                                                            alt="Product Images" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-swiper-arrow rbt-modal-arrow-sm-left"
                                                            data-rbt-position-horigental="3">
                                                            <div className="custom-overflow">
                                                                <i className="rbt-icon fa-regular fa-arrow-left"></i>
                                                                <i className="rbt-icon-top fa-regular fa-arrow-left"></i>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-swiper-arrow rbt-modal-arrow-sm-right"
                                                            data-rbt-position-horigental="86">
                                                            <div className="custom-overflow">
                                                                <i className="rbt-icon fa-regular fa-arrow-right"></i>
                                                                <i className="rbt-icon-top fa-regular fa-arrow-right"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="swiper rbt-product-thumb-slider-activation mt--24 mt_sm--16">
                                                        <div className="swiper-wrapper">
                                                            <div className="swiper-slide">
                                                                <button className="thumbnail d-block">
                                                                    <span className="rbt-thumb-img-sm">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-4.webp"
                                                                            alt="Product Images" />
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <button className="thumbnail d-block">
                                                                    <span className="rbt-thumb-img-sm">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-2.webp"
                                                                            alt="Product Images" />
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <button className="thumbnail d-block">
                                                                    <span className="rbt-thumb-img-sm">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-3.webp"
                                                                            alt="Product Images" />
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <button className="thumbnail d-block">
                                                                    <span className="rbt-thumb-img-sm">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-1.webp"
                                                                            alt="Product Images" />
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <button className="thumbnail d-block">
                                                                    <span className="rbt-thumb-img-sm">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-4.webp"
                                                                            alt="Product Images" />
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <button className="thumbnail d-block">
                                                                    <span className="rbt-thumb-img-sm">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-2.webp"
                                                                            alt="Product Images" />
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <button className="thumbnail d-block">
                                                                    <span className="rbt-thumb-img-sm">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-3.webp"
                                                                            alt="Product Images" />
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="swiper-slide">
                                                                <button className="thumbnail d-block">
                                                                    <span className="rbt-thumb-img-sm">
                                                                        <img className="w-100"
                                                                            src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-1.webp"
                                                                            alt="Product Images" />
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12 mt_sm--12 content">
                                                <a href="shop-by-category.html"
                                                    className="rbt-card-subtitle rbt-card-catagories-text mt--0">Headphones</a>
                                                <div className="rbt-card-title h4"><a
                                                        href="product-single-default.html">Beats
                                                        Wireless
                                                        Earbuds with Charging Case - Bluetooth In-Ear Headphones</a>
                                                </div>
                                                <div className="rbt-scroll-vertical-wrapper rbt-vertical-height-sm">
                                                    <div className="rbt-scroll-vertical content">
                                                        <p className="description-text b2">
                                                            At vero eos et accusamus et iusto dignissimos ducimus
                                                            blanditiis
                                                            praesentium voluptatu
                                                            atque...
                                                        </p>
                                                        <div
                                                            className="rbt-info-wrapper d-flex justify-content-between mt--16">
                                                            <div className="pricing-part mt--0">
                                                                <del className="price-text">₹5,000</del>
                                                                <span className="price-text">₹2,999</span>
                                                                <span className="rbt-offer-badge">-30%</span>
                                                            </div>
                                                            <div className="prd-info-section has-left-separator">
                                                                <div className="prd-id-text">
                                                                    <p className="text-bold">SKU:</p>
                                                                    <p> HN-508801</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-info-wrapper d-flex mt--16">
                                                            <div className="rbt-card-rating mt--0">
                                                                <ul className="rbt-rating-icon-list">
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i>
                                                                    </li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i>
                                                                    </li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i>
                                                                    </li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i>
                                                                    </li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i>
                                                                    </li>
                                                                </ul>
                                                                <p className="rating-digit">(46)</p>
                                                                <div
                                                                    className="rbt-text-swiper-container rbt-arrow-vertical">
                                                                    <div className="swiper-wrapper">
                                                                        <div className="swiper-slide">
                                                                            <div className="rbt-text-group"> <span
                                                                                    className="icon mr--4"><i
                                                                                        className="fa-solid fa-bag-shopping"></i></span>
                                                                                90+ Sold Recently
                                                                            </div>
                                                                        </div>
                                                                        <div className="swiper-slide">
                                                                            <div className="rbt-text-group"> <span
                                                                                    className="icon mr--4"><i
                                                                                        className="fa-solid fa-truck"></i></span>
                                                                                Free shipping
                                                                            </div>
                                                                        </div>
                                                                        <div className="swiper-slide">
                                                                            <div className="rbt-text-group"> <span
                                                                                    className="icon mr--4"><i
                                                                                        className="fa-solid fa-rotate-left"></i></span>
                                                                                7 Days Return Plicy
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="rbt-verticle-arrow rbt-arrow-prev">
                                                                        <i className="fa-regular fa-chevron-up"></i>
                                                                    </div>
                                                                    <div className="rbt-verticle-arrow rbt-arrow-next">
                                                                        <i className="fa-regular fa-chevron-down"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="prd-info-section has-left-separator">
                                                                <div
                                                                    className="rbt-badge rbt-badge-bg-green rbt-badge-border rbt-badge-small rbt-badge-rounded">
                                                                    9 in Stock</div>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-info-wrapper d-flex mt--8">
                                                            <div className="prd-info-section">
                                                                <div className="prd-id-text">
                                                                    <p className="text-bold">Brand:</p>
                                                                    <a href="shop-by-brands.html"
                                                                        className="rbt-brand-img tooltips"
                                                                        data-tooltip="Product Brand"
                                                                        data-tooltip-position="top"><img
                                                                            src="/assets/images/icons/small-brand/sm-brand-b-01.webp"
                                                                            alt="Small icon Brand" /></a>
                                                                </div>
                                                            </div>
                                                            <div className="prd-info-section has-left-separator">
                                                                <div className="prd-id-text">
                                                                    <p className="text-bold">All Europe</p>
                                                                    <a href="shop-by-brands.html"
                                                                        className="rbt-brand-img tooltips"
                                                                        data-tooltip="All Europe Delivary"
                                                                        data-tooltip-position="top"><img
                                                                            src="/assets/images/icons/small-brand/sm-brand-b-02.webp"
                                                                            alt="Small icon Brand" /></a>
                                                                </div>
                                                            </div>
                                                            <div className="prd-info-section has-left-separator">
                                                                <div className="prd-id-text">
                                                                    <p className="text-bold">Verified:</p>
                                                                    <span className="rbt-brand-img tooltips"
                                                                        data-tooltip="Verified Product"
                                                                        data-tooltip-position="top"><img
                                                                            src="/assets/images/icons/small-brand/sm-brand-b-03.webp"
                                                                            alt="Small icon Brand" /></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="rbt-info-wrapper d-flex mt--16 rbt-gap--8 flex-wrap">
                                                            <div className="prd-info-section">
                                                                <a className="rbt-quick-info-tag d-flex align-items-center rbt-gap--8 rbt-shiny"
                                                                    href="#">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14"
                                                                        height="10" viewBox="0 0 14 10" fill="none">
                                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                                            d="M1.98586 5.18652C1.93484 5.12038 1.88687 5.05807 1.84423 5.00038C2.25958 4.44469 2.71871 3.92381 3.21712 3.44281C4.28087 2.42212 5.61949 1.53911 7 1.53911C8.38051 1.53911 9.71837 2.42212 10.7829 3.44281C11.2813 3.92383 11.7404 4.44471 12.1558 5.00038C11.7402 5.55588 11.2811 6.07675 10.7829 6.55796C9.71837 7.57865 8.38051 8.46166 7 8.46166C5.61949 8.46166 4.28163 7.57865 3.21712 6.55796C2.77476 6.13114 2.36329 5.67282 1.98586 5.18652ZM13.7297 4.58042L13.0916 5.00038L13.7297 5.42035L13.7282 5.42266L13.7259 5.42574L13.7183 5.43804L13.6901 5.47958C13.5374 5.70347 13.378 5.92253 13.2119 6.13645C12.789 6.68142 12.3279 7.19501 11.8322 7.67326C10.6915 8.76779 8.98433 10 7 10C5.01566 10 3.3085 8.76779 2.16785 7.67326C1.47767 7.00644 0.855254 6.27156 0.30991 5.47958C0.300444 5.46579 0.291053 5.45194 0.281736 5.43804L0.274122 5.42574L0.271837 5.42266L0.271076 5.42112C0.271076 5.42035 0.270314 5.42035 0.908409 5.00038L0.270314 4.58042L0.271837 4.57811L0.274122 4.57503L0.281736 4.56273C0.323524 4.49897 0.366683 4.43614 0.411182 4.37428C0.932338 3.63825 1.52073 2.95324 2.16861 2.32828C3.30773 1.23144 5.01566 0 7 0C8.98433 0 10.6915 1.23221 11.8322 2.32674C12.5223 2.99355 13.1448 3.72843 13.6901 4.52042L13.7183 4.56196L13.7259 4.57426L13.7282 4.57734L13.7289 4.57888L13.7297 4.58042ZM13.0916 5.00038L13.7297 4.58042L14 5.00038L13.7297 5.42035L13.0916 5.00038ZM0.270314 4.58042L0.908409 5.00038L0.270314 5.42035L0 5.00038L0.270314 4.58042ZM6.23855 5.00038C6.23855 4.79639 6.31877 4.60075 6.46157 4.4565C6.60437 4.31225 6.79805 4.23121 7 4.23121C7.20195 4.23121 7.39563 4.31225 7.53842 4.4565C7.68122 4.60075 7.76145 4.79639 7.76145 5.00038C7.76145 5.20438 7.68122 5.40002 7.53842 5.54427C7.39563 5.68852 7.20195 5.76956 7 5.76956C6.79805 5.76956 6.60437 5.68852 6.46157 5.54427C6.31877 5.40002 6.23855 5.20438 6.23855 5.00038ZM7 2.69287C6.39415 2.69287 5.81312 2.93598 5.38472 3.36873C4.95632 3.80147 4.71565 4.38839 4.71565 5.00038C4.71565 5.61238 4.95632 6.1993 5.38472 6.63204C5.81312 7.06479 6.39415 7.3079 7 7.3079C7.60585 7.3079 8.18688 7.06479 8.61528 6.63204C9.04367 6.1993 9.28435 5.61238 9.28435 5.00038C9.28435 4.38839 9.04367 3.80147 8.61528 3.36873C8.18688 2.93598 7.60585 2.69287 7 2.69287Z"
                                                                            fill="#24BD25" />
                                                                    </svg>
                                                                    <p><strong>20 people are viewing this</strong></p>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-info-wrapper d-flex mt--16">
                                                            <div className="prd-info-section">
                                                                <div className="prd-id-text">
                                                                    <p className="text-bold">Color:</p>
                                                                    <div className="rbt-color-select-area">
                                                                        <ul
                                                                            className="rbt-switcher-color-list rbt-switcher-color-list-lg product-switcher-activation">
                                                                            <li><a className="rbt-switcher--color tooltips rbt-switcher--color-one"
                                                                                    data-switcher-color="#2B2B2B"
                                                                                    data-src="/assets/images/product-single/earphone/earphone-05.webp"
                                                                                    data-tooltip="Black"
                                                                                    data-tooltip-position="top"
                                                                                    href="#">
                                                                                    <div className="rbt-color-circle"></div>
                                                                                </a></li>
                                                                            <li className="active"><a
                                                                                    className="rbt-switcher--color tooltips rbt-switcher--color-two"
                                                                                    data-switcher-color="#cc999d"
                                                                                    data-src="/assets/images/product-single/earphone/earphone-02.webp"
                                                                                    data-tooltip="Pink"
                                                                                    data-tooltip-position="top"
                                                                                    href="#">
                                                                                    <div className="rbt-color-circle"></div>
                                                                                </a></li>
                                                                            <li><a className="rbt-switcher--color tooltips rbt-switcher--color-three"
                                                                                    data-switcher-color="#9C9B9E"
                                                                                    data-src="/assets/images/product-single/earphone/earphone-04.webp"
                                                                                    data-tooltip="Dark"
                                                                                    data-tooltip-position="top"
                                                                                    href="#">
                                                                                    <div className="rbt-color-circle"></div>
                                                                                </a></li>
                                                                            <li><a className="rbt-switcher--color tooltips rbt-switcher--color-four"
                                                                                    data-switcher-color="#F2EDE7"
                                                                                    data-src="/assets/images/product-single/earphone/earphone-03.webp"
                                                                                    data-tooltip="White"
                                                                                    data-tooltip-position="top"
                                                                                    href="#">
                                                                                    <div className="rbt-color-circle"></div>
                                                                                </a></li>
                                                                            <li><a className="rbt-switcher--color tooltips rbt-switcher--color-five rbt-switcher--disable disabled"
                                                                                    data-switcher-color="#a09fa4"
                                                                                    data-src="/assets/images/product-single/earphone/earphone-03.webp"
                                                                                    data-tooltip="Gray"
                                                                                    data-tooltip-position="top"
                                                                                    href="#">
                                                                                    <div className="rbt-color-circle"></div>
                                                                                </a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-info-wrapper d-flex mt--16">
                                                            <div className="product-styles-grp d-flex mt--0">
                                                                <p className="text-bold title">Style :</p>
                                                                <div className="content d-flex flex-wrap">
                                                                    <a className="rbt-btn rbt-btn-border rbt-btn-sm rbt-square-btn active"
                                                                        href="#">Headphones
                                                                        Only</a>
                                                                    <a className="rbt-btn rbt-btn-border rbt-btn-sm rbt-square-btn"
                                                                        href="#">Charging
                                                                        Stand</a>
                                                                    <a className="rbt-btn rbt-btn-border rbt-btn-sm disabled"
                                                                        href="#">Headphones + Charging
                                                                        Stand</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="separator-top has-sm-spacer"></div>
                                                        <div className="product-btn-grp">
                                                            <div className="rbt-qty-area">
                                                                <button className="qty-item-btn qty-item-btn-decr"><i
                                                                        className="fa-solid fa-minus"></i></button>
                                                                <input type="number" className="items-qty-input" defaultValue="5"
                                                                    min="01" />
                                                                <button className="qty-item-btn qty-item-btn-incr"><i
                                                                        className="fa-solid fa-plus"></i></button>
                                                            </div>
                                                            <a className="rbt-btn rbt-btn-border has-left-icon d-block text-center"
                                                                href="#" data-bs-toggle="modal"
                                                                data-bs-target="#popup-cartModal"><i
                                                                    className="fa-regular fa-cart-shopping"></i> Add To
                                                                Cart</a>
                                                        </div>
                                                        <div className="prd-btn-grp">
                                                            <a className="rbt-btn d-block text-center" href="#">Buy Now</a>
                                                        </div>
                                                        <div className="rbt-quick-link-grp mt--12">
                                                            
                                                            <button className="rbt-quick-link" data-bs-toggle="modal"
                                                                data-bs-target="#wishlistModal" type="button"><i
                                                                    className="fa-sharp fa-regular fa-heart"></i>Add To
                                                                Wishlist</button>
                                                            <button className="rbt-quick-link" data-bs-toggle="modal"
                                                                data-bs-target="#socialShareModal" type="button"><i
                                                                    className="fa-sharp fa-regular fa-share-nodes"></i>Share</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*  End Component Area  */}
                                </div>


                            </div>
                        </div>
                        {/*  End banner part  */}

                        {/*  Start slider navigation buttons  */}
                        <div className="rbt-swiper-arrow rbt-modal-arrow-left rbt-arrow-gray rbt-arrow-lg">
                            <div className="custom-overflow">
                                <i className="rbt-icon fa-regular fa-arrow-left"></i>
                                <i className="rbt-icon-top fa-regular fa-arrow-left"></i>
                            </div>
                        </div>
                        <div className="rbt-swiper-arrow rbt-modal-arrow-right rbt-arrow-gray rbt-arrow-lg">
                            <div className="custom-overflow">
                                <i className="rbt-icon fa-regular fa-arrow-right"></i>
                                <i className="rbt-icon-top fa-regular fa-arrow-right"></i>
                            </div>
                        </div>
                        {/*  End slider navigation buttons  */}
                    </div>
                </div>


            </div>
        </div>
    </div>
    {/*  End Quick View Modal Area   */}
    {/*  Start Popup Cart Modal Area   */}
    <div className="rbt-default-modal has-rbt-top-folder-shape modal fade" id="popup-cartModal" tabIndex={-1} role="dialog"
        aria-modal="true" aria-labelledby="popup-cartModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered xxs-size">
            <div className="modal-content">
                <div className="rbt-folder-shape-right-portion">
                    <svg xmlns="http://www.w3.org/2000/svg" width="85" height="90" viewBox="0 0 85 90" fill="none">
                        <path
                            d="M0 0H11.1844C14.5695 0 17.7971 1.42971 20.0716 3.93671L82.1927 72.4059C83.9992 74.397 84.9999 76.9893 84.9999 79.6778C84.9999 85.6547 85.0001 90 85.0001 90H0V0Z"
                            fill="white" />
                    </svg>
                </div>
                <div className="modal-header">
                    <button type="button" className="rbt-round-btn rbt-modal-dis-btn" data-bs-dismiss="modal"
                        aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="rbt-modal-cart rbt-top-folder-shape-wrapper rbt-sidebar-cart">
                    <div className="overflow-hidden position-relative rbt-content-trs-portion">
                        <div className="inner-wrapper">
                            <div className="inner-top">
                                <div className="rbt-cart-header">
                                    <div className="title-section">
                                        <h3 className="title mb--0 h6" id="popup-cartModalLabel"><i
                                                className="fa-sharp fa-regular fa-cart-shopping mr--12"></i> Your cart</h3>
                                    </div>

                                </div>
                                <nav className="side-nav w-100">
                                    <ul className="rbt-minicart-wrapper">
                                        <li className="minicart-item">
                                            <div className="thumbnail">
                                                <a href="#">
                                                    <img src="/assets/images/product-img/cart-product/cart-product-01.webp"
                                                        alt="Product Image" />
                                                </a>
                                            </div>
                                            <div className="product-content">
                                                <h3 className="title h6"><a href="#">Apple 12inch iPad </a></h3>
                                                <span className="quantity">1x <span className="price">₹4,999</span></span>
                                                <div className="bottom-part">
                                                    <div className="rbt-qty-area">
                                                        <button className="qty-item-btn qty-item-btn-decr"><i
                                                                className="fa-solid fa-minus"></i></button>
                                                        <input type="number" className="items-qty-input" defaultValue="1" min="1" />
                                                        <button className="qty-item-btn qty-item-btn-incr"><i
                                                                className="fa-solid fa-plus"></i></button>
                                                    </div>
                                                    <button className="edit-btn border-0" type="button"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#quickviewEditCartModal"><i
                                                            className="fa-regular fa-pen"></i> Edit</button>
                                                </div>
                                            </div>
                                            <div className="close-btn">
                                                <button className="rbt-round-btn"><i className="fa-solid fa-xmark"></i></button>
                                            </div>
                                        </li>

                                        <li className="minicart-item">
                                            <div className="thumbnail">
                                                <a href="#">
                                                    <img src="/assets/images/product-img/cart-product/cart-product-02.webp"
                                                        alt="Product Image" />
                                                </a>
                                            </div>
                                            <div className="product-content">
                                                <h3 className="title h6"><a href="#">Apple Watch 8 Pro </a></h3>
                                                <span className="quantity">1x <span className="price">₹3,999</span></span>
                                                <div className="bottom-part">
                                                    <div className="rbt-qty-area">
                                                        <button className="qty-item-btn qty-item-btn-decr"><i
                                                                className="fa-solid fa-minus"></i></button>
                                                        <input type="number" className="items-qty-input" defaultValue="15" min="1" />
                                                        <button className="qty-item-btn qty-item-btn-incr"><i
                                                                className="fa-solid fa-plus"></i></button>
                                                    </div>
                                                    <button className="edit-btn border-0" type="button"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#quickviewEditCartModal"><i
                                                            className="fa-regular fa-pen"></i> Edit</button>
                                                </div>
                                            </div>
                                            <div className="close-btn">
                                                <button className="rbt-round-btn"><i className="fa-solid fa-xmark"></i></button>
                                            </div>
                                        </li>

                                    </ul>
                                </nav>
                            </div>
                            <div className="rbt-minicart-footer mt--16">
                                <div className="minicart-quick-access-area">
                                    <a href="#" className="single-quick-access rbt-note-btn">
                                        <span className="icon"><i className="fa-regular fa-pen"></i></span>
                                        <span className="text">Note</span>
                                    </a>
                                    <span className="hr-sepator"></span>
                                    <a href="#" className="single-quick-access rbt-shipping-btn">
                                        <span className="icon"><i className="fa-regular fa-truck-fast"></i></span>
                                        <span className="text">Shipping</span>
                                    </a>
                                    <span className="hr-sepator"></span>
                                    <a href="#" className="single-quick-access rbt-coupon-btn">
                                        <span className="icon"><i className="fa-regular fa-ticket"></i></span>
                                        <span className="text">Coupon</span>
                                    </a>
                                </div>
                                <hr className="mb--0 mt--16" />
                                <div className="rbt-cart-subttotal">
                                    <p>Subtotal (2 items)</p>
                                    <p className="price">₹9,999</p>
                                </div>
                                <div className="rbt-cart-subttotal">
                                    <p>Shipping</p>
                                    <p className="price">₹100</p>
                                </div>
                                <hr className="mb--0" />
                                <div className="rbt-cart-subttotal">
                                    <p className="subtotal"><strong>Total</strong></p>
                                    <p className="price">₹10,099</p>
                                </div>
                                <div className="offer-progress-area">
                                    <p className="offer-text">Add <strong>₹3,499</strong> More To Get <strong>Free
                                            Shipping</strong></p>
                                    <div className="progress" role="progressbar" aria-label="Shipping-progress"
                                        aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                                        <div className="progress-bar w-75"></div>
                                    </div>
                                </div>
                                <div className="rbt-minicart-bottom mt--24">
                                    <div className="checkout-btn mt--20">
                                        <a href="checkout-delivery-step-one.html" className="rbt-btn w-100 text-center">
                                            <span className="btn-text">Checkout</span>
                                        </a>
                                    </div>
                                    <div className="share-btn-grp rbt-link-hover">
                                        <a href="cart.html" className="share-btn"><i className="fa-regular fa-pen mr--4"></i>
                                            View
                                            Cart</a>
                                        <button data-bs-toggle="modal" data-bs-target="#socialShareModal" type="button"
                                            className="share-btn"><i className="fa-sharp fa-solid fa-link mr--4"></i> Share
                                            Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rbt-offcanvas-inner-popup">
                            <div className="rbt-offcanvas-inner-popup-card note-popup">
                                <div className="rbt-offcanvas-card-inner">
                                    <h3 className="rbt-title rbt-text-bold h6">
                                        <span className="mr--4"><i className="fa-regular fa-pen"></i></span>
                                        Add note for seller
                                    </h3>
                                    <form>
                                        <div className="rbt-input-field-grp mb--12">
                                            <textarea className="rbt-text-field" name="message"
                                                placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                                        </div>
                                        <div className="rbt-btn-group mt--16">
                                            <button
                                                className="rbt-btn rbt-btn-md rbt-btn-primary d-block w-100">Apply</button>
                                            <button
                                                className="rbt-btn rbt-btn-md rbt-btn-naked d-block w-100 mt--8 mb--8 rbt-popup-close-btn">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="rbt-offcanvas-inner-popup">
                            <div className="rbt-offcanvas-inner-popup-card shipping-popup">
                                <div className="rbt-offcanvas-card-inner">
                                    <h3 className="rbt-title rbt-text-bold h6">
                                        <span className="mr--4"><i className="fa-light fa-truck-fast"></i></span>
                                        Estimate shipping rates
                                    </h3>
                                    <form>
                                        <div className="rbt-input-field-grp mb--12">
                                            <div
                                                className="rbt-dropdown-select filter-select rbt-modern-select search-by-category">
                                                <select className="w-100 rbt-select-activation" data-live-search="true"
                                                    data-live-search-placeholder="Search City">
                                                    <option>Select your City</option>
                                                    <option>Mumbai</option>
                                                    <option>Delhi</option>
                                                    <option>Bangalore</option>
                                                    <option>Chennai</option>
                                                    <option>Hyderabad</option>
                                                    <option>Kolkata</option>
                                                    <option>Pune</option>
                                                    <option>Ahmedabad</option>
                                                    <option>Jaipur</option>
                                                    <option>Lucknow</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="rbt-input-field-grp mb--12">
                                            <input type="text" placeholder="State" />
                                        </div>
                                        <div className="rbt-input-field-grp mb--12">
                                            <input type="text" placeholder="City" />
                                        </div>
                                        <div className="rbt-input-field-grp">
                                            <input type="text" placeholder="Pincode" />
                                        </div>
                                        <div className="rbt-btn-group mt--16">
                                            <button className="rbt-btn rbt-btn-md rbt-btn-primary d-block w-100">Calculate
                                                shipping rates</button>
                                            <button
                                                className="rbt-btn rbt-btn-md rbt-btn-naked d-block w-100 mt--8 mb--8 rbt-popup-close-btn">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="rbt-offcanvas-inner-popup">
                            <div className="rbt-offcanvas-inner-popup-card coupon-popup">
                                <div className="rbt-offcanvas-card-inner">
                                    <h3 className="rbt-title rbt-text-bold h6">
                                        <span className="mr--4"><i className="fa-regular fa-ticket"></i></span>
                                        Select or input Coupon
                                    </h3>
                                    <div className="rbt-coupon-wrapper rbt-bg-color-white">
                                        <div className="rbt-coupon">
                                            <div className="inner rbt-text-copy-activation">
                                                <div className="left-part">
                                                    <input type="text" value="WELCOME100" readOnly
                                                        className="rbt-coupon-code-text rbt-has-right-shepe-border rbt-copy-value-field" />
                                                </div>
                                                <div className="coupon-details">
                                                    <h2 className="rbt-coupon-info-title b1">UP TO 30% OFF</h2>
                                                    <p className="rbt-coupon-info-sub-title b3 mt--4">For orders over ₹199
                                                    </p>
                                                    <ul className="rbt-coupon-info-list mt--12">
                                                        <li><span>12/18/2023 14:00 ~ 12/25/2023 14:00</span></li>
                                                        <li><span>The minimum spend for this coupon
                                                                <strong>₹2,999</strong></span></li>
                                                    </ul>
                                                </div>
                                                <button className="copy-icon rbt-round-btn rbt-bg-primary rbt-copy-btn"
                                                    data-tooltip="Copy">
                                                    <i className="fa-sharp fa-regular fa-copy"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="rbt-coupon">
                                            <div className="inner rbt-text-copy-activation">
                                                <div className="left-part">
                                                    <input type="text" value="WELCOME100" readOnly
                                                        className="rbt-coupon-code-text rbt-has-right-shepe-border rbt-copy-value-field" />
                                                </div>
                                                <div className="coupon-details">
                                                    <h2 className="rbt-coupon-info-title b1">UP TO 30% OFF</h2>
                                                    <p className="rbt-coupon-info-sub-title b3 mt--4">For orders over ₹199
                                                    </p>
                                                    <ul className="rbt-coupon-info-list mt--12">
                                                        <li><span>12/18/2023 14:00 ~ 12/25/2023 14:00</span></li>
                                                        <li><span>The minimum spend for this coupon
                                                                <strong>₹2,999</strong></span></li>
                                                    </ul>
                                                </div>
                                                <button className="copy-icon rbt-round-btn rbt-bg-primary rbt-copy-btn"
                                                    data-tooltip="Copy">
                                                    <i className="fa-sharp fa-regular fa-copy"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <form>
                                        <div className="rbt-input-field-grp mt--24">
                                            <p className="b1 mb--12 rbt-text-color-gray-600">If you have coupon code, please
                                                apply it below.</p>
                                            <input type="text" placeholder="Coupon code" />
                                        </div>
                                        <div className="rbt-btn-group mt--16">
                                            <button
                                                className="rbt-btn rbt-btn-md rbt-btn-primary d-block w-100">Apply</button>
                                            <button
                                                className="rbt-btn rbt-btn-md rbt-btn-naked d-block w-100 mt--8 mb--8 rbt-popup-close-btn">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/*  End Popup Cart Modal Area   */}
    {/*  Start Quick View Modal Area   */}
    <div className="rbt-default-modal modal fade has-rbt-top-folder-shape" id="quickviewSizeGuideModal" tabIndex={-1}
        role="dialog" aria-modal="true" aria-labelledby="quickviewSizeGuideModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered rbt-size-guide-area">
            <div className="modal-content">

                <div className="rbt-folder-shape-right-portion">
                    <svg xmlns="http://www.w3.org/2000/svg" width="85" height="90" viewBox="0 0 85 90" fill="none">
                        <path
                            d="M0 0H11.1844C14.5695 0 17.7971 1.42971 20.0716 3.93671L82.1927 72.4059C83.9992 74.397 84.9999 76.9893 84.9999 79.6778C84.9999 85.6547 85.0001 90 85.0001 90H0V0Z"
                            fill="white" />
                    </svg>
                </div>
                <div className="modal-header">
                    <button type="button" className="rbt-round-btn rbt-modal-dis-btn" data-bs-dismiss="modal"
                        aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="rbt-top-folder-shape-wrapper">
                    {/*  Start Component Area  */}
                    <div className="rbt-single-product-area rbt-bg-color-white rbt-content-trs-portion">

                        <div className="container">
                            <div className=" flex-column align-items-start">
                                <h3 className="rbt-title rbt-modal-title h5" id="quickviewSizeGuideModalLabel">Size Guide
                                </h3>
                                <p className="rbt-modal-description">Masculine Tailored Pants</p>
                                <div className="w-100 d-flex align-items-center justify-content-between">
                                    <p className="rbt-modal-subtitle">Find Your Size</p>
                                    <div className="rbt-tab rbt-round-shape-tab">
                                        {/*  Start tabs  */}
                                        <ul className="nav nav-tabs rbt-tabs-primary mb--0" id="rbt-sizeTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link nav-link-btn-sm active" id="rbt-tab-id-1"
                                                    data-bs-toggle="tab" data-bs-target="#rbt-tab-pane-1" type="button"
                                                    role="tab" aria-controls="rbt-tab-pane-1" aria-selected="true">
                                                    IN
                                                </button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link nav-link-btn-sm" id="rbt-tab-id-2"
                                                    data-bs-toggle="tab" data-bs-target="#rbt-tab-pane-2" type="button"
                                                    role="tab" aria-controls="rbt-tab-pane-2" aria-selected="false">
                                                    CM
                                                </button>
                                            </li>
                                        </ul>
                                        {/*  End tabs  */}
                                    </div>

                                </div>
                            </div>
                            <div className="row pt--16">
                                <div className="col-12 rbt-scrollable-content pb--8">

                                    {/*  Start tabs content  */}
                                    <div className="tab-content" id="rbt-sizeTabContent">
                                        <div className="tab-pane fade show active" id="rbt-tab-pane-1" role="tabpanel"
                                            aria-labelledby="rbt-tab-id-1" tabIndex={0}>
                                            <div className="rbt-responsive-table">
                                                <table className="rbt-sizeguide-table">
                                                    <tbody>
                                                        <tr>
                                                            <td>Size</td>
                                                            <td>US Size</td>
                                                            <td>Chest</td>
                                                            <td>Waist</td>
                                                            <td>Low Hip</td>
                                                            <td>Inseam</td>
                                                        </tr>
                                                        <tr>
                                                            <td>XS</td>
                                                            <td>0-2</td>
                                                            <td>0-2</td>
                                                            <td>24-26</td>
                                                            <td>34-36</td>
                                                            <td>30</td>
                                                        </tr>
                                                        <tr>
                                                            <td>XS</td>
                                                            <td>0-2</td>
                                                            <td>0-2</td>
                                                            <td>24-26</td>
                                                            <td>34-36</td>
                                                            <td>30</td>
                                                        </tr>
                                                        <tr>
                                                            <td>XS</td>
                                                            <td>0-2</td>
                                                            <td>0-2</td>
                                                            <td>24-26</td>
                                                            <td>34-36</td>
                                                            <td>30</td>
                                                        </tr>
                                                        <tr>
                                                            <td>XS</td>
                                                            <td>0-2</td>
                                                            <td>0-2</td>
                                                            <td>24-26</td>
                                                            <td>34-36</td>
                                                            <td>30</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="rbt-tab-pane-2" role="tabpanel"
                                            aria-labelledby="rbt-tab-id-2" tabIndex={0}>
                                            <div className="rbt-responsive-table">
                                                <table className="rbt-sizeguide-table">
                                                    <tbody>
                                                        <tr>
                                                            <td>Size</td>
                                                            <td>US Size</td>
                                                            <td>Chest</td>
                                                            <td>Waist</td>
                                                            <td>Low Hip</td>
                                                            <td>Inseam</td>
                                                        </tr>
                                                        <tr>
                                                            <td>XS</td>
                                                            <td>0-2</td>
                                                            <td>0-2</td>
                                                            <td>24-26</td>
                                                            <td>34-36</td>
                                                            <td>30</td>
                                                        </tr>
                                                        <tr>
                                                            <td>XS</td>
                                                            <td>0-2</td>
                                                            <td>0-2</td>
                                                            <td>24-26</td>
                                                            <td>34-36</td>
                                                            <td>30</td>
                                                        </tr>
                                                        <tr>
                                                            <td>XS</td>
                                                            <td>0-2</td>
                                                            <td>0-2</td>
                                                            <td>24-26</td>
                                                            <td>34-36</td>
                                                            <td>30</td>
                                                        </tr>
                                                        <tr>
                                                            <td>XS</td>
                                                            <td>0-2</td>
                                                            <td>0-2</td>
                                                            <td>24-26</td>
                                                            <td>34-36</td>
                                                            <td>30</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    {/*  End tabs content  */}

                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  End Component Area  */}
                </div>
            </div>
        </div>
    </div>
    {/*  End Quick View Modal Area   */}
    {/*  Start Quick View Modal Area   */}
    <div className="rbt-product-restock-modal-area rbt-default-modal modal fade" id="quickViewRestockModal" tabIndex={-1}
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-0">

                <div className="modal-header">
                    <div className="rbt-welcome-text-area">
                        <h3 className="rbt-title rbt-welcome-title-header h5">🎉 Welcome back Andrew Saimond!!</h3>
                        <p className="rbt-description">Just in time for summer! The awesome new Super vertical is now in our
                            stock!</p>
                    </div>
                    <button type="button" className="rbt-round-btn rbt-modal-dis-btn" data-bs-dismiss="modal"
                        aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/*  Start Component Area  */}
                <div className="rbt-single-product-area rbt-bg-color-white p--32 rbt-rounded--12 p_sm--16">
                    <div className="row row--16">
                        <div className="col-lg-6 col-12">
                            <div
                                className="rbt-product-view-slider rbt-single-product-media-area  rbt-single-product-media-has-folder-shape">
                                <div
                                    className="swiper rbt-arrow-between rbt-product-single-slider-activation rbt-arrow-show-dfl">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="thumbnail radius-16">
                                                <div className="rbt-product-single-img">
                                                    <img className="w-100"
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-1.webp"
                                                        alt="Product Images" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="thumbnail radius-16">
                                                <div className="rbt-product-single-img">
                                                    <img className="w-100"
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-2.webp"
                                                        alt="Product Images" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="thumbnail radius-16">
                                                <div className="rbt-product-single-img">
                                                    <img className="w-100"
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-3.webp"
                                                        alt="Product Images" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="thumbnail radius-16">
                                                <div className="rbt-product-single-img">
                                                    <img className="w-100"
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-4.webp"
                                                        alt="Product Images" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="thumbnail radius-16">
                                                <div className="rbt-product-single-img">
                                                    <img className="w-100"
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-1.webp"
                                                        alt="Product Images" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="thumbnail radius-16">
                                                <div className="rbt-product-single-img">
                                                    <img className="w-100"
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-2.webp"
                                                        alt="Product Images" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="thumbnail radius-16">
                                                <div className="rbt-product-single-img">
                                                    <img className="w-100"
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-3.webp"
                                                        alt="Product Images" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="thumbnail radius-16">
                                                <div className="rbt-product-single-img">
                                                    <img className="w-100"
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-4.webp"
                                                        alt="Product Images" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rbt-swiper-arrow rbt-arrow-left">
                                        <div className="custom-overflow">
                                            <i className="rbt-icon fa-regular fa-arrow-left"></i>
                                            <i className="rbt-icon-top fa-regular fa-arrow-left"></i>
                                        </div>
                                    </div>

                                    <div className="rbt-swiper-arrow rbt-arrow-right">
                                        <div className="custom-overflow">
                                            <i className="rbt-icon fa-regular fa-arrow-right"></i>
                                            <i className="rbt-icon-top fa-regular fa-arrow-right"></i>
                                        </div>
                                    </div>

                                </div>
                                <div className="swiper rbt-product-thumb-slider-activation mt--24">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <button className="thumbnail d-block">
                                                <span className="rbt-thumb-img-sm">
                                                    <img className="w-100"
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-1.webp"
                                                        alt="Product Images" />
                                                </span>
                                            </button>
                                        </div>
                                        <div className="swiper-slide">
                                            <button className="thumbnail d-block">
                                                <span className="rbt-thumb-img-sm">
                                                    <img className="w-100"
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-2.webp"
                                                        alt="Product Images" />
                                                </span>
                                            </button>
                                        </div>
                                        <div className="swiper-slide">
                                            <button className="thumbnail d-block">
                                                <span className="rbt-thumb-img-sm">
                                                    <img className="w-100"
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-3.webp"
                                                        alt="Product Images" />
                                                </span>
                                            </button>
                                        </div>
                                        <div className="swiper-slide">
                                            <button className="thumbnail d-block">
                                                <span className="rbt-thumb-img-sm">
                                                    <img className="w-100"
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-4.webp"
                                                        alt="Product Images" />
                                                </span>
                                            </button>
                                        </div>
                                        <div className="swiper-slide">
                                            <button className="thumbnail d-block">
                                                <span className="rbt-thumb-img-sm">
                                                    <img className="w-100"
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-1.webp"
                                                        alt="Product Images" />
                                                </span>
                                            </button>
                                        </div>
                                        <div className="swiper-slide">
                                            <button className="thumbnail d-block">
                                                <span className="rbt-thumb-img-sm">
                                                    <img className="w-100"
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-2.webp"
                                                        alt="Product Images" />
                                                </span>
                                            </button>
                                        </div>
                                        <div className="swiper-slide">
                                            <button className="thumbnail d-block">
                                                <span className="rbt-thumb-img-sm">
                                                    <img className="w-100"
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-3.webp"
                                                        alt="Product Images" />
                                                </span>
                                            </button>
                                        </div>
                                        <div className="swiper-slide">
                                            <button className="thumbnail d-block">
                                                <span className="rbt-thumb-img-sm">
                                                    <img className="w-100"
                                                        src="/assets/images/product-img/electronics/electronics-bg-trans-01-a-4.webp"
                                                        alt="Product Images" />
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12 content">
                            <a href="shop-by-category.html"
                                className="rbt-card-subtitle rbt-card-catagories-text mt--0">Headphones</a>
                            <div className="rbt-card-title h4"><a href="product-single-default.html">G244F 23.8 inch FHD
                                    4k Rapid IPS 170Hz Super
                                    Vertical</a></div>
                            <div className="rbt-scroll-vertical-wrapper rbt-vertical-height-sm">
                                <div className="rbt-scroll-vertical content">
                                    <p className="description-text b2">
                                        At vero eos et accusamus et iusto dignissimos ducimus blanditiis praesentium
                                        voluptatu atque...
                                    </p>
                                    <div className="rbt-info-wrapper d-flex justify-content-between mt--16">
                                        <div className="pricing-part mt--0">
                                            <del className="price-text">₹5,000</del>
                                            <span className="price-text">₹2,999</span>
                                            <span className="rbt-offer-badge">-30%</span>
                                        </div>
                                        <div className="prd-info-section">
                                            <div className="prd-id-text">
                                                <p className="text-bold">SKU:</p>
                                                <p> HN-508801</p>
                                            </div>
                                            <div
                                                className="rbt-badge rbt-badge-bg-green rbt-badge-border rbt-badge-small rbt-badge-rounded">
                                                9 in Stock</div>
                                        </div>
                                    </div>
                                    <div className="rbt-info-wrapper d-flex mt--24">
                                        <div className="rbt-card-rating mt--0">
                                            <ul className="rbt-rating-icon-list">
                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                            </ul>
                                            <p className="rating-digit">(46)</p>
                                            <div className="rbt-text-swiper-container rbt-arrow-vertical">
                                                <div className="swiper-wrapper">
                                                    <div className="swiper-slide">
                                                        <div className="rbt-text-group"> <span className="icon mr--4"><i
                                                                    className="fa-solid fa-bag-shopping"></i></span>
                                                            90+ Sold Recently
                                                        </div>
                                                    </div>
                                                    <div className="swiper-slide">
                                                        <div className="rbt-text-group"> <span className="icon mr--4"><i
                                                                    className="fa-solid fa-truck"></i></span>
                                                            Free shipping
                                                        </div>
                                                    </div>
                                                    <div className="swiper-slide">
                                                        <div className="rbt-text-group"> <span className="icon mr--4"><i
                                                                    className="fa-solid fa-rotate-left"></i></span>
                                                            7 Days Return Plicy
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="rbt-verticle-arrow rbt-arrow-prev">
                                                    <i className="fa-regular fa-chevron-up"></i>
                                                </div>
                                                <div className="rbt-verticle-arrow rbt-arrow-next">
                                                    <i className="fa-regular fa-chevron-down"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rbt-info-wrapper d-flex mt--24">
                                        <div className="prd-info-section">
                                            <div className="prd-id-text">
                                                <p className="text-bold">Brand:</p>
                                                <a href="shop-by-brands.html" className="rbt-brand-img tooltips"
                                                    data-tooltip="Product Brand" data-tooltip-position="top"><img
                                                        src="/assets/images/icons/small-brand/sm-brand-b-01.webp"
                                                        alt="Small icon Brand" /></a>
                                            </div>
                                        </div>
                                        <div className="prd-info-section has-left-separator">
                                            <div className="prd-id-text">
                                                <p className="text-bold">All Europe</p>
                                                <a href="shop-by-brands.html" className="rbt-brand-img tooltips"
                                                    data-tooltip="All Europe Delivary" data-tooltip-position="top"><img
                                                        src="/assets/images/icons/small-brand/sm-brand-b-02.webp"
                                                        alt="Small icon Brand" /></a>
                                            </div>
                                        </div>
                                        <div className="prd-info-section has-left-separator">
                                            <div className="prd-id-text">
                                                <p className="text-bold">Verified:</p>
                                                <span className="rbt-brand-img tooltips" data-tooltip="Verified Product"
                                                    data-tooltip-position="top"><img
                                                        src="/assets/images/icons/small-brand/sm-brand-b-03.webp"
                                                        alt="Small icon Brand" /></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rbt-info-wrapper d-flex mt--24 rbt-gap--12 flex-wrap">
                                        <div className="prd-info-section">
                                            <a className="rbt-quick-info-tag d-flex align-items-center rbt-gap--8 rbt-shiny"
                                                href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10"
                                                    viewBox="0 0 14 10" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M1.98586 5.18652C1.93484 5.12038 1.88687 5.05807 1.84423 5.00038C2.25958 4.44469 2.71871 3.92381 3.21712 3.44281C4.28087 2.42212 5.61949 1.53911 7 1.53911C8.38051 1.53911 9.71837 2.42212 10.7829 3.44281C11.2813 3.92383 11.7404 4.44471 12.1558 5.00038C11.7402 5.55588 11.2811 6.07675 10.7829 6.55796C9.71837 7.57865 8.38051 8.46166 7 8.46166C5.61949 8.46166 4.28163 7.57865 3.21712 6.55796C2.77476 6.13114 2.36329 5.67282 1.98586 5.18652ZM13.7297 4.58042L13.0916 5.00038L13.7297 5.42035L13.7282 5.42266L13.7259 5.42574L13.7183 5.43804L13.6901 5.47958C13.5374 5.70347 13.378 5.92253 13.2119 6.13645C12.789 6.68142 12.3279 7.19501 11.8322 7.67326C10.6915 8.76779 8.98433 10 7 10C5.01566 10 3.3085 8.76779 2.16785 7.67326C1.47767 7.00644 0.855254 6.27156 0.30991 5.47958C0.300444 5.46579 0.291053 5.45194 0.281736 5.43804L0.274122 5.42574L0.271837 5.42266L0.271076 5.42112C0.271076 5.42035 0.270314 5.42035 0.908409 5.00038L0.270314 4.58042L0.271837 4.57811L0.274122 4.57503L0.281736 4.56273C0.323524 4.49897 0.366683 4.43614 0.411182 4.37428C0.932338 3.63825 1.52073 2.95324 2.16861 2.32828C3.30773 1.23144 5.01566 0 7 0C8.98433 0 10.6915 1.23221 11.8322 2.32674C12.5223 2.99355 13.1448 3.72843 13.6901 4.52042L13.7183 4.56196L13.7259 4.57426L13.7282 4.57734L13.7289 4.57888L13.7297 4.58042ZM13.0916 5.00038L13.7297 4.58042L14 5.00038L13.7297 5.42035L13.0916 5.00038ZM0.270314 4.58042L0.908409 5.00038L0.270314 5.42035L0 5.00038L0.270314 4.58042ZM6.23855 5.00038C6.23855 4.79639 6.31877 4.60075 6.46157 4.4565C6.60437 4.31225 6.79805 4.23121 7 4.23121C7.20195 4.23121 7.39563 4.31225 7.53842 4.4565C7.68122 4.60075 7.76145 4.79639 7.76145 5.00038C7.76145 5.20438 7.68122 5.40002 7.53842 5.54427C7.39563 5.68852 7.20195 5.76956 7 5.76956C6.79805 5.76956 6.60437 5.68852 6.46157 5.54427C6.31877 5.40002 6.23855 5.20438 6.23855 5.00038ZM7 2.69287C6.39415 2.69287 5.81312 2.93598 5.38472 3.36873C4.95632 3.80147 4.71565 4.38839 4.71565 5.00038C4.71565 5.61238 4.95632 6.1993 5.38472 6.63204C5.81312 7.06479 6.39415 7.3079 7 7.3079C7.60585 7.3079 8.18688 7.06479 8.61528 6.63204C9.04367 6.1993 9.28435 5.61238 9.28435 5.00038C9.28435 4.38839 9.04367 3.80147 8.61528 3.36873C8.18688 2.93598 7.60585 2.69287 7 2.69287Z"
                                                        fill="#24BD25" />
                                                </svg>
                                                <p><strong>20 people are viewing this</strong></p>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="rbt-info-wrapper d-flex mt--24">
                                        <div className="prd-info-section">
                                            <div className="prd-id-text">
                                                <p className="text-bold">Color:</p>
                                                <div className="rbt-color-select-area">
                                                    <ul
                                                        className="rbt-switcher-color-list rbt-switcher-color-list-lg product-switcher-activation">
                                                        <li><a className="rbt-switcher--color tooltips rbt-switcher--color-one"
                                                                data-switcher-color="#2B2B2B"
                                                                data-src="/assets/images/product-single/earphone/earphone-05.webp"
                                                                data-tooltip="Black" data-tooltip-position="top"
                                                                href="#">
                                                                <div className="rbt-color-circle"></div>
                                                            </a></li>
                                                        <li className="active"><a
                                                                className="rbt-switcher--color tooltips rbt-switcher--color-two"
                                                                data-switcher-color="#cc999d"
                                                                data-src="/assets/images/product-single/earphone/earphone-02.webp"
                                                                data-tooltip="Pink" data-tooltip-position="top"
                                                                href="#">
                                                                <div className="rbt-color-circle"></div>
                                                            </a></li>
                                                        <li><a className="rbt-switcher--color tooltips rbt-switcher--color-three"
                                                                data-switcher-color="#9C9B9E"
                                                                data-src="/assets/images/product-single/earphone/earphone-04.webp"
                                                                data-tooltip="Dark" data-tooltip-position="top"
                                                                href="#">
                                                                <div className="rbt-color-circle"></div>
                                                            </a></li>
                                                        <li><a className="rbt-switcher--color tooltips rbt-switcher--color-four"
                                                                data-switcher-color="#F2EDE7"
                                                                data-src="/assets/images/product-single/earphone/earphone-03.webp"
                                                                data-tooltip="White" data-tooltip-position="top"
                                                                href="#">
                                                                <div className="rbt-color-circle"></div>
                                                            </a></li>
                                                        <li><a className="rbt-switcher--color tooltips rbt-switcher--color-five rbt-switcher--disable disabled"
                                                                data-switcher-color="#a09fa4"
                                                                data-src="/assets/images/product-single/earphone/earphone-03.webp"
                                                                data-tooltip="Gray" data-tooltip-position="top"
                                                                href="#">
                                                                <div className="rbt-color-circle"></div>
                                                            </a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="rbt-info-wrapper d-flex mt--16">
                                        <div className="product-styles-grp d-flex mt--0">
                                            <p className="text-bold title">Style :</p>
                                            <div className="content d-flex flex-wrap">
                                                <a className="rbt-btn rbt-btn-border rbt-btn-sm rbt-square-btn active"
                                                    href="#">Headphones
                                                    Only</a>
                                                <a className="rbt-btn rbt-btn-border rbt-btn-sm rbt-square-btn"
                                                    href="#">Charging
                                                    Stand</a>
                                                <a className="rbt-btn rbt-btn-border rbt-btn-sm disabled"
                                                    href="#">Headphones +
                                                    Charging
                                                    Stand</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rbt-info-wrapper d-flex mt--20">
                                        <div className="product-styles-grp d-flex mt--0">
                                            <p className="text-bold title">Items :</p>
                                            <div className="content d-flex flex-wrap">
                                                <a className="rbt-btn rbt-btn-border rbt-btn-sm rbt-square-btn"
                                                    href="#">Charger</a>
                                                <a className="rbt-btn rbt-btn-border rbt-btn-sm rbt-square-btn"
                                                    href="#">Audio
                                                    Port</a>
                                                <a className="rbt-btn rbt-btn-border rbt-btn-sm rbt-square-btn"
                                                    href="#">Type C
                                                    Jack</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="separator-top has-sm-spacer"></div>
                                    <div className="product-btn-grp">
                                        <div className="rbt-qty-area">
                                            <button className="qty-item-btn qty-item-btn-decr"><i
                                                    className="fa-solid fa-minus"></i></button>
                                            <input type="number" className="items-qty-input" defaultValue="5" min="01" />
                                            <button className="qty-item-btn qty-item-btn-incr"><i
                                                    className="fa-solid fa-plus"></i></button>
                                        </div>
                                        <a className="rbt-btn rbt-btn-border has-left-icon d-block text-center" href="#"
                                            data-bs-toggle="modal" data-bs-target="#popup-cartModal"><i
                                                className="fa-regular fa-cart-shopping"></i> Add To Cart</a>
                                    </div>
                                    <div className="prd-btn-grp">
                                        <a className="rbt-btn d-block text-center" href="#">Buy Now</a>
                                    </div>
                                    <div className="rbt-quick-link-grp mt--12">
                                        
                                        <button className="rbt-quick-link" data-bs-toggle="modal"
                                            data-bs-target="#wishlistModal" type="button"><i
                                                className="fa-sharp fa-regular fa-heart"></i>Add To Wishlist</button>
                                        <button className="rbt-quick-link" data-bs-toggle="modal"
                                            data-bs-target="#socialShareModal" type="button"><i
                                                className="fa-sharp fa-regular fa-share-nodes"></i>Share</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  End Component Area  */}
            </div>
        </div>
    </div>
    {/*  End Quick View Modal Area   */}
    {/*  Start Wishlist Modal Area   */}
    <div className="rbt-default-modal modal fade has-rbt-top-folder-shape" id="wishlistModal" tabIndex={-1} role="dialog"
        aria-modal="true" aria-labelledby="wishlistModalLabel" aria-hidden="true">
        <div className="modal-dialog sm-size modal-dialog-centered">
            <div className="modal-content">
                <div className="rbt-folder-shape-right-portion">
                    <svg xmlns="http://www.w3.org/2000/svg" width="85" height="90" viewBox="0 0 85 90" fill="none">
                        <path
                            d="M0 0H11.1844C14.5695 0 17.7971 1.42971 20.0716 3.93671L82.1927 72.4059C83.9992 74.397 84.9999 76.9893 84.9999 79.6778C84.9999 85.6547 85.0001 90 85.0001 90H0V0Z"
                            fill="white" />
                    </svg>
                </div>
                <div className="modal-header">
                    <button type="button" className="rbt-round-btn rbt-modal-dis-btn" data-bs-dismiss="modal"
                        aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="rbt-top-folder-shape-wrapper">
                    <div className="rbt-bg-color-white rbt-content-trs-portion">
                        <div className="rbt-wishlist-modal-content">
                            <div className="rbt-title rbt-text-bold h5" id="wishlistModalLabel">Product Wishlist</div>
                            <div className="rbt-transparent-table-one-wrapper rbt-has-bg-gray pt--0 pb--0 mb--16">
                                <table className="rbt-transparent-table-one mb--0 rbt-wishlist-table">
                                    <tbody>
                                        {/*  Start single wishlist product row  */}
                                        <tr>
                                            <td className="rbt-product-remove-btn-wrapper">
                                                <button className="rbt-product-remove-btn rbt-round-btn">
                                                    <span><i className="fa-solid fa-xmark"></i></span>
                                                </button>
                                            </td>
                                            <td className="product-thumbnail">
                                                <a href="product-single-default.html">
                                                    <img src="/assets/images/wishlist/wishlist-prd-1.webp"
                                                        alt="Product image" />
                                                </a>
                                            </td>
                                            <td className="rbt-wish-product-info">
                                                <div className="rbt-wish-product-name h6">
                                                    <a href="product-single-default.html">
                                                        JBL PartyBox 100W Speaker
                                                    </a>
                                                </div>
                                                <div className="rbt-product-price-text rbt-text-color-primary">
                                                    <span>₹2,499</span>
                                                </div>
                                                <span className="rbt-product-id"><span
                                                        className="rbt-text-semi-bold">SKU:</span>
                                                    #180036458</span>
                                            </td>

                                            <td>
                                                <div className="rbt-button-group">
                                                    <a className="rbt-btn rbt-btn-sm has-left-icon" href="cart.html">
                                                        <i className="fa-regular fa-cart-shopping"></i>
                                                        Add To Cart
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        {/*  End single wishlist product row  */}

                                        {/*  Start single wishlist product row  */}
                                        <tr>
                                            <td className="rbt-product-remove-btn-wrapper">
                                                <button className="rbt-product-remove-btn rbt-round-btn">
                                                    <span><i className="fa-solid fa-xmark"></i></span>
                                                </button>
                                            </td>
                                            <td className="product-thumbnail">
                                                <a href="product-single-default.html">
                                                    <img src="/assets/images/wishlist/wishlist-prd-2.webp"
                                                        alt="Product image" />
                                                </a>
                                            </td>
                                            <td className="rbt-wish-product-info">
                                                <div className="rbt-wish-product-name h6">
                                                    <a href="product-single-default.html">
                                                        Fossil Gen 6 Hybrid Smartwatch
                                                    </a>
                                                </div>
                                                <div className="rbt-product-price-text rbt-text-color-primary">
                                                    <span>₹3,299</span>
                                                </div>
                                                <span className="rbt-product-id"><span
                                                        className="rbt-text-semi-bold">SKU:</span>
                                                    #180036565</span>
                                            </td>

                                            <td>
                                                <div className="rbt-button-group">
                                                    <a className="rbt-btn rbt-btn-sm has-left-icon" href="cart.html">
                                                        <i className="fa-regular fa-cart-shopping"></i>
                                                        Add To Cart
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        {/*  End single wishlist product row  */}
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className="rbt-wishlist-modal-footer d-flex flex-wrap rbt-gap--16 justify-content-between align-items-center">
                                <a href="wishlist.html" className="rbt-link"><span className="icon mr--4"><i
                                            className="fa-sharp fa-regular fa-heart"></i></span>Open wishlist page</a>
                                <a href="shop.html" className="rbt-link">Continue Shopping</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/*  End Wishlist Modal Area   */}
    {/*  Start Added Wishlist Modal Area   */}
    <div className="rbt-default-modal modal fade" id="addedcartModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered xs-size">
            <div className="modal-content p--24">
                <div className="modal-header">
                    <button type="button" className="rbt-round-btn rbt-modal-dis-btn" data-bs-dismiss="modal"
                        aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="rbt-wishlist-added-wrapper">
                    <div className="rbt-quick-info-tag d-inline-flex w-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
                            <path
                                d="M3.98047 1.58203C4.36328 0.96224 4.91016 0.643229 5.62109 0.625H10.3516C11.0807 0.643229 11.6458 0.96224 12.0469 1.58203L14.5625 5.73828C14.9453 6.41276 14.9453 7.08724 14.5625 7.76172L12.0469 11.918C11.6458 12.5378 11.0807 12.8568 10.3516 12.875H5.62109C4.91016 12.8568 4.36328 12.5378 3.98047 11.918L1.4375 7.76172C1.05469 7.08724 1.05469 6.41276 1.4375 5.73828L3.98047 1.58203ZM11.1719 5.54688C11.3177 5.38281 11.3906 5.20052 11.3906 5C11.3906 4.79948 11.3177 4.61719 11.1719 4.45312C11.0078 4.30729 10.8255 4.23438 10.625 4.23438C10.4245 4.23438 10.2422 4.30729 10.0781 4.45312L7.125 7.40625L5.92188 6.20312C5.75781 6.05729 5.57552 5.98438 5.375 5.98438C5.17448 5.98438 4.99219 6.05729 4.82812 6.20312C4.68229 6.36719 4.60938 6.54948 4.60938 6.75C4.60938 6.95052 4.68229 7.13281 4.82812 7.29688L6.57812 9.04688C6.74219 9.19271 6.92448 9.26562 7.125 9.26562C7.32552 9.26562 7.50781 9.19271 7.67188 9.04688L11.1719 5.54688Z"
                                fill="#24BD25" />
                        </svg>
                        <p><strong>Product has been sucessfully added</strong></p>
                    </div>
                    <div className="row row--16">
                        <div className="col-md-6 col-12 mt--16">
                            <div className="rbt-card rbt-product-card">
                                <div className="rbt-card-img rbt-rounded--8">
                                    <a href="product-single-default.html">
                                        <img src="/assets/images/product-img/cart-product/cart-product-01-lg.webp"
                                            alt="eCommerce Product Image" />
                                    </a>
                                </div>
                                <div className="rbt-card-body">
                                    <p className="rbt-title mb--0 b1"><a href="product-single-default.html">Harman Kardon
                                            Aura
                                            Studio 3 Bluetooth Speaker</a></p>
                                </div>
                                <div className="pricing-part mt--0">
                                    <span className="price-text">₹2,999</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-12 mt--16">
                            <div className="rbt-cart-info text-center">
                                <p className="cart-quantity-text b1 rbt-text-color-heading mb--0">There are <span
                                        className="number">2</span> items in your cart</p>
                                <div className="pricing-part justify-content-center align-items-center">
                                    <p className="b3 rbt-text-color-heading rbt-text-medium mb--0">Total: </p>
                                    <span className="price-text rbt-text-color-primary h4 mb--0">₹2,999</span>
                                </div>
                                <a className="rbt-btn rbt-btn-sm d-block mt--16" href="#">Checkout</a>
                                <a className="rbt-btn rbt-btn-sm d-block rbt-btn-naked b3 text-decoration-underline mt--8 rbt-text-semi-bold"
                                    href="cart.html">View My Cart</a>
                                <a className="rbt-btn rbt-btn-sm d-block rbt-btn-naked b3 text-decoration-underline mt--8 rbt-text-semi-bold"
                                    href="shop.html">Continue Shopping</a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="rbt-separator rbt-separator-gray200 mt--16 mb--16" />
                <div className="rbt-rec-prd-section">
                    <div className="rbt-title h6">Recommended Products</div>
                    <div className="swiper rbt-rec-prd-swiper rbt-swiper-scrollbar-bottom">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="rbt-card rbt-product-card rbt-list-view-variation list-view-md">
                                    <div className="inner">
                                        <div className="rbt-card-img rbt-bg-color-default">
                                            <a href="product-single-default.html"><img
                                                    src="/assets/images/product-img/electronics/electronics-bg-trans-01.webp"
                                                    alt="Card Image" /></a>
                                        </div>
                                        <div className="rbt-card-body p-0">
                                            <a href="#"
                                                className="rbt-card-subtitle rbt-card-catagories-text">Headphones</a>
                                            <p className="rbt-card-title mt--0 b4"><a
                                                    href="product-single-default.html">Samsung
                                                    Galaxy Buds 2 Pro Earbuds</a>
                                            </p>
                                            <div className="pricing-part mt--0">
                                                <span className="price-text">₹5,999</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="rbt-card rbt-product-card rbt-list-view-variation list-view-md">
                                    <div className="inner">
                                        <div className="rbt-card-img rbt-bg-color-default">
                                            <a href="product-single-default.html"><img
                                                    src="/assets/images/product-img/electronics/electronics-bg-trans-02.webp"
                                                    alt="Card Image" /></a>
                                        </div>
                                        <div className="rbt-card-body p-0">
                                            <a href="#" className="rbt-card-subtitle rbt-card-catagories-text">Coffee
                                                Machine</a>
                                            <p className="rbt-card-title mt--0 b4"><a
                                                    href="product-single-default.html">Nespresso Vertuo Plus Coffee
                                                    Machine</a></p>
                                            <div className="pricing-part mt--0">
                                                <span className="price-text">₹3,499</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="rbt-card rbt-product-card rbt-list-view-variation list-view-md">
                                    <div className="inner">
                                        <div className="rbt-card-img rbt-bg-color-default">
                                            <a href="product-single-default.html"><img
                                                    src="/assets/images/product-img/electronics/electronics-bg-trans-03.webp"
                                                    alt="Card Image" /></a>
                                        </div>
                                        <div className="rbt-card-body p-0">
                                            <a href="#"
                                                className="rbt-card-subtitle rbt-card-catagories-text">Smartwatch</a>
                                            <p className="rbt-card-title mt--0 b4"><a
                                                    href="product-single-default.html">Fitbit
                                                    Sense 2 Advanced Smartwatch</a></p>
                                            <div className="pricing-part mt--0">
                                                <span className="price-text">₹1,999</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rbt-swiper-scrollbar swiper-scrollbar"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/*  End Added Wishlist Modal Area   */}
    {/*  Start Wishlist Modal Area   */}
    <div className="rbt-default-modal modal fade has-rbt-top-folder-shape" id="socialShareModal" tabIndex={-1} role="dialog"
        aria-modal="true" aria-labelledby="socialShareModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered xxs-size">
            <div className="modal-content">

                <div className="rbt-folder-shape-right-portion">
                    <svg xmlns="http://www.w3.org/2000/svg" width="85" height="90" viewBox="0 0 85 90" fill="none">
                        <path
                            d="M0 0H11.1844C14.5695 0 17.7971 1.42971 20.0716 3.93671L82.1927 72.4059C83.9992 74.397 84.9999 76.9893 84.9999 79.6778C84.9999 85.6547 85.0001 90 85.0001 90H0V0Z"
                            fill="white" />
                    </svg>
                </div>

                <div className="modal-header">
                    <button type="button" className="rbt-round-btn rbt-modal-dis-btn" data-bs-dismiss="modal"
                        aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="rbt-top-folder-shape-wrapper">
                    <div className="rbt-bg-color-white rbt-content-trs-portion">
                        <div className="rbt-title mb--8 rbt-text-bold" id="socialShareModalLabel">Share Options</div>
                        <div className="rbt-social-share-wrapper">

                            <ul
                                className="social-icon rbt-social-default mt--16 mt_sm--0 rbt-social-default-v1 lg-size justify-content-start">
                                <li>
                                    <a className="facebook-btn" href="https://www.facebook.com/">
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="tiktok-btn" href="https://www.tiktok.com/">
                                        <i className="fa-brands fa-tiktok"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="pinterest-btn" href="https://www.pinterest.com/">
                                        <i className="fa-brands fa-pinterest-p"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="tumblr-btn" href="https://www.tumblr.com/">
                                        <i className="fa-brands fa-tumblr"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="telegram-btn" href="https://www.telegram.com/">
                                        <i className="fa-brands fa-telegram"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="whatsapp-btn" href="https://www.whatsapp.com/">
                                        <i className="fa-brands fa-whatsapp"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="email-btn"
                                        href="cdn-cgi/l/email-protection.html#41322e2c242e2f24012439202c312d246f222e2c">
                                        <i className="fa-regular fa-envelope"></i>
                                    </a>
                                </li>
                            </ul>

                            <div className="rbt-copy-link-part rbt-text-copy-activation mt--24 mt_sm--8 w-100">
                                <input className="rbt-copy-value-field w-100" type="text"
                                    value="https://oceanstudentprojects.in/wishlist" readOnly />
                                <button className="rbt-btn rbt-btn-xs has-left-icon rbt-copy-btn"
                                    data-tooltip="Copy to clipboard">
                                    <i className="fa-regular fa-copy"></i>
                                    <span className="rbt-btn-text">Copy</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/*  End Wishlist Modal Area   */}
    {/*  Start Quick View Modal Area   */}
    <div className="rbt-default-modal modal fade has-rbt-top-folder-shape" id="quickviewEditCartModal" tabIndex={-1}
        role="dialog" aria-modal="true" aria-labelledby="quickviewEditCartModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered rbt-cart-edit-area">

            <div className="modal-content">

                <div className="rbt-folder-shape-right-portion">
                    <svg xmlns="http://www.w3.org/2000/svg" width="85" height="90" viewBox="0 0 85 90" fill="none">
                        <path
                            d="M0 0H11.1844C14.5695 0 17.7971 1.42971 20.0716 3.93671L82.1927 72.4059C83.9992 74.397 84.9999 76.9893 84.9999 79.6778C84.9999 85.6547 85.0001 90 85.0001 90H0V0Z"
                            fill="white" />
                    </svg>
                </div>

                <div className="modal-header">
                    <button type="button" className="rbt-round-btn rbt-modal-dis-btn" data-bs-dismiss="modal"
                        aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="rbt-top-folder-shape-wrapper">
                    {/*  Start Component Area  */}
                    <div className="rbt-single-product-area rbt-bg-color-white rbt-content-trs-portion">

                        <div className="rbt-title rbt-modal-title mb--16 h6">Edit Option For You</div>
                        <div className="row row--8 mt_dec--12">
                            <div className="col-md-6 col-12 mt--12">
                                <div className="rbt-cart-product-edit-area">
                                    <a href="#" className="rbt-cart-product-thumb">
                                        <img src="/assets/images/product-single/earphone/earphone-05.webp"
                                            alt="Product Thumbnail" />
                                    </a>
                                    <div className="rbt-product-info">
                                        <p className="rbt-card-title h6" id="quickviewEditCartModalLabel"><a href="#">2021
                                                Apple 12.9-inch iPad Pro Wi-Fi 512GB Gray Space</a></p>
                                        <div className="pricing-part mb--12 mt--0">
                                            <del className="price-text">₹5,000</del>
                                            <span className="price-text">₹2,999</span>
                                        </div>
                                        <div className="rbt-qty-area rbt-qty-sm">
                                            <button className="qty-item-btn qty-item-btn-decr"><i
                                                    className="fa-solid fa-minus"></i></button>
                                            <input type="number" className="items-qty-input" defaultValue="5" min="01" />
                                            <button className="qty-item-btn qty-item-btn-incr"><i
                                                    className="fa-solid fa-plus"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mt--12 pl--32">
                                <div className="rbt-single-product-content">

                                    <div className="rbt-info-wrapper d-flex mt--0">
                                        <div className="prd-info-section">
                                            <div className="prd-id-text">
                                                <p className="text-bold">Color:</p>
                                                <div className="rbt-color-select-area">
                                                    <ul
                                                        className="rbt-switcher-color-list rbt-switcher-color-list-lg product-switcher-activation">
                                                        <li><a className="rbt-switcher--color tooltips rbt-switcher--color-one"
                                                                data-switcher-color="#2B2B2B"
                                                                data-src="/assets/images/product-single/earphone/earphone-05.webp"
                                                                data-tooltip="Black" data-tooltip-position="top"
                                                                href="#">
                                                                <div className="rbt-color-circle"></div>
                                                            </a></li>
                                                        <li className="active"><a
                                                                className="rbt-switcher--color tooltips rbt-switcher--color-two"
                                                                data-switcher-color="#cc999d"
                                                                data-src="/assets/images/product-single/earphone/earphone-02.webp"
                                                                data-tooltip="Pink" data-tooltip-position="top"
                                                                href="#">
                                                                <div className="rbt-color-circle"></div>
                                                            </a></li>
                                                        <li><a className="rbt-switcher--color tooltips rbt-switcher--color-three"
                                                                data-switcher-color="#9C9B9E"
                                                                data-src="/assets/images/product-single/earphone/earphone-04.webp"
                                                                data-tooltip="Dark" data-tooltip-position="top"
                                                                href="#">
                                                                <div className="rbt-color-circle"></div>
                                                            </a></li>
                                                        <li><a className="rbt-switcher--color tooltips rbt-switcher--color-four"
                                                                data-switcher-color="#F2EDE7"
                                                                data-src="/assets/images/product-single/earphone/earphone-03.webp"
                                                                data-tooltip="White" data-tooltip-position="top"
                                                                href="#">
                                                                <div className="rbt-color-circle"></div>
                                                            </a></li>
                                                        <li><a className="rbt-switcher--color tooltips rbt-switcher--color-five rbt-switcher--disable disabled"
                                                                data-switcher-color="#a09fa4"
                                                                data-src="/assets/images/product-single/earphone/earphone-03.webp"
                                                                data-tooltip="White" data-tooltip-position="top"
                                                                href="#">
                                                                <div className="rbt-color-circle"></div>
                                                            </a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rbt-info-wrapper d-flex justify-content-between mt--12">
                                        <div className="product-styles-grp d-flex mt--0">
                                            <p className="text-bold title">Size :</p>
                                            <div className="single-prd-select-area rbt-bg-color-brand-50 rbt-radius">
                                                <div className="rbt-modern-select single-prd-select rbt-sm-size">
                                                    <select className="rbt-select-activation">
                                                        <option>Extra Large</option>
                                                        <option>Large</option>
                                                        <option>Medium</option>
                                                        <option>Small</option>
                                                        <option>Extra Small</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rbt-info-wrapper d-flex mt--12">
                                        <div className="product-styles-grp d-flex mt--0">
                                            <p className="text-bold title">Style :</p>
                                            <div className="content d-flex flex-wrap">
                                                <a className="rbt-btn rbt-btn-border rbt-btn-sm rbt-square-btn active"
                                                    href="#">Headphones Only</a>
                                                <a className="rbt-btn rbt-btn-border rbt-btn-sm disabled"
                                                    href="#">Headphones +
                                                    Charging Stand</a>
                                                <a className="rbt-btn rbt-btn-border rbt-btn-sm rbt-square-btn"
                                                    href="#">Charging Stand</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-12">
                                <a className="rbt-btn d-block text-center rbt-btn-sm rbt-square-btn has-left-icon mt--24 mt_sm--16"
                                    href="#">
                                    <i className="fa-regular fa-cart-shopping"></i>
                                    Update Cart
                                </a>
                            </div>
                        </div>
                    </div>
                    {/*  End Component Area  */}
                </div>
            </div>
        </div>
    </div>
    {/*  End Quick View Modal Area   */}

    </>
  );
}