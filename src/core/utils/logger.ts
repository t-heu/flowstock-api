import pino from "pino";

const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transport: process.env.NODE_ENV === "production" ? undefined : {
    target: "pino-pretty", // string com o nome do módulo
    options: { colorize: true }
  }
});

export default logger;
