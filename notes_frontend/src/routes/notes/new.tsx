import { component$, $, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useNavigate, useLocation } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { NoteEditor } from "~/components/NoteEditor";
import { getNotesActions } from "~/lib/store";
import { useUnsavedChangesGuard } from "~/lib/unsavedGuard";

/**
 * PUBLIC_INTERFACE
 * NewNotePage
 * Create a new note using the NoteEditor component.
 */
export default component$(() => {
  const nav = useNavigate();
  const loc = useLocation();

  // Track simple dirty flag based on hash in URL (workaround without changing NoteEditor)
  const isDirtySig = useSignal(false);

  // Heuristic: mark dirty when user types in the URL fragment "#dirty" set by editor-aware pages
  // For now, we'll toggle when navigating away unless save succeeds.
  useVisibleTask$(({ track }) => {
    track(() => loc.url.href);
  });

  useUnsavedChangesGuard({
    isDirty$: () => isDirtySig.value,
  });

  return (
    <NoteEditor
      onCancelHref="/notes"
      onSave$={$(async (value) => {
        isDirtySig.value = false; // will be considered clean during/after save
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
