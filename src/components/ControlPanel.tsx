import React, { useState, useMemo } from 'react';
import { CountryData, TerritoryGroup, PresetType, MapArchetype } from '../types';
import { COUNTRIES_DB, CONTINENT_NAMES, CONTINENT_COLORS } from '../data/countries';
import { MAP_ARCHETYPES } from '../data/presets';
import {
  Search,
  Compass,
  Layers,
  CheckCircle,
  XCircle,
  Globe,
  MapPin,
  Sparkles,
  Filter,
  RefreshCw,
  ChevronRight,
  FileSpreadsheet,
  Share2,
  Award,
} from 'lucide-react';

interface ControlPanelProps {
  activeCountryIds: Set<string>;
  territories: TerritoryGroup[];
  selectedTerritoryId: string | null;
  onToggleCountry: (countryId: string) => void;
  onSelectTerritory: (territoryId: string) => void;
  onApplyPreset: (preset: PresetType) => void;
  onToggleAllInContinent: (continentCode: string, activate: boolean) => void;
  onResetAll: () => void;
  onOpenTable: () => void;
  onOpenSharePublish: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  activeCountryIds,
  territories,
  selectedTerritoryId,
  onToggleCountry,
  onSelectTerritory,
  onApplyPreset,
  onToggleAllInContinent,
  onResetAll,
  onOpenTable,
  onOpenSharePublish,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedContinent, setSelectedContinent] = useState<string>('ALL');
  const [filterMode, setFilterMode] = useState<'all' | 'active' | 'merged'>('all');

  // Mapping from countryId -> Which territory it currently belongs to
  const countryToTerritoryMap = useMemo(() => {
    const map = new Map<string, TerritoryGroup>();
    for (const t of territories) {
      for (const cId of t.countryIds) {
        map.set(cId, t);
      }
    }
    return map;
  }, [territories]);

  // Filtered countries
  const filteredCountries = useMemo(() => {
    return COUNTRIES_DB.filter(c => {
      const matchesSearch =
        c.namePt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.capital.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesContinent = selectedContinent === 'ALL' || c.continentCode === selectedContinent;
      const isActive = activeCountryIds.has(c.id);

      if (!matchesSearch || !matchesContinent) return false;

      if (filterMode === 'active') return isActive;
      if (filterMode === 'merged') return !isActive;
      return true;
    });
  }, [searchQuery, selectedContinent, filterMode, activeCountryIds]);

  // Continent stats
  const continentStats = useMemo(() => {
    const stats: Record<string, { total: number; active: number }> = {};
    for (const code of Object.keys(CONTINENT_NAMES)) {
      const countries = COUNTRIES_DB.filter(c => c.continentCode === code);
      const active = countries.filter(c => activeCountryIds.has(c.id)).length;
      stats[code] = { total: countries.length, active };
    }
    return stats;
  }, [activeCountryIds]);

  return (
    <div
      id="backpacker-control-panel"
      className="flex flex-col h-full bg-white border-l border-slate-200 shadow-xl overflow-hidden text-slate-800"
    >
      {/* Header with Title & Quick Presets */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/70 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
                Seletor de Destinos
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Ligue ou desligue para fundir automaticamente
              </p>
            </div>
          </div>

          <button
            id="btn-reset-all-countries"
            onClick={onResetAll}
            title="Ligar todos os países"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold transition-colors shadow-sm"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Ligar Todos</span>
          </button>
        </div>

        {/* Quick Action Hub: Table and Archetypes */}
        <div className="grid grid-cols-2 gap-2">
          <button
            id="btn-sidebar-open-table"
            onClick={onOpenTable}
            className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all shadow-xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tabela & Custo</span>
          </button>

          <button
            id="btn-sidebar-open-archetypes"
            onClick={onOpenSharePublish}
            className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-bold transition-all shadow-xs"
          >
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span>Arquétipos & Votos</span>
          </button>
        </div>

        {/* Quick Presets Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            id="preset-all"
            onClick={() => onApplyPreset('all-active-193')}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-200/80 hover:bg-emerald-500 hover:text-white transition-colors"
          >
            🌍 125 Nações
          </button>
          <button
            id="preset-backpack-42"
            onClick={() => onApplyPreset('backpack-42')}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-200/80 hover:bg-emerald-500 hover:text-white transition-colors"
          >
            🎒 Tabuleiro Clássico (42)
          </button>
          <button
            id="preset-top-20"
            onClick={() => onApplyPreset('top-travel-20')}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-200/80 hover:bg-emerald-500 hover:text-white transition-colors"
          >
            ⭐ 20 Expedições
          </button>
          <button
            id="preset-continents"
            onClick={() => onApplyPreset('continents-6')}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-200/80 hover:bg-emerald-500 hover:text-white transition-colors"
          >
            🗺️ 6 Continentes
          </button>
        </div>
      </div>

      {/* Search & Continent Filter Bar */}
      <div className="p-3 border-b border-slate-100 space-y-2 bg-white">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="input-search-countries"
            type="text"
            placeholder="Buscar país, capital ou atração..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-100/90 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ×
            </button>
          )}
        </div>

        {/* Continent Buttons Filter */}
        <div className="grid grid-cols-4 gap-1">
          <button
            id="filter-continent-all"
            onClick={() => setSelectedContinent('ALL')}
            className={`px-2 py-1 rounded-lg text-[11px] font-bold text-center transition-colors ${
              selectedContinent === 'ALL'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({activeCountryIds.size})
          </button>

          {Object.entries(CONTINENT_NAMES).map(([code, name]) => {
            const isSelected = selectedContinent === code;
            const stats = continentStats[code];

            return (
              <button
                key={code}
                id={`filter-continent-${code}`}
                onClick={() => setSelectedContinent(code)}
                className={`px-1.5 py-1 rounded-lg text-[11px] font-bold text-center truncate transition-colors border ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                title={name}
              >
                {code} ({stats?.active ?? 0})
              </button>
            );
          })}
        </div>

        {/* Continent Batch Actions (Ligar/Desligar Continente Atual) */}
        {selectedContinent !== 'ALL' && (
          <div className="flex items-center justify-between pt-1 text-[11px]">
            <span className="font-bold text-slate-600">
              {CONTINENT_NAMES[selectedContinent]}:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                id={`btn-enable-all-${selectedContinent}`}
                onClick={() => onToggleAllInContinent(selectedContinent, true)}
                className="px-2 py-0.5 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-[10px]"
              >
                Ligar Todos
              </button>
              <button
                id={`btn-disable-all-${selectedContinent}`}
                onClick={() => onToggleAllInContinent(selectedContinent, false)}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px]"
              >
                Fundir Todos
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Countries List with Instant Toggle Switches */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {filteredCountries.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            Nenhum país encontrado para "{searchQuery}"
          </div>
        ) : (
          filteredCountries.map(country => {
            const isActive = activeCountryIds.has(country.id);
            const parentTerritory = countryToTerritoryMap.get(country.id);

            return (
              <div
                key={country.id}
                id={`country-item-${country.id}`}
                className={`p-2.5 flex items-center justify-between transition-colors hover:bg-slate-50 ${
                  isActive ? 'bg-white' : 'bg-slate-50/80 opacity-90'
                }`}
              >
                {/* Left: Flag + Names & Merged Info */}
                <div
                  className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
                  onClick={() => onToggleCountry(country.id)}
                >
                  <span className="text-xl select-none">{country.flag}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {country.namePt}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {country.iso3}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-0.5">
                      {isActive ? (
                        <span className="inline-flex items-center text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/60">
                          Hub Independente
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[10px] font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded border border-sky-200/60 truncate">
                          Fundido em {parentTerritory?.name || 'Vizinho'}
                        </span>
                      )}

                      <span className="text-[10px] text-slate-500 truncate hidden sm:inline">
                        • ${country.costDailyUsd}/dia (Segurança {country.safetyScore})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Switch Toggle (Ligado / Desligado) */}
                <div className="flex items-center gap-2 ml-2">
                  <button
                    id={`toggle-country-${country.id}`}
                    type="button"
                    role="switch"
                    aria-checked={isActive}
                    onClick={() => onToggleCountry(country.id)}
                    className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isActive ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        isActive ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Status Bar */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-1.5 font-bold">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>{territories.length} Regiões Ativas</span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          {activeCountryIds.size} / {COUNTRIES_DB.length} Ligados
        </span>
      </div>
    </div>
  );
};
