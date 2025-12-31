import type { Context } from 'hono';

import { stockService } from './stock.service';
import { ApiError } from '../../core/errors/ApiError';

export const stockController = {
  getAllStock: async (c: Context) => {
    try {
      const result = await stockService.getStockAll();

      return c.json(
        result,
        result.success ? 200 : 500
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
