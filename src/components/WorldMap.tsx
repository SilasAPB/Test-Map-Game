import React, { useMemo, useState, useRef } from 'react';
import * as d3Geo from 'd3-geo';
import * as topojson from 'topojson-client';
import worldAtlasData from 'world-atlas/countries-110m.json';
import { TerritoryGroup, TravelRoute } from '../types';
import { COUNTRIES_DB, CONTINENT_COLORS, getCrimeDescription } from '../data/countries';
import { PRESET_TRAVEL_ROUTES } from '../data/presets';
import { Plus, Minus, RotateCcw, Compass, MapPin, Plane, Layers, Eye, EyeOff, Shield, DollarSign } from 'lucide-react';

interface WorldMapProps {
  territories: TerritoryGroup[];
  selectedTerritoryId: string | null;
  hoveredTerritory: TerritoryGroup | null;
  onSelectTerritory: (territoryId: string) => void;
  onHoverTerritory: (territory: TerritoryGroup | null, mouseEvent?: React.MouseEvent) => void;
  onToggleCountryActive?: (countryId: string) => void;
  activeCountryCount: number;
  showRoutes: boolean;
  onToggleRoutes: () => void;
  alwaysShowLabels: boolean;
  onToggleAlwaysLabels: () => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  territories,
  selectedTerritoryId,
  hoveredTerritory,
  onSelectTerritory,
  onHoverTerritory,
  activeCountryCount,
  showRoutes,
  onToggleRoutes,
  alwaysShowLabels,
  onToggleAlwaysLabels,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Map dimensions
  const width = 1000;
  const height = 550;

  // D3 Projection: Natural Earth (harmonious global curves, beautiful for travel board games)
  const projection = useMemo(() => {
    return d3Geo
      .geoNaturalEarth1()
      .scale(168)
      .translate([width / 2, height / 2 + 8]);
  }, [width, height]);

  const pathGenerator = useMemo(() => {
    return d3Geo.geoPath().projection(projection);
  }, [projection]);

  // Pre-calculate graticule (lat/lon navigation lines)
  const graticuleLines = useMemo(() => {
    const graticule = d3Geo.geoGraticule10();
    return pathGenerator(graticule) || '';
  }, [pathGenerator]);

  // Ocean Sphere outline
  const oceanPath = useMemo(() => {
    return pathGenerator({ type: 'Sphere' }) || '';
  }, [pathGenerator]);

  // Map of countryId -> Geometry from TopoJSON
  const countryGeomMap = useMemo(() => {
    const map = new Map<string, any>();
    const geometries = (worldAtlasData.objects as any).countries.geometries;
    for (const geom of geometries) {
      const idStr = String(geom.id).padStart(3, '0');
      map.set(idStr, geom);
      if (geom.properties?.name) {
        map.set(geom.properties.name.toLowerCase(), geom);
      }
    }
    return map;
  }, []);

