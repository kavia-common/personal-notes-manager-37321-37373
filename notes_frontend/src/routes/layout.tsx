import { component$, Slot, $, useVisibleTask$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { TopBar } from "~/components/TopBar";
import { appShellClasses } from "~/lib/theme";
import { NoteList } from "~/components/NoteList";
import { useNotesProvider, useNotes, getNotesActions } from "~/lib/store";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

/**
 * PUBLIC_INTERFACE
 * Root layout for the app. Renders a persistent TopBar and a responsive two-column shell:
 * - Provides Notes store context at the layout level.
 * - Sidebar: renders NoteList from store
 * - Main content: <Slot/> for route content
 */
export default component$(() => {
  // Provide the notes store to the whole app
  useNotesProvider();

  // Consume notes state/actions
  const { state } = useNotes();

  // Bridge for child components emitting DOM events (keeps QRLs clean)
  useVisibleTask$(() => {
    const handler = (e: Event) => {
      const anyEvt = e as CustomEvent<{ id: string }>;
      const id = anyEvt.detail?.id;
      if (!id) return;
      const prevSelected = state.selectedId;
      const actions = getNotesActions();
      actions
        .deleteNote(id)
        .then(() => {
          if (prevSelected === id) {
            location.assign("/notes");
          }
        })
        .catch(() => {
          // Store handles error banner
        });
    };
    document.addEventListener("notes:request-delete", handler);
    return () => document.removeEventListener("notes:request-delete", handler);
  });

  return (
    <>
      <TopBar />
      <div class={`gradient-soft`} style={{ minHeight: "100vh" }}>
        <div class={appShellClasses.shell}>
          <aside class={appShellClasses.sidebar} aria-label="Sidebar">
            <div style={{ padding: "0.5rem 0.5rem" }}>
              <NoteList
                items={state.notes}
                onDelete$={$((id: string) => {
                  const prevSelected = state.selectedId;
                  const actions = getNotesActions();
                  return actions.deleteNote(id).then(() => {
                    if (prevSelected === id) {
                      location.assign("/notes");
                    }
                  });
                })}
              />
            </div>
          </aside>
          <main class={appShellClasses.main} role="main" aria-live="polite">
            <div style={{ padding: "0.5rem" }}>
              {state.banner && state.banner.message.trim().length > 0 ? (
                <div
                  role="status"
                  class={`banner-${state.banner.kind}`}
                  style={{
                    borderRadius: "6px",
                    padding: "0.6rem 0.75rem",
                    margin: "0 0 0.75rem 0",
                    border: "1px solid rgba(0,0,0,0.08)",
                    background:
                      state.banner.kind === "success"
                        ? "#ecfdf5"
                        : state.banner.kind === "error"
                        ? "#fef2f2"
                        : "#eff6ff",
                    color:
                      state.banner.kind === "success"
                        ? "#065f46"
                        : state.banner.kind === "error"
                        ? "#991b1b"
                        : "#1e40af",
                  }}
                >
                  {state.banner.message.trim()}
                </div>
              ) : null}
              <Slot />
            </div>
          </main>
        </div>
      </div>
    </>
  );
});
