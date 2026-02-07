
import React from 'react';
import { CategoryKey } from '../types';
import { CATEGORIES } from '../constants';
import { Globe, Info } from 'lucide-react';

interface ControlPanelProps {
  currentCategory: CategoryKey;
  onCategoryChange: (category: CategoryKey) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ currentCategory, onCategoryChange }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
          <Globe className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">World Explorer Dashboard</h1>
          <p className="text-sm text-slate-500">Globale Metriken und Analysen</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 min-w-[280px]">
        <label htmlFor="category-select" className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
          Metrik auswählen
        </label>
        <select
          id="category-select"
          value={currentCategory}
          onChange={(e) => onCategoryChange(e.target.value as CategoryKey)}
          className="bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none transition-all"
        >
          {Object.entries(CATEGORIES).map(([key, info]) => (
            <option key={key} value={key}>
              {info.label}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden lg:flex items-start gap-3 max-w-sm p-3 bg-slate-50 rounded-xl border border-slate-100">
        <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-500 leading-relaxed">
          {CATEGORIES[currentCategory].description} 
          <span className="block mt-1 italic">Daten basieren auf internationalen Datenbanken und KI-Synthese.</span>
        </p>
      </div>
    </div>
  );
};

export default ControlPanel;
