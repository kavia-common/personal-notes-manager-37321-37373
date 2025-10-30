import { component$, useStylesScoped$ } from "@builder.io/qwik";

/**
 * PUBLIC_INTERFACE
 * BannerProps
 * Props for banner alerts
 */
export type BannerProps = {
  kind?: "success" | "error" | "info";
  message: string;
};

/**
 * PUBLIC_INTERFACE
 * Banner
 * Renders a small alert banner with Ocean Professional theming.
 */
export const Banner = component$<BannerProps>(({ kind = "info", message }) => {
  useStylesScoped$(`
  .banner {
    border-radius: var(--radius-sm);
    padding: 0.6rem 0.75rem;
    margin: 0 0 0.75rem 0;
    border: 1px solid transparent;
    font-size: 0.92rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .success {
    background: #ecfdf5;
    color: #065f46;
    border-color: rgba(6, 95, 70, 0.25);
  }
  .error {
    background: #fef2f2;
    color: #991b1b;
    border-color: rgba(153, 27, 27, 0.25);
  }
  .info {
    background: #eff6ff;
    color: #1e40af;
    border-color: rgba(30, 64, 175, 0.25);
  }
  .dot {
    display:inline-block;width:8px;height:8px;border-radius:999px;background:currentColor;opacity:0.7;
  }
  `);
  return (
    <div role={kind === "error" ? "alert" : "status"} aria-live={kind === "error" ? "assertive" : "polite"} class={`banner ${kind}`}>
      <span class="dot" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
});
