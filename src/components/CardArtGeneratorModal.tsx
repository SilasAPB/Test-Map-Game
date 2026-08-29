import React, { useState } from 'react';
import { TerritoryGroup } from '../types';
import { Sparkles, Image as ImageIcon, X, Loader2, Download, Stamp, Camera } from 'lucide-react';

interface CardArtGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTerritory: TerritoryGroup | null;
}

export const CardArtGeneratorModal: React.FC<CardArtGeneratorModalProps> = ({
  isOpen,
  onClose,
  selectedTerritory,
}) => {
  const [prompt, setPrompt] = useState<string>(
    selectedTerritory
      ? `Vintage travel postcard illustration of ${selectedTerritory.name}, showcasing iconic backpacker sights: ${selectedTerritory.topAttractions.join(', ')}`
      : 'Vintage retro adventure travel stamp, backpacker passport art of world wonders'
  );
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '3:2' | '2:3' | '16:9' | '3:4'>('3:2');
  const [styleTheme, setStyleTheme] = useState<string>('vintage 1950s travel poster, gouache and screenprint art');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/generate-card-art', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          aspectRatio,
          style: styleTheme,
        }),
      });

      const data = await response.json();
      if (data.success && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
      } else {
        throw new Error(data.error || 'Falha ao gerar o cartão postal');
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao conectar ao serviço de imagens');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="modal-postcard-generator"
        className="w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                Estúdio de Cartões Postais & Selos
              </h3>
              <p className="text-xs text-amber-100 font-medium">
                Gere ilustrações vintage exclusivas para os destinos do seu jogo
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

        {/* Form Controls */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-slate-800">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
              Descrição Visual do Destino
            </label>
            <textarea
              id="input-postcard-prompt"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 text-xs rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-800 resize-none font-medium"
              placeholder="Descreva as atrações e estilo do cartão postal..."
            />
          </div>

          {/* Aspect Ratio Selector */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                Formato (Aspect Ratio)
              </label>
              <select
                id="select-aspect-ratio"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as any)}
                className="w-full p-2.5 text-xs font-bold rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="3:2">3:2 (Cartão Postal Clássico)</option>
                <option value="2:3">2:3 (Carta Vertical de Jogo)</option>
                <option value="1:1">1:1 (Selo de Passaporte Quadrado)</option>
                <option value="16:9">16:9 (Panorâmica Widescreen)</option>
                <option value="3:4">3:4 (Retrato Tradicional)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                Estilo Artístico
              </label>
              <select
                id="select-art-style"
                value={styleTheme}
                onChange={(e) => setStyleTheme(e.target.value)}
                className="w-full p-2.5 text-xs font-bold rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="vintage 1950s travel poster, gouache and screenprint art">Cartaz Vintage 1950s</option>
                <option value="modern minimalist flat vector travel badge art">Vetor Minimalista Moderno</option>
                <option value="watercolor sketchbook painting with inked outlines">Aquarela de Diário de Viagem</option>
                <option value="engraved retro postal stamp etching">Selo Postal Entalhado Retro</option>
              </select>
            </div>
          </div>

          <button
            id="btn-generate-art"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 text-white font-black text-xs shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Pintando Cartão Postal com IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Gerar Arte de Viagem</span>
              </>
            )}
          </button>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {error}
            </div>
          )}

          {/* Generated Result Preview */}
          {generatedImage && (
            <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in zoom-in-95">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black flex items-center justify-center">
                <img
                  src={generatedImage}
                  alt="Cartão Postal Gerado"
                  className="w-full h-auto max-h-72 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">
                  Cartão Postal Pronto para Uso
                </span>
                <a
                  href={generatedImage}
                  download={`postal-${selectedTerritory?.name || 'mochileiro'}.png`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-black hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar Imagem</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
