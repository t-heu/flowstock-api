import { Router } from "express";

import { authController } from "./auth.controller";
import { validate } from "../../middlewares/validate";

import { LoginSchema } from "./auth.schema";

const router = Router();

router.post("/login", 
  authController.login,
  validate(LoginSchema)
);

export default router;
