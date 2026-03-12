"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { ArrowLeft, ShoppingCart, Tag, CheckCircle } from "lucide-react";

export const revalidate = 60;

export default async function ProductoPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedOriginal = product.originalPrice
    ? new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
      }).format(product.originalPrice)
    : null;

  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Imagen */}
          <div className="relative aspect-square bg-brand-card rounded-2xl border border-white/10 overflow-hidden">
            {discount && (
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-brand-red text-white text-sm font-bold px-3 py-1.5 rounded-full">
                <Tag size={12} />
                -{discount}% OFF
              </div>
            )}
            <Image
              src={product.image || "/images/placeholder.png"}
              alt={product.name}
              fill
              className="object-contain p-8"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            {/* Categoría */}
            <div className="inline-flex items-center gap-2 bg-brand-card border border-white/10 text-white/60 text-sm px-3 py-1 rounded-full w-fit">
              {product.categoryIcon} {product.category}
            </div>

            {/* Nombre */}
            <h1 className="text-3xl font-bold text-white leading-tight">
              {product.name}
            </h1>

            {/* Descripción */}
            <p className="text-white/60 text-base leading-relaxed">
              {product.description}
            </p>

            {/* Precios */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-white">
                {formattedPrice}
              </span>
              {formattedOriginal && (
                <span className="text-white/40 text-xl line-through">
                  {formattedOriginal}
                </span>
              )}
            </div>

            {/* Especificaciones */}
            {product.specs && (
              <div className="bg-brand-card border border-white/10 rounded-xl p-5">
                <h3 className="text-white font-semibold mb-3 text-sm">
                  Especificaciones
                </h3>
                <div className="flex flex-col gap-2">
                  {product.specs.split(",").map((spec, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle
                        size={14}
                        className="text-brand-magenta mt-0.5 shrink-0"
                      />
                      <span className="text-white/70 text-sm">
                        {spec.trim()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disponibilidad */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-sm font-medium">
                Disponible
              </span>
            </div>

            {/* Botón WhatsApp */}
            <a
              href={getWhatsAppLink(product.name, product.price)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-105 text-lg"
            >
              <ShoppingCart size={22} />
              Pedir por WhatsApp
            </a>

            {/* Info extra */}
            <p className="text-white/30 text-xs text-center">
              Al hacer clic serás redirigido a WhatsApp con el mensaje pre-llenado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
