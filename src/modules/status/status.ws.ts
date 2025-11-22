import { WebSocketServer } from "ws";

import { getCurrentStatus } from "./status.service";

const clients: Set<any> = new Set();

export function setupStatusWS(server: any) {
  const wss = new WebSocketServer({ server, path: "/ws/status" });

  wss.on("connection", (ws) => {
    clients.add(ws);
    console.log("Cliente WS conectado");

    // envia status inicial
    ws.send(JSON.stringify({ status: getCurrentStatus() }));

    ws.on("close", () => clients.delete(ws));

    ws.on("error", (err) => {
      console.error("Erro WS:", err);
      if (ws.readyState === 1) {
        ws.send(JSON.stringify({ status: "erro", message: "Erro no servidor WS" }));
      }
    });
  });
}
