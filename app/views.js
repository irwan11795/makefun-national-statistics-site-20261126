// Statistik Nusantara — page views.
// Each view is a function of the data in data.js and returns HTML. Charts come
// from charts.js. No view fetches anything: every number on screen is in data.js.

import {
  META, HEADLINE, GDP_GROWTH, GDP_NOMINAL, GDP_PER_CAPITA, POPULATION,
  INFLATION, UNEMPLOYMENT, POVERTY, HDI, AGE_STRUCTURE, ISLAND_SHARE,
  PROVINCES, WORLD_COMPARE, TRADE, YEAR_NOTES, SOURCES,
} from './data.js';
import { lineChart, barChart, hbarChart, donutChart } from './charts.js';

function kpiCards() {
  return `<section class="kpis" aria-label="Key indicators">`
    + HEADLINE.map((k) => `<article class="kpi"><p class="kpi-label">${k.label}</p>`
      + `<p class="kpi-value">${k.value}</p><p class="kpi-sub">${k.sub}</p>`
      + `<p class="kpi-note">${k.note}</p></article>`).join('')
    + '</section>';
}

function sourceLine(text) {
  return `<p class="source">Source: ${text}</p>`;
}

function pageHead(eyebrow, title, intro) {
  return `<p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="lede">${intro}</p>`;
}

// ---- Overview -------------------------------------------------------------
export function viewOverview() {
  const growth = lineChart(GDP_GROWTH, { title: 'Real GDP growth 2015–2024', unit: '%', decimals: 2 });
  const pop = barChart(POPULATION, { title: 'Population 2020–2025', decimals: 1 });
  const islands = donutChart(
    ISLAND_SHARE.map((p) => ({ label: p.island, value: p.value })),
    { title: 'Population share by island, 2020 census', centre: '56.1%', centreSub: 'live on Java' },
  );
  return pageHead('Indonesia · Overview', 'Indonesia in numbers',
    'The headline statistics of the world’s fourth most populous country and Southeast Asia’s largest economy — every figure with its source and year.')
    + kpiCards()
    + `<div class="grid-2">
      <section class="card"><h2>Real GDP growth, 2015–2024</h2>
        <p class="card-sub">Annual % change, constant prices. The 2020 pandemic contraction is the only negative year in the decade.</p>
        ${growth}${sourceLine('BPS (Statistics Indonesia) and World Bank WDI, 2015–2024.')}</section>
      <section class="card"><h2>Population, 2020–2025</h2>
        <p class="card-sub">Millions of people. Growth has slowed to about 0.8% a year.</p>
        ${pop}${sourceLine('World Bank World Development Indicators, 2020–2025.')}</section>
    </div>
    <div class="grid-2">
      <section class="card"><h2>Where Indonesians live</h2>
        <p class="card-sub">Share of the population by island group — Java holds more than half the country on less than 7% of its land.</p>
        ${islands}${sourceLine('BPS, 2020 Population Census.')}</section>
      <section class="card"><h2>At a glance</h2>
        <table class="facts"><tbody>
          <tr><th>Capital</th><td>${META.capital}</td></tr>
          <tr><th>Currency</th><td>${META.currency}</td></tr>
          <tr><th>Official language</th><td>${META.language}</td></tr>
          <tr><th>Land area</th><td>1,904,569 km²</td></tr>
          <tr><th>GDP (PPP)</th><td>$4.66 trillion, 2024 · World Bank WDI</td></tr>
          <tr><th>GDP per capita (PPP)</th><td>$16,472, 2024 · World Bank WDI</td></tr>
          <tr><th>Human Development Index</th><td>75.02, 2024 · BPS</td></tr>
          <tr><th>Urban population</th><td>58.8%, 2024 · World Bank WDI</td></tr>
        </tbody></table>
        <p class="card-links">Dig deeper: <a href="#/economy">Economy</a> · <a href="#/people">People</a> · <a href="#/regions">Regions</a> · <a href="#/prices">Prices &amp; jobs</a></p>
      </section>
    </div>`;
}

