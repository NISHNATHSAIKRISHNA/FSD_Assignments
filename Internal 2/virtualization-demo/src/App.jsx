import { useEffect, useRef, useState } from 'react';
import { generateRows } from './data.js';
import MetricsPanel from './MetricsPanel.jsx';
import NormalTable from './tables/NormalTable.jsx';
import WindowTable from './tables/WindowTable.jsx';
import TanStackTable from './tables/TanStackTable.jsx';

// Mode and row count come from the URL, so every test is a FRESH page load
// (important for fair memory measurement).
//   /?mode=normal   /?mode=window   /?mode=tanstack   (&rows=10000 to change row count)
const params = new URLSearchParams(window.location.search);
const MODE = params.get('mode');
const TOTAL_ROWS = Number(params.get('rows')) || 50000;

// Data is generated before React renders, so it is NOT part of render time.
const ROWS = MODE ? generateRows(TOTAL_ROWS) : [];

const TABLES = { normal: NormalTable, window: WindowTable, tanstack: TanStackTable };

function Home() {
  return (
    <div className="home">
      <h1>React List Virtualization - 50,000 Row Table</h1>
      <p>Open each version in a fresh load and measure it with Chrome DevTools.</p>
      <ul>
        <li><a href="/?mode=normal">1. Normal table (renders all rows)</a></li>
        <li><a href="/?mode=window">2. Virtualized with react-window</a></li>
        <li><a href="/?mode=tanstack">3. Virtualized with TanStack Virtual</a></li>
      </ul>
      <p className="hint">
        If your laptop freezes on the normal version, add <code>&amp;rows=10000</code> to the URL and use the
        same row count for all three tests.
      </p>
    </div>
  );
}

export default function App() {
  const scrollRef = useRef(null);
  const t0 = useRef(performance.now());
  const [renderMs, setRenderMs] = useState(null);

  // Time from start of first React render until the browser has painted the table
  useEffect(() => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setRenderMs(performance.now() - t0.current))
    );
  }, []);

  const Table = TABLES[MODE];
  if (!Table) return <Home />;

  return (
    <div className="app">
      <a className="back" href="/">&larr; Back</a>
      <MetricsPanel mode={MODE} totalRows={TOTAL_ROWS} renderMs={renderMs} scrollRef={scrollRef} />
      <Table rows={ROWS} scrollRef={scrollRef} />
    </div>
  );
}
