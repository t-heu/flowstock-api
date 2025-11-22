import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { authenticate } from "../middlewares/authenticate";
import { allowRoles } from "../middlewares/permission";

const router = Router();

router.get("/", authenticate, allowRoles("admin", "manager"), userController.getAll);
router.post("/", authenticate, allowRoles("admin"), userController.create);
router.put("/:id", authenticate, allowRoles("admin", "manager"), userController.update);
router.delete("/:id", authenticate, allowRoles("admin"), userController.remove);

export default router;
