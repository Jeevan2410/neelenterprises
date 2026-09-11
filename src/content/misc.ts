export interface Brand { name: string; logo: string; }
export interface Industry { slug: string; name: string; short: string; }
export interface Faq { q: string; a: string; }

// Displayed ONLY as "technical experience with" — never partners/dealers (DECISIONS, brief §4).
export const brands: Brand[] = [
  { name: 'Jungheinrich', logo: '/images/brands/jungheinrich.png' },
  { name: 'Toyota & BT', logo: '/images/brands/toyota-bt.png' },
  { name: "Jost's", logo: '/images/brands/josts.png' },
  { name: 'Maini', logo: '/images/brands/maini.png' },
  { name: 'Macneill', logo: '/images/brands/macneill.png' },
  { name: 'Baka', logo: '/images/brands/baka.png' },
  { name: 'Godrej', logo: '/images/brands/godrej.png' },
  { name: 'Voltas', logo: '/images/brands/voltas.png' },
  { name: 'Yale', logo: '/images/brands/yale.png' },
];

export const industries: Industry[] = [
  { slug: 'automotive', name: 'Automobile', short: 'Material handling support for automobile manufacturing and component plants.' },
  { slug: 'engineering', name: 'Engineering', short: 'Forklift service and spares for engineering and fabrication operations.' },
  { slug: 'pharma', name: 'Pharma', short: 'Reliable material handling for pharmaceutical production and warehousing.' },
  { slug: 'warehousing', name: 'Warehousing', short: 'Uptime-focused forklift maintenance, parts and rental for warehouses.' },
];

// Answers confined to what the supplied profile supports. No coverage/promise claims.
export const faqs: Faq[] = [
  { q: 'Do you repair electric forklifts?', a: 'Yes. NEEL ENTERPRISES is a service provider for electric forklifts, including traction motors, controllers, batteries and chargers.' },
  { q: 'Do you repair diesel forklifts?', a: 'Yes. We service diesel forklifts, including engine and transmission overhauling, hydraulics and fuel systems.' },
  { q: 'Do you provide on-site service?', a: 'On-site service is among our offerings. Share your location and requirement via the service request form or WhatsApp and we will confirm.' },
  { q: 'Do you provide preventive maintenance?', a: 'Yes — scheduled preventive maintenance and Annual Maintenance Contracts (AMC) for material handling fleets.' },
  { q: 'Do you repair forklift batteries?', a: 'Yes. Battery sales, service and reconditioning is one of our core capabilities.' },
  { q: 'Do you provide spare parts?', a: 'Yes. We supply spare parts for material handling equipment, including wheels, rollers, bearings, seal kits and hydraulic components.' },
  { q: 'Do you provide forklift rental?', a: 'Yes, forklift rental services are among our offerings. Contact us with capacity and duration needs.' },
  { q: 'Which forklift brands do you have experience with?', a: 'Our technical team has long-standing experience with Jungheinrich, Toyota, BT, Jost’s, Maini, Macneill, Baka, Godrej, Voltas and Yale equipment.' },
  { q: 'How can I request service?', a: 'Use the Request Service form, WhatsApp us, or email neelenterprises.741@gmail.com with your equipment details.' },
  { q: 'Can I send equipment photographs?', a: 'Yes — the service request form accepts photographs and documents, which help us diagnose the issue faster.' },
  { q: 'Which locations do you serve?', a: 'Our offices are at Kinnigoli (registered) and Bengaluru — Chikkabanavara (branch). Enquiries are welcome from across India.' },
];
