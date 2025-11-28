import { Router } from "express";

import { productsController } from "./products.controller";
import { authenticate } from "../../core/middlewares/authenticate";
import { allowRoles } from "../../core/middlewares/permission";
import { validate } from "../../core/middlewares/validate";

import { ProductSchema, ProductUpdateSchema } from "./products.schema";

const router = Router();

router.get("/", authenticate, allowRoles("admin", "manager", "operator"), productsController.getAllProducts);
router.post("/", 
  authenticate, 
  allowRoles("admin", "manager"), 
  validate(ProductSchema),
  productsController.createProduct
);
router.put("/:id", 
  authenticate, 
  allowRoles("admin", "manager"), 
  validate(ProductUpdateSchema), 
  productsController.updateProduct
);
router.delete("/:id", authenticate, allowRoles("admin"), productsController.deleteProduct);

export default router;
