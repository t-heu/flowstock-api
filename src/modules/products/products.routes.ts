import { Router } from "express";

import { productsController } from "./products.controller";
import { authenticate } from "../../middlewares/authenticate";
import { allowRoles } from "../../middlewares/permission";

const router = Router();

router.get("/", authenticate, allowRoles("admin", "manager", "operator"), productsController.getAllProducts);
router.post("/", authenticate, allowRoles("admin", "manager"), productsController.createProduct);
router.put("/:id", authenticate, allowRoles("admin", "manager"), productsController.updateProduct);
router.delete("/:id", authenticate, allowRoles("admin"), productsController.deleteProduct);

export default router;