  // Compute merged SVG paths for every active TerritoryGroup
  const renderedTerritories = useMemo(() => {
    const results: {
      territory: TerritoryGroup;
      pathData: string;
      centroid: [number, number] | null;
      largestCountryName: string;
      largestFlag: string;
      memberCountries: typeof COUNTRIES_DB;
    }[] = [];

    for (const t of territories) {
      if (t.countryIds.length === 0) continue;

      // Find all matching geometries for countries inside this territory
      const matchingGeoms: any[] = [];
      for (const cId of t.countryIds) {
        const geom = countryGeomMap.get(cId);
        if (geom) {
          matchingGeoms.push(geom);
        }
      }

      if (matchingGeoms.length === 0) continue;

      let featureOrGeometry: any = null;
      try {
        if (matchingGeoms.length === 1) {
          featureOrGeometry = topojson.feature(worldAtlasData as any, matchingGeoms[0]);
        } else {
          // Dynamic TopoJSON Merge: Combines multi-country regions into 1 unified polygon without internal borders!
          featureOrGeometry = topojson.merge(worldAtlasData as any, matchingGeoms);
        }
      } catch (err) {
        featureOrGeometry = topojson.feature(worldAtlasData as any, matchingGeoms[0]);
      }

      if (!featureOrGeometry) continue;

      const pathData = pathGenerator(featureOrGeometry);
      if (!pathData) continue;

      // Find centroid for label/badge placement
      let centroid: [number, number] | null = null;
      try {
        const c = pathGenerator.centroid(featureOrGeometry);
        if (c && !isNaN(c[0]) && !isNaN(c[1])) {
          centroid = [c[0], c[1]];
        }
      } catch {
        const largestCountry = COUNTRIES_DB.find(c => c.id === t.largestCountryId);
        if (largestCountry) {
          const projected = projection(largestCountry.coords);
          if (projected) centroid = projected;
        }
      }

      const largestCountry = COUNTRIES_DB.find(c => c.id === t.largestCountryId);
      const memberCountries = COUNTRIES_DB.filter(c => t.countryIds.includes(c.id));

      results.push({
        territory: t,
        pathData,
        centroid,
        largestCountryName: largestCountry?.namePt || t.name,
        largestFlag: largestCountry?.flag || '🌍',
        memberCountries,
      });
    }

    return results;
  }, [territories, countryGeomMap, pathGenerator, projection]);

  // Centroid lookup for travel routes
  const centroidMap = useMemo(() => {
    const map = new Map<string, [number, number]>();
    for (const rt of renderedTerritories) {
      if (rt.centroid) {
        map.set(rt.territory.id, rt.centroid);
      }
    }
    return map;
  }, [renderedTerritories]);

  // Travel routes curved paths
  const travelRoutePaths = useMemo(() => {
    if (!showRoutes) return [];
    return PRESET_TRAVEL_ROUTES.map(route => {
      const fromPos = centroidMap.get(route.fromTerritoryId);
      const toPos = centroidMap.get(route.toTerritoryId);
      if (!fromPos || !toPos) return null;

      const dx = toPos[0] - fromPos[0];
      const dy = toPos[1] - fromPos[1];
      const cx = (fromPos[0] + toPos[0]) / 2 - dy * 0.18;
      const cy = (fromPos[1] + toPos[1]) / 2 + dx * 0.18;

      return {
        id: route.id,
        name: route.name,
        d: `M ${fromPos[0]} ${fromPos[1]} Q ${cx} ${cy} ${toPos[0]} ${toPos[1]}`,
        type: route.type,
      };
    }).filter(Boolean);
  }, [showRoutes, centroidMap]);

