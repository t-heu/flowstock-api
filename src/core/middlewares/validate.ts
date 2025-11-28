import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.data = schema.parse(req.body);
      return next();
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: "Dados inválidos",
        issues: err.errors,
      });
    }
  };
}
