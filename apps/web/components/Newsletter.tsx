'use client';

import { isValidEmail } from '@slingshot/shared';
import { useState, type FormEvent } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }
    setBusy(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const body = await res.json();
      setMessage(res.ok ? body.message : body.error ?? 'Something went wrong.');
      if (res.ok) setEmail('');
    } catch {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="newsletter__form" onSubmit={onSubmit} noValidate>
      <label htmlFor="email" className="visually-hidden">Email address</label>
      <input
        id="email"
        type="email"
        placeholder="Email address"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button className="btn btn--primary" type="submit" disabled={busy}>
        {busy ? 'Signing up…' : 'Sign Up'}
      </button>
      <p className="small" role="status" aria-live="polite">{message}</p>
    </form>
  );
}
