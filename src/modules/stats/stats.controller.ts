import type { Context } from 'hono';

import { statsService } from './stats.service';
import { ApiError } from '../../core/errors/ApiError';

export const statsController = {
  getStats: async (c: Context) => {
    try {
      const user = c.get('user');
      const branchFilter = c.req.query('branch');

      const result = await statsService.getStats(user, branchFilter);

      return c.json(result, 200);
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
