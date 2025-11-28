import { prisma } from "../../core/prisma/client";

export const fetchMovementsBase = async (filters?: {
  limit?: number;
  page?: number;
  type?: "entrada" | "saida";
  branchId?: string;
  startDate?: string;
  endDate?: string;
  department?: string;
}) => {
  const { limit = 30, page = 1, type, branchId, startDate, endDate, department } = filters || {};
  const skip = (page - 1) * limit;

  const where: any = {};
  if (type) where.type = type;
  if (branchId) where.branch_id = branchId;
  if (startDate) where.created_at = { gte: new Date(startDate + "T00:00:00") };
  if (endDate) where.created_at = { ...where.created_at, lte: new Date(endDate + "T23:59:59") };
  if (department) where.products = { department };

  const movements = await prisma.movements.findMany({
    where,
    include: {
      products: { select: { id: true, code: true, name: true, department: true } },
      branches_movements_branch_idTobranches: { select: { id: true, code: true, name: true } },
      branches_movements_destination_branch_idTobranches: { select: { id: true, code: true, name: true } },
    },
    orderBy: { created_at: "desc" },
    skip,
    take: limit,
  });

  return movements.map((m: any) => ({
    id: m.id,
    created_at: m.created_at,
    invoice_number: m.invoice_number ?? "-",
    branch_name: m.branches_movements_branch_idTobranches?.name ?? "-",
    branch_code: m.branches_movements_branch_idTobranches?.code ?? "-",
    destination_branch_name: m.branches_movements_destination_branch_idTobranches?.name ?? "-",
    destination_branch_code: m.branches_movements_destination_branch_idTobranches?.code ?? "-",
    product_code: m.products?.code ?? "-",
    product_name: m.products?.name ?? "-",
    product_department: m.products?.department ?? "-",
    quantity: m.quantity,
    type: m.type,
    notes: m.notes ?? "-",
  }));
};
