export default function ProductVideoReview() {
    return (
        <>
            <div className="rbt-component-area rbt-section-gap rbt-bg-color-gray-light pt--0">
                <div className="container">
                    <div className="row row--12 mt_dec--24">
                        <div className="col-xl-8 mt--24">
                            <div className="rbt-tab rbt-product-single-details-tab rbt-fshape-tab">
                                <div className="rbt-tab-nav-wrapper">
                                    <ul className="nav nav-tabs" id="rbt-single-productTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a aria-controls="rbt-description" aria-selected="true" className="nav-link active" data-bs-toggle="tab" href="#rbt-description" id="rbt-description-tab" role="tab">
                                                Description
                                                <span className="rbt-fshape-portion rbt-fshape-left-portion">
                                                    <svg fill="none" height="50" viewBox="0 0 52 50" width="52" xmlns="http://www.w3.org/2000/svg">
                                                        <path className="rbt-svg-fill-one" d="M0.505402 49.9854C116.894 49.9991 -64.388 49.9777 52 49.9914C52 31.2633 52 20.7632 52 2.03504C40.8 1.63545 35.5357 4.56594 32.5357 10.5615L22.0357 38.5324C18.0017 47.9353 6.6182 49.4495 0.505402 49.9854Z"></path>
                                                        <path className="rbt-svg-fill-two" clipRule="evenodd" d="M38.793 1.97666C35.457 3.50832 33.2276 5.91092 31.6412 9.08146L31.6178 9.1283L21.1076 37.1263C18.9861 42.0545 15.232 44.7995 11.3024 46.3063C7.3457 47.8234 3.2411 48.0696 0.566002 47.9886C0.566002 47.9886 0.529102 49.2057 0.505402 49.9856C3.3303 50.0711 7.7257 49.8177 12.019 48.1715C16.3338 46.5171 20.5747 43.4403 22.9549 37.8925L22.9639 37.8713C22.9639 37.8713 32.0421 12.7293 33.4534 9.92838C34.8648 7.12739 36.7799 5.09976 39.6283 3.79203C43.5435 1.50049 52 2.03525 52 2.03525C52 20.7634 52 31.2635 52 49.9916L51.9982 0.0363376C46.331 -0.164216 42.0898 0.46304 38.793 1.97666Z" fillRule="evenodd"></path>
                                                    </svg>
                                                </span>
                                                <span className="rbt-fshape-portion rbt-fshape-right-portion">
                                                    <svg fill="none" height="50" viewBox="0 0 52 50" width="52" xmlns="http://www.w3.org/2000/svg">
                                                        <path className="rbt-svg-fill-one" d="M51.5337 49.984C-64.8544 49.9977 116.427 49.9764 0.0390625 49.9901C0.0390625 31.262 0.0390625 20.7619 0.0390625 2.03378C11.2391 1.63419 16.5034 4.56468 19.5034 10.5602L30.0034 38.5311C34.0374 47.934 45.4209 49.4481 51.5337 49.984Z">
                                                        </path>
                                                        <path className="rbt-svg-fill-two" clipRule="evenodd" d="M13.246 1.97519C16.582 3.50685 18.8114 5.90944 20.3979 9.07997L20.4213 9.12681L30.9315 37.1248C33.053 42.053 36.807 44.7979 40.7367 46.3047C44.6934 47.8219 48.798 48.068 51.4731 47.987C51.4731 47.987 51.51 49.2041 51.5337 49.984C48.7087 50.0695 44.3134 49.8162 40.02 48.17C35.7052 46.5155 31.4643 43.4388 29.0842 37.891L29.0751 37.8698C29.0751 37.8698 19.997 12.7279 18.5857 9.92689C17.1743 7.12591 15.2591 5.09828 12.4108 3.79055C8.49554 1.49902 0.0390625 2.03378 0.0390625 2.03378C0.0390625 20.7619 0.0390625 31.262 0.0390625 49.9901L0.0408325 0.0348727C5.70805 -0.16568 9.9493 0.461575 13.246 1.97519Z" fillRule="evenodd">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a aria-controls="rbt-specification" aria-selected="false" className="nav-link" data-bs-toggle="tab" href="#rbt-specification" id="rbt-specification-tab" role="tab">
                                                Specification
                                                <span className="rbt-fshape-portion rbt-fshape-left-portion">
                                                    <svg fill="none" height="50" viewBox="0 0 52 50" width="52" xmlns="http://www.w3.org/2000/svg">
                                                        <path className="rbt-svg-fill-one" d="M0.505402 49.9854C116.894 49.9991 -64.388 49.9777 52 49.9914C52 31.2633 52 20.7632 52 2.03504C40.8 1.63545 35.5357 4.56594 32.5357 10.5615L22.0357 38.5324C18.0017 47.9353 6.6182 49.4495 0.505402 49.9854Z"></path>
                                                        <path className="rbt-svg-fill-two" clipRule="evenodd" d="M38.793 1.97666C35.457 3.50832 33.2276 5.91092 31.6412 9.08146L31.6178 9.1283L21.1076 37.1263C18.9861 42.0545 15.232 44.7995 11.3024 46.3063C7.3457 47.8234 3.2411 48.0696 0.566002 47.9886C0.566002 47.9886 0.529102 49.2057 0.505402 49.9856C3.3303 50.0711 7.7257 49.8177 12.019 48.1715C16.3338 46.5171 20.5747 43.4403 22.9549 37.8925L22.9639 37.8713C22.9639 37.8713 32.0421 12.7293 33.4534 9.92838C34.8648 7.12739 36.7799 5.09976 39.6283 3.79203C43.5435 1.50049 52 2.03525 52 2.03525C52 20.7634 52 31.2635 52 49.9916L51.9982 0.0363376C46.331 -0.164216 42.0898 0.46304 38.793 1.97666Z" fillRule="evenodd"></path>
                                                    </svg>
                                                </span>
                                                <span className="rbt-fshape-portion rbt-fshape-right-portion">
                                                    <svg fill="none" height="50" viewBox="0 0 52 50" width="52" xmlns="http://www.w3.org/2000/svg">
                                                        <path className="rbt-svg-fill-one" d="M51.5337 49.984C-64.8544 49.9977 116.427 49.9764 0.0390625 49.9901C0.0390625 31.262 0.0390625 20.7619 0.0390625 2.03378C11.2391 1.63419 16.5034 4.56468 19.5034 10.5602L30.0034 38.5311C34.0374 47.934 45.4209 49.4481 51.5337 49.984Z">
                                                        </path>
                                                        <path className="rbt-svg-fill-two" clipRule="evenodd" d="M13.246 1.97519C16.582 3.50685 18.8114 5.90944 20.3979 9.07997L20.4213 9.12681L30.9315 37.1248C33.053 42.053 36.807 44.7979 40.7367 46.3047C44.6934 47.8219 48.798 48.068 51.4731 47.987C51.4731 47.987 51.51 49.2041 51.5337 49.984C48.7087 50.0695 44.3134 49.8162 40.02 48.17C35.7052 46.5155 31.4643 43.4388 29.0842 37.891L29.0751 37.8698C29.0751 37.8698 19.997 12.7279 18.5857 9.92689C17.1743 7.12591 15.2591 5.09828 12.4108 3.79055C8.49554 1.49902 0.0390625 2.03378 0.0390625 2.03378C0.0390625 20.7619 0.0390625 31.262 0.0390625 49.9901L0.0408325 0.0348727C5.70805 -0.16568 9.9493 0.461575 13.246 1.97519Z" fillRule="evenodd">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a aria-controls="rbt-reviews" aria-selected="false" className="nav-link" data-bs-toggle="tab" href="#rbt-reviews" id="rbt-reviews-tab" role="tab">
                                                Reviews
                                                <span className="rbt-fshape-portion rbt-fshape-left-portion">
                                                    <svg fill="none" height="50" viewBox="0 0 52 50" width="52" xmlns="http://www.w3.org/2000/svg">
                                                        <path className="rbt-svg-fill-one" d="M0.505402 49.9854C116.894 49.9991 -64.388 49.9777 52 49.9914C52 31.2633 52 20.7632 52 2.03504C40.8 1.63545 35.5357 4.56594 32.5357 10.5615L22.0357 38.5324C18.0017 47.9353 6.6182 49.4495 0.505402 49.9854Z"></path>
                                                        <path className="rbt-svg-fill-two" clipRule="evenodd" d="M38.793 1.97666C35.457 3.50832 33.2276 5.91092 31.6412 9.08146L31.6178 9.1283L21.1076 37.1263C18.9861 42.0545 15.232 44.7995 11.3024 46.3063C7.3457 47.8234 3.2411 48.0696 0.566002 47.9886C0.566002 47.9886 0.529102 49.2057 0.505402 49.9856C3.3303 50.0711 7.7257 49.8177 12.019 48.1715C16.3338 46.5171 20.5747 43.4403 22.9549 37.8925L22.9639 37.8713C22.9639 37.8713 32.0421 12.7293 33.4534 9.92838C34.8648 7.12739 36.7799 5.09976 39.6283 3.79203C43.5435 1.50049 52 2.03525 52 2.03525C52 20.7634 52 31.2635 52 49.9916L51.9982 0.0363376C46.331 -0.164216 42.0898 0.46304 38.793 1.97666Z" fillRule="evenodd"></path>
                                                    </svg>
                                                </span>
                                                <span className="rbt-fshape-portion rbt-fshape-right-portion">
                                                    <svg fill="none" height="50" viewBox="0 0 52 50" width="52" xmlns="http://www.w3.org/2000/svg">
                                                        <path className="rbt-svg-fill-one" d="M51.5337 49.984C-64.8544 49.9977 116.427 49.9764 0.0390625 49.9901C0.0390625 31.262 0.0390625 20.7619 0.0390625 2.03378C11.2391 1.63419 16.5034 4.56468 19.5034 10.5602L30.0034 38.5311C34.0374 47.934 45.4209 49.4481 51.5337 49.984Z">
                                                        </path>
                                                        <path className="rbt-svg-fill-two" clipRule="evenodd" d="M13.246 1.97519C16.582 3.50685 18.8114 5.90944 20.3979 9.07997L20.4213 9.12681L30.9315 37.1248C33.053 42.053 36.807 44.7979 40.7367 46.3047C44.6934 47.8219 48.798 48.068 51.4731 47.987C51.4731 47.987 51.51 49.2041 51.5337 49.984C48.7087 50.0695 44.3134 49.8162 40.02 48.17C35.7052 46.5155 31.4643 43.4388 29.0842 37.891L29.0751 37.8698C29.0751 37.8698 19.997 12.7279 18.5857 9.92689C17.1743 7.12591 15.2591 5.09828 12.4108 3.79055C8.49554 1.49902 0.0390625 2.03378 0.0390625 2.03378C0.0390625 20.7619 0.0390625 31.262 0.0390625 49.9901L0.0408325 0.0348727C5.70805 -0.16568 9.9493 0.461575 13.246 1.97519Z" fillRule="evenodd">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a aria-controls="rbt-question" aria-selected="false" className="nav-link" data-bs-toggle="tab" href="#rbt-question" id="rbt-question-tab" role="tab">
                                                Questions
                                                <span className="rbt-fshape-portion rbt-fshape-left-portion">
                                                    <svg fill="none" height="50" viewBox="0 0 52 50" width="52" xmlns="http://www.w3.org/2000/svg">
                                                        <path className="rbt-svg-fill-one" d="M0.505402 49.9854C116.894 49.9991 -64.388 49.9777 52 49.9914C52 31.2633 52 20.7632 52 2.03504C40.8 1.63545 35.5357 4.56594 32.5357 10.5615L22.0357 38.5324C18.0017 47.9353 6.6182 49.4495 0.505402 49.9854Z"></path>
                                                        <path className="rbt-svg-fill-two" clipRule="evenodd" d="M38.793 1.97666C35.457 3.50832 33.2276 5.91092 31.6412 9.08146L31.6178 9.1283L21.1076 37.1263C18.9861 42.0545 15.232 44.7995 11.3024 46.3063C7.3457 47.8234 3.2411 48.0696 0.566002 47.9886C0.566002 47.9886 0.529102 49.2057 0.505402 49.9856C3.3303 50.0711 7.7257 49.8177 12.019 48.1715C16.3338 46.5171 20.5747 43.4403 22.9549 37.8925L22.9639 37.8713C22.9639 37.8713 32.0421 12.7293 33.4534 9.92838C34.8648 7.12739 36.7799 5.09976 39.6283 3.79203C43.5435 1.50049 52 2.03525 52 2.03525C52 20.7634 52 31.2635 52 49.9916L51.9982 0.0363376C46.331 -0.164216 42.0898 0.46304 38.793 1.97666Z" fillRule="evenodd"></path>
                                                    </svg>
                                                </span>
                                                <span className="rbt-fshape-portion rbt-fshape-right-portion">
                                                    <svg fill="none" height="50" viewBox="0 0 52 50" width="52" xmlns="http://www.w3.org/2000/svg">
                                                        <path className="rbt-svg-fill-one" d="M51.5337 49.984C-64.8544 49.9977 116.427 49.9764 0.0390625 49.9901C0.0390625 31.262 0.0390625 20.7619 0.0390625 2.03378C11.2391 1.63419 16.5034 4.56468 19.5034 10.5602L30.0034 38.5311C34.0374 47.934 45.4209 49.4481 51.5337 49.984Z">
                                                        </path>
                                                        <path className="rbt-svg-fill-two" clipRule="evenodd" d="M13.246 1.97519C16.582 3.50685 18.8114 5.90944 20.3979 9.07997L20.4213 9.12681L30.9315 37.1248C33.053 42.053 36.807 44.7979 40.7367 46.3047C44.6934 47.8219 48.798 48.068 51.4731 47.987C51.4731 47.987 51.51 49.2041 51.5337 49.984C48.7087 50.0695 44.3134 49.8162 40.02 48.17C35.7052 46.5155 31.4643 43.4388 29.0842 37.891L29.0751 37.8698C29.0751 37.8698 19.997 12.7279 18.5857 9.92689C17.1743 7.12591 15.2591 5.09828 12.4108 3.79055C8.49554 1.49902 0.0390625 2.03378 0.0390625 2.03378C0.0390625 20.7619 0.0390625 31.262 0.0390625 49.9901L0.0408325 0.0348727C5.70805 -0.16568 9.9493 0.461575 13.246 1.97519Z" fillRule="evenodd">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-content">
                                    <div aria-labelledby="rbt-description-tab" className="tab-pane fade show active" id="rbt-description" role="tabpanel">
                                        <div className="rbt-product-single-description">
                                            <h2 className="rbt-block-title h6 mb--0">Immersive visuals</h2>
                                            <p className="rbt-block-desc b1 mb--0 mt--12">Quisque varius diam vel metus mattis, id
                                                aliquam diam rhoncus.
                                                Proin vitae
                                                magna in dui finibus malesuada et at nulla. Morbi elit ex, viverra vitae ante
                                                vel, blandit feugiat
                                                ligula. Fusce
                                                fermentum iaculis nibh, at sodales leo maximus a. Nullam ultricies sodales nunc,
                                                in pellentesque
                                                lorem mattis quis.
                                                Cras imperdiet est in nunc tristique lacinia. Nullam aliquam mauris eu accumsan
                                                tincidunt.
                                                Suspendisse velit ex,
                                                aliquet vel ornare vel, dignissim a tortor. Morbi ut sapien vitae odio accumsan
                                                gravida. Morbi vitae
                                                erat auctor,
                                                eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra. Maecenas
                                                lacus odio, feugiat eu
                                                nunc sit amet,
                                                maximus sagittis dolor. </p>
                                            <div className="rbt-block-banner-img mt--32">
                                                <img alt="Ecommerce Product Banner" src="/assets/images/product-single/single-prd-banner/single-prd-banner-01.webp" />
                                            </div>
                                            <p className="rbt-block-desc b1 mb--0 mt--12">Quisque varius diam vel metus mattis, id
                                                aliquam diam rhoncus.
                                                Proin vitae magna in dui finibus malesuada et at nulla. Morbi elit ex, viverra
                                                vitae ante vel,
                                                blandit feugiat ligula. Fusce fermentum iaculis nibh, at sodales leo maximus a.
                                                Nullam ultricies
                                                sodales nunc, in pellentesque lorem mattis quis. Cras imperdiet est in nunc
                                                tristique lacinia.
                                                Nullam aliquam mauris eu accumsan tincidunt. Suspendisse velit ex, aliquet vel
                                                ornare vel, dignissim
                                                a tortor. Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat auctor,
                                                eleifend nunc a,
                                                lobortis neque. Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat
                                                eu nunc sit amet,
                                                maximus sagittis dolor. </p>
                                            <p className="rbt-block-desc b1 mb--0 mt--12">sunt in culpa qui officia deserunt mollit
                                                anim id est
                                                laborum.nunc, in pellentesque lorem mattis quis. Cras imperdiet
                                                est in nunc tristique lacinia. Nullam aliquam mauris eu accumsan tincidunt.
                                                Suspendisse velit ex,
                                                aliquet vel ornare
                                                vel, dignissim a tortor. Morbi ut sapien vitae odio accumsan gravida. Morbi
                                                vitae erat auctor,
                                                eleifend nunc a, lobortis
                                                neque. Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc
                                                sit</p>
                                            <div className="rbt-block-banner-video mt--32">
                                                <video autoPlay loop muted src="/assets/videos/prd-single-dtls-video-01.mp4"></video>
                                            </div>
                                            <div className="rbt-prd-feature-area mt--32">
                                                <div className="row row--12 mt_dec--24 rbt-mobile-row">
                                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt--24">
                                                        <div className="rbt-prd-feature-card rbt-bg-color-brand-50 rbt-curved-style-box">
                                                            <div className="rbt-inner text-center">
                                                                <span className="icon"><i className="fa-regular fa-microphone-lines"></i></span>
                                                                <p className="title b1">Microphone built-in</p>
                                                                <p className="desc b2">Lorem ipsum simply dummy
                                                                    text printing typesetting.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt--24">
                                                        <div className="rbt-prd-feature-card rbt-bg-color-brand-50 rbt-curved-style-box">
                                                            <div className="rbt-inner text-center">
                                                                <span className="icon"><i className="fa-regular fa-droplet-slash"></i></span>
                                                                <p className="title b1">Water resistant</p>
                                                                <p className="desc b2">Lorem ipsum simply dummy
                                                                    text printing typesetting.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt--24">
                                                        <div className="rbt-prd-feature-card rbt-bg-color-brand-50 rbt-curved-style-box">
                                                            <div className="rbt-inner text-center">
                                                                <span className="icon"><i className="fa-regular fa-battery-bolt"></i></span>
                                                                <p className="title b1">Long lasting battery</p>
                                                                <p className="desc b2">Lorem ipsum simply dummy
                                                                    text printing typesetting.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="rbt-block-desc b1 mb--0 mt--12">Egestas purus a luctus ridiculus ac
                                                malesuada arcu a. Euismod
                                                dapibus commodo metus phasellus blandit suspendisse
                                                euismod orci tellus. Habitasse hendrerit dolor euismod varius nisi. Platea
                                                praesent nisi ultrices
                                                rhoncus volutpat
                                                nostra. Efficitur dui nec massa nulla nostra nunc massa ornare fermentum.
                                                Parturient turpis per
                                                adipiscing vestibulum
                                                donec tincidunt ligula. Purus tristique ut dolor mollis ut cras scelerisque nec.
                                                Massa dis mus
                                                senectus tortor ligula.
                                                Ullamcorper molestie placerat bibendum hac aptent volutpat ad laoreet</p>
                                            <p className="rbt-block-desc b1 mb--0 mt--12">Scelerisque sociosqu sagittis bibendum
                                                quam id;
                                                ultrices placerat adipiscing. Imperdiet egestas ullamcorper cras blandit
                                                himenaeos auctor lacus
                                                commodo. Feugiat quisque
                                                nascetur tincidunt duis phasellus, sagittis euismod. Donec nisl senectus risus
                                                nullam quisque
                                                vivamus. Dapibus pulvinar
                                                lobortis auctor quam neque. Nibh at maximus taciti mattis rutrum viverra. Dictum
                                                ipsum tortor nibh
                                                parturient laoreet
                                                ullamcorper rhoncus tincidunt. At risus aliquam ligula ut vivamus mi sodales
                                                volutpat. Cursus
                                                sodales hendrerit donec
                                                efficitur penatibus.</p>
                                            <div className="rbt-block-banner-img mt--32">
                                                <img alt="Ecommerce Product Banner" src="/assets/images/product-single/single-prd-banner/single-prd-banner-02.webp" />
                                            </div>
                                        </div>
                                    </div>
                                    <div aria-labelledby="rbt-specification-tab" className="tab-pane fade" id="rbt-specification" role="tabpanel">
                                        <div className="rbt-prd-single-specification-info">
                                            <div className="rbt-single-specification">
                                                <label className="b1 title">Brand :</label>
                                                <ul className="rbt-specification-list">
                                                    <li>Custom acoustic platform delivers powerful, immersive sound</li>
                                                    <li>Active Noise Cancelling (ANC) adapts to your personal fit to keep you
                                                        immersed in the</li>
                                                    <li>Transparency mode blends your listening experience with the world around
                                                        you</li>
                                                    <li>Spatial audio for Dolby Atmos surrounds you with sound?</li>
                                                    <li>Three new acoustic vents to improve audio precision and gently pressure
                                                        for a more </li>
                                                    <li>IPX4-rated sweat and water resistant earbuds*</li>
                                                </ul>
                                            </div>
                                            <div className="rbt-single-specification">
                                                <label className="b1 title">Design :</label>
                                                <ul className="rbt-specification-list">
                                                    <li>One-touch pairing instantly connects with every device in your iCloud
                                                        accounts</li>
                                                    <li>Receive software updates and new features automatically</li>
                                                    <li>Industry-leading Class 1 Bluetooth® for extended range and fewer
                                                        dropouts</li>
                                                    <li>Spatial audio for Dolby Atmos surrounds you with sound?</li>
                                                    <li>High-quality call performance from upgraded voice-targeting microphones
                                                    </li>
                                                    <li>Spatial audio for Dolby Atmos surrounds you with sound?</li>
                                                </ul>
                                            </div>
                                            <div className="rbt-single-specification">
                                                <label className="b1 title">Alternate names</label>
                                                <div className="rbt-specification-content">
                                                    <span className="desc">iPad 5</span>
                                                </div>
                                            </div>
                                            <div className="rbt-single-specification">
                                                <label className="b1 title">Brand</label>
                                                <div className="rbt-specification-content">
                                                    <span className="desc">Apple</span>
                                                </div>
                                            </div>
                                            <div className="rbt-single-specification">
                                                <label className="b1 title">Model</label>
                                                <div className="rbt-specification-content">
                                                    <span className="desc">IPad Air Wi-Fi + Cellular</span>
                                                </div>
                                            </div>
                                            <div className="rbt-single-specification">
                                                <label className="b1 title">Release date</label>
                                                <div className="rbt-specification-content">
                                                    <span className="desc">September 2013</span>
                                                </div>
                                            </div>
                                            <div className="rbt-single-specification">
                                                <label className="b1 title">Dimensions (mm)</label>
                                                <div className="rbt-specification-content">
                                                    <span className="desc">240.00 x 169.50 x 7.50</span>
                                                </div>
                                            </div>
                                            <div className="rbt-single-specification">
                                                <label className="b1 title">Weight (g)</label>
                                                <div className="rbt-specification-content">
                                                    <span className="desc">478.00</span>
                                                </div>
                                            </div>
                                            <div className="rbt-single-specification">
                                                <label className="b1 title">Battery capacity (mAh)</label>
                                                <div className="rbt-specification-content">
                                                    <span className="desc">8820</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div aria-labelledby="rbt-reviews-tab" className="tab-pane fade" id="rbt-reviews" role="tabpanel">
                                        <div className="rbt-product-single-reviews-area">
                                            <div className="rbt-review-statistics-section">
                                                <div className="row row--12 mt_dec--24">
                                                    <div className="col-md-6 mt--24">
                                                        <div className="rbt-avr-review">
                                                            <span className="rbt-abr-review-number-text">4.33</span>
                                                            <div className="rbt-abr-review-content">
                                                                <ul className="rbt-rating-icon-list">
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star"></i></li>
                                                                    <li><i className="fa-solid fa-star"></i></li>
                                                                </ul>
                                                                <p className="rating-text b3 mt--8 rbt-text-color-gray-700">Based on
                                                                    19 Review</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mt--24">
                                                        <div className="rbt-rating-breakdown">
                                                            <div className="rbt-rating-item">
                                                                <span className="icon"><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                <span className="number-text">5</span>
                                                                <div aria-label="Shipping-progress" aria-valuemax={100} aria-valuemin={0} aria-valuenow={50} className="progress" role="progressbar">
                                                                    <div className="progress-bar w-50"></div>
                                                                </div>
                                                                <span className="number-text">6</span>
                                                            </div>
                                                            <div className="rbt-rating-item">
                                                                <span className="icon"><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                <span className="number-text">4</span>
                                                                <div aria-label="Shipping-progress" aria-valuemax={100} aria-valuemin={0} aria-valuenow={50} className="progress" role="progressbar">
                                                                    <div className="progress-bar w-25"></div>
                                                                </div>
                                                                <span className="number-text">4</span>
                                                            </div>
                                                            <div className="rbt-rating-item">
                                                                <span className="icon"><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                <span className="number-text">3</span>
                                                                <div aria-label="Shipping-progress" aria-valuemax={100} aria-valuemin={0} aria-valuenow={50} className="progress" role="progressbar">
                                                                    <div className="progress-bar w-75"></div>
                                                                </div>
                                                                <span className="number-text">6</span>
                                                            </div>
                                                            <div className="rbt-rating-item">
                                                                <span className="icon"><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                <span className="number-text">2</span>
                                                                <div aria-label="Shipping-progress" aria-valuemax={100} aria-valuemin={0} aria-valuenow={50} className="progress" role="progressbar">
                                                                    <div className="progress-bar w-75"></div>
                                                                </div>
                                                                <span className="number-text">6</span>
                                                            </div>
                                                            <div className="rbt-rating-item">
                                                                <span className="icon"><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                <span className="number-text">1</span>
                                                                <div aria-label="Shipping-progress" aria-valuemax={100} aria-valuemin={0} aria-valuenow={50} className="progress" role="progressbar">
                                                                    <div className="progress-bar w-50"></div>
                                                                </div>
                                                                <span className="number-text">9</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rbt-prd-single-reviews-list-area">
                                            <ul className="rbt-comment-list">
                                                {/* Start Single Comment  */}
                                                <li className="comment">
                                                    <div className="comment-body">
                                                        <div className="single-comment">
                                                            <div className="comment-img">
                                                                <img alt="Author Images" src="/assets/images/blog-details/blog-commenter-1.webp" />
                                                            </div>
                                                            <div className="comment-inner">
                                                                <ul className="rbt-rating-icon-list">
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star"></i></li>
                                                                    <li><i className="fa-solid fa-star"></i></li>
                                                                </ul>
                                                                <div className="comment-meta">
                                                                    <div className="time-spent">Nov 23, 2018 at 12:23 pm</div>
                                                                </div>
                                                                <div className="comment-text">
                                                                    <p className="title">No longer available to buy new</p>
                                                                    <p className="b1">Duis hendrerit velit scelerisque felis tempus,
                                                                        id
                                                                        porta
                                                                        libero venenatis. Nulla facilisi. Phasellus viverra
                                                                        magna commodo dui lacinia tempus. Donec malesuada nunc
                                                                        non dui posuere, fringilla vestibulum urna mollis.
                                                                        Integer condimentum ac sapien quis maximus. </p>
                                                                    <ul className="rbt-commented-img-list">
                                                                        <li>
                                                                            <a className="rbt-commented-img" data-fancybox="review-image" href="/assets/images/product-single/single-prd-review/prd-rev-img-01.webp">
                                                                                <img alt="Eccommerce Product Image" src="/assets/images/product-single/single-prd-review/prd-rev-img-01.webp" />
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="rbt-commented-img" data-fancybox="review-image" href="/assets/images/product-single/single-prd-review/prd-rev-img-02.webp">
                                                                                <img alt="Eccommerce Product Image" src="/assets/images/product-single/single-prd-review/prd-rev-img-02.webp" />
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="rbt-commented-img" data-fancybox="review-image" href="/assets/images/product-single/single-prd-review/prd-rev-img-03.webp">
                                                                                <img alt="Eccommerce Product Image" src="/assets/images/product-single/single-prd-review/prd-rev-img-03.webp" />
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="rbt-commented-img has-more-link" data-black-overlay="7" data-fancybox="review-image" href="/assets/images/product-single/single-prd-review/prd-rev-img-04.webp">
                                                                                <img alt="Eccommerce Product Image" src="/assets/images/product-single/single-prd-review/prd-rev-img-04.webp" />
                                                                                <span className="text">
                                                                                    +5 Images
                                                                                </span>
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* End Single Comment  */}
                                                {/* Start Single Comment  */}
                                                <li className="comment">
                                                    <div className="comment-body">
                                                        <div className="single-comment">
                                                            <div className="comment-img">
                                                                <img alt="Author Images" src="/assets/images/blog-details/blog-commenter-2.webp" />
                                                            </div>
                                                            <div className="comment-inner">
                                                                <ul className="rbt-rating-icon-list">
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star"></i></li>
                                                                    <li><i className="fa-solid fa-star"></i></li>
                                                                </ul>
                                                                <div className="comment-meta">
                                                                    <div className="time-spent">Nov 23, 2018 at 12:23 pm
                                                                    </div>
                                                                </div>
                                                                <div className="comment-text">
                                                                    <p className="title">No longer available to buy new</p>
                                                                    <p className="b1">Pellentesque habitant morbi tristique
                                                                        senectus et
                                                                        netus et malesuada fames ac turpis egestas.
                                                                        Suspendisse
                                                                        lobortis cursus lacinia. Vestibulum vitae leo id
                                                                        diam
                                                                        pellentesque ornare.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* End Single Comment  */}
                                                {/* Start Single Comment  */}
                                                <li className="comment">
                                                    <div className="comment-body">
                                                        <div className="single-comment">
                                                            <div className="comment-img">
                                                                <img alt="Author Images" src="/assets/images/blog-details/blog-commenter-3.webp" />
                                                            </div>
                                                            <div className="comment-inner">
                                                                <ul className="rbt-rating-icon-list">
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star"></i></li>
                                                                    <li><i className="fa-solid fa-star"></i></li>
                                                                </ul>
                                                                <div className="comment-meta">
                                                                    <div className="time-spent">Nov 23, 2018 at 12:23 pm</div>
                                                                </div>
                                                                <div className="comment-text">
                                                                    <p className="title">No longer available to buy new</p>
                                                                    <p className="b1">Duis hendrerit velit scelerisque felis tempus,
                                                                        id
                                                                        porta
                                                                        libero venenatis. Nulla facilisi. Phasellus viverra
                                                                        magna commodo dui lacinia tempus. Donec malesuada nunc
                                                                        non dui posuere, fringilla vestibulum urna mollis.
                                                                        Integer condimentum ac sapien quis maximus. </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* End Single Comment  */}
                                            </ul>
                                        </div>
                                        <div className="rbt-reviews-form">
                                            <form className="rbt-contact-form">
                                                <div className="rbt-fshape-box-outline-style">
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="rbt-component-section-title rbt-contact-form-title rbt-bg-color-white">
                                                                <h2 className="rbt-title h6"><span className="rbt-bold--text">Add A
                                                                    Review</span></h2>
                                                                <span className="rbt-fshape-right-portion">
                                                                    <svg fill="none" height="50" viewBox="0 0 52 50" width="52" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M51.5337 49.984C-64.8544 49.9977 116.427 49.9764 0.0390625 49.9901C0.0390625 31.262 0.0390625 20.7619 0.0390625 2.03378C11.2391 1.63419 16.5034 4.56468 19.5034 10.5602L30.0034 38.5311C34.0374 47.934 45.4209 49.4481 51.5337 49.984Z" fill="var(--color-white)"></path>
                                                                        <path clipRule="evenodd" d="M13.246 1.97519C16.582 3.50685 18.8114 5.90944 20.3979 9.07997L20.4213 9.12681L30.9315 37.1248C33.053 42.053 36.807 44.7979 40.7367 46.3047C44.6934 47.8219 48.798 48.068 51.4731 47.987C51.4731 47.987 51.51 49.2041 51.5337 49.984C48.7087 50.0695 44.3134 49.8162 40.02 48.17C35.7052 46.5155 31.4643 43.4388 29.0842 37.891L29.0751 37.8698C29.0751 37.8698 19.997 12.7279 18.5857 9.92689C17.1743 7.12591 15.2591 5.09828 12.4108 3.79055C8.49554 1.49902 0.0390625 2.03378 0.0390625 2.03378C0.0390625 20.7619 0.0390625 31.262 0.0390625 49.9901L0.0408325 0.0348727C5.70805 -0.16568 9.9493 0.461575 13.246 1.97519Z" fill="var(--color-brand-100)" fillRule="evenodd"></path>
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rbt-fshape-box rbt-bg-color-white rbt-contact-form-fshape">
                                                        <div className="row">
                                                            <div className="col-12 mb--16">
                                                                <div className="rbt-contact-input-field-grp">
                                                                    <ul className="rbt-review-inp-list">
                                                                        <li className="rbt-review-inp">
                                                                            <input id="rbt-review-radio-1" name="rbt-review-radio" type="radio" />
                                                                            <label htmlFor="rbt-review-radio-1">
                                                                                <span className="rbt-rating-icon-list">
                                                                                    <span><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                                </span>
                                                                            </label>
                                                                        </li>
                                                                        <li className="rbt-review-inp">
                                                                            <input id="rbt-review-radio-2" name="rbt-review-radio" type="radio" />
                                                                            <label htmlFor="rbt-review-radio-2">
                                                                                <span className="rbt-rating-icon-list">
                                                                                    <span><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                                    <span><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                                </span>
                                                                            </label>
                                                                        </li>
                                                                        <li className="rbt-review-inp">
                                                                            <input id="rbt-review-radio-3" name="rbt-review-radio" type="radio" />
                                                                            <label htmlFor="rbt-review-radio-3">
                                                                                <span className="rbt-rating-icon-list">
                                                                                    <span><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                                    <span><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                                    <span><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                                </span>
                                                                            </label>
                                                                        </li>
                                                                        <li className="rbt-review-inp">
                                                                            <input id="rbt-review-radio-4" name="rbt-review-radio" type="radio" />
                                                                            <label htmlFor="rbt-review-radio-4">
                                                                                <span className="rbt-rating-icon-list">
                                                                                    <span><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                                    <span><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                                    <span><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                                    <span><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                                </span>
                                                                            </label>
                                                                        </li>
                                                                        <li className="rbt-review-inp">
                                                                            <input id="rbt-review-radio-5" name="rbt-review-radio" type="radio" />
                                                                            <label htmlFor="rbt-review-radio-5">
                                                                                <span className="rbt-rating-icon-list">
                                                                                    <span><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                                    <span><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                                    <span><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                                    <span><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                                    <span><i className="fa-solid fa-star rbt-rated-icon"></i></span>
                                                                                </span>
                                                                            </label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 mb--16">
                                                                <div className="rbt-contact-input-field-grp">
                                                                    <label htmlFor="email">Your Review Title</label>
                                                                    <input className="rbt-contact-input-field" id="email" type="email" />
                                                                </div>
                                                            </div>
                                                            <div className="col-12 mb--16">
                                                                <div className="rbt-contact-input-field-grp">
                                                                    <label htmlFor="message">Your review</label>
                                                                    <textarea className="rbt-contact-input-field" id="message" name="message"></textarea>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-md-end mt--8 rbt-gap--12 flex-wrap">
                                                                <button className="rbt-btn rbt-btn-md rbt-btn-border">Upload
                                                                    Image</button>
                                                                <a className="rbt-btn rbt-btn-md" href="#">Submit Now</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div aria-labelledby="rbt-question-tab" className="tab-pane fade" id="rbt-question" role="tabpanel">
                                        <div className="rbt-prd-single-faq-section">
                                            <div className="rbt-section-title-area rbt-bg-color-gray-light">
                                                <h2 className="rbt-block-title h6 mb--0">Frequently Asked Questions? Look here</h2>
                                            </div>
                                            <div className="rbt-accordion-style rbt-accordion-01 accordion">
                                                <div className="accordion" id="accordionExampleb4">
                                                    <div className="accordion-item card">
                                                        <h2 className="accordion-header card-header" id="headingOne1">
                                                            <button aria-controls="collapseOne1" aria-expanded="true" className="accordion-button" data-bs-target="#collapseOne1" data-bs-toggle="collapse" type="button">
                                                                What if I just had renovation work done?
                                                            </button>
                                                        </h2>
                                                        <div aria-labelledby="headingOne1" className="accordion-collapse collapse show" data-bs-parent="#accordionExampleb4" id="collapseOne1" role="region">
                                                            <div className="accordion-body card-body">
                                                                If you've recently had renovation work done, we can provide
                                                                specialized cleaning
                                                                services tailored to post-renovation needs. Our team is equipped
                                                                to handle the extra
                                                                dust and debris that comes with renovations, ensuring your space
                                                                is spotless and
                                                                ready for use.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item card">
                                                        <h2 className="accordion-header card-header" id="headingOne2">
                                                            <button aria-controls="collapseOne2" aria-expanded="false" className="accordion-button collapsed" data-bs-target="#collapseOne2" data-bs-toggle="collapse" type="button">
                                                                Do I get a discount if I’m a frequent customer?
                                                            </button>
                                                        </h2>
                                                        <div aria-labelledby="headingOne2" className="accordion-collapse collapse" data-bs-parent="#accordionExampleb4" id="collapseOne2" role="region">
                                                            <div className="accordion-body card-body">
                                                                Yes, we offer discounts to our loyal customers. If you use our
                                                                services frequently,
                                                                you may qualify for special pricing or promotional offers.
                                                                Please contact our
                                                                customer service team for more details on available discounts.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item card">
                                                        <h2 className="accordion-header card-header" id="headingOne3">
                                                            <button aria-controls="collapseOne3" aria-expanded="false" className="accordion-button collapsed" data-bs-target="#collapseOne3" data-bs-toggle="collapse" type="button">
                                                                Can I give specific instructions to the cleaners and ask for
                                                                special requests?
                                                            </button>
                                                        </h2>
                                                        <div aria-labelledby="headingOne3" className="accordion-collapse collapse" data-bs-parent="#accordionExampleb4" id="collapseOne3" role="region">
                                                            <div className="accordion-body card-body">
                                                                Absolutely! We understand that every space has unique needs. You
                                                                can provide
                                                                specific instructions and request special services to ensure
                                                                your cleaning needs are
                                                                met exactly as you prefer. Our team is committed to
                                                                accommodating your requirements.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item card">
                                                        <h2 className="accordion-header card-header" id="headingOne4">
                                                            <button aria-controls="collapseOne4" aria-expanded="false" className="accordion-button collapsed" data-bs-target="#collapseOne4" data-bs-toggle="collapse" type="button">
                                                                What if I don’t have a mop, bucket, or vacuum?
                                                            </button>
                                                        </h2>
                                                        <div aria-labelledby="headingOne4" className="accordion-collapse collapse" data-bs-parent="#accordionExampleb4" id="collapseOne4" role="region">
                                                            <div className="accordion-body card-body">
                                                                No problem at all! Our cleaning team comes fully equipped with
                                                                all the necessary
                                                                supplies, including mops, buckets, and vacuums. You don’t need
                                                                to provide any
                                                                cleaning tools or equipment.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item card">
                                                        <h2 className="accordion-header card-header" id="headingOne5">
                                                            <button aria-controls="collapseOne5" aria-expanded="false" className="accordion-button collapsed" data-bs-target="#collapseOne5" data-bs-toggle="collapse" type="button">
                                                                Do you clean offices and other commercial spaces?
                                                            </button>
                                                        </h2>
                                                        <div aria-labelledby="headingOne5" className="accordion-collapse collapse" data-bs-parent="#accordionExampleb4" id="collapseOne5" role="region">
                                                            <div className="accordion-body card-body">
                                                                Yes, we offer cleaning services for both residential and
                                                                commercial spaces,
                                                                including offices. Our team is experienced in handling the
                                                                specific cleaning needs
                                                                of commercial environments, ensuring a clean and professional
                                                                setting for your
                                                                business.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 mt--24 rbt-single-mobile-view-sidebar">
                            <div className="rbt-tab rbt-product-single-details-tab rbt-fshape-tab">
                                <div className="rbt-tab-nav-wrapper">
                                    <ul className="nav nav-tabs" id="rbt-product-recomTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a aria-controls="rbt-viewd-prd" aria-selected="true" className="nav-link active" data-bs-toggle="tab" href="#rbt-viewd-prd" id="rbt-viewd-prd-tab" role="tab">
                                                Recently Viewed
                                                <span className="rbt-fshape-portion rbt-fshape-left-portion">
                                                    <svg fill="none" height="50" viewBox="0 0 52 50" width="52" xmlns="http://www.w3.org/2000/svg">
                                                        <path className="rbt-svg-fill-one" d="M0.505402 49.9854C116.894 49.9991 -64.388 49.9777 52 49.9914C52 31.2633 52 20.7632 52 2.03504C40.8 1.63545 35.5357 4.56594 32.5357 10.5615L22.0357 38.5324C18.0017 47.9353 6.6182 49.4495 0.505402 49.9854Z"></path>
                                                        <path className="rbt-svg-fill-two" clipRule="evenodd" d="M38.793 1.97666C35.457 3.50832 33.2276 5.91092 31.6412 9.08146L31.6178 9.1283L21.1076 37.1263C18.9861 42.0545 15.232 44.7995 11.3024 46.3063C7.3457 47.8234 3.2411 48.0696 0.566002 47.9886C0.566002 47.9886 0.529102 49.2057 0.505402 49.9856C3.3303 50.0711 7.7257 49.8177 12.019 48.1715C16.3338 46.5171 20.5747 43.4403 22.9549 37.8925L22.9639 37.8713C22.9639 37.8713 32.0421 12.7293 33.4534 9.92838C34.8648 7.12739 36.7799 5.09976 39.6283 3.79203C43.5435 1.50049 52 2.03525 52 2.03525C52 20.7634 52 31.2635 52 49.9916L51.9982 0.0363376C46.331 -0.164216 42.0898 0.46304 38.793 1.97666Z" fillRule="evenodd"></path>
                                                    </svg>
                                                </span>
                                                <span className="rbt-fshape-portion rbt-fshape-right-portion">
                                                    <svg fill="none" height="50" viewBox="0 0 52 50" width="52" xmlns="http://www.w3.org/2000/svg">
                                                        <path className="rbt-svg-fill-one" d="M51.5337 49.984C-64.8544 49.9977 116.427 49.9764 0.0390625 49.9901C0.0390625 31.262 0.0390625 20.7619 0.0390625 2.03378C11.2391 1.63419 16.5034 4.56468 19.5034 10.5602L30.0034 38.5311C34.0374 47.934 45.4209 49.4481 51.5337 49.984Z">
                                                        </path>
                                                        <path className="rbt-svg-fill-two" clipRule="evenodd" d="M13.246 1.97519C16.582 3.50685 18.8114 5.90944 20.3979 9.07997L20.4213 9.12681L30.9315 37.1248C33.053 42.053 36.807 44.7979 40.7367 46.3047C44.6934 47.8219 48.798 48.068 51.4731 47.987C51.4731 47.987 51.51 49.2041 51.5337 49.984C48.7087 50.0695 44.3134 49.8162 40.02 48.17C35.7052 46.5155 31.4643 43.4388 29.0842 37.891L29.0751 37.8698C29.0751 37.8698 19.997 12.7279 18.5857 9.92689C17.1743 7.12591 15.2591 5.09828 12.4108 3.79055C8.49554 1.49902 0.0390625 2.03378 0.0390625 2.03378C0.0390625 20.7619 0.0390625 31.262 0.0390625 49.9901L0.0408325 0.0348727C5.70805 -0.16568 9.9493 0.461575 13.246 1.97519Z" fillRule="evenodd">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a aria-controls="rbt-recom-prd" aria-selected="false" className="nav-link" data-bs-toggle="tab" href="#rbt-recom-prd" id="rbt-recom-prd-tab" role="tab">
                                                Recommended
                                                <span className="rbt-fshape-portion rbt-fshape-left-portion">
                                                    <svg fill="none" height="50" viewBox="0 0 52 50" width="52" xmlns="http://www.w3.org/2000/svg">
                                                        <path className="rbt-svg-fill-one" d="M0.505402 49.9854C116.894 49.9991 -64.388 49.9777 52 49.9914C52 31.2633 52 20.7632 52 2.03504C40.8 1.63545 35.5357 4.56594 32.5357 10.5615L22.0357 38.5324C18.0017 47.9353 6.6182 49.4495 0.505402 49.9854Z"></path>
                                                        <path className="rbt-svg-fill-two" clipRule="evenodd" d="M38.793 1.97666C35.457 3.50832 33.2276 5.91092 31.6412 9.08146L31.6178 9.1283L21.1076 37.1263C18.9861 42.0545 15.232 44.7995 11.3024 46.3063C7.3457 47.8234 3.2411 48.0696 0.566002 47.9886C0.566002 47.9886 0.529102 49.2057 0.505402 49.9856C3.3303 50.0711 7.7257 49.8177 12.019 48.1715C16.3338 46.5171 20.5747 43.4403 22.9549 37.8925L22.9639 37.8713C22.9639 37.8713 32.0421 12.7293 33.4534 9.92838C34.8648 7.12739 36.7799 5.09976 39.6283 3.79203C43.5435 1.50049 52 2.03525 52 2.03525C52 20.7634 52 31.2635 52 49.9916L51.9982 0.0363376C46.331 -0.164216 42.0898 0.46304 38.793 1.97666Z" fillRule="evenodd"></path>
                                                    </svg>
                                                </span>
                                                <span className="rbt-fshape-portion rbt-fshape-right-portion">
                                                    <svg fill="none" height="50" viewBox="0 0 52 50" width="52" xmlns="http://www.w3.org/2000/svg">
                                                        <path className="rbt-svg-fill-one" d="M51.5337 49.984C-64.8544 49.9977 116.427 49.9764 0.0390625 49.9901C0.0390625 31.262 0.0390625 20.7619 0.0390625 2.03378C11.2391 1.63419 16.5034 4.56468 19.5034 10.5602L30.0034 38.5311C34.0374 47.934 45.4209 49.4481 51.5337 49.984Z">
                                                        </path>
                                                        <path className="rbt-svg-fill-two" clipRule="evenodd" d="M13.246 1.97519C16.582 3.50685 18.8114 5.90944 20.3979 9.07997L20.4213 9.12681L30.9315 37.1248C33.053 42.053 36.807 44.7979 40.7367 46.3047C44.6934 47.8219 48.798 48.068 51.4731 47.987C51.4731 47.987 51.51 49.2041 51.5337 49.984C48.7087 50.0695 44.3134 49.8162 40.02 48.17C35.7052 46.5155 31.4643 43.4388 29.0842 37.891L29.0751 37.8698C29.0751 37.8698 19.997 12.7279 18.5857 9.92689C17.1743 7.12591 15.2591 5.09828 12.4108 3.79055C8.49554 1.49902 0.0390625 2.03378 0.0390625 2.03378C0.0390625 20.7619 0.0390625 31.262 0.0390625 49.9901L0.0408325 0.0348727C5.70805 -0.16568 9.9493 0.461575 13.246 1.97519Z" fillRule="evenodd">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-content">
                                    <div aria-labelledby="rbt-viewd-prd-tab" className="tab-pane fade show active" id="rbt-viewd-prd" role="tabpanel">
                                        <div className="rbt-single-prd-viewed-prd-area">
                                            <div className="rbt-list-card-box rbt-list-card-box border-0 p-0">
                                                <div className="rbt-card rbt-product-card rbt-list-view-variation list-view-md">
                                                    <div className="inner">
                                                        <div className="rbt-card-body">
                                                            <div className="rbt-card-rating">
                                                                <ul className="rbt-rating-icon-list">
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                </ul>
                                                                <p className="rating-digit">(46)</p>
                                                            </div>
                                                            <h2 className="rbt-card-title"><a href="/shop">GoPro HERO12 Black
                                                                Action Camera</a></h2>
                                                            <div className="pricing-part">
                                                                <del className="price-text">₹4,999</del>
                                                                <span className="price-text">₹2,999</span>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                            <a href="/shop"><img alt="Card Image" src="/assets/images/product-img/electronics/electronics-bg-trans-04.webp" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="rbt-card rbt-product-card rbt-list-view-variation list-view-md">
                                                    <div className="inner">
                                                        <div className="rbt-card-body">
                                                            <div className="rbt-card-rating">
                                                                <ul className="rbt-rating-icon-list">
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                </ul>
                                                                <p className="rating-digit">(46)</p>
                                                            </div>
                                                            <h2 className="rbt-card-title"><a href="/shop">Nespresso Vertuo Plus
                                                                Coffee Machine</a></h2>
                                                            <div className="pricing-part">
                                                                <del className="price-text">₹4,999</del>
                                                                <span className="price-text">₹2,999</span>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                            <a href="/shop"><img alt="Card Image" src="/assets/images/product-img/electronics/electronics-bg-trans-02.webp" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="rbt-card rbt-product-card rbt-list-view-variation list-view-md">
                                                    <div className="inner">
                                                        <div className="rbt-card-body">
                                                            <div className="rbt-card-rating">
                                                                <ul className="rbt-rating-icon-list">
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                </ul>
                                                                <p className="rating-digit">(46)</p>
                                                            </div>
                                                            <h2 className="rbt-card-title"><a href="/shop">Fitbit Sense 2 Advanced
                                                                Smartwatch</a></h2>
                                                            <div className="pricing-part">
                                                                <del className="price-text">₹4,999</del>
                                                                <span className="price-text">₹2,999</span>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                            <a href="/shop"><img alt="Card Image" src="/assets/images/product-img/electronics/electronics-bg-trans-03.webp" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="rbt-card rbt-product-card rbt-list-view-variation list-view-md">
                                                    <div className="inner">
                                                        <div className="rbt-card-body">
                                                            <div className="rbt-card-rating">
                                                                <ul className="rbt-rating-icon-list">
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                </ul>
                                                                <p className="rating-digit">(46)</p>
                                                            </div>
                                                            <h2 className="rbt-card-title"><a href="/shop">Bose QuietComfort Ultra
                                                                Earbuds</a></h2>
                                                            <div className="pricing-part">
                                                                <del className="price-text">₹4,999</del>
                                                                <span className="price-text">₹2,999</span>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                            <a href="/shop"><img alt="Card Image" src="/assets/images/product-img/electronics/electronics-bg-trans-01.webp" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div aria-labelledby="rbt-recom-prd-tab" className="tab-pane fade" id="rbt-recom-prd" role="tabpanel">
                                        <div className="rbt-single-prd-recom-prd-area">
                                            <div className="rbt-list-card-box rbt-list-card-box border-0 p-0">
                                                <div className="rbt-card rbt-product-card rbt-list-view-variation list-view-md">
                                                    <div className="inner">
                                                        <div className="rbt-card-body">
                                                            <div className="rbt-card-rating">
                                                                <ul className="rbt-rating-icon-list">
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                </ul>
                                                                <p className="rating-digit">(46)</p>
                                                            </div>
                                                            <h2 className="rbt-card-title"><a href="/shop">Bose QuietComfort Ultra
                                                                Earbuds</a></h2>
                                                            <div className="pricing-part">
                                                                <del className="price-text">₹4,999</del>
                                                                <span className="price-text">₹2,999</span>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                            <a href="/shop"><img alt="Card Image" src="/assets/images/product-img/electronics/electronics-bg-trans-01.webp" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="rbt-card rbt-product-card rbt-list-view-variation list-view-md">
                                                    <div className="inner">
                                                        <div className="rbt-card-body">
                                                            <div className="rbt-card-rating">
                                                                <ul className="rbt-rating-icon-list">
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                </ul>
                                                                <p className="rating-digit">(46)</p>
                                                            </div>
                                                            <h2 className="rbt-card-title"><a href="/shop">Breville Barista Pro
                                                                Espresso Machine</a></h2>
                                                            <div className="pricing-part">
                                                                <del className="price-text">₹4,999</del>
                                                                <span className="price-text">₹2,999</span>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                            <a href="/shop"><img alt="Card Image" src="/assets/images/product-img/electronics/electronics-bg-trans-02.webp" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="rbt-card rbt-product-card rbt-list-view-variation list-view-md">
                                                    <div className="inner">
                                                        <div className="rbt-card-body">
                                                            <div className="rbt-card-rating">
                                                                <ul className="rbt-rating-icon-list">
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                </ul>
                                                                <p className="rating-digit">(46)</p>
                                                            </div>
                                                            <h2 className="rbt-card-title"><a href="/shop">OnePlus Watch 2 AMOLED
                                                                Display</a></h2>
                                                            <div className="pricing-part">
                                                                <del className="price-text">₹4,999</del>
                                                                <span className="price-text">₹2,999</span>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                            <a href="/shop"><img alt="Card Image" src="/assets/images/product-img/electronics/electronics-bg-trans-03.webp" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="rbt-card rbt-product-card rbt-list-view-variation list-view-md">
                                                    <div className="inner">
                                                        <div className="rbt-card-body">
                                                            <div className="rbt-card-rating">
                                                                <ul className="rbt-rating-icon-list">
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                    <li><i className="fa-solid fa-star rbt-rated-icon"></i></li>
                                                                </ul>
                                                                <p className="rating-digit">(46)</p>
                                                            </div>
                                                            <h2 className="rbt-card-title"><a href="/shop">GoPro HERO12 Black
                                                                Action Camera</a></h2>
                                                            <div className="pricing-part">
                                                                <del className="price-text">₹4,999</del>
                                                                <span className="price-text">₹2,999</span>
                                                            </div>
                                                        </div>
                                                        <div className="rbt-card-img rbt-bg-color-default rbt-curved-style-box">
                                                            <a href="/shop"><img alt="Card Image" src="/assets/images/product-img/electronics/electronics-bg-trans-04.webp" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
