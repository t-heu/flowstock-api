import { v4 as uuidv4 } from "uuid";
import { prisma } from "../../lib/prisma";
import { ProductDTO, Product } from "../../shared/types";

/* LIST */
export const getProductsAll = async (user: any) => {
  try {
    const data = await prisma.products.findMany({
      where: user.role !== "admin" ? { department: user.department } : undefined,
    });

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
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
    return { success: false, error: err.message };
  }
};

/* DELETE */
export const deleteProduct = async (user: any, id: string) => {
  try {
    const product = await prisma.products.findUnique({ where: { id } });

    if (!product) return { success: false, error: "Produto não encontrado" };
    if (user.role !== "admin" && product.department !== user.department) {
      return { success: false, error: "Sem permissão" };
    }

    await prisma.products.delete({ where: { id } });
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
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

    if (!product) return { success: false, error: "Produto não encontrado" };
    if (user.role !== "admin" && product.department !== user.department) {
      return { success: false, error: "Sem permissão" };
    }

    await prisma.products.update({
      where: { id },
      data: updates,
    });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};
