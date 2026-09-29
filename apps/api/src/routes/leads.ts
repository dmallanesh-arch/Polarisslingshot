import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import { z } from 'zod';
import { isValidPostalCode, normalizePostalCode, slingshotSL } from '@slingshot/shared';

export const leadsRouter = Router();

/*
 * In-memory stores keep the demo self-contained. Swap these for your CRM,
 * email provider or database before going to production.
 */
const subscribers = new Set<string>();
const quotes: Array<Record<string, unknown>> = [];

const newsletterBody = z.object({
  email: z.string().trim().toLowerCase().email(),
});

leadsRouter.post('/newsletter', (req, res) => {
  const parsed = newsletterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Please enter a valid email address.' });
    return;
  }
  const { email } = parsed.data;
  const alreadySubscribed = subscribers.has(email);
  subscribers.add(email);
  res.status(alreadySubscribed ? 200 : 201).json({
    message: alreadySubscribed ? "You're already on the list." : "Thanks! You're signed up.",
  });
});

const colorIds = slingshotSL.colors.map((c) => c.id) as [string, ...string[]];

const quoteBody = z.object({
  modelId: z.literal('sl'),
  colorId: z.enum(colorIds),
  transmission: z.enum(['manual', 'auto']),
  email: z.string().trim().toLowerCase().email(),
  postal: z.string().refine(isValidPostalCode, 'Invalid postal code').transform(normalizePostalCode),
});

leadsRouter.post('/quotes', (req, res) => {
  const parsed = quoteBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid quote request', issues: parsed.error.flatten().fieldErrors });
    return;
  }
  const quote = { id: randomUUID(), createdAt: new Date().toISOString(), ...parsed.data };
  quotes.push(quote);
  res.status(201).json({ quote });
});
