import React, { useState, useMemo } from 'react';
import { MapArchetype, PresetType } from '../types';
import { MAP_ARCHETYPES } from '../data/presets';
import {
  Share2,
  Globe,
  Copy,
  Check,
  ExternalLink,
  ThumbsUp,
  Award,
  Sparkles,
  Download,
  Cloud,
  Github,
  MessageCircle,
  X,
  Play,
  Send,
} from 'lucide-react';

interface SharePublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCountryIds: Set<string>;
  onApplyArchetype: (archetype: MapArchetype) => void;
}

export const SharePublishModal: React.FC<SharePublishModalProps> = ({
  isOpen,
  onClose,
  activeCountryIds,
  onApplyArchetype,
}) => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState<boolean>(false);
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<string>('backpack-42');

  // Voting state (stored in local memory / session)
  const [votes, setVotes] = useState<Record<string, number>>({
    'backpack-42': 4,
    'low-cost-backpack': 3,
    'safe-havens': 2,
    'extreme-adventure': 5,
    'digital-nomad': 1,
    'all-active-193': 2,
  });
  const [userVotedId, setUserVotedId] = useState<string | null>(null);

  // Generate public link with encoded active country configuration
  const currentUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';
  const shareableUrl = useMemo(() => {
    const encodedIds = Array.from(activeCountryIds).join(',');
    return `${currentUrl}#archetype=${selectedArchetypeId}&active=${encodedIds}`;
  }, [currentUrl, selectedArchetypeId, activeCountryIds]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyWhatsApp = () => {
    const currentArchetype = MAP_ARCHETYPES.find(a => a.id === selectedArchetypeId);
    const text = `🌍 *Votação de Tabuleiro - Jogo dos Mochileiros* 🎒\n\nFala galera! Criei e configurei o mapa do nosso jogo de tabuleiro.\n\n🎲 *Arquétipo Recomendado:* ${currentArchetype?.name || 'Mapa Customizado'}\n✨ *Estilo:* ${currentArchetype?.tagline || ''}\n\n👉 Acesse o mapa interativo, teste as divisas e vote no arquétipo aqui:\n${shareableUrl}`;
    navigator.clipboard.writeText(text);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2500);
  };

  const handleVote = (archetypeId: string) => {
    setVotes(prev => {
      const next = { ...prev };
      if (userVotedId) {
        next[userVotedId] = Math.max(0, (next[userVotedId] || 1) - 1);
      }
      next[archetypeId] = (next[archetypeId] || 0) + 1;
      return next;
    });
    setUserVotedId(archetypeId);
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-share-publish"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-800">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Compartilhar com Amigos & Publicar Jogo
              </h2>
              <p className="text-xs text-slate-600">
                Envie o link do mapa interativo para seus amigos escolherem o melhor arquétipo de tabuleiro.
              </p>
            </div>
          </div>

          <button
            id="btn-close-share-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/80 hover:bg-white text-slate-600 flex items-center justify-center shadow-sm transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* 1. Quick Share Card */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-600" />
                Link Público do Tabuleiro (Já está online!)
              </span>
              <span className="text-[10px] font-bold bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded-full">
                Pronto para Jogar
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareableUrl}
                className="flex-1 px-3 py-2 rounded-xl bg-white border border-emerald-300 text-xs font-mono text-slate-700 select-all focus:outline-none"
              />
              <button
                id="btn-copy-share-url"
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all shadow-sm active:scale-95 shrink-0"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Copiado!' : 'Copiar Link'}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                id="btn-share-whatsapp"
                onClick={handleCopyWhatsApp}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-colors shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{copiedWhatsApp ? 'Mensagem Copiada!' : 'Copiar Texto para WhatsApp / Discord'}</span>
              </button>
            </div>
          </div>

          {/* 2. Archetypes Voting & Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  Galeria de Arquétipos & Votação da Mesa
                </h3>
                <p className="text-xs text-slate-500">
                  Clique para testar no mapa ou vote no seu formato preferido para a partida.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MAP_ARCHETYPES.map(archetype => {
                const isSelected = selectedArchetypeId === archetype.id;
                const voteCount = votes[archetype.id] || 0;
                const hasVoted = userVotedId === archetype.id;

                return (
                  <div
                    key={archetype.id}
                    className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-lg ring-2 ring-emerald-500'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{archetype.icon}</span>
                          <div>
                            <h4 className="text-sm font-black tracking-tight">{archetype.name}</h4>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isSelected ? 'bg-white/20 text-emerald-300' : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {archetype.difficulty} • {archetype.suggestedPlayers}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleVote(archetype.id)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                            hasVoted
                              ? 'bg-amber-400 text-slate-950 shadow-sm'
                              : isSelected
                              ? 'bg-white/10 hover:bg-white/20 text-white'
                              : 'bg-slate-100 hover:bg-amber-50 text-slate-700'
                          }`}
                          title="Votar neste arquétipo"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{voteCount}</span>
                        </button>
                      </div>

                      <p
                        className={`text-xs mt-2.5 line-clamp-2 ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {archetype.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/30 flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] font-bold ${
                          isSelected ? 'text-emerald-400' : 'text-slate-500'
                        }`}
                      >
                        {archetype.activeCountryIds.length} Territórios Base
                      </span>

                      <button
                        onClick={() => {
                          setSelectedArchetypeId(archetype.id);
                          onApplyArchetype(archetype);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                          isSelected
                            ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>{isSelected ? 'Aplicado no Mapa' : 'Aplicar ao Mapa'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Guide on Publishing & Sharing */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs text-slate-700">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Cloud className="w-4 h-4 text-sky-500" />
              Como Funciona a Publicação & Hospedagem?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900">1. Link Direto Imediato</div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  O app já roda em container no <strong>Google Cloud</strong>. Qualquer amigo com o link pode abrir no celular ou computador sem login!
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900">2. Exportar Código (ZIP / Git)</div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  No menu do AI Studio no topo direito, você pode baixar o projeto completo em <strong>ZIP</strong> ou sincronizar com seu <strong>GitHub</strong>.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900">3. Impressão do Tabuleiro</div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Use o botão de <strong>Exportar PNG / SVG em Alta Resolução</strong> para imprimir o mapa em gráfica e montar o tabuleiro físico com cartas!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
