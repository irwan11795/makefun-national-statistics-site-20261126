// Statistik Nusantara — chart builders.
// Every chart is plain SVG drawn from the data in data.js: no images, no
// libraries, no network. Each builder takes {points, ...} and returns an SVG
// string with labelled axes, so the numbers stay readable in a screenshot.

const INK = '#12333a';
const MUTED = '#5d7076';
const GRID = '#dbe4e4';
const TEAL = '#0e7c7b';
const AMBER = '#e8a13a';
const RED = '#c0392b';
const BLUE = '#2f6fb2';
const GREEN = '#3d8b4f';

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function niceStep(raw) {
  if (raw <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(raw));
  const n = raw / p;
  const m = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return m * p;
}

function fmtTick(v, decimals) {
  if (Math.abs(v) >= 1000) return String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return v.toFixed(decimals ?? (Number.isInteger(v) ? 0 : 1));
}

// Line chart with a zero line, labelled years and values on hover points.
// points: [{year, value}], opts: {width, height, unit, decimals, color, highlightYear}
export function lineChart(points, opts = {}) {
  const w = opts.width ?? 640;
  const h = opts.height ?? 300;
  const padL = 52;
  const padR = 14;
  const padT = 18;
  const padB = 34;
  const values = points.map((p) => p.value);
  const vMin = Math.min(...values);
  const vMax = Math.max(...values);
  // Line charts use a padded data range (zero is kept when the data cross
  // it), so small movements stay visible instead of flattening on a 0–max
  // axis. Bar charts below keep the zero baseline.
  const pad = (vMax - vMin) * 0.08 || 0.5;
  const step = niceStep((vMax - vMin) / 4);
  const bottom = vMin < 0
    ? Math.floor((vMin - pad) / step) * step
    : Math.max(0, Math.floor((vMin - pad) / step) * step);
  const top = Math.ceil((vMax + pad * 0.5) / step) * step;
  const range = top - bottom || 1;
  const x = (i) => padL + ((w - padL - padR) * i) / (points.length - 1);
  const y = (v) => padT + ((top - v) / range) * (h - padT - padB);
  const ticks = [];
  for (let t = bottom; t <= top + 1e-9; t += step) ticks.push(t);
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const area = `${path} L${x(points.length - 1).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`;
  const dots = points
    .map((p, i) => {
      const hl = opts.highlightYear === p.year;
      return `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="${hl ? 6 : 3.5}" fill="${p.value < 0 ? RED : opts.color ?? TEAL}" stroke="#fff" stroke-width="1.5"/>`
        + `<text x="${x(i).toFixed(1)}" y="${(y(p.value) - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="${hl ? 700 : 400}" fill="${INK}">${esc(fmtTick(p.value, opts.decimals))}${opts.unit ?? ''}</text>`;
    })
    .join('');
  const labels = points
    .map((p, i) => `<text x="${x(i).toFixed(1)}" y="${h - 10}" text-anchor="middle" font-size="11" fill="${MUTED}">${p.year}</text>`)
    .join('');
  const grid = ticks
    .map((t) => `<line x1="${padL}" y1="${y(t).toFixed(1)}" x2="${w - padR}" y2="${y(t).toFixed(1)}" stroke="${t === 0 ? '#9fb3b3' : GRID}" stroke-width="${t === 0 ? 1.5 : 1}"/>`
      + `<text x="${padL - 8}" y="${(y(t) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="${MUTED}">${esc(fmtTick(t, opts.decimals))}</text>`)
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Line chart, ${esc(opts.title ?? 'values by year')}">`
    + grid
    + `<path d="${area}" fill="${opts.color ?? TEAL}" opacity="0.08"/>`
    + `<path d="${path}" fill="none" stroke="${opts.color ?? TEAL}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`
    + dots + labels + '</svg>';
}

