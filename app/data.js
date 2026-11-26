// Statistik Nusantara — data for Indonesia.
// Every series below is a real published figure, labelled with its source and
// year on the site. Sources: World Bank World Development Indicators (WDI),
// Statistics Indonesia (BPS), IMF World Economic Outlook (WEO).
// Figures were checked against those publications on 26 November 2026.
// Nothing here is estimated by this site: values are the publishers' own.

export const META = {
  country: 'Indonesia',
  countryId: 'IDN',
  capital: 'Jakarta',
  currency: 'Indonesian rupiah (IDR)',
  language: 'Indonesian',
  landAreaKm2: 1904569,
  updated: '26 November 2026',
};

// Headline indicators shown on the overview page.
export const HEADLINE = [
  { key: 'population', label: 'Population', value: '283.5 million', sub: '2024 · World Bank WDI', note: '4th most populous country in the world' },
  { key: 'gdp', label: 'GDP, nominal', value: '$1.40 trillion', sub: '2024 · World Bank WDI', note: '16th largest economy in the world' },
  { key: 'gdpCapita', label: 'GDP per capita', value: '$4,925', sub: '2024 · World Bank WDI', note: 'Upper middle income country' },
  { key: 'growth', label: 'Real GDP growth', value: '5.03%', sub: '2024 · BPS / World Bank', note: '10th straight year near 5%, except 2020' },
  { key: 'inflation', label: 'Inflation (Dec, yoy)', value: '1.57%', sub: '2024 · BPS', note: 'Inside Bank Indonesia’s 2.5% ± 1pp target' },
  { key: 'unemployment', label: 'Open unemployment', value: '4.91%', sub: 'Aug 2024 · BPS', note: 'Lowest August reading since 2019' },
  { key: 'poverty', label: 'Poverty rate', value: '8.57%', sub: 'Sep 2024 · BPS', note: 'Down from 10.19% in September 2020' },
  { key: 'life', label: 'Life expectancy', value: '71.3 years', sub: '2024 · World Bank WDI', note: 'Women 73.4 · Men 69.2 (2024)' },
];

