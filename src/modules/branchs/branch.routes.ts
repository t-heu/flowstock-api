import { Router } from "express";

import {branchController} from "./branch.controller";

import { authenticate } from "../../core/middlewares/authenticate";
import { allowRoles } from "../../core/middlewares/permission";
import { validate } from "../../core/middlewares/validate";

import { CreateBranchSchema, UpdateBranchSchema } from "./branchs.schema";

const router = Router();

router.get("/", authenticate, allowRoles("admin", "manager", "operator"), branchController.getAllBranch);
router.post("/", 
  authenticate, 
  allowRoles("admin", "manager"), 
  validate(CreateBranchSchema),
  branchController.createBranch
);
router.put("/:id", 
  authenticate, 
  allowRoles("admin", "manager"), 
  validate(UpdateBranchSchema),
  branchController.updateBranch
);
router.delete("/:id", authenticate, allowRoles("admin", "manager"), branchController.deleteBranch);

export default router;
