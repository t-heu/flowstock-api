// api/server.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';
import logger from '../src/logger';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await new Promise<void>((resolve, reject) => {
      app(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  } catch (err) {
    logger.error('Erro na função serverless:', err);
    res.status(500).send('Erro interno');
  }
}
