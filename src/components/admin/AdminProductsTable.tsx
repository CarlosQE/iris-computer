"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, CheckCircle, XCircle, Star } from "lucide-react";
import { Product } from "@/types";
import { deleteProduct } from "@/lib/admin-products";

export default function AdminProductsTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteProduct(id);
      router.refresh();
    } catch (e) {
      console.error(e);
      alert("Error al eliminar el producto");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  }

  const formattedPrice = (price: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(price);

  if (products.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 text-white/20"
        style={{ border: "1px solid rgba(27, 42, 138, 0.3)" }}
      >
        <p
          className="text-xl font-bold uppercase tracking-widest mb-2"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          Sin productos
        </p>
        <p className="text-sm">Agrega tu primer producto al catálogo</p>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden"
      style={{ border: "1px solid rgba(27, 42, 138, 0.3)" }}
    >
      {/* Header tabla */}
      <div
        className="grid grid-cols-[60px_1fr_120px_120px_80px_80px_100px] gap-4 px-5 py-3 text-white/30 text-xs uppercase tracking-widest"
        style={{
          fontFamily: "Rajdhani, sans-serif",
          background: "#080C18",
          borderBottom: "1px solid rgba(27, 42, 138, 0.3)",
        }}
      >
        <span>Img</span>
        <span>Nombre</span>
        <span>Categoría</span>
        <span>Precio</span>
        <span>Estado</span>
        <span>Dest.</span>
        <span>Acciones</span>
      </div>

      {/* Filas */}
      {products.map((product) => (
        <div
          key={product.id}
          className="grid grid-cols-[60px_1fr_120px_120px_80px_80px_100px] gap-4 px-5 py-4 items-center transition-all"
          style={{
            borderBottom: "1px solid rgba(27, 42, 138, 0.2)",
            background: confirmId === product.id ? "rgba(232, 24, 30, 0.05)" : "transparent",
          }}
        >
          {/* Imagen */}
          <div className="relative w-12 h-12 overflow-hidden"
            style={{ background: "#0D1225", border: "1px solid rgba(27, 42, 138, 0.3)" }}
          >
            <Image
              src={product.image || "/images/placeholder.png"}
              alt={product.name}
              fill
              className="object-contain p-1"
            />
          </div>

          {/* Nombre */}
          <div>
            <p
              className="text-white font-semibold text-sm line-clamp-1"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              {product.name}
            </p>
            <p className="text-white/30 text-xs font-mono">{product.slug}</p>
          </div>

          {/* Categoría */}
          <span className="text-white/50 text-xs uppercase tracking-wider">
            {product.category}
          </span>

          {/* Precio */}
          <span
            className="font-bold text-sm"
            style={{ color: "#E8181E", fontFamily: "Rajdhani, sans-serif" }}
          >
            {formattedPrice(product.price)}
          </span>

          {/* Disponible */}
          <div className="flex justify-start">
            {product.available ? (
              <CheckCircle size={16} className="text-green-500" />
            ) : (
              <XCircle size={16} className="text-white/20" />
            )}
          </div>

          {/* Destacado */}
          <div className="flex justify-start">
            {product.featured ? (
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
            ) : (
              <Star size={16} className="text-white/15" />
            )}
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-2">
            {confirmId === product.id ? (
              <>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  className="px-2 py-1 text-xs font-bold uppercase text-white transition-all disabled:opacity-50"
                  style={{ background: "#E8181E", fontFamily: "Rajdhani, sans-serif" }}
                >
                  {deletingId === product.id ? "..." : "Sí"}
                </button>
                <button
                  onClick={() => setConfirmId(null)}
                  className="px-2 py-1 text-xs font-bold uppercase text-white/50 hover:text-white transition-colors"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  No
                </button>
              </>
            ) : (
              <>
                <Link
                  href={`/admin/productos/${product.id}/editar`}
                  className="p-2 text-white/30 hover:text-white transition-colors"
                  title="Editar"
                >
                  <Pencil size={14} />
                </Link>
                <button
                  onClick={() => setConfirmId(product.id)}
                  className="p-2 text-white/30 hover:text-brand-red transition-colors"
                  title="Eliminar"
                >
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
