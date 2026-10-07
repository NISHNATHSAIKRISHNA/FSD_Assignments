import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichNoteEditor({ initial = "<p>Write here…</p>" }) {
  const editor = useEditor({ extensions: [StarterKit], content: initial });
  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <button onClick={() => editor?.chain().focus().toggleBold().run()}>Bold</button>{" "}
        <button onClick={() => editor?.chain().focus().toggleBulletList().run()}>List</button>
      </div>
      <EditorContent editor={editor} className="editor" />
    </div>
  );
}
