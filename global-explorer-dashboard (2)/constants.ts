
import { CategoryKey, CategoryInfo } from './types';

export const CATEGORIES: Record<CategoryKey, CategoryInfo> = {
  population: { label: 'Bevölkerungszahl', unit: 'Mio.', description: 'Gesamtbevölkerung des Landes.', colorScale: ['#fef3c7', '#d97706'], higherIsBetter: true },
  area: { label: 'Fläche', unit: 'km²', description: 'Gesamtfläche des Landes.', colorScale: ['#ecfdf5', '#059669'], higherIsBetter: true },
  density: { label: 'Bevölkerungsdichte', unit: 'Einw./km²', description: 'Einwohner pro Quadratkilometer.', colorScale: ['#f5f3ff', '#7c3aed'], higherIsBetter: false },
  gdp: { label: 'Wirtschaftsleistung (BIP)', unit: 'Mrd. $', description: 'Bruttoinlandsprodukt nominal.', colorScale: ['#eff6ff', '#2563eb'], higherIsBetter: true },
  gdpPerCapita: { label: 'BIP pro Kopf', unit: '$', description: 'BIP geteilt durch Einwohnerzahl.', colorScale: ['#eff6ff', '#1e40af'], higherIsBetter: true },
  unemployment: { label: 'Arbeitslosenquote', unit: '%', description: 'Anteil der Arbeitslosen an der Erwerbsbevölkerung.', colorScale: ['#fff7ed', '#ea580c'], higherIsBetter: false },
  inflation: { label: 'Inflationsrate', unit: '%', description: 'Preisentwicklung für Konsumgüter.', colorScale: ['#fef2f2', '#dc2626'], higherIsBetter: false },
  costOfLiving: { label: 'Lebenshaltungskosten', unit: 'Index', description: 'Kosten für Miete, Lebensmittel etc.', colorScale: ['#f8fafc', '#475569'], higherIsBetter: false },
  education: { label: 'Bildungsniveau', unit: 'Pkt.', description: 'Durchschnittliche Bildungsjahre oder PISA-ähnliche Scores.', colorScale: ['#fdf4ff', '#c026d3'], higherIsBetter: true },
  literacy: { label: 'Alphabetisierungsrate', unit: '%', description: 'Anteil der Bevölkerung, der lesen und schreiben kann.', colorScale: ['#f0fdf4', '#16a34a'], higherIsBetter: true },
  health: { label: 'Gesundheit / Lebenserwartung', unit: 'Jahre', description: 'Durchschnittliche Lebenserwartung bei Geburt.', colorScale: ['#f0fdfa', '#0d9488'], higherIsBetter: true },
  politicalSystem: { label: 'Politisches System', unit: 'Typ', description: 'Form der Regierung (Demokratie, Monarchie, etc.).', colorScale: ['#fafaf9', '#44403c'], higherIsBetter: true },
  democracyIndex: { label: 'Demokratie-Index', unit: 'Index', description: 'Grad der demokratischen Freiheit.', colorScale: ['#fffbeb', '#d97706'], higherIsBetter: true },
  crime: { label: 'Kriminalitätsrate', unit: 'Index', description: 'Häufigkeit von Straftaten.', colorScale: ['#fff1f2', '#e11d48'], higherIsBetter: false },
  military: { label: 'Militärausgaben', unit: '% d. BIP', description: 'Ausgaben für Verteidigung.', colorScale: ['#fafaf9', '#1c1917'], higherIsBetter: false },
  energy: { label: 'Energieverbrauch', unit: 'kWh p.C.', description: 'Energieverbrauch pro Kopf.', colorScale: ['#ecfeff', '#0891b2'], higherIsBetter: false },
  co2: { label: 'CO₂-Ausstoß', unit: 't p.C.', description: 'Emissionen pro Kopf.', colorScale: ['#f0fdf4', '#15803d'], higherIsBetter: false },
  techAccess: { label: 'Technologiezugang', unit: '%', description: 'Internetnutzeranteil.', colorScale: ['#f5f3ff', '#6d28d9'], higherIsBetter: true },
  culture: { label: 'Kulturelle Vielfalt', unit: 'Sprachen', description: 'Anzahl der gesprochenen Sprachen.', colorScale: ['#fdf2f8', '#db2777'], higherIsBetter: true },
  tourism: { label: 'Tourismus', unit: 'Mio.', description: 'Internationale Ankünfte pro Jahr.', colorScale: ['#fff7ed', '#f97316'], higherIsBetter: true },
};

