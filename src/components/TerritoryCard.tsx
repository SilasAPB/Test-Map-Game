import React from 'react';
import { TerritoryGroup } from '../types';
import { COUNTRIES_DB, CONTINENT_NAMES, CONTINENT_COLORS } from '../data/countries';
import {
  Compass,
  MapPin,
  Globe,
  Sparkles,
  X,
  ChevronRight,
  Check,
  Stamp,
  Luggage,
  Navigation,
  Shield,
  DollarSign,
  AlertTriangle,
  FileText,
  Zap,
} from 'lucide-react';

interface TerritoryCardProps {
  territory: TerritoryGroup;
  onClose: () => void;
  onToggleCountry: (countryId: string) => void;
  activeCountryIds: Set<string>;
  onOpenTable?: () => void;
}

export const TerritoryCard: React.FC<TerritoryCardProps> = ({
  territory,
  onClose,
  onToggleCountry,
  activeCountryIds,
  onOpenTable,
}) => {
  const largestCountry = COUNTRIES_DB.find(c => c.id === territory.largestCountryId);
  const memberCountries = COUNTRIES_DB.filter(c => territory.countryIds.includes(c.id));
  const continentColor = CONTINENT_COLORS[territory.continentCode] || CONTINENT_COLORS.SA;

  return (
    <div
      id={`passport-card-${territory.id}`}
      className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-slate-800 animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Top Passport Banner */}
      <div
        className="p-4 relative overflow-hidden"
        style={{
          backgroundColor: continentColor.fill,
          color: continentColor.text,
        }}
      >
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-4xl filter drop-shadow select-none">
              {largestCountry?.flag || '🌍'}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/90 text-slate-900 px-2 py-0.5 rounded-full shadow-sm">
                  {CONTINENT_NAMES[territory.continentCode]}
                </span>
                {memberCountries.length > 1 && (
                  <span className="text-[10px] font-bold bg-white/80 text-slate-800 px-2 py-0.5 rounded-full">
                    {memberCountries.length} Nações Unidas
                  </span>
                )}
              </div>
              <h3 className="text-xl font-black tracking-tight text-slate-900 mt-1">
                {territory.name}
              </h3>
            </div>
          </div>

          <button
            id="btn-close-territory-card"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center transition-colors shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Diagonal Watermark Stamp */}
        <div className="absolute right-3 -bottom-4 opacity-15 rotate-12 pointer-events-none">
          <Stamp className="w-24 h-24 text-black" />
        </div>
      </div>

      {/* Body Information */}
      <div className="p-4 space-y-4">
        {/* Travel Stats: Cost & Safety */}
        <div className="grid grid-cols-2 gap-2">
          {/* Daily Cost */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <div className="flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] uppercase font-bold">Custo de Vida</span>
              </div>
              <span className="text-[10px] font-black text-emerald-800">
                {Math.min(5, Math.max(1, Math.round(territory.avgCostLevel)))}/5
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-slate-900">
                ${territory.avgCostDailyUsd} <span className="text-[10px] font-normal text-slate-500">/dia</span>
              </span>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map(s => {
                  const filled = s <= Math.min(5, Math.max(1, Math.round(territory.avgCostLevel)));
                  return (
                    <span
                      key={s}
                      className={`text-xs font-black leading-none ${
                        filled ? 'text-emerald-700 font-extrabold' : 'text-slate-200'
                      }`}
                    >
                      $
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Safety & Crime */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <div className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-sky-600" />
                <span className="text-[10px] uppercase font-bold">Criminalidade</span>
              </div>
              <span className="text-[10px] font-black text-slate-700">
                {Math.min(5, Math.max(1, Math.round(territory.avgCrimeRank || 2)))}/5
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`text-[9.5px] font-black px-1.5 py-0.5 rounded-full ${
                  territory.dominantCrimeLevel === 'Baixo'
                    ? 'bg-emerald-100 text-emerald-800'
                    : territory.dominantCrimeLevel === 'Moderado'
                    ? 'bg-amber-100 text-amber-800'
                    : territory.dominantCrimeLevel === 'Alto'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {territory.dominantCrimeLevel}
              </span>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map(s => {
                  const filled = s <= Math.min(5, Math.max(1, Math.round(territory.avgCrimeRank || 2)));
                  return (
                    <span
                      key={s}
                      className={`text-xs leading-none ${
                        filled ? 'opacity-100' : 'opacity-20 grayscale'
                      }`}
                    >
                      🥷
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Category & Pass Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Luggage className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold text-slate-400">
                Categoria
              </div>
              <div className="text-xs font-bold text-slate-800 truncate">
                {territory.travelCategory}
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Stamp className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">
                Carimbos / Pontos
              </div>
              <div className="text-xs font-black text-slate-800">
                ⭐ {territory.travelPassCost} Pontos
              </div>
            </div>
          </div>
        </div>

        {/* Visa & Travel Profile */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            <span className="font-medium">{territory.visaDifficultySummary}</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-[11px] text-slate-500">
            <span>Infra: {territory.avgInfrastructure}/10</span>
            <span>•</span>
            <span>Aventura: {territory.avgAdventure}/10</span>
          </div>
        </div>

        {/* Member Countries breakdown */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
              Países neste Destino ({memberCountries.length})
            </span>
            <span className="text-[11px] text-slate-400">
              {(territory.totalAreaKm2 / 1000).toLocaleString('pt-BR')} mil km²
            </span>
          </div>

          <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
            {memberCountries.map(c => {
              const isActive = activeCountryIds.has(c.id);
              const isHost = c.id === territory.largestCountryId;

              return (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-xs border border-slate-100"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{c.flag}</span>
                    <div>
                      <div className="font-bold text-slate-800 flex items-center gap-1">
                        <span>{c.namePt}</span>
                        {isHost && (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-black">
                            Hub Principal
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                        <span>${c.costDailyUsd}/dia</span>
                        <span>•</span>
                        <span>Segurança {c.safetyScore}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    id={`card-toggle-${c.id}`}
                    onClick={() => onToggleCountry(c.id)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    {isActive ? 'Ativo' : 'Fundido'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Attractions Highlights */}
        {territory.topAttractions && territory.topAttractions.length > 0 && (
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-900 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Roteiro & Atrações Principais</span>
            </div>
            <div className="space-y-1">
              {territory.topAttractions.map((att, idx) => (
                <div key={idx} className="text-xs text-emerald-800 flex items-center gap-1">
                  <span>•</span>
                  <span>{att}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
