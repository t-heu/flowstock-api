import { Router } from "express";

import { userController } from "./user.controller";
import { authenticate } from "../../middlewares/authenticate";
import { allowRoles } from "../../middlewares/permission";

const router = Router();

router.get("/", authenticate, allowRoles("admin", "manager"), userController.getAllUser);
router.post("/", authenticate, allowRoles("admin"), userController.createUser);
router.put("/:id", authenticate, allowRoles("admin", "manager"), userController.updateUser);
router.delete("/:id", authenticate, allowRoles("admin"), userController.removeUser);

export default router;
