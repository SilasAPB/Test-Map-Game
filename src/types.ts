export interface CountryData {
  id: string; // TopoJSON ISO numeric string, e.g. "076", "840", "729"
  iso2: string; // e.g. "BR", "US", "SD"
  iso3: string; // e.g. "BRA", "USA", "SDN"
  namePt: string; // e.g. "Brasil", "Sudão", "Chade"
  nameEn: string; // e.g. "Brazil", "Sudan", "Chad"
  flag: string; // emoji flag e.g. "🇧🇷"
  areaKm2: number; // in square kilometers e.g. 8515767
  population: number;
  continent: string; // "América do Sul", "África", "Europa", "Ásia", "América do Norte", "Oceania"
  continentCode: 'SA' | 'NA' | 'EU' | 'AF' | 'AS' | 'OC';
  capital: string;
  travelCategory: 'Natureza & Praias' | 'Cultura & História' | 'Aventura & Trilhas' | 'Metrópole & Gastronomia' | 'Patrimônio Mundial';
  famousAttraction: string; // e.g. "Cristo Redentor & Amazônia", "Pirâmides de Gizé"
  coords: [number, number]; // [lon, lat] centroid
  // Travel & Gameplay Attributes (editable / customizable)
  costLevel: 1 | 2 | 3 | 4 | 5; // 1 = $ (Mochilão Super Barato), 5 = $$$$$ (Alto Custo)
  costDailyUsd: number; // Custo médio diário do mochileiro em USD (ex: 25, 45, 120)
  safetyScore: number; // 0-100 (100 = Mais seguro do mundo)
  crimeRank?: 1 | 2 | 3 | 4 | 5; // 1 = 🥷 Quase nulo/Seguríssimo, 5 = 🥷🥷🥷🥷🥷 Alerta Máximo/Perigo
  crimeLevel: 'Baixo' | 'Moderado' | 'Alto' | 'Crítico';
  visaAccessibility: 'Isento / Fácil' | 'e-Visa / Chegada' | 'Burocrático / Rígido';
  infrastructureScore: number; // 1-10 (Transporte, ferrovias, internet, hostels)
  adventureScore: number; // 1-10 (Nível de adrenalina, trilhas e natureza remota)
  customNotes?: string;
}

export interface TerritoryGroup {
  id: string; // unique uuid or preset id
  name: string; // e.g. "Sudão", "Brasil", "Europa Ocidental"
  customName?: string;
  color: string; // hex color for light vibrant map display
  continentCode: 'SA' | 'NA' | 'EU' | 'AF' | 'AS' | 'OC';
  countryIds: string[]; // List of numeric ISO IDs included in this destination group
  largestCountryId: string; // Country with max areaKm2 in this group
  totalAreaKm2: number;
  totalPopulation: number;
  travelCategory: string;
  topAttractions: string[];
  travelPassCost: number; // Traveler passport stamps/points
  // Aggregated Stats for the merged region:
  avgCostLevel: number; // 1-5 ($)
  avgCostDailyUsd: number;
  avgSafetyScore: number;
  avgCrimeRank: number; // 1-5 (🥷)
  dominantCrimeLevel: 'Baixo' | 'Moderado' | 'Alto' | 'Crítico';
  visaDifficultySummary: string;
  avgInfrastructure: number;
  avgAdventure: number;
  customNotes?: string;
}

export interface TravelRoute {
  id: string;
  fromTerritoryId: string;
  toTerritoryId: string;
  name: string;
  type: 'flight' | 'train-trail' | 'ferry';
}

export type PresetType =
  | 'all-active-193'
  | 'backpack-42'
  | 'continents-6'
  | 'top-travel-20'
  | 'low-cost-backpack'
  | 'safe-havens'
  | 'extreme-adventure'
  | 'digital-nomad';

export interface MapArchetype {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  difficulty: 'Fácil' | 'Equilibrado' | 'Desafiador' | 'Lendário';
  suggestedPlayers: string;
  activeCountryIds: string[];
  recommendedRules: string[];
}

export interface StrategicAnalysis {
  balanceScore: number;
  feedbackSummary: string;
  recommendedContinentBonuses: Record<string, number>;
  customMissions: {
    title: string;
    description: string;
    difficulty: 'Fácil' | 'Médio' | 'Difícil';
    rewardBonus?: number;
  }[];
  chokepointsInsight: string;
}
