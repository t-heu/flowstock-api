import { Request, Response } from "express";

import { prisma } from "../../lib/prisma";

// Só vai checar se a API responde (não usa chave secreta)
export async function getHealth(req: Request, res: Response) {
  try {
    // API Health → sempre online se o servidor responder
    const apiStatus: "online" | "offline" = "online";

    // Banco Health → teste simples, sem expor chave secreta
    let databaseStatus: "online" | "offline" = "offline";

    try {
      // Aqui você pode testar apenas se consegue conectar com o Prisma
      // ou rodar uma query simples sem precisar da chave do Supabase.
      // Exemplo usando Prisma:
      const result = await prisma.$queryRaw`SELECT 1`;
      databaseStatus = result ? "online" : "offline";
    } catch {
      databaseStatus = "offline";
    }

    // Retorna resultado público
    res.json({
      api: apiStatus,
      database: databaseStatus,
    });
  } catch (err: any) {
    res.status(500).json({
      api: "offline",
      database: "offline",
      details: err.message,
    });
  }
}
