import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useNotes } from "~/lib/store";

/**
 * PUBLIC_INTERFACE
 * NotesIndexPage
 * Entry route for listing notes.
 */
export default component$(() => {
  const { state } = useNotes();
  return (
    <section aria-label="Notes overview">
      <header style={{ marginBottom: "0.75rem" }}>
        <h1 style={{ margin: 0 }}>All Notes</h1>
        <p style={{ margin: "0.25rem 0", color: "var(--color-text-muted)" }}>
          {state.loading
            ? "Loading your notes…"
            : state.notes.length === 0
            ? "No notes yet. Use + Add Note to create your first note."
            : "Select a note from the sidebar to view or edit it."}
        </p>
      </header>

      <div class="surface" style={{ padding: "1rem" }}>
        {state.error ? (
          <p style={{ color: "var(--color-error)" }}>{state.error}</p>
        ) : (
          <p style={{ marginTop: 0 }}>
            You currently have <strong>{state.notes.length}</strong> {state.notes.length === 1 ? "note" : "notes"}.
          </p>
        )}
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Notes • Qwik Notes",
  meta: [{ name: "description", content: "Browse your notes" }],
};
