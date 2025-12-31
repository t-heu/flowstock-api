import type { MiddlewareHandler } from 'hono';
import jwt from 'jsonwebtoken';

export interface UserSession {
  id: string;
  role: 'admin' | 'manager' | 'operator';
  department: string | null;
  branch_id: string | null;
}

export const authenticate: MiddlewareHandler = async (c, next) => {
  try {
    const authHeader = c.req.header('authorization');

    if (!authHeader) {
      return c.json({ error: 'Token não enviado' }, 401);
    }

    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) {
      return c.json({ error: 'Token inválido' }, 401);
    }

    const decoded = jwt.verify(
      token,
      c.env.JWT_SECRET
    ) as UserSession;

    c.set('user', decoded);

    await next();
  } catch (err) {
    return c.json(
      { error: 'Token inválido ou expirado' },
      401
    );
  }
};
