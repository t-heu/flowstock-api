import { Router } from "express";
import { statsController } from "../controllers/stats.controller";

import { allowRoles } from "../middlewares/permission";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.get("/", authenticate, allowRoles("admin", "manager", "operator"), statsController.get);

export default router;
