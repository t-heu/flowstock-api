import { v4 as uuidv4 } from "uuid";

import { prisma } from "../../core/prisma/client";
import {ApiError} from "../../core/errors/ApiError"
import { ProductDTO, Product } from "../../core/types";

/* LIST */
export const getProductsAll = async (user: any) => {
  try {
    const data = await prisma.products.findMany({
      where: user.role !== "admin" ? { department: user.department } : undefined,
    });

    return { success: true, data };
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw err
    }

    throw new Error("Error interno", err.message);
  }
};

/* CREATE */
export const createProduct = async (
  user: any,
  product: Omit<ProductDTO, "id" | "createdAt">
) => {
  try {
    await prisma.products.create({
      data: {
        id: uuidv4(),
        ...product,
        created_at: new Date(),
      },
    });

    return { success: true };
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw err
    }

    throw new Error("Error interno", err.message);
  }
};

/* DELETE */
export const deleteProduct = async (user: any, id: string) => {
  try {
    const product = await prisma.products.findUnique({ where: { id } });

    if (!product) throw new Error("Produto não encontrado");

    if (user.role !== "admin" && product.department !== user.department) {
      throw new Error("Sem permissão");
    }

    await prisma.products.delete({ where: { id } });
    return { success: true };
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw err
    }

    throw new Error("Error interno", err.message);
  }
};

/* UPDATE */
export const updateProduct = async (
  user: any,
  id: string,
  updates: Partial<Product>
) => {
  try {
    const product = await prisma.products.findUnique({ where: { id } });

    if (!product) throw new ApiError("Produto não encontrado");

    if (user.role !== "admin" && product.department !== user.department) {
      throw new ApiError("Sem permissão");
    }

    await prisma.products.update({
      where: { id },
      data: updates,
    });

    return { success: true };
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw err
    }

    throw new Error("Error interno", err.message);
  }
};
