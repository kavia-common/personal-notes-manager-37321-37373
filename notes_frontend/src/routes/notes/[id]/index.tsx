import { component$, $ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { buttonClasses } from "~/lib/theme";
import { useNotes, getNotesActions } from "~/lib/store";

/**
 * PUBLIC_INTERFACE
 * NoteDetailsPage
 * View a single note by id.
 */
export default component$(() => {
  const loc = useLocation();
  const noteId = loc.params["id"];
  const { state } = useNotes();

  const note = state.notes.find((n) => n.id === noteId);

  return (
    <section>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <div>
          <h1 style={{ margin: 0 }}>{note ? note.title || `Note #${noteId}` : `Note #${noteId}`}</h1>
          <p style={{ margin: "0.25rem 0", color: "var(--color-text-muted)" }}>
            {note ? "Viewing note details." : "Note not found in current state."}
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
        {note ? (
          <>
            <p style={{ marginTop: 0, whiteSpace: "pre-wrap" }}>{note.content}</p>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
              Updated: {new Date(note.updatedAt).toLocaleString()}
            </p>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <Link href={`/notes/${noteId}/edit`} class={buttonClasses("primary")}>
                Edit
              </Link>
              <button
                type="button"
                class={buttonClasses("secondary")}
                onClick$={$(() => {
                  if (confirm("Delete this note? This cannot be undone.")) {
                    getNotesActions()
                      .deleteNote(noteId)
                      .then(() => {
                        // After successful deletion, go back to the list
                        location.assign("/notes");
                      })
                      .catch(() => {
                        // Error banner handled in store
                      });
                  }
                })}
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <p style={{ marginTop: 0 }}>
              The note with id <strong>#{noteId}</strong> is not loaded. Try going back to notes list.
            </p>
            <button
              class={buttonClasses("secondary")}
              type="button"
              onClick$={$(() => getNotesActions().loadNotes())}
            >
              Reload notes
            </button>
          </>
        )}
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Note • Qwik Notes",
  meta: [{ name: "description", content: "View a note" }],
};
