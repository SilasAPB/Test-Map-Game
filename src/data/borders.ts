import * as topojson from 'topojson-client';
import worldAtlasData from 'world-atlas/countries-110m.json';
import { COUNTRIES_DB } from './countries';

/**
 * Computes exact topological shared-border adjacency between all countries using TopoJSON mesh data.
 * Returns a map of country numeric id -> Set of neighbor numeric country ids.
 */
function buildTopologicalAdjacencyMap(): Map<string, Set<string>> {
  const adjacency = new Map<string, Set<string>>();
  
  // Initialize all DB countries
  for (const c of COUNTRIES_DB) {
    adjacency.set(c.id, new Set<string>());
  }

  try {
    const geometries = (worldAtlasData as any).objects.countries.geometries;
    const neighbors = (topojson as any).neighbors(geometries);

    for (let i = 0; i < geometries.length; i++) {
      const geom = geometries[i];
      const rawId = geom.id !== undefined ? String(geom.id).padStart(3, '0') : null;
      if (!rawId) continue;

      if (!adjacency.has(rawId)) {
        adjacency.set(rawId, new Set<string>());
      }

      const neighborIndices: number[] = neighbors[i] || [];
      for (const nIdx of neighborIndices) {
        const neighborGeom = geometries[nIdx];
        const neighborRawId = neighborGeom && neighborGeom.id !== undefined
          ? String(neighborGeom.id).padStart(3, '0')
          : null;

        if (neighborRawId && neighborRawId !== rawId) {
          adjacency.get(rawId)!.add(neighborRawId);
          if (!adjacency.has(neighborRawId)) {
            adjacency.set(neighborRawId, new Set<string>());
          }
          adjacency.get(neighborRawId)!.add(rawId);
        }
      }
    }
  } catch (err) {
    console.warn('Could not compute topojson neighbors:', err);
  }

  // Add realistic maritime / natural border bridges for island nations without land borders
  // e.g. UK <-> Ireland, France; Japan <-> South Korea, Russia; Cuba <-> USA, Haiti, etc.
  const maritimeBridges: Array<[string, string]> = [
    ["826", "372"], // UK <-> Ireland
    ["826", "250"], // UK <-> France
    ["392", "410"], // Japan <-> South Korea
    ["392", "643"], // Japan <-> Russia
    ["192", "332"], // Cuba <-> Haiti
    ["192", "840"], // Cuba <-> USA
    ["332", "214"], // Haiti <-> Dominican Republic
    ["036", "554"], // Australia <-> New Zealand
    ["036", "598"], // Australia <-> Papua New Guinea
    ["360", "458"], // Indonesia <-> Malaysia
    ["360", "626"], // Indonesia <-> Timor-Leste
    ["360", "598"], // Indonesia <-> Papua New Guinea
    ["458", "702"], // Malaysia <-> Singapore
    ["608", "458"], // Philippines <-> Malaysia
    ["608", "156"], // Philippines <-> China
    ["144", "356"], // Sri Lanka <-> India
    ["450", "508"], // Madagascar <-> Mozambique
    ["174", "834"], // Comoros <-> Tanzania
    ["480", "450"], // Mauritius <-> Madagascar
    ["196", "792"], // Cyprus <-> Turkey
    ["196", "300"], // Cyprus <-> Greece
    ["352", "826"], // Iceland <-> UK
    ["352", "304"], // Iceland <-> Greenland
    ["304", "124"], // Greenland <-> Canada
    ["752", "208"], // Sweden <-> Denmark
    ["208", "276"], // Denmark <-> Germany
    ["752", "578"], // Sweden <-> Norway
    ["752", "246"], // Sweden <-> Finland
    ["246", "233"], // Finland <-> Estonia
    ["784", "682"], // UAE <-> Saudi Arabia
    ["048", "682"], // Bahrain <-> Saudi Arabia
    ["634", "682"], // Qatar <-> Saudi Arabia
    ["788", "380"], // Tunisia <-> Italy
    ["504", "724"], // Morocco <-> Spain
  ];

  for (const [idA, idB] of maritimeBridges) {
    if (adjacency.has(idA) && adjacency.has(idB)) {
      adjacency.get(idA)!.add(idB);
      adjacency.get(idB)!.add(idA);
    }
  }

  return adjacency;
}

export const COUNTRY_BORDER_ADJACENCY = buildTopologicalAdjacencyMap();

/**
 * Checks if country A shares a physical border (or natural maritime strait) with country B.
 */
export function areCountriesBordering(idA: string, idB: string): boolean {
  if (idA === idB) return true;
  const neighborsA = COUNTRY_BORDER_ADJACENCY.get(idA);
  return neighborsA ? neighborsA.has(idB) : false;
}
