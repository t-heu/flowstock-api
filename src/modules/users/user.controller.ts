import type { Context } from 'hono';

import { userService } from './user.service';
import { ApiError } from '../../core/errors/ApiError';

export const userController = {
  getAllUser: async (c: Context) => {
    try {
      const result = await userService.getAllUser();

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

  createUser: async (c: Context) => {
    try {
      const data = c.get('validatedBody');

      const result = await userService.createUser(data);

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

  updateUser: async (c: Context) => {
    try {
      const id = c.req.param('id');
      const data = c.get('validatedBody');

      const result = await userService.updateUser(id, data);

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

  removeUser: async (c: Context) => {
    try {
      const id = c.req.param('id');

      const result = await userService.deleteUser(id);

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
