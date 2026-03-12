import { notFound } from "next/navigation";
import { getCategories } from "@/lib/products";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import ProductForm from "@/components/admin/ProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function EditarProductoPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createSupabaseServerClient();

  const [{ data: product }, categories] = await Promise.all([
    supabase.from("products").select("*, categories(id, name)").eq("id", params.id).single(),
    getCategories(),
  ]);

  if (!product) notFound();

  const initialData = {
    id: product.id,
    name: product.name,
    category_id: product.category_id,
    price: product.price,
    original_price: product.original_price,
    image_url: product.image_url,
    image: product.image_url,
    description: product.description,
    specs: product.specs,
    slug: product.slug,
    available: product.available,
    featured: product.featured,
  };

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <Link
          href="/admin/productos"
          className="inline-flex items-center gap-2 text-white/30 hover:text-white text-sm mb-4 transition-colors"
        >
          <ArrowLeft size={14} />
          Volver a productos
        </Link>
        <h1
          className="text-3xl font-bold text-white uppercase tracking-wider"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          Editar <span className="text-brand-red">Producto</span>
        </h1>
        <p className="text-white/30 text-sm mt-1">{product.name}</p>
      </div>

      <div className="h-px bg-gradient-to-r from-brand-red/40 to-transparent" />

      {/* Form */}
      <ProductForm
        categories={categories}
        initialData={initialData}
        mode="edit"
      />
    </div>
  );
}
