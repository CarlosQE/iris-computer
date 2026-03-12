"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { getWhatsAppLink } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col clip-corner-both"
      style={{
        background: "linear-gradient(135deg, #0D1225 0%, #080C18 100%)",
        border: "1px solid rgba(27, 42, 138, 0.4)",
      }}
    >
      {/* Corner accent top-left */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-red z-10" />
      {/* Corner accent bottom-right */}
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-red z-10" />

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "inset 0 0 30px rgba(232, 24, 30, 0.06)" }}
      />

      {/* Badge descuento */}
      {discount && (
        <div
          className="absolute top-3 left-3 z-20 text-white text-xs font-bold px-2.5 py-1"
          style={{
            background: "#E8181E",
            clipPath: "polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%)",
            fontFamily: "Rajdhani, sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          -{discount}%
        </div>
      )}

      {/* Badge categoría */}
      <div
        className="absolute top-3 right-3 z-20 text-white/50 text-xs px-2 py-0.5 border border-brand-navy/60"
        style={{ fontFamily: "Rajdhani, sans-serif", letterSpacing: "0.1em" }}
      >
        {product.category.toUpperCase()}
      </div>

      {/* Imagen */}
      <Link href={`/producto/${product.slug}`}>
        <div className="relative w-full h-48 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0A0F20 0%, #05070F 100%)" }}
        >
          {/* Línea decorativa */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
          <Image
            src={product.image || "/images/placeholder.png"}
            alt={product.name}
            fill
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <Link href={`/producto/${product.slug}`}>
          <h3
            className="text-white font-semibold text-base leading-snug group-hover:text-brand-red transition-colors line-clamp-2"
            style={{ fontFamily: "Rajdhani, sans-serif", letterSpacing: "0.02em" }}
          >
            {product.name}
          </h3>
        </Link>

        <p className="text-white/40 text-xs leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Precios */}
        <div className="mt-auto pt-2 border-t border-brand-navy/30">
          <div className="flex items-baseline gap-2">
            <span
              className="font-bold text-xl"
              style={{
                color: "#E8181E",
                textShadow: "0 0 20px rgba(232, 24, 30, 0.4)",
                fontFamily: "Rajdhani, sans-serif",
              }}
            >
              {formattedPrice}
            </span>
            {formattedOriginal && (
              <span className="text-white/25 text-sm line-through">
                {formattedOriginal}
              </span>
            )}
          </div>
        </div>

        {/* Botón WhatsApp */}
        <a
          href={getWhatsAppLink(product.name, product.price)}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center gap-2 text-white text-sm font-bold py-2.5 px-4 transition-all duration-200 overflow-hidden group/btn clip-corner-tl"
          style={{
            background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)",
            fontFamily: "Rajdhani, sans-serif",
            letterSpacing: "0.08em",
          }}
        >
          <span className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity"
            style={{ background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)" }}
          />
          <ShoppingCart size={14} className="relative z-10" />
          <span className="relative z-10 uppercase tracking-widest">Pedir por WhatsApp</span>
        </a>
      </div>
    </motion.div>
  );
}
