import { prisma } from '../../core/prisma/client';

import {ApiError} from "../../core/errors/ApiError"

export const statsService = {
  async getStats(user: any, branchFilter?: string) {
    try {
      const dept = user.role !== "admin" ? user.department : undefined;
      const branch = branchFilter && branchFilter !== "ALL" ? branchFilter : undefined;

      const [
        totalProducts,
        totalBranches,
        totalEntries,
        totalExits,
        stockAggregate,
      ] = await prisma.$transaction([
        // totalProducts
        prisma.products.count({
          where: dept ? { department: dept } : undefined,
        }),

        // totalBranches
        prisma.branches.count(),

        // totalEntries
        prisma.movements.count({
          where: {
            type: "entrada",
            ...(dept ? { product_department: dept } : {}),
            ...(branch ? { branch_id: branch } : {}),
          },
        }),

        // totalExits
        prisma.movements.count({
          where: {
            type: "saida",
            ...(dept ? { product_department: dept } : {}),
            ...(branch ? { branch_id: branch } : {}),
          },
        }),

        // totalStock
        prisma.stock.aggregate({
          _sum: { quantity: true },
          where: {
            ...(branch ? { branch_id: branch } : {}),
            ...(dept
              ? {
                  products: {
                    department: dept,
                  },
                }
              : {}),
          },
        }),
      ]);

      const totalStock = stockAggregate._sum.quantity ?? 0;

      return {
        success: true,
        data: {
          totalProducts,
          totalBranches,
          totalEntries,
          totalExits,
          totalStock,
        },
      };
    } catch (err: any) {
      if (err instanceof ApiError) {
        throw err
      }

      throw new Error("Error interno", err.message);
    }
  },
};
