import Link from "next/link";
import { getFeaturedProducts, getCategories } from "@/lib/products";
import ProductCard from "@/components/catalog/ProductCard";
import { ArrowRight, Zap, Shield, Headphones } from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, categoriesData] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-brand-dark">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center grid-bg overflow-hidden">

        {/* Glow orbs de fondo */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #1B2A8A 0%, transparent 70%)" }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #E8181E 0%, transparent 70%)" }}
        />

        {/* Línea vertical decorativa izquierda */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-red/40 to-transparent hidden lg:block" />

        <div className="relative max-w-7xl mx-auto px-6 py-32 w-full">
          <div className="max-w-4xl">

            {/* Tag superior */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-brand-red" />
              <span
                className="text-brand-red text-xs font-bold tracking-[0.3em] uppercase"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                Iris Computer — Technology Store
              </span>
            </div>

            {/* Título principal */}
            <h1
              className="text-6xl md:text-8xl font-bold leading-none mb-6"
              style={{ fontFamily: "Rajdhani, sans-serif", letterSpacing: "-0.02em" }}
            >
              <span className="block text-white">TU TIENDA</span>
              <span className="block"
                style={{
                  color: "#E8181E",
                  textShadow: "0 0 40px rgba(232, 24, 30, 0.5), 0 0 80px rgba(232, 24, 30, 0.2)",
                }}
              >
                DE TECH
              </span>
              <span className="block text-white/20 text-5xl md:text-6xl">DE CONFIANZA</span>
            </h1>

            {/* Descripción */}
            <p className="text-white/50 text-lg max-w-xl mb-10 leading-relaxed">
              Laptops, PCs de alto rendimiento, periféricos gaming y accesorios.
              Contacta directo por WhatsApp y recibe asesoría personalizada.
            </p>

            {/* CTAs */}
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/catalogo"
                className="group relative flex items-center gap-3 px-8 py-4 text-white font-bold uppercase tracking-widest overflow-hidden transition-all"
                style={{
                  background: "#E8181E",
                  clipPath: "polygon(0 0, 100% 0, 100% 70%, 96% 100%, 0 100%)",
                  fontFamily: "Rajdhani, sans-serif",
                }}
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #FF2D34 0%, #E8181E 100%)" }}
                />
                <Zap size={16} className="relative z-10" />
                <span className="relative z-10">Ver Catálogo</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 text-white font-bold uppercase tracking-widest border border-brand-navy/60 hover:border-brand-red/60 transition-all"
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)",
                }}
              >
                Contactar ahora
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-12 mt-16 pt-8 border-t border-white/5">
              {[
                { val: "100%", label: "Productos originales" },
                { val: "24/7", label: "Soporte WhatsApp" },
                { val: "Fast", label: "Respuesta inmediata" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <div
                    className="text-2xl font-bold"
                    style={{
                      color: "#E8181E",
                      fontFamily: "Rajdhani, sans-serif",
                      textShadow: "0 0 20px rgba(232, 24, 30, 0.4)",
                    }}
                  >
                    {val}
                  </div>
                  <div className="text-white/30 text-xs mt-1 uppercase tracking-wider">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Línea bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Zap, title: "Respuesta Rápida", desc: "Atención personalizada por WhatsApp en minutos, sin bots." },
            { icon: Shield, title: "Garantía Total", desc: "Todos nuestros productos son originales con garantía del fabricante." },
            { icon: Headphones, title: "Soporte Técnico", desc: "Te asesoramos antes y después de tu compra." },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="relative p-6 clip-corner-tl group hover:border-brand-red/40 transition-all"
              style={{
                background: "linear-gradient(135deg, #0D1225 0%, #080C18 100%)",
                border: "1px solid rgba(27, 42, 138, 0.3)",
              }}
            >
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-red" />
              <div
                className="w-10 h-10 flex items-center justify-center mb-4"
                style={{ background: "rgba(232, 24, 30, 0.1)", border: "1px solid rgba(232, 24, 30, 0.2)" }}
              >
                <Icon size={18} className="text-brand-red" />
              </div>
              <h3
                className="text-white font-bold mb-2 uppercase tracking-wider"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                {title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORÍAS ───────────────────────────────────────────────── */}
      {categoriesData.length > 0 && (
        <>
          <div className="max-w-7xl mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-brand-navy/40 to-transparent" />
          </div>
          <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-6 h-px bg-brand-red" />
            <h2
              className="text-white font-bold uppercase tracking-widest text-sm"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              Categorías
            </h2>
          </div>
          <div className="flex gap-3 flex-wrap">
            {categoriesData.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalogo?categoria=${cat.name}`}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white/50 hover:text-white transition-all"
                style={{
                  border: "1px solid rgba(27, 42, 138, 0.4)",
                  fontFamily: "Rajdhani, sans-serif",
                  clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)",
                }}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>
        </>
      )}

      {/* ── PRODUCTOS DESTACADOS ─────────────────────────────────────── */}
      {featured.length > 0 && (
        <>
          <div className="max-w-7xl mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-brand-navy/40 to-transparent" />
          </div>
          <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-brand-red" style={{ boxShadow: "0 0 10px #E8181E" }} />
              <h2
                className="text-2xl font-bold text-white uppercase tracking-wider"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                Productos Destacados
              </h2>
            </div>
            <Link
              href="/catalogo"
              className="flex items-center gap-2 text-brand-red hover:text-white text-sm font-bold uppercase tracking-wider transition-colors"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          </section>
        </>
      )}

      {/* ── CTA FINAL ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div
          className="relative overflow-hidden p-12 text-center"
          style={{
            background: "linear-gradient(135deg, #0D1225 0%, #1B2A8A20 50%, #E8181E10 100%)",
            border: "1px solid rgba(232, 24, 30, 0.2)",
            clipPath: "polygon(0 0, 100% 0, 100% 85%, 98% 100%, 0 100%)",
          }}
        >
          {/* Decorative lines */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />
          <div className="absolute top-4 left-4 w-8 h-px bg-brand-red" />
          <div className="absolute top-4 left-4 w-px h-8 bg-brand-red" />
          <div className="absolute bottom-4 right-4 w-8 h-px bg-brand-red" />
          <div className="absolute bottom-4 right-4 w-px h-8 bg-brand-red" />

          <h2
            className="text-4xl font-bold text-white mb-3 uppercase"
            style={{ fontFamily: "Rajdhani, sans-serif", letterSpacing: "0.05em" }}
          >
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-white/40 mb-8 max-w-md mx-auto">
            Escríbenos directo y conseguimos el equipo perfecto para ti
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 text-white font-bold uppercase tracking-widest transition-all hover:scale-105"
            style={{
              background: "#E8181E",
              fontFamily: "Rajdhani, sans-serif",
              clipPath: "polygon(0 0, 100% 0, 100% 70%, 97% 100%, 0 100%)",
              boxShadow: "0 0 30px rgba(232, 24, 30, 0.3)",
            }}
          >
            Contactar por WhatsApp
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

    </div>
  );
}
