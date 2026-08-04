"use client";

import React, { useState, useEffect, Suspense } from 'react';
import dynamic from "next/dynamic";
import { useSearchParams } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import ShopSidebar from '@/components/ShopSidebar';
import ProductGrid from '@/components/ProductGrid';
import ShopBannerAndCategories from '@/components/ShopBannerAndCategories';
import { useProducts, useCategories } from '@/lib/hooks';

import ShopHeader from '@/components/ShopHeader';
import Footer from '@/components/Footer';

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), { ssr: false });
const SideNavs = dynamic(() => import("@/components/SideNavs"), { ssr: false });
const Modals = dynamic(() => import("@/components/Modals"), { ssr: false });

const ShopContent = () => {
    const searchParams = useSearchParams();
    const initialQ = searchParams.get('q') || searchParams.get('query') || '';
    
    // States for sorting, filtering, searching and pagination
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState(initialQ);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(initialQ);
    const [sortOrder, setSortOrder] = useState('');
    const [offset, setOffset] = useState(0);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
    const limit = 12; // Standard 12 products per page

    const { categories } = useCategories();

    // Helper to recursively find all descendant category IDs (children and grandchildren)
    const getCategoryIdsWithDescendants = (selectedIds: string[], allCats: any[]): string[] => {
        const ids = new Set<string>();

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

        const collect = (catId: string) => {
            ids.add(catId);
            const foundCat = findCategoryInTree(catId, allCats);
            if (foundCat && foundCat.category_children) {
                for (const child of foundCat.category_children) {
                    collect(child.id);
                }
            }
        };

        for (const id of selectedIds) {
            collect(id);
        }

        return Array.from(ids);
    };

    const activeCategoryIds = getCategoryIdsWithDescendants(selectedCategories, categories);

    const { products, count, loading } = useProducts({
        q: debouncedSearchQuery,
        category_id: activeCategoryIds.length > 0 ? activeCategoryIds : undefined,
        limit,
        offset,
        order: sortOrder
    });

    // Debounce search query changes to prevent API spam and lag
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    // Reset page back to 1 (offset 0) whenever filters change
    useEffect(() => {
        setOffset(0);
    }, [debouncedSearchQuery, selectedCategories, sortOrder, priceRange]);

    useEffect(() => {
        const catId = searchParams.get('category_id') || searchParams.get('category');
        if (catId) {
            setSelectedCategories([catId]);
        } else {
            setSelectedCategories([]);
        }
        const q = searchParams.get('q') || searchParams.get('query') || '';
        setSearchQuery(q);
    }, [searchParams]);

    // Sync query parameter into browser history smoothly without page transitions
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (typeof window !== 'undefined') {
                const params = new URLSearchParams(window.location.search);
                const currentQ = params.get('q') || '';
                if (searchQuery.trim() !== currentQ.trim()) {
                    if (searchQuery.trim()) {
                        params.set('q', searchQuery.trim());
                    } else {
                        params.delete('q');
                    }
                    const newUrl = `${window.location.pathname}?${params.toString()}`;
                    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
                    // Also dispatch custom sync-search event to update header input if search bar loses focus
                    window.dispatchEvent(new CustomEvent('sync-search', { detail: searchQuery }));
                }
            }
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    // Synchronize search term from header events
    useEffect(() => {
        const handleSync = (e: Event) => {
            setSearchQuery((e as CustomEvent).detail || '');
        };
        window.addEventListener('sync-search-shop', handleSync);
        return () => {
            window.removeEventListener('sync-search-shop', handleSync);
        };
    }, []);

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSearchQuery('');
        setSortOrder('');
        setPriceRange({ min: 0, max: 50000 });
    };

    // Filter products by price range client-side
    const getProductMinMaxPrice = (product: any) => {
        const amounts = product.variants?.flatMap((v: any) =>
            v.prices?.map((p: any) => p.amount) || []
        ) || [];
        if (amounts.length === 0) return { min: 0, max: 0 };
        return { min: Math.min(...amounts) / 100, max: Math.max(...amounts) / 100 };
    };

    const displayedProducts = products.filter(p => {
        const { min, max } = getProductMinMaxPrice(p);
        return min >= priceRange.min && max <= priceRange.max;
    });

    const isPriceFilterActive = priceRange.min !== 0 || priceRange.max !== 50000;
    const activeCount = isPriceFilterActive ? displayedProducts.length : count;

    // Compute page numbers list with ellipsis to prevent overflow on large counts
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(activeCount / limit);
    const getVisiblePages = () => {
        const pages: (number | string)[] = [];
        const delta = 2; // Show 2 pages before and after current page
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                pages.push(i);
            } else if (
                pages[pages.length - 1] !== '...' &&
                (i < currentPage - delta || i > currentPage + delta)
            ) {
                pages.push('...');
            }
        }
        return pages;
    };
    const visiblePages = getVisiblePages();

    return (
        <>
            <ShopHeader />
            <MobileMenu />
            <SideNavs />
            <style dangerouslySetInnerHTML={{ __html: `
                .rbt-filter-offcanvas-area.side-menu {
                    width: 320px !important;
                    max-width: 85% !important;
                }
                .rbt-filter-offcanvas-area .rbt-sidebar,
                .rbt-filter-offcanvas-area .rbt-sidebar-widget-wrapper {
                    width: 100% !important;
                    max-width: 100% !important;
                }
            ` }} />
            <main className="rbt-main-wrapper">
                <Breadcrumb />

                <div className="rbt-separator-mid">
                    <div className="container">
                        <hr className="rbt-separator m-4" />
                    </div>
                </div>

                <div className="rbt-component-area rbt-shop-filter-area rbt-bg-color-white rbt-section-gapBottom">
                    <div className="container">
                        <div className="row row--16 mt_dec--24">
                            <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12 mt--24 d-none d-lg-block">
                                <ShopSidebar 
                                    selectedCategories={selectedCategories}
                                    onCategoryChange={handleCategoryChange}
                                    clearFilters={clearFilters}
                                    minPrice={priceRange.min}
                                    maxPrice={priceRange.max}
                                    onPriceChange={(min, max) => setPriceRange({ min, max })}
                                />
                            </div>
                            
                            {/* Mobile Offcanvas Filter Drawer */}
                            <div className="rbt-filter-offcanvas-area side-menu start-from-left" style={{ width: '320px', maxWidth: '85%' }}>
                                <div className="inner-wrapper" style={{ padding: '24px 16px' }}>
                                    <ShopSidebar 
                                        selectedCategories={selectedCategories}
                                        onCategoryChange={handleCategoryChange}
                                        clearFilters={clearFilters}
                                        minPrice={priceRange.min}
                                        maxPrice={priceRange.max}
                                        onPriceChange={(min, max) => setPriceRange({ min, max })}
                                        isMobile={true}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12 col-12 mt--24">
                                
                                {/* Search, Sorting & Filter Controls */}
                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb--30 pb--20" style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
                                    <div className="filter-search-box w-100" style={{ maxWidth: '400px', position: 'relative' }}>
                                        <input
                                            type="text"
                                            placeholder="Search products..."
                                            value={searchQuery}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setSearchQuery(val);
                                                window.dispatchEvent(new CustomEvent('sync-search', { detail: val }));
                                            }}
                                            style={{ 
                                                width: '100%', 
                                                padding: '10px 16px 10px 40px', 
                                                borderRadius: '6px', 
                                                border: '1px solid var(--color-gray-300)',
                                                fontSize: '14px',
                                                backgroundColor: '#fff'
                                            }}
                                        />
                                        <i className="fa-regular fa-magnifying-glass" style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--color-gray-400)' }}></i>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap gap-3">
                                        {/* Mobile Filter Toggle Button */}
                                        <div className="d-lg-none">
                                            <a href="#" className="rbt-filter-offcanvas-activation rbt-btn btn-border btn-sm d-flex align-items-center" style={{ height: '40px', gap: '6px', padding: '0 16px', borderRadius: '6px' }}>
                                                <i className="fa-sharp fa-regular fa-filter"></i>
                                                <span className="filter-text" style={{ fontSize: '13px', fontWeight: '600' }}>Filter</span>
                                            </a>
                                        </div>
                                        <div className="sort-by-select d-flex align-items-center" style={{ gap: '8px' }}>
                                            <span style={{ fontWeight: '500', fontSize: '14px', whiteSpace: 'nowrap' }}>Sort by:</span>
                                            <select
                                                value={sortOrder}
                                                onChange={(e) => setSortOrder(e.target.value)}
                                                style={{ 
                                                    padding: '8px 12px', 
                                                    borderRadius: '6px', 
                                                    border: '1px solid var(--color-gray-300)', 
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    backgroundColor: '#fff',
                                                    minWidth: '180px'
                                                }}
                                            >
                                                <option value="">Default (Relevance)</option>
                                                <option value="title">Title (A - Z)</option>
                                                <option value="-title">Title (Z - A)</option>
                                                <option value="created_at">Newest First</option>
                                                <option value="-created_at">Oldest First</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="rbt-shop-products-wrapper">
                                    <ProductGrid 
                                        products={displayedProducts} 
                                        loading={loading} 
                                        count={activeCount}
                                        offset={offset}
                                        limit={limit}
                                    />
                                    
                                    {/* Pagination Controls */}
                                    {!loading && activeCount > limit && (
                                        <div className="row mt--40">
                                            <div className="col-lg-12">
                                                <nav className="rbt-pagination justify-content-center d-flex align-items-center" style={{ gap: '8px' }}>
                                                    <button
                                                        disabled={offset === 0}
                                                        onClick={() => setOffset(Math.max(0, offset - limit))}
                                                        className="rbt-btn btn-border btn-sm"
                                                        style={{ 
                                                            minWidth: '40px', 
                                                            width: '40px',
                                                            height: '40px', 
                                                            display: 'flex', 
                                                            alignItems: 'center', 
                                                            justifyContent: 'center', 
                                                            borderRadius: '6px',
                                                            cursor: offset === 0 ? 'not-allowed' : 'pointer'
                                                        }}
                                                    >
                                                        <i className="fa-regular fa-chevron-left"></i>
                                                    </button>
                                                    
                                                        {visiblePages.map((pageNum, idx) => {
                                                            if (pageNum === '...') {
                                                                return (
                                                                    <span 
                                                                        key={`ellipsis-${idx}`} 
                                                                        style={{ 
                                                                            width: '30px', 
                                                                            textAlign: 'center', 
                                                                            color: 'var(--color-body)', 
                                                                            fontWeight: '600' 
                                                                        }}
                                                                    >
                                                                        ...
                                                                    </span>
                                                                );
                                                            }
                                                            const pageIndex = (pageNum as number) - 1;
                                                            const isActive = offset === pageIndex * limit;
                                                            return (
                                                                <button
                                                                    key={idx}
                                                                    onClick={() => setOffset(pageIndex * limit)}
                                                                    className={`rbt-btn btn-sm ${isActive ? 'btn-gradient' : 'btn-border'}`}
                                                                    style={{ 
                                                                        minWidth: '40px', 
                                                                        width: '40px', 
                                                                        height: '40px', 
                                                                        padding: 0, 
                                                                        display: 'flex', 
                                                                        alignItems: 'center', 
                                                                        justifyContent: 'center',
                                                                        borderRadius: '6px',
                                                                        backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                                                                        color: isActive ? '#fff' : 'var(--color-body)',
                                                                        cursor: 'pointer'
                                                                    }}
                                                                >
                                                                    {pageNum}
                                                                </button>
                                                            );
                                                        })}
                                                    
                                                     <button
                                                         disabled={offset + limit >= activeCount}
                                                         onClick={() => setOffset(offset + limit)}
                                                         className="rbt-btn btn-border btn-sm"
                                                         style={{ 
                                                             minWidth: '40px', 
                                                             width: '40px',
                                                             height: '40px', 
                                                             display: 'flex', 
                                                             alignItems: 'center', 
                                                             justifyContent: 'center', 
                                                             borderRadius: '6px',
                                                             cursor: offset + limit >= activeCount ? 'not-allowed' : 'pointer'
                                                         }}
                                                     >
                                                        <i className="fa-regular fa-chevron-right"></i>
                                                    </button>
                                                </nav>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Modals />
            <Footer />
        </>
    );
};

const ShopPage = () => {
    return (
        <Suspense fallback={
            <div className="rbt-preloader" style={{ position: 'relative', height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="rbt-preloader-inner">
                    <div className="preloader-text">
                        <p className="preloader-msg">Loading Shop...</p>
                    </div>
                </div>
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
};

export default ShopPage;
