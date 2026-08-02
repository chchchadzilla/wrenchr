import axios from 'axios';

export interface GeoLocation {
  zipcode: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

// Free Zippopotam.us API with fallback to OpenStreetMap Nominatim for live zipcode geocoding
export async function geocodeZipcode(zipcode: string): Promise<GeoLocation> {
  const cleanZip = zipcode.trim();
  if (!/^\d{5}$/.test(cleanZip)) {
    throw new Error(`Invalid US Zipcode format: "${zipcode}". Must be 5 digits.`);
  }

  try {
    const res = await axios.get(`https://api.zippopotam.us/us/${cleanZip}`, { timeout: 4000 });
    if (res.status === 200 && res.data) {
      const place = res.data.places[0];
      return {
        zipcode: cleanZip,
        city: place['place name'],
        state: place['state abbreviation'],
        lat: parseFloat(place.latitude),
        lng: parseFloat(place.longitude),
      };
    }
  } catch (err) {
    // Fallback to Nominatim
    try {
      const nomRes = await axios.get(
        `https://nominatim.openstreetmap.org/search?postalcode=${cleanZip}&country=US&format=json`,
        { headers: { 'User-Agent': 'Wrenchr-Auto-Finder/1.0' }, timeout: 4000 }
      );
      if (nomRes.data && nomRes.data.length > 0) {
        const item = nomRes.data[0];
        return {
          zipcode: cleanZip,
          city: item.display_name.split(',')[0],
          state: 'US',
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
        };
      }
    } catch (e) {
      // Ignore inner error
    }
  }

  throw new Error(`Could not locate ZIP code ${cleanZip}. Please verify your 5-digit US zipcode.`);
}

// Haversine formula to calculate true distance in miles
export function calculateDistanceMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}
