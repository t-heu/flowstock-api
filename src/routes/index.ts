import { Router } from "express";

import branchRoutes from "./branch.routes";
import branchStockRoutes from "./branchStock.routes";
import authRoutes from "./auth.routes";
import movementRoutes from "./movement.routes";
import userRoutes from "./user.routes";
import reportRoutes from "./report.routes";
import statsRoutes from "./stats.routes";
import productRoutes from "./products.routes";

const router = Router();

router.get("/status", async (_, res) => {
  // aqui você poderia checar banco, cache, etc
  const dbOk = true; // placeholder
  const cacheOk = true; // placeholder

  const overallStatus = dbOk && cacheOk ? "online" : "instavel";

  res.json({
    status: overallStatus,
    details: {
      database: dbOk ? "online" : "offline",
      cache: cacheOk ? "online" : "offline",
    },
  });
});

// Registrar módulos
router.use("/branches", branchRoutes);
router.use("/stock", branchStockRoutes);
router.use("/auth", authRoutes);
router.use("/movements", movementRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/report", reportRoutes);
router.use("/stats", statsRoutes);

export default router;
