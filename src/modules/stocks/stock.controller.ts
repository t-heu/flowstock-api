import { Request, Response } from "express";

import { stockService } from "./stock.service";

export const stockController = {
  async getAllStock(req: Request, res: Response) {
    try {
      const result = await stockService.getStockAll();
      return res.status(result.success ? 200 : 500).json(result);
    } catch (err) {
      console.error("Erro interno:", err);
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  }
};
