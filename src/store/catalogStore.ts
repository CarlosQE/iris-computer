import { create } from "zustand";
import { SortOption } from "@/types";

interface CatalogStore {
  search: string;
  selectedCategory: string;
  sortBy: SortOption;
  setSearch: (search: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sort: SortOption) => void;
  reset: () => void;
}

export const useCatalogStore = create<CatalogStore>((set) => ({
  search: "",
  selectedCategory: "",
  sortBy: "newest",
  setSearch: (search) => set({ search }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSortBy: (sortBy) => set({ sortBy }),
  reset: () => set({ search: "", selectedCategory: "", sortBy: "newest" }),
}));