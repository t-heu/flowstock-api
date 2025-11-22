import { Request, Response } from "express";

import { statsService } from "./stats.service";

export const statsController = {
  async getStats(req: Request, res: Response) {
    try {
      const branchFilter = req.query.branch as string;

      const result = await statsService.getStats(req.user, branchFilter);

      return res.status(200).json(result);
    } catch (e: any) {
      return res.status(500).json({ success: false, error: e.message });
    }
  },
};
