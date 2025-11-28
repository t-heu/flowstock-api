import { Request, Response, NextFunction } from "express";

import { authService } from "./auth.service";

import {ApiError} from "../../core/errors/ApiError"

export const authController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.data;

      const result = await authService.login(username, password);

      return res.status(result.success ? 200 : 401).json(result);
    } catch (err: any) {
      if (err instanceof ApiError) {
        return next(err)
      }

      return next(new Error("Error interno", err.message));
    }
  }
};
