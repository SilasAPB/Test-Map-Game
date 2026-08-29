import { CountryData } from '../types';

// Complete dataset of nations with accurate TopoJSON numeric IDs, PT names, area, coordinates,
// and realistic travel & game attributes (Cost of living, Safety score, Crime level, Visa accessibility, Infrastructure, Adventure).
export const COUNTRIES_DB: CountryData[] = [
  // SOUTH AMERICA
  {
    id: "076", iso2: "BR", iso3: "BRA", namePt: "Brasil", nameEn: "Brazil", flag: "🇧🇷",
    areaKm2: 8515767, population: 214000000, continent: "América do Sul", continentCode: "SA", capital: "Brasília",
    travelCategory: "Natureza & Praias", famousAttraction: "Amazônia, Cataratas & Rio de Janeiro", coords: [-55, -10],
    costLevel: 2, costDailyUsd: 40, safetyScore: 62, crimeLevel: "Moderado", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 7, adventureScore: 9, customNotes: "Polo sul-americano com ecossistemas gigantes e praias tropicais."
  },
  {
    id: "032", iso2: "AR", iso3: "ARG", namePt: "Argentina", nameEn: "Argentina", flag: "🇦🇷",
    areaKm2: 2780400, population: 46000000, continent: "América do Sul", continentCode: "SA", capital: "Buenos Aires",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Patagônia, Bariloche & Tango", coords: [-64, -34],
    costLevel: 2, costDailyUsd: 35, safetyScore: 70, crimeLevel: "Moderado", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 8, adventureScore: 9, customNotes: "Excelente gastronomia, vinhos e trilhas glaciais no sul."
  },
  {
    id: "152", iso2: "CL", iso3: "CHL", namePt: "Chile", nameEn: "Chile", flag: "🇨🇱",
    areaKm2: 756102, population: 19500000, continent: "América do Sul", continentCode: "SA", capital: "Santiago",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Deserto do Atacama & Torres del Paine", coords: [-71, -30],
    costLevel: 3, costDailyUsd: 55, safetyScore: 78, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 9, adventureScore: 10, customNotes: "Um dos países mais seguros e estáveis da América do Sul."
  },
  {
    id: "170", iso2: "CO", iso3: "COL", namePt: "Colômbia", nameEn: "Colombia", flag: "🇨🇴",
    areaKm2: 1141748, population: 52000000, continent: "América do Sul", continentCode: "SA", capital: "Bogotá",
    travelCategory: "Cultura & História", famousAttraction: "Cartagena, Medellín & Eixo Cafeeiro", coords: [-73, 4],
    costLevel: 2, costDailyUsd: 30, safetyScore: 60, crimeLevel: "Moderado", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 7, adventureScore: 8, customNotes: "Hospitalidade excepcional e biodiversidade andina."
  },
  {
    id: "604", iso2: "PE", iso3: "PER", namePt: "Peru", nameEn: "Peru", flag: "🇵🇪",
    areaKm2: 1285216, population: 34000000, continent: "América do Sul", continentCode: "SA", capital: "Lima",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Machu Picchu, Cusco & Vale Sagrado", coords: [-76, -9],
    costLevel: 2, costDailyUsd: 32, safetyScore: 64, crimeLevel: "Moderado", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 7, adventureScore: 10, customNotes: "Capital arqueológica das Américas e gastronomia mundial."
  },
  {
    id: "862", iso2: "VE", iso3: "VEN", namePt: "Venezuela", nameEn: "Venezuela", flag: "🇻🇪",
    areaKm2: 916445, population: 29000000, continent: "América do Sul", continentCode: "SA", capital: "Caracas",
    travelCategory: "Natureza & Praias", famousAttraction: "Salto Ángel & Monte Roraima", coords: [-66, 8],
    costLevel: 2, costDailyUsd: 35, safetyScore: 35, crimeLevel: "Crítico", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 4, adventureScore: 9, customNotes: "Belezas naturais épicas mas exige logística cuidadosa."
  },
  {
    id: "068", iso2: "BO", iso3: "BOL", namePt: "Bolívia", nameEn: "Bolivia", flag: "🇧🇴",
    areaKm2: 1098581, population: 12000000, continent: "América do Sul", continentCode: "SA", capital: "Sucre",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Salar de Uyuni & Lago Titicaca", coords: [-64, -17],
    costLevel: 1, costDailyUsd: 22, safetyScore: 66, crimeLevel: "Moderado", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 5, adventureScore: 9, customNotes: "Destino mais barato da América do Sul para mochileiros."
  },
  {
    id: "600", iso2: "PY", iso3: "PRY", namePt: "Paraguai", nameEn: "Paraguay", flag: "🇵🇾",
    areaKm2: 406752, population: 7400000, continent: "América do Sul", continentCode: "SA", capital: "Assunção",
    travelCategory: "Cultura & História", famousAttraction: "Missões Jesuíticas & Chaco", coords: [-58, -23],
    costLevel: 1, costDailyUsd: 25, safetyScore: 68, crimeLevel: "Moderado", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 6, adventureScore: 6, customNotes: "Custo de vida muito baixo e rotas históricas tranquilas."
  },
  {
    id: "858", iso2: "UY", iso3: "URY", namePt: "Uruguai", nameEn: "Uruguay", flag: "🇺🇾",
    areaKm2: 176215, population: 3500000, continent: "América do Sul", continentCode: "SA", capital: "Montevidéu",
    travelCategory: "Natureza & Praias", famousAttraction: "Punta del Este & Colonia del Sacramento", coords: [-56, -33],
    costLevel: 4, costDailyUsd: 75, safetyScore: 82, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 9, adventureScore: 6, customNotes: "Altíssimo índice de desenvolvimento e praias serenas."
  },
  {
    id: "218", iso2: "EC", iso3: "ECU", namePt: "Equador", nameEn: "Ecuador", flag: "🇪🇨",
    areaKm2: 276841, population: 18000000, continent: "América do Sul", continentCode: "SA", capital: "Quito",
    travelCategory: "Natureza & Praias", famousAttraction: "Ilhas Galápagos & Vulcão Cotopaxi", coords: [-78, -1.5],
    costLevel: 2, costDailyUsd: 35, safetyScore: 58, crimeLevel: "Alto", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 6, adventureScore: 9, customNotes: "Usa dólar americano, vulcões ativos e vida marinha única."
  },
  {
    id: "328", iso2: "GY", iso3: "GUY", namePt: "Guiana", nameEn: "Guyana", flag: "🇬🇾",
    areaKm2: 214969, population: 800000, continent: "América do Sul", continentCode: "SA", capital: "Georgetown",
    travelCategory: "Natureza & Praias", famousAttraction: "Cataratas de Kaieteur", coords: [-59, 5],
    costLevel: 3, costDailyUsd: 50, safetyScore: 55, crimeLevel: "Alto", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 4, adventureScore: 8, customNotes: "Floresta intocada e a cachoeira de queda única mais alta."
  },
  {
    id: "740", iso2: "SR", iso3: "SUR", namePt: "Suriname", nameEn: "Suriname", flag: "🇸🇷",
    areaKm2: 163820, population: 600000, continent: "América do Sul", continentCode: "SA", capital: "Paramaribo",
    travelCategory: "Cultura & História", famousAttraction: "Reserva Natural do Suriname Central", coords: [-56, 4],
    costLevel: 2, costDailyUsd: 40, safetyScore: 65, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 5, adventureScore: 7, customNotes: "Mistura multicultural caribenha, holandesa e javanesa."
  },

  // NORTH AMERICA
  {
    id: "840", iso2: "US", iso3: "USA", namePt: "Estados Unidos", nameEn: "United States", flag: "🇺🇸",
    areaKm2: 9833517, population: 335000000, continent: "América do Norte", continentCode: "NA", capital: "Washington, D.C.",
    travelCategory: "Metrópole & Gastronomia", famousAttraction: "Grand Canyon, Nova York & Parques Nacionais", coords: [-98, 38],
    costLevel: 5, costDailyUsd: 130, safetyScore: 75, crimeLevel: "Moderado", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 9, adventureScore: 9, customNotes: "Infraestrutura rodoviária gigantesca e parques nacionais icônicos."
  },
  {
    id: "124", iso2: "CA", iso3: "CAN", namePt: "Canadá", nameEn: "Canada", flag: "🇨🇦",
    areaKm2: 9984670, population: 39000000, continent: "América do Norte", continentCode: "NA", capital: "Ottawa",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Montanhas Rochosas & Banff", coords: [-106, 56],
    costLevel: 4, costDailyUsd: 110, safetyScore: 89, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 10, adventureScore: 10, customNotes: "Destino extremamente seguro com natureza selvagem espetacular."
  },
  {
    id: "484", iso2: "MX", iso3: "MEX", namePt: "México", nameEn: "Mexico", flag: "🇲🇽",
    areaKm2: 1964375, population: 130000000, continent: "América do Norte", continentCode: "NA", capital: "Cidade do México",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Chichén Itzá, Cancún & Oaxaca", coords: [-102, 23],
    costLevel: 2, costDailyUsd: 38, safetyScore: 56, crimeLevel: "Alto", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 8, adventureScore: 9, customNotes: "Patrimônio culinário UNESCO e pirâmides maias lendárias."
  },
  {
    id: "304", iso2: "GL", iso3: "GRL", namePt: "Groenlândia", nameEn: "Greenland", flag: "🇬🇱",
    areaKm2: 2166086, population: 57000, continent: "América do Norte", continentCode: "NA", capital: "Nuuk",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Fiordes de Gelo & Aurora Boreal", coords: [-40, 72],
    costLevel: 5, costDailyUsd: 160, safetyScore: 95, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 6, adventureScore: 10, customNotes: "Expedições polares remotas no manto de gelo ártico."
  },
  {
    id: "320", iso2: "GT", iso3: "GTM", namePt: "Guatemala", nameEn: "Guatemala", flag: "🇬🇹",
    areaKm2: 108889, population: 18000000, continent: "América do Norte", continentCode: "NA", capital: "Cidade da Guatemala",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Ruínas Maias de Tikal & Lago Atitlán", coords: [-90, 15],
    costLevel: 1, costDailyUsd: 28, safetyScore: 54, crimeLevel: "Alto", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 5, adventureScore: 9, customNotes: "Cultura maia viva, vulcões escaláveis e custo super amigável."
  },
  {
    id: "192", iso2: "CU", iso3: "CUB", namePt: "Cuba", nameEn: "Cuba", flag: "🇨🇺",
    areaKm2: 109884, population: 11000000, continent: "América do Norte", continentCode: "NA", capital: "Havana",
    travelCategory: "Cultura & História", famousAttraction: "Havana Velha & Varadero", coords: [-79, 22],
    costLevel: 2, costDailyUsd: 42, safetyScore: 78, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 5, adventureScore: 7, customNotes: "Carros clássicos dos anos 50, arquitetura colonial e música."
  },
  {
    id: "340", iso2: "HN", iso3: "HND", namePt: "Honduras", nameEn: "Honduras", flag: "🇭🇳",
    areaKm2: 112492, population: 10000000, continent: "América do Norte", continentCode: "NA", capital: "Tegucigalpa",
    travelCategory: "Natureza & Praias", famousAttraction: "Ruínas de Copán & Ilhas Roatán", coords: [-86, 15],
    costLevel: 1, costDailyUsd: 26, safetyScore: 48, crimeLevel: "Alto", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 5, adventureScore: 8, customNotes: "Mergulho de recifes de coral mais barato do Caribe."
  },
  {
    id: "558", iso2: "NI", iso3: "NIC", namePt: "Nicarágua", nameEn: "Nicaragua", flag: "🇳🇮",
    areaKm2: 130373, population: 7000000, continent: "América do Norte", continentCode: "NA", capital: "Manágua",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Vulcão Cerro Negro & Ilha de Ometepe", coords: [-85, 13],
    costLevel: 1, costDailyUsd: 25, safetyScore: 64, crimeLevel: "Moderado", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 5, adventureScore: 9, customNotes: "Surf em cinzas vulcânicas (volcano boarding) e praias pacíficas."
  },
  {
    id: "188", iso2: "CR", iso3: "CRI", namePt: "Costa Rica", nameEn: "Costa Rica", flag: "🇨🇷",
    areaKm2: 51100, population: 5200000, continent: "América do Norte", continentCode: "NA", capital: "San José",
    travelCategory: "Natureza & Praias", famousAttraction: "Parque Manuel Antonio & Vulcão Arenal", coords: [-84, 10],
    costLevel: 3, costDailyUsd: 65, safetyScore: 82, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 8, adventureScore: 9, customNotes: "Pura Vida! Paraíso do ecoturismo e segurança destacada na região."
  },
  {
    id: "591", iso2: "PA", iso3: "PAN", namePt: "Panamá", nameEn: "Panama", flag: "🇵🇦",
    areaKm2: 75417, population: 4400000, continent: "América do Norte", continentCode: "NA", capital: "Cidade do Panamá",
    travelCategory: "Cultura & História", famousAttraction: "Canal do Panamá & San Blas", coords: [-80, 9],
    costLevel: 3, costDailyUsd: 55, safetyScore: 74, crimeLevel: "Moderado", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 8, adventureScore: 8, customNotes: "Hub de conexões aéreas internacionais e ilhas indígenas caribenhas."
  },
  {
    id: "222", iso2: "SV", iso3: "SLV", namePt: "El Salvador", nameEn: "El Salvador", flag: "🇸🇻",
    areaKm2: 21041, population: 6300000, continent: "América do Norte", continentCode: "NA", capital: "San Salvador",
    travelCategory: "Natureza & Praias", famousAttraction: "Praias de Surf de El Tunco & Rota das Flores", coords: [-89, 13.8],
    costLevel: 2, costDailyUsd: 32, safetyScore: 76, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 7, adventureScore: 8, customNotes: "Transformação recente em segurança, ondas perfeitas de surf e Bitcoin."
  },
  {
    id: "084", iso2: "BZ", iso3: "BLZ", namePt: "Belize", nameEn: "Belize", flag: "🇧🇿",
    areaKm2: 22966, population: 400000, continent: "América do Norte", continentCode: "NA", capital: "Belmopan",
    travelCategory: "Natureza & Praias", famousAttraction: "Grande Buraco Azul & Caye Caulker", coords: [-88.7, 17.2],
    costLevel: 3, costDailyUsd: 60, safetyScore: 66, crimeLevel: "Moderado", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 6, adventureScore: 9, customNotes: "Língua inglesa oficial e a segunda maior barreira de corais do planeta."
  },
  {
    id: "332", iso2: "HT", iso3: "HTI", namePt: "Haiti", nameEn: "Haiti", flag: "🇭🇹",
    areaKm2: 27750, population: 11500000, continent: "América do Norte", continentCode: "NA", capital: "Porto Príncipe",
    travelCategory: "Cultura & História", famousAttraction: "Cidadela Laferrière", coords: [-72.3, 19],
    costLevel: 2, costDailyUsd: 35, safetyScore: 28, crimeLevel: "Crítico", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 3, adventureScore: 6, customNotes: "Fortaleza histórica monumental em contexto desafiador."
  },
  {
    id: "214", iso2: "DO", iso3: "DOM", namePt: "República Dominicana", nameEn: "Dominican Republic", flag: "🇩🇴",
    areaKm2: 48671, population: 11000000, continent: "América do Norte", continentCode: "NA", capital: "Santo Domingo",
    travelCategory: "Natureza & Praias", famousAttraction: "Punta Cana & Zona Colonial", coords: [-70.2, 19],
    costLevel: 3, costDailyUsd: 50, safetyScore: 68, crimeLevel: "Moderado", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 7, adventureScore: 7, customNotes: "Primeira cidade européia das Américas e praias caribenhas."
  },
  {
    id: "388", iso2: "JM", iso3: "JAM", namePt: "Jamaica", nameEn: "Jamaica", flag: "🇯🇲",
    areaKm2: 10991, population: 2800000, continent: "América do Norte", continentCode: "NA", capital: "Kingston",
    travelCategory: "Cultura & História", famousAttraction: "Montego Bay & Museu Bob Marley", coords: [-77.3, 18.1],
    costLevel: 3, costDailyUsd: 58, safetyScore: 58, crimeLevel: "Alto", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 6, adventureScore: 7, customNotes: "Cultura musical reggae lendária e cachoeiras exuberantes."
  },
  {
    id: "044", iso2: "BS", iso3: "BHS", namePt: "Bahamas", nameEn: "Bahamas", flag: "🇧🇸",
    areaKm2: 13943, population: 400000, continent: "América do Norte", continentCode: "NA", capital: "Nassau",
    travelCategory: "Natureza & Praias", famousAttraction: "Exuma & Praias de Águas Cristalinas", coords: [-77.4, 25],
    costLevel: 5, costDailyUsd: 140, safetyScore: 72, crimeLevel: "Moderado", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 8, adventureScore: 7, customNotes: "Arquipélago luxuoso com águas de tonalidade azul turquesa viva."
  },

  // AFRICA
  {
    id: "729", iso2: "SD", iso3: "SDN", namePt: "Sudão", nameEn: "Sudan", flag: "🇸🇩",
    areaKm2: 1886068, population: 46000000, continent: "África", continentCode: "AF", capital: "Cartum",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Pirâmides de Meroé & Rio Nilo", coords: [30, 15],
    costLevel: 1, costDailyUsd: 20, safetyScore: 30, crimeLevel: "Crítico", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 3, adventureScore: 9, customNotes: "Contém mais pirâmides que o Egito ao longo das areias núbias."
  },
  {
    id: "728", iso2: "SS", iso3: "SSD", namePt: "Sudão do Sul", nameEn: "South Sudan", flag: "🇸🇸",
    areaKm2: 619745, population: 11000000, continent: "África", continentCode: "AF", capital: "Juba",
    travelCategory: "Natureza & Praias", famousAttraction: "Pântano do Sudd & Vida Selvagem", coords: [31, 7],
    costLevel: 2, costDailyUsd: 35, safetyScore: 22, crimeLevel: "Crítico", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 2, adventureScore: 8, customNotes: "País mais jovem do mundo, com o maior pântano da África."
  },
  {
    id: "148", iso2: "TD", iso3: "TCD", namePt: "Chade", nameEn: "Chad", flag: "🇹🇩",
    areaKm2: 1284000, population: 17000000, continent: "África", continentCode: "AF", capital: "N'Djamena",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Maciço do Ennedi & Deserto do Saara", coords: [19, 15],
    costLevel: 2, costDailyUsd: 30, safetyScore: 32, crimeLevel: "Crítico", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 3, adventureScore: 10, customNotes: "Formações rochosas e arcos monumentais no coração do Saara."
  },
  {
    id: "012", iso2: "DZ", iso3: "DZA", namePt: "Argélia", nameEn: "Algeria", flag: "🇩🇿",
    areaKm2: 2381741, population: 45000000, continent: "África", continentCode: "AF", capital: "Argel",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Tassili n'Ajjer & Casbá de Argel", coords: [3, 28],
    costLevel: 1, costDailyUsd: 25, safetyScore: 68, crimeLevel: "Moderado", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 6, adventureScore: 9, customNotes: "Maior país da África por área territorial, pinturas rupestres no deserto."
  },
  {
    id: "818", iso2: "EG", iso3: "EGY", namePt: "Egito", nameEn: "Egypt", flag: "🇪🇬",
    areaKm2: 1002450, population: 105000000, continent: "África", continentCode: "AF", capital: "Cairo",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Pirâmides de Gizé & Templo de Luxor", coords: [30, 26],
    costLevel: 1, costDailyUsd: 24, safetyScore: 65, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 7, adventureScore: 9, customNotes: "Mochilão ultra barato com monumentos da antiguidade humana."
  },
  {
    id: "566", iso2: "NG", iso3: "NGA", namePt: "Nigéria", nameEn: "Nigeria", flag: "🇳🇬",
    areaKm2: 923768, population: 220000000, continent: "África", continentCode: "AF", capital: "Abuja",
    travelCategory: "Cultura & História", famousAttraction: "Bosque Sagrado de Osun-Osogbo & Lagos", coords: [8, 10],
    costLevel: 2, costDailyUsd: 32, safetyScore: 45, crimeLevel: "Alto", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 5, adventureScore: 7, customNotes: "Gigante econômico e cultural de Nollywood e Afrobeats."
  },
  {
    id: "710", iso2: "ZA", iso3: "ZAF", namePt: "África do Sul", nameEn: "South Africa", flag: "🇿🇦",
    areaKm2: 1221037, population: 60000000, continent: "África", continentCode: "AF", capital: "Pretória",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Kruger Safari, Table Mountain & Cidade do Cabo", coords: [25, -29],
    costLevel: 2, costDailyUsd: 45, safetyScore: 52, crimeLevel: "Alto", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 8, adventureScore: 10, customNotes: "Safáris dos Big Five de padrão global e paisagens costeiras."
  },
  {
    id: "180", iso2: "CD", iso3: "COD", namePt: "Rep. Dem. do Congo", nameEn: "DR Congo", flag: "🇨🇩",
    areaKm2: 2344858, population: 96000000, continent: "África", continentCode: "AF", capital: "Kinshasa",
    travelCategory: "Natureza & Praias", famousAttraction: "Parque Virunga & Gorilas da Montanha", coords: [24, -2.5],
    costLevel: 2, costDailyUsd: 38, safetyScore: 30, crimeLevel: "Crítico", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 3, adventureScore: 10, customNotes: "Selva equatorial densa e lagos de lava ativa no Monte Nyiragongo."
  },
  {
    id: "178", iso2: "CG", iso3: "COG", namePt: "República do Congo", nameEn: "Republic of the Congo", flag: "🇨🇬",
    areaKm2: 342000, population: 5800000, continent: "África", continentCode: "AF", capital: "Brazzaville",
    travelCategory: "Natureza & Praias", famousAttraction: "Parque Nacional de Odzala-Kokoua", coords: [15.8, -0.8],
    costLevel: 3, costDailyUsd: 50, safetyScore: 54, crimeLevel: "Moderado", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 4, adventureScore: 8, customNotes: "Floresta preservada com gorilas de planície e bacia do Congo."
  },
  {
    id: "024", iso2: "AO", iso3: "AGO", namePt: "Angola", nameEn: "Angola", flag: "🇦🇴",
    areaKm2: 1246700, population: 35000000, continent: "África", continentCode: "AF", capital: "Luanda",
    travelCategory: "Natureza & Praias", famousAttraction: "Fendas da Tundavala & Quedas de Kalandula", coords: [17, -12],
    costLevel: 3, costDailyUsd: 55, safetyScore: 58, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 5, adventureScore: 8, customNotes: "Laços culturais e linguísticos em português com cânions espetaculares."
  },
  {
    id: "504", iso2: "MA", iso3: "MAR", namePt: "Marrocos", nameEn: "Morocco", flag: "🇲🇦",
    areaKm2: 446550, population: 37000000, continent: "África", continentCode: "AF", capital: "Rabat",
    travelCategory: "Cultura & História", famousAttraction: "Marrakech, Chefchaouen & Deserto do Saara", coords: [-7, 32],
    costLevel: 2, costDailyUsd: 32, safetyScore: 76, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 8, adventureScore: 9, customNotes: "Medinas medievais, bazares de especiarias e cidade azul."
  },
  {
    id: "434", iso2: "LY", iso3: "LBY", namePt: "Líbia", nameEn: "Libya", flag: "🇱🇾",
    areaKm2: 1759540, population: 7000000, continent: "África", continentCode: "AF", capital: "Trípoli",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Ruínas de Leptis Magna", coords: [17, 27],
    costLevel: 2, costDailyUsd: 35, safetyScore: 32, crimeLevel: "Crítico", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 4, adventureScore: 8, customNotes: "Ruínas romanas mais bem preservadas do Mar Mediterrâneo."
  },
  {
    id: "788", iso2: "TN", iso3: "TUN", namePt: "Tunísia", nameEn: "Tunisia", flag: "🇹🇳",
    areaKm2: 163610, population: 12000000, continent: "África", continentCode: "AF", capital: "Túnis",
    travelCategory: "Cultura & História", famousAttraction: "Cartago & Sidi Bou Said", coords: [9.5, 34],
    costLevel: 1, costDailyUsd: 26, safetyScore: 68, crimeLevel: "Moderado", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 7, adventureScore: 7, customNotes: "Locações de Star Wars no deserto e mosaicos romanos de El Jem."
  },
  {
    id: "478", iso2: "MR", iso3: "MRT", namePt: "Mauritânia", nameEn: "Mauritania", flag: "🇲🇷",
    areaKm2: 1030700, population: 4700000, continent: "África", continentCode: "AF", capital: "Nouakchott",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Estrutura de Richat (Olho do Saara) & Trem de Minério", coords: [-10.5, 20.3],
    costLevel: 2, costDailyUsd: 30, safetyScore: 58, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 4, adventureScore: 10, customNotes: "Aventura lendária do trem de minério de ferro através do deserto."
  },
  {
    id: "466", iso2: "ML", iso3: "MLI", namePt: "Mali", nameEn: "Mali", flag: "🇲🇱",
    areaKm2: 1240192, population: 22000000, continent: "África", continentCode: "AF", capital: "Bamako",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Mesquita de Djenné & Timbuktu", coords: [-3.5, 17],
    costLevel: 1, costDailyUsd: 25, safetyScore: 36, crimeLevel: "Crítico", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 3, adventureScore: 9, customNotes: "Maior edifício de adobe do mundo em Djenné e manuscritos antigos."
  },
  {
    id: "562", iso2: "NE", iso3: "NER", namePt: "Níger", nameEn: "Niger", flag: "🇳🇪",
    areaKm2: 1267000, population: 25000000, continent: "África", continentCode: "AF", capital: "Niamey",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Montanhas Aïr & Deserto do Ténéré", coords: [8, 16],
    costLevel: 1, costDailyUsd: 22, safetyScore: 38, crimeLevel: "Crítico", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 3, adventureScore: 9, customNotes: "Oásis isolados nas dunas gigantes do Ténéré."
  },
  {
    id: "231", iso2: "ET", iso3: "ETH", namePt: "Etiópia", nameEn: "Ethiopia", flag: "🇪🇹",
    areaKm2: 1104300, population: 120000000, continent: "África", continentCode: "AF", capital: "Adis Abeba",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Igrejas Esculpidas de Lalibela & Montanhas Simien", coords: [39.6, 9.1],
    costLevel: 1, costDailyUsd: 22, safetyScore: 50, crimeLevel: "Alto", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 5, adventureScore: 10, customNotes: "Berço do café e igrejas monolíticas talhadas na rocha sólida."
  },
  {
    id: "404", iso2: "KE", iso3: "KEN", namePt: "Quênia", nameEn: "Kenya", flag: "🇰🇪",
    areaKm2: 580367, population: 54000000, continent: "África", continentCode: "AF", capital: "Nairóbi",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Safári no Maasai Mara & Monte Quênia", coords: [38, 0.5],
    costLevel: 2, costDailyUsd: 42, safetyScore: 62, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 7, adventureScore: 10, customNotes: "A Grande Migração anual de gnus e zebras."
  },
  {
    id: "834", iso2: "TZ", iso3: "TZA", namePt: "Tanzânia", nameEn: "Tanzania", flag: "🇹🇿",
    areaKm2: 947303, population: 63000000, continent: "África", continentCode: "AF", capital: "Dodoma",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Monte Kilimanjaro, Serengeti & Zanzibar", coords: [35, -6],
    costLevel: 2, costDailyUsd: 40, safetyScore: 70, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 6, adventureScore: 10, customNotes: "Teto da África (Kilimanjaro) e praias de especiarias em Zanzibar."
  },
  {
    id: "508", iso2: "MZ", iso3: "MOZ", namePt: "Moçambique", nameEn: "Mozambique", flag: "🇲🇿",
    areaKm2: 801590, population: 32000000, continent: "África", continentCode: "AF", capital: "Maputo",
    travelCategory: "Natureza & Praias", famousAttraction: "Arquipélago de Bazaruto & Tofo", coords: [35.5, -18.7],
    costLevel: 2, costDailyUsd: 32, safetyScore: 56, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 5, adventureScore: 9, customNotes: "Mergulho com tubarões-baleia e praias tropicais intocadas."
  },
  {
    id: "450", iso2: "MG", iso3: "MDG", namePt: "Madagascar", nameEn: "Madagascar", flag: "🇲🇬",
    areaKm2: 587041, population: 29000000, continent: "África", continentCode: "AF", capital: "Antananarivo",
    travelCategory: "Natureza & Praias", famousAttraction: "Avenida dos Baobás & Lêmures", coords: [47, -19],
    costLevel: 1, costDailyUsd: 26, safetyScore: 62, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 4, adventureScore: 10, customNotes: "90% da fauna e flora são endêmicas e exclusivas desta ilha."
  },
  {
    id: "516", iso2: "NA", iso3: "NAM", namePt: "Namíbia", nameEn: "Namibia", flag: "🇳🇦",
    areaKm2: 825615, population: 2600000, continent: "África", continentCode: "AF", capital: "Windhoek",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Dunas de Sossusvlei & Parque Etosha", coords: [17.5, -22],
    costLevel: 3, costDailyUsd: 55, safetyScore: 78, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 7, adventureScore: 10, customNotes: "Dunas vermelhas mais altas do mundo e estradas panorâmicas seguras."
  },
  {
    id: "072", iso2: "BW", iso3: "BWA", namePt: "Botsuana", nameEn: "Botswana", flag: "🇧🇼",
    areaKm2: 581730, population: 2600000, continent: "África", continentCode: "AF", capital: "Gaborone",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Delta do Okavango & Chobe", coords: [24, -22],
    costLevel: 4, costDailyUsd: 85, safetyScore: 82, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 7, adventureScore: 9, customNotes: "Um dos países mais estáveis e com safáris aquáticos de canoa (mokoro)."
  },
  {
    id: "716", iso2: "ZW", iso3: "ZWE", namePt: "Zimbábue", nameEn: "Zimbabwe", flag: "🇿🇼",
    areaKm2: 390757, population: 16000000, continent: "África", continentCode: "AF", capital: "Harare",
    travelCategory: "Natureza & Praias", famousAttraction: "Cataratas Vitória", coords: [30, -19],
    costLevel: 2, costDailyUsd: 38, safetyScore: 66, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 5, adventureScore: 8, customNotes: "A 'Fumaça que Troveja' nas Cataratas Vitória na fronteira."
  },
  {
    id: "894", iso2: "ZM", iso3: "ZMB", namePt: "Zâmbia", nameEn: "Zambia", flag: "🇿🇲",
    areaKm2: 752618, population: 20000000, continent: "África", continentCode: "AF", capital: "Lusaka",
    travelCategory: "Natureza & Praias", famousAttraction: "Piscinas do Diabo & Rio Zambeze", coords: [28, -14.5],
    costLevel: 2, costDailyUsd: 36, safetyScore: 72, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 5, adventureScore: 9, customNotes: "Piscina natural à beira do abismo nas Cataratas Vitória."
  },
  {
    id: "800", iso2: "UG", iso3: "UGA", namePt: "Uganda", nameEn: "Uganda", flag: "🇺🇬",
    areaKm2: 241551, population: 47000000, continent: "África", continentCode: "AF", capital: "Campala",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Floresta Impenetrável de Bwindi", coords: [32.3, 1.4],
    costLevel: 2, costDailyUsd: 35, safetyScore: 64, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 6, adventureScore: 9, customNotes: "A Pérola da África com trekking de gorilas e rafting no Rio Nilo."
  },
  {
    id: "706", iso2: "SO", iso3: "SOM", namePt: "Somália", nameEn: "Somalia", flag: "🇸🇴",
    areaKm2: 637657, population: 17000000, continent: "África", continentCode: "AF", capital: "Mogadíscio",
    travelCategory: "Cultura & História", famousAttraction: "Cavernas de Laas Geel", coords: [46, 5],
    costLevel: 2, costDailyUsd: 35, safetyScore: 20, crimeLevel: "Crítico", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 2, adventureScore: 7, customNotes: "Maior linha de costa da África continental e arte rupestre neolítica."
  },
  {
    id: "288", iso2: "GH", iso3: "GHA", namePt: "Gana", nameEn: "Ghana", flag: "🇬🇭",
    areaKm2: 238533, population: 33000000, continent: "África", continentCode: "AF", capital: "Acra",
    travelCategory: "Cultura & História", famousAttraction: "Castelo de Cape Coast & Parque Kakum", coords: [-1, 7.9],
    costLevel: 2, costDailyUsd: 30, safetyScore: 75, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 6, adventureScore: 7, customNotes: "Porta de entrada acolhedora na África Ocidental e pontes suspensas na copa das árvores."
  },
  {
    id: "384", iso2: "CI", iso3: "CIV", namePt: "Costa do Marfim", nameEn: "Ivory Coast", flag: "🇨🇮",
    areaKm2: 322463, population: 29000000, continent: "África", continentCode: "AF", capital: "Yamoussoukro",
    travelCategory: "Cultura & História", famousAttraction: "Basílica de Nossa Senhora da Paz", coords: [-5.5, 7.5],
    costLevel: 2, costDailyUsd: 35, safetyScore: 62, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 6, adventureScore: 7, customNotes: "Maior basílica do mundo e vida noturna agitada em Abidjan."
  },
  {
    id: "120", iso2: "CM", iso3: "CMR", namePt: "Camarões", nameEn: "Cameroon", flag: "🇨🇲",
    areaKm2: 475442, population: 28000000, continent: "África", continentCode: "AF", capital: "Iaundé",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Monte Camarões & Parque Waza", coords: [12.7, 5.7],
    costLevel: 2, costDailyUsd: 30, safetyScore: 50, crimeLevel: "Alto", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 5, adventureScore: 8, customNotes: "Conhecido como 'África em miniatura' por reunir todos os biomas do continente."
  },
  {
    id: "686", iso2: "SN", iso3: "SEN", namePt: "Senegal", nameEn: "Senegal", flag: "🇸🇳",
    areaKm2: 196722, population: 17000000, continent: "África", continentCode: "AF", capital: "Dacar",
    travelCategory: "Cultura & História", famousAttraction: "Ilha de Gorée & Lago Rosa", coords: [-14.5, 14.5],
    costLevel: 2, costDailyUsd: 34, safetyScore: 72, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 7, adventureScore: 7, customNotes: "Espírito da 'Teranga' (hospitalidade) e surf na costa de Dacar."
  },
  {
    id: "324", iso2: "GN", iso3: "GIN", namePt: "Guiné", nameEn: "Guinea", flag: "🇬🇳",
    areaKm2: 245857, population: 13500000, continent: "África", continentCode: "AF", capital: "Conacri",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Platô Fouta Djallon", coords: [-10.8, 10.4],
    costLevel: 1, costDailyUsd: 24, safetyScore: 55, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 4, adventureScore: 8, customNotes: "A caixa d'água da África Ocidental com cachoeiras secretas."
  },
  {
    id: "854", iso2: "BF", iso3: "BFA", namePt: "Burkina Faso", nameEn: "Burkina Faso", flag: "🇧🇫",
    areaKm2: 274200, population: 22000000, continent: "África", continentCode: "AF", capital: "Ouagadougou",
    travelCategory: "Cultura & História", famousAttraction: "Ruínas de Loropéni & Picos de Sindou", coords: [-1.5, 12.3],
    costLevel: 1, costDailyUsd: 22, safetyScore: 42, crimeLevel: "Alto", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 4, adventureScore: 7, customNotes: "Festival Pan-Africano de Cinema e esculturas de pedra."
  },
  {
    id: "204", iso2: "BJ", iso3: "BEN", namePt: "Benin", nameEn: "Benin", flag: "🇧🇯",
    areaKm2: 112622, population: 13000000, continent: "África", continentCode: "AF", capital: "Porto-Novo",
    travelCategory: "Cultura & História", famousAttraction: "Palácios Reais de Abomé & Ouidah", coords: [2.3, 9.3],
    costLevel: 1, costDailyUsd: 25, safetyScore: 66, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 5, adventureScore: 7, customNotes: "Cidade palafita de Ganvié no meio do lago e berço do Vodun."
  },
  {
    id: "768", iso2: "TG", iso3: "TGO", namePt: "Togo", nameEn: "Togo", flag: "🇹🇬",
    areaKm2: 56785, population: 8600000, continent: "África", continentCode: "AF", capital: "Lomé",
    travelCategory: "Cultura & História", famousAttraction: "Koutammakou & Lago Togo", coords: [1.1, 8.6],
    costLevel: 1, costDailyUsd: 24, safetyScore: 68, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 5, adventureScore: 7, customNotes: "Casas fortificadas de argila dos Batammariba (UNESCO)."
  },
  {
    id: "430", iso2: "LR", iso3: "LBR", namePt: "Libéria", nameEn: "Liberia", flag: "🇱🇷",
    areaKm2: 111369, population: 5300000, continent: "África", continentCode: "AF", capital: "Monróvia",
    travelCategory: "Natureza & Praias", famousAttraction: "Parque Nacional Sapo & Robertsport", coords: [-9.4, 6.4],
    costLevel: 2, costDailyUsd: 28, safetyScore: 52, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 3, adventureScore: 8, customNotes: "Picos lendários de surf em Robertsport com ondas esquerdas perfeitas."
  },
  {
    id: "694", iso2: "SL", iso3: "SLE", namePt: "Serra Leoa", nameEn: "Sierra Leone", flag: "🇸🇱",
    areaKm2: 71740, population: 8400000, continent: "África", continentCode: "AF", capital: "Freetown",
    travelCategory: "Natureza & Praias", famousAttraction: "Praia River Number Two & Ilha Banana", coords: [-11.8, 8.5],
    costLevel: 1, costDailyUsd: 25, safetyScore: 60, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 4, adventureScore: 8, customNotes: "Praias de areia branca deslumbrantes cercadas por montanhas verdes."
  },
  {
    id: "266", iso2: "GA", iso3: "GAB", namePt: "Gabão", nameEn: "Gabon", flag: "🇬🇦",
    areaKm2: 267668, population: 2300000, continent: "África", continentCode: "AF", capital: "Libreville",
    travelCategory: "Natureza & Praias", famousAttraction: "Parque Nacional Loango & Elefantes da Praia", coords: [11.6, -0.8],
    costLevel: 3, costDailyUsd: 60, safetyScore: 68, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 6, adventureScore: 9, customNotes: "O 'Último Éden' onde elefantes e hipopótamos passeiam nas praias."
  },
  {
    id: "226", iso2: "GQ", iso3: "GNQ", namePt: "Guiné Equatorial", nameEn: "Equatorial Guinea", flag: "🇬🇶",
    areaKm2: 28051, population: 1600000, continent: "África", continentCode: "AF", capital: "Malabo",
    travelCategory: "Natureza & Praias", famousAttraction: "Pico Basile & Ilha Bioko", coords: [10.3, 1.6],
    costLevel: 4, costDailyUsd: 75, safetyScore: 64, crimeLevel: "Moderado", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 6, adventureScore: 6, customNotes: "Único país africano com espanhol como língua oficial."
  },
  {
    id: "140", iso2: "CF", iso3: "CAF", namePt: "Rep. Centro-Africana", nameEn: "Central African Republic", flag: "🇨🇫",
    areaKm2: 622984, population: 5500000, continent: "África", continentCode: "AF", capital: "Bangui",
    travelCategory: "Natureza & Praias", famousAttraction: "Parque Dzanga-Ndoki", coords: [20.9, 6.6],
    costLevel: 2, costDailyUsd: 35, safetyScore: 25, crimeLevel: "Crítico", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 2, adventureScore: 9, customNotes: "Clareira de Dzanga Bai com centenas de elefantes da floresta."
  },
  {
    id: "646", iso2: "RW", iso3: "RWA", namePt: "Ruanda", nameEn: "Rwanda", flag: "🇷🇼",
    areaKm2: 26338, population: 13500000, continent: "África", continentCode: "AF", capital: "Kigali",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Parque dos Vulcões & Lago Kivu", coords: [29.9, -1.9],
    costLevel: 3, costDailyUsd: 65, safetyScore: 88, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 9, adventureScore: 9, customNotes: "Capital mais limpa da África e modelo mundial de organização e segurança."
  },
  {
    id: "108", iso2: "BI", iso3: "BDI", namePt: "Burundi", nameEn: "Burundi", flag: "🇧🇮",
    areaKm2: 27834, population: 12500000, continent: "África", continentCode: "AF", capital: "Gitega",
    travelCategory: "Natureza & Praias", famousAttraction: "Lago Tanganica & Parque Rusizi", coords: [29.9, -3.4],
    costLevel: 1, costDailyUsd: 20, safetyScore: 48, crimeLevel: "Alto", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 3, adventureScore: 7, customNotes: "Tambores sagrados reais do Burundi e praias no Lago Tanganica."
  },
  {
    id: "454", iso2: "MW", iso3: "MWI", namePt: "Malawi", nameEn: "Malawi", flag: "🇲🇼",
    areaKm2: 118484, population: 20000000, continent: "África", continentCode: "AF", capital: "Lilongwe",
    travelCategory: "Natureza & Praias", famousAttraction: "Lago Malawi & Monte Mulanje", coords: [34.3, -13.2],
    costLevel: 1, costDailyUsd: 22, safetyScore: 74, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 5, adventureScore: 8, customNotes: "O 'Coração Quente da África', famoso pela amabilidade do povo."
  },
  {
    id: "232", iso2: "ER", iso3: "ERI", namePt: "Eritreia", nameEn: "Eritrea", flag: "🇪🇷",
    areaKm2: 117600, population: 3600000, continent: "África", continentCode: "AF", capital: "Asmara",
    travelCategory: "Cultura & História", famousAttraction: "Arquitetura Art Déco de Asmara", coords: [39.8, 15.2],
    costLevel: 2, costDailyUsd: 30, safetyScore: 52, crimeLevel: "Moderado", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 4, adventureScore: 7, customNotes: "Patrimônio modernista italiano e cafés retrô em Asmara."
  },
  {
    id: "262", iso2: "DJ", iso3: "DJI", namePt: "Djibuti", nameEn: "Djibouti", flag: "🇩🇯",
    areaKm2: 23200, population: 1100000, continent: "África", continentCode: "AF", capital: "Djibouti",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Lago Assal & Tubarões-Baleia", coords: [42.6, 11.8],
    costLevel: 3, costDailyUsd: 60, safetyScore: 70, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 6, adventureScore: 9, customNotes: "Ponto mais baixo da África no Lago Assal e paisagens alienígenas."
  },

  // EUROPE
  {
    id: "643", iso2: "RU", iso3: "RUS", namePt: "Rússia", nameEn: "Russia", flag: "🇷🇺",
    areaKm2: 17098246, population: 144000000, continent: "Europa", continentCode: "EU", capital: "Moscou",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Ferrovia Transiberiana & Lago Baikal", coords: [100, 60],
    costLevel: 2, costDailyUsd: 40, safetyScore: 58, crimeLevel: "Moderado", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 8, adventureScore: 10, customNotes: "A maior extensão terrestre do planeta ao longo de 11 fusos horários."
  },
  {
    id: "276", iso2: "DE", iso3: "DEU", namePt: "Alemanha", nameEn: "Germany", flag: "🇩🇪",
    areaKm2: 357022, population: 84000000, continent: "Europa", continentCode: "EU", capital: "Berlim",
    travelCategory: "Cultura & História", famousAttraction: "Castelo de Neuschwanstein & Berlim", coords: [10, 51],
    costLevel: 4, costDailyUsd: 90, safetyScore: 88, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 10, adventureScore: 7, customNotes: "Malha ferroviária impecável, castelos de conto de fadas e vida cultural."
  },
  {
    id: "250", iso2: "FR", iso3: "FRA", namePt: "França", nameEn: "France", flag: "🇫🇷",
    areaKm2: 551695, population: 68000000, continent: "Europa", continentCode: "EU", capital: "Paris",
    travelCategory: "Metrópole & Gastronomia", famousAttraction: "Torre Eiffel, Louvre & Côte d'Azur", coords: [2, 46],
    costLevel: 4, costDailyUsd: 95, safetyScore: 82, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 10, adventureScore: 8, customNotes: "País mais visitado do mundo, capital mundial da alta gastronomia."
  },
  {
    id: "826", iso2: "GB", iso3: "GBR", namePt: "Reino Unido", nameEn: "United Kingdom", flag: "🇬🇧",
    areaKm2: 242495, population: 67000000, continent: "Europa", continentCode: "EU", capital: "Londres",
    travelCategory: "Cultura & História", famousAttraction: "Big Ben, Highlands da Escócia & Stonehenge", coords: [-2, 54],
    costLevel: 4, costDailyUsd: 100, safetyScore: 85, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 10, adventureScore: 8, customNotes: "Museus gratuitos de nível mundial e trilhas místicas na Escócia."
  },
  {
    id: "380", iso2: "IT", iso3: "ITA", namePt: "Itália", nameEn: "Italy", flag: "🇮🇹",
    areaKm2: 301340, population: 59000000, continent: "Europa", continentCode: "EU", capital: "Roma",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Coliseu, Costa Amalfitana & Florença", coords: [12.5, 42.5],
    costLevel: 3, costDailyUsd: 75, safetyScore: 84, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 9, adventureScore: 8, customNotes: "Maior número de patrimônios mundiais da UNESCO no globo."
  },
  {
    id: "724", iso2: "ES", iso3: "ESP", namePt: "Espanha", nameEn: "Spain", flag: "🇪🇸",
    areaKm2: 505990, population: 47000000, continent: "Europa", continentCode: "EU", capital: "Madri",
    travelCategory: "Cultura & História", famousAttraction: "Sagrada Família, Alhambra & Caminho de Santiago", coords: [-3.7, 40.4],
    costLevel: 3, costDailyUsd: 65, safetyScore: 86, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 10, adventureScore: 8, customNotes: "Tapas, cultura de rua calorosa e a trilha de peregrinação mais famosa."
  },
  {
    id: "620", iso2: "PT", iso3: "PRT", namePt: "Portugal", nameEn: "Portugal", flag: "🇵🇹",
    areaKm2: 92212, population: 10300000, continent: "Europa", continentCode: "EU", capital: "Lisboa",
    travelCategory: "Natureza & Praias", famousAttraction: "Torre de Belém, Algarve & Sintra", coords: [-8.2, 39.4],
    costLevel: 2, costDailyUsd: 55, safetyScore: 92, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 9, adventureScore: 8, customNotes: "Um dos países mais seguros e ensolarados da Europa Ocidental."
  },
  {
    id: "616", iso2: "PL", iso3: "POL", namePt: "Polônia", nameEn: "Poland", flag: "🇵🇱",
    areaKm2: 312696, population: 38000000, continent: "Europa", continentCode: "EU", capital: "Varsóvia",
    travelCategory: "Cultura & História", famousAttraction: "Cracóvia, Minas de Sal de Wieliczka", coords: [19.1, 51.9],
    costLevel: 2, costDailyUsd: 40, safetyScore: 88, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 9, adventureScore: 7, customNotes: "Excelente custo-benefício mochileiro e centros históricos medievais."
  },
  {
    id: "804", iso2: "UA", iso3: "UKR", namePt: "Ucrânia", nameEn: "Ukraine", flag: "🇺🇦",
    areaKm2: 603500, population: 38000000, continent: "Europa", continentCode: "EU", capital: "Kiev",
    travelCategory: "Cultura & História", famousAttraction: "Mosteiro das Cavernas de Kiev & Lviv", coords: [31.2, 48.4],
    costLevel: 1, costDailyUsd: 25, safetyScore: 40, crimeLevel: "Crítico", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 6, adventureScore: 8, customNotes: "Cultura eslava milenar com cúpulas douradas e cidades históricas."
  },
  {
    id: "752", iso2: "SE", iso3: "SWE", namePt: "Suécia", nameEn: "Sweden", flag: "🇸🇪",
    areaKm2: 450295, population: 10500000, continent: "Europa", continentCode: "EU", capital: "Estocolmo",
    travelCategory: "Natureza & Praias", famousAttraction: "Gamla Stan & Arquipélago de Estocolmo", coords: [18.6, 60.1],
    costLevel: 4, costDailyUsd: 105, safetyScore: 90, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 10, adventureScore: 9, customNotes: "Allemansrätten (direito público de acampar livremente na natureza)."
  },
  {
    id: "578", iso2: "NO", iso3: "NOR", namePt: "Noruega", nameEn: "Norway", flag: "🇳🇴",
    areaKm2: 385207, population: 5500000, continent: "Europa", continentCode: "EU", capital: "Oslo",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Fiordes da Noruega & Trolltunga", coords: [8.5, 60.5],
    costLevel: 5, costDailyUsd: 135, safetyScore: 96, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 10, adventureScore: 10, customNotes: "Fiordes dramáticos, sol da meia-noite e altíssimo padrão de vida."
  },
  {
    id: "246", iso2: "FI", iso3: "FIN", namePt: "Finlândia", nameEn: "Finland", flag: "🇫🇮",
    areaKm2: 338424, population: 5600000, continent: "Europa", continentCode: "EU", capital: "Helsinque",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Lapônia & Aurora Boreal", coords: [25.7, 61.9],
    costLevel: 4, costDailyUsd: 100, safetyScore: 96, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 10, adventureScore: 9, customNotes: "País mais feliz do mundo com mais de 3 milhões de saunas."
  },
  {
    id: "352", iso2: "IS", iso3: "ISL", namePt: "Islândia", nameEn: "Iceland", flag: "🇮🇸",
    areaKm2: 103000, population: 380000, continent: "Europa", continentCode: "EU", capital: "Reykjavík",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Lagoa Azul, Geysir & Cachoeiras do Círculo Dourado", coords: [-19, 64.9],
    costLevel: 5, costDailyUsd: 150, safetyScore: 99, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 9, adventureScore: 10, customNotes: "País mais pacífico do mundo no Global Peace Index. Terra de fogo e gelo."
  },
  {
    id: "372", iso2: "IE", iso3: "IRL", namePt: "Irlanda", nameEn: "Ireland", flag: "🇮🇪",
    areaKm2: 70273, population: 5100000, continent: "Europa", continentCode: "EU", capital: "Dublin",
    travelCategory: "Natureza & Praias", famousAttraction: "Falésias de Moher & Ring of Kerry", coords: [-8.2, 53.4],
    costLevel: 4, costDailyUsd: 95, safetyScore: 91, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 9, adventureScore: 8, customNotes: "A Ilha Esmeralda, pub culture acolhedora e falésias atlânticas."
  },
  {
    id: "528", iso2: "NL", iso3: "NLD", namePt: "Países Baixos", nameEn: "Netherlands", flag: "🇳🇱",
    areaKm2: 41850, population: 17800000, continent: "Europa", continentCode: "EU", capital: "Amsterdã",
    travelCategory: "Cultura & História", famousAttraction: "Canais de Amsterdã & Moinhos de Zaanse Schans", coords: [5.3, 52.1],
    costLevel: 4, costDailyUsd: 90, safetyScore: 89, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 10, adventureScore: 7, customNotes: "Mais bicicletas que habitantes e ciclovias em 100% do território."
  },
  {
    id: "056", iso2: "BE", iso3: "BEL", namePt: "Bélgica", nameEn: "Belgium", flag: "🇧🇪",
    areaKm2: 30528, population: 11700000, continent: "Europa", continentCode: "EU", capital: "Bruxelas",
    travelCategory: "Metrópole & Gastronomia", famousAttraction: "Grand Place de Bruxelas & Bruges", coords: [4.4, 50.5],
    costLevel: 4, costDailyUsd: 85, safetyScore: 83, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 10, adventureScore: 6, customNotes: "Chocolates finos, cervejas trapistas e arquitetura medieval preservada."
  },
  {
    id: "756", iso2: "CH", iso3: "CHE", namePt: "Suíça", nameEn: "Switzerland", flag: "🇨🇭",
    areaKm2: 41285, population: 8800000, continent: "Europa", continentCode: "EU", capital: "Berna",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Matterhorn & Alpes Suíços", coords: [8.2, 46.8],
    costLevel: 5, costDailyUsd: 160, safetyScore: 97, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 10, adventureScore: 10, customNotes: "Trens panorâmicos pontuais nos picos nevados e segurança lendária."
  },
  {
    id: "040", iso2: "AT", iso3: "AUT", namePt: "Áustria", nameEn: "Austria", flag: "🇦🇹",
    areaKm2: 83879, population: 9100000, continent: "Europa", continentCode: "EU", capital: "Viena",
    travelCategory: "Cultura & História", famousAttraction: "Palácio de Schönbrunn & Hallstatt", coords: [14.5, 47.5],
    costLevel: 4, costDailyUsd: 85, safetyScore: 94, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 10, adventureScore: 9, customNotes: "Viena é eleita frequentemente a cidade com melhor qualidade de vida."
  },
  {
    id: "208", iso2: "DK", iso3: "DNK", namePt: "Dinamarca", nameEn: "Denmark", flag: "🇩🇰",
    areaKm2: 43094, population: 5900000, continent: "Europa", continentCode: "EU", capital: "Copenhague",
    travelCategory: "Metrópole & Gastronomia", famousAttraction: "Nyhavn & Jardins de Tivoli", coords: [9.5, 56.2],
    costLevel: 5, costDailyUsd: 120, safetyScore: 93, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 10, adventureScore: 7, customNotes: "Conceito de 'Hygge' (aconchego) e gastronomia nórdica de vanguarda."
  },
  {
    id: "300", iso2: "GR", iso3: "GRC", namePt: "Grécia", nameEn: "Greece", flag: "🇬🇷",
    areaKm2: 131957, population: 10400000, continent: "Europa", continentCode: "EU", capital: "Atenas",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Acrópole de Atenas & Santorini", coords: [21.8, 39],
    costLevel: 3, costDailyUsd: 60, safetyScore: 82, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 8, adventureScore: 8, customNotes: "Berço da democracia e mais de 6.000 ilhas e ilhotas míticas."
  },
  {
    id: "642", iso2: "RO", iso3: "ROU", namePt: "Romênia", nameEn: "Romania", flag: "🇷🇴",
    areaKm2: 238397, population: 19000000, continent: "Europa", continentCode: "EU", capital: "Bucareste",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Castelo de Bran (Drácula) & Transfăgărășan", coords: [24.9, 45.9],
    costLevel: 2, costDailyUsd: 38, safetyScore: 80, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 7, adventureScore: 9, customNotes: "Montanhas dos Cárpatos e a estrada mais espetacular da Europa."
  },
  {
    id: "348", iso2: "HU", iso3: "HUN", namePt: "Hungria", nameEn: "Hungary", flag: "🇭🇺",
    areaKm2: 93028, population: 9700000, continent: "Europa", continentCode: "EU", capital: "Budapeste",
    travelCategory: "Cultura & História", famousAttraction: "Parlamento de Budapeste & Termas Széchenyi", coords: [19.5, 47.1],
    costLevel: 2, costDailyUsd: 42, safetyScore: 84, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 8, adventureScore: 7, customNotes: "Capital das termas medicinais e 'ruin bars' lendários em Budapeste."
  },
  {
    id: "203", iso2: "CZ", iso3: "CZE", namePt: "República Tcheca", nameEn: "Czechia", flag: "🇨🇿",
    areaKm2: 78866, population: 10500000, continent: "Europa", continentCode: "EU", capital: "Praga",
    travelCategory: "Cultura & História", famousAttraction: "Ponte Carlos & Castelo de Praga", coords: [15.5, 49.8],
    costLevel: 2, costDailyUsd: 48, safetyScore: 92, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 9, adventureScore: 7, customNotes: "Cidade das cem cúpulas e cerveja Pilsner de tradição secular."
  },
  {
    id: "703", iso2: "SK", iso3: "SVK", namePt: "Eslováquia", nameEn: "Slovakia", flag: "🇸🇰",
    areaKm2: 49035, population: 5400000, continent: "Europa", continentCode: "EU", capital: "Bratislava",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Montanhas Altos Tatras", coords: [19.7, 48.6],
    costLevel: 2, costDailyUsd: 45, safetyScore: 86, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 8, adventureScore: 8, customNotes: "Maior densidade de castelos per capita e picos alpinos Tatras."
  },
  {
    id: "100", iso2: "BG", iso3: "BGR", namePt: "Bulgária", nameEn: "Bulgaria", flag: "🇧🇬",
    areaKm2: 110879, population: 6500000, continent: "Europa", continentCode: "EU", capital: "Sófia",
    travelCategory: "Cultura & História", famousAttraction: "Mosteiro de Rila & Sete Lagos de Rila", coords: [25.4, 42.7],
    costLevel: 1, costDailyUsd: 32, safetyScore: 78, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 7, adventureScore: 8, customNotes: "Destino mais barato da União Europeia para mochileiros."
  },
  {
    id: "688", iso2: "RS", iso3: "SRB", namePt: "Sérvia", nameEn: "Serbia", flag: "🇷🇸",
    areaKm2: 88361, population: 6700000, continent: "Europa", continentCode: "EU", capital: "Belgrado",
    travelCategory: "Cultura & História", famousAttraction: "Fortaleza de Belgrado & Parque Tara", coords: [21, 44],
    costLevel: 1, costDailyUsd: 35, safetyScore: 76, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 7, adventureScore: 7, customNotes: "Encontro dos rios Danúbio e Sava e vida noturna animada nos 'splavovi'."
  },
  {
    id: "191", iso2: "HR", iso3: "HRV", namePt: "Croácia", nameEn: "Croatia", flag: "🇭🇷",
    areaKm2: 56594, population: 3900000, continent: "Europa", continentCode: "EU", capital: "Zagreb",
    travelCategory: "Natureza & Praias", famousAttraction: "Lagos de Plitvice & Muralhas de Dubrovnik", coords: [15.2, 45.1],
    costLevel: 3, costDailyUsd: 68, safetyScore: 90, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 9, adventureScore: 8, customNotes: "Mar Adriático cristalino e muralhas medievais de Game of Thrones."
  },
  {
    id: "112", iso2: "BY", iso3: "BLR", namePt: "Belarus", nameEn: "Belarus", flag: "🇧🇾",
    areaKm2: 207600, population: 9200000, continent: "Europa", continentCode: "EU", capital: "Minsk",
    travelCategory: "Cultura & História", famousAttraction: "Castelo de Mir & Floresta Bialowieza", coords: [27.9, 53.7],
    costLevel: 2, costDailyUsd: 35, safetyScore: 72, crimeLevel: "Moderado", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 7, adventureScore: 6, customNotes: "Última floresta primitiva da Europa com bisões europeus."
  },

  // ASIA
  {
    id: "156", iso2: "CN", iso3: "CHN", namePt: "China", nameEn: "China", flag: "🇨🇳",
    areaKm2: 9596961, population: 1412000000, continent: "Ásia", continentCode: "AS", capital: "Pequim",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Grande Muralha da China & Guerreiros de Terracota", coords: [104, 35],
    costLevel: 2, costDailyUsd: 45, safetyScore: 86, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 10, adventureScore: 10, customNotes: "Maior malha de trens-bala do mundo e 5.000 anos de história contínua."
  },
  {
    id: "356", iso2: "IN", iso3: "IND", namePt: "Índia", nameEn: "India", flag: "🇮🇳",
    areaKm2: 3287263, population: 1428000000, continent: "Ásia", continentCode: "AS", capital: "Nova Délhi",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Taj Mahal, Varanasi & Himalaias", coords: [78.9, 20.5],
    costLevel: 1, costDailyUsd: 20, safetyScore: 60, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 6, adventureScore: 10, customNotes: "O paraíso supremo do mochileiro econômico, espiritualidade e cores."
  },
  {
    id: "392", iso2: "JP", iso3: "JPN", namePt: "Japão", nameEn: "Japan", flag: "🇯🇵",
    areaKm2: 377975, population: 125000000, continent: "Ásia", continentCode: "AS", capital: "Tóquio",
    travelCategory: "Metrópole & Gastronomia", famousAttraction: "Monte Fuji, Quioto & Shibuya", coords: [138, 36],
    costLevel: 4, costDailyUsd: 85, safetyScore: 98, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 10, adventureScore: 8, customNotes: "Um dos países mais seguros e higiênicos do mundo com cultura milenar."
  },
  {
    id: "360", iso2: "ID", iso3: "IDN", namePt: "Indonésia", nameEn: "Indonesia", flag: "🇮🇩",
    areaKm2: 1904569, population: 275000000, continent: "Ásia", continentCode: "AS", capital: "Jacarta",
    travelCategory: "Natureza & Praias", famousAttraction: "Templos de Bali & Dragões de Komodo", coords: [113.9, -0.7],
    costLevel: 1, costDailyUsd: 25, safetyScore: 76, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 6, adventureScore: 10, customNotes: "Maior país insular do mundo (17.000 ilhas), surfe de classe mundial e vulcões."
  },
  {
    id: "682", iso2: "SA", iso3: "SAU", namePt: "Arábia Saudita", nameEn: "Saudi Arabia", flag: "🇸🇦",
    areaKm2: 2149690, population: 36000000, continent: "Ásia", continentCode: "AS", capital: "Riad",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Hegra em AlUla & Borda do Mundo", coords: [45, 23.8],
    costLevel: 3, costDailyUsd: 70, safetyScore: 85, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 9, adventureScore: 8, customNotes: "Túmulos esculpidos na rocha em AlUla e deserto de Rub al-Khali."
  },
  {
    id: "364", iso2: "IR", iso3: "IRN", namePt: "Irã", nameEn: "Iran", flag: "🇮🇷",
    areaKm2: 1648195, population: 88000000, continent: "Ásia", continentCode: "AS", capital: "Teerã",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Persépolis & Praça Naqsh-e Jahan em Isfahan", coords: [53.6, 32.4],
    costLevel: 1, costDailyUsd: 20, safetyScore: 62, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 7, adventureScore: 9, customNotes: "Povo mais hospitaleiro do mundo para viajantes e império persa."
  },
  {
    id: "792", iso2: "TR", iso3: "TUR", namePt: "Turquia", nameEn: "Turkey", flag: "🇹🇷",
    areaKm2: 783562, population: 85000000, continent: "Ásia", continentCode: "AS", capital: "Ancara",
    travelCategory: "Cultura & História", famousAttraction: "Balões na Capadócia, Santa Sofia & Pamukkale", coords: [35.2, 38.9],
    costLevel: 2, costDailyUsd: 35, safetyScore: 74, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 9, adventureScore: 9, customNotes: "Ponte entre Europa e Ásia com bazares épicos e voos de balão."
  },
  {
    id: "398", iso2: "KZ", iso3: "KAZ", namePt: "Cazaquistão", nameEn: "Kazakhstan", flag: "🇰🇿",
    areaKm2: 2724900, population: 20000000, continent: "Ásia", continentCode: "AS", capital: "Astana",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Cânion Charyn & Lagos Kolsai", coords: [66.9, 48],
    costLevel: 1, costDailyUsd: 28, safetyScore: 80, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 7, adventureScore: 9, customNotes: "Maior país sem saída para o mar do planeta com estepe nômada vasta."
  },
  {
    id: "586", iso2: "PK", iso3: "PAK", namePt: "Paquistão", nameEn: "Pakistan", flag: "🇵🇰",
    areaKm2: 881913, population: 240000000, continent: "Ásia", continentCode: "AS", capital: "Islamabad",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Cordilheira do Karakoram & Vale Hunza", coords: [69.3, 30.3],
    costLevel: 1, costDailyUsd: 18, safetyScore: 54, crimeLevel: "Alto", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 5, adventureScore: 10, customNotes: "Picos montanhosos mais altos do mundo como K2 e hospitalidade ímpar."
  },
  {
    id: "050", iso2: "BD", iso3: "BGD", namePt: "Bangladesh", nameEn: "Bangladesh", flag: "🇧🇩",
    areaKm2: 148460, population: 170000000, continent: "Ásia", continentCode: "AS", capital: "Daca",
    travelCategory: "Natureza & Praias", famousAttraction: "Manguezal de Sundarbans", coords: [90.3, 23.6],
    costLevel: 1, costDailyUsd: 18, safetyScore: 62, crimeLevel: "Moderado", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 5, adventureScore: 7, customNotes: "Maior floresta de manguezais do mundo com tigres de bengala."
  },
  {
    id: "704", iso2: "VN", iso3: "VNM", namePt: "Vietnã", nameEn: "Vietnam", flag: "🇻🇳",
    areaKm2: 331212, population: 98000000, continent: "Ásia", continentCode: "AS", capital: "Hanói",
    travelCategory: "Natureza & Praias", famousAttraction: "Baía de Ha Long & Hoi An", coords: [108.2, 14],
    costLevel: 1, costDailyUsd: 24, safetyScore: 86, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 8, adventureScore: 9, customNotes: "Comida de rua inacreditável (Pho, Banh Mi), cavernas gigantes e motos."
  },
  {
    id: "764", iso2: "TH", iso3: "THA", namePt: "Tailândia", nameEn: "Thailand", flag: "🇹🇭",
    areaKm2: 513120, population: 71000000, continent: "Ásia", continentCode: "AS", capital: "Bangkok",
    travelCategory: "Metrópole & Gastronomia", famousAttraction: "Grande Palácio de Bangkok, Ilhas Phi Phi & Chiang Mai", coords: [100.9, 15.8],
    costLevel: 1, costDailyUsd: 28, safetyScore: 82, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 9, adventureScore: 8, customNotes: "A meca absoluta dos mochileiros com ilhas paradisíacas e templos dourados."
  },
  {
    id: "410", iso2: "KR", iso3: "KOR", namePt: "Coreia do Sul", nameEn: "South Korea", flag: "🇰🇷",
    areaKm2: 100210, population: 51700000, continent: "Ásia", continentCode: "AS", capital: "Seul",
    travelCategory: "Metrópole & Gastronomia", famousAttraction: "Palácio Gyeongbokgung & Ilha de Jeju", coords: [127.7, 35.9],
    costLevel: 3, costDailyUsd: 70, safetyScore: 95, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 10, adventureScore: 7, customNotes: "Hiperconectividade 5G, cultura K-Pop e segurança noturna total."
  },
  {
    id: "408", iso2: "KP", iso3: "PRK", namePt: "Coreia do Norte", nameEn: "North Korea", flag: "🇰🇵",
    areaKm2: 120538, population: 26000000, continent: "Ásia", continentCode: "AS", capital: "Pyongyang",
    travelCategory: "Cultura & História", famousAttraction: "Monte Paektu & Torre Juche", coords: [127.5, 40.3],
    costLevel: 3, costDailyUsd: 70, safetyScore: 60, crimeLevel: "Moderado", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 4, adventureScore: 6, customNotes: "Acesso estritamente guiado por operadores oficiais autorizados."
  },
  {
    id: "608", iso2: "PH", iso3: "PHL", namePt: "Filipinas", nameEn: "Philippines", flag: "🇵🇭",
    areaKm2: 300000, population: 115000000, continent: "Ásia", continentCode: "AS", capital: "Manila",
    travelCategory: "Natureza & Praias", famousAttraction: "El Nido, Palawan & Colinas do Chocolate", coords: [121.7, 12.8],
    costLevel: 1, costDailyUsd: 26, safetyScore: 68, crimeLevel: "Moderado", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 6, adventureScore: 9, customNotes: "Mais de 7.000 ilhas tropicais e o melhor mergulho de lagoas do sudeste asiático."
  },
  {
    id: "458", iso2: "MY", iso3: "MYS", namePt: "Malásia", nameEn: "Malaysia", flag: "🇲🇾",
    areaKm2: 330803, population: 33000000, continent: "Ásia", continentCode: "AS", capital: "Kuala Lumpur",
    travelCategory: "Metrópole & Gastronomia", famousAttraction: "Torres Petronas & Floresta de Bornéu", coords: [101.9, 4.2],
    costLevel: 2, costDailyUsd: 35, safetyScore: 84, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 9, adventureScore: 8, customNotes: "Excelente infraestrutura a preços acessíveis e selvas de orangotangos em Bornéu."
  },
  {
    id: "496", iso2: "MN", iso3: "MNG", namePt: "Mongólia", nameEn: "Mongolia", flag: "🇲🇳",
    areaKm2: 1564116, population: 3400000, continent: "Ásia", continentCode: "AS", capital: "Ulan Bator",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Deserto de Gobi & Estepes Nômades", coords: [103.8, 46.8],
    costLevel: 2, costDailyUsd: 32, safetyScore: 82, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 5, adventureScore: 10, customNotes: "A menor densidade demográfica do planeta e vida em tendas 'ger'."
  },
  {
    id: "004", iso2: "AF", iso3: "AFG", namePt: "Afeganistão", nameEn: "Afghanistan", flag: "🇦🇫",
    areaKm2: 652864, population: 41000000, continent: "Ásia", continentCode: "AS", capital: "Cabul",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Lagos Band-e Amir & Vale de Bamiyan", coords: [67.7, 33.9],
    costLevel: 1, costDailyUsd: 20, safetyScore: 22, crimeLevel: "Crítico", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 2, adventureScore: 9, customNotes: "Lagos azuis de travertino cercados por montanhas do Hindu Kush."
  },
  {
    id: "368", iso2: "IQ", iso3: "IRQ", namePt: "Iraque", nameEn: "Iraq", flag: "🇮🇶",
    areaKm2: 438317, population: 44000000, continent: "Ásia", continentCode: "AS", capital: "Bagdá",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Ruínas Antigas da Babilônia & Ur", coords: [43.6, 33.2],
    costLevel: 2, costDailyUsd: 35, safetyScore: 48, crimeLevel: "Alto", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 5, adventureScore: 8, customNotes: "O berço da civilização mesopotâmica entre os rios Tigre e Eufrates."
  },
  {
    id: "760", iso2: "SY", iso3: "SYR", namePt: "Síria", nameEn: "Syria", flag: "🇸🇾",
    areaKm2: 185180, population: 22000000, continent: "Ásia", continentCode: "AS", capital: "Damasco",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Palmira Antiga & Crac dos Cavaleiros", coords: [38.9, 34.8],
    costLevel: 1, costDailyUsd: 20, safetyScore: 28, crimeLevel: "Crítico", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 3, adventureScore: 8, customNotes: "Damasco é uma das cidades habitadas mais antigas continuamente na Terra."
  },
  {
    id: "376", iso2: "IL", iso3: "ISR", namePt: "Israel", nameEn: "Israel", flag: "🇮🇱",
    areaKm2: 22072, population: 9700000, continent: "Ásia", continentCode: "AS", capital: "Jerusalém",
    travelCategory: "Cultura & História", famousAttraction: "Cidade Velha de Jerusalém & Mar Morto", coords: [34.8, 31],
    costLevel: 5, costDailyUsd: 130, safetyScore: 65, crimeLevel: "Moderado", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 9, adventureScore: 7, customNotes: "Ponto de convergência das três grandes religiões abraâmicas."
  },
  {
    id: "400", iso2: "JO", iso3: "JOR", namePt: "Jordânia", nameEn: "Jordan", flag: "🇯🇴",
    areaKm2: 89342, population: 11000000, continent: "Ásia", continentCode: "AS", capital: "Amã",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Petra Cidade Rosa & Deserto de Wadi Rum", coords: [36.2, 30.5],
    costLevel: 3, costDailyUsd: 65, safetyScore: 84, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 8, adventureScore: 9, customNotes: "Tesouro esculpido nos cânions de arenito rosado de Petra."
  },
  {
    id: "887", iso2: "YE", iso3: "YEM", namePt: "Iêmen", nameEn: "Yemen", flag: "🇾🇪",
    areaKm2: 527968, population: 33000000, continent: "Ásia", continentCode: "AS", capital: "Sana",
    travelCategory: "Natureza & Praias", famousAttraction: "Ilha Encantada de Socotra", coords: [48.5, 15.5],
    costLevel: 2, costDailyUsd: 35, safetyScore: 24, crimeLevel: "Crítico", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 2, adventureScore: 9, customNotes: "Árvores sangue de dragão na ilha quase extraterrestre de Socotra."
  },
  {
    id: "512", iso2: "OM", iso3: "OMN", namePt: "Omã", nameEn: "Oman", flag: "🇴🇲",
    areaKm2: 309500, population: 4600000, continent: "Ásia", continentCode: "AS", capital: "Mascate",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Wadi Shab & Fjords de Musandam", coords: [55.9, 21.5],
    costLevel: 3, costDailyUsd: 70, safetyScore: 94, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 9, adventureScore: 9, customNotes: "Um dos países mais seguros e limpos do Oriente Médio com desfiladeiros de águas esmeralda."
  },
  {
    id: "784", iso2: "AE", iso3: "ARE", namePt: "Emirados Árabes Unidos", nameEn: "United Arab Emirates", flag: "🇦🇪",
    areaKm2: 83600, population: 9400000, continent: "Ásia", continentCode: "AS", capital: "Abu Dhabi",
    travelCategory: "Metrópole & Gastronomia", famousAttraction: "Burj Khalifa em Dubai & Grande Mesquita", coords: [53.8, 23.4],
    costLevel: 5, costDailyUsd: 135, safetyScore: 96, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 10, adventureScore: 7, customNotes: "Maior arranha-céu do mundo e criminalidade praticamente nula."
  },
  {
    id: "104", iso2: "MM", iso3: "MMR", namePt: "Mianmar", nameEn: "Myanmar", flag: "🇲🇲",
    areaKm2: 676578, population: 54000000, continent: "Ásia", continentCode: "AS", capital: "Naypyidaw",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Planície de Pagodas de Bagan & Lago Inle", coords: [95.9, 21.9],
    costLevel: 1, costDailyUsd: 22, safetyScore: 45, crimeLevel: "Alto", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 4, adventureScore: 9, customNotes: "Mais de 2.000 templos budistas medievais erguidos na planície de Bagan."
  },
  {
    id: "116", iso2: "KH", iso3: "KHM", namePt: "Camboja", nameEn: "Cambodia", flag: "🇰🇭",
    areaKm2: 181035, population: 16700000, continent: "Ásia", continentCode: "AS", capital: "Phnom Penh",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Templo Místico de Angkor Wat", coords: [104.9, 12.5],
    costLevel: 1, costDailyUsd: 24, safetyScore: 74, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 6, adventureScore: 9, customNotes: "Maior monumento religioso do mundo devorado pelas raízes da selva."
  },
  {
    id: "418", iso2: "LA", iso3: "LAO", namePt: "Laos", nameEn: "Laos", flag: "🇱🇦",
    areaKm2: 236800, population: 7500000, continent: "Ásia", continentCode: "AS", capital: "Vientiane",
    travelCategory: "Cultura & História", famousAttraction: "Cachoeiras de Kuang Si & Luang Prabang", coords: [102.4, 19.8],
    costLevel: 1, costDailyUsd: 20, safetyScore: 80, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 5, adventureScore: 8, customNotes: "Ritmo calmo às margens do Rio Mekong com cachoeiras cor turquesa."
  },
  {
    id: "144", iso2: "LK", iso3: "LKA", namePt: "Sri Lanka", nameEn: "Sri Lanka", flag: "🇱🇰",
    areaKm2: 65610, population: 22000000, continent: "Ásia", continentCode: "AS", capital: "Colombo",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Pedra de Sigiriya & Trem de Ella", coords: [80.7, 7.8],
    costLevel: 1, costDailyUsd: 25, safetyScore: 78, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 7, adventureScore: 9, customNotes: "Viagem de trem panorâmica pelas plantações de chá e fortaleza na rocha de Sigiriya."
  },
  {
    id: "524", iso2: "NP", iso3: "NPL", namePt: "Nepal", nameEn: "Nepal", flag: "🇳🇵",
    areaKm2: 147181, population: 30000000, continent: "Ásia", continentCode: "AS", capital: "Catmandu",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Trilha do Monte Everest & Annapurna", coords: [84.1, 28.3],
    costLevel: 1, costDailyUsd: 22, safetyScore: 82, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 5, adventureScore: 10, customNotes: "Capital mundial do montanhismo com 8 dos 14 picos com mais de 8.000m."
  },
  {
    id: "860", iso2: "UZ", iso3: "UZB", namePt: "Uzbequistão", nameEn: "Uzbekistan", flag: "🇺🇿",
    areaKm2: 447400, population: 35000000, continent: "Ásia", continentCode: "AS", capital: "Tashkent",
    travelCategory: "Patrimônio Mundial", famousAttraction: "Rota da Seda em Samarcanda & Bukhara", coords: [64.5, 41.3],
    costLevel: 1, costDailyUsd: 25, safetyScore: 88, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 7, adventureScore: 8, customNotes: "Cúpulas azul turquesa reluzentes e mosaicos da lendária Rota da Seda."
  },
  {
    id: "795", iso2: "TM", iso3: "TKM", namePt: "Turcomenistão", nameEn: "Turkmenistan", flag: "🇹🇲",
    areaKm2: 488100, population: 6400000, continent: "Ásia", continentCode: "AS", capital: "Asgabate",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Cratera de Gás de Darvaza (Porta do Inferno)", coords: [59.5, 38.9],
    costLevel: 2, costDailyUsd: 45, safetyScore: 70, crimeLevel: "Moderado", visaAccessibility: "Burocrático / Rígido",
    infrastructureScore: 6, adventureScore: 9, customNotes: "Cratera de gás que arde continuamente no meio do deserto há mais de 50 anos."
  },

  // OCEANIA
  {
    id: "036", iso2: "AU", iso3: "AUS", namePt: "Austrália", nameEn: "Australia", flag: "🇦🇺",
    areaKm2: 7692024, population: 26000000, continent: "Oceania", continentCode: "OC", capital: "Camberra",
    travelCategory: "Natureza & Praias", famousAttraction: "Grande Barreira de Corais & Ópera de Sydney", coords: [133.7, -25.2],
    costLevel: 4, costDailyUsd: 110, safetyScore: 92, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 10, adventureScore: 10, customNotes: "Maior recife de corais do planeta, outback vermelho e praias de surf."
  },
  {
    id: "554", iso2: "NZ", iso3: "NZL", namePt: "Nova Zelândia", nameEn: "New Zealand", flag: "🇳🇿",
    areaKm2: 268021, population: 5100000, continent: "Oceania", continentCode: "OC", capital: "Wellington",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Fiordes de Milford Sound & Hobbiton", coords: [174.8, -40.9],
    costLevel: 4, costDailyUsd: 100, safetyScore: 96, crimeLevel: "Baixo", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 10, adventureScore: 10, customNotes: "Capital mundial dos esportes radicais e cenários épicos de cinema."
  },
  {
    id: "598", iso2: "PG", iso3: "PNG", namePt: "Papua Nova Guiné", nameEn: "Papua New Guinea", flag: "🇵🇬",
    areaKm2: 462840, population: 10000000, continent: "Oceania", continentCode: "OC", capital: "Port Moresby",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Trilha Kokoda & Tribos do Vale de Wahgi", coords: [143.9, -6.3],
    costLevel: 3, costDailyUsd: 65, safetyScore: 42, crimeLevel: "Alto", visaAccessibility: "e-Visa / Chegada",
    infrastructureScore: 3, adventureScore: 10, customNotes: "Mais de 800 línguas nativas e tribos com tradições ancestrais preservadas."
  },
  {
    id: "242", iso2: "FJ", iso3: "FJI", namePt: "Fiji", nameEn: "Fiji", flag: "🇫🇯",
    areaKm2: 18274, population: 920000, continent: "Oceania", continentCode: "OC", capital: "Suva",
    travelCategory: "Natureza & Praias", famousAttraction: "Ilhas Mamanuca & Recifes de Coral", coords: [178, -17.7],
    costLevel: 3, costDailyUsd: 60, safetyScore: 82, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 7, adventureScore: 8, customNotes: "Arquipélago carismático com corais coloridos e hospitalidade do 'Bula'."
  },
  {
    id: "090", iso2: "SB", iso3: "SLB", namePt: "Ilhas Salomão", nameEn: "Solomon Islands", flag: "🇸🇧",
    areaKm2: 28896, population: 720000, continent: "Oceania", continentCode: "OC", capital: "Honiara",
    travelCategory: "Natureza & Praias", famousAttraction: "Lagoa Marovo & Mergulho em Naufrágios", coords: [160, -9.6],
    costLevel: 3, costDailyUsd: 55, safetyScore: 68, crimeLevel: "Moderado", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 4, adventureScore: 9, customNotes: "Maior lagoa de água salgada do planeta e naufrágios históricos no Pacífico."
  },
  {
    id: "548", iso2: "VU", iso3: "VUT", namePt: "Vanuatu", nameEn: "Vanuatu", flag: "🇻🇺",
    areaKm2: 12189, population: 320000, continent: "Oceania", continentCode: "OC", capital: "Port Vila",
    travelCategory: "Aventura & Trilhas", famousAttraction: "Vulcão Monte Yasur Ativo", coords: [168.3, -15.3],
    costLevel: 3, costDailyUsd: 60, safetyScore: 84, crimeLevel: "Baixo", visaAccessibility: "Isento / Fácil",
    infrastructureScore: 5, adventureScore: 10, customNotes: "Vulcão ativo mais acessível do mundo e berço ancestral do bungee jumping."
  },
];

