import { Request, Response } from "express";

import {movementService} from "./movement.service";

export const movementController = {
  async getAllMovement(req: Request, res: Response) {
    try {
      const user = req.user;
      const typeQuery = req.query.type;

      // Verifica se o typeQuery é válido
      if (typeQuery !== "entrada" && typeQuery !== "saida") {
        return res.status(400).json({ success: false, message: "Tipo inválido" });
      }

      const result = await movementService.getMovements(user, typeQuery); // agora é só "entrada" | "saida"
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
