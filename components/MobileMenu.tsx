'use client'
import React from 'react';
import { useCategories } from '@/lib/hooks';

export default function MobileMenu() {
    const { categories } = useCategories();
    const [expandedParentId, setExpandedParentId] = React.useState<string | null>(null);

    const toggleParent = (parentId: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setExpandedParentId(prev => prev === parentId ? null : parentId);
    };

    // Filter parent categories (categories that are not children of any other category)
    const parentCategories = categories.filter(
        cat => !categories.some(parent => parent.category_children?.some(child => child.id === cat.id))
    );
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                .popup-mobile-menu .inner-wrapper .inner-top .logo a img {
                    max-width: 140px !important;
                    height: auto !important;
                    object-fit: contain !important;
                }
            ` }} />
            {/*  Mobile Menu Section  */}
            <div className="popup-mobile-menu">
                <div className="inner-wrapper">
                    <div className="mobile-menu-top">
                        <div className="inner-top">
                            <div className="content">
                                <div className="logo" style={{ width: 'auto', maxWidth: '180px', flexGrow: 1 }}>
                                    <a href="/" style={{ display: 'block', width: '100%' }}>
                                        <img src="/assets/images/logo/logo.webp" alt="Ocean Student Projects Logo" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }} />
                                    </a>
                                </div>
                                <div className="rbt-btn-close">
                                    <button className="close-button rbt-round-btn"><i className="fa-solid fa-xmark"></i></button>
                                </div>
                            </div>
                            <p className="description">Ocean Student Projects - India's trusted online store for electronics, components, and student projects.</p>
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
                                        Categories
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content" id="mobile-menuTabContent">
                                <div className="tab-pane fade show active" id="rbt-tab-pane-mobilemenu-1" role="tabpanel"
                                    aria-labelledby="rbt-tab-mobilemenu-1" tabIndex={0}>
                                    <nav className="rbt-mainmenu-nav">
                                        <ul className="mainmenu">
                                            <li><a href="/">Home</a></li>
                                            <li><a href="/shop">Shop</a></li>
                                            <li><a href="/about">About Us</a></li>
                                            <li><a href="/contact">Contact Us</a></li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="tab-pane fade" id="rbt-tab-pane-mobilemenu-2" role="tabpanel"
                                    aria-labelledby="rbt-tab-mobilemenu-2" tabIndex={0}>
                                    <nav className="rbt-mainmenu-nav">
                                        <ul className="mainmenu">
                                            {parentCategories && parentCategories.length > 0 ? (
                                                parentCategories.map((parent) => {
                                                    const hasChildren = parent.category_children && parent.category_children.length > 0;
                                                    const isExpanded = expandedParentId === parent.id;
                                                    return (
                                                        <li key={parent.id} style={{ display: 'block', borderBottom: '1px solid var(--color-gray-100)' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                                                <a href={`/shop?category=${parent.id}`} style={{ flexGrow: 1, paddingRight: '10px' }}>
                                                                    {parent.name}
                                                                </a>
                                                                {hasChildren && (
                                                                    <button 
                                                                        onClick={(e) => toggleParent(parent.id, e)}
                                                                        style={{
                                                                            background: 'none',
                                                                            border: 'none',
                                                                            padding: '12px 18px',
                                                                            color: 'var(--color-heading)',
                                                                            cursor: 'pointer',
                                                                            fontSize: '12px',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center'
                                                                        }}
                                                                        aria-label="Toggle Subcategories"
                                                                    >
                                                                        <i className={`fa-regular ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ fontSize: '14px', color: 'var(--color-body)' }}></i>
                                                                    </button>
                                                                )}
                                                            </div>
                                                            {hasChildren && isExpanded && (
                                                                <ul style={{ listStyle: 'none', paddingLeft: '16px', margin: '0 0 12px 0', borderLeft: '2px solid var(--color-primary)' }}>
                                                                    {parent.category_children.map((child) => (
                                                                        <li key={child.id} style={{ padding: '6px 0', borderBottom: 'none' }}>
                                                                            <a href={`/shop?category=${child.id}`} style={{ fontSize: '14px', opacity: 0.85, padding: '4px 0' }}>
                                                                                {child.name}
                                                                            </a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </li>
                                                    );
                                                })
                                            ) : (
                                                <li><a href="/shop">All Products</a></li>
                                            )}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
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
                    </div>
                </div>
            </div>
        </>
    );
}