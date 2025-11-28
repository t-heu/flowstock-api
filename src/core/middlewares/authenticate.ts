import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface UserSession {
  id: string;
  role: "admin" | "manager" | "operator";
  department: string | null;
  branch_id: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserSession;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Token não enviado" });

    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) return res.status(401).json({ error: "Token inválido" });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserSession;
    req.user = decoded;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
