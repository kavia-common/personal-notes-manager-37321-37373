import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

/**
 * Redirect to /notes as the app home.
 */
export const useRedirect = routeLoader$(({ redirect }) => {
  throw redirect(302, "/notes");
});

// PUBLIC_INTERFACE
export default component$(() => {
  // Fallback content in case redirect is not immediate
  return (
    <div style="padding:2rem;" role="status" aria-live="polite" aria-label="Redirecting">
      <p>Redirecting to notes…</p>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik Notes",
  meta: [
    {
      name: "description",
      content: "Personal notes app",
    },
  ],
};