// ---- Economy ---------------------------------------------------------------
export function viewEconomy(chartType) {
  const type = chartType === 'bar' ? 'bar' : 'line';
  const gdpChart = type === 'bar'
    ? barChart(GDP_NOMINAL, { title: 'GDP, nominal, 2015–2024', decimals: 0 })
    : lineChart(GDP_NOMINAL, { title: 'GDP, nominal, 2015–2024', decimals: 0 });
  const perCapita = lineChart(GDP_PER_CAPITA, { title: 'GDP per capita, 2015–2024', decimals: 0 });
  const toggle = `<div class="controls" role="group" aria-label="Chart type">
      <span class="controls-label">GDP chart:</span>
      <button type="button" data-chart="line" aria-pressed="${type === 'line'}" class="chip${type === 'line' ? ' active' : ''}">Line</button>
      <button type="button" data-chart="bar" aria-pressed="${type === 'bar'}" class="chip${type === 'bar' ? ' active' : ''}">Bars</button>
    </div>`;
  const tradeRows = TRADE.map((t) => `<tr><th>${t.label}</th><td>${t.value}</td><td class="muted">${t.source}</td></tr>`).join('');
  return pageHead('Indonesia · Economy', 'A $1.40 trillion economy',
    'GDP passed $1 trillion in 2017 and has grown about 5% a year since, except for the pandemic year 2020. Household spending drives it; exports and foreign investment add the rest.')
    + toggle
    + `<div class="grid-2">
      <section class="card"><h2>GDP, nominal, 2015–2024</h2>
        <p class="card-sub">Billions of current US dollars.</p>
        ${gdpChart}${sourceLine('World Bank World Development Indicators.')}</section>
      <section class="card"><h2>GDP per capita, 2015–2024</h2>
        <p class="card-sub">Current US dollars per person. It nearly doubled in ten years, from $3,332 to $4,925.</p>
        ${perCapita}${sourceLine('World Bank World Development Indicators.')}</section>
    </div>
    <section class="card"><h2>Trade &amp; finance, 2024</h2>
      <table class="facts wide"><thead><tr><th>Indicator</th><th>Value</th><th>Source</th></tr></thead>
      <tbody>${tradeRows}</tbody></table>
      <p class="card-sub">GDP in rupiah was Rp 22,501 trillion in 2024, at an average exchange rate of Rp 15,855 per US dollar.</p>
    </section>`;
}

// ---- People -----------------------------------------------------------------
export function viewPeople() {
  const pop = lineChart(POPULATION, { title: 'Population 2020–2025', decimals: 1 });
  const hdi = lineChart(HDI, { title: 'Human Development Index 2021–2024', decimals: 2 });
  const ages = hbarChart(AGE_STRUCTURE.map((a) => ({ label: a.group, value: a.value })),
    { title: 'Age structure 2024', format: (v) => `${v.toFixed(1)}%` });
  return pageHead('Indonesia · People', '283.5 million people',
    'A young country getting older slowly: a quarter of Indonesians are under 15, and life expectancy reached 71.3 years in 2024.')
    + `<div class="grid-2">
      <section class="card"><h2>Population, 2020–2025</h2>
        <p class="card-sub">Millions of people (World Bank estimates; the 2020 census counted 270.2 million).</p>
        ${pop}${sourceLine('World Bank World Development Indicators.')}</section>
      <section class="card"><h2>Human Development Index, 2021–2024</h2>
        <p class="card-sub">BPS index (0–100). It rose every year after the pandemic dip, reaching 75.02 in 2024.</p>
        ${hdi}${sourceLine('BPS (Statistics Indonesia).')}</section>
    </div>
    <div class="grid-2">
      <section class="card"><h2>Age structure, 2024</h2>
        <p class="card-sub">Share of the population in each age band. Two in three Indonesians are of working age (15–64).</p>
        ${ages}${sourceLine('World Bank World Development Indicators, 2024.')}</section>
      <section class="card"><h2>How people live</h2>
        <table class="facts"><tbody>
          <tr><th>Life expectancy</th><td>71.3 years (2024)</td></tr>
          <tr><th>Women / men</th><td>73.4 / 69.2 years (2024)</td></tr>
          <tr><th>Fertility rate</th><td>2.1 children per woman (2023)</td></tr>
          <tr><th>Urban population</th><td>58.8% (2024)</td></tr>
          <tr><th>Internet users</th><td>72.8% of the population (2024)</td></tr>
          <tr><th>Population density</th><td>149 people per km² (2024)</td></tr>
          <tr><th>Population growth</th><td>0.81% a year (2024)</td></tr>
        </tbody></table>
        ${sourceLine('World Bank World Development Indicators, 2023–2024.')}
      </section>
    </div>`;
}

