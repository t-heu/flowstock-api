import { Request, Response, NextFunction } from "express";

import {ApiError} from "../../core/errors/ApiError"
import * as BranchService from "./branch.service";

export const branchController = {
  async getAllBranch(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await BranchService.getBranches();
      res.status(result.success ? 200 : 500).json(result);
    } catch (err: any) {
      if (err instanceof ApiError) {
        return next(err)
      }

      return next(new Error("Error interno", err.message));
    }
  },

  async createBranch(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await BranchService.addBranch(req.data);
      
      res.status(result.success ? 201 : 500).json(result);
    } catch (err: any) {
     if (err instanceof ApiError) {
        return next(err)
      }

      return next(new Error("Error interno", err.message));
    }
  },

  async updateBranch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await BranchService.updateBranch(id, req.data);
      
      res.status(result.success ? 200 : 500).json(result);
    } catch (err: any) {
      if (err instanceof ApiError) {
        return next(err)
      }

      return next(new Error("Error interno", err.message));
    }
  },

  async deleteBranch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await BranchService.deleteBranch(id);

      res.status(result.success ? 200 : 500).json(result);
    } catch (err: any) {
      if (err instanceof ApiError) {
        return next(err)
      }

      return next(new Error("Error interno", err.message));
    }
  },
};
