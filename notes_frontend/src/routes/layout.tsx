import { component$, Slot, $ } from "@builder.io/qwik";
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
                  return getNotesActions().deleteNote(id);
                })}
              />
            </div>
          </aside>
          <main class={appShellClasses.main} role="main" aria-live="polite">
            <div style={{ padding: "0.5rem" }}>
              <Slot />
            </div>
          </main>
        </div>
      </div>
    </>
  );
});
