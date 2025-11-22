import { Request, Response } from "express";
import * as movementService from "../services/movement.service";

export const movementController = {
  async getAll(req: Request, res: Response) {
    const type = req.query.type;
    const user = req.user;

    const result = await movementService.getMovements(user, type);
    return res.status(result.success ? 200 : 400).json(result);
  },

  async create(req: Request, res: Response) {
    const result = await movementService.createMovement(req.body);
    return res.status(result.success ? 201 : 400).json(result);
  },

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    const result = await movementService.deleteMovement(id);
    return res.status(result.success ? 200 : 400).json(result);
  },
};
