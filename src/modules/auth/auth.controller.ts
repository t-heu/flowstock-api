import type { Context } from 'hono';

import { authService } from './auth.service';
import { ApiError } from '../../core/errors/ApiError';

export const authController = {
  login: async (c: Context) => {
    try {
      // vem do middleware validate
      const { username, password } = c.get('validatedBody');

      const result = await authService.login(username, password);

      return c.json(
        result,
        result.success ? 200 : 401
      );
    } catch (err: any) {
      if (err instanceof ApiError) {
        return c.json(
          {
            status: 'error',
            message: err.message,
            code: err.statusCode
          },
          err.statusCode as 400 | 401 | 403 | 404 | 500
        );
      }

      console.error(err);

      return c.json(
        {
          status: 'error',
          message: 'Erro interno'
        },
        500
      );
    }
  }
};
