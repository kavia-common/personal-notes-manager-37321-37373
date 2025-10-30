import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { NoteEditor } from "~/components/NoteEditor";

/**
 * PUBLIC_INTERFACE
 * EditNotePage
 * Edit a note by id using the NoteEditor component.
 * For now, initial values are mocked; integration will fetch real note content.
 */
export default component$(() => {
  const loc = useLocation();
  const noteId = loc.params["id"];

  // Mock initial values for demo purposes
  const initial = {
    title: `Sample title for #${noteId}`,
    content: `Sample content for #${noteId}`,
  };

  return (
    <NoteEditor
      initial={initial}
      onCancelHref={`/notes/${noteId}`}
      onSave$={async (value) => {
        // TODO: integrate with state store/API. For now, log and navigate back.
        console.info("Update note:", { id: noteId, ...value });
        location.assign(`/notes/${noteId}`);
      }}
      submitLabel="Save Changes"
    />
  );
});

export const head: DocumentHead = {
  title: "Edit Note • Qwik Notes",
  meta: [{ name: "description", content: "Edit note" }],
};
