'use client'
import React from 'react';
import { useCategories } from '@/lib/hooks';
import { useAuth } from '@/lib/AuthContext';

export default function MobileMenu() {
    const { categories, counts = {} } = useCategories();
    const { customer } = useAuth();
    const [expandedParentId, setExpandedParentId] = React.useState<string | null>(null);

    const handleCloseMenu = () => {
        if (typeof document !== 'undefined') {
            const mobileMenu = document.querySelector('.popup-mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        }
    };

    const findCategoryInTree = (catId: string, categoriesList: any[]): any => {
        for (const cat of categoriesList) {
            if (cat.id === catId) return cat;
            if (cat.category_children && cat.category_children.length > 0) {
                const found = findCategoryInTree(catId, cat.category_children);
                if (found) return found;
            }
        }
        return null;
    };

    const toggleParent = (parentId: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setExpandedParentId(prev => prev === parentId ? null : parentId);
    };

    // Filter parent categories (categories that are not children of any other category), ignoring "Uncategorized"
    const parentCategories = categories.filter(
        cat => !cat.parent_category_id && cat.name?.toLowerCase() !== 'uncategorized'
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
                                <div className="logo" style={{ width: 'auto', maxWidth: '220px', flexGrow: 1 }}>
                                    <a href="/" onClick={handleCloseMenu} style={{ display: 'block', width: '100%' }}>
                                        <img
                                            src="/assets/images/logo/bitmap_cropped.png"
                                            alt="Ocean Student Projects Logo"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                maxHeight: '56px',
                                                objectFit: 'contain',
                                                display: 'block'
                                            }}
                                        />
                                    </a>
                                </div>
                                <div className="rbt-btn-close">
                                    <button onClick={handleCloseMenu} className="close-button rbt-round-btn"><i className="fa-solid fa-xmark"></i></button>
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
                                            <li><a href="/" onClick={handleCloseMenu}>Home</a></li>
                                            <li><a href="/shop" onClick={handleCloseMenu}>Educational Kits</a></li>
                                            <li><a href="/contact" onClick={handleCloseMenu}>Project Enquiry</a></li>
                                            <li><a href="https://wa.me/919042686793?text=Hi,%20I%20am%20interested%20in%20making%20a%20bulk%20purchase%20with%20Ocean%20Student%20Projects." target="_blank" rel="noopener noreferrer" onClick={handleCloseMenu}>Bulk purchase</a></li>
                                            <li><a href="/about" onClick={handleCloseMenu}>About Us</a></li>
                                            <li><a href="/contact" onClick={handleCloseMenu}>Contact Us</a></li>
                                            {customer ? (
                                                <li><a href="/profile" onClick={handleCloseMenu}>My Profile</a></li>
                                            ) : (
                                                <li><a href="/login" onClick={handleCloseMenu}>Login / Signup</a></li>
                                            )}
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
                                                                <a href={`/shop?category_id=${parent.id}`} onClick={handleCloseMenu} style={{ flexGrow: 1, paddingRight: '10px' }}>
                                                                    {parent.name} ({counts[parent.id] || 0})
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
                                                            {hasChildren && (
                                                                <div
                                                                    style={{
                                                                        display: 'grid',
                                                                        gridTemplateRows: isExpanded ? '1fr' : '0fr',
                                                                        transition: 'grid-template-rows 0.25s ease-in-out, opacity 0.25s ease-in-out',
                                                                        overflow: 'hidden',
                                                                        opacity: isExpanded ? 1 : 0
                                                                    }}
                                                                >
                                                                    <div style={{ minHeight: 0 }}>
                                                                        <ul style={{ listStyle: 'none', paddingLeft: '16px', margin: '0 0 12px 0', borderLeft: '2px solid var(--color-primary)' }}>
                                                                            {parent.category_children.map((child) => {
                                                                                const fullChild = findCategoryInTree(child.id, categories) || child;
                                                                                const hasGrandchildren = fullChild.category_children && fullChild.category_children.length > 0;
                                                                                return (
                                                                                    <li key={child.id} style={{ padding: '6px 0', borderBottom: 'none' }}>
                                                                                        <a href={`/shop?category_id=${child.id}`} onClick={handleCloseMenu} style={{ fontSize: '14px', opacity: 0.85, padding: '4px 0', display: 'block' }}>
                                                                                            {child.name} ({counts[child.id] || 0})
                                                                                        </a>
                                                                                        {hasGrandchildren && (
                                                                                            <ul style={{ listStyle: 'none', paddingLeft: '12px', margin: '4px 0 8px 0', borderLeft: '1px dashed var(--color-gray-300)' }}>
                                                                                                {fullChild.category_children.map((grandchild: any) => (
                                                                                                    <li key={grandchild.id} style={{ padding: '4px 0' }}>
                                                                                                        <a href={`/shop?category_id=${grandchild.id}`} onClick={handleCloseMenu} style={{ fontSize: '12px', opacity: 0.75, display: 'block' }}>
                                                                                                            {grandchild.name} ({counts[grandchild.id] || 0})
                                                                                                        </a>
                                                                                                    </li>
                                                                                                ))}
                                                                                            </ul>
                                                                                        )}
                                                                                    </li>
                                                                                );
                                                                            })}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </li>
                                                    );
                                                })
                                            ) : (
                                                <li><a href="/shop" onClick={handleCloseMenu}>All Products</a></li>
                                            )}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Bottom Contacts */}
                    <div 
                        className="mobile-menu-bottom-contact"
                        style={{
                            padding: '16px 24px 80px 24px', // Extra bottom padding prevents overlap with the mobile bottom toolbar
                            borderTop: '1px solid var(--color-gray-100)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            background: '#f8fafc'
                        }}
                    >
                        <a 
                            href="mailto:oceanstudentprojects@gmail.com"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '12px',
                                fontWeight: '700',
                                color: 'var(--color-heading)',
                                textTransform: 'uppercase',
                                textDecoration: 'none'
                            }}
                        >
                            <i className="fa-regular fa-envelope text-primary" style={{ fontSize: '14px', color: '#136c39' }}></i>
                            <span>Email</span>
                        </a>
                        <span style={{ color: 'var(--color-gray-300)', fontSize: '12px' }}>|</span>
                        <a 
                            href="https://wa.me/919042686793?text=Hi,%20I%20am%20interested%20in%20buying%20electronics%20components%20from%20Ocean%20Student%20Projects."
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '12px',
                                fontWeight: '700',
                                color: 'var(--color-heading)',
                                textTransform: 'uppercase',
                                textDecoration: 'none'
                            }}
                        >
                            <i className="fa-brands fa-whatsapp text-success" style={{ fontSize: '16px', color: '#25d366' }}></i>
                            <span>Whatsapp</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}