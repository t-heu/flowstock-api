import { v4 as uuidv4 } from "uuid";

import { prisma } from "../../core/prisma/client";
import {ApiError} from "../../core/errors/ApiError"
import { fetchMovementsBase } from "./movementBase";

export const movementService = {
  async getMovements(user: any, typeFilter: "entrada" | "saida") {
    try {
      const movements = await fetchMovementsBase({
        type: typeFilter,
        department: user.role !== "admin" ? user.department : undefined,
      });

      return { success: true, data: movements };
    } catch (err: any) {
      if (err instanceof ApiError) {
        throw err
      }
  
      throw new Error("Error interno", err.message);
    }
  },

  async createMovement(movement: {
    branch_id: string;
    destination_branch_id?: string;
    product_id: string;
    quantity: number;
    type: "entrada" | "saida";
    notes?: string;
    invoice_number?: string;
  }) {
    try {
      const product = await prisma.products.findUnique({
        where: { id: movement.product_id },
      });
      if (!product) throw new ApiError("Produto não encontrado");

      // Busca estoque da filial
      const stockRow = await prisma.stock.findFirst({
        where: {
          product_id: movement.product_id,
          branch_id: movement.branch_id,
        },
      });

      const currentQty = stockRow?.quantity ?? null;

      if (movement.type === "saida") {
        if (currentQty === null || currentQty < movement.quantity) {
          throw new ApiError(`Estoque insuficiente (${currentQty ?? 0})`);
        }
      }

      // Atualiza ou cria estoque
      if (currentQty !== null) {
        await prisma.stock.updateMany({
          where: {
            product_id: movement.product_id,
            branch_id: movement.branch_id,
          },
          data: {
            quantity:
              movement.type === "entrada"
                ? currentQty + movement.quantity
                : currentQty - movement.quantity,
            updated_at: new Date(),
          },
        });
      } else if (movement.type === "entrada") {
        await prisma.stock.create({
          data: {
            product_id: movement.product_id,
            branch_id: movement.branch_id,
            quantity: movement.quantity,
            updated_at: new Date(),
          },
        });
      } else {
        throw new ApiError("Filial sem estoque desse produto");
      }

      // Transferência entre filiais
      if (movement.type === "saida" && movement.destination_branch_id) {
        const destStock = await prisma.stock.findFirst({
          where: {
            product_id: movement.product_id,
            branch_id: movement.destination_branch_id,
          },
        });

        if (destStock) {
          await prisma.stock.updateMany({
            where: {
              product_id: movement.product_id,
              branch_id: movement.destination_branch_id,
            },
            data: {
              quantity: destStock.quantity + movement.quantity,
              updated_at: new Date(),
            },
          });
        } else {
          await prisma.stock.create({
            data: {
              product_id: movement.product_id,
              branch_id: movement.destination_branch_id,
              quantity: movement.quantity,
              updated_at: new Date(),
            },
          });
        }
      }

      const inserted = await prisma.movements.create({
        data: {
          ...movement,
          id: uuidv4(),
          product_department: product.department,
          created_at: new Date(),
        },
      });

      return { success: true, data: inserted };
    } catch (err: any) {
      if (err instanceof ApiError) {
        throw err
      }
  
      throw new Error("Error interno", err.message);
    }
  },

  async deleteMovement(id: string) {
    try {
      await prisma.movements.delete({ where: { id } });
      return { success: true };
    } catch (err: any) {
      if (err instanceof ApiError) {
        throw err
      }
  
      throw new Error("Error interno", err.message);
    }
  },
};
