import { Request, Response, NextFunction } from "express";

import { statsService } from "./stats.service";
import {ApiError} from "../../core/errors/ApiError"

export const statsController = {
  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const branchFilter = req.query.branch as string;

      const result = await statsService.getStats(req.user, branchFilter);

      return res.status(200).json(result);
    } catch (err: any) {
      if (err instanceof ApiError) {
        return next(err)
      }

      return next(new Error("Error interno", err.message));
    }
  },
};
