import { prisma } from "../../lib/prisma";
import { performance } from "perf_hooks";

export async function checkAPI() {
  return {
    status: "healthy",
    uptime: process.uptime(),
    version: process.version,
  };
}

export async function checkDatabase() {
  try {
    const timer = performance.now();
    await prisma.$queryRaw`SELECT 1`;
    const latency = performance.now() - timer;

    const versionResult: any = await prisma.$queryRaw`SELECT version()`;
    const version = versionResult?.[0]?.version;

    return {
      status: "healthy",
      latency_ms: latency,
      version,
    };
  } catch {
    return {
      status: "unhealthy",
    };
  }
}
