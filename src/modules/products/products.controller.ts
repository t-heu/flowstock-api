import { Request, Response, NextFunction } from "express";

import * as productService from "./products.service";
import {ApiError} from "../../errors/ApiError"

export const productsController = {
  getAllProducts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await productService.getProductsAll(req.user);
      res.status(result.success ? 200 : 400).json(result);
    } catch (err: any) {
      if (err instanceof ApiError) {
        return next(err)
      }

      return next(new Error("Error interno", err.message));
    }
  },

  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await productService.createProduct(req.user, req.body);
      res.status(result.success ? 201 : 400).json(result);
    } catch (err: any) {
      if (err instanceof ApiError) {
        return next(err)
      }

      return next(new Error("Error interno", err.message));
    }
  },

  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await productService.deleteProduct(req.user, req.params.id);
      res.status(result.success ? 200 : 400).json(result);
    } catch (err: any) {
      if (err instanceof ApiError) {
        return next(err)
      }

      return next(new Error("Error interno", err.message));
    }
  },

  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await productService.updateProduct(
        req.user,
        req.params.id,
        req.body
      );
      res.status(result.success ? 200 : 400).json(result);
    } catch (err: any) {
      if (err instanceof ApiError) {
        return next(err)
      }

      return next(new Error("Error interno", err.message));
    }
  },
};
