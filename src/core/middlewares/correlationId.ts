import type { MiddlewareHandler } from 'hono';

export const correlationId: MiddlewareHandler = async (c, next) => {
  const id = crypto.randomUUID();

  c.set('correlationId', id);
  c.header('X-Correlation-ID', id);

  await next();
};
