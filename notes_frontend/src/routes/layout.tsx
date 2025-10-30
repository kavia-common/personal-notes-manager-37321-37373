import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { TopBar } from "~/components/TopBar";
import { appShellClasses } from "~/lib/theme";
import { NoteList, type NoteListItem } from "~/components/NoteList";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

/**
 * PUBLIC_INTERFACE
 * Root layout for the app. Renders a persistent TopBar and a responsive two-column shell:
 * - Sidebar: renders NoteList for navigation
 * - Main content: <Slot/> for route content
 */
export default component$(() => {
  // Temporary mock items until backend/state integration
  const demoItems: NoteListItem[] = [
    {
      id: "1",
      title: "Welcome to Qwik Notes",
      content:
        "This is a demo note. Create, view, and edit notes with a clean sidebar.",
    },
    {
      id: "2",
      title: "Ocean Professional Theme",
      content:
        "Blue primary, amber secondary, subtle shadows, rounded corners and gradients.",
    },
    {
      id: "3",
      title: "Your next idea",
      content:
        "Capture a quick thought. Click a note to view details. Use the ✕ to delete.",
    },
  ];

  return (
    <>
      <TopBar />
      <div class={`gradient-soft`} style={{ minHeight: "100vh" }}>
        <div class={appShellClasses.shell}>
          <aside class={appShellClasses.sidebar} aria-label="Sidebar">
            <div style={{ padding: "0.5rem 0.5rem" }}>
              <NoteList
                items={demoItems}
                onDelete$={async (id) => {
                  // For now just log; real implementation will update state or call API.
                  console.info("Delete requested for note id:", id);
                }}
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
