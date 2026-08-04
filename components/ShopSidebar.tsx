'use client'
import React from 'react';
import { useCategories } from '@/lib/hooks';

interface ShopSidebarProps {
    selectedCategories: string[]
    onCategoryChange: (categoryId: string) => void
    clearFilters: () => void
    minPrice: number
    maxPrice: number
    onPriceChange: (min: number, max: number) => void
    isMobile?: boolean
}

export default function ShopSidebar({ selectedCategories, onCategoryChange, clearFilters, minPrice, maxPrice, onPriceChange, isMobile }: ShopSidebarProps) {
    const { categories, counts = {} } = useCategories();

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

    // Local states for inputs before user clicks "FILTER"
    const [tempMin, setTempMin] = React.useState<number | "">(minPrice);
    const [tempMax, setTempMax] = React.useState<number | "">(maxPrice);

    const [expandedIds, setExpandedIds] = React.useState<Record<string, boolean>>({});

    const toggleExpand = (id: string) => {
        setExpandedIds(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Auto-expand parent/grandparent when a category is selected
    React.useEffect(() => {
        if (selectedCategories.length > 0 && categories.length > 0) {
            setExpandedIds(prev => {
                const next = { ...prev };
                selectedCategories.forEach(catId => {
                    categories.forEach(root => {
                        if (root.category_children) {
                            const isDirectChild = root.category_children.some((c: any) => c.id === catId);
                            if (isDirectChild) {
                                next[root.id] = true;
                            } else {
                                root.category_children.forEach((c: any) => {
                                    const fullC = findCategoryInTree(c.id, categories);
                                    if (fullC && fullC.category_children && fullC.category_children.some((g: any) => g.id === catId)) {
                                        next[root.id] = true;
                                        next[c.id] = true;
                                    }
                                });
                            }
                        }
                    });
                });
                return next;
            });
        }
    }, [selectedCategories, categories]);

    // Sync input states when clearFilters is triggered or props change
    React.useEffect(() => {
        setTempMin(minPrice);
        setTempMax(maxPrice);
    }, [minPrice, maxPrice]);

    // Filter parent categories (categories that are not children of any other category), ignoring "Uncategorized"
    const parentCategories = categories.filter(
        cat => !cat.parent_category_id && cat.name?.toLowerCase() !== 'uncategorized'
    );

    return (
        <aside className={`rbt-sidebar has-rbt-fshape ${isMobile ? '' : 'd-none d-lg-block'}`}>
            <div className="rbt-sidebar-widget-wrapper rbt-sidebar-bg-one position-relative" style={{ padding: isMobile ? '24px 20px' : undefined }}>
                {isMobile && (
                    <button 
                        className="close-button rbt-sidebar-close-btn"
                        style={{
                            position: 'absolute',
                            right: '16px',
                            top: '16px',
                            background: 'none',
                            border: 'none',
                            fontSize: '18px',
                            color: 'var(--color-heading)',
                            cursor: 'pointer',
                            zIndex: 10
                        }}
                    >
                        <i className="fa-sharp fa-solid fa-xmark"></i>
                    </button>
                )}
                <div className="rbt-sidebar-top d-flex justify-content-between align-items-center pr--20">
                    <h2 className="rbt-sidebar-title h6"><i className="fa-sharp fa-regular fa-filter-list mr--4"></i>
                        Filter & Refine
                    </h2>
                    {(selectedCategories.length > 0 || minPrice !== 0 || maxPrice !== 50000) && (
                        <button 
                            onClick={clearFilters} 
                            style={{ 
                                background: 'none', 
                                border: 'none', 
                                color: 'var(--color-primary)', 
                                fontSize: '13px', 
                                fontWeight: '600',
                                cursor: 'pointer',
                                padding: 0
                            }}
                        >
                            Clear All
                        </button>
                    )}
                </div>
                <div className="rbt-sidebar-bottom">
                    
                    {/* Price Range Filter Widget */}
                    <div className="rbt-single-widget rbt-widget-price" style={{ borderBottom: '1px solid var(--color-gray-200)', paddingBottom: '20px', marginBottom: '20px' }}>
                        <div className="rbt-single-widget-inner">
                            <h2 className="rbt-widget-title rbt-widget-title-without-border h4" style={{ fontSize: '15px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px' }}>
                                Filter by Price
                            </h2>
                            <div className="price-filter-wrapper">
                                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: '12px', color: 'var(--color-body)', display: 'block', marginBottom: '4px' }}>Min Price (₹)</label>
                                        <input 
                                            type="number" 
                                            value={tempMin} 
                                            onChange={(e) => setTempMin(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))}
                                            onFocus={() => {
                                                if (tempMin === 0) setTempMin("");
                                            }}
                                            onBlur={() => {
                                                if (tempMin === "") setTempMin(0);
                                            }}
                                            placeholder="0"
                                            style={{ 
                                                width: '100%', 
                                                padding: '8px 12px', 
                                                borderRadius: '6px', 
                                                border: '1px solid var(--color-gray-300)', 
                                                fontSize: '13px',
                                                backgroundColor: '#fff'
                                            }} 
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: '12px', color: 'var(--color-body)', display: 'block', marginBottom: '4px' }}>Max Price (₹)</label>
                                        <input 
                                            type="number" 
                                            value={tempMax} 
                                            onChange={(e) => setTempMax(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))}
                                            onFocus={() => {
                                                if (tempMax === 50000) setTempMax("");
                                            }}
                                            onBlur={() => {
                                                if (tempMax === "") setTempMax(50000);
                                            }}
                                            placeholder="50000"
                                            style={{ 
                                                width: '100%', 
                                                padding: '8px 12px', 
                                                borderRadius: '6px', 
                                                border: '1px solid var(--color-gray-300)', 
                                                fontSize: '13px',
                                                backgroundColor: '#fff'
                                            }} 
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                                    <button 
                                        onClick={() => onPriceChange(tempMin === "" ? 0 : tempMin, tempMax === "" ? 50000 : tempMax)}
                                        className="rbt-btn btn-xs btn-gradient"
                                        style={{ 
                                            padding: '8px 16px', 
                                            fontSize: '12px', 
                                            height: 'auto', 
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontWeight: '600'
                                        }}
                                    >
                                        FILTER
                                    </button>
                                    <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-heading)' }}>
                                        Price: ₹{minPrice} — ₹{maxPrice}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rbt-single-widget rbt-widget-categories">
                        <div className="rbt-single-widget-inner">
                            <h2 className="rbt-widget-title rbt-widget-title-without-border h4">
                                <a data-bs-toggle="collapse" href="#sidebar-rbt-collapse-3" role="button" aria-expanded="true" aria-controls="sidebar-rbt-collapse-3">
                                    Categories Hierarchy
                                    <span className="icon"><i className="fa-regular fa-chevron-down"></i></span>
                                </a>
                            </h2>
                            <div className="collapse show" id="sidebar-rbt-collapse-3">
                                <ul className="rbt-sidebar-list-wrapper rbt-categories-list-check" style={{ listStyle: 'none', padding: 0 }}>
                                    {parentCategories.map((parent) => {
                                        const isParentExpanded = expandedIds[parent.id] ?? false;
                                        return (
                                            <React.Fragment key={parent.id}>
                                                <li style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                                    <div className="rbt-check-group" style={{ display: 'flex', alignItems: 'center' }}>
                                                        <input 
                                                            id={`cat-${parent.id}`} 
                                                            type="checkbox" 
                                                            checked={selectedCategories.includes(parent.id)}
                                                            onChange={() => onCategoryChange(parent.id)}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                        <label 
                                                            htmlFor={`cat-${parent.id}`} 
                                                            style={{ 
                                                                fontWeight: '600', 
                                                                cursor: 'pointer', 
                                                                color: 'var(--color-heading)',
                                                                fontSize: '15px'
                                                            }}
                                                        >
                                                            {parent.name} ({counts[parent.id] || 0})
                                                        </label>
                                                    </div>
                                                    {parent.category_children && parent.category_children.length > 0 && (
                                                        <button
                                                            onClick={() => toggleExpand(parent.id)}
                                                            style={{
                                                                background: 'none',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                padding: '4px 8px',
                                                                color: 'var(--color-body)',
                                                                fontSize: '12px'
                                                            }}
                                                        >
                                                            <i className={`fa-regular ${isParentExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                                        </button>
                                                    )}
                                                </li>
                                                
                                                {/* Subcategories (Children) */}
                                                {parent.category_children && parent.category_children.length > 0 && (
                                                    <div 
                                                        style={{
                                                            display: 'grid',
                                                            gridTemplateRows: isParentExpanded ? '1fr' : '0fr',
                                                            transition: 'grid-template-rows 0.25s ease-in-out, opacity 0.25s ease-in-out',
                                                            overflow: 'hidden',
                                                            opacity: isParentExpanded ? 1 : 0
                                                        }}
                                                    >
                                                        <div style={{ minHeight: 0 }}>
                                                            <ul className="sub-categories-list" style={{ listStyle: 'none', paddingLeft: '24px', marginBottom: '12px' }}>
                                                                {parent.category_children.map((child) => {
                                                                    const fullChild = findCategoryInTree(child.id, categories) || child;
                                                                    const hasGrandchildren = fullChild.category_children && fullChild.category_children.length > 0;
                                                                    const isChildExpanded = expandedIds[child.id] ?? false;
                                                                    return (
                                                                        <li key={child.id} style={{ marginBottom: '6px' }}>
                                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                                                                <div className="rbt-check-group" style={{ display: 'flex', alignItems: 'center' }}>
                                                                                    <input 
                                                                                        id={`cat-${child.id}`} 
                                                                                        type="checkbox" 
                                                                                        checked={selectedCategories.includes(child.id)}
                                                                                        onChange={() => onCategoryChange(child.id)}
                                                                                        style={{ cursor: 'pointer' }}
                                                                                    />
                                                                                    <label 
                                                                                        htmlFor={`cat-${child.id}`} 
                                                                                        style={{ 
                                                                                            fontSize: '14px', 
                                                                                            color: 'var(--color-body)',
                                                                                            cursor: 'pointer'
                                                                                        }}
                                                                                    >
                                                                                        {child.name} ({counts[child.id] || 0})
                                                                                    </label>
                                                                                </div>
                                                                                {hasGrandchildren && (
                                                                                    <button
                                                                                        onClick={() => toggleExpand(child.id)}
                                                                                        style={{
                                                                                            background: 'none',
                                                                                            border: 'none',
                                                                                            cursor: 'pointer',
                                                                                            padding: '2px 8px',
                                                                                            color: 'var(--color-body)',
                                                                                            fontSize: '11px'
                                                                                        }}
                                                                                    >
                                                                                        <i className={`fa-regular ${isChildExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                                                                    </button>
                                                                                )}
                                                                            </div>

                                                                            {/* Grandchildren (Depth 2) */}
                                                                            {hasGrandchildren && (
                                                                                <div 
                                                                                    style={{
                                                                                        display: 'grid',
                                                                                        gridTemplateRows: isChildExpanded ? '1fr' : '0fr',
                                                                                        transition: 'grid-template-rows 0.25s ease-in-out, opacity 0.25s ease-in-out',
                                                                                        overflow: 'hidden',
                                                                                        opacity: isChildExpanded ? 1 : 0
                                                                                    }}
                                                                                >
                                                                                    <div style={{ minHeight: 0 }}>
                                                                                        <ul className="grandchild-categories-list" style={{ listStyle: 'none', paddingLeft: '20px', marginBottom: '8px', marginTop: '4px' }}>
                                                                                            {fullChild.category_children.map((grandchild: any) => (
                                                                                                <li key={grandchild.id} className="rbt-check-group" style={{ marginBottom: '4px', display: 'flex', alignItems: 'center' }}>
                                                                                                    <input 
                                                                                                        id={`cat-${grandchild.id}`} 
                                                                                                        type="checkbox" 
                                                                                                        checked={selectedCategories.includes(grandchild.id)}
                                                                                                        onChange={() => onCategoryChange(grandchild.id)}
                                                                                                        style={{ cursor: 'pointer' }}
                                                                                                    />
                                                                                                    <label 
                                                                                                        htmlFor={`cat-${grandchild.id}`} 
                                                                                                        style={{ 
                                                                                                            fontSize: '13px', 
                                                                                                            color: 'var(--color-body)',
                                                                                                            opacity: 0.85,
                                                                                                            cursor: 'pointer'
                                                                                                        }}
                                                                                                    >
                                                                                                        {grandchild.name} ({counts[grandchild.id] || 0})
                                                                                                    </label>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
