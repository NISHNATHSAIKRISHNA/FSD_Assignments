import Row, { HeaderRow, ROW_HEIGHT, TABLE_HEIGHT } from './Row.jsx';

// BASELINE: renders EVERY row into the DOM (50,000 rows = ~400,000 nodes).
export default function NormalTable({ rows, scrollRef }) {
  return (
    <div className="table-wrap">
      <HeaderRow />
      <div ref={scrollRef} className="scroller" style={{ height: TABLE_HEIGHT }}>
        {rows.map((row) => (
          <Row key={row.id} row={row} style={{ height: ROW_HEIGHT }} />
        ))}
      </div>
    </div>
  );
}
