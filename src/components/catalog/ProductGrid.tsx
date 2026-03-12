"use client";

import { useMemo } from "react";
import { Product, SortOption } from "@/types";
import ProductCard from "./ProductCard";
import { useCatalogStore } from "@/store/catalogStore";
import { Search, SlidersHorizontal } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  categories: string[];
}

export default function ProductGrid({ products, categories }: ProductGridProps) {
  const { search, selectedCategory, sortBy, setSearch, setSelectedCategory, setSortBy } =
    useCatalogStore();

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "featured":
        result.sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
    }

    return result;
  }, [products, search, selectedCategory, sortBy]);

  return (
    <div className="flex flex-col gap-6">

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row gap-3">

        {/* Búsqueda */}
        <div className="relative flex-1">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-all uppercase tracking-wider"
            style={{
              background: "#0D1225",
              border: "1px solid rgba(27, 42, 138, 0.4)",
              fontFamily: "Rajdhani, sans-serif",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(232, 24, 30, 0.6)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(27, 42, 138, 0.4)")}
          />
        </div>

        {/* Ordenar */}
        <div className="relative">
          <SlidersHorizontal size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="pl-10 pr-6 py-3 text-sm text-white focus:outline-none cursor-pointer appearance-none uppercase tracking-wider"
            style={{
              background: "#0D1225",
              border: "1px solid rgba(27, 42, 138, 0.4)",
              fontFamily: "Rajdhani, sans-serif",
            }}
          >
            <option value="newest">Más recientes</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="featured">Destacados</option>
          </select>
        </div>
      </div>

      {/* Filtros por categoría */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCategory("")}
          className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all"
          style={{
            fontFamily: "Rajdhani, sans-serif",
            background: selectedCategory === "" ? "#E8181E" : "transparent",
            border: `1px solid ${selectedCategory === "" ? "#E8181E" : "rgba(27, 42, 138, 0.4)"}`,
            color: selectedCategory === "" ? "#fff" : "rgba(255,255,255,0.4)",
            clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)",
          }}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all"
            style={{
              fontFamily: "Rajdhani, sans-serif",
              background: selectedCategory === cat ? "#E8181E" : "transparent",
              border: `1px solid ${selectedCategory === cat ? "#E8181E" : "rgba(27, 42, 138, 0.4)"}`,
              color: selectedCategory === cat ? "#fff" : "rgba(255,255,255,0.4)",
              clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Contador */}
      <p
        className="text-white/25 text-xs uppercase tracking-[0.2em]"
        style={{ fontFamily: "Rajdhani, sans-serif" }}
      >
        {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-white/20">
          <Search size={40} className="mb-4 text-brand-red/30" />
          <p
            className="text-lg font-bold uppercase tracking-widest"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            Sin resultados
          </p>
          <p className="text-sm mt-1">Intenta con otro término</p>
        </div>
      )}
    </div>
  );
}
