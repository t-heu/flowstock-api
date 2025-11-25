import { Request, Response } from "express";
import { checkAPI, checkDatabase } from "./health.service";

export async function getHealth(req: Request, res: Response) {
  const api = await checkAPI();
  const database = await checkDatabase();

  return res.json({
    api,
    database,
  });
}
