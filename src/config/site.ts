// Single canonical source of business truth. Never hard-code these elsewhere.
export const SITE_URL = import.meta.env.SITE_URL ?? 'https://neel-enterprises.example.com';

export interface StaffTier { years: number; brands?: readonly string[]; note?: string }

export const site = {
  name: 'NEEL ENTERPRISES',
  tagline: 'Material Handling Engineering',
  concept: 'Keep Industry Moving.',
  description:
    'NEEL ENTERPRISES — electric and diesel forklift repair, maintenance, spare parts and rental. Engine & transmission overhauling, battery sales, service and reconditioning, traction controller repair. Kinnigoli and Bengaluru, serving customers across India.',
  email: 'neelenterprises.741@gmail.com',
  phone: '+918105142089',
  phoneDisplay: '+91 81051 42089',
  whatsapp: '918105142089',
  // Coverage wording is deliberately enquiry-scoped; no physical-coverage claim.
  coverageNote: 'Enquiries welcome from across India. Offices at Kinnigoli and Bengaluru.',
  addresses: [
    {
      id: 'kinnigoli',
      label: 'Registered Office',
      lines: [
        'No.11-87/3 & 11-87/4, Sdananda Building',
        'Kinnigoli Main Road, Opposite Durgaprasad Residency',
        'Mennabetu, Kinnigoli – 574150',
      ],
      city: 'Kinnigoli',
      state: 'Karnataka',
      postalCode: '574150',
      // Verified destination only — no hard-coded coordinates.
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent('NEEL ENTERPRISES Kinnigoli Main Road Mennabetu Kinnigoli 574150'),
    },
    {
      id: 'bengaluru',
      label: 'Branch Office',
      lines: [
        'Sy No-14/5, Hanuman Layout',
        'Hesaraghatta Main Road, Near Chikkabanavara Railway Station',
        'Chikkabanavara, Bangalore – 560090',
      ],
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560090',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent('NEEL ENTERPRISES Hanuman Layout Hesaraghatta Main Road Chikkabanavara Bangalore 560090'),
    },
  ],
  // Facts supported by the supplied company profile. Do not extend without evidence.
  facts: {
    yearsExperience: 18,
    staffTiers: [
      { years: 18, brands: ['Jungheinrich', 'Toyota & BT', "Jost's", 'Maini', 'Macneill', 'Baka', 'Godrej', 'Voltas'] },
      { years: 14, brands: ['Maini', 'Yale', 'Jungheinrich', "Jost's", 'Baka', 'Macneill', 'Godrej', 'Voltas'] },
      { years: 4, note: 'Maintenance of material handling equipment' },
    ] as StaffTier[],
    technicalAssistants: 3,
  },
} as const;

export type Site = typeof site;
