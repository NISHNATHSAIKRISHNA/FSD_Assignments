import { useEffect, useRef, useState } from 'react';

const BENCH_MS = 5000; // auto-scroll duration

// Scrolls the table from top to bottom at constant speed and records
// the time between animation frames.
function runScrollBenchmark(el, onDone) {
  const maxScroll = el.scrollHeight - el.clientHeight;
  const deltas = [];
  let start = null;
  let last = null;
  el.scrollTop = 0;

  function step(ts) {
    if (start === null) start = ts;
    if (last !== null) deltas.push(ts - last);
    last = ts;
    const progress = Math.min((ts - start) / BENCH_MS, 1);
    el.scrollTop = progress * maxScroll;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      const total = deltas.reduce((a, b) => a + b, 0);
      const sorted = [...deltas].sort((a, b) => a - b);
      onDone({
        frames: deltas.length,
        avgFps: (1000 / (total / deltas.length)).toFixed(1),
        worstFrameMs: Math.max(...deltas).toFixed(1),
        p95FrameMs: sorted[Math.floor(sorted.length * 0.95)].toFixed(1),
        droppedFrames: deltas.filter((d) => d > 25).length, // > 25 ms (60 Hz screen)
      });
    }
  }
  requestAnimationFrame(step);
}

export default function MetricsPanel({ mode, totalRows, renderMs, scrollRef }) {
  const [dom, setDom] = useState({ nodes: 0, rows: 0 });
  const [heapMB, setHeapMB] = useState(null);
  const [liveFps, setLiveFps] = useState(0);
  const [bench, setBench] = useState(null);
  const [running, setRunning] = useState(false);
  const frames = useRef(0);

  // DOM node count + JS heap, refreshed every second
  useEffect(() => {
    const update = () => {
      setDom({
        nodes: document.getElementsByTagName('*').length,
        rows: document.querySelectorAll('.row:not(.header)').length,
      });
      if (performance.memory) {
        setHeapMB((performance.memory.usedJSHeapSize / 1048576).toFixed(1));
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Live FPS counter
  useEffect(() => {
    let raf;
    const tick = () => {
      frames.current++;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const id = setInterval(() => {
      setLiveFps(frames.current);
      frames.current = 0;
    }, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  const startBench = () => {
    if (!scrollRef.current || running) return;
    setRunning(true);
    setBench(null);
    runScrollBenchmark(scrollRef.current, (result) => {
      setBench(result);
      setRunning(false);
    });
  };

  const labels = { normal: 'Normal (no virtualization)', window: 'react-window', tanstack: 'TanStack Virtual' };

  return (
    <div className="metrics">
      <h2>
        Mode: {labels[mode]} &nbsp;|&nbsp; Total rows: {totalRows.toLocaleString()}
      </h2>
      <div className="grid">
        <div className="m"><span>Total DOM nodes</span><b>{dom.nodes.toLocaleString()}</b></div>
        <div className="m"><span>Rows in DOM</span><b>{dom.rows.toLocaleString()}</b></div>
        <div className="m"><span>Initial render time</span><b>{renderMs === null ? '...' : `${renderMs.toFixed(0)} ms`}</b></div>
        <div className="m"><span>JS heap used</span><b>{heapMB === null ? 'n/a (use Chrome)' : `${heapMB} MB`}</b></div>
        <div className="m"><span>Live FPS</span><b>{liveFps}</b></div>
      </div>
      <div className="bench">
        <button onClick={startBench} disabled={running}>
          {running ? 'Scrolling... (5 s)' : 'Run 5-second auto-scroll benchmark'}
        </button>
        {bench && (
          <span className="result">
            Avg FPS: <b>{bench.avgFps}</b> | Worst frame: <b>{bench.worstFrameMs} ms</b> | 95th pct frame:{' '}
            <b>{bench.p95FrameMs} ms</b> | Dropped frames (&gt;25 ms): <b>{bench.droppedFrames}</b> / {bench.frames}
          </span>
        )}
      </div>
    </div>
  );
}
