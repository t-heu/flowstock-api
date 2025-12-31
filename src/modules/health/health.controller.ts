import type { Context } from 'hono';
import { checkAPI, checkDatabase } from './health.service';

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), ms)
    )
  ]);
}

export const getHealth = async (c: Context) => {
  let api: any;
  let database: any;

  try {
    api = await checkAPI();
  } catch {
    api = {
      status: 'error'
    };
  }

  try {
    database = await withTimeout(
      checkDatabase(),
      3000
    );
  } catch {
    database = {
      status: 'error'
    };
  }

  const healthy =
    api?.status === 'ok' &&
    database?.status === 'ok';

  return c.json(
    {
      status: healthy ? 'ok' : 'degraded',
      api,
      database,
      timestamp: new Date().toISOString()
    },
    healthy ? 200 : 503
  );
};
