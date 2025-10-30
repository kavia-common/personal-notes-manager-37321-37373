import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { NoteEditor } from "~/components/NoteEditor";

/**
 * PUBLIC_INTERFACE
 * NewNotePage
 * Create a new note using the NoteEditor component.
 * For now, onSave$ logs values; integration with persistence will be added later.
 */
export default component$(() => {
  return (
    <NoteEditor
      onCancelHref="/notes"
      onSave$={async (value) => {
        // TODO: integrate with state store/API. For now, log and navigate back.
        console.info("Create note:", value);
        // Soft redirect to /notes after "saving"
        location.assign("/notes");
      }}
      submitLabel="Save"
    />
  );
});

export const head: DocumentHead = {
  title: "New Note • Qwik Notes",
  meta: [{ name: "description", content: "Create a new note" }],
};
