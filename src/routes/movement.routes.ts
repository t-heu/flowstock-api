import { Router } from "express";
import {movementController} from "../controllers/movement.controller";

import { allowRoles } from "../middlewares/permission";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.get("/", authenticate, allowRoles("admin", "manager", "operator"), movementController.getAll);
router.post("/", authenticate, allowRoles("admin", "manager", "operator"), movementController.create);
router.delete("/:id", authenticate, allowRoles("admin", "manager"), movementController.remove);

export default router;
