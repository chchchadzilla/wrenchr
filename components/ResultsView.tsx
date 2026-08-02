'use client';

import React from 'react';
import { ShopTierResult, SearchResultsPayload } from '../types';
import { Phone, ExternalLink, MapPin, Star, DollarSign, Award, CheckCircle, Flame, Sparkles } from 'lucide-react';

interface ResultsViewProps {
  data: SearchResultsPayload;
  onReset: () => void;
}

export default function ResultsView({ data, onReset }: ResultsViewProps) {
  const { cheapest, bestValue, highestRated, query, allShops } = data;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10 animate-fade-in">
      {/* Header Summary */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between border border-zinc-800 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-brand-500 font-semibold text-xs tracking-wider uppercase mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Live Scan Verified - {data.scrapedAt.substring(0, 10)}</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {query.year} {query.make} {query.model} - <span className="text-brand-500">{query.repairType}</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Analyzed surrounding repair facilities near <strong className="text-zinc-200">ZIP {query.zipcode}</strong> across Google, Yelp, BBB, and CARB datasets.
          </p>
        </div>
        <button
          onClick={onReset}
          className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700 transition"
        >
          Modify Search
        </button>
      </div>

      {/* Tri-Tier Valuation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier 1: CHEAPEST OPTION */}
        <TierCard shop={cheapest} badgeTitle="Cheapest Option" badgeBg="bg-emerald-500/10 border-emerald-500/30 text-emerald-400" icon={<DollarSign className="w-5 h-5 text-emerald-400" />} />

        {/* Tier 2: SWEET SPOT BEST VALUE (Featured) */}
        <TierCard shop={bestValue} isFeatured badgeTitle="Sweet Spot - Best Value" badgeBg="bg-brand-500/20 border-brand-500/50 text-brand-400" icon={<Flame className="w-5 h-5 text-brand-500" />} />

        {/* Tier 3: HIGHEST RATED OPTION */}
        <TierCard shop={highestRated} badgeTitle="Highest Rated" badgeBg="bg-amber-500/10 border-amber-500/30 text-amber-400" icon={<Star className="w-5 h-5 text-amber-400" />} />
      </div>

      {/* All Verified Facilities Breakdown Table */}
      <div className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Award className="w-5 h-5 text-brand-500" />
          <span>All Nearby Verified Repair Facilities ({allShops.length})</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-900/80 text-xs text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="p-3">Facility</th>
                <th className="p-3">Est. Quote</th>
                <th className="p-3">Distance</th>
                <th className="p-3">Google / Yelp Rating</th>
                <th className="p-3">Trust Badges</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {allShops.map((shop) => (
                <tr key={shop.id} className="hover:bg-zinc-900/40 transition">
                  <td className="p-3 font-semibold text-white">
                    <div>{shop.shopName}</div>
                    <div className="text-xs font-normal text-zinc-500 flex items-center space-x-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{shop.address}</span>
                    </div>
                  </td>
                  <td className="p-3 font-bold text-emerald-400">${shop.estimatedPrice}</td>
                  <td className="p-3 text-zinc-400">{shop.distanceMiles} mi</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-3 text-xs">
                      <span className="flex items-center text-amber-400 font-semibold">G: {shop.googleRating} ({shop.googleReviews})</span>
                      <span className="text-zinc-500">|</span>
                      <span className="text-red-400 font-semibold">Yelp: {shop.yelpRating}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-1.5">
                      {shop.aseCertified && (
                        <span className="px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 font-mono">ASE</span>
                      )}
                      {shop.bbbAccredited && (
                        <span className="px-2 py-0.5 text-[10px] bg-sky-500/10 text-sky-400 rounded border border-sky-500/20 font-mono">BBB {shop.bbbRating}</span>
                      )}
                      {shop.isDealer && (
                        <span className="px-2 py-0.5 text-[10px] bg-purple-500/10 text-purple-400 rounded border border-purple-500/20 font-mono">DEALER</span>
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <a
                      href={`tel:${shop.phone}`}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 rounded-lg text-xs font-semibold border border-brand-500/30 transition"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TierCard({
  shop,
  badgeTitle,
  badgeBg,
  icon,
  isFeatured = false,
}: {
  shop: ShopTierResult;
  badgeTitle: string;
  badgeBg: string;
  icon: React.ReactNode;
  isFeatured?: boolean;
}) {
  return (
    <div
      className={`relative glass-panel p-6 rounded-2xl flex flex-col justify-between border transition duration-300 ${
        isFeatured
          ? 'border-brand-500/60 shadow-xl glow-orange bg-zinc-900/90 ring-1 ring-brand-500/30'
          : 'border-zinc-800 hover:border-zinc-700'
      }`}
    >
      <div>
        {/* Tier Header Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badgeBg}`}>
            {icon}
            <span>{badgeTitle}</span>
          </span>
          <span className="text-xs font-mono text-zinc-400">{shop.distanceMiles} miles away</span>
        </div>

        {/* Shop Title & Address */}
        <h2 className="text-xl font-bold text-white tracking-tight leading-snug">{shop.shopName}</h2>
        <p className="text-xs text-zinc-400 mt-1 flex items-start space-x-1">
          <MapPin className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0 mt-0.5" />
          <span>{shop.address}</span>
        </p>

        {/* Quote Price Box */}
        <div className="my-5 p-4 bg-zinc-900/80 rounded-xl border border-zinc-800 flex items-baseline justify-between">
          <div>
            <span className="text-3xl font-extrabold text-emerald-400">${shop.estimatedPrice}</span>
            <span className="text-xs text-zinc-500 ml-1">est. total</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-md border border-brand-500/20">
              {shop.trustScore}/100 Trust Rating
            </span>
          </div>
        </div>

        {/* Verified Reviews & Ratings */}
        <div className="space-y-2 mb-6 text-xs text-zinc-300">
          <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/40 border border-zinc-800/50">
            <span className="flex items-center space-x-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Google: {shop.googleRating}</span>
              <span className="text-zinc-500">({shop.googleReviews} reviews)</span>
            </span>
            <span className="text-red-400 font-semibold">Yelp: {shop.yelpRating}</span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-400 px-1 pt-1">
            <span>BBB: <strong className="text-zinc-200">{shop.bbbAccredited ? `Grade ${shop.bbbRating}` : 'Unaccredited'}</strong></span>
            <span>Mechanics: <strong className="text-emerald-400">{shop.aseCertified ? 'ASE Certified' : 'Standard'}</strong></span>
          </div>
        </div>

        {/* Real Review Highlights */}
        <div className="space-y-1.5 mb-6 text-xs">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500">Verified Insights</span>
          {shop.insights[0]?.highlights.map((h, i) => (
            <div key={i} className="flex items-start space-x-2 text-zinc-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons: Direct Booking / Phone Call */}
      <div className="pt-4 border-t border-zinc-800 space-y-2">
        <a
          href={`tel:${shop.phone}`}
          className="w-full py-3 px-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl shadow-md flex items-center justify-center space-x-2 text-xs transition"
        >
          <Phone className="w-4 h-4" />
          <span>Call Shop: {shop.phone}</span>
        </a>

        {shop.website && (
          <a
            href={shop.website}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold rounded-xl flex items-center justify-center space-x-2 text-xs border border-zinc-700 transition"
          >
            <span>Book / Visit Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
