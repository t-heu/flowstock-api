import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../../lib/prisma";

export const userService = {
  async getAllUser() {
    try {
      const data = await prisma.users.findMany({
        include: {
          branches: { select: { id: true, name: true } }, // inclui a filial associada
        },
      });

      const users = data.map((u) => ({
        ...u,
        password: undefined, // não expõe senha
        created_at: u.created_at ?? new Date().toISOString(),
        role: u.role ?? "operator",
        department: u.department ?? null,
        branch: u.branches ?? null,
      }));

      return { success: true, data: users };
    } catch (err: any) {
      return { success: false, error: err?.message || "Erro ao buscar usuários" };
    }
  },

  async createUser(payload: any) {
    try {
      const hashedPassword = await bcrypt.hash("123", 10);

      await prisma.users.create({
        data: {
          id: uuidv4(),
          name: payload.name,
          username: payload.username,
          email: payload.email,
          role: payload.role ?? "operator",
          department: payload.department ?? null,
          password: hashedPassword,
          branch_id: payload.branchId,
        },
      });

      return { success: true };
    } catch (err: any) {
      if (err.code === "P2002") {
        // unique constraint failed
        return { success: false, error: "Email ou username já cadastrado" };
      }
      return { success: false, error: err?.message || "Erro ao criar usuário" };
    }
  },

  async updateUser(id: string, updates: any) {
    try {
      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
      } else {
        delete updates.password;
      }

      if (updates.department === "") updates.department = null;
      if (updates.department === undefined) delete updates.department;
      delete updates.branch;

      await prisma.users.update({
        where: { id },
        data: updates,
      });

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Erro ao atualizar usuário" };
    }
  },

  async deleteUser(id: string) {
    try {
      await prisma.users.delete({ where: { id } });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Erro ao deletar usuário" };
    }
  },
};
