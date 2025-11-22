import { Request, Response } from "express";
import * as productService from "../services/products.service";

export const productsController = {
  list: async (req: Request, res: Response) => {
    const result = await productService.getProducts(req.user);
    res.status(result.success ? 200 : 400).json(result);
  },

  create: async (req: Request, res: Response) => {
    const result = await productService.createProduct(req.user, req.body);
    res.status(result.success ? 201 : 400).json(result);
  },

  delete: async (req: Request, res: Response) => {
    const result = await productService.deleteProduct(req.user, req.params.id);
    res.status(result.success ? 200 : 400).json(result);
  },

  update: async (req: Request, res: Response) => {
    const result = await productService.updateProduct(
      req.user,
      req.params.id,
      req.body
    );
    res.status(result.success ? 200 : 400).json(result);
  },
};
