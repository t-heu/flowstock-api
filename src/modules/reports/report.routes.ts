import { Router } from "express";

import { reportController } from "./report.controller";

import { allowRoles } from "../../core/middlewares/permission";
import { authenticate } from "../../core/middlewares/authenticate";

const router = Router();

router.get("/detailed", authenticate, allowRoles("admin", "manager", "operator"), reportController.getReportDetailed);

export default router;
