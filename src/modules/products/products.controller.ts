import { Request, Response } from "express";

import * as productService from "./products.service";

export const productsController = {
  getAllProducts: async (req: Request, res: Response) => {
    try {
      const result = await productService.getProductsAll(req.user);
      res.status(result.success ? 200 : 400).json(result);
    } catch (err) {
      console.error("Erro interno:", err);
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  },

  createProduct: async (req: Request, res: Response) => {
    try {
      const result = await productService.createProduct(req.user, req.body);
      res.status(result.success ? 201 : 400).json(result);
    } catch (err) {
      console.error("Erro interno:", err);
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  },

  deleteProduct: async (req: Request, res: Response) => {
    try {
      const result = await productService.deleteProduct(req.user, req.params.id);
      res.status(result.success ? 200 : 400).json(result);
    } catch (err) {
      console.error("Erro interno:", err);
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  },

  updateProduct: async (req: Request, res: Response) => {
    try {
      const result = await productService.updateProduct(
        req.user,
        req.params.id,
        req.body
      );
      res.status(result.success ? 200 : 400).json(result);
    } catch (err) {
      console.error("Erro interno:", err);
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  },
};
