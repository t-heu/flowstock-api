import { Router } from "express";

import {movementController} from "./movement.controller";

import { allowRoles } from "../../middlewares/permission";
import { authenticate } from "../../middlewares/authenticate";

const router = Router();

router.get("/", authenticate, allowRoles("admin", "manager", "operator"), movementController.getAllMovement);
router.post("/", authenticate, allowRoles("admin", "manager", "operator"), movementController.createMovement);
router.delete("/:id", authenticate, allowRoles("admin", "manager"), movementController.deleteMovement);

export default router;
