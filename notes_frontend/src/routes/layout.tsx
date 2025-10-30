import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { TopBar } from "~/components/TopBar";
import { appShellClasses } from "~/lib/theme";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

/**
 * PUBLIC_INTERFACE
 * Root layout for the app. Renders a persistent TopBar and a responsive two-column shell:
 * - Sidebar: reserved for note list/navigation
 * - Main content: <Slot/> for route content
 */
export default component$(() => {
  return (
    <>
      <TopBar />
      <div class={`gradient-soft`} style={{ minHeight: "100vh" }}>
        <div class={appShellClasses.shell}>
          <aside class={appShellClasses.sidebar} aria-label="Sidebar">
            {/* Placeholder for future NoteList component */}
            <div style={{ padding: "0.5rem 0.5rem" }}>
              <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "0.95rem", color: "var(--color-text-muted)" }}>
                Notes
              </h2>
              <p style="margin:0;color:var(--color-text-muted)">Your notes will appear here.</p>
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
