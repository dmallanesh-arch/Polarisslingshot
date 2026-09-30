import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('Slingshot API', () => {
  it('reports health', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('lists the lineup', async () => {
    const res = await request(app).get('/api/models');
    expect(res.status).toBe(200);
    expect(res.body.models.map((m: { id: string }) => m.id)).toContain('sl');
  });

  it('returns the SL page', async () => {
    const res = await request(app).get('/api/models/sl');
    expect(res.status).toBe(200);
    expect(res.body.model.name).toBe('Slingshot SL');
    expect(res.body.model.colors).toHaveLength(3);
  });

  it('404s unknown models', async () => {
    const res = await request(app).get('/api/models/nope');
    expect(res.status).toBe(404);
  });

  it('returns specs per transmission', async () => {
    const res = await request(app).get('/api/models/sl/specs?transmission=auto');
    expect(res.status).toBe(200);
    const drivetrain = res.body.groups.find((g: { group: string }) => g.group === 'Drivetrain');
    expect(drivetrain.rows[0][1]).toBe('5-Speed AutoDrive');
  });

  it('rejects a bad transmission', async () => {
    const res = await request(app).get('/api/models/sl/specs?transmission=cvt');
    expect(res.status).toBe(400);
  });

  it('finds dealers by postal code', async () => {
    const res = await request(app).get('/api/dealers?postal=m5v2t6');
    expect(res.status).toBe(200);
    expect(res.body.postal).toBe('M5V 2T6');
    expect(res.body.dealers[0].city).toBe('Toronto');
  });

  it('rejects an invalid postal code', async () => {
    const res = await request(app).get('/api/dealers?postal=12345');
    expect(res.status).toBe(400);
  });

  it('subscribes to the newsletter once', async () => {
    const first = await request(app).post('/api/newsletter').send({ email: 'Rider@Example.com' });
    expect(first.status).toBe(201);
    const again = await request(app).post('/api/newsletter').send({ email: 'rider@example.com' });
    expect(again.status).toBe(200);
    const bad = await request(app).post('/api/newsletter').send({ email: 'nope' });
    expect(bad.status).toBe(400);
  });

  it('creates a quote', async () => {
    const res = await request(app).post('/api/quotes').send({
      modelId: 'sl',
      colorId: 'earth-blue',
      transmission: 'manual',
      email: 'rider@example.com',
      postal: 'v6b1a1',
    });
    expect(res.status).toBe(201);
    expect(res.body.quote.postal).toBe('V6B 1A1');
  });
});