// ---- Regions ----------------------------------------------------------------
export function viewRegions() {
  const bars = hbarChart(
    PROVINCES.map((p) => ({ label: p.name, value: p.population })),
    { title: 'Population by province, 2020 census', format: (v) => `${(v / 1e6).toFixed(1)}m` },
  );
  const rows = PROVINCES.map((p, i) => `<tr data-name="${p.name.toLowerCase()}">
      <td>${i + 1}</td><td>${p.name}</td><td>${p.capital}</td><td>${p.island}</td>
      <td class="num">${p.population.toLocaleString('en-US')}</td>
      <td class="num">${p.density.toLocaleString('en-US')}</td></tr>`).join('');
  return pageHead('Indonesia · Regions', '38 provinces, one crowded island',
    'Java holds 56.1% of Indonesians. The ten provinces below hold 195.7 million people — nearly three in four Indonesians. Search the table to find a province.')
    + `<div class="grid-2">
      <section class="card"><h2>Most populous provinces</h2>
        <p class="card-sub">Population in millions, 2020 Population Census.</p>
        ${bars}${sourceLine('BPS, 2020 Population Census.')}</section>
      <section class="card"><h2>Find a province</h2>
        <p class="card-sub">Type to filter the table. The chart on the left always shows the full top 10.</p>
        <label class="field"><span>Search provinces</span>
          <input id="province-search" type="search" placeholder="e.g. Java, Riau, Bali…" autocomplete="off"></label>
        <p class="result-count" id="province-count">Showing 10 of 10 provinces.</p>
        <table class="facts sortable" id="province-table"><thead><tr>
          <th data-sort="rank">#</th><th data-sort="name">Province ↕</th><th>Capital</th><th>Island</th>
          <th data-sort="pop" class="num">Population ↕</th><th data-sort="density" class="num">Density /km² ↕</th>
        </tr></thead><tbody>${rows}</tbody></table>
        ${sourceLine('BPS, 2020 Population Census. Density is persons per km².')}
      </section>
    </div>
    <section class="card"><h2>Jakarta is the outlier</h2>
      <p>Jakarta packs 10.6 million people into 659 km² — 16,022 people per km², twelve times the density of West Java (1,300) and more than a hundred times the national average of about 149. At the other end, North Kalimantan counted just 701,814 people in the 2020 census, the fewest of any province.</p>
      ${sourceLine('BPS, 2020 Population Census.')}
    </section>`;
}

// ---- Prices & jobs -----------------------------------------------------------
export function viewPrices(year) {
  const y = YEAR_NOTES[year] ? year : 2024;
  const infl = lineChart(INFLATION, { title: 'Inflation 2015–2024', unit: '%', decimals: 2, highlightYear: y });
  const unemp = lineChart(UNEMPLOYMENT, { title: 'Unemployment 2015–2024', unit: '%', decimals: 2, highlightYear: y });
  const pov = lineChart(POVERTY, { title: 'Poverty 2019–2024', unit: '%', decimals: 2, highlightYear: y });
  const options = Object.keys(YEAR_NOTES).map((yy) => `<option value="${yy}"${Number(yy) === y ? ' selected' : ''}>${yy}</option>`).join('');
  const note = YEAR_NOTES[y];
  const g = GDP_GROWTH.find((d) => d.year === y);
  const inf = INFLATION.find((d) => d.year === y);
  const un = UNEMPLOYMENT.find((d) => d.year === y);
  const pv = POVERTY.find((d) => d.year === y);
  return pageHead('Indonesia · Prices & jobs', 'Prices, jobs and poverty',
    'Pick a year to see it highlighted on every chart. Inflation is the December year-on-year CPI change; unemployment is the August open rate; poverty is the September rate.')
    + `<div class="controls" role="group" aria-label="Choose a year">
      <label class="controls-label" for="year-select">Year in focus:</label>
      <select id="year-select">${options}</select>
      <span class="year-note" id="year-note">${note}</span>
    </div>
    <div class="grid-2">
      <section class="card"><h2>Inflation, 2015–2024</h2>
        <p class="card-sub">Consumer prices, December year-on-year %. The 2022 spike to 5.51% followed fuel-price rises; by 2024 it was 1.57%.</p>
        ${infl}${sourceLine('BPS (Statistics Indonesia).')}</section>
      <section class="card"><h2>Unemployment, 2015–2024</h2>
        <p class="card-sub">Open unemployment rate, August %. The pandemic pushed it to 7.07% in 2020; it has fallen every year since.</p>
        ${unemp}${sourceLine('BPS (Statistics Indonesia).')}</section>
    </div>
    <div class="grid-2">
      <section class="card"><h2>Poverty, 2019–2024</h2>
        <p class="card-sub">Share of the population below the poverty line, September %. Down from 10.19% in 2020 to 8.57% in 2024.</p>
        ${pov}${sourceLine('BPS (Statistics Indonesia).')}</section>
      <section class="card"><h2>${y} in numbers</h2>
        <table class="facts"><tbody>
          <tr><th>Real GDP growth</th><td>${g.value.toFixed(2)}%</td></tr>
          <tr><th>Inflation (Dec, yoy)</th><td>${inf.value.toFixed(2)}%</td></tr>
          <tr><th>Unemployment (Aug)</th><td>${un.value.toFixed(2)}%</td></tr>
          <tr><th>Poverty (Sep)</th><td>${pv ? `${pv.value.toFixed(2)}%` : '—'}</td></tr>
        </tbody></table>
        <p class="card-sub">${note}</p>
        ${sourceLine('BPS (Statistics Indonesia). Poverty is published from 2019 in this series.')}
      </section>
    </div>`;
}

