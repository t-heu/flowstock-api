import { Router } from "express";

import branchRoutes from "./modules/branchs/branch.routes";
import branchStockRoutes from "./modules/stocks/stock.routes";
import authRoutes from "./modules/auth/auth.routes";
import movementRoutes from "./modules/movements/movement.routes";
import userRoutes from "./modules/users/user.routes";
import reportRoutes from "./modules/reports/report.routes";
import statsRoutes from "./modules/stats/stats.routes";
import productRoutes from "./modules/products/products.routes";
import healthRoutes from "./modules/health/health.routes";

const router = Router();

router.use("/branches", branchRoutes);
router.use("/stock", branchStockRoutes);
router.use("/auth", authRoutes);
router.use("/movements", movementRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/report", reportRoutes);
router.use("/stats", statsRoutes);
router.use("/health", healthRoutes); //healthcheck

export default router;
