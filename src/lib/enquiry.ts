// Server-side enquiry validation (brief §89: validate server-side even when
// frontend validation exists). Deliberately dependency-free.

export interface EnquiryInput {
  name: string;
  company?: string;
  email: string;
  phone: string;
  city: string;
  state?: string;
  siteLocation?: string;
  equipmentType: string;
  brand?: string;
  model?: string;
  capacity?: string;
  fuelType?: string;
  requirement: string;
  urgency: string;
  description?: string;
  locale?: string;
  consent: boolean;
  // Honeypot — must be empty (bots fill it). Turnstile is the primary defense.
  website?: string;
}

const MAX_LEN = 2000;
const clean = (v: unknown, max = 200): string => typeof v === 'string' ? v.trim().slice(0, max) : '';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,17}$/;

export type ValidateResult =
  | { ok: true; value: EnquiryInput }
  | { ok: false; errors: Record<string, string> };

export function validateEnquiry(body: unknown): ValidateResult {
  const b = (body ?? {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};
  const value: EnquiryInput = {
    name: clean(b.name, 120),
    company: clean(b.company, 160) || undefined,
    email: clean(b.email, 200),
    phone: clean(b.phone, 24),
    city: clean(b.city, 120),
    state: clean(b.state, 120) || undefined,
    siteLocation: clean(b.siteLocation, 300) || undefined,
    equipmentType: clean(b.equipmentType, 80),
    brand: clean(b.brand, 80) || undefined,
    model: clean(b.model, 80) || undefined,
    capacity: clean(b.capacity, 80) || undefined,
    fuelType: clean(b.fuelType, 40) || undefined,
    requirement: clean(b.requirement, 120),
    urgency: clean(b.urgency, 60) || 'planned',
    description: clean(b.description, MAX_LEN) || undefined,
    locale: ['en', 'kn', 'hi'].includes(clean(b.locale, 2)) ? clean(b.locale, 2) : 'en',
    consent: b.consent === true,
    website: clean(b.website, 100),
  };

  if (value.name.length < 2) errors.name = 'Name is required.';
  if (!EMAIL_RE.test(value.email)) errors.email = 'A valid email is required.';
  if (!PHONE_RE.test(value.phone)) errors.phone = 'A valid phone number is required.';
  if (!value.city) errors.city = 'City is required.';
  if (!value.equipmentType) errors.equipmentType = 'Equipment type is required.';
  if (!value.requirement) errors.requirement = 'Requirement is required.';
  if (!value.consent) errors.consent = 'Consent is required.';
  if (value.website) errors.website = 'Spam detected.'; // honeypot tripped

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value };
}

// Reference number: NE-<date>-<random> — generated server-side with a
// cryptographically secure source (not a secret, but unpredictable is cheap).
export function makeReference(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  const rand = Array.from(bytes, (b) => b.toString(36).padStart(2, '0')).join('').slice(0, 6).toUpperCase();
  return `NE-${ymd}-${rand}`;
}

export function enquiryEmailBody(v: EnquiryInput, ref: string): string {
  const rows = [
    ['Reference', ref], ['Name', v.name], ['Company', v.company], ['Email', v.email],
    ['Phone', v.phone], ['City', v.city], ['State', v.state], ['Equipment', v.equipmentType],
    ['Brand', v.brand], ['Model', v.model], ['Capacity', v.capacity], ['Requirement', v.requirement],
    ['Urgency', v.urgency], ['Description', v.description], ['Language', v.locale],
  ].filter(([, val]) => val !== undefined && val !== '');
  return rows.map(([k, val]) => `${k}: ${val}`).join('\n');
}
