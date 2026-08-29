import React, { useState, useMemo } from 'react';
import { CountryData, TerritoryGroup } from '../types';
import {
  COUNTRIES_DB,
  CONTINENT_NAMES,
  CONTINENT_COLORS,
  getCrimeRank,
  getCrimeDescription,
  getCostDescription,
} from '../data/countries';
import {
  Table,
  Search,
  Filter,
  Download,
  ArrowUpDown,
  Shield,
  DollarSign,
  Compass,
  FileSpreadsheet,
  Edit3,
  X,
  Check,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Layers,
  HelpCircle,
  Users,
  Globe,
  CheckSquare,
  Square,
} from 'lucide-react';

interface CountryAttributesTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCountryIds: Set<string>;
  territories: TerritoryGroup[];
  onToggleCountry: (countryId: string) => void;
  customOverrides: Record<string, Partial<CountryData>>;
  onUpdateCountryOverride: (countryId: string, updates: Partial<CountryData>) => void;
  onResetOverrides: () => void;
}

type SortField =
  | 'namePt'
  | 'continent'
  | 'costLevel'
  | 'costDailyUsd'
  | 'safetyScore'
  | 'crimeRank'
  | 'infrastructureScore'
  | 'adventureScore'
  | 'areaKm2'
  | 'population';

// Helper component for 1 to 5 Dollar Signs ($)
export const CostStarRating: React.FC<{
  level: number;
  interactive?: boolean;
  onChange?: (level: 1 | 2 | 3 | 4 | 5) => void;
}> = ({ level, interactive = false, onChange }) => {
  return (
    <div className="flex items-center gap-0.5 select-none" title={`Custo Nível ${level}/5`}>
      {[1, 2, 3, 4, 5].map(slot => {
        const isFilled = slot <= level;
        return (
          <button
            type="button"
            key={slot}
            disabled={!interactive}
            onClick={() => onChange?.(slot as 1 | 2 | 3 | 4 | 5)}
            className={`font-black text-xs leading-none transition-transform ${
              interactive ? 'cursor-pointer hover:scale-125 p-0.5' : 'cursor-default'
            } ${
              isFilled
                ? 'text-emerald-700 font-black drop-shadow-[0_1px_1px_rgba(16,185,129,0.2)]'
                : 'text-slate-200'
            }`}
          >
            $
          </button>
        );
      })}
    </div>
  );
};

// Helper component for 1 to 5 Thief Icons (🥷)
export const CrimeThiefRating: React.FC<{
  rank: number;
  interactive?: boolean;
  onChange?: (rank: 1 | 2 | 3 | 4 | 5) => void;
}> = ({ rank, interactive = false, onChange }) => {
  return (
    <div className="flex items-center gap-0.5 select-none" title={`Criminalidade ${rank}/5`}>
      {[1, 2, 3, 4, 5].map(slot => {
        const isFilled = slot <= rank;
        return (
          <button
            type="button"
            key={slot}
            disabled={!interactive}
            onClick={() => onChange?.(slot as 1 | 2 | 3 | 4 | 5)}
            className={`text-sm leading-none transition-transform ${
              interactive ? 'cursor-pointer hover:scale-125 p-0.5' : 'cursor-default'
            } ${
              isFilled
                ? 'filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] opacity-100'
                : 'opacity-20 grayscale'
            }`}
          >
            🥷
          </button>
        );
      })}
    </div>
  );
};

