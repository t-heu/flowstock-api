import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "../../lib/prisma";
import { AuthUser } from "../../shared/types";
import { JWT_SECRET, TOKEN_EXPIRES } from "../../config/jwt";

export const authService = {
  async login(username: string, password: string) {
    try {
      // Busca o usuário pelo username
      const userData = await prisma.users.findUnique({
        where: { username },
      });

      if (!userData) {
        return { success: false, error: "Usuário não encontrado" };
      }

      // Valida senha
      const isValid = await bcrypt.compare(password, userData.password);
      if (!isValid) {
        return { success: false, error: "Usuário ou senha inválidos" };
      }

      if (!userData.branch_id || !userData.department || !userData.role) {
        return { success: false, error: "Usuário não possui filial ou departamento" };
      }

      const role = userData.role as "operator" | "admin" | "manager";

      const user: AuthUser = {
        id: userData.id,
        name: userData.name,
        username: userData.username,
        email: userData.email,
        role: role ?? "operator", // garante default
        branchId: userData.branch_id,
        department: userData.department,
      };

      const token = jwt.sign(user, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });

      return { success: true, user, token };
    } catch (err: any) {
      console.error("Erro inesperado ao logar usuário:", err);
      return {
        success: false,
        error: err?.message || "Erro inesperado ao logar usuário",
      };
    }
  },
};
