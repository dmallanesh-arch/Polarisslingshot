'use client';

import { isValidPostalCode, type Dealer } from '@slingshot/shared';
import { useState, type FormEvent } from 'react';

type Status =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'done'; postal: string; dealers: Dealer[] };

export function DealerLocator() {
  const [postal, setPostal] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidPostalCode(postal)) {
      setStatus({ kind: 'error', message: 'Please enter a valid Canadian postal code (e.g. M5V 2T6).' });
      return;
    }
    setStatus({ kind: 'loading' });
    try {
      const res = await fetch(`/api/dealers?postal=${encodeURIComponent(postal)}`);
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? 'Search failed');
      setStatus({ kind: 'done', postal: body.postal, dealers: body.dealers });
    } catch (err) {
      setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'Search failed. Please try again.' });
    }
  }

  return (
    <section className="dealer" id="dealer" aria-labelledby="dealer-title">
      <div className="container dealer__inner">
        <div className="dealer__card reveal" id="demo">
          <p className="eyebrow">Experience it</p>
          <h2 className="h2">Book a demo ride</h2>
          <p>Nothing compares to getting behind the wheel. Rent or demo a Slingshot near you.</p>
          <a className="btn btn--ghost" href="#dealer">Find a demo</a>
        </div>

        <div className="dealer__card dealer__card--accent reveal">
          <p className="eyebrow">Find a dealer</p>
          <h2 className="h2" id="dealer-title">Visit your local dealer</h2>
          <form className="dealer__form" onSubmit={onSubmit} noValidate>
            <label htmlFor="postal" className="visually-hidden">Postal code</label>
            <input
              id="postal"
              name="postal"
              type="text"
              placeholder="Enter postal code (e.g. M5V 2T6)"
              autoComplete="postal-code"
              maxLength={7}
              value={postal}
              onChange={(e) => setPostal(e.target.value.toUpperCase())}
              aria-invalid={status.kind === 'error'}
            />
            <button className="btn btn--dark" type="submit" disabled={status.kind === 'loading'}>
              {status.kind === 'loading' ? 'Searching…' : 'Search'}
            </button>
          </form>

          <div role="status" aria-live="polite" style={{ width: '100%' }}>
            {status.kind === 'error' && <p className="small">{status.message}</p>}
            {status.kind === 'done' && status.dealers.length === 0 && (
              <p className="small">No dealers found near {status.postal}. Try a nearby postal code.</p>
            )}
            {status.kind === 'done' && status.dealers.length > 0 && (
              <ul className="dealer__results">
                {status.dealers.map((d) => (
                  <li key={d.id}>
                    <div>
                      <strong>{d.name}</strong>
                      {d.demo && <span className="demo">Demo rides</span>}
                      <div className="small">{d.city}, {d.province}</div>
                    </div>
                    <a className="small" href={`tel:${d.phone.replace(/\D/g, '')}`}>{d.phone}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
