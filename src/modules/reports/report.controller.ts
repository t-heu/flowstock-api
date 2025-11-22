import { Request, Response } from "express";

import { reportService } from "./report.service";

export const reportController = {
  async getReportDetailed(req: Request, res: Response) {
    try {
      const {
        branchId,
        startDate,
        endDate,
        page,
        pageSize,
        type,
      } = req.query as any;
      const user = req.user;

      const result = await reportService.getDetailedReport({
        branchId,
        startDate,
        endDate,
        page: Number(page) || 1,
        pageSize: Number(pageSize) || 10,
        type: type as any,
        user
      });

      return res.status(result.success ? 200 : 400).json(result);
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },
};
