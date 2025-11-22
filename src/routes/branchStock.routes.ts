import { Router } from "express";
import { branchStockController } from "../controllers/branchStock.controller";

import { authenticate } from "../middlewares/authenticate";
import { allowRoles } from "../middlewares/permission";

const router = Router();

router.get("/", authenticate, allowRoles("admin", "manager", "operator"), branchStockController.getBranchStock);

export default router;
