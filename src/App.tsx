import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { TerritoryGroup, PresetType, MapArchetype, CountryData } from './types';
import { COUNTRIES_DB } from './data/countries';
import {
  buildDynamicTerritories,
  createAllActivePreset,
  createBackpacker42Preset,
  createContinentsPreset,
  createTopExpeditionsPreset,
  createLowCostPreset,
  createSafeHavensPreset,
  createExtremeAdventurePreset,
  createDigitalNomadPreset,
  MAP_ARCHETYPES,
} from './data/presets';
import { WorldMap } from './components/WorldMap';
import { ControlPanel } from './components/ControlPanel';
import { TerritoryCard } from './components/TerritoryCard';
import { StrategyAIModal } from './components/StrategyAIModal';
import { CardArtGeneratorModal } from './components/CardArtGeneratorModal';
import { TravelRouteSimulator } from './components/TravelRouteSimulator';
import { ExportModal } from './components/ExportModal';
import { CountryAttributesTableModal } from './components/CountryAttributesTableModal';
import { SharePublishModal } from './components/SharePublishModal';
import {
  Compass,
  Sparkles,
  Camera,
  Dice5,
  Download,
  Luggage,
  Globe,
  MapPin,
  HelpCircle,
  Menu,
  X,
  FileSpreadsheet,
  Share2,
  Award,
} from 'lucide-react';

