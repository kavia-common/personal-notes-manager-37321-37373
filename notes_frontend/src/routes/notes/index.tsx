import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

/**
 * PUBLIC_INTERFACE
 * NotesIndexPage
 * Entry route for listing notes. Placeholder content for now.
 */
export default component$(() => {
  return (
    <section>
      <header style={{ marginBottom: "0.75rem" }}>
        <h1 style={{ margin: 0 }}>All Notes</h1>
        <p style={{ margin: "0.25rem 0", color: "var(--color-text-muted)" }}>
          This is a placeholder for the notes list. The sidebar will show navigation items.
        </p>
      </header>

      <div class="surface" style={{ padding: "1rem" }}>
        <p style={{ marginTop: 0 }}>
          Soon this page will render the NoteList in the sidebar and summary/empty state here.
        </p>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Notes • Qwik Notes",
  meta: [{ name: "description", content: "Browse your notes" }],
};
