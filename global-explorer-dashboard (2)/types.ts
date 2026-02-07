
export type CategoryKey = 
  | 'population' 
  | 'area' 
  | 'density' 
  | 'gdp' 
  | 'gdpPerCapita' 
  | 'unemployment' 
  | 'inflation' 
  | 'costOfLiving' 
  | 'education' 
  | 'literacy' 
  | 'health' 
  | 'politicalSystem' 
  | 'democracyIndex' 
  | 'crime' 
  | 'military' 
  | 'energy' 
  | 'co2' 
  | 'techAccess' 
  | 'culture' 
  | 'tourism';

export interface CategoryInfo {
  label: string;
  unit: string;
  description: string;
  colorScale: [string, string];
  higherIsBetter: boolean;
}

export interface CountryData {
  id: string; // ISO 3166-1 alpha-3
  name: string;
  values: Record<CategoryKey, number>;
}

export interface DetailedInfo {
  summary: string;
  keyStats: { label: string; value: string }[];
  funFact: string;
}
