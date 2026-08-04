import React from 'react';
import { MedusaProduct } from '@/lib/medusa';

interface ProductBreadcrumbProps {
  product: MedusaProduct;
}

const ProductBreadcrumb = ({ product }: ProductBreadcrumbProps) => {
  const categories = (product.categories || []) as any[];

  // Helper to build categories trail
  const getCrumbs = () => {
    const crumbs = [];
    if (categories.length > 0) {
      const parent = categories.find(c => !c.parent_category_id);
      if (parent) {
        crumbs.push(parent);
        const child = categories.find(c => c.parent_category_id === parent.id);
        if (child) {
          crumbs.push(child);
          const grandchild = categories.find(c => c.parent_category_id === child.id);
          if (grandchild) {
            crumbs.push(grandchild);
          }
        }
      } else {
        crumbs.push(categories[0]);
      }
    }
    return crumbs;
  };

  const crumbsTrail = getCrumbs();

  return (
    <div className="rbt-breadcrumb-two rbt-bg-color-white" style={{ borderBottom: '1px solid #f1f3f5', padding: '15px 0' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="rbt-breadcrumb-inner d-flex align-items-center justify-content-between">
              <ul className="rbt-breadcrumb-page-list justify-content-start mt--0" style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <li className="rbt-breadcrumb-item"><a href="/" style={{ fontSize: '13px', fontWeight: '500', color: '#6c757d' }}>Home</a></li>
                <li>
                  <div className="icon-right" style={{ fontSize: '10px', color: '#adb5bd' }}><i className="fa-solid fa-chevron-right"></i></div>
                </li>
                <li className="rbt-breadcrumb-item"><a href="/shop" style={{ fontSize: '13px', fontWeight: '500', color: '#6c757d' }}>Shop</a></li>
                
                {crumbsTrail.map((crumb) => (
                  <React.Fragment key={crumb.id}>
                    <li>
                      <div className="icon-right" style={{ fontSize: '10px', color: '#adb5bd' }}><i className="fa-solid fa-chevron-right"></i></div>
                    </li>
                    <li className="rbt-breadcrumb-item">
                      <a href={`/shop?category_id=${crumb.id}`} style={{ fontSize: '13px', fontWeight: '500', color: '#6c757d' }}>{crumb.name}</a>
                    </li>
                  </React.Fragment>
                ))}

                <li>
                  <div className="icon-right" style={{ fontSize: '10px', color: '#adb5bd' }}><i className="fa-solid fa-chevron-right"></i></div>
                </li>
                <li className="rbt-breadcrumb-item active" style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>{product.title}</li>
              </ul>
              
              {/* Product navigators removed as requested */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBreadcrumb;
