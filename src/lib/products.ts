import { supabase } from "./supabase";
import { Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(`*, categories(name, icon)`)
    .eq("available", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data.map((p) => ({
    id:            p.id,
    name:          p.name,
    category:      p.categories?.name ?? "",
    categoryIcon:  p.categories?.icon ?? "",
    price:         p.price,
    originalPrice: p.original_price ?? undefined,
    image:         p.image_url ?? "",
    description:   p.description ?? "",
    specs:         p.specs ?? "",
    available:     p.available,
    featured:      p.featured,
    slug:          p.slug,
  }));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(`*, categories(name, icon)`)
    .eq("available", true)
    .eq("featured", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  return data.map((p) => ({
    id:            p.id,
    name:          p.name,
    category:      p.categories?.name ?? "",
    categoryIcon:  p.categories?.icon ?? "",
    price:         p.price,
    originalPrice: p.original_price ?? undefined,
    image:         p.image_url ?? "",
    description:   p.description ?? "",
    specs:         p.specs ?? "",
    available:     p.available,
    featured:      p.featured,
    slug:          p.slug,
  }));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(`*, categories(name, icon)`)
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  return {
    id:            data.id,
    name:          data.name,
    category:      data.categories?.name ?? "",
    categoryIcon:  data.categories?.icon ?? "",
    price:         data.price,
    originalPrice: data.original_price ?? undefined,
    image:         data.image_url ?? "",
    description:   data.description ?? "",
    specs:         data.specs ?? "",
    available:     data.available,
    featured:      data.featured,
    slug:          data.slug,
  };
}

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) return [];
  return data;
}