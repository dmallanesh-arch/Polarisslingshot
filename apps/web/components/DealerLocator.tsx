'use client';

import { isValidPostalCode, type Dealer } from '@slingshot/shared';
import Image from 'next/image';
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
    <section className="dealer section" id="dealer" aria-labelledby="dealer-title">
      <div className="container dealer__inner">
        <div className="dealer__copy">
          <Image src="/images/tools/test-drive.png" alt="" width={50} height={50} />
          <h2 className="section-title" id="dealer-title">Find A Dealer Near You</h2>
          <p>Enter your postal code to find a dealer, local pricing and demo rides near you.</p>
        </div>

        <div className="dealer__search">
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
