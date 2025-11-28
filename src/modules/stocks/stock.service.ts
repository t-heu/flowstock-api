import { prisma } from "../../core/prisma/client";
import {ApiError} from "../../core/errors/ApiError"
import { BranchStockItem } from "../../core/types";

export const stockService = {
  async getStockAll(): Promise<{ success: boolean; data?: BranchStockItem[]; error?: string }> {
    try {
      const data = await prisma.stock.findMany({
        include: {
          branches: { select: { name: true } },
          products: { select: { name: true, description: true } },
        },
      });

      const normalized: BranchStockItem[] = data.map((raw) => ({
        branch_id: raw.branch_id,
        branch_name: raw.branches?.name ?? "Desconhecida",
        product_id: raw.product_id,
        product_name: raw.products?.name ?? "Sem nome",
        product_description: raw.products?.description ?? "-",
        quantity: Number(raw.quantity ?? 0),
      }));

      return { success: true, data: normalized };
    } catch (err: any) {
      if (err instanceof ApiError) {
        throw err
      }
  
      throw new Error("Error interno", err.message);
    }
  },
};
