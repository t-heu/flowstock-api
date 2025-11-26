import { Router } from "express";

import { userController } from "./user.controller";
import { authenticate } from "../../middlewares/authenticate";
import { allowRoles } from "../../middlewares/permission";
import { validate } from "../../middlewares/validate";

import { createUserSchema, updateUserSchema } from "./user.schema";

const router = Router();

router.get("/", 
  authenticate, 
  allowRoles("admin", "manager"), 
  userController.getAllUser
);
router.post("/", 
  authenticate, 
  allowRoles("admin"), 
  validate(createUserSchema),
  userController.createUser
);
router.put("/:id", 
  authenticate, 
  allowRoles("admin", "manager"), 
  validate(updateUserSchema),
  userController.updateUser
);
router.delete("/:id", authenticate, allowRoles("admin"), userController.removeUser);

export default router;
