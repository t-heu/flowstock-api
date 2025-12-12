import { Router } from "express";

import { authController } from "./auth.controller";
import { validate } from "../../core/middlewares/validate";

import { LoginSchema } from "./auth.schema";

const router = Router();

router.post("/login", 
  validate(LoginSchema),
  authController.login,
);

export default router;
