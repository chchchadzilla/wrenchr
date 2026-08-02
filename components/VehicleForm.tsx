'use client';

import React, { useState } from 'react';
import { SearchQuery } from '../types';
import { POPULAR_MAKES_MODELS, COMMON_REPAIRS, YEARS_LIST } from '../lib/constants';
import { Wrench, ShieldCheck, Search, Flame, Building2, Award, AlertCircle } from 'lucide-react';

interface VehicleFormProps {
  onSearch: (query: SearchQuery) => void;
  isLoading: boolean;
  errorMsg?: string | null;
}

export default function VehicleForm({ onSearch, isLoading, errorMsg }: VehicleFormProps) {
  const [year, setYear] = useState<number>(2020);
  const [make, setMake] = useState<string>('Toyota');
  const [model, setModel] = useState<string>('Camry');
  const [customModel, setCustomModel] = useState<string>('');
  const [zipcode, setZipcode] = useState<string>('90210');
  const [repairType, setRepairType] = useState<string>('New / Replacement Tires');
  const [customRepair, setCustomRepair] = useState<string>('');
  
  // Filter checkboxes
  const [onlyDealers, setOnlyDealers] = useState<boolean>(false);
  const [aseOnly, setAseOnly] = useState<boolean>(true);
  const [carbOnly, setCarbOnly] = useState<boolean>(false);

  const availableModels = POPULAR_MAKES_MODELS[make] || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedModel = model === 'OTHER' ? customModel : model;
    
    onSearch({
      year,
      make,
      model: selectedModel,
      zipcode,
      repairType,
      customRepair,
      onlyDealers,
      aseOnly,
      carbOnly
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel p-6 sm:p-8 rounded-2xl shadow-2xl border border-zinc-800">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-brand-500/10 text-brand-500 rounded-xl border border-brand-500/20">
          <Wrench className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Vehicle & Service Details</h2>
          <p className="text-xs text-zinc-400">Scan surrounding facilities for verified live quotes & reviews</p>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-3 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Year / Make / Model Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full bg-zinc-900 border border-zinc-700 focus:border-brand-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
            >
              {YEARS_LIST.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Make
            </label>
            <select
              value={make}
              onChange={(e) => {
                const newMake = e.target.value;
                setMake(newMake);
                const models = POPULAR_MAKES_MODELS[newMake] || [];
                setModel(models[0] || 'OTHER');
              }}
              className="w-full bg-zinc-900 border border-zinc-700 focus:border-brand-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
            >
              {Object.keys(POPULAR_MAKES_MODELS).map((m) => (
                <option key={m} value={m}>
                  {m.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Model
            </label>
            {model !== 'OTHER' ? (
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 focus:border-brand-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
              >
                {availableModels.map((md) => (
                  <option key={md} value={md}>
                    {md}
                  </option>
                ))}
                <option value="OTHER">Other / Enter Custom</option>
              </select>
            ) : (
              <input
                type="text"
                placeholder="Enter model..."
                value={customModel}
                onChange={(e) => setCustomModel(e.target.value)}
                required
                className="w-full bg-zinc-900 border border-brand-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
              />
            )}
          </div>
        </div>

        {/* Zipcode & Repair Type Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              ZIP Code
            </label>
            <input
              type="text"
              maxLength={5}
              placeholder="e.g. 90210"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value.replace(/\D/g, ''))}
              required
              className="w-full bg-zinc-900 border border-zinc-700 focus:border-brand-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition tracking-widest font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Service / Needed Repair
            </label>
            <select
              value={repairType}
              onChange={(e) => setRepairType(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 focus:border-brand-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
            >
              {COMMON_REPAIRS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
              <option value="Other / Custom Issue">Other / Custom Issue</option>
            </select>
          </div>
        </div>

        {repairType === 'Other / Custom Issue' && (
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Describe Repair Needed
            </label>
            <input
              type="text"
              placeholder="e.g. Radiator leak, Squealing power steering..."
              value={customRepair}
              onChange={(e) => setCustomRepair(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-brand-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
            />
          </div>
        )}

        {/* Smart Certification & Shop Type Filters */}
        <div className="pt-2 border-t border-zinc-800">
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
            Search Filters & Certification Requirements
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition ${onlyDealers ? 'bg-brand-500/10 border-brand-500/50 text-white' : 'bg-zinc-900/60 border-zinc-800 text-zinc-400'}`}>
              <input
                type="checkbox"
                checked={onlyDealers}
                onChange={(e) => setOnlyDealers(e.target.checked)}
                className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500 bg-zinc-800 border-zinc-700"
              />
              <div className="flex items-center space-x-2 text-xs font-medium">
                <Building2 className="w-4 h-4 text-orange-400" />
                <span>Dealerships Only</span>
              </div>
            </label>

            <label className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition ${aseOnly ? 'bg-brand-500/10 border-brand-500/50 text-white' : 'bg-zinc-900/60 border-zinc-800 text-zinc-400'}`}>
              <input
                type="checkbox"
                checked={aseOnly}
                onChange={(e) => setAseOnly(e.target.checked)}
                className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500 bg-zinc-800 border-zinc-700"
              />
              <div className="flex items-center space-x-2 text-xs font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ASE Certified Mechanics</span>
              </div>
            </label>

            <label className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition ${carbOnly ? 'bg-brand-500/10 border-brand-500/50 text-white' : 'bg-zinc-900/60 border-zinc-800 text-zinc-400'}`}>
              <input
                type="checkbox"
                checked={carbOnly}
                onChange={(e) => setCarbOnly(e.target.checked)}
                className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500 bg-zinc-800 border-zinc-700"
              />
              <div className="flex items-center space-x-2 text-xs font-medium">
                <Award className="w-4 h-4 text-sky-400" />
                <span>CARB / Smog Test Only</span>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center space-x-2 transition transform active:scale-[0.99] disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Scanning Live Yelp, Google & BBB Facilities...</span>
            </div>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Analyze Nearby Shops & Compare Live Quotes</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
