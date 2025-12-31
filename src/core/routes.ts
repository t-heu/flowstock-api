import { Hono } from 'hono';

import branchRoutes from "../modules/branchs/branch.routes";
import stockRoutes from "../modules/stocks/stock.routes";
import authRoutes from "../modules/auth/auth.routes";
import movementRoutes from "../modules/movements/movement.routes";
import userRoutes from "../modules/users/user.routes";
import reportRoutes from "../modules/reports/report.routes";
import statsRoutes from "../modules/stats/stats.routes";
import productRoutes from "../modules/products/products.routes";
import healthRoutes from "../modules/health/health.routes";

const router = new Hono();

router.route('/branches', branchRoutes);
router.route('/stock', stockRoutes);
router.route('/auth', authRoutes);
router.route('/movements', movementRoutes);
router.route('/users', userRoutes);
router.route('/products', productRoutes);
router.route('/report', reportRoutes);
router.route('/stats', statsRoutes);
router.route('/health', healthRoutes);

export default router;
