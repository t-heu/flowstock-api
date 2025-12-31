import { Hono } from 'hono';

import { movementController } from './movement.controller';

import { authenticate } from '../../core/middlewares/authenticate';
import { allowRoles } from '../../core/middlewares/permission';
import { validate } from '../../core/middlewares/validate';

import { MovementSchema } from './movement.schema';

const movementRoutes = new Hono();

movementRoutes.get(
  '/',
  authenticate,
  allowRoles('admin', 'manager', 'operator'),
  movementController.getAllMovement
);

movementRoutes.post(
  '/',
  authenticate,
  allowRoles('admin', 'manager', 'operator'),
  validate(MovementSchema),
  movementController.createMovement
);

movementRoutes.delete(
  '/:id',
  authenticate,
  allowRoles('admin', 'manager'),
  movementController.deleteMovement
);

export default movementRoutes;
