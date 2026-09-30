'use client';

import { formatCAD, type ModelPage, type TransmissionId } from '@slingshot/shared';
import Image from 'next/image';
import { useState } from 'react';

/** "Transmission & Color Options": studio photo, price, transmission toggle and paint swatches. */
export function TrimColor({ model }: { model: ModelPage }) {
  const [transId, setTransId] = useState<TransmissionId>('manual');
  const [colorId, setColorId] = useState(model.colors[0].id);
  const trans = model.transmissions.find((t) => t.id === transId) ?? model.transmissions[0];
  const color = model.colors.find((c) => c.id === colorId) ?? model.colors[0];

  return (
    <section className="trim section" id="trim" aria-labelledby="trim-title">
      <div className="container">
        <h2 className="section-title" id="trim-title">Transmission &amp; Color Options</h2>

        <div className="trim__grid">
          <div className="trim__media">
            <Image
              key={color.id}
              src={color.image}
              alt={`${model.year} ${model.name} in ${color.name} (${trans.label})`}
              width={768}
              height={432}
              sizes="(max-width: 991px) 100vw, 58vw"
              priority
            />
          </div>

          <div className="trim__info">
            <h3 className="trim__name">{model.name} - {trans.label}</h3>
            <p className="trim__price">
              <span>Starting at</span> <strong>{formatCAD(trans.price)}</strong> <span>MSRP*</span>
            </p>
            <p className="trim__note">Plus freight and dealer set-up.</p>

            <p className="trim__label">Transmission Options</p>
            <div className="toggle" role="radiogroup" aria-label="Transmission">
              {model.transmissions.map((t) => (
                <button
                  key={t.id}
                  role="radio"
                  aria-checked={t.id === transId}
                  className={t.id === transId ? 'is-active' : undefined}
                  onClick={() => setTransId(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <p className="trim__label">
              <strong>{color.name}</strong> ({trans.label})
            </p>
            <ul className="swatches" role="radiogroup" aria-label="Color">
              {model.colors.map((c) => (
                <li key={c.id}>
                  <button
                    role="radio"
                    aria-checked={c.id === colorId}
                    aria-label={c.name}
                    title={c.name}
                    className={c.id === colorId ? 'is-active' : undefined}
                    onClick={() => setColorId(c.id)}
                  >
                    <Image src={c.swatchImage} alt="" width={58} height={58} />
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="trim__story-title">The Drive Starts Here</h3>
            <p className="trim__story">{model.story}</p>

            <div className="btn-row">
              <a className="btn btn--primary" href="#tools">Build Yours</a>
              <a className="btn btn--outline" href="#dealer">Get Local Price</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