export const CONTINENT_NAMES: Record<string, string> = {
  SA: "América do Sul",
  NA: "América do Norte",
  EU: "Europa",
  AF: "África",
  AS: "Ásia",
  OC: "Oceania",
};

// Vibrant, fresh, light pastel colors for the backpacker adventure board aesthetic!
export const CONTINENT_COLORS: Record<string, { fill: string; border: string; glow: string; text: string; bgSoft: string; badge: string }> = {
  SA: { fill: "#34d399", border: "#059669", glow: "rgba(52,211,153,0.6)", text: "#065f46", bgSoft: "#ecfdf5", badge: "bg-emerald-100 text-emerald-800 border-emerald-300" }, // Fresh Mint / Emerald
  NA: { fill: "#fbbf24", border: "#d97706", glow: "rgba(251,191,36,0.6)", text: "#92400e", bgSoft: "#fffbeb", badge: "bg-amber-100 text-amber-800 border-amber-300" }, // Sunburst Amber
  EU: { fill: "#60a5fa", border: "#2563eb", glow: "rgba(96,165,250,0.6)", text: "#1e40af", bgSoft: "#eff6ff", badge: "bg-blue-100 text-blue-800 border-blue-300" }, // Sky Blue
  AF: { fill: "#fb7185", border: "#e11d48", glow: "rgba(251,113,133,0.6)", text: "#9f1239", bgSoft: "#fff1f2", badge: "bg-rose-100 text-rose-800 border-rose-300" }, // Rose / Tropical Coral
  AS: { fill: "#c084fc", border: "#9333ea", glow: "rgba(192,132,252,0.6)", text: "#6b21a8", bgSoft: "#faf5ff", badge: "bg-purple-100 text-purple-800 border-purple-300" }, // Lavender Purple
  OC: { fill: "#2dd4bf", border: "#0d9488", glow: "rgba(45,212,191,0.6)", text: "#115e59", bgSoft: "#f0fdfa", badge: "bg-teal-100 text-teal-800 border-teal-300" }, // Aqua / Lagoon Teal
};

