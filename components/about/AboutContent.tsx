import React from 'react';

export default function AboutContent() {
  return (
    <>
      <div className="rbt-component-area rbt-section-gap2Top rbt-about-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="rbt-fshape-box-outline-style">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="rbt-component-section-title rbt-about-banner-fshape-title rbt-bg-color-white">
                      <h3 className="rbt-title rbt-text-color-primary h4"><span className="rbt-bold--text">About Us</span></h3>
                    </div>
                  </div>
                </div>
                <div className="rbt-fshape-box rbt-bg-color-white rbt-about-banner-fshape">
                  <div className="rbt-about-banner-content-wrapper">
                    <div className="row row--24">
                      <div className="col-12 col-md-6">
                        <div className="rbt-about-banner-content">
                          <h3 className="rbt-title rbt-text-bold mb--16">Your trusted source for electronics components and student projects.</h3>
                          <p className="rbt-about-banner-text">
                            Ocean Student Projects is India's trusted online store for electronics components, modules, microcontrollers, sensors, and project kits. We provide high-quality parts for students, hobbyists, and makers at affordable prices.
                          </p>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="rbt-curved-style-box rbt-about-banner-card">
                          <div className="inner">
                            <div className="swiper rbt-about-banner-slide-acivation">
                              <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                  <div className="rbt-about-banner-img">
                                    <img alt="About us image" src="/assets/images/about/about-image-1.webp" />
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
          </div>
        </div>
      </div>

      <div className="rbt-component-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="rbt-about-qoute-wrapper">
                <div className="rbt-about-qoute">
                  <div className="inner">
                    <h3 className="rbt-title b1 rbt-text-bold mb--12">Our Mission</h3>
                    <p className="b2 rbt-text-color-gray-500">To provide students and makers with reliable, affordable electronics components and project kits for their learning and innovation.</p>
                  </div>
                </div>
                <div className="rbt-about-qoute">
                  <div className="inner">
                    <h3 className="rbt-title b1 rbt-text-bold mb--12">Our Vision</h3>
                    <p className="b2 rbt-text-color-gray-500">To be India's most trusted platform for electronics education and prototyping, empowering the next generation of innovators.</p>
                  </div>
                </div>
                <div className="rbt-about-qoute">
                  <div className="inner">
                    <h3 className="rbt-title b1 rbt-text-bold mb--12">Our Values</h3>
                    <p className="b2 rbt-text-color-gray-500">Quality, affordability, and customer trust are at the heart of everything we do. We believe in supporting education through accessible technology.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rbt-component-area rbt-about-area rbt-section-gap2Top rbt-section-gap2Bottom">
        <div className="container">
          <div className="row row--12 align-items-center">
            <div className="col-lg-6">
              <div className="rbt-thumbnail-wrapper">
                <div className="rbt-thumbnail thumb-image-1 rbt-curved-style-box">
                  <img alt="About thumbnail image" src="/assets/images/about/about-image-2.webp" />
                </div>
                <div className="rbt-thumbnail thumb-image-2 rbt-curved-style-box">
                  <img alt="About thumbnail image" src="/assets/images/about/about-image-3.webp" />
                </div>
                <div className="rbt-thumbnail thumb-image-3 rbt-curved-style-box">
                  <img alt="About thumbnail image" src="/assets/images/about/about-image-4.webp" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="rbt-about-feature-area">
                <div className="inner">
                  <div className="rbt-section-title text-start">
                    <h3 className="rbt-title mb--16">We make electronics accessible for everyone.</h3>
                    <p className="rbt-description">From Arduino boards to Raspberry Pi, sensors to displays — we stock everything you need to bring your projects to life.</p>
                  </div>
                  <div className="rbt-about-feature-wrapper mt--32">
                    <div className="rbt-about-feature feature-style-1">
                      <span className="icon"><i className="fa-regular fa-cart-shopping-fast"></i></span>
                      <div className="rbt-feature-content">
                        <h4 className="rbt-feature-title h6">Easy Ordering</h4>
                        <p className="rbt-feature-description">Simple online ordering with fast shipping across India.</p>
                      </div>
                    </div>
                    <div className="rbt-about-feature feature-style-1">
                      <span className="icon"><i className="fa-regular fa-truck-bolt"></i></span>
                      <div className="rbt-feature-content">
                        <h4 className="rbt-feature-title h6">Reliable Delivery</h4>
                        <p className="rbt-feature-description">Secure packaging and timely delivery to your doorstep.</p>
                      </div>
                    </div>
                    <div className="rbt-about-feature feature-style-1">
                      <span className="icon"><i className="fa-regular fa-bags-shopping"></i></span>
                      <div className="rbt-feature-content">
                        <h4 className="rbt-feature-title h6">Wide Selection</h4>
                        <p className="rbt-feature-description">Thousands of components from the brands you trust.</p>
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
