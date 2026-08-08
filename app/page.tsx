import HomeLayout from "@/components/HomeLayout";
import MainContent from "@/components/MainContent";
import { getProducts, getCategories, getValidImageUrl } from "@/lib/medusa";

export default async function Home() {
  let initialProducts: any[] = [];
  let initialCategories: any[] = [];
  const initialCategoryImages: Record<string, string> = {};

  try {
    const [productsData, categoriesData] = await Promise.all([
      getProducts({ limit: 24 }),
      getCategories(),
    ]);
    initialProducts = productsData?.products || [];
    
    // Shuffle the products on the server side to maintain the current logic
    initialProducts = [...initialProducts];
    for (let i = initialProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [initialProducts[i], initialProducts[j]] = [initialProducts[j], initialProducts[i]];
    }

    initialCategories = categoriesData || [];

    // Pre-resolve category images on the server side to prevent layout shift & flicker
    const parentCats = initialCategories.filter(
      (cat: any) => !cat.parent_category_id && cat.name?.toLowerCase() !== 'uncategorized'
    );

    const getDescendantIds = (c: any): string[] => {
      const ids = [c.id];
      if (c.category_children) {
        c.category_children.forEach((child: any) => {
          ids.push(child.id);
          const fullChild = initialCategories.find((x: any) => x.id === child.id);
          if (fullChild && fullChild.category_children) {
            fullChild.category_children.forEach((gc: any) => {
              ids.push(gc.id);
            });
          }
        });
      }
      return ids;
    };

    // Try to resolve the image from preloaded products in memory first to avoid hitting Medusa API repeatedly.
    await Promise.all(
      parentCats.map(async (cat) => {
        const descendantIds = getDescendantIds(cat);

        // Find a matching product in the preloaded initialProducts array
        const match = initialProducts.find((prod: any) => 
          prod.categories?.some((pc: any) => descendantIds.includes(pc.id))
        );

        if (match) {
          const img = getValidImageUrl(match.thumbnail || match.images?.[0]?.url, '', match.handle);
          if (img) {
            initialCategoryImages[cat.id] = img;
            return; // Skip network fetch
          }
        }

        // Fallback: Query API if no product found in initialProducts
        try {
          const res = await getProducts({ category_id: descendantIds, limit: 1 });
          if (res.products && res.products.length > 0) {
            const prod = res.products[0];
            const img = getValidImageUrl(prod.thumbnail || prod.images?.[0]?.url, '', prod.handle);
            if (img) {
              initialCategoryImages[cat.id] = img;
            }
          }
        } catch (err) {
          console.warn(`Failed to resolve server-side image fallback for category ${cat.id}:`, err);
        }
      })
    );
  } catch (error) {
    console.error("Failed server-side prefetch:", error);
  }

  return (
    <HomeLayout>
      <main className="main-wrapper">
        <MainContent 
          initialProducts={initialProducts} 
          initialCategories={initialCategories}
          initialCategoryImages={initialCategoryImages}
        />
      </main>
    </HomeLayout>
  );
}
