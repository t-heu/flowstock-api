import { Router } from "express";
import { stockController } from "./stock.controller";

import { authenticate } from "../../core/middlewares/authenticate";
import { allowRoles } from "../../core/middlewares/permission";

const router = Router();

router.get("/", authenticate, allowRoles("admin", "manager", "operator"), stockController.getAllStock);

export default router;
