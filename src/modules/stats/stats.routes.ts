import { Router } from "express";

import { statsController } from "./stats.controller";

import { allowRoles } from "../../core/middlewares/permission";
import { authenticate } from "../../core/middlewares/authenticate";

const router = Router();

router.get("/", authenticate, allowRoles("admin", "manager", "operator"), statsController.getStats);

export default router;
