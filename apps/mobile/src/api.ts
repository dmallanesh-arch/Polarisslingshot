import {
  accessories,
  disclaimers,
  lineup,
  offers,
  slingshotSL,
  type Dealer,
  type LineupModel,
  type ModelPage,
} from '@slingshot/shared';

export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000';

export interface ModelPageData {
  model: ModelPage;
  lineup: LineupModel[];
  offers: typeof offers;
  accessories: typeof accessories;
  disclaimers: typeof disclaimers;
}

export const fallbackPage: ModelPageData = { model: slingshotSL, lineup, offers, accessories, disclaimers };

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(`${API_URL}${path}`, { ...init, signal: controller.signal });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error ?? `Request failed (${res.status})`);
    return body as T;
  } finally {
    clearTimeout(timer);
  }
}

/** Loads the model page from the Express API, falling back to bundled data. */
export async function fetchModelPage(id: string): Promise<ModelPageData> {
  try {
    return await request<ModelPageData>(`/api/models/${id}`);
  } catch {
    return fallbackPage;
  }
}

export function findDealers(postal: string) {
  return request<{ postal: string; dealers: Dealer[] }>(`/api/dealers?postal=${encodeURIComponent(postal)}`);
}

export function subscribe(email: string) {
  return request<{ message: string }>('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}
