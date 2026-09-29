import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container" style={{ minHeight: '70vh', display: 'grid', placeContent: 'center', gap: 24, textAlign: 'center' }}>
      <p className="eyebrow" style={{ justifyContent: 'center' }}>404</p>
      <h1 className="h1">Wrong turn</h1>
      <p className="muted">The page you are looking for does not exist.</p>
      <Link className="btn btn--primary" href="/en-ca/slingshot-sl">Back to Slingshot SL</Link>
    </main>
  );
}
