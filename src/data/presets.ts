import { TerritoryGroup, TravelRoute, MapArchetype } from '../types';
import { COUNTRIES_DB, CONTINENT_COLORS } from './countries';
import { areCountriesBordering, COUNTRY_BORDER_ADJACENCY } from './borders';

// Helper to calculate geographical distance between two coordinate pairs [lon, lat]
export function calculateGeoDistance(coord1: [number, number], coord2: [number, number]): number {
  const dLon = (coord2[0] - coord1[0]) * Math.cos(((coord1[1] + coord2[1]) / 2 * Math.PI) / 180);
  const dLat = coord2[1] - coord1[1];
  return Math.sqrt(dLon * dLon + dLat * dLat);
}

// Calculate consolidated details for a merged group of countries
export function calculateGroupDetails(countryIds: string[], activeHostId?: string) {
  const members = COUNTRIES_DB.filter(c => countryIds.includes(c.id));
  if (members.length === 0) {
    return {
      largestCountryId: activeHostId || countryIds[0] || "",
      name: "Destino Desconhecido",
      totalAreaKm2: 0,
      totalPopulation: 0,
      continentCode: 'SA' as const,
      travelCategory: 'Natureza & Praias',
      topAttractions: [],
      travelPassCost: 1,
      avgCostLevel: 2,
      avgCostDailyUsd: 40,
      avgSafetyScore: 70,
      dominantCrimeLevel: 'Moderado' as const,
      visaDifficultySummary: 'Isento / Fácil',
      avgInfrastructure: 8,
      avgAdventure: 8,
      avgCrimeRank: 2,
    };
  }

  // The representative nation of this territory is ALWAYS the active country (activeHostId).
  // If activeHostId is provided and exists in members, use it as the main host/name.
  // Otherwise, fallback to the largest member country.
  const host = (activeHostId && members.find(c => c.id === activeHostId)) 
    || [...members].sort((a, b) => b.areaKm2 - a.areaKm2)[0];

  const totalArea = members.reduce((sum, c) => sum + c.areaKm2, 0);
  const totalPop = members.reduce((sum, c) => sum + c.population, 0);
  const topAttractions = members.map(c => `${c.flag} ${c.famousAttraction}`).slice(0, 4);

  // Aggregated Travel Metrics (weighted or averaged)
  const avgCostLevel = Math.round((members.reduce((sum, c) => sum + c.costLevel, 0) / members.length) * 10) / 10;
  const avgCostDailyUsd = Math.round(members.reduce((sum, c) => sum + c.costDailyUsd, 0) / members.length);
  const avgSafetyScore = Math.round(members.reduce((sum, c) => sum + c.safetyScore, 0) / members.length);
  const avgInfrastructure = Math.round((members.reduce((sum, c) => sum + c.infrastructureScore, 0) / members.length) * 10) / 10;
  const avgAdventure = Math.round((members.reduce((sum, c) => sum + c.adventureScore, 0) / members.length) * 10) / 10;

  // Dominant Crime Level and Crime Rank (1 to 5: 1 = Quase sem crime, 5 = Altíssimo risco)
  let dominantCrimeLevel: 'Baixo' | 'Moderado' | 'Alto' | 'Crítico' = 'Moderado';
  let avgCrimeRank = 2;
  if (avgSafetyScore >= 80) {
    dominantCrimeLevel = 'Baixo';
    avgCrimeRank = 1;
  } else if (avgSafetyScore >= 65) {
    dominantCrimeLevel = 'Moderado';
    avgCrimeRank = 2;
  } else if (avgSafetyScore >= 50) {
    dominantCrimeLevel = 'Moderado';
    avgCrimeRank = 3;
  } else if (avgSafetyScore >= 35) {
    dominantCrimeLevel = 'Alto';
    avgCrimeRank = 4;
  } else {
    dominantCrimeLevel = 'Crítico';
    avgCrimeRank = 5;
  }

  // Visa difficulty summary
  const hasStrictVisa = members.some(c => c.visaAccessibility.includes('Burocrático'));
  const hasEvisa = members.some(c => c.visaAccessibility.includes('e-Visa'));
  const visaDifficultySummary = hasStrictVisa ? 'Requer Visto Rígido' : hasEvisa ? 'e-Visa / Chegada' : 'Isenção Geral';

  // Passport points/stamps based on region size & cultural attractions
  const travelPassCost = Math.min(Math.max(1, Math.round(Math.log10(totalArea + 10000) - 4) + (members.length > 1 ? 1 : 0)), 8);

  return {
    largestCountryId: host.id,
    name: host.namePt, // Territory is ALWAYS named after the active nation!
    totalAreaKm2: totalArea,
    totalPopulation: totalPop,
    continentCode: host.continentCode,
    travelCategory: host.travelCategory,
    topAttractions,
    travelPassCost,
    avgCostLevel,
    avgCostDailyUsd,
    avgSafetyScore,
    avgCrimeRank,
    dominantCrimeLevel,
    visaDifficultySummary,
    avgInfrastructure,
    avgAdventure,
  };
}

