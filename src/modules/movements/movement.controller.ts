import { Request, Response } from "express";

import * as movementService from "./movement.service";

export const movementController = {
  async getAllMovement(req: Request, res: Response) {
    try {
      const type = req.query.type;
      const user = req.user;
  
      const result = await movementService.getMovements(user, type);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (err) {
      console.error("Erro interno:", err);
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  },

  async createMovement(req: Request, res: Response) {
    try {
      const result = await movementService.createMovement(req.body);
      return res.status(result.success ? 201 : 400).json(result);
    } catch (err) {
      console.error("Erro interno:", err);
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  },

  async deleteMovement(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await movementService.deleteMovement(id);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (err) {
      console.error("Erro interno:", err);
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  },
};
