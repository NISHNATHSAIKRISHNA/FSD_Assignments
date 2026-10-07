# Code Splitting and Lazy Loading Demo (React + Vite)

Pages: Dashboard, Reports, Settings, Admin. Heavy parts: Recharts chart, TipTap editor.

## Run
npm install
npm run dev

## Reproduce BEFORE vs AFTER
1. Copy the 3 files from `before-split-overrides/src/` over `src/` (App.jsx, pages/Reports.jsx, pages/Settings.jsx).
   Commit and tag:  git add -A && git commit -m "before split" && git tag before-split
2. npm run build   -> note JS sizes printed in the terminal
   npm run analyze -> screenshot the treemap
3. Restore the lazy versions from `src/` (git checkout of the original files) and tag after-split.
4. Repeat step 2 and compare.

## Measure
Chrome DevTools -> Network: Slow 4G, CPU: 4x slowdown, Disable cache.
Run `npm run build && npm run preview`, then Lighthouse (Performance, Mobile) on http://localhost:4173
