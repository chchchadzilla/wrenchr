import { ShopTierResult, SearchResultsPayload, SearchQuery } from '../types';

export function categorizeShopTiers(
  shops: ShopTierResult[],
  query: SearchQuery,
  searchId: string
): SearchResultsPayload {
  if (!shops || shops.length === 0) {
    throw new Error('Cannot categorize empty shop dataset.');
  }

  // 1. Find Cheapest Option
  const sortedByPrice = [...shops].sort((a, b) => a.estimatedPrice - b.estimatedPrice);
  const cheapest = { ...sortedByPrice[0], priceCategory: 'CHEAPEST' as const };

  // 2. Find Highest Rated Option (Highest trustScore, breaking ties with total reviews)
  const sortedByRating = [...shops].sort((a, b) => {
    if (b.trustScore !== a.trustScore) return b.trustScore - a.trustScore;
    return (b.googleReviews || 0) - (a.googleReviews || 0);
  });
  
  // Ensure Highest Rated is distinct if possible
  let highestRated = { ...sortedByRating[0], priceCategory: 'HIGHEST_RATED' as const };

  // 3. Find Sweet Spot / Best Value (Price score + Trust score ratio)
  // Calculate relative value score: higher trust, lower price
  const minPrice = sortedByPrice[0].estimatedPrice;
  const maxPrice = sortedByPrice[sortedByPrice.length - 1].estimatedPrice || minPrice + 1;

  const valuedShops = shops.map((shop) => {
    const priceNorm = 1 - (shop.estimatedPrice - minPrice) / (maxPrice - minPrice || 1); // 0 (expensive) to 1 (cheap)
    const trustNorm = shop.trustScore / 100; // 0 to 1
    // Best Value weights 60% trust and 40% affordability
    const valueScore = trustNorm * 0.6 + priceNorm * 0.4;
    return { shop, valueScore };
  });

  valuedShops.sort((a, b) => b.valueScore - a.valueScore);

  // Pick the best value shop that is ideally distinct or optimal
  let bestValueShop = valuedShops[0].shop;
  
  // If best value happens to equal cheapest or highest rated, fallback to 2nd best value if available
  if (
    valuedShops.length > 2 &&
    (bestValueShop.id === cheapest.id || bestValueShop.id === highestRated.id)
  ) {
    const distinctOption = valuedShops.find(
      (item) => item.shop.id !== cheapest.id && item.shop.id !== highestRated.id
    );
    if (distinctOption) {
      bestValueShop = distinctOption.shop;
    }
  }

  const bestValue = { ...bestValueShop, priceCategory: 'BEST_VALUE' as const };

  // Mark all shops in dataset
  const categorizedAll = shops.map((s) => {
    if (s.id === cheapest.id) return cheapest;
    if (s.id === highestRated.id) return highestRated;
    if (s.id === bestValue.id) return bestValue;
    return s;
  });

  return {
    searchId,
    query,
    cheapest,
    bestValue,
    highestRated,
    allShops: categorizedAll,
    scrapedAt: new Date().toISOString(),
  };
}