export const CountryAttributesTableModal: React.FC<CountryAttributesTableModalProps> = ({
  isOpen,
  onClose,
  activeCountryIds,
  territories,
  onToggleCountry,
  customOverrides,
  onUpdateCountryOverride,
  onResetOverrides,
}) => {
  // View mode: 'TERRITORIES' (grouped in-game board territories) vs 'ALL_COUNTRIES' (all individual 193 nations)
  const [viewMode, setViewMode] = useState<'TERRITORIES' | 'ALL_COUNTRIES'>('TERRITORIES');

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [continentFilter, setContinentFilter] = useState<string>('ALL');
  const [crimeFilter, setCrimeFilter] = useState<string>('ALL');
  const [costFilter, setCostFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'MERGED'>('ALL');

  // Sorting state
  const [sortField, setSortField] = useState<SortField>('namePt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Editing state for inline/modal edit
  const [editingCountryId, setEditingCountryId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<CountryData>>({});

  // Map of countryId -> Merged Territory
  const countryToTerritoryMap = useMemo(() => {
    const map = new Map<string, TerritoryGroup>();
    for (const t of territories) {
      for (const cId of t.countryIds) {
        map.set(cId, t);
      }
    }
    return map;
  }, [territories]);

  // Combined country dataset with user overrides
  const effectiveCountries = useMemo(() => {
    return COUNTRIES_DB.map(c => {
      const override = customOverrides[c.id];
      const base = override ? { ...c, ...override } : c;
      const crimeRank = getCrimeRank(base);
      return { ...base, crimeRank };
    });
  }, [customOverrides]);

  // Map for quick country lookup
  const effectiveCountriesMap = useMemo(() => {
    const map = new Map<string, (typeof effectiveCountries)[0]>();
    for (const c of effectiveCountries) {
      map.set(c.id, c);
    }
    return map;
  }, [effectiveCountries]);

  // Territories Filtered & Sorted for the 'TERRITORIES' Grouped view
  const displayTerritories = useMemo(() => {
    return territories
      .filter(t => {
        const matchesSearch =
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.travelCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.countryIds.some(cId => {
            const c = effectiveCountriesMap.get(cId);
            return (
              c &&
              (c.namePt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.capital.toLowerCase().includes(searchQuery.toLowerCase()))
            );
          });

        const matchesContinent = continentFilter === 'ALL' || t.continentCode === continentFilter;

        const costRank = Math.min(5, Math.max(1, Math.round(t.avgCostLevel)));
        const matchesCost =
          costFilter === 'ALL' ||
          (costFilter === '1' && costRank === 1) ||
          (costFilter === '2' && costRank === 2) ||
          (costFilter === '3' && costRank === 3) ||
          (costFilter === '4' && costRank === 4) ||
          (costFilter === '5' && costRank === 5);

        const crimeRank = Math.min(5, Math.max(1, Math.round(t.avgCrimeRank || 2)));
        const matchesCrime =
          crimeFilter === 'ALL' ||
          (crimeFilter === '1' && crimeRank === 1) ||
          (crimeFilter === '2' && crimeRank === 2) ||
          (crimeFilter === '3' && crimeRank === 3) ||
          (crimeFilter === '4' && crimeRank === 4) ||
          (crimeFilter === '5' && crimeRank === 5);

        const isMulti = t.countryIds.length > 1;
        const matchesStatus =
          statusFilter === 'ALL' ||
          (statusFilter === 'ACTIVE' && !isMulti) ||
          (statusFilter === 'MERGED' && isMulti);

        return matchesSearch && matchesContinent && matchesCost && matchesCrime && matchesStatus;
      })
      .sort((a, b) => {
        if (sortField === 'namePt') {
          return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        if (sortField === 'costLevel') {
          return sortDirection === 'asc' ? a.avgCostLevel - b.avgCostLevel : b.avgCostLevel - a.avgCostLevel;
        }
        if (sortField === 'costDailyUsd') {
          return sortDirection === 'asc' ? a.avgCostDailyUsd - b.avgCostDailyUsd : b.avgCostDailyUsd - a.avgCostDailyUsd;
        }
        if (sortField === 'crimeRank') {
          return sortDirection === 'asc' ? a.avgCrimeRank - b.avgCrimeRank : b.avgCrimeRank - a.avgCrimeRank;
        }
        if (sortField === 'safetyScore') {
          return sortDirection === 'asc' ? a.avgSafetyScore - b.avgSafetyScore : b.avgSafetyScore - a.avgSafetyScore;
        }
        if (sortField === 'infrastructureScore') {
          return sortDirection === 'asc' ? a.avgInfrastructure - b.avgInfrastructure : b.avgInfrastructure - a.avgInfrastructure;
        }
        if (sortField === 'adventureScore') {
          return sortDirection === 'asc' ? a.avgAdventure - b.avgAdventure : b.avgAdventure - a.avgAdventure;
        }
        if (sortField === 'areaKm2') {
          return sortDirection === 'asc' ? a.totalAreaKm2 - b.totalAreaKm2 : b.totalAreaKm2 - a.totalAreaKm2;
        }
        if (sortField === 'population') {
          return sortDirection === 'asc' ? a.totalPopulation - b.totalPopulation : b.totalPopulation - a.totalPopulation;
        }
        return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      });
  }, [
    territories,
    searchQuery,
    continentFilter,
    costFilter,
    crimeFilter,
    statusFilter,
    effectiveCountriesMap,
    sortField,
    sortDirection,
  ]);

  // Filtered & Sorted list for individual countries view
  const displayCountries = useMemo(() => {
    return effectiveCountries
      .filter(c => {
        const matchesSearch =
          c.namePt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.famousAttraction.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesContinent = continentFilter === 'ALL' || c.continentCode === continentFilter;

        const rank = getCrimeRank(c);
        const matchesCrime =
          crimeFilter === 'ALL' ||
          (crimeFilter === '1' && rank === 1) ||
          (crimeFilter === '2' && rank === 2) ||
          (crimeFilter === '3' && rank === 3) ||
          (crimeFilter === '4' && rank === 4) ||
          (crimeFilter === '5' && rank === 5);

        const matchesCost =
          costFilter === 'ALL' ||
          (costFilter === '1' && c.costLevel === 1) ||
          (costFilter === '2' && c.costLevel === 2) ||
          (costFilter === '3' && c.costLevel === 3) ||
          (costFilter === '4' && c.costLevel === 4) ||
          (costFilter === '5' && c.costLevel === 5);

        const isActive = activeCountryIds.has(c.id);
        const matchesStatus =
          statusFilter === 'ALL' ||
          (statusFilter === 'ACTIVE' && isActive) ||
          (statusFilter === 'MERGED' && !isActive);

        return matchesSearch && matchesContinent && matchesCrime && matchesCost && matchesStatus;
      })
      .sort((a, b) => {
        let valA: any = a[sortField];
        let valB: any = b[sortField];

        if (sortField === 'crimeRank') {
          valA = getCrimeRank(a);
          valB = getCrimeRank(b);
        }

        if (typeof valA === 'string') {
          return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return sortDirection === 'asc' ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
      });
  }, [
    effectiveCountries,
    searchQuery,
    continentFilter,
    crimeFilter,
    costFilter,
    statusFilter,
    activeCountryIds,
    sortField,
    sortDirection,
  ]);

  // Toggle sort direction or change field
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Start editing country
  const handleStartEdit = (country: CountryData) => {
    const currentCrimeRank = getCrimeRank(country);
    setEditingCountryId(country.id);
    setEditForm({
      costLevel: country.costLevel,
      costDailyUsd: country.costDailyUsd,
      safetyScore: country.safetyScore,
      crimeRank: currentCrimeRank,
      crimeLevel: country.crimeLevel,
      visaAccessibility: country.visaAccessibility,
      customNotes: country.customNotes || '',
    });
  };

  // Save edit
  const handleSaveEdit = (countryId: string) => {
    onUpdateCountryOverride(countryId, editForm);
    setEditingCountryId(null);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (viewMode === 'TERRITORIES') {
      const headers = [
        'ID Territorio',
        'Nome Territorio',
        'Continente',
        'Paises Integrados',
        'Qtd Paises',
        'Custo Nivel (1-5)',
        'Custo Diario USD',
        'Crime Rank (1-5)',
        'Nivel Crime',
        'Seguranca (0-100)',
        'Visto',
        'Infraestrutura (1-10)',
        'Aventura (1-10)',
        'Area Km2',
        'Populacao',
      ];

      const rows = displayTerritories.map(t => {
        const memberNames = t.countryIds
          .map(cId => effectiveCountriesMap.get(cId)?.namePt || cId)
          .join(' + ');

        return [
          `"${t.id}"`,
          `"${t.name}"`,
          `"${CONTINENT_NAMES[t.continentCode] || t.continentCode}"`,
          `"${memberNames}"`,
          t.countryIds.length,
          t.avgCostLevel,
          t.avgCostDailyUsd,
          t.avgCrimeRank,
          `"${t.dominantCrimeLevel}"`,
          t.avgSafetyScore,
          `"${t.visaDifficultySummary}"`,
          t.avgInfrastructure,
          t.avgAdventure,
          t.totalAreaKm2,
          t.totalPopulation,
        ].join(',');
      });

      const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `territorios_fundidos_mochileiros_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const headers = [
        'ID',
        'ISO3',
        'Nome PT',
        'Nome EN',
        'Continente',
        'Capital',
        'Ativo no Mapa',
        'Territorio Vinculado',
        'Custo Nivel (1-5)',
        'Custo Diario USD',
        'Criminalidade (1-5)',
        'Nivel Criminalidade',
        'Seguranca (0-100)',
        'Visto',
        'Infraestrutura (1-10)',
        'Aventura (1-10)',
        'Atracao Principal',
        'Area Km2',
        'Populacao',
        'Notas',
      ];

      const rows = displayCountries.map(c => {
        const isActive = activeCountryIds.has(c.id);
        const t = countryToTerritoryMap.get(c.id);
        const crimeRank = getCrimeRank(c);

        return [
          `"${c.id}"`,
          `"${c.iso3}"`,
          `"${c.namePt}"`,
          `"${c.nameEn}"`,
          `"${c.continent}"`,
          `"${c.capital}"`,
          isActive ? 'Sim' : 'Fundido',
          `"${t ? t.name : '-'}"`,
          c.costLevel,
          c.costDailyUsd,
          crimeRank,
          `"${c.crimeLevel}"`,
          c.safetyScore,
          `"${c.visaAccessibility}"`,
          c.infrastructureScore,
          c.adventureScore,
          `"${c.famousAttraction}"`,
          c.areaKm2,
          c.population,
          `"${c.customNotes || ''}"`,
        ].join(',');
      });

      const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `tabela_atributos_mochileiros_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-country-attributes-table"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-white w-full max-w-7xl h-[92vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-800">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Tabela de Atributos & Territórios Fundidos
                </h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {viewMode === 'TERRITORIES' ? `${territories.length} Territórios no Tabuleiro` : '193 Nações'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {viewMode === 'TERRITORIES'
                  ? 'Exibindo os grupos consolidados de países fundidos conforme as fronteiras do mapa.'
                  : 'Exibindo todos os 193 países individualmente para ajuste fino de parâmetros.'}
              </p>
            </div>
          </div>

          {/* View Mode Toggle Button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 bg-slate-200/70 rounded-xl border border-slate-300">
              <button
                type="button"
                onClick={() => setViewMode('TERRITORIES')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  viewMode === 'TERRITORIES'
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>Territórios Fundidos ({territories.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('ALL_COUNTRIES')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  viewMode === 'ALL_COUNTRIES'
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-sky-600" />
                <span>Todos os 193 Países</span>
              </button>
            </div>

            <button
              id="btn-export-csv-table"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all shadow-sm active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Baixar Planilha (CSV)</span>
            </button>

            {Object.keys(customOverrides).length > 0 && (
              <button
                id="btn-reset-all-overrides"
                onClick={onResetOverrides}
                title="Restaurar valores padrão originais"
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Restaurar ({Object.keys(customOverrides).length})</span>
              </button>
            )}

            <button
              id="btn-close-table-modal"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-3 sm:px-5 border-b border-slate-100 bg-white flex flex-wrap items-center gap-3 text-xs">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={
                viewMode === 'TERRITORIES'
                  ? 'Buscar por território, categoria ou país membro...'
                  : 'Buscar por país, capital ou atração...'
              }
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
            />
          </div>

          {/* Continents */}
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500 text-[11px] uppercase">Continente:</span>
            <select
              value={continentFilter}
              onChange={e => setContinentFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700 focus:outline-none"
            >
              <option value="ALL">Todos os Continentes</option>
              {Object.entries(CONTINENT_NAMES).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Cost Filter (1 to 5 $) */}
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500 text-[11px] uppercase">Custo ($):</span>
            <select
              value={costFilter}
              onChange={e => setCostFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700 focus:outline-none"
            >
              <option value="ALL">Todos ($ 1 a 5)</option>
              <option value="1">$ (1/5 - Super Barato)</option>
              <option value="2">$$ (2/5 - Econômico)</option>
              <option value="3">$$$ (3/5 - Médio)</option>
              <option value="4">$$$$ (4/5 - Caro)</option>
              <option value="5">$$$$$ (5/5 - Alto Custo)</option>
            </select>
          </div>

          {/* Crime Filter (1 to 5 🥷) */}
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500 text-[11px] uppercase">Crime (🥷):</span>
            <select
              value={crimeFilter}
              onChange={e => setCrimeFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700 focus:outline-none"
            >
              <option value="ALL">Todos (🥷 1 a 5)</option>
              <option value="1">🥷 (1/5 - Seguríssimo)</option>
              <option value="2">🥷🥷 (2/5 - Tranquilo)</option>
              <option value="3">🥷🥷🥷 (3/5 - Moderado)</option>
              <option value="4">🥷🥷🥷🥷 (4/5 - Alto Risco)</option>
              <option value="5">🥷🥷🥷🥷🥷 (5/5 - Crítico)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500 text-[11px] uppercase">Tipo:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700 focus:outline-none"
            >
              <option value="ALL">Todos</option>
              <option value="ACTIVE">
                {viewMode === 'TERRITORIES' ? 'Apenas Territórios Simples (1 país)' : 'Apenas Ativos (Hubs)'}
              </option>
              <option value="MERGED">
                {viewMode === 'TERRITORIES' ? 'Apenas Fundidos (Multi-países)' : 'Apenas Fundidos'}
              </option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto bg-slate-50/50 p-2 sm:p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {viewMode === 'TERRITORIES' ? (
              /* VIEW 1: GROUPED TERRITORIES (SHOWING MERGED BLOCKS) */
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 font-extrabold text-slate-700 select-none">
                    <th
                      className="p-3 cursor-pointer hover:bg-slate-200/60 transition-colors"
                      onClick={() => handleSort('namePt')}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Território / Grupo Fundido</span>
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </th>
                    <th className="p-3">Países Integrados no Grupo</th>
                    <th
                      className="p-3 cursor-pointer hover:bg-slate-200/60 transition-colors"
                      onClick={() => handleSort('continent')}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Continente</span>
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </th>
                    <th
                      className="p-3 cursor-pointer hover:bg-slate-200/60 transition-colors"
                      onClick={() => handleSort('costLevel')}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Custo Médio ($ 1-5)</span>
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </th>
                    <th
                      className="p-3 cursor-pointer hover:bg-slate-200/60 transition-colors"
                      onClick={() => handleSort('crimeRank')}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Criminalidade (🥷 1-5)</span>
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </th>
                    <th
                      className="p-3 cursor-pointer hover:bg-slate-200/60 transition-colors"
                      onClick={() => handleSort('safetyScore')}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Segurança</span>
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </th>
                    <th className="p-3">Visto / Acesso</th>
                    <th
                      className="p-3 text-center cursor-pointer hover:bg-slate-200/60 transition-colors"
                      onClick={() => handleSort('infrastructureScore')}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>Infra</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th
                      className="p-3 text-center cursor-pointer hover:bg-slate-200/60 transition-colors"
                      onClick={() => handleSort('adventureScore')}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>Aventura</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="p-3">Categoria de Viagem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {displayTerritories.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="p-8 text-center text-slate-400">
                        Nenhum território encontrado para os filtros selecionados.
                      </td>
                    </tr>
                  ) : (
                    displayTerritories.map(t => {
                      const hostCountry = effectiveCountriesMap.get(t.largestCountryId);
                      const memberCountries = t.countryIds.map(cId => effectiveCountriesMap.get(cId)).filter(Boolean);
                      const isMultiNation = t.countryIds.length > 1;
                      const costRank = Math.min(5, Math.max(1, Math.round(t.avgCostLevel)));
                      const crimeRank = Math.min(5, Math.max(1, Math.round(t.avgCrimeRank || 2)));
                      const crimeInfo = getCrimeDescription(crimeRank);

                      return (
                        <tr
                          key={t.id}
                          className={`hover:bg-slate-50/80 transition-colors ${
                            isMultiNation ? 'bg-sky-50/20' : ''
                          }`}
                        >
                          {/* Territory Name & Representative Flag */}
                          <td className="p-3 font-semibold">
                            <div className="flex items-center gap-2.5">
                              <span className="text-2xl select-none">{hostCountry?.flag || '🌍'}</span>
                              <div>
                                <div className="font-extrabold text-slate-900 flex items-center gap-2">
                                  <span>{t.name}</span>
                                  {isMultiNation && (
                                    <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-black">
                                      {t.countryIds.length} Países Unidos
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-slate-500 font-medium">
                                  {hostCountry?.capital ? `Sede: ${hostCountry.capital}` : 'Território Unificado'}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Merged Countries List Tags */}
                          <td className="p-3">
                            <div className="flex flex-wrap items-center gap-1 max-w-[320px]">
                              {memberCountries.map(m => (
                                <span
                                  key={m!.id}
                                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg border ${
                                    m!.id === t.largestCountryId
                                      ? 'bg-slate-900 text-white border-slate-900'
                                      : 'bg-white text-slate-700 border-slate-200'
                                  }`}
                                  title={m!.id === t.largestCountryId ? 'Nação Hub (Ativa)' : 'Nação Fundida'}
                                >
                                  <span>{m!.flag}</span>
                                  <span>{m!.namePt}</span>
                                </span>
                              ))}
                            </div>
                          </td>

                          {/* Continent */}
                          <td className="p-3">
                            <span
                              className="text-[10px] font-extrabold px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: CONTINENT_COLORS[t.continentCode]?.bgSoft || '#f1f5f9',
                                color: CONTINENT_COLORS[t.continentCode]?.text || '#334155',
                              }}
                            >
                              {CONTINENT_NAMES[t.continentCode] || t.continentCode}
                            </span>
                          </td>

                          {/* Cost of Living (1-5 $) */}
                          <td className="p-3">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5">
                                <CostStarRating level={costRank} />
                                <span className="text-[10px] font-extrabold text-emerald-800">
                                  {costRank}/5
                                </span>
                              </div>
                              <div className="text-[11px] font-bold text-slate-700">
                                ~${t.avgCostDailyUsd} <span className="text-[10px] text-slate-400 font-normal">/dia</span>
                              </div>
                            </div>
                          </td>

                          {/* Criminality (1-5 🥷) */}
                          <td className="p-3">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5">
                                <CrimeThiefRating rank={crimeRank} />
                                <span className="text-[10px] font-extrabold text-slate-800">
                                  {crimeRank}/5
                                </span>
                              </div>
                              <span
                                className={`inline-block text-[9.5px] font-bold px-1.5 py-0.5 rounded border ${crimeInfo.bg} ${crimeInfo.color}`}
                              >
                                {t.dominantCrimeLevel}
                              </span>
                            </div>
                          </td>

                          {/* Safety Score */}
                          <td className="p-3">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-800">
                                <span>{t.avgSafetyScore}</span>
                                <span className="text-[10px] text-slate-400 font-normal">/ 100</span>
                              </div>
                              <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all"
                                  style={{
                                    width: `${t.avgSafetyScore}%`,
                                    backgroundColor:
                                      t.avgSafetyScore >= 80
                                        ? '#10b981'
                                        : t.avgSafetyScore >= 60
                                        ? '#f59e0b'
                                        : t.avgSafetyScore >= 40
                                        ? '#f97316'
                                        : '#ef4444',
                                  }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* Visa */}
                          <td className="p-3 text-[11px] text-slate-600 font-medium">
                            {t.visaDifficultySummary}
                          </td>

                          {/* Infrastructure */}
                          <td className="p-3 text-center font-bold text-slate-800">
                            {t.avgInfrastructure} / 10
                          </td>

                          {/* Adventure */}
                          <td className="p-3 text-center font-bold text-slate-800">
                            ⚡ {t.avgAdventure}
                          </td>

                          {/* Travel Category */}
                          <td className="p-3">
                            <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                              {t.travelCategory}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            ) : (
              /* VIEW 2: INDIVIDUAL NATIONS (193 COUNTRIES WITH TOGGLES & DIRECT EDITING) */
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 font-extrabold text-slate-700 select-none">
                    <th className="p-3 text-center w-12">Ativo</th>
                    <th
                      className="p-3 cursor-pointer hover:bg-slate-200/60 transition-colors"
                      onClick={() => handleSort('namePt')}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>País / Nação</span>
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </th>
                    <th
                      className="p-3 cursor-pointer hover:bg-slate-200/60 transition-colors"
                      onClick={() => handleSort('continent')}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Continente</span>
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </th>
                    <th
                      className="p-3 cursor-pointer hover:bg-slate-200/60 transition-colors"
                      onClick={() => handleSort('costLevel')}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Custo de Vida ($ 1-5)</span>
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </th>
                    <th
                      className="p-3 cursor-pointer hover:bg-slate-200/60 transition-colors"
                      onClick={() => handleSort('crimeRank')}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Criminalidade (🥷 1-5)</span>
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </th>
                    <th
                      className="p-3 cursor-pointer hover:bg-slate-200/60 transition-colors"
                      onClick={() => handleSort('safetyScore')}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Segurança (0-100)</span>
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </th>
                    <th className="p-3">Visto / Acesso</th>
                    <th
                      className="p-3 text-center cursor-pointer hover:bg-slate-200/60 transition-colors"
                      onClick={() => handleSort('infrastructureScore')}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>Infra (1-10)</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th
                      className="p-3 text-center cursor-pointer hover:bg-slate-200/60 transition-colors"
                      onClick={() => handleSort('adventureScore')}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>Aventura</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="p-3">Território no Jogo</th>
                    <th className="p-3 text-center w-20">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {displayCountries.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="p-8 text-center text-slate-400">
                        Nenhum país encontrado para os filtros selecionados.
                      </td>
                    </tr>
                  ) : (
                    displayCountries.map(country => {
                      const isActive = activeCountryIds.has(country.id);
                      const territory = countryToTerritoryMap.get(country.id);
                      const isEditing = editingCountryId === country.id;
                      const hasCustom = !!customOverrides[country.id];
                      const crimeRank = getCrimeRank(country);
                      const crimeInfo = getCrimeDescription(crimeRank);

                      return (
                        <tr
                          key={country.id}
                          className={`hover:bg-slate-50/80 transition-colors ${
                            !isActive ? 'opacity-85 bg-slate-50/30' : ''
                          }`}
                        >
                          {/* Checkbox Toggle */}
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={isActive}
                              onChange={() => onToggleCountry(country.id)}
                              title={isActive ? 'Desligar e fundir com vizinho' : 'Ligar como hub independente'}
                              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                            />
                          </td>

                          {/* Country Name & Flag */}
                          <td className="p-3 font-semibold">
                            <div className="flex items-center gap-2">
                              <span className="text-xl select-none">{country.flag}</span>
                              <div>
                                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                  <span>{country.namePt}</span>
                                  {hasCustom && (
                                    <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-black">
                                      Editado
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-slate-400">{country.capital}</div>
                              </div>
                            </div>
                          </td>

                          {/* Continent */}
                          <td className="p-3">
                            <span
                              className="text-[10px] font-extrabold px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: CONTINENT_COLORS[country.continentCode]?.bgSoft || '#f1f5f9',
                                color: CONTINENT_COLORS[country.continentCode]?.text || '#334155',
                              }}
                            >
                              {country.continent}
                            </span>
                          </td>

                          {/* Cost of Living (1-5 $) */}
                          <td className="p-3">
                            {isEditing ? (
                              <div className="space-y-1">
                                <CostStarRating
                                  level={editForm.costLevel || country.costLevel}
                                  interactive
                                  onChange={newLevel => {
                                    const avgCost =
                                      newLevel === 1 ? 20 : newLevel === 2 ? 40 : newLevel === 3 ? 75 : newLevel === 4 ? 130 : 220;
                                    setEditForm(prev => ({
                                      ...prev,
                                      costLevel: newLevel,
                                      costDailyUsd: avgCost,
                                    }));
                                  }}
                                />
                                <div className="flex items-center gap-1 mt-1">
                                  <span className="text-[10px] text-slate-500 font-bold">$</span>
                                  <input
                                    type="number"
                                    min={5}
                                    max={1000}
                                    value={editForm.costDailyUsd ?? country.costDailyUsd}
                                    onChange={e =>
                                      setEditForm(prev => ({
                                        ...prev,
                                        costDailyUsd: Number(e.target.value),
                                      }))
                                    }
                                    className="w-14 px-1 py-0.5 border border-slate-300 rounded font-bold text-slate-800 text-xs"
                                  />
                                  <span className="text-[10px] text-slate-400">/dia</span>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5">
                                  <CostStarRating level={country.costLevel} />
                                  <span className="text-[10px] font-extrabold text-emerald-800">
                                    {country.costLevel}/5
                                  </span>
                                </div>
                                <div className="text-[11px] font-bold text-slate-700">
                                  ~${country.costDailyUsd} <span className="text-[10px] text-slate-400 font-normal">/dia</span>
                                </div>
                              </div>
                            )}
                          </td>

                          {/* Criminality (1-5 🥷) */}
                          <td className="p-3">
                            {isEditing ? (
                              <div className="space-y-1">
                                <CrimeThiefRating
                                  rank={editForm.crimeRank || crimeRank}
                                  interactive
                                  onChange={newRank => {
                                    const levelText =
                                      newRank === 1 ? 'Baixo' : newRank === 2 || newRank === 3 ? 'Moderado' : newRank === 4 ? 'Alto' : 'Crítico';
                                    const approxSafety =
                                      newRank === 1 ? 88 : newRank === 2 ? 72 : newRank === 3 ? 55 : newRank === 4 ? 40 : 25;
                                    setEditForm(prev => ({
                                      ...prev,
                                      crimeRank: newRank,
                                      crimeLevel: levelText,
                                      safetyScore: approxSafety,
                                    }));
                                  }}
                                />
                                <div className="text-[10px] font-bold text-slate-600">
                                  Nível {editForm.crimeRank || crimeRank}/5
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5">
                                  <CrimeThiefRating rank={crimeRank} />
                                  <span className="text-[10px] font-extrabold text-slate-800">
                                    {crimeRank}/5
                                  </span>
                                </div>
                                <span
                                  className={`inline-block text-[9.5px] font-bold px-1.5 py-0.5 rounded border ${crimeInfo.bg} ${crimeInfo.color}`}
                                >
                                  {country.crimeLevel}
                                </span>
                              </div>
                            )}
                          </td>

                          {/* Safety Score */}
                          <td className="p-3">
                            {isEditing ? (
                              <input
                                type="number"
                                min={1}
                                max={100}
                                value={editForm.safetyScore ?? country.safetyScore}
                                onChange={e =>
                                  setEditForm(prev => ({
                                    ...prev,
                                    safetyScore: Number(e.target.value),
                                  }))
                                }
                                className="w-16 px-1.5 py-0.5 border border-slate-300 rounded font-bold text-slate-800"
                              />
                            ) : (
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-800">
                                  <span>{country.safetyScore}</span>
                                  <span className="text-[10px] text-slate-400 font-normal">/ 100</span>
                                </div>
                                <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                      width: `${country.safetyScore}%`,
                                      backgroundColor:
                                        country.safetyScore >= 80
                                          ? '#10b981'
                                          : country.safetyScore >= 60
                                          ? '#f59e0b'
                                          : country.safetyScore >= 40
                                          ? '#f97316'
                                          : '#ef4444',
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </td>

                          {/* Visa */}
                          <td className="p-3 text-[11px] text-slate-600 font-medium">
                            {country.visaAccessibility}
                          </td>

                          {/* Infrastructure */}
                          <td className="p-3 text-center font-bold text-slate-800">
                            {country.infrastructureScore} / 10
                          </td>

                          {/* Adventure */}
                          <td className="p-3 text-center font-bold text-slate-800">
                            ⚡ {country.adventureScore}
                          </td>

                          {/* In Game Territory */}
                          <td className="p-3">
                            {territory ? (
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="w-2.5 h-2.5 rounded-full shrink-0"
                                  style={{ backgroundColor: territory.color }}
                                />
                                <span className="font-bold text-slate-900 text-xs truncate max-w-[130px]">
                                  {territory.name}
                                </span>
                                {territory.countryIds.length > 1 && (
                                  <span className="text-[10px] text-slate-400">
                                    ({territory.countryIds.length} países)
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="p-3 text-center">
                            {isEditing ? (
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={() => handleSaveEdit(country.id)}
                                  className="p-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
                                  title="Salvar"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setEditingCountryId(null)}
                                  className="p-1 rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors"
                                  title="Cancelar"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleStartEdit(country)}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors"
                                title="Editar Atributos"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 px-5 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-800">{territories.length}</span> Territórios no Tabuleiro
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-emerald-700">{activeCountryIds.size}</span> Nações Ativas
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sky-700">{COUNTRIES_DB.length - activeCountryIds.size}</span> Nações Fundidas
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-sm active:scale-95"
            >
              Fechar Tabela
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
