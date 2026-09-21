"use client";

import { ImageUp, TriangleAlert } from "lucide-react";
import { useId, useRef, useState, type DragEvent } from "react";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { ACCEPT_ATTRIBUTE } from "@/lib/critique/image";

type DesignDropzoneProps = {
  onFile: (file: File) => void;
  busy?: boolean;
  error?: string | null;
};

/** Mesa vacía: arrastra o elige la imagen del diseño a revisar. */
export function DesignDropzone({ onFile, busy = false, error }: DesignDropzoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) onFile(file);
  }

  const corners = ["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"];

  return (
    <div className="grid h-full place-items-center overflow-auto bg-desk p-6 sm:p-12">
      <section
        aria-labelledby={`${inputId}-title`}
        onDragOver={(event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = "copy";
        }}
        onDragEnter={() => setDragging(true)}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false);
        }}
        onDrop={handleDrop}
        className={cn(
          "relative flex aspect-[4/3] w-full max-w-3xl flex-col justify-center rounded-xs p-8 sm:p-12",
          "transition-[background-color,box-shadow] duration-(--duration-base) ease-(--ease-out)",
          dragging ? "bg-stage text-stage-ink shadow-sheet" : "bg-transparent",
        )}
      >
        {/* Marcas de registro: el hueco de la hoja sobre la mesa */}
        {corners.map((corner) => (
          <span
            key={corner}
            aria-hidden
            className={cn(
              "pointer-events-none absolute size-5 transition-colors duration-(--duration-base)",
              corner,
              dragging ? "border-transparent" : "border-ink-500",
            )}
          />
        ))}

        <ImageUp
          aria-hidden
          className={cn("size-6", dragging ? "text-stage-ink" : "text-ink-300")}
          strokeWidth={1.5}
        />
        <h1 id={`${inputId}-title`} className="mt-5 max-w-lg type-title">
          {dragging ? "Suéltalo sobre la mesa." : "Pon tu landing sobre la mesa."}
        </h1>
        <p className={cn("mt-3 max-w-prose text-base", dragging ? "text-stage-muted" : "text-muted")}>
          Arrastra aquí una captura o export del diseño, o elige el archivo. Luego haz click donde algo falla.
        </p>

        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={ACCEPT_ATTRIBUTE}
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onFile(file);
            event.target.value = "";
          }}
        />
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            className={buttonClasses({ variant: "lit", size: "lg" }, dragging ? "invisible" : undefined)}
          >
            {busy ? "Preparando diseño…" : "Elegir imagen"}
          </button>
          <p className={cn("text-sm", dragging ? "invisible" : "text-muted")}>Se queda en este navegador.</p>
        </div>
        <p className={cn("mt-4 type-meta", dragging ? "text-stage-muted" : "text-muted")}>
          PNG · JPG · WEBP · GIF · SVG — hasta 25 MB
        </p>

        {error && (
          <p role="alert" className="mt-6 flex items-center gap-2 text-sm text-warn">
            <TriangleAlert aria-hidden className="size-4 shrink-0" />
            {error}
          </p>
        )}
      </section>
    </div>
  );
}
