export const locales = ['en', 'kn', 'hi'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function localePath(locale: Locale, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return locale === defaultLocale ? p : `/${locale}${p === '/' ? '' : p}`;
}

// EN is the source of truth. kn/hi entries are added as translations are
// confirmed — missing keys fall back to EN (CONTENT_STATUS.md).
const en = {
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.services': 'Services',
  'nav.industries': 'Industries',
  'nav.brands': 'Brands',
  'nav.locations': 'Locations',
  'nav.faq': 'FAQ',
  'nav.contact': 'Contact',
  'cta.whatsapp': 'WhatsApp Us',
  'cta.email': 'Email Us',
  'cta.requestService': 'Request Service',
  'cta.exploreServices': 'Explore Services',
  'hero.headline': 'KEEP YOUR OPERATION MOVING.',
  'hero.sub': 'Electric × Diesel forklift repair, maintenance, spare parts and rental — engineered around uptime.',
  'footer.company':
    'NEEL ENTERPRISES provides service for electric and diesel forklifts and supplies spare parts for material handling equipment.',
  'footer.coverage': 'Enquiries welcome from across India.',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms & Conditions',
  'common.backHome': 'Back to Home',
  'common.notFoundTitle': 'This route has stopped moving.',
  'common.notFoundBody': "The page you're looking for doesn't exist or was moved.",
} as const;

export type UiKey = keyof typeof en;
type Dict = Partial<Record<UiKey, string>>;

const kn: Dict = {}; // TODO: Kannada translation — pending business confirmation
const hi: Dict = {}; // TODO: Hindi translation — pending business confirmation

const dicts: Record<Locale, Dict> = { en, kn, hi };

export function t(locale: Locale, key: UiKey): string {
  return dicts[locale][key] ?? en[key];
}
