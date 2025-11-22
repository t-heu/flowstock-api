import { Request, Response } from "express";
import * as BranchService from "../services/branch.service";

export const branchController = {
  async getAll(req: Request, res: Response) {
    const result = await BranchService.getBranches();
    res.status(result.success ? 200 : 500).json(result);
  },

  async create(req: Request, res: Response) {
    const result = await BranchService.addBranch(req.body);
    res.status(result.success ? 201 : 500).json(result);
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const result = await BranchService.updateBranch(id, req.body);
    res.status(result.success ? 200 : 500).json(result);
  },

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    const result = await BranchService.deleteBranch(id);
    res.status(result.success ? 200 : 500).json(result);
  },
};
