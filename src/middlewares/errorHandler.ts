import { Request, Response, NextFunction } from "express";

import logger from "../logger";

// Middleware global de tratamento de erros
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.warn("Erro no servidor:", err);

  // Retorna erro padronizado para o front
  res.status(500).json({
    success: false,
    status: "error",
    error: "Ocorreu um erro no servidor",
    details: err.message || null, // opcional, ajuda no debug
  });
}
