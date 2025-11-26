import { Request, Response, NextFunction } from "express";

import { userService } from "./user.service";
import {ApiError} from "../../errors/ApiError"

export const userController = {
  async getAllUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getAllUser();
      return res.status(result.success ? 200 : 400).json(result);
    } catch (err: any) {
      if (err instanceof ApiError) {
        return next(err)
      }

      return next(new Error("Error interno", err.message));
    }
  },

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.createUser(req.data);
      return res.status(result.success ? 201 : 400).json(result);
    } catch (err: any) {
      if (err instanceof ApiError) {
        return next(err)
      }

      return next(new Error("Error interno", err.message));
    }
  },

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.updateUser(req.params.id, req.data);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (err: any) {
      if (err instanceof ApiError) {
        return next(err)
      }

      return next(new Error("Error interno", err.message));
    }
  },

  async removeUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.deleteUser(req.params.id);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (err: any) {
      if (err instanceof ApiError) {
        return next(err)
      }

      return next(new Error("Error interno", err.message));
    }
  },
};
