import { Hono } from 'hono';

import { getHealth } from './health.controller';

const healthRoutes = new Hono();

healthRoutes.get('/', getHealth);

export default healthRoutes;