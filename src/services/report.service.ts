// src/services/report.service.ts
import { fetchMovementsBase } from "./movementBase";

export const reportService = {
  async getDetailedReport({
    branchId = "all",
    startDate,
    endDate,
    page = 1,
    pageSize = 10,
    type = "all",
    user,
  }: {
    branchId?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    pageSize?: number;
    type?: "entrada" | "saida" | "all";
    user?: { role: string; department: string };
  }) {
    const department =
      user && user.role !== "admin" ? user.department : undefined;

    const movements = await fetchMovementsBase({
      limit: pageSize,
      page,
      department,
      branchId: branchId !== "all" ? branchId : undefined,
      type: type !== "all" ? type : undefined,
      startDate,
      endDate,
    });

    return {
      success: true,
      data: movements,
      total: movements.length,
      page,
      pageSize,
    };
  },
};
