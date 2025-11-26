import { Request, Response, NextFunction } from "express";

import {ApiError} from "../errors/ApiError";

import logger from "../logger";

// Middleware global de tratamento de erros
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      correlationId: req.id,
    });
  }

  logger.warn("Erro no servidor:", err);

  // Retorna erro padronizado para o front
  res.status(500).json({
    success: false,
    message: "Ocorreu um erro no servidor",
    correlationId: req.id,
  });
}
