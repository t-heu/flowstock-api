import { v4 as uuidv4 } from "uuid";
import { supabase } from "../config/supabase";
import { fetchMovementsBase } from "./movementBase";

export const getMovements = async (user: any, typeFilter?: any) => {
  try {
    const movements = await fetchMovementsBase({
      type: typeFilter,
      department: user.role !== "admin" ? user.department : undefined,
    });

    return { success: true, data: movements };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const createMovement = async (movement: {
  branch_id: string;
  destination_branch_id?: string;
  product_id: string;
  quantity: number;
  type: "entrada" | "saida";
  notes?: string;
  invoice_number?: string;
}) => {
  try {
    const { data: product } = await supabase
      .from("products")
      .select("*")
      .eq("id", movement.product_id)
      .single();
    if (!product) return { success: false, error: "Produto não encontrado" };

    const movementToAdd = {
      ...movement,
      id: uuidv4(),
      created_at: new Date().toISOString(),
      product_department: product.department,
    };

    const { data: stockRows } = await supabase
      .from("stock")
      .select("*")
      .eq("product_id", movement.product_id)
      .eq("branch_id", movement.branch_id)
      .maybeSingle();

    const currentQty = stockRows ? Number(stockRows.quantity) : null;

    if (movement.type === "saida") {
      if (currentQty === null || currentQty < movement.quantity) {
        return { success: false, error: `Estoque insuficiente (${currentQty ?? 0})` };
      }
    }

    if (currentQty !== null) {
      const newQty =
        movement.type === "entrada"
          ? currentQty + movement.quantity
          : currentQty - movement.quantity;

      const { error: updateErr } = await supabase
        .from("stock")
        .update({
          quantity: Math.max(0, newQty),
          updated_at: new Date().toISOString(),
        })
        .eq("product_id", movement.product_id)
        .eq("branch_id", movement.branch_id);
      if (updateErr) throw updateErr;
    } else {
      if (movement.type === "saida") {
        return { success: false, error: "Filial sem estoque desse produto" };
      }

      const { error: insertErr } = await supabase.from("stock").insert([
        {
          product_id: movement.product_id,
          branch_id: movement.branch_id,
          quantity: movement.quantity,
          updated_at: new Date().toISOString(),
        },
      ]);
      if (insertErr) throw insertErr;
    }

    if (movement.type === "saida" && movement.destination_branch_id) {
      await supabase.rpc("adjust_stock_transfer", {
        p_product_id: movement.product_id,
        p_from_branch: movement.branch_id,
        p_to_branch: movement.destination_branch_id,
        p_qty: movement.quantity,
      });
    }

    const { data: inserted, error } = await supabase
      .from("movements")
      .insert([movementToAdd])
      .select()
      .single();
    if (error) throw error;

    return { success: true, data: inserted };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const deleteMovement = async (id: string) => {
  try {
    const { error } = await supabase.from("movements").delete().eq("id", id);
    if (error) throw error;

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};
