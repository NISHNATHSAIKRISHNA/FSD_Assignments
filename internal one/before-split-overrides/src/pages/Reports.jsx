import { useState } from "react";
import RevenueChart from "../components/RevenueChart";
import RichNoteEditor from "../components/RichNoteEditor";

export default function Reports() {
  const [editing, setEditing] = useState(false);
  return (
    <>
      <h1>Reports</h1>
      <RevenueChart />
      <button style={{ marginTop: 16 }} onClick={() => setEditing(true)}>Add note</button>
      {editing && <RichNoteEditor />}
    </>
  );
}
