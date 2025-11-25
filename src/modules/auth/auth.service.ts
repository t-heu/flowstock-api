import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {ApiError} from "../../errors/ApiError"

import { prisma } from "../../lib/prisma";
import { AuthUser } from "../../shared/types";
import { JWT_SECRET, TOKEN_EXPIRES } from "../../config/jwt";

export const authService = {
  async login(username: string, password: string) {
    try {
      const userData = await prisma.users.findUnique({
        where: { username },
      });
      
      if (!userData) {
        //return { success: false, error: "Usuário ou senha inválidos" };
        throw new ApiError("Usuário ou senha inválidos");
      }

      // Valida senha
      const isValid = await bcrypt.compare(password, userData.password);
      if (!isValid) {
        throw new ApiError("Usuário ou senha inválidos");
      }

      if (!userData.branch_id || !userData.department || !userData.role) {
        throw new ApiError("Usuário não possui filial ou departamento");
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
      if (err instanceof ApiError) {
        throw err
      }

      throw new Error("Error interno", err.message);
    }
  },
};
