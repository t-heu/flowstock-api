import express from "express";
import cors from "cors";
import compression from "compression";

import { errorHandler } from "./middlewares/errorHandler";
import mainRoutes from "./routes";

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(compression());

// Rotas
app.use("/api", mainRoutes);

// Rota 404
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "404 Not Found",
  });
});

// Middleware global de erros (deve vir depois das rotas)
app.use(errorHandler);

export default app;
