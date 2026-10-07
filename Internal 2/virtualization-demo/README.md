# React List Virtualization Demo (50,000 rows)

Compares three ways of rendering the same 50,000-row table:

| URL | Version |
|-----|---------|
| `/?mode=normal`   | Normal - all rows in the DOM |
| `/?mode=window`   | react-window (FixedSizeList) |
| `/?mode=tanstack` | TanStack Virtual (useVirtualizer) |

## Run
```bash
npm install
npm run dev          # quick look  -> http://localhost:5173
# For FINAL measurements use the production build:
npm run build
npm run preview      # -> http://localhost:4173
```

Add `&rows=10000` to the URL if your laptop struggles with the normal version
(use the same row count for all three tests).

Built-in metrics panel: DOM nodes, rows in DOM, initial render time, JS heap,
live FPS and a 5-second auto-scroll benchmark (avg FPS, worst frame, dropped frames).
