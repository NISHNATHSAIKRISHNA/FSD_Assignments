// AFTER SPLIT: chart loads on render (space reserved), editor loads on click
import { lazy, Suspense, useState } from "react";

const RevenueChart = lazy(() => import("../components/RevenueChart"));
const RichNoteEditor = lazy(() => import("../components/RichNoteEditor"));

export default function Reports() {
  const [editing, setEditing] = useState(false);
  return (
    <>
      <h1>Reports</h1>
      <Suspense fallback={<div className="skeleton" style={{ height: 320 }} />}>
        <RevenueChart />
      </Suspense>

      <button style={{ marginTop: 16 }} onClick={() => setEditing(true)}>Add note</button>
      {editing && (
        <Suspense fallback={<p>Loading editor…</p>}>
          <RichNoteEditor />
        </Suspense>
      )}
    </>
  );
}
