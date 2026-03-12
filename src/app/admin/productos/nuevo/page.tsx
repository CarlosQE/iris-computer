import { getCategories } from "@/lib/products";
import ProductForm from "@/components/admin/ProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NuevoProductoPage() {
  const categories = await getCategories();

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
          Nuevo <span className="text-brand-red">Producto</span>
        </h1>
      </div>

      <div className="h-px bg-gradient-to-r from-brand-red/40 to-transparent" />

      {/* Form */}
      <ProductForm categories={categories} mode="create" />
    </div>
  );
}
