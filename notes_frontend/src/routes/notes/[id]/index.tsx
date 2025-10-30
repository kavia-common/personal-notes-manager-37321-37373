import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { buttonClasses } from "~/lib/theme";

/**
 * PUBLIC_INTERFACE
 * NoteDetailsPage
 * Placeholder page for viewing a single note by id.
 */
export default component$(() => {
  const loc = useLocation();
  const noteId = loc.params["id"];

  return (
    <section>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <div>
          <h1 style={{ margin: 0 }}>Note #{noteId}</h1>
          <p style={{ margin: "0.25rem 0", color: "var(--color-text-muted)" }}>
            Placeholder note view.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link href={`/notes/${noteId}/edit`} class={buttonClasses("primary")}>
            Edit
          </Link>
          <Link href="/notes" class={buttonClasses("secondary")}>
            Back
          </Link>
        </div>
      </header>

      <div class="surface" style={{ padding: "1rem" }}>
        <p style={{ marginTop: 0 }}>
          The full note content for <strong>#{noteId}</strong> will render here.
        </p>
        <p style={{ color: "var(--color-text-muted)" }}>
          This page will later fetch the note by id and display it.
        </p>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Note • Qwik Notes",
  meta: [{ name: "description", content: "View a note" }],
};
