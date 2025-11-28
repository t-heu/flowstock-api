import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

export const swaggerMiddleware = [swaggerUi.serve, swaggerUi.setup(swaggerDocument)];
