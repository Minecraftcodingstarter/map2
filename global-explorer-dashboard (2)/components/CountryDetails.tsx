
import React, { useEffect, useState } from 'react';
import { CategoryKey, DetailedInfo } from '../types';
import { fetchCountryDetails } from '../services/geminiService';
import { X, Loader2, TrendingUp, HelpCircle, MapPin } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface CountryDetailsProps {
  countryId: string;
  countryName: string;
  category: CategoryKey;
  currentValue?: number;
  onClose: () => void;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ countryId, countryName, category, currentValue, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<DetailedInfo | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchCountryDetails(countryName, category).then(data => {
      setDetails(data);
      setLoading(false);
    });
  }, [countryId, category, countryName]);

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 border-l border-slate-200 overflow-hidden flex flex-col">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-900">{countryName}</h2>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            <p className="text-sm font-medium">Lade tiefe Analyse für {countryName}...</p>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-100 relative overflow-hidden">
               <div className="relative z-10">
                <p className="text-blue-100 text-sm font-medium uppercase tracking-wider mb-1">Globale Metrik</p>
                <p className="text-2xl font-bold">{CATEGORIES[category].label}</p>
                <p className="text-4xl font-black mt-4">
                  {currentValue !== undefined ? `${currentValue.toLocaleString()} ${CATEGORIES[category].unit}` : "Keine Daten"}
                </p>
               </div>
               <TrendingUp className="absolute -bottom-4 -right-4 w-32 h-32 text-blue-500/30 rotate-12" />
            </div>

            <section>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Analyse & Kontext
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {details?.summary}
              </p>
            </section>

            <section className="grid grid-cols-2 gap-4">
              {details?.keyStats.map((stat, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-400 font-semibold mb-1 uppercase">{stat.label}</p>
                  <p className="text-slate-900 font-bold text-lg">{stat.value}</p>
                </div>
              ))}
            </section>

            <section className="bg-amber-50 rounded-2xl p-6 border border-amber-100 relative">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-amber-900 font-bold mb-1">Wissenswertes</h4>
                  <p className="text-amber-800/80 leading-relaxed text-sm italic">
                    {details?.funFact}
                  </p>
                </div>
              </div>
            </section>

            <div className="pt-8 text-center">
              <p className="text-[10px] text-slate-400 font-medium italic">
                Alle Daten werden live von der KI synthetisiert und basieren auf aktuellen globalen Trends.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDetails;
