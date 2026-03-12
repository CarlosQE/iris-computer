import { createClient } from "@supabase/supabase-js";

// Cliente con service role para operaciones admin (solo server-side)
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export interface ProductFormData {
  name: string;
  category_id: string;
  price: number;
  original_price?: number | null;
  image_url?: string;
  description: string;
  specs?: string;
  available: boolean;
  featured: boolean;
  slug: string;
}

export async function createProduct(data: ProductFormData) {
  const supabase = getAdminClient();
  const { data: product, error } = await supabase
    .from("products")
    .insert([data])
    .select()
    .single();
  if (error) throw error;
  return product;
}

export async function updateProduct(id: string, data: Partial<ProductFormData>) {
  const supabase = getAdminClient();
  const { data: product, error } = await supabase
    .from("products")
    .update(data)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return product;
}

export async function deleteProduct(id: string) {
  const supabase = getAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadProductImage(file: File): Promise<string> {
  const supabase = getAdminClient();
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from("products")
    .upload(fileName, file, { upsert: false });

  if (error) throw error;

  const { data } = supabase.storage.from("products").getPublicUrl(fileName);
  return data.publicUrl;
}

export async function deleteProductImage(url: string) {
  const supabase = getAdminClient();
  const fileName = url.split("/").pop();
  if (!fileName) return;
  await supabase.storage.from("products").remove([fileName]);
}
