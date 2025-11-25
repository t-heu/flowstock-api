import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import {ApiError} from "../../errors/ApiError"
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
      if (err instanceof ApiError) {
        throw err
      }

      throw new Error("Error interno", err.message);
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
      if (err.code === "P2002") throw new ApiError("Email ou username já cadastrado");

      if (err instanceof ApiError) {
        throw err
      }

      throw new Error("Error interno", err.message);
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
      if (err instanceof ApiError) {
        throw err
      }

      throw new Error("Error interno", err.message);
    }
  },

  async deleteUser(id: string) {
    try {
      await prisma.users.delete({ where: { id } });
      return { success: true };
    } catch (err: any) {
      if (err instanceof ApiError) {
        throw err
      }

      throw new Error("Error interno", err.message);
    }
  },
};
