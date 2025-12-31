import type { Context } from 'hono';

import { reportService } from './report.service';
import { ApiError } from '../../core/errors/ApiError';

export const reportController = {
  getReportDetailed: async (c: Context) => {
    try {
      const user = c.get('user');

      const branchId = c.req.query('branchId');
      const startDate = c.req.query('startDate');
      const endDate = c.req.query('endDate');
      const type = c.req.query('type');

      const page = Number(c.req.query('page')) || 1;
      const pageSize = Number(c.req.query('pageSize')) || 10;

      const result = await reportService.getDetailedReport({
        branchId,
        startDate,
        endDate,
        page,
        pageSize,
        type: type as any,
        user
      });

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
