export interface VehicleData {
  years: number[];
  makes: Record<string, string[]>; // Make -> Models
}

export interface SearchQuery {
  year: number;
  make: string;
  model: string;
  zipcode: string;
  repairType: string;
  customRepair?: string;
  onlyDealers: boolean;
  aseOnly: boolean;
  carbOnly: boolean;
}

export interface ReviewInsight {
  source: 'Google' | 'Yelp' | 'BBB' | 'CABAR';
  rating: number;
  reviewCount: number;
  sentimentSummary: string;
  highlights: string[];
}

export interface ShopTierResult {
  id: string;
  shopName: string;
  address: string;
  phone: string;
  website?: string;
  bookingUrl?: string;
  distanceMiles: number;
  googleRating?: number;
  googleReviews?: number;
  yelpRating?: number;
  yelpReviews?: number;
  bbbAccredited: boolean;
  bbbRating?: string;
  aseCertified: boolean;
  carbCompliant: boolean;
  isDealer: boolean;
  estimatedPrice: number;
  priceCategory: 'CHEAPEST' | 'BEST_VALUE' | 'HIGHEST_RATED';
  insights: ReviewInsight[];
  trustScore: number; // 0-100 composite score
}

export interface SearchResultsPayload {
  searchId: string;
  query: SearchQuery;
  cheapest: ShopTierResult;
  bestValue: ShopTierResult;
  highestRated: ShopTierResult;
  allShops: ShopTierResult[];
  scrapedAt: string;
}
