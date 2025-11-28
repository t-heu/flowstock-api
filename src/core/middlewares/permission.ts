// src/middlewares/permission.ts
import { Request, Response, NextFunction } from "express";

export const allowRoles =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Sem permissão" });
    }

    return next();
  };
