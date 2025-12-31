import type { Context } from 'hono';

import * as productService from './products.service';
import { ApiError } from '../../core/errors/ApiError';

export const productsController = {
  getAllProducts: async (c: Context) => {
    try {
      const user = c.get('user');

      const result = await productService.getProductsAll(user);

      return c.json(
        result,
        result.success ? 200 : 400
      );
    } catch (err) {
      if (err instanceof ApiError) {
        return c.json(
          { success: false, message: err.message },
          err.statusCode as 400 | 401 | 403 | 404 | 500
        );
      }

      console.error(err);

      return c.json(
        { success: false, message: 'Erro interno' },
        500
      );
    }
  },

  createProduct: async (c: Context) => {
    try {
      const user = c.get('user');
      const data = c.get('validatedBody');

      const result = await productService.createProduct(user, data);

      return c.json(
        result,
        result.success ? 201 : 400
      );
    } catch (err) {
      if (err instanceof ApiError) {
        return c.json(
          { success: false, message: err.message },
          err.statusCode as 400 | 401 | 403 | 404 | 500
        );
      }

      console.error(err);

      return c.json(
        { success: false, message: 'Erro interno' },
        500
      );
    }
  },

  updateProduct: async (c: Context) => {
    try {
      const user = c.get('user');
      const id = c.req.param('id');
      const data = c.get('validatedBody');

      const result = await productService.updateProduct(
        user,
        id,
        data
      );

      return c.json(
        result,
        result.success ? 200 : 400
      );
    } catch (err) {
      if (err instanceof ApiError) {
        return c.json(
          { success: false, message: err.message },
          err.statusCode as 400 | 401 | 403 | 404 | 500
        );
      }

      console.error(err);

      return c.json(
        { success: false, message: 'Erro interno' },
        500
      );
    }
  },

  deleteProduct: async (c: Context) => {
    try {
      const user = c.get('user');
      const id = c.req.param('id');

      const result = await productService.deleteProduct(user, id);

      return c.json(
        result,
        result.success ? 200 : 400
      );
    } catch (err) {
      if (err instanceof ApiError) {
        return c.json(
          { success: false, message: err.message },
          err.statusCode as 400 | 401 | 403 | 404 | 500
        );
      }

      console.error(err);

      return c.json(
        { success: false, message: 'Erro interno' },
        500
      );
    }
  }
};
