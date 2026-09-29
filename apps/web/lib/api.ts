import 'server-only';
import {
  accessories,
  disclaimers,
  lineup,
  offers,
  slingshotSL,
  type Accessory,
  type LineupModel,
  type ModelPage,
  type Offer,
} from '@slingshot/shared';

export interface ModelPageData {
  model: ModelPage;
  lineup: LineupModel[];
  offers: Offer[];
  accessories: Accessory[];
  disclaimers: typeof disclaimers;
}

const API_URL = process.env.API_URL ?? 'http://localhost:4000';

const fallback: ModelPageData = { model: slingshotSL, lineup, offers, accessories, disclaimers };

/**
 * Loads page content from the Express API (revalidated every 5 minutes).
 * Falls back to the bundled shared data so the site still builds and renders
 * when the API is offline.
 */
export async function getModelPage(id: string): Promise<ModelPageData> {
  try {
    const res = await fetch(`${API_URL}/api/models/${id}`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    return (await res.json()) as ModelPageData;
  } catch {
    return fallback;
  }
}