  // Zoom & Pan Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.target as HTMLElement).tagName === 'svg' || (e.target as HTMLElement).id === 'ocean-bg') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.88;
    setZoomLevel(prev => Math.min(Math.max(0.65, prev * zoomFactor), 4.5));
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      id="backpacker-map-canvas"
      className="relative w-full h-full min-h-[560px] bg-gradient-to-b from-[#e0f2fe] via-[#bae6fd] to-[#93c5fd] overflow-hidden select-none cursor-grab active:cursor-grabbing rounded-2xl shadow-inner border border-sky-200/80 flex items-center justify-center"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        handleMouseUp();
        onHoverTerritory(null);
      }}
      onWheel={handleWheel}
    >
      {/* Top Left Navigation Header */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-sky-100 shadow-md">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-sm">
            <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '24s' }} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                Mapa dos Mochileiros
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {territories.length} Destinos Ativos
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              {activeCountryCount} / 193 nações independentes
            </p>
          </div>
        </div>
      </div>

      {/* Map Control Tools (Zoom, Reset, Routes toggle, Label toggle) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-sky-200/90 shadow-lg">
        <button
          id="btn-zoom-in"
          onClick={() => setZoomLevel(prev => Math.min(prev * 1.25, 4.5))}
          title="Aproximar Zoom (+)"
          className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-sky-100 hover:text-sky-700 text-slate-700 transition-colors text-sm font-bold shadow-sm"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          id="btn-zoom-out"
          onClick={() => setZoomLevel(prev => Math.max(prev / 1.25, 0.65))}
          title="Afastar Zoom (-)"
          className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-sky-100 hover:text-sky-700 text-slate-700 transition-colors text-sm font-bold shadow-sm"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          id="btn-reset-view"
          onClick={handleResetView}
          title="Centralizar Globo"
          className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-sky-100 hover:text-sky-700 text-slate-700 transition-colors text-sm shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <div className="my-0.5 border-t border-slate-200" />

        <button
          id="btn-toggle-routes"
          onClick={onToggleRoutes}
          title={showRoutes ? "Ocultar Rotas de Viagem" : "Exibir Rotas de Viagem"}
          className={`w-8 h-8 flex items-center justify-center rounded-xl transition-colors text-sm shadow-sm ${
            showRoutes ? 'bg-sky-500 text-white shadow-sky-200' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Plane className="w-4 h-4" />
        </button>

        <button
          id="btn-toggle-always-labels"
          onClick={onToggleAlwaysLabels}
          title={alwaysShowLabels ? "Ocultar Nomes Permanentes (Apenas Hover)" : "Fixar Nomes de Todos os Países"}
          className={`w-8 h-8 flex items-center justify-center rounded-xl transition-colors text-sm shadow-sm ${
            alwaysShowLabels ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          {alwaysShowLabels ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>

        <div className="text-[9px] font-bold text-center text-slate-400 py-0.5">
          {Math.round(zoomLevel * 100)}%
        </div>
      </div>

      {/* Main Interactive SVG Canvas */}
      <svg
        id="world-svg-board"
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full max-h-[85vh] transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`,
          transformOrigin: '50% 50%',
        }}
      >
        <defs>
          {/* Subtle drop shadows for 3D elevation on the game board */}
          <filter id="board-elevation" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="3" stdDeviation="2.5" floodColor="#0369a1" floodOpacity="0.2" />
          </filter>

          <filter id="hover-elevation" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0284c7" floodOpacity="0.35" />
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#ffffff" floodOpacity="0.9" />
          </filter>

          <filter id="selected-elevation" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#059669" floodOpacity="0.6" />
          </filter>

          {/* Ocean Radial Gradient */}
          <radialGradient id="fresh-ocean" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor="#f0f9ff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* Ocean Background / Globe Sphere */}
        <path
          id="ocean-bg"
          d={oceanPath}
          fill="url(#fresh-ocean)"
          stroke="#7dd3fc"
          strokeWidth="2"
          className="transition-colors"
        />

        {/* Graticule Navigation Meridian Grid */}
        <path
          d={graticuleLines}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="0.6"
          strokeDasharray="2,5"
          opacity="0.35"
        />

        {/* Travel Routes (Scenic Flights & Ferries) */}
        {showRoutes && (
          <g id="travel-routes-layer" className="transition-opacity">
            {travelRoutePaths.map(r => (
              <g key={r.id} className="group pointer-events-none">
                <path
                  d={r.d}
                  fill="none"
                  stroke={r.type === 'flight' ? '#0284c7' : r.type === 'ferry' ? '#0d9488' : '#7c3aed'}
                  strokeWidth="2"
                  strokeDasharray={r.type === 'flight' ? '4,4' : '2,3'}
                  className="opacity-70 group-hover:opacity-100"
                />
              </g>
            ))}
          </g>
        )}

        {/* Territories Layer (Unified Polygons) */}
        <g id="territories-layer">
          {renderedTerritories.map(({ territory, pathData, centroid, largestCountryName }) => {
            const isHovered = hoveredTerritory?.id === territory.id;
            const isSelected = selectedTerritoryId === territory.id;
            const continentColor = CONTINENT_COLORS[territory.continentCode] || CONTINENT_COLORS.SA;

            const fillColor = isSelected ? '#10b981' : isHovered ? '#38bdf8' : (territory.color || continentColor.fill);
            const strokeColor = isSelected ? '#047857' : isHovered ? '#0369a1' : continentColor.border;
            const strokeWidth = isSelected ? 3.0 : isHovered ? 2.5 : 1.1;

            return (
              <g
                key={territory.id}
                id={`territory-${territory.id}`}
                className="cursor-pointer transition-all duration-200 ease-out"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTerritory(territory.id);
                }}
                onMouseEnter={(e) => {
                  onHoverTerritory(territory, e);
                }}
                onMouseLeave={() => {
                  onHoverTerritory(null);
                }}
                style={{
                  transformOrigin: centroid ? `${centroid[0]}px ${centroid[1]}px` : undefined,
                  transform: isHovered ? 'scale(1.02) translateY(-2px)' : 'scale(1)',
                }}
              >
                {/* 3D Base Drop Shadow */}
                {isHovered && (
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="5"
                    opacity="0.25"
                    transform="translate(1, 4)"
                  />
                )}

                {/* Primary Territory Geometry */}
                <path
                  d={pathData}
                  fill={fillColor}
                  fillOpacity={isHovered ? 0.95 : isSelected ? 0.92 : 0.82}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  filter={isSelected ? 'url(#selected-elevation)' : isHovered ? 'url(#hover-elevation)' : 'url(#board-elevation)'}
                  className="transition-colors duration-150"
                />

                {/* White Inner Border Highlight on hover */}
                {isHovered && (
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                    strokeDasharray="3,3"
                    opacity="0.8"
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* Labels Layer (ONLY on Hover by default per user mandate: "faça com que os nomes so parecam no mapa quando eu passo a mao em cima pois fica muito texto") */}
        <g id="territory-labels-layer" className="pointer-events-none">
          {renderedTerritories.map(({ territory, centroid, largestCountryName, largestFlag, memberCountries }) => {
            if (!centroid) return null;
            const isHovered = hoveredTerritory?.id === territory.id;
            const isSelected = selectedTerritoryId === territory.id;
            const isMultiNation = territory.countryIds.length > 1;

            // Only show label if this specific territory is hovered, OR if the user explicitly turned on "alwaysShowLabels"
            if (!isHovered && !alwaysShowLabels && !isSelected) return null;

            const costRank = Math.min(5, Math.max(1, Math.round(territory.avgCostLevel || 2)));
            const crimeRank = Math.min(5, Math.max(1, Math.round(territory.avgCrimeRank || 2)));

            const boxWidth = Math.max(largestCountryName.length * 8.4 + (isMultiNation ? 48 : 28), 120);

            return (
              <g
                key={`label-${territory.id}`}
                transform={`translate(${centroid[0]}, ${centroid[1]})`}
                className="transition-transform duration-200"
                style={{
                  transform: isHovered ? `translate(${centroid[0]}px, ${centroid[1] - 12}px) scale(1.15)` : `translate(${centroid[0]}px, ${centroid[1]}px)`,
                }}
              >
                {/* Backpacker Floating Stamp Badge */}
                <g>
                  {/* Clean white tag badge with colored border */}
                  <rect
                    x={-boxWidth / 2}
                    y="-24"
                    width={boxWidth}
                    height={isHovered ? "36" : "24"}
                    rx="8"
                    fill="#ffffff"
                    stroke={isSelected ? '#10b981' : isHovered ? '#0284c7' : '#94a3b8'}
                    strokeWidth={isSelected || isHovered ? '2' : '1'}
                    filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"
                  />

                  {/* Destination Label Text */}
                  <text
                    x={isMultiNation ? -8 : 0}
                    y={isHovered ? "-10" : "1"}
                    textAnchor="middle"
                    fill="#0f172a"
                    fontSize="11"
                    fontWeight="800"
                    className="font-sans select-none tracking-tight"
                  >
                    {largestFlag} {largestCountryName}
                  </text>

                  {/* On hover: Show instant 1-5 rank indicators ($ and 🥷) */}
                  {isHovered && (
                    <g transform={`translate(0, 6)`}>
                      <text
                        x="0"
                        y="0"
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="bold"
                        className="font-sans select-none"
                      >
                        <tspan fill="#059669" fontWeight="900">{'$'.repeat(costRank)}</tspan>
                        <tspan fill="#cbd5e1">{'$'.repeat(5 - costRank)}</tspan>
                        <tspan fill="#64748b" dx="6">|</tspan>
                        <tspan dx="6">{'🥷'.repeat(crimeRank)}</tspan>
                      </text>
                    </g>
                  )}

                  {/* If this territory holds multiple fused nations (e.g. Sudão + Chade + Sudão do Sul), display badge */}
                  {isMultiNation && (
                    <g transform={`translate(${boxWidth / 2 - 22}, ${isHovered ? -16 : -7})`}>
                      <rect
                        x="0"
                        y="0"
                        width="20"
                        height="13"
                        rx="4"
                        fill="#0284c7"
                      />
                      <text
                        x="10"
                        y="9"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="8"
                        fontWeight="bold"
                      >
                        +{territory.countryIds.length - 1}
                      </text>
                    </g>
                  )}
                </g>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Floating Hover Info Card at Bottom */}
      {hoveredTerritory && (() => {
        const costRank = Math.min(5, Math.max(1, Math.round(hoveredTerritory.avgCostLevel || 2)));
        const crimeRank = Math.min(5, Math.max(1, Math.round(hoveredTerritory.avgCrimeRank || 2)));
        const crimeDesc = getCrimeDescription(crimeRank);
        const largestCountry = COUNTRIES_DB.find(c => c.id === hoveredTerritory.largestCountryId);

        return (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-150 max-w-[92vw]">
            <div className="flex flex-wrap items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-sky-200 shadow-xl text-slate-800">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm animate-pulse" />
              
              {/* Country Name */}
              <div className="flex items-center gap-1.5 font-extrabold text-slate-900 text-xs sm:text-sm">
                <span className="text-base">{largestCountry?.flag}</span>
                <span>{hoveredTerritory.name}</span>
              </div>

              <div className="h-4 w-px bg-slate-200" />

              {/* Cost Ranking (1-5 $) */}
              <div className="flex items-center gap-1.5 bg-emerald-50/80 px-2 py-1 rounded-lg border border-emerald-100 text-xs">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <span
                      key={s}
                      className={`font-black text-xs leading-none ${
                        s <= costRank ? 'text-emerald-700' : 'text-slate-200'
                      }`}
                    >
                      $
                    </span>
                  ))}
                </div>
                <span className="text-[11px] font-bold text-emerald-800">
                  {costRank}/5 (~${hoveredTerritory.avgCostDailyUsd}/d)
                </span>
              </div>

              {/* Crime Ranking (1-5 🥷) */}
              <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 text-xs">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <span
                      key={s}
                      className={`text-xs leading-none ${
                        s <= crimeRank ? 'opacity-100' : 'opacity-20 grayscale'
                      }`}
                    >
                      🥷
                    </span>
                  ))}
                </div>
                <span className="text-[11px] font-bold text-slate-700">
                  {crimeRank}/5 ({crimeDesc.label.split(' ')[0]})
                </span>
              </div>

              {/* Category / Highlight */}
              <div className="hidden sm:flex items-center text-xs text-slate-500 font-medium">
                <span>{hoveredTerritory.travelCategory}</span>
              </div>

              {hoveredTerritory.countryIds.length > 1 && (
                <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 text-[11px] font-bold">
                  {hoveredTerritory.countryIds.length} países unidos
                </span>
              )}
            </div>
          </div>
        );
      })()}

      {/* Floating Legend / Quick Hint */}
      <div className="absolute bottom-4 right-4 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur border border-sky-100 shadow-md text-xs text-slate-600">
        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
        <span className="font-medium">Passe o cursor sobre um país para ver o nome e detalhes</span>
      </div>
    </div>
  );
};
