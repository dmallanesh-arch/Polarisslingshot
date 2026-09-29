import { Router } from 'express';
import { dealers, isValidPostalCode, normalizePostalCode } from '@slingshot/shared';

export const dealersRouter = Router();

dealersRouter.get('/', (req, res) => {
  const postal = typeof req.query.postal === 'string' ? req.query.postal : '';
  if (!isValidPostalCode(postal)) {
    res.status(400).json({ error: 'Please enter a valid Canadian postal code (e.g. M5V 2T6).' });
    return;
  }
  const code = normalizePostalCode(postal);
  const demoOnly = req.query.demo === 'true';
  const matches = dealers.filter(
    (d) => d.fsaPrefixes.includes(code[0]) && (!demoOnly || d.demo),
  );
  res.json({ postal: code, dealers: matches });
});