/**
 * Intelligent Auto-Merging Engine:
 * When a country is toggled "off", it merges into the most suitable active neighbor.
 * Rule: Priority given to closer and smaller neighbors to avoid unfair gigantic super-blocks.
 */
export function buildDynamicTerritories(activeCountryIds: Set<string>): TerritoryGroup[] {
  // If no countries are active, default to all active
  if (activeCountryIds.size === 0) {
    activeCountryIds = new Set(COUNTRIES_DB.map(c => c.id));
  }

  // Map of active country ID -> Set of country IDs merged into it
  const activeClusters = new Map<string, string[]>();
  for (const c of COUNTRIES_DB) {
    if (activeCountryIds.has(c.id)) {
      activeClusters.set(c.id, [c.id]);
    }
  }

  // If literally no country was active (failsafe), make at least the largest active
  if (activeClusters.size === 0) {
    const defaultCountry = COUNTRIES_DB[0];
    activeClusters.set(defaultCountry.id, [defaultCountry.id]);
  }

  // For every INACTIVE country, find the best ACTIVE neighbor that SHARES A DIRECT BORDER
  const inactiveCountries = COUNTRIES_DB.filter(c => !activeCountryIds.has(c.id));

  // We process inactive countries iteratively so that chains of contiguous inactive countries
  // properly connect to the adjacent active cluster they touch.
  const remainingInactive = [...inactiveCountries];
  
  while (remainingInactive.length > 0) {
    let bestInactiveIdx = -1;
    let bestActiveId: string | null = null;
    let bestScore = Infinity;

    // Search for an inactive country that directly borders an already formed cluster
    for (let i = 0; i < remainingInactive.length; i++) {
      const inactive = remainingInactive[i];
      const inactiveNeighbors = COUNTRY_BORDER_ADJACENCY.get(inactive.id) || new Set<string>();

      activeClusters.forEach((clusterCountryIds, activeHostId) => {
        const hostCountry = COUNTRIES_DB.find(c => c.id === activeHostId);
        if (!hostCountry) return;

        // Check if inactive directly borders ANY country currently in this active cluster
        const hasBorderTouch = clusterCountryIds.some(memberId => inactiveNeighbors.has(memberId));

        if (hasBorderTouch) {
          const distance = calculateGeoDistance(inactive.coords, hostCountry.coords);
          const sizePenalty = (clusterCountryIds.length - 1) * 0.25;
          const continentBonus = hostCountry.continentCode === inactive.continentCode ? 1.0 : 3.0;
          const score = distance * (1 + sizePenalty) * continentBonus;

          if (score < bestScore) {
            bestScore = score;
            bestActiveId = activeHostId;
            bestInactiveIdx = i;
          }
        }
      });
    }

    // If we found a direct bordering match, merge it immediately into that cluster
    if (bestInactiveIdx !== -1 && bestActiveId) {
      const [matched] = remainingInactive.splice(bestInactiveIdx, 1);
      activeClusters.get(bestActiveId)!.push(matched.id);
    } else {
      // Fallback for isolated island nations without registered borders:
      // Merge into the closest active hub in the same continent
      const fallbackInactive = remainingInactive.shift()!;
      let fallbackActiveId: string | null = null;
      let minDistance = Infinity;

      const sameContinentActive = Array.from(activeClusters.keys()).filter(id => {
        const c = COUNTRIES_DB.find(item => item.id === id);
        return c?.continentCode === fallbackInactive.continentCode;
      });

      const candidates = sameContinentActive.length > 0 ? sameContinentActive : Array.from(activeClusters.keys());

      for (const candId of candidates) {
        const cand = COUNTRIES_DB.find(c => c.id === candId);
        if (!cand) continue;
        const d = calculateGeoDistance(fallbackInactive.coords, cand.coords);
        if (d < minDistance) {
          minDistance = d;
          fallbackActiveId = candId;
        }
      }

      if (fallbackActiveId && activeClusters.has(fallbackActiveId)) {
        activeClusters.get(fallbackActiveId)!.push(fallbackInactive.id);
      }
    }
  }

  // Build the list of TerritoryGroup objects
  const result: TerritoryGroup[] = [];

  activeClusters.forEach((mergedCountryIds, activeHostId) => {
    const details = calculateGroupDetails(mergedCountryIds, activeHostId);
    const continentColor = CONTINENT_COLORS[details.continentCode]?.fill || '#3b82f6';

    result.push({
      id: `group-${activeHostId}`,
      name: details.name, // Active host nation name for this territory!
      color: continentColor,
      continentCode: details.continentCode,
      countryIds: mergedCountryIds,
      largestCountryId: details.largestCountryId,
      totalAreaKm2: details.totalAreaKm2,
      totalPopulation: details.totalPopulation,
      travelCategory: details.travelCategory,
      topAttractions: details.topAttractions,
      travelPassCost: details.travelPassCost,
      avgCostLevel: details.avgCostLevel,
      avgCostDailyUsd: details.avgCostDailyUsd,
      avgSafetyScore: details.avgSafetyScore,
      avgCrimeRank: details.avgCrimeRank,
      dominantCrimeLevel: details.dominantCrimeLevel,
      visaDifficultySummary: details.visaDifficultySummary,
      avgInfrastructure: details.avgInfrastructure,
      avgAdventure: details.avgAdventure,
    });
  });

  // Sort by continent and name for clean layout
  return result.sort((a, b) => a.continentCode.localeCompare(b.continentCode) || b.totalAreaKm2 - a.totalAreaKm2);
}

