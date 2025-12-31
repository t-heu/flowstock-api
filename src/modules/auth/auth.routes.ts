import { Hono } from 'hono';

import { authController } from './auth.controller';
import { validate } from '../../core/middlewares/validate';

import { LoginSchema } from './auth.schema';

const router = new Hono();

router.post(
  '/login',
  validate(LoginSchema),
  authController.login
);

export default router;
