import { component$, $ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { NoteEditor } from "~/components/NoteEditor";
import { useNotes, getNotesActions } from "~/lib/store";

/**
 * PUBLIC_INTERFACE
 * EditNotePage
 * Edit a note by id using the NoteEditor component.
 */
export default component$(() => {
  const loc = useLocation();
  const nav = useNavigate();
  const noteId = loc.params["id"];
  const { state } = useNotes();

  const note = state.notes.find((n) => n.id === noteId);
  const initial = note
    ? { title: note.title, content: note.content }
    : { title: `Sample title for #${noteId}`, content: `Sample content for #${noteId}` };

  return (
    <NoteEditor
      initial={initial}
      onCancelHref={`/notes/${noteId}`}
      onSave$={$(async (value) => {
        await getNotesActions().updateNote({ id: noteId, title: value.title, content: value.content });
        // Navigate back to the note after save; banner will show from store
        nav(`/notes/${noteId}`);
      })}
      submitLabel="Save Changes"
    />
  );
});

export const head: DocumentHead = {
  title: "Edit Note • Qwik Notes",
  meta: [{ name: "description", content: "Edit note" }],
};
