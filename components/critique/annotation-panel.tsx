"use client";

import { Check, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { Annotation } from "@/lib/critique/types";
import { percent, pinLabel } from "./pin-mark";

type AnnotationPanelProps = {
  annotations: Annotation[];
  hasDesign: boolean;
  activeId: string | null;
  hoveredId: string | null;
  onActivate: (id: string) => void;
  onHover: (id: string | null) => void;
  onToggleStatus: (id: string) => void;
  onRemove: (id: string) => void;
};

/** El registro: todas las críticas, en el orden en que se marcaron. */
export function AnnotationPanel({
  annotations,
  hasDesign,
  activeId,
  hoveredId,
  onActivate,
  onHover,
  onToggleStatus,
  onRemove,
}: AnnotationPanelProps) {
  const resolved = annotations.filter((annotation) => annotation.status === "resolved").length;
  const open = annotations.length - resolved;

  return (
    <aside aria-labelledby="registro-title" className="flex min-h-0 flex-col bg-bg">
      <header className="flex h-14 shrink-0 items-center justify-between gap-4 px-5">
        <h2 id="registro-title" className="text-sm font-semibold text-text">
          Registro
          {annotations.length > 0 && <span className="ml-2 type-numeral text-muted">{annotations.length}</span>}
        </h2>
        {annotations.length > 0 && (
          <p className="type-meta text-muted">
            <span className="text-text">{open}</span> {open === 1 ? "abierta" : "abiertas"}
            <span aria-hidden className="mx-2 text-faint">
              /
            </span>
            <span className="text-text">{resolved}</span> {resolved === 1 ? "resuelta" : "resueltas"}
          </p>
        )}
      </header>

      {annotations.length === 0 ? (
        <div className="px-5 pt-4 pb-8">
          <p className="text-sm font-medium text-text">{hasDesign ? "Aún no hay críticas." : "Sin diseño todavía."}</p>
          <p className="mt-1 max-w-prose text-sm text-muted">
            {hasDesign
              ? "Haz click en cualquier punto del diseño. El pin se ancla por la punta a esa coordenada exacta."
              : "Sube una imagen de tu landing para empezar a marcarla."}
          </p>
        </div>
      ) : (
        <ol className="min-h-0 flex-1 overflow-y-auto pb-4">
          {annotations.map((annotation, index) => {
            const isActive = annotation.id === activeId;
            const isLit = isActive || annotation.id === hoveredId;
            const isResolved = annotation.status === "resolved";
            return (
              <li
                key={annotation.id}
                onMouseEnter={() => onHover(annotation.id)}
                onMouseLeave={() => onHover(null)}
                className={cn(
                  "group relative flex gap-4 py-3.5 pr-3 pl-5 transition-colors duration-(--duration-fast) ease-(--ease-out)",
                  isActive ? "bg-raised" : isLit && "bg-surface",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "w-5 shrink-0 type-numeral text-sm text-mark-text",
                    isResolved && "text-muted line-through decoration-mark-text decoration-2",
                  )}
                >
                  {pinLabel(index + 1)}
                </span>

                <button
                  type="button"
                  onClick={() => onActivate(annotation.id)}
                  aria-current={isActive || undefined}
                  className="min-w-0 flex-1 text-left outline-none after:absolute after:inset-0 focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-focus"
                >
                  <span className="sr-only">Crítica {index + 1}: </span>
                  <span
                    className={cn(
                      "line-clamp-4 type-annotation break-words whitespace-pre-line",
                      isResolved ? "text-muted line-through decoration-ink-500" : "text-ink-200",
                      isLit && !isResolved && "text-text",
                    )}
                  >
                    {annotation.body}
                  </span>
                  <span className="mt-1.5 block type-meta text-muted">
                    x {percent(annotation.x)} · y {percent(annotation.y)}
                    {isResolved && " · resuelta"}
                  </span>
                </button>

                <div className="relative z-10 flex shrink-0 items-start opacity-100 transition-opacity duration-(--duration-fast) md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100">
                  <Button
                    variant="quiet"
                    size="icon"
                    onClick={() => onToggleStatus(annotation.id)}
                    aria-label={isResolved ? `Reabrir crítica ${index + 1}` : `Marcar crítica ${index + 1} como resuelta`}
                    title={isResolved ? "Reabrir" : "Marcar como resuelta"}
                  >
                    {isResolved ? <RotateCcw className="size-4" /> : <Check className="size-4" />}
                  </Button>
                  <Button
                    variant="quiet"
                    size="icon"
                    onClick={() => onRemove(annotation.id)}
                    aria-label={`Eliminar crítica ${index + 1}`}
                    title="Eliminar"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </aside>
  );
}
