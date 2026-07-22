import React from 'react';

export default function CategoriesSection() {
    return (
        <>
            {/*  Start Component Area  */}
            <div className="w-full bg-white py-16 lg:py-24">
                <div className="container mx-auto px-4">

                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900"><span
                                    className="font-extrabold">Categories</span> Your May Interested</h2>
                            </div>
                        </div>
                    </div>

                    {/*  Start Card Area  */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
                        <div className="w-full">
                            <div
                                className="relative bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 text-center flex flex-col h-full group">
                                <div className="p-6 flex-grow flex flex-col justify-center items-center">
                                    <div className="mb-6 rbt-image-portion rbt-scroll-trigger zoom_in animation-order-1">
                                        <a href="shop-by-category.html">
                                            <img src="/assets/images/catagory-img/cat-bg-electro-c-01.webp"
                                                alt="Catagory Product Images" />
                                        </a>
                                    </div>
                                    <a href="shop-by-category.html" className="mt-auto inline-block bg-white text-gray-900 font-bold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors duration-300">Sports Caps</a>
                                </div>

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                        <a href="shop-by-category.html" className="rbt-card-link-btn"><i
                                            className="fa-solid fa-arrow-up-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div
                                className="relative bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 text-center flex flex-col h-full group">
                                <div className="p-6 flex-grow flex flex-col justify-center items-center">
                                    <div className="mb-6 rbt-image-portion rbt-scroll-trigger zoom_in animation-order-2">
                                        <a href="shop-by-category.html">
                                            <img src="/assets/images/catagory-img/cat-bg-electro-c-02.webp"
                                                alt="Catagory Product Images" />
                                        </a>
                                    </div>
                                    <a href="shop-by-category.html" className="mt-auto inline-block bg-white text-gray-900 font-bold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors duration-300">Leather Bags</a>
                                </div>

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                        <a href="shop-by-category.html" className="rbt-card-link-btn"><i
                                            className="fa-solid fa-arrow-up-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div
                                className="relative bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 text-center flex flex-col h-full group">
                                <div className="p-6 flex-grow flex flex-col justify-center items-center">
                                    <div className="mb-6 rbt-image-portion rbt-scroll-trigger zoom_in animation-order-3">
                                        <a href="shop-by-category.html">
                                            <img src="/assets/images/catagory-img/cat-bg-electro-c-03.webp"
                                                alt="Catagory Product Images" />
                                        </a>
                                    </div>
                                    <a href="shop-by-category.html" className="mt-auto inline-block bg-white text-gray-900 font-bold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors duration-300">Shoes</a>
                                </div>

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                        <a href="shop-by-category.html" className="rbt-card-link-btn"><i
                                            className="fa-solid fa-arrow-up-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full col-span-2 md:col-span-2 lg:col-span-2">
                            <div
                                className="relative bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex h-full group">
                                <div className="p-6 flex-grow flex flex-col justify-center items-center">
                                    <div className="mb-6 rbt-image-portion rbt-scroll-trigger zoom_in animation-order-4">
                                        <a href="shop-by-category.html">
                                            <img src="/assets/images/catagory-img/cat-bg-electro-c-lg-01.webp"
                                                alt="Catagory Product Images" />
                                        </a>
                                    </div>
                                    <div className="absolute inset-y-0 right-0 w-1/2 p-8 flex flex-col justify-center text-left z-10">
                                        <div className="mb-4">
                                            <span className="inline-block bg-green-500 text-white text-xs font-bold py-1 px-2 rounded uppercase mb-2">EXCLUSIVE</span>
                                            <p className="text-gray-500 text-sm font-semibold mb-2 uppercase">NEW ARRIVALS</p>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight"><span className="font-extrabold">Stylish</span> & Trending</h2>
                                        </div>
                                        <div className="bottom-content">
                                            <a href="shop-by-category.html" className="mt-auto inline-block bg-white text-gray-900 font-bold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors duration-300">See
                                                Collection</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                        <a href="shop-by-category.html" className="rbt-card-link-btn"><i
                                            className="fa-solid fa-arrow-up-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div
                                className="relative bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 text-center flex flex-col h-full group">
                                <div className="p-6 flex-grow flex flex-col justify-center items-center">
                                    <div className="mb-6 rbt-image-portion rbt-scroll-trigger zoom_in animation-order-5">
                                        <a href="shop-by-category.html">
                                            <img src="/assets/images/catagory-img/cat-bg-electro-c-04.webp"
                                                alt="Catagory Product Images" />
                                        </a>
                                    </div>
                                    <a href="shop-by-category.html" className="mt-auto inline-block bg-white text-gray-900 font-bold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors duration-300">Watches</a>
                                </div>

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                        <a href="shop-by-category.html" className="rbt-card-link-btn"><i
                                            className="fa-solid fa-arrow-up-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full col-span-2 md:col-span-2 lg:col-span-2">
                            <div
                                className="relative bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex h-full group">
                                <div className="p-6 flex-grow flex flex-col justify-center items-center">
                                    <div className="mb-6 rbt-image-portion rbt-scroll-trigger zoom_in animation-order-6">
                                        <a href="shop-by-category.html">
                                            <img src="/assets/images/catagory-img/cat-bg-electro-c-lg-02.webp"
                                                alt="Catagory Product Images" />
                                        </a>
                                    </div>
                                    <div className="absolute inset-y-0 right-0 w-1/2 p-8 flex flex-col justify-center text-left z-10">
                                        <div className="mb-4">
                                            <span className="inline-block bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded uppercase mb-2">Trending</span>
                                            <p className="text-gray-500 text-sm font-semibold mb-2 uppercase">ONLINE EXCLUSIVE</p>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight"><span className="font-extrabold">Made for</span> Comfort</h2>
                                        </div>
                                        <div className="bottom-content">
                                            <a href="shop-by-category.html"
                                                className="rbt-btn rbt-marquee-btn marquee-auto rbt-btn-white rbt-btn-md">
                                                <span data-text="View All The Trending Collection">
                                                    View All The Trending Collection
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                        <a href="shop-by-category.html" className="rbt-card-link-btn"><i
                                            className="fa-solid fa-arrow-up-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div
                                className="relative bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 text-center flex flex-col h-full group">
                                <div className="p-6 flex-grow flex flex-col justify-center items-center">
                                    <div className="mb-6 rbt-image-portion rbt-scroll-trigger zoom_in animation-order-7">
                                        <a href="shop-by-category.html">
                                            <img src="/assets/images/catagory-img/cat-bg-electro-c-05.webp"
                                                alt="Catagory Product Images" />
                                        </a>
                                    </div>
                                    <a href="shop-by-category.html" className="mt-auto inline-block bg-white text-gray-900 font-bold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors duration-300">Sports Caps</a>
                                </div>

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                        <a href="shop-by-category.html" className="rbt-card-link-btn"><i
                                            className="fa-solid fa-arrow-up-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div
                                className="relative bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 text-center flex flex-col h-full group">
                                <div className="p-6 flex-grow flex flex-col justify-center items-center">
                                    <div className="mb-6 rbt-image-portion rbt-scroll-trigger zoom_in animation-order-8">
                                        <a href="shop-by-category.html">
                                            <img src="/assets/images/catagory-img/cat-bg-electro-c-06.webp"
                                                alt="Catagory Product Images" />
                                        </a>
                                    </div>
                                    <a href="shop-by-category.html" className="mt-auto inline-block bg-white text-gray-900 font-bold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors duration-300">Stylish Polo</a>
                                </div>

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                        <a href="shop-by-category.html" className="rbt-card-link-btn"><i
                                            className="fa-solid fa-arrow-up-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  End Card Area  */}
                </div>
            </div>
            {/*  End Component Area  */}
        </>
    );
}
