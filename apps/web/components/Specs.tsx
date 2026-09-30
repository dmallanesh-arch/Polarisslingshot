'use client';

import { getSpecs, type TransmissionId } from '@slingshot/shared';
import { useState } from 'react';
import { PrintIcon } from './Icons';

const TABS: { id: TransmissionId; label: string }[] = [
  { id: 'manual', label: 'Manual' },
  { id: 'auto', label: 'AutoDrive' },
];

/** Full spec sheet: accordion per spec group, switchable by transmission. */
export function Specs() {
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
    <div className="full-specs">
      <div className="full-specs__head">
        <div className="toggle" role="tablist" aria-label="Transmission">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={trans === t.id}
              className={trans === t.id ? 'is-active' : undefined}
              onClick={() => setTrans(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="btn-row">
          <button className="btn btn--outline btn--sm" onClick={() => setOpen(allOpen ? new Set() : new Set(groups.map((g) => g.group)))}>
            {allOpen ? 'Collapse all' : 'Expand all'}
          </button>
          <button className="btn btn--outline btn--sm" onClick={() => window.print()}>
            <PrintIcon /> Print specs
          </button>
        </div>
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
    </div>
  );
}
