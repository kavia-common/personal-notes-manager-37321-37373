import { component$, useStylesScoped$, $, useSignal, type QwikChangeEvent } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { buttonClasses } from "~/lib/theme";

/**
 * Styles scoped to the NoteEditor component.
 * Uses the Ocean Professional theme tokens defined in global.css.
 */
const styles = `
.form {
  display: grid;
  gap: 0.75rem;
}
.row {
  display: grid;
  gap: 0.35rem;
}
.label {
  font-weight: 700;
  color: var(--color-text);
}
.hint {
  color: var(--color-text-muted);
  font-size: 0.85rem;
}
.input,
.textarea {
  width: 100%;
}
.error {
  color: var(--color-error);
  font-size: 0.85rem;
}
.error-border {
  border-color: var(--color-error) !important;
}
.toolbar {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 0.25rem;
}
.surface-card {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid rgba(17, 24, 39, 0.06);
  box-shadow: var(--shadow-sm);
  padding: 1rem;
}

/* Disabled overlay feel on the whole form if disabled */
.form[aria-busy="true"] {
  opacity: 0.7;
}

/* Title & header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
.headerTitle {
  margin: 0;
}
`;

/**
 * Note shape for form values.
 */
export type NoteEditorValue = {
  title: string;
  content: string;
};

/**
 * PUBLIC_INTERFACE
 * NoteEditorProps
 * Props for the NoteEditor component.
 * - initial: optional initial values for editing existing notes
 * - onSave$: callback invoked with values when Save is clicked and validation passes
 * - onCancelHref: link to navigate back when Cancel is clicked
 * - saving: externally controlled flag to indicate save-in-progress (disables form)
 * - submitLabel: label for the primary submit button (defaults to "Save")
 */
export type NoteEditorProps = {
  initial?: Partial<NoteEditorValue>;
  onSave$: (value: NoteEditorValue) => Promise<void> | void;
  onCancelHref: string;
  saving?: boolean;
  submitLabel?: string;
};

/**
 * PUBLIC_INTERFACE
 * NoteEditor
 * Form component for creating and editing notes with title and content fields.
 * - Validates required title and content.
 * - Shows inline error messages and error borders.
 * - Disables inputs and buttons while saving.
 * - Styled to match the Ocean Professional theme.
 */
export const NoteEditor = component$<NoteEditorProps>((props) => {
  useStylesScoped$(styles);

  // Local signals for form state. These are serializable primitives.
  const titleSig = useSignal(props.initial?.title ?? "");
  const contentSig = useSignal(props.initial?.content ?? "");
  const errorTitleSig = useSignal<string | null>(null);
  const errorContentSig = useSignal<string | null>(null);
  const savingLocalSig = useSignal<boolean>(false);
  // Mirror external saving prop into a signal so $ closures don't access props directly
  const externalSavingSig = useSignal<boolean>(!!props.saving);

  // Store a serializable wrapper that will call props.onSave$ at runtime without capturing it in QRLs.
  // Save request data signal to avoid capturing functions inside QRLs
  const pendingSaveSig = useSignal<NoteEditorValue | null>(null);

  // Sync external saving flag (readable in closures via signal)
  externalSavingSig.value = !!props.saving;

  const onTitleChange$ = $((ev: QwikChangeEvent<HTMLInputElement>) => {
    const target = ev.target as HTMLInputElement | null;
    const val = target && typeof target.value === "string" ? target.value : "";
    titleSig.value = val;
    if (errorTitleSig.value && val.trim().length > 0) {
      errorTitleSig.value = null;
    }
  });

  const onContentChange$ = $((ev: QwikChangeEvent<HTMLTextAreaElement>) => {
    const target = ev.target as HTMLTextAreaElement | null;
    const val = target && typeof target.value === "string" ? target.value : "";
    contentSig.value = val;
    if (errorContentSig.value && val.trim().length > 0) {
      errorContentSig.value = null;
    }
  });

  // Validate and submit
  const onSubmit$ = $(async () => {
    // Compute busy inline using mirrored signal (no props captured)
    if (externalSavingSig.value || savingLocalSig.value) return;

    let hasError = false;
    const t = (titleSig.value || "").trim();
    const c = (contentSig.value || "").trim();

    if (t.length === 0) {
      errorTitleSig.value = "Title is required.";
      hasError = true;
    } else if (t.length > 160) {
      errorTitleSig.value = "Title must be 160 characters or less.";
      hasError = true;
    } else {
      errorTitleSig.value = null;
    }

    if (c.length === 0) {
      errorContentSig.value = "Content is required.";
      hasError = true;
    } else {
      errorContentSig.value = null;
    }

    if (hasError) return;

    // Signal a save request. Actual call is performed outside $ closures below.
    pendingSaveSig.value = { title: t, content: c };
  });

  const submitText = props.submitLabel ?? "Save";

  return (
    <section>
      <div class="header">
        <div>
          <h1 class="headerTitle">{props.initial ? "Edit Note" : "New Note"}</h1>
          <p class="hint" style={{ margin: "0.25rem 0" }}>
            Enter a concise title and your note content below.
          </p>
        </div>
        <div class="toolbar">
          <Link href={props.onCancelHref} class={buttonClasses("secondary")} aria-label="Cancel and go back">
            Cancel
          </Link>
          <button
            type="button"
            class={buttonClasses("primary")}
            disabled={externalSavingSig.value || savingLocalSig.value}
            onClick$={onSubmit$}
            aria-busy={externalSavingSig.value || savingLocalSig.value ? "true" : "false"}
          >
            {externalSavingSig.value || savingLocalSig.value ? "Saving…" : submitText}
          </button>
        </div>
      </div>

      <div class="surface-card">
        <form
          class="form"
          aria-busy={externalSavingSig.value || savingLocalSig.value ? "true" : "false"}
          preventdefault:submit
          onSubmit$={onSubmit$}
        >
          <div class="row">
            <label class="label" for="note-title">
              Title
            </label>
            <input
              id="note-title"
              class={`input ${errorTitleSig.value ? "error-border" : ""}`}
              placeholder="Enter note title…"
              value={titleSig.value}
              onChange$={onTitleChange$}
              maxLength={200}
              disabled={externalSavingSig.value || savingLocalSig.value}
            />
            {errorTitleSig.value && <span class="error" role="alert">{errorTitleSig.value}</span>}
          </div>

          <div class="row">
            <label class="label" for="note-content">
              Content
            </label>
            <textarea
              id="note-content"
              class={`textarea ${errorContentSig.value ? "error-border" : ""}`}
              placeholder="Start typing your note…"
              rows={10}
              value={contentSig.value}
              onChange$={onContentChange$}
              disabled={externalSavingSig.value || savingLocalSig.value}
            />
            {errorContentSig.value && <span class="error" role="alert">{errorContentSig.value}</span>}
          </div>
        </form>
      </div>
    </section>
  );

  // After render: if a save was requested, run it now outside of QRL closures.
  if (pendingSaveSig.value) {
    const payload = pendingSaveSig.value;
    pendingSaveSig.value = null;
    // Schedule outside of the current synchronous render to avoid being inside any QRL closure
    queueMicrotask(async () => {
      try {
        savingLocalSig.value = true;
        if (payload) {
          await props.onSave$(payload as NoteEditorValue);
        }
      } finally {
        savingLocalSig.value = false;
      }
    });
  }
});
