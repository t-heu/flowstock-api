import { v4 as uuidv4 } from "uuid";
import { prisma } from "../../lib/prisma";

export const getBranches = async () => {
  try {
    const data = await prisma.branches.findMany();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const addBranch = async (branch: { code: string; name: string }) => {
  try {
    await prisma.branches.create({
      data: {
        id: uuidv4(),
        code: branch.code,
        name: branch.name,
        created_at: new Date(),
      },
    });
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const updateBranch = async (id: string, updates: Partial<{ code: string; name: string }>) => {
  try {
    await prisma.branches.update({
      where: { id },
      data: updates,
    });
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const deleteBranch = async (id: string) => {
  try {
    await prisma.branches.delete({
      where: { id },
    });
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};
