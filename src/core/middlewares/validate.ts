import { z } from 'zod';
import type { MiddlewareHandler } from 'hono';

export const validate =
  (schema: z.ZodSchema): MiddlewareHandler =>
  async (c, next) => {
    try {
      const body = await c.req.json();
      const parsed = schema.parse(body);

      // salva o body validado no contexto
      c.set('validatedBody', parsed);

      await next();
    } catch (err: any) {
      return c.json(
        {
          status: 'error',
          message: 'Validation error',
          errors: err.errors ?? err.message
        },
        400
      );
    }
  };
