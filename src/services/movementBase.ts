import { supabase } from "../config/supabase";

export const fetchMovementsBase = async (filters?: {
  limit?: number;
  page?: number;
  type?: "entrada" | "saida";
  branchId?: string;
  startDate?: string;
  endDate?: string;
  department?: string;
}) => {
  const {
    limit = 30,
    page = 1,
    type,
    branchId,
    startDate,
    endDate,
    department,
  } = filters || {};

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("movements")
    .select(`
      id,
      quantity,
      type,
      notes,
      created_at,
      invoice_number,
      product:product_id (id, code, name, department),
      branch:branch_id (id, code, name),
      destination_branch:destination_branch_id (id, code, name)
    `)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (type) query = query.eq("type", type);
  if (branchId) query = query.eq("branch_id", branchId);
  if (startDate) query = query.gte("created_at", startDate + "T00:00:00");
  if (endDate) query = query.lte("created_at", endDate + "T23:59:59");

  const { data, error } = await query;
  if (error) throw error;

  return (data || [])
    .filter((m: any) => !department || m.product?.department === department)
    .map((m: any) => ({
      id: m.id,
      created_at: m.created_at,
      invoice_number: m.invoice_number ?? "-",
      branch_name: m.branch?.name ?? "-",
      branch_code: m.branch?.code ?? "-",
      destination_branch_name: m.destination_branch?.name ?? "-",
      destination_branch_code: m.destination_branch?.code ?? "-",
      product_code: m.product?.code ?? "-",
      product_name: m.product?.name ?? "-",
      product_department: m.product?.department ?? "-",
      quantity: Number(m.quantity ?? 0),
      type: m.type,
      notes: m.notes ?? "-",
    }));
};
