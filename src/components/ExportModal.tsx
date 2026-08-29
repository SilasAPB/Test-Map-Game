import React, { useState } from 'react';
import { TerritoryGroup } from '../types';
import { COUNTRIES_DB, CONTINENT_NAMES } from '../data/countries';
import { Download, Copy, Check, FileJson, FileText, X, Compass, Stamp } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  territories: TerritoryGroup[];
  activeCountryCount: number;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  territories,
  activeCountryCount,
}) => {
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'markdown-rulebook' | 'csv'>('json');

  if (!isOpen) return null;

  const generateExportData = () => {
    if (exportFormat === 'json') {
      return JSON.stringify(
        {
          gameName: "Mochileiros - Tabuleiro de Viagem Global",
          totalTerritories: territories.length,
          activeCountriesCount: activeCountryCount,
          exportedAt: new Date().toISOString(),
          territories: territories.map(t => ({
            id: t.id,
            name: t.name,
            continent: CONTINENT_NAMES[t.continentCode],
            travelCategory: t.travelCategory,
            passportPassCost: t.travelPassCost,
            totalAreaKm2: t.totalAreaKm2,
            totalPopulation: t.totalPopulation,
            fusedCountriesCount: t.countryIds.length,
            memberCountries: COUNTRIES_DB.filter(c => t.countryIds.includes(c.id)).map(c => ({
              name: c.namePt,
              iso3: c.iso3,
              flag: c.flag,
              attraction: c.famousAttraction,
            })),
          })),
        },
        null,
        2
      );
    } else if (exportFormat === 'markdown-rulebook') {
      let md = `# 🎒 Mochileiros: Manual de Destinos & Regras do Tabuleiro\n\n`;
      md += `**Total de Destinos:** ${territories.length} Regiões\n`;
      md += `**Nações Ativas Integradas:** ${activeCountryCount} Países\n\n`;
      md += `## 🗺️ Tabela de Destinos de Viagem\n\n`;
      md += `| Destino | Continente | Categoria | Pontos | Países Incluídos |\n`;
      md += `|---|---|---|---|---|\n`;

      territories.forEach(t => {
        const flag = COUNTRIES_DB.find(c => c.id === t.largestCountryId)?.flag || '🌍';
        const membersList = COUNTRIES_DB.filter(c => t.countryIds.includes(c.id)).map(c => c.namePt).join(', ');
        md += `| ${flag} **${t.name}** | ${CONTINENT_NAMES[t.continentCode]} | ${t.travelCategory} | ⭐ ${t.travelPassCost} | ${membersList} |\n`;
      });

      return md;
    } else {
      let csv = "ID,Nome,Continente,Categoria,Pontos,PaisesIncluidos\n";
      territories.forEach(t => {
        const members = COUNTRIES_DB.filter(c => t.countryIds.includes(c.id)).map(c => c.namePt).join('; ');
        csv += `"${t.id}","${t.name}","${CONTINENT_NAMES[t.continentCode]}","${t.travelCategory}",${t.travelPassCost},"${members}"\n`;
      });
      return csv;
    }
  };

  const exportText = generateExportData();

  const handleCopy = () => {
    navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = exportFormat === 'json' ? 'json' : exportFormat === 'markdown-rulebook' ? 'md' : 'csv';
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mochileiros-tabuleiro-mapa.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="modal-export-map"
        className="w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                Exportar Mapa & Baralho de Destinos
              </h3>
              <p className="text-xs text-emerald-100 font-medium">
                Baixe a estrutura do tabuleiro para impressão ou regras
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
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-slate-800">
          {/* Format Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExportFormat('json')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${
                exportFormat === 'json'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              JSON Estruturado
            </button>
            <button
              onClick={() => setExportFormat('markdown-rulebook')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${
                exportFormat === 'markdown-rulebook'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Manual / Markdown
            </button>
            <button
              onClick={() => setExportFormat('csv')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${
                exportFormat === 'csv'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tabela CSV
            </button>
          </div>

          {/* Code Viewer Box */}
          <div className="relative rounded-2xl bg-slate-900 p-4 font-mono text-xs text-emerald-400 max-h-60 overflow-y-auto border border-slate-800 shadow-inner">
            <pre className="whitespace-pre-wrap">{exportText}</pre>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              id="btn-copy-export"
              onClick={handleCopy}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-slate-200"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Conteúdo</span>
                </>
              )}
            </button>

            <button
              id="btn-download-export"
              onClick={handleDownload}
              className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center justify-center gap-2 transition-colors shadow-md shadow-emerald-600/20"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Arquivo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
