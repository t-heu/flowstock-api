import { v4 as uuid } from "uuid";
import { Request, Response, NextFunction } from "express";

export function correlationId(req: Request, res: Response, next: NextFunction) {
  const id = uuid();

  req.id = id; // anexamos o ID à requisição
  res.setHeader("X-Correlation-ID", id); // devolvemos para o cliente

  next();
}
