import { Router } from "express";
import { productsController } from "../controllers/products.controller";
import { authenticate } from "../middlewares/authenticate";
import { allowRoles } from "../middlewares/permission";

const router = Router();

router.get("/", authenticate, allowRoles("admin", "manager", "operator"), productsController.list);
router.post("/", authenticate, allowRoles("admin", "manager"), productsController.create);
router.put("/:id", authenticate, allowRoles("admin", "manager"), productsController.update);
router.delete("/:id", authenticate, allowRoles("admin"), productsController.delete);

export default router;
