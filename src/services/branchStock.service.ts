import { supabase } from "../config/supabase";
import { BranchStockItem } from "../shared/types";

export const branchStockService = {
  async getBranchStock(): Promise<{ success: boolean; data?: BranchStockItem[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from("stock")
        .select(`
          branch_id,
          product_id,
          quantity,
          branches!inner(name),
          products!inner(name, description)
        `);

      if (error) throw error;

      const normalized: BranchStockItem[] = (data || []).map((raw: any) => ({
        branch_id: raw.branch_id,
        branch_name: raw.branches?.name ?? "Desconhecida",
        product_id: raw.product_id,
        product_name: raw.products?.name ?? "Sem nome",
        product_description: raw.products?.description ?? "-",
        quantity: Number(raw.quantity ?? 0),
      }));

      return { success: true, data: normalized };
    } catch (err: any) {
      return { success: false, error: err?.message || "Erro ao carregar estoque por filial" };
    }
  }
};
