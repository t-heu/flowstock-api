import { Hono } from 'hono';

import { stockController } from './stock.controller';
import { authenticate } from '../../core/middlewares/authenticate';
import { allowRoles } from '../../core/middlewares/permission';

const stockRoutes = new Hono();

stockRoutes.get(
  '/',
  authenticate,
  allowRoles('admin', 'manager', 'operator'),
  stockController.getAllStock
);

export default stockRoutes;