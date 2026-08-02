'use server';

import { SearchQuery, SearchResultsPayload } from '../types';
import { fetchLiveShops } from './scraper';
import { categorizeShopTiers } from './valuation';
import { prisma } from './db';

export async function executeRepairSearch(query: SearchQuery): Promise<SearchResultsPayload> {
  // Input sanity validations
  if (!query.year || query.year < 1980 || query.year > 2026) {
    throw new Error('Please select a valid vehicle manufacturing year.');
  }
  if (!query.make || query.make.trim() === '') {
    throw new Error('Please select a valid vehicle make.');
  }
  if (!query.model || query.model.trim() === '') {
    throw new Error('Please select or enter a valid vehicle model.');
  }
  if (!query.zipcode || !/^\d{5}$/.test(query.zipcode.trim())) {
    throw new Error('Please enter a valid 5-digit US Zipcode.');
  }

  const activeRepair = query.repairType === 'Other / Custom Issue' ? query.customRepair : query.repairType;
  if (!activeRepair || activeRepair.trim() === '') {
    throw new Error('Please specify the repair service or issue needed.');
  }

  const finalQuery: SearchQuery = {
    ...query,
    repairType: activeRepair.trim()
  };

  // 1. Fetch live shop data from scrapers/APIs
  const liveShops = await fetchLiveShops(finalQuery);

  // 2. Execute Smart Tri-Tier Valuation Matrix
  const searchId = `search_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const payload = categorizeShopTiers(liveShops, finalQuery, searchId);

  // 3. Persist Search & Results to SQLite/Postgres DB
  try {
    await prisma.repairSearch.create({
      data: {
        id: searchId,
        year: finalQuery.year,
        make: finalQuery.make,
        model: finalQuery.model,
        zipcode: finalQuery.zipcode,
        repairType: finalQuery.repairType,
        onlyDealers: finalQuery.onlyDealers,
        aseOnly: finalQuery.aseOnly,
        carbOnly: finalQuery.carbOnly,
        results: {
          create: payload.allShops.map((shop) => ({
            id: `${searchId}_${shop.id}`,
            shopName: shop.shopName,
            address: shop.address,
            phone: shop.phone,
            website: shop.website,
            bookingUrl: shop.bookingUrl,
            distanceMiles: shop.distanceMiles,
            googleRating: shop.googleRating,
            googleReviews: shop.googleReviews,
            yelpRating: shop.yelpRating,
            yelpReviews: shop.yelpReviews,
            bbbAccredited: shop.bbbAccredited,
            bbbRating: shop.bbbRating,
            aseCertified: shop.aseCertified,
            carbCompliant: shop.carbCompliant,
            isDealer: shop.isDealer,
            estimatedPrice: shop.estimatedPrice,
            priceCategory: shop.priceCategory,
            sourceSummary: JSON.stringify(shop.insights),
          })),
        },
      },
    });
  } catch (err) {
    console.error('Database write log error (non-fatal):', err);
  }

  return payload;
}