export const App: React.FC = () => {
  // Active countries set: By default, all nations start toggled ON (User requirement: "vai comecar ligado em todos")
  const [activeCountryIds, setActiveCountryIds] = useState<Set<string>>(() => {
    // Read from URL hash if shared by a friend
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.replace('#', ''));
      const activeParam = hashParams.get('active');
      if (activeParam) {
        const ids = activeParam.split(',').filter(id => id.trim().length > 0);
        if (ids.length > 0) return new Set(ids);
      }
    }
    return createAllActivePreset();
  });

  // Custom user attribute overrides (persisted in localStorage)
  const [customOverrides, setCustomOverrides] = useState<Record<string, Partial<CountryData>>>(() => {
    try {
      const saved = localStorage.getItem('mochileiros_country_overrides');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save overrides to localStorage
  const handleUpdateCountryOverride = useCallback((countryId: string, updates: Partial<CountryData>) => {
    setCustomOverrides(prev => {
      const next = {
        ...prev,
        [countryId]: { ...(prev[countryId] || {}), ...updates },
      };
      try {
        localStorage.setItem('mochileiros_country_overrides', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  }, []);

  const handleResetOverrides = useCallback(() => {
    setCustomOverrides({});
    try {
      localStorage.removeItem('mochileiros_country_overrides');
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Currently selected territory (opens the passport details card)
  const [selectedTerritoryId, setSelectedTerritoryId] = useState<string | null>(null);

  // Hovered territory
  const [hoveredTerritory, setHoveredTerritory] = useState<TerritoryGroup | null>(null);

  // Map options
  const [showRoutes, setShowRoutes] = useState<boolean>(true);
  const [alwaysShowLabels, setAlwaysShowLabels] = useState<boolean>(false);

  // Mobile drawer state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Modals state
  const [isTableModalOpen, setIsTableModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState<boolean>(false);
  const [isArtModalOpen, setIsArtModalOpen] = useState<boolean>(false);
  const [isSimulatorModalOpen, setIsSimulatorModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Compute dynamic merged territories based on which countries are active
  const territories = useMemo(() => {
    return buildDynamicTerritories(activeCountryIds);
  }, [activeCountryIds]);

  // Selected territory object
  const selectedTerritory = useMemo(() => {
    return territories.find(t => t.id === selectedTerritoryId) || null;
  }, [territories, selectedTerritoryId]);

  // Toggle single country active state (triggers smart neighbor auto-merging)
  const handleToggleCountry = useCallback((countryId: string) => {
    setActiveCountryIds(prev => {
      const next = new Set(prev);
      if (next.has(countryId)) {
        next.delete(countryId);
      } else {
        next.add(countryId);
      }
      return next;
    });
  }, []);

  // Toggle all countries in a continent
  const handleToggleAllInContinent = useCallback((continentCode: string, activate: boolean) => {
    setActiveCountryIds(prev => {
      const next = new Set(prev);
      const continentCountries = COUNTRIES_DB.filter(c => c.continentCode === continentCode);
      for (const c of continentCountries) {
        if (activate) {
          next.add(c.id);
        } else {
          next.delete(c.id);
        }
      }
      return next;
    });
  }, []);

  // Reset all to active countries
  const handleResetAll = useCallback(() => {
    setActiveCountryIds(createAllActivePreset());
  }, []);

  // Apply presets
  const handleApplyPreset = useCallback((preset: PresetType) => {
    switch (preset) {
      case 'all-active-193':
        setActiveCountryIds(createAllActivePreset());
        break;
      case 'backpack-42':
        setActiveCountryIds(createBackpacker42Preset());
        break;
      case 'top-travel-20':
        setActiveCountryIds(createTopExpeditionsPreset());
        break;
      case 'continents-6':
        setActiveCountryIds(createContinentsPreset());
        break;
      case 'low-cost-backpack':
        setActiveCountryIds(createLowCostPreset());
        break;
      case 'safe-havens':
        setActiveCountryIds(createSafeHavensPreset());
        break;
      case 'extreme-adventure':
        setActiveCountryIds(createExtremeAdventurePreset());
        break;
      case 'digital-nomad':
        setActiveCountryIds(createDigitalNomadPreset());
        break;
      default:
        setActiveCountryIds(createAllActivePreset());
    }
  }, []);

  // Apply archetype from modal
  const handleApplyArchetype = useCallback((archetype: MapArchetype) => {
    setActiveCountryIds(new Set(archetype.activeCountryIds));
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 font-sans select-none text-slate-800">
      {/* Top Navbar */}
      <header className="h-16 px-4 md:px-6 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between z-30 shadow-xs">
        {/* Brand & Concept */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Luggage className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black tracking-tight text-slate-900">
                Mochileiros
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 hidden sm:inline">
                Criador de Tabuleiro & Economia
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Desselecione países para fundir automaticamente aos vizinhos mais próximos
            </p>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-2">
          {/* Attributes Table Modal Trigger */}
          <button
            id="btn-open-country-table"
            onClick={() => setIsTableModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all shadow-sm active:scale-95"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span className="hidden sm:inline">Tabela de Atributos & Crime</span>
          </button>

          {/* Share & Vote Archetypes Modal Trigger */}
          <button
            id="btn-open-share-modal"
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black transition-all shadow-sm active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden md:inline">Compartilhar & Votar</span>
          </button>

          <button
            id="btn-open-ai-advisor"
            onClick={() => setIsStrategyModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors shadow-xs hidden lg:flex"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Guia IA</span>
          </button>

          <button
            id="btn-open-art-generator"
            onClick={() => setIsArtModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-colors shadow-xs hidden lg:flex"
          >
            <Camera className="w-4 h-4 text-amber-600" />
            <span>Postais</span>
          </button>

          <button
            id="btn-open-travel-simulator"
            onClick={() => setIsSimulatorModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold transition-colors shadow-xs hidden md:flex"
          >
            <Dice5 className="w-4 h-4 text-sky-600" />
            <span>Simular Jogo</span>
          </button>

          <button
            id="btn-open-export"
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar Tabuleiro</span>
          </button>

          {/* Mobile Sidebar Toggle Button */}
          <button
            id="btn-toggle-mobile-sidebar"
            onClick={() => setIsSidebarOpen(prev => !prev)}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center md:hidden transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Interactive World Map Workspace */}
        <main className="flex-1 p-3 md:p-4 flex flex-col min-w-0 relative">
          <WorldMap
            territories={territories}
            selectedTerritoryId={selectedTerritoryId}
            hoveredTerritory={hoveredTerritory}
            onSelectTerritory={(id) => {
              setSelectedTerritoryId(prev => (prev === id ? null : id));
            }}
            onHoverTerritory={setHoveredTerritory}
            onToggleCountryActive={handleToggleCountry}
            activeCountryCount={activeCountryIds.size}
            showRoutes={showRoutes}
            onToggleRoutes={() => setShowRoutes(prev => !prev)}
            alwaysShowLabels={alwaysShowLabels}
            onToggleAlwaysLabels={() => setAlwaysShowLabels(prev => !prev)}
          />

          {/* Floating Selected Territory Passport Card */}
          {selectedTerritory && (
            <div className="absolute top-6 left-6 z-30 w-80 md:w-96">
              <TerritoryCard
                territory={selectedTerritory}
                onClose={() => setSelectedTerritoryId(null)}
                onToggleCountry={handleToggleCountry}
                activeCountryIds={activeCountryIds}
                onOpenTable={() => setIsTableModalOpen(true)}
              />
            </div>
          )}
        </main>

        {/* Right Sidebar / Country Selector Control Panel */}
        <aside
          className={`w-80 md:w-96 flex-shrink-0 z-30 transition-all duration-300 ease-in-out md:relative absolute inset-y-0 right-0 ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
          }`}
        >
          <ControlPanel
            activeCountryIds={activeCountryIds}
            territories={territories}
            selectedTerritoryId={selectedTerritoryId}
            onToggleCountry={handleToggleCountry}
            onSelectTerritory={setSelectedTerritoryId}
            onApplyPreset={handleApplyPreset}
            onToggleAllInContinent={handleToggleAllInContinent}
            onResetAll={handleResetAll}
            onOpenTable={() => setIsTableModalOpen(true)}
            onOpenSharePublish={() => setIsShareModalOpen(true)}
          />
        </aside>
      </div>

      {/* Attributes Table Modal */}
      <CountryAttributesTableModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        activeCountryIds={activeCountryIds}
        territories={territories}
        onToggleCountry={handleToggleCountry}
        customOverrides={customOverrides}
        onUpdateCountryOverride={handleUpdateCountryOverride}
        onResetOverrides={handleResetOverrides}
      />

      {/* Share, Publish & Archetypes Modal */}
      <SharePublishModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        activeCountryIds={activeCountryIds}
        onApplyArchetype={handleApplyArchetype}
      />

      {/* AI Strategy & Mechanics Guide Modal */}
      <StrategyAIModal
        isOpen={isStrategyModalOpen}
        onClose={() => setIsStrategyModalOpen(false)}
        territories={territories}
        activeCountryCount={activeCountryIds.size}
      />

      {/* Card Postcards Art Generator */}
      <CardArtGeneratorModal
        isOpen={isArtModalOpen}
        onClose={() => setIsArtModalOpen(false)}
        selectedTerritory={selectedTerritory}
      />

      {/* Interactive Travel Board Game Turn Simulator */}
      <TravelRouteSimulator
        isOpen={isSimulatorModalOpen}
        onClose={() => setIsSimulatorModalOpen(false)}
        territories={territories}
      />

      {/* Export to PNG/SVG/Printable Rules Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        territories={territories}
        activeCountryCount={activeCountryIds.size}
      />
    </div>
  );
};

export default App;
