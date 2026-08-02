'use client';

import React, { useState } from 'react';
import VehicleForm from '../components/VehicleForm';
import ResultsView from '../components/ResultsView';
import { SearchQuery, SearchResultsPayload } from '../types';
import { executeRepairSearch } from '../lib/actions';
import { Wrench, ShieldCheck, Flame, Zap } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResultsPayload | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = async (query: SearchQuery) => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const results = await executeRepairSearch(query);
      setSearchResults(results);
    } catch (err: any) {
      console.error('Search Execution Error:', err);
      setErrorMsg(err.message || 'An unexpected error occurred while scanning live shop facilities.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 text-zinc-100 flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header / Branding */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-6 mb-8 border-b border-zinc-800/80">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-tr from-brand-600 to-brand-500 rounded-2xl shadow-lg shadow-brand-500/20 text-white">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tight text-white uppercase font-mono">
                Wrench<span className="text-brand-500">r</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] bg-brand-500/10 text-brand-400 font-semibold rounded border border-brand-500/20">
                PRO v1.0
              </span>
            </div>
            <p className="text-xs text-zinc-400">Unbiased Auto Repair Valuation & Facility Finder</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-xs text-zinc-400">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ASE & CARB Verified</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Zero Markup</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-6xl mx-auto w-full my-4">
        {!searchResults ? (
          <div className="space-y-12">
            {/* Hero Banner */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold border border-brand-500/20">
                <Flame className="w-3.5 h-3.5" />
                <span>Stop Getting Overcharged at Auto Repair Shops</span>
              </span>
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
                Never Pay an Arm & a Leg for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-orange-400">Auto Repair</span> Again.
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Enter your vehicle specs and ZIP code. Wrenchr instantly scans surrounding mechanics, analyzes verified Google, Yelp & BBB reviews, and surfaces your <strong className="text-white">Cheapest</strong>, <strong className="text-white">Highest Rated</strong>, and <strong className="text-white">Best Value</strong> options.
              </p>
            </div>

            {/* Main Interactive Search Form */}
            <VehicleForm onSearch={handleSearch} isLoading={isLoading} errorMsg={errorMsg} />

            {/* Key Value Propositions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="p-5 glass-card rounded-2xl border border-zinc-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <h2 className="text-base font-bold text-white">Tri-Tier Valuation</h2>
                <p className="text-xs text-zinc-400">
                  Instantly compare the absolute cheapest option against the top-rated local shop and the algorithmically calculated sweet spot.
                </p>
              </div>

              <div className="p-5 glass-card rounded-2xl border border-zinc-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <h2 className="text-base font-bold text-white">CARB & ASE Certified</h2>
                <p className="text-xs text-zinc-400">
                  Filters specifically for official California CARB compliant smog stations, ASE master technicians, or official OEM dealerships.
                </p>
              </div>

              <div className="p-5 glass-card rounded-2xl border border-zinc-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <h2 className="text-base font-bold text-white">Direct Shop Contact</h2>
                <p className="text-xs text-zinc-400">
                  Get verified phone numbers, direct website booking links, and distance breakdowns with zero middleman markups.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <ResultsView data={searchResults} onReset={() => setSearchResults(null)} />
        )}
      </div>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto border-t border-zinc-800/80 pt-6 mt-12 text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          (C) 2026 Wrenchr Inc. Built for transparent, affordable automotive care.
        </div>
        <div className="flex items-center space-x-4">
          <span>Privacy Secured</span>
          <span>-</span>
          <span>Zero Fake Quotes</span>
        </div>
      </footer>
    </main>
  );
}
