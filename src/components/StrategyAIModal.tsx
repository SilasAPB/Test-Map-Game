import React, { useState } from 'react';
import { TerritoryGroup, StrategicAnalysis } from '../types';
import { CONTINENT_NAMES } from '../data/countries';
import { Sparkles, Compass, CheckCircle2, AlertCircle, X, Loader2, MapPin, Award, Luggage } from 'lucide-react';

interface StrategyAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  territories: TerritoryGroup[];
  activeCountryCount: number;
}

export const StrategyAIModal: React.FC<StrategyAIModalProps> = ({
  isOpen,
  onClose,
  territories,
  activeCountryCount,
}) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<StrategicAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [travelTheme, setTravelTheme] = useState<string>('Mochilão Global & Expedição Cultural');

  if (!isOpen) return null;

  const handleGenerateAdvisor = async () => {
    setLoading(true);
    setError(null);

    // Prepare distribution
    const continentDistribution: Record<string, number> = {};
    for (const t of territories) {
      const name = CONTINENT_NAMES[t.continentCode] || t.continentCode;
      continentDistribution[name] = (continentDistribution[name] || 0) + 1;
    }

    try {
      const response = await fetch('/api/ai/strategy-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          territoryCount: territories.length,
          continentDistribution,
          gameStyle: travelTheme,
          territoryList: territories.map(t => ({
            name: t.name,
            continent: CONTINENT_NAMES[t.continentCode],
            membersCount: t.countryIds.length,
            category: t.travelCategory,
          })),
        }),
      });

      const data = await response.json();
      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
      } else {
        throw new Error(data.error || 'Não foi possível gerar a análise.');
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao conectar ao Gemini AI');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="modal-strategy-advisor"
        className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                Conselheiro de Mochilão & Roteiros IA
              </h3>
              <p className="text-xs text-emerald-100 font-medium">
                Análise de equilíbrio de viagem e cartas de objetivos com Gemini
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-slate-800">
          {/* Current Map Snapshot */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Compass className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Configuração Atual do Tabuleiro
                </div>
                <div className="text-[11px] text-slate-500">
                  {territories.length} destinos formados • {activeCountryCount} nações independentes
                </div>
              </div>
            </div>

            <button
              id="btn-run-ai-advisor"
              onClick={handleGenerateAdvisor}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black shadow-md shadow-emerald-600/20 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analisando Roteiros...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Gerar Guia & Objetivos</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Results Display */}
          {analysis && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Balance Score Bar */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase text-emerald-900">
                    Pontuação de Fluidez & Equilíbrio do Tabuleiro
                  </span>
                  <span className="text-sm font-black text-emerald-700">
                    {analysis.balanceScore} / 100
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-emerald-200/60 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${analysis.balanceScore}%` }}
                  />
                </div>
                <p className="text-xs text-slate-700 mt-2.5 leading-relaxed font-medium">
                  {analysis.feedbackSummary}
                </p>
              </div>

              {/* Chokepoints / Hubs */}
              {analysis.chokepointsInsight && (
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200">
                  <div className="flex items-center gap-2 text-xs font-black text-sky-900 mb-1">
                    <MapPin className="w-4 h-4 text-sky-600" />
                    <span>Conexões & Hubs de Travessia Vitais</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {analysis.chokepointsInsight}
                  </p>
                </div>
              )}

              {/* Secret Travel Mission Cards */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                  <Luggage className="w-4 h-4 text-emerald-600" />
                  <span>Cartas de Objetivos de Viagem Geradas</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {analysis.customMissions?.map((mission, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-slate-900">
                          {mission.title}
                        </span>
                        <span
                          className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                            mission.difficulty === 'Fácil'
                              ? 'bg-emerald-100 text-emerald-800'
                              : mission.difficulty === 'Médio'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {mission.difficulty}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-normal">
                        {mission.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!analysis && !loading && (
            <div className="p-8 text-center text-slate-400 space-y-2">
              <Compass className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-xs font-medium">
                Clique no botão acima para a IA avaliar seu mapa e gerar 4 objetivos de mochilão personalizados para o seu jogo de tabuleiro!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
