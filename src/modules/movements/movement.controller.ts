import type { Context } from 'hono';

import { movementService } from './movement.service';
import { ApiError } from '../../core/errors/ApiError';

export const movementController = {
  getAllMovement: async (c: Context) => {
    try {
      const user = c.get('user');
      const typeQuery = c.req.query('type');

      // validação igual à do Express
      if (typeQuery !== 'entrada' && typeQuery !== 'saida') {
        return c.json(
          { success: false, message: 'Tipo inválido' },
          400
        );
      }

      const result = await movementService.getMovements(
        user,
        typeQuery
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

  createMovement: async (c: Context) => {
    try {
      const data = c.get('validatedBody');

      const result = await movementService.createMovement(data);

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

  deleteMovement: async (c: Context) => {
    try {
      const id = c.req.param('id');

      const result = await movementService.deleteMovement(id);

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
