'use client'
import React from 'react';
import { useCategories } from '@/lib/hooks';

export default function ShopSidebar() {
    const { categories } = useCategories();
    return (
        <aside className="rbt-sidebar has-rbt-fshape d-none d-lg-block">
            <div className="rbt-sidebar-widget-wrapper rbt-sidebar-bg-one position-relative">
                <div className="rbt-sidebar-top">
                    <h2 className="rbt-sidebar-title h6"><i className="fa-sharp fa-regular fa-filter-list mr--4"></i>
                        Filter & Refine
                        <span className="rbt-fshape-right-portion">
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="40" viewBox="0 0 52 50" fill="none">
                                <path d="M51.5337 49.984C-64.8544 49.9977 116.427 49.9764 0.0390625 49.9901C0.0390625 31.262 0.0390625 20.7619 0.0390625 2.03378C11.2391 1.63419 16.5034 4.56468 19.5034 10.5602L30.0034 38.5311C34.0374 47.934 45.4209 49.4481 51.5337 49.984Z" fill="var(--color-white)" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.246 1.97519C16.582 3.50685 18.8114 5.90944 20.3979 9.07997L20.4213 9.12681L30.9315 37.1248C33.053 42.053 36.807 44.7979 40.7367 46.3047C44.6934 47.8219 48.798 48.068 51.4731 47.987C51.4731 47.987 51.51 49.2041 51.5337 49.984C48.7087 50.0695 44.3134 49.8162 40.02 48.17C35.7052 46.5155 31.4643 43.4388 29.0842 37.891L29.0751 37.8698C29.0751 37.8698 19.997 12.7279 18.5857 9.92689C17.1743 7.12591 15.2591 5.09828 12.4108 3.79055C8.49554 1.49902 0.0390625 2.03378 0.0390625 2.03378C0.0390625 20.7619 0.0390625 31.262 0.0390625 49.9901L0.0408325 0.0348727C5.70805 -0.16568 9.9493 0.461575 13.246 1.97519Z" fill="var(--color-gray-200)" />
                            </svg>
                        </span>
                    </h2>
                </div>
                <div className="rbt-sidebar-bottom">
                    <div className="rbt-single-widget rbt-widget-categories">
                        <div className="rbt-single-widget-inner">
                            <h2 className="rbt-widget-title rbt-widget-title-without-border h4">
                                <a data-bs-toggle="collapse" href="#sidebar-rbt-collapse-3" role="button" aria-expanded="true" aria-controls="sidebar-rbt-collapse-3">
                                    Categories
                                    <span className="icon"><i className="fa-regular fa-chevron-down"></i></span>
                                </a>
                            </h2>
                            <div className="collapse show" id="sidebar-rbt-collapse-3">
                                <ul className="rbt-sidebar-list-wrapper rbt-categories-list-check">
                                    {categories.map((cat) => (
                                        <li key={cat.id} className="rbt-check-group">
                                            <input id={`cat-${cat.id}`} type="checkbox" name={`cat-${cat.id}`} />
                                            <label htmlFor={`cat-${cat.id}`}>{cat.name} <span className="rbt-lable count">(0)</span></label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
