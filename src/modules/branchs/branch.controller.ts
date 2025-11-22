import { Request, Response } from "express";

import * as BranchService from "./branch.service";

export const branchController = {
  async getAllBranch(req: Request, res: Response) {
    try {
      const result = await BranchService.getBranches();
      res.status(result.success ? 200 : 500).json(result);
    } catch (err) {
      console.error("Erro interno:", err);
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  },

  async createBranch(req: Request, res: Response) {
    try {
      const result = await BranchService.addBranch(req.body);
      res.status(result.success ? 201 : 500).json(result);
    } catch (err) {
      console.error("Erro interno:", err);
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  },

  async updateBranch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await BranchService.updateBranch(id, req.body);
      res.status(result.success ? 200 : 500).json(result);
    } catch (err) {
      console.error("Erro interno:", err);
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  },

  async deleteBranch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await BranchService.deleteBranch(id);
      res.status(result.success ? 200 : 500).json(result);
    } catch (err) {
      console.error("Erro interno:", err);
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  },
};
