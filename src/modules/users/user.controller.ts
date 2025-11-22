import { Request, Response } from "express";

import { userService } from "./user.service";

export const userController = {
  async getAllUser(req: Request, res: Response) {
    try {
      const result = await userService.getAllUser();
      return res.status(result.success ? 200 : 400).json(result);
    } catch (err) {
      console.error("Erro interno:", err);
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  },

  async createUser(req: Request, res: Response) {
    try {
      const result = await userService.createUser(req.body);
      return res.status(result.success ? 201 : 400).json(result);
    } catch (err) {
      console.error("Erro interno:", err);
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const result = await userService.updateUser(req.params.id, req.body);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (err) {
      console.error("Erro interno:", err);
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  },

  async removeUser(req: Request, res: Response) {
    try {
      const result = await userService.deleteUser(req.params.id);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (err) {
      console.error("Erro interno:", err);
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  },
};
