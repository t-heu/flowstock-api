import { Router } from "express";

import {movementController} from "./movement.controller";

import { allowRoles } from "../../core/middlewares/permission";
import { authenticate } from "../../core/middlewares/authenticate";
import { validate } from "../../core/middlewares/validate";

import { MovementSchema } from "./movement.schema";

const router = Router();

router.get("/", authenticate, allowRoles("admin", "manager", "operator"), movementController.getAllMovement);
router.post("/", 
  authenticate, 
  allowRoles("admin", "manager", "operator"),
  validate(MovementSchema),
  movementController.createMovement
);
router.delete("/:id", authenticate, allowRoles("admin", "manager"), movementController.deleteMovement);

export default router;
