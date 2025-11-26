import { Router } from "express";

import { productsController } from "./products.controller";
import { authenticate } from "../../middlewares/authenticate";
import { allowRoles } from "../../middlewares/permission";
import { validate } from "../../middlewares/validate";

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
