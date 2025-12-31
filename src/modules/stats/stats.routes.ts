import { Hono } from 'hono';

import { statsController } from './stats.controller';
import { authenticate } from '../../core/middlewares/authenticate';
import { allowRoles } from '../../core/middlewares/permission';

const statsRoutes = new Hono();

statsRoutes.get(
  '/',
  authenticate,
  allowRoles('admin', 'manager', 'operator'),
  statsController.getStats
);

export default statsRoutes;