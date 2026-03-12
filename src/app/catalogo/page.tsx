import { getProducts, getCategories } from "@/lib/products";
import ProductGrid from "@/components/catalog/ProductGrid";

export const revalidate = 60;

export default async function CatalogoPage() {
  const [products, categoriesData] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const categories = categoriesData.map((c) => c.name);

  return (
    <div className="min-h-screen bg-brand-dark grid-bg">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10 relative">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-1 h-10 bg-brand-red"
              style={{ boxShadow: "0 0 10px #E8181E" }}
            />
            <div>
              <h1
                className="text-4xl font-bold text-white uppercase tracking-wider"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                Catálogo
              </h1>
              <p className="text-white/30 text-sm uppercase tracking-[0.2em]">
                {products.length} productos disponibles
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-brand-red/40 to-transparent" />
        </div>

        {/* Grid con filtros */}
        <ProductGrid products={products} categories={categories} />

      </div>
    </div>
  );
}
