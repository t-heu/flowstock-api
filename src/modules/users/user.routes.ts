import { Hono } from 'hono';

import { userController } from './user.controller';
import { authenticate } from '../../core/middlewares/authenticate';
import { allowRoles } from '../../core/middlewares/permission';
import { validate } from '../../core/middlewares/validate';

import { createUserSchema, updateUserSchema } from './user.schema';

const userRoutes = new Hono();

userRoutes.get(
  '/',
  authenticate,
  allowRoles('admin', 'manager'),
  userController.getAllUser
);

userRoutes.post(
  '/',
  authenticate,
  allowRoles('admin'),
  validate(createUserSchema),
  userController.createUser
);

userRoutes.put(
  '/:id',
  authenticate,
  allowRoles('admin', 'manager'),
  validate(updateUserSchema),
  userController.updateUser
);

userRoutes.delete(
  '/:id',
  authenticate,
  allowRoles('admin'),
  userController.removeUser
);

export default userRoutes;