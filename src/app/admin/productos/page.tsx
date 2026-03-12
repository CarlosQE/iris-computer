import Link from "next/link";
import { getProducts } from "@/lib/products";
import AdminProductsTable from "@/components/admin/AdminProductsTable";
import { PlusCircle } from "lucide-react";

export const revalidate = 0;

export default async function AdminProductosPage() {
  const products = await getProducts();

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-bold text-white uppercase tracking-wider"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            Productos
          </h1>
          <p className="text-white/30 text-sm mt-1">
            {products.length} producto{products.length !== 1 ? "s" : ""} en el catálogo
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 px-5 py-3 text-white font-bold uppercase tracking-wider text-sm transition-all hover:scale-105"
          style={{
            background: "#E8181E",
            fontFamily: "Rajdhani, sans-serif",
            clipPath: "polygon(0 0, 100% 0, 100% 70%, 96% 100%, 0 100%)",
          }}
        >
          <PlusCircle size={16} />
          Agregar producto
        </Link>
      </div>

      {/* Línea separadora */}
      <div className="h-px bg-gradient-to-r from-brand-red/40 to-transparent" />

      {/* Tabla */}
      <AdminProductsTable products={products} />
    </div>
  );
}
