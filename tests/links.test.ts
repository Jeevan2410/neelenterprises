import { describe, it, expect } from 'vitest';
import { whatsappLink, whatsappForService, emailLink } from '../src/utils/links';

describe('whatsappLink', () => {
  it('targets the business number with encoded message', () => {
    const url = new URL(whatsappLink());
    expect(url.host).toBe('wa.me');
    expect(url.pathname).toBe('/918105142089');
    expect(url.searchParams.get('text')).toContain('NEEL ENTERPRISES');
  });

  it('encodes service-specific context', () => {
    const url = new URL(whatsappForService('Engine Overhauling'));
    expect(url.searchParams.get('text')).toContain('Engine Overhauling');
  });
});

describe('emailLink', () => {
  it('targets the business address', () => {
    const url = new URL(emailLink());
    expect(url.href.startsWith('mailto:neelenterprises.741@gmail.com')).toBe(true);
    expect(url.searchParams.get('subject')).toBe('Forklift service enquiry');
  });

  it('includes subject and body when given', () => {
    const url = new URL(emailLink('Test subject', 'Test body'));
    expect(url.searchParams.get('subject')).toBe('Test subject');
    expect(url.searchParams.get('body')).toBe('Test body');
  });
});
