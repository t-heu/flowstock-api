// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const userController = {
  async getAll(req: Request, res: Response) {
    const result = await userService.getAll();
    return res.status(result.success ? 200 : 400).json(result);
  },

  async create(req: Request, res: Response) {
    const result = await userService.create(req.body);
    return res.status(result.success ? 201 : 400).json(result);
  },

  async update(req: Request, res: Response) {
    const result = await userService.update(req.params.id, req.body);
    return res.status(result.success ? 200 : 400).json(result);
  },

  async remove(req: Request, res: Response) {
    const result = await userService.remove(req.params.id);
    return res.status(result.success ? 200 : 400).json(result);
  },
};
