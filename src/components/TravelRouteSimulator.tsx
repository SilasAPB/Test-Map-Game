import React, { useState } from 'react';
import { TerritoryGroup } from '../types';
import { COUNTRIES_DB, CONTINENT_NAMES } from '../data/countries';
import { Plane, Compass, Luggage, Sparkles, X, Dice5, RefreshCw, CheckCircle, ArrowRight, Stamp } from 'lucide-react';

interface TravelRouteSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  territories: TerritoryGroup[];
}

export const TravelRouteSimulator: React.FC<TravelRouteSimulatorProps> = ({
  isOpen,
  onClose,
  territories,
}) => {
  const [originId, setOriginId] = useState<string>(territories[0]?.id || '');
  const [destinationId, setDestinationId] = useState<string>(territories[1]?.id || '');
  const [travelMode, setTravelMode] = useState<'budget' | 'scenic-train' | 'flight'>('scenic-train');
  const [tripLogs, setTripLogs] = useState<{ step: number; event: string; points: number; type: 'bonus' | 'hazard' | 'normal' }[]>([]);
  const [totalPassStamps, setTotalPassStamps] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const originTerritory = territories.find(t => t.id === originId) || territories[0];
  const destTerritory = territories.find(t => t.id === destinationId) || territories[1] || territories[0];

  const travelEvents = [
    { title: 'Conexão suave e tempo ensolarado!', points: 3, type: 'bonus' as const },
    { title: 'Carona épica com outros viajantes e dicas secretas', points: 4, type: 'bonus' as const },
    { title: 'Festival de rua típico e banquete gastronômico', points: 5, type: 'bonus' as const },
    { title: 'Trilha panorâmica deslumbrante pela montanha', points: 3, type: 'bonus' as const },
    { title: 'Tempestade tropical atrasou a partida (+1 dia de descanso)', points: 1, type: 'hazard' as const },
    { title: 'Esqueceu o adaptador de tomada no hostel', points: 1, type: 'hazard' as const },
    { title: 'Travessia de balsa cênica entre ilhas', points: 3, type: 'bonus' as const },
    { title: 'Carimbo raro conquistado na fronteira remota!', points: 6, type: 'bonus' as const },
  ];

  const handleSimulateTrip = () => {
    const logs = [];
    let stampsEarned = 0;

    const baseStamps = (originTerritory?.travelPassCost || 2) + (destTerritory?.travelPassCost || 2);
    stampsEarned += baseStamps;

    logs.push({
      step: 1,
      event: `Partida de ${originTerritory?.name} (${originTerritory?.travelCategory}) com mochila pronta!`,
      points: originTerritory?.travelPassCost || 2,
      type: 'normal' as const,
    });

    // 2-3 random journey incidents
    const numEvents = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < numEvents; i++) {
      const randEvent = travelEvents[Math.floor(Math.random() * travelEvents.length)];
      stampsEarned += randEvent.points;
      logs.push({
        step: i + 2,
        event: randEvent.title,
        points: randEvent.points,
        type: randEvent.type,
      });
    }

    logs.push({
      step: logs.length + 1,
      event: `Chegada com sucesso em ${destTerritory?.name}! Visita a ${destTerritory?.topAttractions[0] || 'pontos históricos'}.`,
      points: destTerritory?.travelPassCost || 2,
      type: 'bonus' as const,
    });

    setTripLogs(logs);
    setTotalPassStamps(stampsEarned);
    setIsCompleted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="modal-travel-simulator"
        className="w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                Simulador de Expedição & Mochilão
              </h3>
              <p className="text-xs text-sky-100 font-medium">
                Teste as travessias entre os destinos criados no seu mapa
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
          {/* Origin & Destination Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1">
                Ponto de Partida 🛫
              </label>
              <select
                id="select-origin-territory"
                value={originId}
                onChange={(e) => setOriginId(e.target.value)}
                className="w-full p-2.5 text-xs font-bold rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-sky-500"
              >
                {territories.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({CONTINENT_NAMES[t.continentCode]})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1">
                Ponto de Chegada 🛬
              </label>
              <select
                id="select-dest-territory"
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                className="w-full p-2.5 text-xs font-bold rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-sky-500"
              >
                {territories.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({CONTINENT_NAMES[t.continentCode]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Travel Style */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setTravelMode('budget')}
              className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-colors ${
                travelMode === 'budget'
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              🎒 Mochilão & Carona
            </button>
            <button
              onClick={() => setTravelMode('scenic-train')}
              className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-colors ${
                travelMode === 'scenic-train'
                  ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              🚂 Trem Cênico & Trilhas
            </button>
            <button
              onClick={() => setTravelMode('flight')}
              className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-colors ${
                travelMode === 'flight'
                  ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              ✈️ Voo Panorâmico
            </button>
          </div>

          {/* Simulate Button */}
          <button
            id="btn-run-travel-sim"
            onClick={handleSimulateTrip}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-black text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <Dice5 className="w-4 h-4" />
            <span>Rolar Dados & Simular Expedição</span>
          </button>

          {/* Result Logs */}
          {tripLogs.length > 0 && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Stamp className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="text-xs font-black text-emerald-900">
                      Expedição Concluída com Sucesso!
                    </div>
                    <div className="text-[11px] text-emerald-700">
                      Roteiro integrado: {originTerritory?.name} ➔ {destTerritory?.name}
                    </div>
                  </div>
                </div>

                <span className="text-sm font-black text-emerald-700 bg-white px-3 py-1 rounded-xl shadow-sm">
                  ⭐ +{totalPassStamps} Pontos
                </span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {tripLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                      log.type === 'bonus'
                        ? 'bg-emerald-50/70 border-emerald-100 text-emerald-900'
                        : log.type === 'hazard'
                        ? 'bg-amber-50/70 border-amber-100 text-amber-900'
                        : 'bg-slate-50 border-slate-100 text-slate-800'
                    }`}
                  >
                    <span>{log.event}</span>
                    <span className="font-bold text-[11px] opacity-80">
                      +{log.points} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
