import { useVirtualizer } from '@tanstack/react-virtual';
import Row, { HeaderRow, ROW_HEIGHT, TABLE_HEIGHT } from './Row.jsx';

// OPTIMISED #2: TanStack Virtual (headless) - we control the markup,
// the library only tells us WHICH rows to render and WHERE.
export default function TanStackTable({ rows, scrollRef }) {
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 5,
  });

  return (
    <div className="table-wrap">
      <HeaderRow />
      <div ref={scrollRef} className="scroller" style={{ height: TABLE_HEIGHT }}>
        <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
          {virtualizer.getVirtualItems().map((item) => (
            <Row
              key={item.key}
              row={rows[item.index]}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: ROW_HEIGHT,
                transform: `translateY(${item.start}px)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
