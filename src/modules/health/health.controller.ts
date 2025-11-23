import { Request, Response } from "express";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function getHealth(req: Request, res: Response) {
  try {
    // --- 1️⃣ Auth Health ---
    let authStatus: "online" | "offline" = "offline";
    try {
      const authRes = await fetch(`${SUPABASE_URL}/auth/v1/health`, {
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
      });
      authStatus = authRes.ok ? "online" : "offline";
    } catch {
      authStatus = "offline";
    }

    // --- 2️⃣ Postgres Health via /rest-admin/v1/live ---
    let dbStatus: "online" | "offline" = "offline";
    try {
      const liveRes = await fetch(`${SUPABASE_URL}/rest-admin/v1/live`, {
        method: "HEAD",
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
      });
      dbStatus = liveRes.ok ? "online" : "offline";
    } catch {
      dbStatus = "offline";
    }

    // --- 3️⃣ API Health (Server) ---
    // Aqui o servidor está respondendo → podemos considerar online
    let apiStatus: "online" | "offline" = "online";

    // --- 4️⃣ Retorna resultado consolidado ---
    res.json({
      api: apiStatus,
      auth: authStatus,
      database: dbStatus,
    });

  } catch (err) {
    res.status(500).json({
      api: "offline",
      auth: "offline",
      database: "offline",
      details: (err as Error).message,
    });
  }
}
