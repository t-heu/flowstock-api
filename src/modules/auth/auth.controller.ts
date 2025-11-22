import { Request, Response } from "express";

import { authService } from "./auth.service";

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const result = await authService.login(username, password);

      return res.status(result.success ? 200 : 401).json(result);
    } catch (err) {
      console.error("Erro no login:", err);
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  }
};
