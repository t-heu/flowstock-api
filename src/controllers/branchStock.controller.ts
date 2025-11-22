import { Request, Response } from "express";
import { branchStockService } from "../services/branchStock.service";

export const branchStockController = {
  async getBranchStock(req: Request, res: Response) {
    const result = await branchStockService.getBranchStock();
    return res.status(result.success ? 200 : 500).json(result);
  }
};
