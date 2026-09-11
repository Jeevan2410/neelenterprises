import { site } from '../config/site';

// Contextual WhatsApp deep links — the only place the number is composed.
export function whatsappLink(message = `Hello NEEL ENTERPRISES, I would like to enquire about your forklift services.`): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function whatsappForService(serviceTitle: string): string {
  return whatsappLink(`Hello NEEL ENTERPRISES, I need help with ${serviceTitle}.`);
}

export function emailLink(subject = 'Forklift service enquiry', body = ''): string {
  const params = new URLSearchParams({ subject, ...(body ? { body } : {}) });
  return `mailto:${site.email}?${params.toString()}`;
}
