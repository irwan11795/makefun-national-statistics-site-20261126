// Statistik Nusantara — router and controls.
// Hash routes: #/ (overview), #/economy, #/people, #/regions, #/prices,
// #/compare, #/sources. Every control on every page does what it says:
// the year picker re-highlights every chart on the Prices page, the chart
// toggle re-draws the GDP chart, table headers sort, the province search
// filters, the province picker compares, and the CSV button downloads the
// site's own data. No network is used anywhere.

import {
  GDP_GROWTH, GDP_NOMINAL, INFLATION, UNEMPLOYMENT, POVERTY, PROVINCES,
} from './data.js';
import {
  viewOverview, viewEconomy, viewPeople, viewRegions, viewPrices,
  viewCompare, viewSources,
} from './views.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('[data-route]')];

const state = { economyChart: 'line', pricesYear: 2024 };

const ROUTES = {
  '': viewOverview,
  economy: () => viewEconomy(state.economyChart),
  people: viewPeople,
  regions: viewRegions,
  prices: () => viewPrices(state.pricesYear),
  compare: viewCompare,
  sources: viewSources,
};

function currentRoute() {
  const hash = location.hash.replace(/^#\/?/, '');
  return ROUTES[hash] ? hash : '';
}

function render() {
  const route = currentRoute();
  app.innerHTML = ROUTES[route]();
  navLinks.forEach((a) => {
    const r = a.getAttribute('data-route');
    if (r === route) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  wireControls(route);
  window.scrollTo(0, 0);
}

function sortTable(table, colIndex, key) {
  const tbody = table.querySelector('tbody');
  const rows = [...tbody.querySelectorAll('tr')];
  const dir = table.dataset.sortDir === 'asc' && Number(table.dataset.sortCol) === colIndex ? 'desc' : 'asc';
  table.dataset.sortDir = dir;
  table.dataset.sortCol = String(colIndex);
  const num = (cell) => {
    const t = cell.textContent.replace(/[,%]/g, '').trim();
    const n = Number(t);
    return Number.isFinite(n) ? n : null;
  };
  rows.sort((a, b) => {
    const ca = a.children[colIndex];
    const cb = b.children[colIndex];
    const na = num(ca);
    const nb = num(cb);
    const cmp = na !== null && nb !== null ? na - nb : ca.textContent.localeCompare(cb.textContent);
    return dir === 'asc' ? cmp : -cmp;
  });
  for (const r of rows) tbody.appendChild(r);
}

function wireSortable(scope) {
  for (const table of scope.querySelectorAll('table.sortable')) {
    table.querySelectorAll('th[data-sort]').forEach((th, i) => {
      th.addEventListener('click', () => {
        const colIndex = [...th.parentElement.children].indexOf(th);
        sortTable(table, colIndex, th.dataset.sort);
      });
    });
  }
}

function renderCompare() {
  const aSel = document.getElementById('cmp-a');
  const bSel = document.getElementById('cmp-b');
  const out = document.getElementById('cmp-table');
  const res = document.getElementById('cmp-result');
  if (!aSel || !bSel || !out) return;
  const a = PROVINCES.find((p) => p.name === aSel.value);
  const b = PROVINCES.find((p) => p.name === bSel.value);
  if (!a || !b) return;
  const ratio = a.population / b.population;
  const bigger = ratio >= 1 ? a.name : b.name;
  const times = (ratio >= 1 ? ratio : 1 / ratio).toFixed(2);
  const top10Total = PROVINCES.reduce((s, p) => s + p.population, 0);
  out.innerHTML = `<table class="facts wide"><thead><tr><th></th><th>${a.name}</th><th>${b.name}</th></tr></thead><tbody>
    <tr><th>Capital</th><td>${a.capital}</td><td>${b.capital}</td></tr>
    <tr><th>Island</th><td>${a.island}</td><td>${b.island}</td></tr>
    <tr><th>Population (2020 census)</th><td class="num">${a.population.toLocaleString('en-US')}</td><td class="num">${b.population.toLocaleString('en-US')}</td></tr>
    <tr><th>Density (people/km²)</th><td class="num">${a.density.toLocaleString('en-US')}</td><td class="num">${b.density.toLocaleString('en-US')}</td></tr>
    <tr><th>Share of the top 10</th><td class="num">${((a.population / top10Total) * 100).toFixed(1)}%</td><td class="num">${((b.population / top10Total) * 100).toFixed(1)}%</td></tr>
    </tbody></table>`;
  res.textContent = a.name === b.name
    ? 'Pick two different provinces to compare them.'
    : `${bigger} has ${times}× the population of ${ratio >= 1 ? b.name : a.name}.`;
}

function downloadCsv() {
  const lines = ['indicator,year,value,source'];
  const add = (label, series, source) => {
    for (const d of series) lines.push(`"${label}",${d.year},${d.value},"${source}"`);
  };
  add('Real GDP growth (%)', GDP_GROWTH, 'BPS / World Bank WDI');
  add('GDP nominal (US$ billion)', GDP_NOMINAL, 'World Bank WDI');
  add('Inflation Dec yoy (%)', INFLATION, 'BPS');
  add('Open unemployment Aug (%)', UNEMPLOYMENT, 'BPS');
  add('Poverty rate Sep (%)', POVERTY, 'BPS');
  for (const p of PROVINCES) {
    lines.push(`"Population ${p.name}",2020,${p.population},"BPS 2020 Census"`);
  }
  const blob = new Blob([`${lines.join('\n')}\n`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'indonesia-statistics.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  const status = document.getElementById('csv-status');
  if (status) status.textContent = `Downloaded ${lines.length - 1} rows as indonesia-statistics.csv.`;
}

function wireControls(route) {
  wireSortable(app);
  if (route === 'economy') {
    for (const btn of app.querySelectorAll('[data-chart]')) {
      btn.addEventListener('click', () => {
        state.economyChart = btn.dataset.chart;
        render();
      });
    }
  }
  if (route === 'regions') {
    const input = document.getElementById('province-search');
    const table = document.getElementById('province-table');
    const count = document.getElementById('province-count');
    if (input && table) {
      input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        let shown = 0;
        for (const row of table.querySelectorAll('tbody tr')) {
          const hit = !q || row.dataset.name.includes(q)
            || row.textContent.toLowerCase().includes(q);
          row.style.display = hit ? '' : 'none';
          if (hit) shown += 1;
        }
        if (count) count.textContent = `Showing ${shown} of 10 provinces.`;
      });
    }
  }
  if (route === 'prices') {
    const select = document.getElementById('year-select');
    if (select) {
      select.addEventListener('change', () => {
        state.pricesYear = Number(select.value);
        render();
      });
    }
  }
  if (route === 'compare') {
    renderCompare();
    for (const id of ['cmp-a', 'cmp-b']) {
      const sel = document.getElementById(id);
      if (sel) sel.addEventListener('change', renderCompare);
    }
  }
  if (route === 'sources') {
    const btn = document.getElementById('csv-download');
    if (btn) btn.addEventListener('click', downloadCsv);
  }
}

window.addEventListener('hashchange', render);
render();
