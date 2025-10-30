import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { buttonClasses } from "~/lib/theme";

/**
 * PUBLIC_INTERFACE
 * EditNotePage
 * Placeholder page for editing a note by id.
 */
export default component$(() => {
  const loc = useLocation();
  const noteId = loc.params["id"];

  return (
    <section>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <div>
          <h1 style={{ margin: 0 }}>Edit Note #{noteId}</h1>
          <p style={{ margin: "0.25rem 0", color: "var(--color-text-muted)" }}>
            Placeholder editor for the note content.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link href={`/notes/${noteId}`} class={buttonClasses("secondary")}>
            Cancel
          </Link>
          <button type="button" class={buttonClasses("primary")} disabled>
            Save Changes (disabled)
          </button>
        </div>
      </header>

      <div class="surface" style={{ padding: "1rem" }}>
        <p style={{ marginTop: 0 }}>
          The NoteEditor will be connected here to edit note <strong>#{noteId}</strong>.
        </p>
        <div style={{ opacity: 0.6 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Title</label>
          <input defaultValue={`Sample title for #${noteId}`} style={{ width: "100%", marginBottom: "0.75rem" }} disabled />
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Content</label>
          <textarea defaultValue={`Sample content for #${noteId}`} rows={8} style={{ width: "100%" }} disabled />
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Edit Note • Qwik Notes",
  meta: [{ name: "description", content: "Edit note" }],
};
