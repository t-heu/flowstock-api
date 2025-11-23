import { Request, Response } from "express";

import { supabase } from "../../config/supabase";

export async function getHealth(req: Request, res: Response) {
  try {
    // Checa conexão com Supabase
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .limit(1);

    if (error) {
      return res.status(503).json({
        status: "error",
        database: "offline",
        details: error.message,
      });
    }

    // Tudo ok
    res.json({
      status: "ok",
      database: "online",
      api: "online",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      api: "offline",
      details: (err as Error).message,
    });
  }
}
