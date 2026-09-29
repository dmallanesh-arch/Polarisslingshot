import { createApp } from './app.js';

const port = Number(process.env.PORT ?? 4000);
const corsOrigins = (process.env.CORS_ORIGINS ?? '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

createApp({ corsOrigins }).listen(port, () => {
  console.log(`Slingshot API listening on http://localhost:${port}`);
});
