import { Hono } from 'hono';

import { reportController } from './report.controller';
import { authenticate } from '../../core/middlewares/authenticate';
import { allowRoles } from '../../core/middlewares/permission';

const reportRoutes = new Hono();

reportRoutes.get(
  '/detailed',
  authenticate,
  allowRoles('admin', 'manager', 'operator'),
  reportController.getReportDetailed
);

export default reportRoutes;