import { supabase } from "../config/supabase";

export const statsService = {
  async getStats(user: any, branchFilter?: string) {
    const dept = user.role !== "admin" ? user.department : undefined;
    const branch = branchFilter && branchFilter !== "ALL" ? branchFilter : undefined;

    // PRODUCTS COUNT
    let queryProducts = supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    if (dept) queryProducts = queryProducts.eq("department", dept);

    const { count: prodCount } = await queryProducts;

    // BRANCHES COUNT
    const { count: branchCount } = await supabase
      .from("branches")
      .select("*", { count: "exact", head: true });

    // ENTRIES COUNT
    const { count: entriesCount } = await supabase
      .from("movements")
      .select("*", { count: "exact", head: true })
      .eq("type", "entrada")
      .match({
        ...(dept ? { product_department: dept } : {}),
        ...(branch ? { branch_id: branch } : {}),
      });

    // EXITS COUNT
    const { count: exitsCount } = await supabase
      .from("movements")
      .select("*", { count: "exact", head: true })
      .eq("type", "saida")
      .match({
        ...(dept ? { product_department: dept } : {}),
        ...(branch ? { branch_id: branch } : {}),
      });

    // TOTAL STOCK
    let query = supabase
      .from("stock")
      .select(`
        quantity,
        branch_id,
        products!inner (department)
      `);

    if (branch) query = query.eq("branch_id", branch);
    if (dept) query = query.eq("products.department", dept);

    const { data } = await query;

    const totalStock = (data ?? []).reduce(
      (sum, row: any) => sum + Number(row.quantity),
      0
    );

    return {
      success: true,
      data: {
        totalProducts: prodCount ?? 0,
        totalBranches: branchCount ?? 0,
        totalEntries: entriesCount ?? 0,
        totalExits: exitsCount ?? 0,
        totalStock,
      },
    };
  },
};
