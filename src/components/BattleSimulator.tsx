import React, { useState } from 'react';
import { TerritoryGroup } from '../types';
import { Dices, Swords, Shield, X, RefreshCw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BattleSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  territories: TerritoryGroup[];
  onApplyBattleResult?: (attackerId: string, defenderId: string, attackerLoss: number, defenderLoss: number) => void;
}

interface BattleHistoryItem {
  round: number;
  attackDice: number[];
  defenseDice: number[];
  attackerLosses: number;
  defenderLosses: number;
}

export const BattleSimulator: React.FC<BattleSimulatorProps> = ({
  isOpen,
  onClose,
  territories,
  onApplyBattleResult,
}) => {
  const [attackerId, setAttackerId] = useState<string>(territories[0]?.id || '');
  const [defenderId, setDefenderId] = useState<string>(territories[1]?.id || territories[0]?.id || '');
  const [attackerDiceCount, setAttackerDiceCount] = useState<number>(3);
  const [defenderDiceCount, setDefenderDiceCount] = useState<number>(3);

  const [attackRolls, setAttackRolls] = useState<number[]>([]);
  const [defenseRolls, setDefenseRolls] = useState<number[]>([]);
  const [battleHistory, setBattleHistory] = useState<BattleHistoryItem[]>([]);

  if (!isOpen) return null;

  const attacker = territories.find(t => t.id === attackerId) || territories[0];
  const defender = territories.find(t => t.id === defenderId) || territories[1] || territories[0];

  const rollDie = () => Math.floor(Math.random() * 6) + 1;

  const handleRollBattle = () => {
    const aRolls = Array.from({ length: attackerDiceCount }, rollDie).sort((a, b) => b - a);
    const dRolls = Array.from({ length: defenderDiceCount }, rollDie).sort((a, b) => b - a);

    setAttackRolls(aRolls);
    setDefenseRolls(dRolls);

    // Compute casualties (War rules: ties go to defender)
    const comparisons = Math.min(aRolls.length, dRolls.length);
    let aLoss = 0;
    let dLoss = 0;

    for (let i = 0; i < comparisons; i++) {
      if (aRolls[i] > dRolls[i]) {
        dLoss++;
      } else {
        aLoss++; // Defender wins ties
      }
    }

    setBattleHistory(prev => [
      {
        round: prev.length + 1,
        attackDice: aRolls,
        defenseDice: dRolls,
        attackerLosses: aLoss,
        defenderLosses: dLoss,
      },
      ...prev,
    ]);

    if (dLoss > aLoss) {
      try {
        confetti({ particleCount: 35, spread: 45 });
      } catch {}
    }
  };

  const handleClearHistory = () => {
    setBattleHistory([]);
    setAttackRolls([]);
    setDefenseRolls([]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#0f172a] border-2 border-emerald-500/80 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.3)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-900/40 via-slate-900 to-slate-900 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-lg">
              <Dices className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white uppercase italic">
                Simulador de Combate (Regras Oficiais de War)
              </h2>
              <p className="text-xs text-emerald-300">
                Rolagem de 3d6 Ataque vs 3d6 Defesa com resolução de empates
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar text-slate-200 text-xs">
          {/* Territories Matchup Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Attacker Panel */}
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <Swords className="w-4 h-4" />
                  Atacante (Dados Vermelhos)
                </span>
                <span className="font-mono font-bold text-rose-300">{attacker?.armies || 1} Tropas</span>
              </div>
              <select
                value={attackerId}
                onChange={e => setAttackerId(e.target.value)}
                className="w-full bg-slate-950 border border-rose-500/40 rounded-lg p-2 text-xs text-slate-100"
              >
                {territories.map(t => (
                  <option key={`atk-${t.id}`} value={t.id}>
                    {t.name} ({t.armies} tropas)
                  </option>
                ))}
              </select>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Qtd Dados de Ataque:</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map(n => (
                    <button
                      key={`a-${n}`}
                      onClick={() => setAttackerDiceCount(n)}
                      className={`w-7 h-7 rounded-lg font-mono font-bold text-xs ${
                        attackerDiceCount === n
                          ? 'bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Defender Panel */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  Defensor (Dados Amarelos)
                </span>
                <span className="font-mono font-bold text-amber-300">{defender?.armies || 1} Tropas</span>
              </div>
              <select
                value={defenderId}
                onChange={e => setDefenderId(e.target.value)}
                className="w-full bg-slate-950 border border-amber-500/40 rounded-lg p-2 text-xs text-slate-100"
              >
                {territories.map(t => (
                  <option key={`def-${t.id}`} value={t.id}>
                    {t.name} ({t.armies} tropas)
                  </option>
                ))}
              </select>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Qtd Dados de Defesa:</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map(n => (
                    <button
                      key={`d-${n}`}
                      onClick={() => setDefenderDiceCount(n)}
                      className={`w-7 h-7 rounded-lg font-mono font-bold text-xs ${
                        defenderDiceCount === n
                          ? 'bg-amber-500 text-slate-950 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Roll Button */}
          <div className="flex gap-3">
            <button
              onClick={handleRollBattle}
              className="flex-1 py-3 px-4 rounded-xl font-black uppercase text-sm tracking-wider bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Dices className="w-5 h-5" />
              <span>Rolar Dados de Batalha</span>
            </button>
            {battleHistory.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Active Roll Visualizer */}
          {attackRolls.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="text-[11px] font-black uppercase text-slate-400 text-center tracking-wider">
                Resultado do Confronto
              </h4>

              <div className="flex items-center justify-around">
                {/* Attack Dice */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold text-rose-400 uppercase">Ataque</span>
                  <div className="flex gap-2">
                    {attackRolls.map((val, idx) => (
                      <div
                        key={`atk-die-${idx}`}
                        className="w-12 h-12 rounded-xl bg-rose-600 border-2 border-rose-300 text-white flex items-center justify-center font-black text-2xl shadow-lg transform -rotate-3"
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xl font-black text-slate-600">VS</div>

                {/* Defense Dice */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Defesa</span>
                  <div className="flex gap-2">
                    {defenseRolls.map((val, idx) => (
                      <div
                        key={`def-die-${idx}`}
                        className="w-12 h-12 rounded-xl bg-amber-500 border-2 border-amber-200 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg transform rotate-3"
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Log of Rounds */}
          {battleHistory.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Histórico de Rodadas
              </h5>
              <div className="max-h-40 overflow-y-auto space-y-1.5 custom-scrollbar pr-1">
                {battleHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs font-mono"
                  >
                    <span className="text-slate-400">Round #{item.round}</span>
                    <div className="flex gap-4">
                      <span className="text-rose-400">
                        Atacante: [{item.attackDice.join(', ')}] (-{item.attackerLosses} baixas)
                      </span>
                      <span className="text-amber-400">
                        Defensor: [{item.defenseDice.join(', ')}] (-{item.defenderLosses} baixas)
                      </span>
                    </div>
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
