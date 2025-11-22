import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";

import mainRoutes from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", mainRoutes);

const PORT = process.env.PORT || 3000;

// HTTP server
const server = createServer(app);

// WS server
const wss = new WebSocketServer({ server, path: "/ws/status" });

// Conjunto de clientes conectados
const clients: Set<any> = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  console.log("Cliente WS conectado");

  // envia status inicial
  ws.send(JSON.stringify({ status: "online" }));

  ws.on("close", () => clients.delete(ws));
});

// Função para enviar status apenas quando ele muda
let currentStatus: "online" | "offline" | "instavel" = "online";

export function updateStatus(newStatus: typeof currentStatus) {
  if (currentStatus === newStatus) return; // não envia se não mudou
  currentStatus = newStatus;

  for (const client of clients) {
    if (client.readyState === 1) {
      client.send(JSON.stringify({ status: currentStatus }));
    }
  }
}

server.listen(PORT, () => console.log(`🔥 API rodando na porta ${PORT}`));