// Simplified seed data for map coloring (Top countries for demonstration)
export const MOCK_COUNTRY_VALUES: Record<string, Record<CategoryKey, number>> = {
  USA: { population: 331, area: 9833517, density: 34, gdp: 21433, gdpPerCapita: 65297, unemployment: 3.8, inflation: 2.1, costOfLiving: 70, education: 92, literacy: 99, health: 78, politicalSystem: 1, democracyIndex: 8.11, crime: 47, military: 3.4, energy: 12000, co2: 15.5, techAccess: 88, culture: 350, tourism: 79 },
  CHN: { population: 1411, area: 9596961, density: 153, gdp: 14342, gdpPerCapita: 10216, unemployment: 5.1, inflation: 2.5, costOfLiving: 40, education: 85, literacy: 97, health: 77, politicalSystem: 0, democracyIndex: 2.21, crime: 30, military: 1.9, energy: 5000, co2: 7.3, techAccess: 70, culture: 300, tourism: 65 },
  DEU: { population: 83, area: 357022, density: 232, gdp: 3845, gdpPerCapita: 46258, unemployment: 3.2, inflation: 1.4, costOfLiving: 65, education: 95, literacy: 99, health: 81, politicalSystem: 1, democracyIndex: 8.68, crime: 35, military: 1.3, energy: 7000, co2: 8.5, techAccess: 92, culture: 100, tourism: 39 },
  IND: { population: 1380, area: 3287263, density: 464, gdp: 2875, gdpPerCapita: 2099, unemployment: 7.1, inflation: 4.8, costOfLiving: 25, education: 70, literacy: 74, health: 69, politicalSystem: 1, democracyIndex: 6.61, crime: 45, military: 2.4, energy: 1200, co2: 1.8, techAccess: 45, culture: 1600, tourism: 18 },
  BRA: { population: 212, area: 8515767, density: 25, gdp: 1847, gdpPerCapita: 8717, unemployment: 11.9, inflation: 4.5, costOfLiving: 35, education: 78, literacy: 93, health: 76, politicalSystem: 1, democracyIndex: 6.86, crime: 65, military: 1.4, energy: 3000, co2: 2.2, techAccess: 70, culture: 210, tourism: 6.6 },
  RUS: { population: 146, area: 17098242, density: 8, gdp: 1699, gdpPerCapita: 11585, unemployment: 4.6, inflation: 4.5, costOfLiving: 38, education: 82, literacy: 99, health: 72, politicalSystem: 0, democracyIndex: 3.11, crime: 40, military: 3.9, energy: 9000, co2: 11.4, techAccess: 81, culture: 180, tourism: 24 },
  FRA: { population: 67, area: 643801, density: 119, gdp: 2715, gdpPerCapita: 40493, unemployment: 8.1, inflation: 1.1, costOfLiving: 74, education: 94, literacy: 99, health: 82, politicalSystem: 1, democracyIndex: 8.12, crime: 45, military: 1.8, energy: 7500, co2: 4.6, techAccess: 89, culture: 120, tourism: 89 },
  JPN: { population: 126, area: 377975, density: 347, gdp: 5081, gdpPerCapita: 40246, unemployment: 2.4, inflation: 0.5, costOfLiving: 83, education: 96, literacy: 99, health: 84, politicalSystem: 1, democracyIndex: 8.12, crime: 20, military: 0.9, energy: 8000, co2: 9.1, techAccess: 91, culture: 80, tourism: 32 },
};
