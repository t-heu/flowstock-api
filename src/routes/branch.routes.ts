import { Router } from "express";
import {branchController} from "../controllers/branch.controller";

import { authenticate } from "../middlewares/authenticate";
import { allowRoles } from "../middlewares/permission";

const router = Router();

router.get("/", authenticate, allowRoles("admin", "manager", "operator"), branchController.getAll);
router.post("/", authenticate, allowRoles("admin", "manager"), branchController.create);
router.put("/:id", authenticate, allowRoles("admin", "manager"), branchController.update);
router.delete("/:id", authenticate, allowRoles("admin", "manager"), branchController.remove);

export default router;
