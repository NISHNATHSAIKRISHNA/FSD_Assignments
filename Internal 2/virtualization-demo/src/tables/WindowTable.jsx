import { FixedSizeList } from 'react-window';
import Row, { HeaderRow, ROW_HEIGHT, TABLE_HEIGHT } from './Row.jsx';

// Defined outside the component so React does not re-mount rows on re-render.
const Item = ({ index, style, data }) => <Row row={data[index]} style={style} />;

// OPTIMISED #1: react-window renders only the rows inside the viewport
// (+ a small overscan buffer).
export default function WindowTable({ rows, scrollRef }) {
  return (
    <div className="table-wrap">
      <HeaderRow />
      <FixedSizeList
        height={TABLE_HEIGHT}
        width="100%"
        itemCount={rows.length}
        itemSize={ROW_HEIGHT}
        itemData={rows}
        overscanCount={5}
        outerRef={scrollRef}
        className="scroller"
      >
        {Item}
      </FixedSizeList>
    </div>
  );
}
