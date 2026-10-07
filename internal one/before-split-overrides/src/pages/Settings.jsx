import { useState } from "react";
import RichNoteEditor from "../components/RichNoteEditor";

export default function Settings() {
  const [editBio, setEditBio] = useState(false);
  return (
    <>
      <h1>Settings</h1>
      <label>Display name <input defaultValue="Student" /></label>
      <h3>Bio</h3>
      {editBio ? (
        <RichNoteEditor initial="<p>Tell us about yourself</p>" />
      ) : (
        <button onClick={() => setEditBio(true)}>Edit bio</button>
      )}
    </>
  );
}
