import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { compress } from 'hono/compress';

import mainRoutes from './core/routes';
import { ApiError } from './core/errors/ApiError';
import { swagger } from './core/swagger';

const app = new Hono();

// CORS
app.use('*', cors());

// Compressão
app.use('*', compress());

// Correlation ID
app.use('*', async (c, next) => {
  const id = crypto.randomUUID();

  c.set('correlationId', id);
  c.header('x-correlation-id', id);

  await next();
});

// Logger
app.use('*', async (c, next) => {
  const start = Date.now();

  await next();

  const duration = Date.now() - start;

  console.log({
    id: c.get('correlationId'),
    method: c.req.method,
    path: c.req.path,
    status: c.res.status,
    duration: `${duration}ms`,
    agent: c.req.header('user-agent')
  });
});

app.route('/docs', swagger);

// Rotas
app.route('/api', mainRoutes);

// 404
app.notFound(c =>
  c.json(
    {
      status: 'error',
      message: '404 Not Found'
    },
    404
  )
);

// Error handler global
app.onError((err, c) => {
  // ApiError → resposta controlada
  if (err instanceof ApiError) {
    c.status(err.statusCode);

    return c.json({
      status: 'error',
      message: err.message,
      correlationId: c.get('correlationId'),
    });
  }

  console.error('Unhandled error:', err);

  return c.json(
    {
      status: 'error',
      message: 'Internal Server Error',
      correlationId: c.get('correlationId')
    },
    500
  );
});

export default app;
