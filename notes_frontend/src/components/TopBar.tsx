import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { buttonClasses } from "~/lib/theme";

/**
 * PUBLIC_INTERFACE
 * TopBar
 * Header with brand and primary actions.
 */
export const TopBar = component$(() => {
  return (
    <header class="topbar">
      <div class="topbar-inner">
        <div class="brand">
          <span class="brand-mark" aria-hidden="true" />
          <span>Qwik Notes</span>
        </div>
        <div class="actions">
          {/* Placeholder for theme toggle */}
          <button class={buttonClasses("secondary")} type="button" aria-label="Toggle color theme" disabled>
            Theme
          </button>
          <Link class={buttonClasses("primary")} href="/notes/new" aria-label="Add a new note">
            + Add Note
          </Link>
        </div>
      </div>
    </header>
  );
});
