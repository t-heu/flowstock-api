import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";

import app from "./app";
import logger from "./logger";

const PORT = process.env.PORT || 3333;

const server = createServer(app);

server.listen(Number(PORT), "0.0.0.0", 0, () => {
  logger.info(`API rodando na porta ${PORT}`)
});