// Real GDP growth, annual %, 2015–2024. Source: BPS / World Bank WDI.
export const GDP_GROWTH = [
  { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 },
  { year: 2017, value: 5.07 }, { year: 2018, value: 5.17 },
  { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
  { year: 2021, value: 3.70 }, { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 },
];

// GDP, nominal, current US$ billions, 2015–2024. Source: World Bank WDI.
export const GDP_NOMINAL = [
  { year: 2015, value: 860.9 }, { year: 2016, value: 931.9 },
  { year: 2017, value: 1015.6 }, { year: 2018, value: 1042.3 },
  { year: 2019, value: 1119.1 }, { year: 2020, value: 1059.1 },
  { year: 2021, value: 1186.5 }, { year: 2022, value: 1319.1 },
  { year: 2023, value: 1371.2 }, { year: 2024, value: 1396.3 },
];

// GDP per capita, nominal US$, 2015–2024. Source: World Bank WDI.
export const GDP_PER_CAPITA = [
  { year: 2015, value: 3332 }, { year: 2016, value: 3563 },
  { year: 2017, value: 3838 }, { year: 2018, value: 3894 },
  { year: 2019, value: 4135 }, { year: 2020, value: 3872 },
  { year: 2021, value: 4293 }, { year: 2022, value: 4726 },
  { year: 2023, value: 4876 }, { year: 2024, value: 4925 },
];

// Population, millions (World Bank WDI estimates), 2020–2025.
export const POPULATION = [
  { year: 2020, value: 274.8 }, { year: 2021, value: 276.4 },
  { year: 2022, value: 278.8 }, { year: 2023, value: 281.2 },
  { year: 2024, value: 283.5 }, { year: 2025, value: 285.7 },
];

// Consumer price inflation, December year-on-year %, 2015–2024. Source: BPS.
export const INFLATION = [
  { year: 2015, value: 3.35 }, { year: 2016, value: 3.02 },
  { year: 2017, value: 3.61 }, { year: 2018, value: 3.13 },
  { year: 2019, value: 2.72 }, { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 }, { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 }, { year: 2024, value: 1.57 },
];

// Open unemployment rate, August %, 2015–2024. Source: BPS.
export const UNEMPLOYMENT = [
  { year: 2015, value: 6.18 }, { year: 2016, value: 5.61 },
  { year: 2017, value: 5.50 }, { year: 2018, value: 5.34 },
  { year: 2019, value: 5.28 }, { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 }, { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 }, { year: 2024, value: 4.91 },
];

// Poverty rate, September %, 2019–2024. Source: BPS.
export const POVERTY = [
  { year: 2019, value: 9.22 }, { year: 2020, value: 10.19 },
  { year: 2021, value: 9.71 }, { year: 2022, value: 9.57 },
  { year: 2023, value: 9.36 }, { year: 2024, value: 8.57 },
];

// Human Development Index, 2021–2024. Source: BPS.
export const HDI = [
  { year: 2021, value: 72.29 }, { year: 2022, value: 73.37 },
  { year: 2023, value: 74.39 }, { year: 2024, value: 75.02 },
];

// Age structure, % of population, 2024. Source: World Bank WDI.
export const AGE_STRUCTURE = [
  { group: 'Ages 0–14', value: 24.6 },
  { group: 'Ages 15–64', value: 68.1 },
  { group: 'Ages 65+', value: 7.3 },
];

// Share of population by island group, 2020 Population Census. Source: BPS.
export const ISLAND_SHARE = [
  { island: 'Java', value: 56.10 },
  { island: 'Sumatra', value: 21.68 },
  { island: 'Sulawesi', value: 7.36 },
  { island: 'Kalimantan', value: 6.09 },
  { island: 'Bali & Nusa Tenggara', value: 5.56 },
  { island: 'Maluku & Papua', value: 3.21 },
];

// Ten most populous provinces, 2020 Population Census. Source: BPS.
// Density is persons per km² from the same census.
export const PROVINCES = [
  { name: 'West Java', capital: 'Bandung', population: 48274162, density: 1300, island: 'Java' },
  { name: 'East Java', capital: 'Surabaya', population: 40665696, density: 851, island: 'Java' },
  { name: 'Central Java', capital: 'Semarang', population: 36516035, density: 1113, island: 'Java' },
  { name: 'North Sumatra', capital: 'Medan', population: 14799361, density: 203, island: 'Sumatra' },
  { name: 'Banten', capital: 'Serang', population: 11904562, density: 1232, island: 'Java' },
  { name: 'Jakarta', capital: 'Jakarta', population: 10562088, density: 16022, island: 'Java' },
  { name: 'South Sulawesi', capital: 'Makassar', population: 9073509, density: 163, island: 'Sulawesi' },
  { name: 'Lampung', capital: 'Bandar Lampung', population: 9008352, density: 192, island: 'Sumatra' },
  { name: 'South Sumatra', capital: 'Palembang', population: 8467432, density: 92, island: 'Sumatra' },
  { name: 'Riau', capital: 'Pekanbaru', population: 6394087, density: 73, island: 'Sumatra' },
];

// Indonesia against the world, 2024. Source: World Bank WDI / IMF WEO.
export const WORLD_COMPARE = [
  { indicator: 'Population', indonesia: '283.5 million', world: '8.14 billion', source: 'World Bank WDI, 2024' },
  { indicator: 'GDP per capita (PPP)', indonesia: '$16,472', world: '$21,393', source: 'World Bank WDI, 2024' },
  { indicator: 'Life expectancy at birth', indonesia: '71.3 years', world: '73.5 years', source: 'World Bank WDI, 2024' },
  { indicator: 'CO₂ emissions per person', indonesia: '2.9 tonnes', world: '4.7 tonnes', source: 'World Bank WDI, 2024' },
  { indicator: 'Urban population', indonesia: '58.8%', world: '58.0%', source: 'World Bank WDI, 2024' },
  { indicator: 'Internet users', indonesia: '72.8%', world: '68.0%', source: 'World Bank WDI, 2024' },
];

// Trade and finance, 2024. Sources: World Bank WDI, IMF WEO, BPS.
export const TRADE = [
  { label: 'Exports of goods and services', value: '22.2% of GDP', source: 'World Bank WDI, 2024' },
  { label: 'Imports of goods and services', value: '20.4% of GDP', source: 'World Bank WDI, 2024' },
  { label: 'Foreign direct investment, net inflows', value: '$24.2 billion', source: 'World Bank WDI, 2024' },
  { label: 'General government gross debt', value: '37.7% of GDP', source: 'IMF WEO, 2024' },
  { label: 'GDP in rupiah', value: 'Rp 22,501 trillion', source: 'World Bank WDI, 2024' },
  { label: 'Exchange rate, average', value: 'Rp 15,855 per US$', source: 'World Bank WDI, 2024' },
];

// Short "year in review" notes, one per year, each tied to a published figure.
export const YEAR_NOTES = {
  2015: 'Growth 4.88% as commodity prices fell; inflation 3.35% (December, yoy).',
  2016: 'Growth 5.03%; unemployment eased to 5.61% in August.',
  2017: 'Growth 5.07%; inflation 3.61% at year end.',
  2018: 'Growth 5.17%, the fastest of the decade so far; unemployment 5.34%.',
  2019: 'Growth 5.02%; poverty fell to 9.22% in September.',
  2020: 'Pandemic year: GDP shrank 2.07%, unemployment jumped to 7.07%, poverty to 10.19%.',
  2021: 'Recovery began: growth 3.70%; unemployment 6.49%.',
  2022: 'Strong rebound: growth 5.31%, but inflation spiked to 5.51% in December.',
  2023: 'Growth 5.05%; inflation cooled to 2.61%; poverty 9.36%.',
  2024: 'Growth 5.03%; inflation 1.57%; unemployment 4.91%; poverty 8.57% — all four at their best readings of the decade.',
};

// Every source the site cites, for the Sources page.
export const SOURCES = [
  { publisher: 'Statistics Indonesia (BPS)', what: 'Real GDP growth; CPI inflation (December yoy); open unemployment rate (August); poverty rate (September); Human Development Index; 2020 Population Census by province and island', years: '2015–2024', site: 'bps.go.id' },
  { publisher: 'World Bank — World Development Indicators', what: 'Population; GDP (current US$); GDP per capita; GDP per capita (PPP); age structure; urban population; internet users; life expectancy; CO₂ per person; exports, imports and FDI as % of GDP; GDP in rupiah; exchange rate', years: '2015–2025', site: 'data.worldbank.org' },
  { publisher: 'IMF — World Economic Outlook', what: 'General government gross debt as % of GDP', years: '2024', site: 'imf.org' },
];
