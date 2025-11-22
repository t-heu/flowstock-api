import { v4 as uuidv4 } from "uuid";

import { supabase } from "../../config/supabase";
import { ProductDTO, Product } from "../../shared/types";

/* LIST */
export const getProductsAll = async (user: any) => {
  try {
    let query = supabase.from("products").select("*");

    if (user.role !== "admin") {
      query = query.eq("department", user.department);
    }

    const { data, error } = await query;
    if (error) throw error;

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

/* CREATE */
export const createProduct = async (
  user: any,
  product: Omit<ProductDTO, "id" | "createdAt">
) => {
  const productData = {
    id: uuidv4(),
    ...product,
    created_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("products").insert([productData]);
  if (error) return { success: false, error: error.message };

  return { success: true };
};

/* DELETE */
export const deleteProduct = async (user: any, id: string) => {
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) return { success: false, error: "Produto não encontrado" };

  if (user.role !== "admin" && product.department !== user.department) {
    return { success: false, error: "Sem permissão" };
  }

  const { error: delErr } = await supabase.from("products").delete().eq("id", id);
  if (delErr) return { success: false, error: delErr.message };

  return { success: true };
};

/* UPDATE */
export const updateProduct = async (
  user: any,
  id: string,
  updates: Partial<Product>
) => {
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) return { success: false, error: "Produto não encontrado" };

  if (user.role !== "admin" && product.department !== user.department) {
    return { success: false, error: "Sem permissão" };
  }

  const { error: updErr } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id);

  if (updErr) return { success: false, error: updErr.message };

  return { success: true };
};
