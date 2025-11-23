import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { errorHandler } from "./middlewares/errorHandler";
import mainRoutes from "./routes";
import logger from "./logger";

const app = express();

// Middlewares globais
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requisições por IP a cada 15 min
  message: {
    status: "error",
    message: "Muitas requisições, tente novamente mais tarde."
  }
});

app.set('trust proxy', 1);
app.use(helmet());                 // Headers de segurança
app.use(limiter);       // Limite de requisições
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(compression());

// Rotas
app.use("/api", mainRoutes);

// Rota 404
app.use((req, res, next) => {
  logger.info("404 Not Found");
  res.status(404).json({
    status: "error",
    message: "404 Not Found",
  });
});

// Middleware global de erros (deve vir depois das rotas)
app.use(errorHandler);

export default app;
