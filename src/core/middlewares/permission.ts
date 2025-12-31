import type { MiddlewareHandler } from 'hono';
import type { UserSession } from './authenticate';

export const allowRoles =
  (...roles: UserSession['role'][]): MiddlewareHandler =>
  async (c, next) => {
    const user = c.get('user') as UserSession | undefined;

    if (!user) {
      return c.json(
        { error: 'Não autenticado' },
        401
      );
    }

    if (!roles.includes(user.role)) {
      return c.json(
        { error: 'Sem permissão' },
        403
      );
    }

    await next();
  };
