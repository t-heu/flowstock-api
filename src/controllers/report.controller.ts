// src/controllers/report.controller.ts
import { Request, Response } from "express";
import { reportService } from "../services/report.service";

export const reportController = {
  async getDetailed(req: Request, res: Response) {
    try {
      const {
        branchId,
        startDate,
        endDate,
        page,
        pageSize,
        type,
      } = req.query as any;

      const result = await reportService.getDetailedReport({
        branchId,
        startDate,
        endDate,
        page: page ? Number(page) : undefined,
        pageSize: pageSize ? Number(pageSize) : undefined,
        type: type as any,
      });

      return res.status(result.success ? 200 : 400).json(result);
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },
};
