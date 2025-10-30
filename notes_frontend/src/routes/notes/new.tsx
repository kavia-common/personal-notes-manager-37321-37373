import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { buttonClasses } from "~/lib/theme";

/**
 * PUBLIC_INTERFACE
 * NewNotePage
 * Placeholder page for creating a new note.
 */
export default component$(() => {
  return (
    <section>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <div>
          <h1 style={{ margin: 0 }}>New Note</h1>
          <p style={{ margin: "0.25rem 0", color: "var(--color-text-muted)" }}>
            This is a placeholder editor screen.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link href="/notes" class={buttonClasses("secondary")}>
            Cancel
          </Link>
          <button type="button" class={buttonClasses("primary")} disabled>
            Save (disabled)
          </button>
        </div>
      </header>

      <div class="surface" style={{ padding: "1rem" }}>
        <p style={{ marginTop: 0 }}>
          The NoteEditor component will be mounted here in the next step.
        </p>
        <div style={{ opacity: 0.6 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Title</label>
          <input placeholder="Enter note title…" style={{ width: "100%", marginBottom: "0.75rem" }} disabled />
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Content</label>
          <textarea placeholder="Start typing your note…" rows={8} style={{ width: "100%" }} disabled />
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "New Note • Qwik Notes",
  meta: [{ name: "description", content: "Create a new note" }],
};
