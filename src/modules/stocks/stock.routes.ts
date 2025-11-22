import { Router } from "express";
import { stockController } from "./stock.controller";

import { authenticate } from "../../middlewares/authenticate";
import { allowRoles } from "../../middlewares/permission";

const router = Router();

router.get("/", authenticate, allowRoles("admin", "manager", "operator"), stockController.getAllStock);

export default router;
