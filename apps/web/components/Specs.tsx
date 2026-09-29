'use client';

import { getSpecs, type Highlight, type TransmissionId } from '@slingshot/shared';
import { useState } from 'react';
import { PrintIcon } from './Icons';

const TABS: { id: TransmissionId; label: string }[] = [
  { id: 'manual', label: 'Manual' },
  { id: 'auto', label: 'AutoDrive' },
];

export function Specs({ highlights }: { highlights: Highlight[] }) {
  const [trans, setTrans] = useState<TransmissionId>('manual');
  const [open, setOpen] = useState<Set<string>>(() => new Set(['Engine']));
  const groups = getSpecs(trans);

  const toggle = (group: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });

  const allOpen = open.size === groups.length;

  return (
    <section className="specs" id="specs" aria-labelledby="specs-title">
      <div className="container">
        <header className="section-head section-head--row reveal">
          <div>
            <p className="eyebrow">Specifications</p>
            <h2 className="h1" id="specs-title">Specs</h2>
          </div>
          <div className="segmented" role="tablist" aria-label="Transmission">
            {TABS.map((t) => (
              <button key={t.id} role="tab" aria-selected={trans === t.id} onClick={() => setTrans(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </header>

        <div className="specs__highlights reveal">
          {highlights.map((h) => (
            <div key={h.label}>
              <strong>{h.value}</strong><small>{h.unit}</small>
              <span>{h.label}</span>
            </div>
          ))}
        </div>

        <div className="accordion">
          {groups.map((g) => {
            const isOpen = open.has(g.group);
            const panelId = `spec-${g.group.replace(/\W+/g, '-').toLowerCase()}`;
            return (
              <div className="acc-item" key={g.group}>
                <h3>
                  <button className="acc-item__head" aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggle(g.group)}>
                    {g.group}
                    <span className="acc-item__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div className={`acc-item__panel${isOpen ? ' is-open' : ''}`} id={panelId} role="region">
                  <div>
                    <table className="spec-table">
                      <tbody>
                        {g.rows.map(([k, v]) => (
                          <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="specs__foot">
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn--ghost" onClick={() => setOpen(allOpen ? new Set() : new Set(groups.map((g) => g.group)))}>
              {allOpen ? 'Collapse all' : 'Expand all'}
            </button>
            <button className="btn btn--ghost" onClick={() => window.print()}>
              <PrintIcon /> Print specs
            </button>
          </div>
          <a className="link-arrow" href="#compare">Compare with other models</a>
        </div>
      </div>
    </section>
  );
}