// Vertical bar chart. points: [{year, value}] or [{label, value}].
export function barChart(points, opts = {}) {
  const w = opts.width ?? 640;
  const h = opts.height ?? 300;
  const padL = 52;
  const padR = 14;
  const padT = 26;
  const padB = 34;
  const values = points.map((p) => p.value);
  const hi = Math.max(...values);
  const lo = Math.min(0, ...values);
  // Bars keep the zero baseline: the scale is a nice step over the range.
  const step = niceStep((hi - lo) / 4);
  const top = Math.ceil(hi / step) * step;
  const bottom = lo < 0 ? Math.floor(lo / step) * step : 0;
  const range = top - bottom || 1;
  const slot = (w - padL - padR) / points.length;
  const bw = Math.min(44, slot * 0.62);
  const y = (v) => padT + ((top - v) / range) * (h - padT - padB);
  const ticks = [];
  for (let t = bottom; t <= top + 1e-9; t += step) ticks.push(t);
  const grid = ticks
    .map((t) => `<line x1="${padL}" y1="${y(t).toFixed(1)}" x2="${w - padR}" y2="${y(t).toFixed(1)}" stroke="${t === 0 ? '#9fb3b3' : GRID}" stroke-width="${t === 0 ? 1.5 : 1}"/>`
      + `<text x="${padL - 8}" y="${(y(t) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="${MUTED}">${esc(fmtTick(t, opts.decimals))}</text>`)
    .join('');
  const bars = points
    .map((p, i) => {
      const cx = padL + slot * i + slot / 2;
      const v = p.value;
      const yTop = y(Math.max(v, 0));
      const yBot = y(Math.min(v, 0));
      const hl = opts.highlightYear === p.year;
      const color = v < 0 ? RED : (opts.color ?? TEAL);
      const label = p.year ?? p.label;
      return `<rect x="${(cx - bw / 2).toFixed(1)}" y="${yTop.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1, yBot - yTop).toFixed(1)}" rx="3" fill="${color}" opacity="${hl ? 1 : 0.88}"/>`
        + `<text x="${cx.toFixed(1)}" y="${(yTop - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="${hl ? 700 : 400}" fill="${INK}">${esc(fmtTick(v, opts.decimals))}${opts.unit ?? ''}</text>`
        + `<text x="${cx.toFixed(1)}" y="${h - 10}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(label)}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Bar chart, ${esc(opts.title ?? 'values by year')}">`
    + grid + bars + '</svg>';
}

// Horizontal bar chart for ranked lists. rows: [{label, value, note}].
export function hbarChart(rows, opts = {}) {
  const w = opts.width ?? 640;
  const rowH = opts.rowHeight ?? 34;
  const padL = opts.labelWidth ?? 150;
  const padR = 78;
  const h = rowH * rows.length + 14;
  const max = Math.max(...rows.map((r) => r.value));
  const bars = rows
    .map((r, i) => {
      const y = 7 + i * rowH;
      const bw = ((w - padL - padR) * r.value) / max;
      const hl = opts.highlight === r.label;
      return `<text x="${padL - 10}" y="${y + 15}" text-anchor="end" font-size="12.5" font-weight="${hl ? 700 : 400}" fill="${INK}">${esc(r.label)}</text>`
        + `<rect x="${padL}" y="${y}" width="${Math.max(2, bw).toFixed(1)}" height="20" rx="3" fill="${opts.color ?? TEAL}" opacity="${hl ? 1 : 0.88}"/>`
        + `<text x="${(padL + bw + 8).toFixed(1)}" y="${y + 15}" font-size="12.5" font-weight="600" fill="${INK}">${esc(opts.format ? opts.format(r.value) : fmtTick(r.value))}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Ranked bar chart, ${esc(opts.title ?? 'ranked values')}">${bars}</svg>`;
}

// Donut chart with a centre label. parts: [{label, value, color}].
export function donutChart(parts, opts = {}) {
  const size = opts.size ?? 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const inner = r - 34;
  const total = parts.reduce((s, p) => s + p.value, 0);
  const colors = [TEAL, AMBER, BLUE, GREEN, '#7a5fb0', '#b05f7a'];
  let a0 = -Math.PI / 2;
  const arcs = parts
    .map((p, i) => {
      const frac = p.value / total;
      const a1 = a0 + frac * Math.PI * 2;
      const large = frac > 0.5 ? 1 : 0;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const xi1 = cx + inner * Math.cos(a1);
      const yi1 = cy + inner * Math.sin(a1);
      const xi0 = cx + inner * Math.cos(a0);
      const yi0 = cy + inner * Math.sin(a0);
      const d = `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${inner},${inner} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z`;
      a0 = a1;
      return `<path d="${d}" fill="${p.color ?? colors[i % colors.length]}"/>`;
    })
    .join('');
  const legend = parts
    .map((p, i) => `<div class="legend-row"><span class="swatch" style="background:${p.color ?? colors[i % colors.length]}"></span><span>${esc(p.label)}</span><strong>${p.value.toFixed(2)}%</strong></div>`)
    .join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Donut chart, ${esc(opts.title ?? 'shares')}">${arcs}`
    + `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="700" fill="${INK}">${esc(opts.centre ?? '')}</text>`
    + `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(opts.centreSub ?? '')}</text></svg>`
    + `<div class="legend">${legend}</div></div>`;
}

export const CHART_COLORS = { teal: TEAL, amber: AMBER, red: RED, blue: BLUE, green: GREEN, ink: INK, muted: MUTED };
