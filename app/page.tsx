import HomeLayout from "@/components/HomeLayout";
import MainContent from "@/components/MainContent";
import { getProducts, getCategories, getValidImageUrl } from "@/lib/medusa";

export default async function Home() {
  console.time("[Server] Home Page Render");
  let initialProducts: any[] = [];
  let initialCategories: any[] = [];
  const initialCategoryImages: Record<string, string> = {};

  try {
    console.time("[Server] Main Data Prefetch (getProducts(24) & getCategories)");
    const [productsData, categoriesData] = await Promise.all([
      getProducts({ limit: 24 }),
      getCategories(),
    ]);
    console.timeEnd("[Server] Main Data Prefetch (getProducts(24) & getCategories)");
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

    console.time("[Server] Category Thumbnail Resolution");

    const missingCats: { cat: any; descendantIds: string[] }[] = [];
    const missingDescendantIds: string[] = [];

    parentCats.forEach((cat) => {
      const descendantIds = getDescendantIds(cat);

      // Try to resolve the image from preloaded products in memory first to avoid hitting Medusa API
      const match = initialProducts.find((prod: any) => 
        prod.categories?.some((pc: any) => descendantIds.includes(pc.id))
      );

      if (match) {
        const img = getValidImageUrl(match.thumbnail || match.images?.[0]?.url, '', match.handle);
        if (img) {
          initialCategoryImages[cat.id] = img;
          return;
        }
      }

      // Add to missing list for batch resolve
      missingCats.push({ cat, descendantIds });
      missingDescendantIds.push(...descendantIds);
    });

    if (missingCats.length > 0) {
      console.log(`[Server] Resolving ${missingCats.length} category thumbnails via cached batch query...`);
      try {
        console.time("[Server] Fallback Batch Query");
        const res = await getProducts(
          {
            category_id: missingDescendantIds,
            limit: 50,
            fields: 'id,thumbnail,handle,categories'
          },
          {
            next: { revalidate: 86400 } // Cache for 24 hours on the server
          }
        );
        console.timeEnd("[Server] Fallback Batch Query");

        const productsList = res.products || [];

        missingCats.forEach(({ cat, descendantIds }) => {
          // Find the first product that has at least one category in descendantIds
          const match = productsList.find((prod: any) =>
            prod.categories?.some((pc: any) => descendantIds.includes(pc.id))
          );
          if (match) {
            const img = getValidImageUrl(match.thumbnail || match.images?.[0]?.url, '', match.handle);
            if (img) {
              initialCategoryImages[cat.id] = img;
            }
          }
        });
      } catch (err) {
        console.warn("[Server] Failed to resolve batch category images fallback:", err);
      }
    }

    console.timeEnd("[Server] Category Thumbnail Resolution");
  } catch (error) {
    console.error("Failed server-side prefetch:", error);
  } finally {
    console.timeEnd("[Server] Home Page Render");
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
