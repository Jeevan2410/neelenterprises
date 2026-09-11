export interface Service {
  slug: string;
  title: string;
  short: string;
  long: string;
  category: 'repair' | 'maintenance' | 'power' | 'parts' | 'rental';
  powerType: 'electric' | 'diesel' | 'both' | 'na';
  enabled: boolean; // toggleable per business confirmation (KNOWN_ISSUES #7)
}

// Descriptions describe capability only — no invented procedures, prices or claims.
export const services: Service[] = [
  { slug: 'electric-forklift-repair', title: 'Electric Forklift Repair', category: 'repair', powerType: 'electric', enabled: true,
    short: 'Repair service for electric forklifts — motors, controllers, wiring and electronics.',
    long: 'Repair service for electric forklifts covering drive and lift systems, traction motors, controllers, contactors, wiring and related electronics. Our technical team has 18+ years of experience with material handling equipment across major brands.' },
  { slug: 'diesel-forklift-repair', title: 'Diesel Forklift Repair', category: 'repair', powerType: 'diesel', enabled: true,
    short: 'Repair service for diesel forklifts — engine, transmission, hydraulics and fuel systems.',
    long: 'Repair service for diesel forklifts covering engines, transmissions, hydraulic systems and fuel systems. Engine and transmission overhauling is a core capability of our technical team.' },
  { slug: 'preventive-maintenance', title: 'Preventive Maintenance', category: 'maintenance', powerType: 'both', enabled: true,
    short: 'Scheduled maintenance to keep your fleet running and reduce breakdowns.',
    long: 'Scheduled preventive maintenance for electric and diesel forklifts — inspection, lubrication, adjustment and replacement of wear parts — aimed at reducing unplanned downtime.' },
  { slug: 'breakdown-repair', title: 'Breakdown Repair', category: 'repair', powerType: 'both', enabled: true,
    short: 'Get your stopped forklift diagnosed and back to work.',
    long: 'Diagnostic and repair service for forklift breakdowns. Submit a service request with equipment details and photographs, and our team will assess the fault and the work required.' },
  { slug: 'amc', title: 'Annual Maintenance Contract (AMC)', category: 'maintenance', powerType: 'both', enabled: true,
    short: 'Planned maintenance contracts for your material handling fleet.',
    long: 'Annual Maintenance Contracts covering scheduled servicing of your forklift fleet on an agreed plan. Contact us to discuss scope for your equipment and site.' },
  { slug: 'battery-service', title: 'Battery Sales, Service & Reconditioning', category: 'power', powerType: 'electric', enabled: true,
    short: 'Traction battery sales, service and reconditioning.',
    long: 'Traction battery sales, service and reconditioning for electric forklifts and material handling equipment — a stated core capability of NEEL ENTERPRISES.' },
  { slug: 'charger-service', title: 'Charger Repair & Service', category: 'power', powerType: 'electric', enabled: true,
    short: 'Repair and servicing of forklift battery chargers.',
    long: 'Repair and servicing of forklift battery charging equipment to keep electric fleets charging reliably.' },
  { slug: 'traction-controller-repair', title: 'Traction Controller Repair', category: 'power', powerType: 'electric', enabled: true,
    short: 'Traction controller repair and service.',
    long: 'Traction controller repair and service for electric forklifts — a stated core capability of NEEL ENTERPRISES.' },
  { slug: 'engine-overhauling', title: 'Engine Overhauling', category: 'repair', powerType: 'diesel', enabled: true,
    short: 'Forklift engine overhauling.',
    long: 'Complete forklift engine overhauling — a stated core capability of NEEL ENTERPRISES, supported by our technical team’s long brand experience.' },
  { slug: 'transmission-overhauling', title: 'Transmission Overhauling', category: 'repair', powerType: 'diesel', enabled: true,
    short: 'Forklift transmission overhauling.',
    long: 'Complete forklift transmission overhauling — a stated core capability of NEEL ENTERPRISES.' },
  { slug: 'hydraulic-repair', title: 'Hydraulic Repair', category: 'repair', powerType: 'both', enabled: true,
    short: 'Hydraulic pumps, cylinders, valves and mast systems.',
    long: 'Repair of forklift hydraulic systems — pumps, cylinders, control valves and mast components.' },
  { slug: 'tyre-service', title: 'Tyre Service & Replacement', category: 'maintenance', powerType: 'both', enabled: true,
    short: 'Forklift tyres — solid, polyurethane and press-on replacements.',
    long: 'Tyre replacement for forklifts and pallet trucks, including polyurethane and solid tyres on drive and load wheels.' },
  { slug: 'spare-parts', title: 'Spare Parts', category: 'parts', powerType: 'na', enabled: true,
    short: 'Quality spare parts for material handling equipment.',
    long: 'Supply of spare parts for material handling equipment — wheels, rollers, bearings, seal kits, hydraulic components, electrical parts and more. In-time supply of spares is a stated commitment.' },
  { slug: 'forklift-rental', title: 'Forklift Rental', category: 'rental', powerType: 'na', enabled: true,
    short: 'Forklift rental services.',
    long: 'Forklift rental services — a stated offering of NEEL ENTERPRISES. Contact us with your load capacity and duration requirements.' },
  { slug: 'used-forklift-sales', title: 'Used Forklift Sales', category: 'rental', powerType: 'na', enabled: true,
    short: 'Used forklifts for sale.',
    long: 'Used forklift sales. Availability varies — contact us for current stock and condition details.' },
  { slug: 'refurbishment', title: 'Forklift Refurbishment', category: 'repair', powerType: 'both', enabled: true,
    short: 'Full refurbishment of tired equipment.',
    long: 'Refurbishment service restoring used forklifts to dependable working condition. Scope agreed per equipment after inspection.' },
  { slug: 'on-site-service', title: 'On-site Service', category: 'maintenance', powerType: 'both', enabled: true,
    short: 'Service at your facility.',
    long: 'On-site service for material handling equipment. Contact us to discuss your location and requirement.' },
];

export const enabledServices = () => services.filter((s) => s.enabled);
export const getService = (slug: string) => services.find((s) => s.slug === slug);
