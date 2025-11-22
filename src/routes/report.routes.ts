import { Router } from "express";
import { reportController } from "../controllers/report.controller";

import { allowRoles } from "../middlewares/permission";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.get("/detailed", authenticate, allowRoles("admin", "manager", "operator"), reportController.getDetailed);

export default router;