// ---- Compare -----------------------------------------------------------------
export function viewCompare() {
  const worldRows = WORLD_COMPARE.map((r) => `<tr><th>${r.indicator}</th><td>${r.indonesia}</td><td>${r.world}</td><td class="muted">${r.source}</td></tr>`).join('');
  const opts = PROVINCES.map((p) => `<option value="${p.name}">${p.name}</option>`).join('');
  const optsB = PROVINCES.map((p) => `<option value="${p.name}"${p.name === 'East Java' ? ' selected' : ''}>${p.name}</option>`).join('');
  return pageHead('Indonesia · Compare', 'Indonesia against the world',
    'Indonesia is big but still catching up: its people live slightly shorter lives than the world average and earn less per person, while emitting less CO₂ per person.')
    + `<section class="card"><h2>Indonesia vs the world, 2024</h2>
      <table class="facts wide"><thead><tr><th>Indicator</th><th>Indonesia</th><th>World</th><th>Source</th></tr></thead>
      <tbody>${worldRows}</tbody></table>
      ${sourceLine('World Bank World Development Indicators, 2024.')}
    </section>
    <section class="card"><h2>Compare two provinces</h2>
      <p class="card-sub">Pick any two of the ten most populous provinces (2020 census) and see them side by side.</p>
      <div class="controls">
        <label class="controls-label" for="cmp-a">Province A:</label>
        <select id="cmp-a">${opts}</select>
        <label class="controls-label" for="cmp-b">Province B:</label>
        <select id="cmp-b">${optsB}</select>
        <span class="result-count" id="cmp-result"></span>
      </div>
      <div id="cmp-table"></div>
      ${sourceLine('BPS, 2020 Population Census.')}
    </section>`;
}

// ---- Sources / data -----------------------------------------------------------
export function viewSources() {
  const srcRows = SOURCES.map((s) => `<tr><th>${s.publisher}</th><td>${s.what}</td><td>${s.years}</td><td>${s.site}</td></tr>`).join('');
  const rows = [];
  const push = (series, label, unit) => {
    for (const d of series) rows.push({ year: d.year, indicator: label, value: `${d.value}${unit}`, source: '' });
  };
  push(GDP_GROWTH, 'Real GDP growth', '%');
  push(GDP_NOMINAL, 'GDP, nominal (US$ bn)', '');
  push(INFLATION, 'Inflation, Dec yoy', '%');
  push(UNEMPLOYMENT, 'Open unemployment, Aug', '%');
  push(POVERTY, 'Poverty rate, Sep', '%');
  rows.sort((a, b) => b.year - a.year || a.indicator.localeCompare(b.indicator));
  const dataRows = rows.map((r) => `<tr><td>${r.year}</td><td>${r.indicator}</td><td class="num">${r.value}</td></tr>`).join('');
  return pageHead('Indonesia · Sources & data', 'Sources, methods and the data',
    'Every number on this site comes from one of the three publishers below. Nothing is estimated by this site; figures are the publishers’ own, as checked on 26 November 2026.')
    + `<section class="card"><h2>Sources</h2>
      <table class="facts wide"><thead><tr><th>Publisher</th><th>What it supplied</th><th>Years</th><th>Site</th></tr></thead>
      <tbody>${srcRows}</tbody></table>
      <p class="card-sub">BPS is Statistics Indonesia, the country’s national statistics office. World Bank figures are from the World Development Indicators database. Where two publishers differ slightly (for example GDP per capita vintages), this site uses the World Bank’s latest vintage and says so.</p>
    </section>
    <section class="card"><h2>Download the data</h2>
      <p>The full table below is also available as a CSV file, generated in your browser from the same data this site draws from — no network needed.</p>
      <button type="button" id="csv-download" class="chip big">Download all data as CSV</button>
      <span class="result-count" id="csv-status"></span>
    </section>
    <section class="card"><h2>All series in one table</h2>
      <table class="facts sortable" id="data-table"><thead><tr>
        <th data-sort="year">Year ↕</th><th>Indicator</th><th class="num" data-sort="value">Value ↕</th>
      </tr></thead><tbody>${dataRows}</tbody></table>
    </section>`;
}
