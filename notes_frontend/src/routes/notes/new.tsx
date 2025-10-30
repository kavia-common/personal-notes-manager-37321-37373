import { component$, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { NoteEditor } from "~/components/NoteEditor";
import { getNotesActions } from "~/lib/store";

/**
 * PUBLIC_INTERFACE
 * NewNotePage
 * Create a new note using the NoteEditor component.
 */
export default component$(() => {
  const nav = useNavigate();
  // no direct hook usage needed here

  return (
    <NoteEditor
      onCancelHref="/notes"
      onSave$={$(async (value) => {
        const created = await getNotesActions().addNote({ title: value.title, content: value.content });
        nav(`/notes/${created.id}`);
      })}
      submitLabel="Save"
    />
  );
});

export const head: DocumentHead = {
  title: "New Note • Qwik Notes",
  meta: [{ name: "description", content: "Create a new note" }],
};
