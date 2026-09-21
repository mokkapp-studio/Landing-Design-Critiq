"use client";

import * as Popover from "@radix-ui/react-popover";
import { Check, RotateCcw, Trash2 } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { AnnotationStatus, Point } from "@/lib/critique/types";
import { percent, pinLabel } from "./pin-mark";

type ComposerProps = {
  number: number;
  /** Coordenada del pin, para leerla junto a la crítica. */
  point: Point;
  initialBody?: string;
  /** Existe solo al editar una crítica ya guardada. */
  status?: AnnotationStatus;
  onSubmit: (body: string) => void;
  onCancel: () => void;
  onToggleStatus?: () => void;
  onRemove?: () => void;
  /** Elemento del lienzo: un click ahí cierra el composer sin crear un pin nuevo. */
  onOutsideCanvasPress?: (target: EventTarget | null) => void;
};

/**
 * Editor de una crítica, anclado a su pin. Debe renderizarse dentro de un <Popover.Root>.
 * Enter guarda · Shift+Enter salto de línea · Esc descarta · click fuera guarda si hay texto.
 */
export function AnnotationComposer({
  number,
  point,
  initialBody = "",
  status,
  onSubmit,
  onCancel,
  onToggleStatus,
  onRemove,
  onOutsideCanvasPress,
}: ComposerProps) {
  const [body, setBody] = useState(initialBody);
  // Copia síncrona del texto para el cierre por click fuera, que ocurre fuera del ciclo de render.
  const bodyRef = useRef(initialBody);
  const isEditing = status !== undefined;
  const isResolved = status === "resolved";
  const canSubmit = body.trim().length > 0;

  function commit() {
    if (bodyRef.current.trim()) onSubmit(bodyRef.current);
    else onCancel();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      if (canSubmit) onSubmit(body);
    }
  }

  return (
    <Popover.Content
      side="top"
      align="start"
      sideOffset={8}
      collisionPadding={16}
      onEscapeKeyDown={onCancel}
      onPointerDownOutside={(event) => {
        onOutsideCanvasPress?.(event.target);
        commit();
      }}
      onFocusOutside={(event) => event.preventDefault()}
      className={
        "z-(--z-overlay) w-[min(22rem,calc(100vw-2rem))] rounded-md bg-raised shadow-popover outline-none " +
        "origin-(--radix-popover-content-transform-origin) data-[state=open]:animate-[composer-in_var(--duration-base)_var(--ease-out)]"
      }
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (canSubmit) onSubmit(body);
        }}
      >
        <div className="flex h-11 items-center gap-3 pr-1.5 pl-4">
          <label htmlFor="annotation-body" className="flex min-w-0 flex-1 items-baseline gap-3">
            <span className={cn("type-numeral text-sm text-mark-text", isResolved && "line-through decoration-2")}>
              {pinLabel(number)}
            </span>
            <span className="sr-only">Crítica {number}</span>
            <span className="truncate type-meta text-muted">
              x {percent(point.x)} · y {percent(point.y)}
              {isResolved && <span className="text-ink-300"> · resuelta</span>}
            </span>
          </label>
          {isEditing && (
            <div className="flex items-center">
              <Button
                variant="quiet"
                size="icon"
                onClick={onToggleStatus}
                aria-label={isResolved ? "Reabrir crítica" : "Marcar como resuelta"}
                title={isResolved ? "Reabrir" : "Marcar como resuelta"}
              >
                {isResolved ? <RotateCcw className="size-4" /> : <Check className="size-4" />}
              </Button>
              <Button variant="quiet" size="icon" onClick={onRemove} aria-label="Eliminar crítica" title="Eliminar">
                <Trash2 className="size-4" />
              </Button>
            </div>
          )}
        </div>

        <textarea
          id="annotation-body"
          autoFocus
          rows={3}
          value={body}
          onChange={(event) => {
            bodyRef.current = event.target.value;
            setBody(event.target.value);
          }}
          onKeyDown={handleKeyDown}
          onFocus={(event) => event.currentTarget.setSelectionRange(body.length, body.length)}
          placeholder="¿Qué falla aquí y por qué?"
          className="block field-sizing-content max-h-60 min-h-20 w-full resize-none bg-transparent px-4 pb-3 type-annotation text-text outline-none focus-visible:outline-none"
        />

        <div className="flex items-center justify-between gap-3 rounded-b-md bg-surface py-2 pr-2 pl-4">
          <p className="type-meta text-muted">
            <kbd className="font-mono text-ink-300">Enter</kbd> guarda · <kbd className="font-mono text-ink-300">Esc</kbd> descarta
          </p>
          <Button variant="lit" size="sm" type="submit" disabled={!canSubmit}>
            {isEditing ? "Guardar" : "Añadir"}
          </Button>
        </div>
      </form>
    </Popover.Content>
  );
}
