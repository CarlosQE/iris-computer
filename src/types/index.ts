export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  specs: string;
  available: boolean;
  featured: boolean;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export type SortOption = "price-asc" | "price-desc" | "newest" | "featured";