// Preset Sea & Air Routes for Backpacker Connections (Ferry lanes, flight corridors, scenic train trails)
export const PRESET_TRAVEL_ROUTES: TravelRoute[] = [
  { id: 'tr-1', fromTerritoryId: 'group-076', toTerritoryId: 'group-566', name: 'Voo Transatlântico: Brasil ↔ Nigéria', type: 'flight' },
  { id: 'tr-2', fromTerritoryId: 'group-840', toTerritoryId: 'group-643', name: 'Estreito de Bering: Alasca ↔ Sibéria', type: 'ferry' },
  { id: 'tr-3', fromTerritoryId: 'group-304', toTerritoryId: 'group-352', name: 'Balsa Ártica: Groenlândia ↔ Islândia', type: 'ferry' },
  { id: 'tr-4', fromTerritoryId: 'group-352', toTerritoryId: 'group-826', name: 'Ferry do Atlântico Norte: Islândia ↔ Grã-Bretanha', type: 'ferry' },
  { id: 'tr-5', fromTerritoryId: 'group-360', toTerritoryId: 'group-036', name: 'Cruzeiro Mar de Timor: Indonésia ↔ Austrália', type: 'ferry' },
  { id: 'tr-6', fromTerritoryId: 'group-392', toTerritoryId: 'group-410', name: 'Ferry Marítimo: Japão ↔ Coreia do Sul', type: 'ferry' },
  { id: 'tr-7', fromTerritoryId: 'group-818', toTerritoryId: 'group-682', name: 'Travessia Mar Vermelho: Egito ↔ Arábia', type: 'ferry' },
  { id: 'tr-8', fromTerritoryId: 'group-724', toTerritoryId: 'group-504', name: 'Estreito de Gibraltar: Espanha ↔ Marrocos', type: 'ferry' },
  { id: 'tr-9', fromTerritoryId: 'group-450', toTerritoryId: 'group-710', name: 'Rota do Índico: Madagascar ↔ África do Sul', type: 'flight' },
  { id: 'tr-10', fromTerritoryId: 'group-250', toTerritoryId: 'group-276', name: 'Trem de Alta Velocidade: Paris ↔ Berlim', type: 'train-trail' },
  { id: 'tr-11', fromTerritoryId: 'group-156', toTerritoryId: 'group-643', name: 'Ferrovia Trans-Mongoliana: Pequim ↔ Moscou', type: 'train-trail' },
];

