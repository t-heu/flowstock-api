import { Router } from "express";

import { reportController } from "./report.controller";

import { allowRoles } from "../../middlewares/permission";
import { authenticate } from "../../middlewares/authenticate";

const router = Router();

router.get("/detailed", authenticate, allowRoles("admin", "manager", "operator"), reportController.getReportDetailed);

export default router;
