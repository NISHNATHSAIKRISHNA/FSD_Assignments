import { lazy, Suspense, useState } from "react";

const RichNoteEditor = lazy(() => import("../components/RichNoteEditor"));

export default function Settings() {
  const [editBio, setEditBio] = useState(false);
  return (
    <>
      <h1>Settings</h1>
      <label>Display name <input defaultValue="Student" /></label>
      <h3>Bio</h3>
      {editBio ? (
        <Suspense fallback={<p>Loading editor…</p>}>
          <RichNoteEditor initial="<p>Tell us about yourself</p>" />
        </Suspense>
      ) : (
        <button onClick={() => setEditBio(true)}>Edit bio</button>
      )}
    </>
  );
}
