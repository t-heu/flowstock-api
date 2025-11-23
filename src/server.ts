import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import app from "./app";
import { setupStatusWS } from "./modules/status/status.ws";

const PORT = process.env.PORT || 3333;

// HTTP server
const server = createServer(app);

// Inicia servidor
server.listen(Number(PORT), "0.0.0.0", 0, () => {
  console.log(`🔥 API rodando na porta ${PORT}`)
  // Inicializa WebSocket do módulo status
  setupStatusWS(server);
});

// Captura erros globais para não derrubar o servidor
process.on("uncaughtException", (err) => {
  console.error("Erro não tratado (uncaughtException):", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Rejeição de promessa não tratada:", reason);
});