// Presets generators
export function createAllActivePreset(): Set<string> {
  return new Set(COUNTRIES_DB.map(c => c.id));
}

// 42 Iconic Backpacker Destinations preset (Sudan example naturally integrated!)
export function createBackpacker42Preset(): Set<string> {
  const iconicIds = [
    // South America (4 hubs)
    '076', // Brasil
    '032', // Argentina
    '604', // Peru
    '170', // Colômbia

    // North America (4 hubs)
    '840', // EUA
    '124', // Canadá
    '484', // México
    '188', // Costa Rica

    // Africa (6 hubs)
    '729', // Sudão (Sudan example from user request: Sudanese/Chad/South Sudan region)
    '818', // Egito
    '012', // Argélia
    '566', // Nigéria
    '180', // DR Congo
    '710', // África do Sul

    // Europe (8 hubs)
    '250', // França
    '276', // Alemanha
    '826', // Reino Unido
    '380', // Itália
    '724', // Espanha
    '620', // Portugal
    '300', // Grécia
    '578', // Noruega

    // Asia (14 hubs)
    '156', // China
    '356', // Índia
    '392', // Japão
    '764', // Tailândia
    '704', // Vietnã
    '360', // Indonésia
    '682', // Arábia Saudita
    '792', // Turquia
    '364', // Irã
    '398', // Cazaquistão
    '524', // Nepal
    '400', // Jordânia
    '116', // Camboja
    '410', // Coreia do Sul

    // Oceania (4 hubs)
    '036', // Austrália
    '554', // Nova Zelândia
    '242', // Fiji
    '598', // Papua Nova Guiné
  ];
  return new Set(iconicIds);
}

// 20 Top Expedition Hubs
export function createTopExpeditionsPreset(): Set<string> {
  const top20 = [
    '076', '032', '604', // SA
    '840', '484', // NA
    '729', '818', '710', // AF
    '250', '380', '826', '300', // EU
    '156', '356', '392', '764', '792', '524', // AS
    '036', '554', // OC
  ];
  return new Set(top20);
}

// 6 Continental Unions
export function createContinentsPreset(): Set<string> {
  const continents = ['076', '124', '643', '012', '156', '036'];
  return new Set(continents);
}

// Low-Cost Backpacking Archetype ($ & $$ budget destinations)
export function createLowCostPreset(): Set<string> {
  const lowCostIds = COUNTRIES_DB.filter(c => c.costLevel <= 2 && c.safetyScore >= 50).map(c => c.id);
  return new Set(lowCostIds.slice(0, 35));
}

// Safe Havens Archetype (Ultra high safety & low crime rate)
export function createSafeHavensPreset(): Set<string> {
  const safeIds = COUNTRIES_DB.filter(c => c.safetyScore >= 82).map(c => c.id);
  return new Set(safeIds);
}

// Extreme Adventure Archetype (Natureza bruta, montanhas, desertos)
export function createExtremeAdventurePreset(): Set<string> {
  const adventureIds = COUNTRIES_DB.filter(c => c.adventureScore >= 9).map(c => c.id);
  return new Set(adventureIds);
}

// Digital Nomad Archetype (Boa infraestrutura, custo moderado, cultura vibrante)
export function createDigitalNomadPreset(): Set<string> {
  const nomadIds = COUNTRIES_DB.filter(c => c.infrastructureScore >= 8 && c.costLevel <= 3).map(c => c.id);
  return new Set(nomadIds);
}