// Helper: Calculate 1 to 5 Crime Rank (🥷)
export function getCrimeRank(country: { crimeRank?: number; crimeLevel?: string; safetyScore?: number }): 1 | 2 | 3 | 4 | 5 {
  if (country.crimeRank && country.crimeRank >= 1 && country.crimeRank <= 5) {
    return Math.round(country.crimeRank) as 1 | 2 | 3 | 4 | 5;
  }
  if (country.crimeLevel === 'Baixo') return 1;
  if (country.crimeLevel === 'Moderado') {
    if (country.safetyScore !== undefined && country.safetyScore < 60) return 3;
    return 2;
  }
  if (country.crimeLevel === 'Alto') return 4;
  if (country.crimeLevel === 'Crítico') return 5;
  if (country.safetyScore !== undefined) {
    if (country.safetyScore >= 80) return 1;
    if (country.safetyScore >= 65) return 2;
    if (country.safetyScore >= 50) return 3;
    if (country.safetyScore >= 35) return 4;
    return 5;
  }
  return 2;
}

export function getCrimeDescription(rank: number): { label: string; color: string; bg: string } {
  switch (rank) {
    case 1:
      return { label: 'Quase Nulo (Seguríssimo)', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' };
    case 2:
      return { label: 'Baixo / Tranquilo', color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200' };
    case 3:
      return { label: 'Moderado (Atenção a furtos)', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' };
    case 4:
      return { label: 'Alto (Golpes e assaltos)', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' };
    case 5:
    default:
      return { label: 'Crítico (Zona de Alto Risco)', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' };
  }
}

export function getCostDescription(level: number): { label: string; color: string; bg: string } {
  switch (level) {
    case 1:
      return { label: 'Ultra Econômico (≤ $25/dia)', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' };
    case 2:
      return { label: 'Econômico ($26 - $45/dia)', color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200' };
    case 3:
      return { label: 'Moderado ($46 - $75/dia)', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' };
    case 4:
      return { label: 'Caro ($76 - $120/dia)', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' };
    case 5:
    default:
      return { label: 'Altíssimo Custo (> $120/dia)', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' };
  }
}
