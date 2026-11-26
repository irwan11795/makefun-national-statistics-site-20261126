# Statistik Nusantara — Indonesia in Numbers

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/irwan11795/makefun-national-statistics-site-20261126/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/irwan11795/makefun-national-statistics-site-20261126/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

A national statistics site for Indonesia: population, GDP, inflation, unemployment, poverty and regions — real figures, each with its source and year. Entry for the [Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539) bounty on make.fun.

## Run

Serve the site locally, then open http://localhost:8080:

```sh
node serve.ts
```

Or hand it in exactly as the grader does (writes `out/`):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Layout

- `main.ts` — the entrypoint: copies `app/` and `screenshots/` to `/output` and writes `/output/dossier.json` with the vendored make.fun library.
- `app/index.html` — the site shell: header, navigation, footer.
- `app/style.css` — the whole design system (system fonts only, nothing loaded from the network).
- `app/data.js` — every dataset on the site, each labelled with source and year (World Bank WDI, Statistics Indonesia / BPS, IMF WEO).
- `app/charts.js` — SVG chart builders (line, bar, horizontal bar, donut) that draw from the data.
- `app/views.js` — one renderer per page: Overview, Economy, People, Regions, Prices & jobs, Compare, Sources & data.
- `app/main.js` — the hash router and every control: year picker, chart toggle, table sorting, province search, province comparison, CSV download.
- `screenshots/` — 3 desktop + 1 phone render of the site's own code, taken in a browser.
- `shots.json` — which view each screenshot shows.
- `vendor/makefun-frontend.ts` — the kit's library, unchanged.
- `serve.ts` — a tiny static server for local testing (Node standard library only).

## Data

Every number on the site is a published figure, checked 26 November 2026:

- Statistics Indonesia (BPS): real GDP growth, CPI inflation (December year-on-year), open unemployment (August), poverty rate (September), Human Development Index, 2020 Population Census by province and island.
- World Bank, World Development Indicators: population, GDP, GDP per capita, age structure, urban population, internet users, life expectancy, trade and finance.
- IMF, World Economic Outlook: general government gross debt.

Headline figures (2024): population 283.5 million · GDP $1.40 trillion · GDP per capita $4,925 · real GDP growth 5.03% · inflation 1.57% · unemployment 4.91% · poverty 8.57% · life expectancy 71.3 years.

## License

MIT — see `LICENSE`.