// Built-in Curated Archetypes for the Game with full lore, player counts & suggested mechanics
export const MAP_ARCHETYPES: MapArchetype[] = [
  {
    id: 'backpack-42',
    name: 'O Tabuleiro Clássico (42 Destinos)',
    tagline: 'Balanceamento simétrico para 2 a 6 jogadores',
    description: 'Agrupamento estratégico inspirado nos tabuleiros clássicos de conquista mundial. Regiões como Sudão (Sudão + Chade + Sudão do Sul) e Europa Central formam blocos geopolíticos perfeitos.',
    icon: '🎲',
    difficulty: 'Equilibrado',
    suggestedPlayers: '3 - 6 Jogadores',
    activeCountryIds: Array.from(createBackpacker42Preset()),
    recommendedRules: [
      'Bônus de continente proporcional aos pontos de viagem',
      'Cartas de Passaporte ao conquistar um território novo na rodada',
      'Rotas marítimas e aéreas conectam continentes isolados'
    ]
  },
  {
    id: 'low-cost-backpack',
    name: 'Mochilão Raiz / Low-Cost ($)',
    tagline: 'Sobrevivência com orçamento diário restrito',
    description: 'Destinos onde viajar custa menos de $35/dia (Sudeste Asiático, América Latina, Leste Europeu e Norte da África). Custo de vida baixo confere bônus de moedas de viagem!',
    icon: '🎒',
    difficulty: 'Fácil',
    suggestedPlayers: '2 - 5 Jogadores',
    activeCountryIds: Array.from(createLowCostPreset()),
    recommendedRules: [
      'Gastar menos dá pontos de experiência em dobro',
      'Locais de custo $1 dão passagens de trem gratuitas',
      'Eventos de câmbio aleatório afetam territórios de custo alto'
    ]
  },
  {
    id: 'safe-havens',
    name: 'Santuários & Rota Segura (Índice 85+)',
    tagline: 'Baixa criminalidade e alta infraestrutura',
    description: 'O mapa é focado exclusivamente nos países mais pacíficos e seguros do mundo (Japão, Islândia, Suíça, Canadá, Portugal, Nova Zelândia, etc.). Ideal para partidas mais estratégicas e diplomáticas.',
    icon: '🛡️',
    difficulty: 'Fácil',
    suggestedPlayers: '2 - 4 Jogadores',
    activeCountryIds: Array.from(createSafeHavensPreset()),
    recommendedRules: [
      'Sem perdas de recursos por eventos de criminalidade',
      'Trens de alta velocidade conectam todos os territórios adjacentes',
      'Vitória por acúmulo de carimbos de patrimônio cultural'
    ]
  },
  {
    id: 'extreme-adventure',
    name: 'Expedição Extrema & Sobrevivência',
    tagline: 'Desertos, florestas densas e picos acima de 8.000m',
    description: 'Uma jornada desafiadora pelos locais mais remotos e selvagens: Sibéria, Deserto do Saara, Montanhas do Himalaia, Selva Amazônica e Patagônia.',
    icon: '🧗',
    difficulty: 'Lendário',
    suggestedPlayers: '2 - 4 Jogadores',
    activeCountryIds: Array.from(createExtremeAdventurePreset()),
    recommendedRules: [
      'Desafios de clima e sobrevivência ao final de cada rodada',
      'Exige equipamento de expedição para atravessar territórios selvagens',
      'Bônus maciço para o primeiro jogador a escalar todos os picos mundiais'
    ]
  },
  {
    id: 'digital-nomad',
    name: 'Rota Nômade Digital & Metrópoles',
    tagline: 'Alta conectividade, cafés e praias paradisíacas',
    description: 'Os melhores hubs globais para quem trabalha remoto e explora o mundo com mochila nas costas: Chiang Mai, Lisboa, Medellín, Cidade do México, Bali e Praga.',
    icon: '💻',
    difficulty: 'Equilibrado',
    suggestedPlayers: '2 - 5 Jogadores',
    activeCountryIds: Array.from(createDigitalNomadPreset()),
    recommendedRules: [
      'Conexão Wi-Fi é o recurso principal do jogo',
      'Co-livings geram bônus de carimbos diários',
      'Cartões nômades dão saltos entre continentes'
    ]
  },
  {
    id: 'all-active-193',
    name: 'O Globo Completo (125 Nações)',
    tagline: 'Cada nação como seu próprio território soberano',
    description: 'Sem fusões! O tabuleiro exibe todas as fronteiras nacionais independentes para partidas de escala épica.',
    icon: '🌍',
    difficulty: 'Desafiador',
    suggestedPlayers: '4 - 8 Jogadores',
    activeCountryIds: Array.from(createAllActivePreset()),
    recommendedRules: [
      'Tempo de rodada estendido para partidas em larga escala',
      'Alianças diplomáticas regionais por continente'
    ]
  },
];
