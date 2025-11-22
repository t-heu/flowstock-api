import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const result = await authService.login(username, password);

    return res.status(result.success ? 200 : 401).json(result);
  },
};
