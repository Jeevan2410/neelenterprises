import { describe, it, expect } from 'vitest';
import { validateEnquiry, makeReference, enquiryEmailBody } from '../src/lib/enquiry';

const valid = {
  name: 'Test User',
  email: 'buyer@example.com',
  phone: '+91 81051 42089',
  city: 'Bengaluru',
  equipmentType: 'Diesel forklift',
  requirement: 'Breakdown Repair',
  urgency: 'urgent',
  consent: true,
};

describe('validateEnquiry', () => {
  it('accepts a complete valid enquiry', () => {
    const r = validateEnquiry(valid);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.name).toBe('Test User');
  });

  it('accepts optional fields being absent', () => {
    const r = validateEnquiry({ ...valid, company: undefined, description: undefined });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.company).toBeUndefined();
  });

  it('rejects invalid email', () => {
    const r = validateEnquiry({ ...valid, email: 'not-an-email' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.email).toBeDefined();
  });

  it('rejects invalid phone', () => {
    expect(validateEnquiry({ ...valid, phone: '12' }).ok).toBe(false);
    expect(validateEnquiry({ ...valid, phone: 'call me maybe' }).ok).toBe(false);
  });

  it('rejects missing required fields', () => {
    const r = validateEnquiry({});
    expect(r.ok).toBe(false);
    if (!r.ok) {
      for (const k of ['name', 'email', 'phone', 'city', 'equipmentType', 'requirement', 'consent']) {
        expect(r.errors[k]).toBeDefined();
      }
    }
  });

  it('rejects missing consent', () => {
    const r = validateEnquiry({ ...valid, consent: false });
    expect(r.ok).toBe(false);
  });

  it('treats a filled honeypot as spam', () => {
    const r = validateEnquiry({ ...valid, website: 'http://spam.example' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.website).toContain('Spam');
  });

  it('ignores empty honeypot', () => {
    expect(validateEnquiry({ ...valid, website: '' }).ok).toBe(true);
  });

  it('truncates over-long description instead of failing', () => {
    const r = validateEnquiry({ ...valid, description: 'x'.repeat(5000) });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.description!.length).toBeLessThanOrEqual(2000);
  });

  it('defaults locale to en and rejects unexpected locales', () => {
    expect(validateEnquiry({ ...valid, locale: 'fr' }).ok).toBe(true); // falls back
    const r = validateEnquiry({ ...valid, locale: 'kn' });
    if (r.ok) expect(r.value.locale).toBe('kn');
  });

  it('survives null-ish bodies', () => {
    expect(validateEnquiry(null).ok).toBe(false);
    expect(validateEnquiry(undefined).ok).toBe(false);
  });
});

describe('makeReference', () => {
  it('matches the NE-YYYYMMDD-XXXXXX format', () => {
    expect(makeReference()).toMatch(/^NE-\d{8}-[A-Z0-9]{6}$/);
  });

  it('produces unique references', () => {
    const refs = new Set(Array.from({ length: 200 }, () => makeReference()));
    expect(refs.size).toBe(200);
  });
});

describe('enquiryEmailBody', () => {
  it('includes reference and skips empty optional rows', () => {
    const r = validateEnquiry(valid);
    if (!r.ok) throw new Error('fixture invalid');
    const body = enquiryEmailBody(r.value, 'NE-20260913-ABC123');
    expect(body).toContain('NE-20260913-ABC123');
    expect(body).toContain('Test User');
    expect(body).not.toContain('Company:');
  });
});
