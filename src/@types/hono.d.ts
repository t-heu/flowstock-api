import 'hono';
import type { UserSession } from '../core/middlewares/authenticate';

declare module 'hono' {
  interface ContextVariableMap {
    user?: UserSession;
    validatedBody?: any;
    correlationId?: string;
  }
}
