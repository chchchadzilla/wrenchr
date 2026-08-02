export const POPULAR_MAKES_MODELS: Record<string, string[]> = {
  Acura: ['MDX', 'RDX', 'TLX', 'ILX', 'Integra'],
  Audi: ['A4', 'A6', 'Q5', 'Q7', 'Q3', 'S5'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5', '4 Series', '7 Series'],
  Buick: ['Enclave', 'Encore', 'Envision'],
  Cadillac: ['Escalade', 'XT5', 'CT5', 'XT4'],
  Chevrolet: ['Silverado 1500', 'Equinox', 'Tahoe', 'Malibu', 'Suburban', 'Corvette', 'Colorado', 'Trax'],
  Chrysler: ['Pacificia', '300'],
  Dodge: ['Charger', 'Challenger', 'Durango', 'Grand Caravan'],
  Ford: ['F-150', 'Explorer', 'Escape', 'Mustang', 'Edge', 'Ranger', 'Expedition', 'Bronco'],
  GMC: ['Sierra 1500', 'Acadia', 'Yukon', 'Terrain'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'HR-V', 'Passport'],
  Hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Palisade', 'Kona'],
  Infiniti: ['QX60', 'Q50', 'QX80'],
  Jeep: ['Grand Cherokee', 'Wrangler', 'Cherokee', 'Compass', 'Gladiator'],
  Kia: ['Forte', 'Optima/K5', 'Sportage', 'Sorento', 'Telluride', 'Soul'],
  Lexus: ['RX 350', 'ES 350', 'GX 460', 'NX 300', 'IS 300'],
  Lincoln: ['Navigator', 'Aviator', 'Corsair'],
  Mazda: ['CX-5', 'CX-30', 'Mazda3', 'Mazda6', 'CX-9'],
  Mercedes_Benz: ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class'],
  Nissan: ['Altima', 'Rogue', 'Sentra', 'Pathfinder', 'Frontier', 'Murano'],
  Ram: ['1500', '2500', '3500'],
  Subaru: ['Outback', 'Forester', 'Crosstrek', 'Impreza', 'Ascent'],
  Tesla: ['Model 3', 'Model Y', 'Model S', 'Model X'],
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra', '4Runner', 'Prius'],
  Volkswagen: ['Jetta', 'Tiguan', 'Atlas', 'Golf', 'Passat'],
  Volvo: ['XC90', 'XC60', 'XC40', 'S60']
};

export const COMMON_REPAIRS = [
  'New / Replacement Tires',
  'SMOG Check & Inspection (CARB)',
  'Brake Pad & Rotor Replacement',
  'Oil & Filter Change',
  'Battery Replacement',
  'Alternator / Starter Replacement',
  'Transmission Fluid Flush',
  'AC Repair & Recharge',
  'Check Engine Light Diagnostics',
  'Wheel Alignment',
  'Suspension & Shock Replacement',
  'Timing Belt / Water Pump Replacement'
];

export const YEARS_LIST = Array.from({ length: 35 }, (_, i) => 2025 - i);
