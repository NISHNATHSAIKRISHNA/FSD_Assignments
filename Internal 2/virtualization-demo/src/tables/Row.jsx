import { memo } from 'react';

export const ROW_HEIGHT = 40;
export const TABLE_HEIGHT = 520;

// Same row markup (about 8 DOM nodes per row) is used by ALL three
// implementations, so the comparison is fair.
function Row({ row, style }) {
  return (
    <div className="row" style={style}>
      <div className="cell">{row.id}</div>
      <div className="cell">{row.name}</div>
      <div className="cell">{row.email}</div>
      <div className="cell">{row.department}</div>
      <div className="cell">{row.salary.toLocaleString('en-IN')}</div>
      <div className="cell">
        <span className={`badge ${row.status.replace(' ', '').toLowerCase()}`}>{row.status}</span>
      </div>
    </div>
  );
}

export default memo(Row);

export function HeaderRow() {
  return (
    <div className="row header">
      <div className="cell">ID</div>
      <div className="cell">Name</div>
      <div className="cell">Email</div>
      <div className="cell">Department</div>
      <div className="cell">Salary (INR)</div>
      <div className="cell">Status</div>
    </div>
  );
}
