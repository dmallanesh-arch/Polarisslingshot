import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import { dealersRouter } from './routes/dealers.js';
import { leadsRouter } from './routes/leads.js';
import { modelsRouter } from './routes/models.js';

export interface AppOptions {
  corsOrigins?: string[];
}

export function createApp({ corsOrigins = [] }: AppOptions = {}) {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: corsOrigins.length ? corsOrigins : true }));
  app.use(express.json({ limit: '20kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
  });

  app.use('/api/models', modelsRouter);
  app.use('/api/dealers', dealersRouter);
  app.use('/api', leadsRouter);

  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  const onError: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  };
  app.use(onError);

  return app;
}
