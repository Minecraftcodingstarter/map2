
import React, { useState, useEffect } from 'react';
import ControlPanel from './components/ControlPanel';
import WorldMap from './components/WorldMap';
import CountryDetails from './components/CountryDetails';
import { CategoryKey } from './types';
import { fetchGlobalCategoryData } from './services/dataService';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [category, setCategory] = useState<CategoryKey>('population');
  const [globalData, setGlobalData] = useState<Record<string, number>>({});
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsDataLoading(true);
      const data = await fetchGlobalCategoryData(category);
      setGlobalData(data);
      setIsDataLoading(false);
    };
    loadData();
  }, [category]);

  const handleCountrySelect = (id: string, name: string) => {
    setSelectedCountry({ id, name });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-slate-50" />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 py-8 space-y-8">
        <ControlPanel 
          currentCategory={category} 
          onCategoryChange={setCategory} 
        />

        <div className="relative">
          {isDataLoading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px] rounded-xl">
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <p className="text-sm font-semibold text-slate-700">Aktualisiere globale Daten...</p>
              </div>
            </div>
          )}
          
          <WorldMap 
            category={category} 
            data={globalData}
            onCountrySelect={handleCountrySelect} 
          />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Wie man die Karte benutzt</h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <div className="bg-slate-100 p-1 rounded font-bold text-slate-500 min-w-[20px] text-center">1</div>
              <span>Wähle eine Kategorie. Gemini generiert in Echtzeit eine globale Heatmap.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-slate-100 p-1 rounded font-bold text-slate-500 min-w-[20px] text-center">2</div>
              <span>Jedes Land ist interaktiv. Die Farben zeigen die relative Stärke an.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-slate-100 p-1 rounded font-bold text-slate-500 min-w-[20px] text-center">3</div>
              <span>Klicke für eine tiefe KI-Analyse des spezifischen Landes.</span>
            </li>
          </ul>
        </div>
      </main>

      <footer className="py-6 border-t border-slate-200 text-center text-slate-400 text-xs">
        &copy; 2024 Global Explorer Dashboard • Powered by Gemini Flash 2.5 Dynamic Data Synthesis
      </footer>

      {selectedCountry && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
          onClick={() => setSelectedCountry(null)}
        />
      )}
      {selectedCountry && (
        <CountryDetails 
          countryId={selectedCountry.id}
          countryName={selectedCountry.name}
          category={category}
          currentValue={globalData[selectedCountry.id]}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </div>
  );
};

export default App;
