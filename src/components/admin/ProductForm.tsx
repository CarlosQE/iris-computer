"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, Save, X, Loader2 } from "lucide-react";
import { createProduct, updateProduct, uploadProductImage, ProductFormData } from "@/lib/admin-products";
import { Category } from "@/types";

interface ProductFormProps {
  categories: Category[];
  initialData?: Partial<ProductFormData> & { id?: string; image?: string };
  mode: "create" | "edit";
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function ProductForm({ categories, initialData, mode }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image_url || initialData?.image || "");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: initialData?.name || "",
    category_id: initialData?.category_id || "",
    price: initialData?.price?.toString() || "",
    original_price: initialData?.original_price?.toString() || "",
    description: initialData?.description || "",
    specs: initialData?.specs || "",
    slug: initialData?.slug || "",
    available: initialData?.available ?? true,
    featured: initialData?.featured ?? false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "name" && mode === "create" ? { slug: slugify(value) } : {}),
    }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageUrl = initialData?.image_url || initialData?.image || "";

      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile);
      }

      const data: ProductFormData = {
        name: form.name,
        category_id: form.category_id,
        price: parseFloat(form.price),
        original_price: form.original_price ? parseFloat(form.original_price) : null,
        image_url: imageUrl,
        description: form.description,
        specs: form.specs,
        slug: form.slug,
        available: form.available,
        featured: form.featured,
      };

      if (mode === "create") {
        await createProduct(data);
      } else {
        await updateProduct(initialData!.id!, data);
      }

      router.push("/admin/productos");
      router.refresh();
    } catch (err) {
      setError("Error al guardar el producto. Verifica los datos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none transition-all";
  const inputStyle = {
    background: "#0D1225",
    border: "1px solid rgba(27, 42, 138, 0.4)",
    fontFamily: "Exo 2, sans-serif",
  };
  const labelClass = "text-white/50 text-xs uppercase tracking-widest mb-1.5 block";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Columna principal */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Nombre */}
          <div>
            <label className={labelClass} style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Nombre del producto *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Ej: Laptop Lenovo IdeaPad 3"
              className={inputClass}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "rgba(232, 24, 30, 0.6)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(27, 42, 138, 0.4)")}
            />
          </div>

          {/* Slug */}
          <div>
            <label className={labelClass} style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Slug (URL) *
            </label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              placeholder="laptop-lenovo-ideapad-3"
              className={inputClass}
              style={{ ...inputStyle, fontFamily: "monospace" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(232, 24, 30, 0.6)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(27, 42, 138, 0.4)")}
            />
          </div>

          {/* Descripción */}
          <div>
            <label className={labelClass} style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Descripción *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Describe el producto brevemente..."
              className={inputClass}
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(232, 24, 30, 0.6)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(27, 42, 138, 0.4)")}
            />
          </div>

          {/* Especificaciones */}
          <div>
            <label className={labelClass} style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Especificaciones (separadas por coma)
            </label>
            <textarea
              name="specs"
              value={form.specs}
              onChange={handleChange}
              rows={3}
              placeholder="RAM: 8GB, SSD: 512GB, CPU: Intel i5, Pantalla: 15.6&quot;"
              className={inputClass}
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(232, 24, 30, 0.6)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(27, 42, 138, 0.4)")}
            />
          </div>

          {/* Precios */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} style={{ fontFamily: "Rajdhani, sans-serif" }}>
                Precio (COP) *
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                placeholder="2500000"
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(232, 24, 30, 0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(27, 42, 138, 0.4)")}
              />
            </div>
            <div>
              <label className={labelClass} style={{ fontFamily: "Rajdhani, sans-serif" }}>
                Precio original (opcional)
              </label>
              <input
                type="number"
                name="original_price"
                value={form.original_price}
                onChange={handleChange}
                min="0"
                placeholder="2800000"
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(232, 24, 30, 0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(27, 42, 138, 0.4)")}
              />
            </div>
          </div>
        </div>

        {/* Columna lateral */}
        <div className="flex flex-col gap-5">

          {/* Imagen */}
          <div>
            <label className={labelClass} style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Imagen del producto
            </label>
            <label
              className="flex flex-col items-center justify-center gap-3 cursor-pointer transition-all"
              style={{
                border: "2px dashed rgba(27, 42, 138, 0.4)",
                background: "#0D1225",
                minHeight: "160px",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(232, 24, 30, 0.5)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(27, 42, 138, 0.4)")}
            >
              {imagePreview ? (
                <div className="relative w-full h-40">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              ) : (
                <>
                  <Upload size={24} className="text-white/20" />
                  <span className="text-white/30 text-xs uppercase tracking-wider"
                    style={{ fontFamily: "Rajdhani, sans-serif" }}>
                    Click para subir imagen
                  </span>
                  <span className="text-white/20 text-xs">JPG, PNG, WEBP — máx 5MB</span>
                </>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {imagePreview && (
              <button
                type="button"
                onClick={() => { setImagePreview(""); setImageFile(null); }}
                className="flex items-center gap-1 mt-2 text-white/30 hover:text-brand-red text-xs transition-colors"
              >
                <X size={12} /> Quitar imagen
              </button>
            )}
          </div>

          {/* Categoría */}
          <div>
            <label className={labelClass} style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Categoría *
            </label>
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              required
              className={inputClass}
              style={inputStyle}
            >
              <option value="">Seleccionar...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Toggles */}
          <div
            className="flex flex-col gap-3 p-4"
            style={{ background: "#080C18", border: "1px solid rgba(27, 42, 138, 0.3)" }}
          >
            {[
              { name: "available", label: "Disponible", desc: "Visible en el catálogo" },
              { name: "featured", label: "Destacado", desc: "Aparece en el inicio" },
            ].map(({ name, label, desc }) => (
              <label key={name} className="flex items-center justify-between gap-4 cursor-pointer">
                <div>
                  <p className="text-white text-sm font-semibold uppercase tracking-wider"
                    style={{ fontFamily: "Rajdhani, sans-serif" }}>
                    {label}
                  </p>
                  <p className="text-white/30 text-xs">{desc}</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    name={name}
                    checked={form[name as keyof typeof form] as boolean}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className="w-10 h-5 rounded-full transition-all cursor-pointer"
                    style={{
                      background: form[name as keyof typeof form]
                        ? "#E8181E"
                        : "rgba(27, 42, 138, 0.3)",
                    }}
                    onClick={() =>
                      setForm((p) => ({ ...p, [name]: !p[name as keyof typeof p] }))
                    }
                  >
                    <div
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                      style={{
                        left: form[name as keyof typeof form] ? "22px" : "2px",
                      }}
                    />
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          className="px-4 py-3 text-sm text-brand-red"
          style={{
            background: "rgba(232, 24, 30, 0.08)",
            border: "1px solid rgba(232, 24, 30, 0.3)",
          }}
        >
          {error}
        </div>
      )}

      {/* Botones */}
      <div className="flex items-center gap-4 pt-4"
        style={{ borderTop: "1px solid rgba(27, 42, 138, 0.3)" }}
      >
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 text-white font-bold uppercase tracking-widest text-sm transition-all disabled:opacity-50 hover:scale-105"
          style={{
            background: "#E8181E",
            fontFamily: "Rajdhani, sans-serif",
            clipPath: "polygon(0 0, 100% 0, 100% 70%, 97% 100%, 0 100%)",
          }}
        >
          {loading ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          {loading ? "Guardando..." : mode === "create" ? "Crear producto" : "Guardar cambios"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 text-white/40 hover:text-white text-sm font-semibold uppercase tracking-wider transition-colors"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
