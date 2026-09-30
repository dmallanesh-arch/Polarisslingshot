import { Router } from 'express';
import { z } from 'zod';
import {
  accessories,
  accessorySeries,
  disclaimers,
  getSpecs,
  lineup,
  offers,
  slingshotSL,
  specHighlights,
} from '@slingshot/shared';

export const modelsRouter = Router();

/** Full pages available by model id. Extend as more model pages are built. */
const pages = { sl: slingshotSL } as const;

modelsRouter.get('/', (_req, res) => {
  res.json({ models: lineup });
});

modelsRouter.get('/:id', (req, res) => {
  const page = pages[req.params.id as keyof typeof pages];
  if (!page) {
    res.status(404).json({ error: `Model "${req.params.id}" not found` });
    return;
  }
  res.json({ model: page, lineup, offers, accessories, accessorySeries, disclaimers });
});

const specsQuery = z.object({
  transmission: z.enum(['manual', 'auto']).default('manual'),
});

modelsRouter.get('/:id/specs', (req, res) => {
  if (!(req.params.id in pages)) {
    res.status(404).json({ error: `Model "${req.params.id}" not found` });
    return;
  }
  const parsed = specsQuery.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: 'transmission must be "manual" or "auto"' });
    return;
  }
  const { transmission } = parsed.data;
  res.json({ transmission, highlights: specHighlights, groups: getSpecs(transmission) });
});
