import { Request, Response, NextFunction } from "express";

import {ApiError} from "../../errors/ApiError"
import { stockService } from "./stock.service";

export const stockController = {
  async getAllStock(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await stockService.getStockAll();
      return res.status(result.success ? 200 : 500).json(result);
    } catch (err: any) {
      if (err instanceof ApiError) {
        return next(err)
      }

      return next(new Error("Error interno", err.message));
    }
  }
};
