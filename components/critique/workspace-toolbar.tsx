"use client";

import { Eraser, ImageUp, Minus, Plus, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { ACCEPT_ATTRIBUTE } from "@/lib/critique/image";
import type { SaveResult } from "@/lib/critique/storage";
import type { DesignImage } from "@/lib/critique/types";
import type { Zoom } from "./critique-canvas";

export const ZOOM_STEPS = [0.25, 0.5, 0.75, 1, 1.5, 2] as const;

type WorkspaceToolbarProps = {
  design: DesignImage | null;
  annotationCount: number;
  zoom: Zoom;
  persistence: SaveResult;
  onZoomChange: (zoom: Zoom) => void;
  onReplaceFile: (file: File) => void;
  onClearAnnotations: () => void;
};

export function stepZoom(zoom: Zoom, direction: 1 | -1): Zoom {
  const current = zoom === "fit" ? 1 : zoom;
  const next =
    direction === 1
      ? ZOOM_STEPS.find((step) => step > current)
      : [...ZOOM_STEPS].reverse().find((step) => step < current);
  return next ?? current;
}

const persistenceMessage: Partial<Record<SaveResult, string>> = {
  "quota-exceeded": "El diseño es demasiado pesado para guardarse en este navegador. Los cambios se perderán al recargar.",
  unavailable: "El almacenamiento local no está disponible. Los cambios se perderán al recargar.",
};

/** Barra fija: identidad, diseño actual, zoom y acciones sobre el critique. */
export function WorkspaceToolbar({
  design,
  annotationCount,
  zoom,
  persistence,
  onZoomChange,
  onReplaceFile,
  onClearAnnotations,
}: WorkspaceToolbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const warning = persistenceMessage[persistence];

  return (
    <header className="flex h-toolbar shrink-0 items-center gap-5 bg-bg pr-3 pl-5">
      <Link href="/" aria-label="Critiq, volver al inicio" className="rounded-sm">
        <Wordmark />
      </Link>

      {design && (
        <p className="hidden min-w-0 items-baseline gap-3 sm:flex" title={design.name}>
          <span className="truncate text-sm text-ink-300">{design.name}</span>
          <span className="shrink-0 type-meta text-muted">
            {design.width} × {design.height}
          </span>
        </p>
      )}

      {warning && (
        <p role="status" className="flex min-w-0 items-center gap-2 text-xs text-warn" title={warning}>
          <TriangleAlert aria-hidden className="size-4 shrink-0" />
          <span className="hidden truncate lg:inline">{warning}</span>
          <span className="lg:hidden">Sin guardar</span>
        </p>
      )}

      {design && (
        <div className="ml-auto flex items-center gap-2">
          <div
            role="group"
            aria-label="Zoom"
            className="mr-2 hidden h-8 items-center rounded-sm bg-surface md:flex"
            title="Atajos: + acercar · − alejar · 0 ajustar"
          >
            <Button variant="quiet" size="icon" onClick={() => onZoomChange(stepZoom(zoom, -1))} aria-label="Alejar">
              <Minus className="size-3.5" />
            </Button>
            <button
              type="button"
              onClick={() => onZoomChange(zoom === "fit" ? 1 : "fit")}
              title={zoom === "fit" ? "Ver a tamaño real (0)" : "Ajustar al ancho (0)"}
              aria-label={zoom === "fit" ? "Ajustado al ancho. Ver a tamaño real" : `Zoom ${Math.round(zoom * 100)}%. Ajustar al ancho`}
              className="h-8 min-w-16 px-1 type-meta text-ink-300 transition-colors duration-(--duration-fast) hover:text-text"
            >
              {zoom === "fit" ? "Ajustar" : `${Math.round(zoom * 100)}%`}
            </button>
            <Button variant="quiet" size="icon" onClick={() => onZoomChange(stepZoom(zoom, 1))} aria-label="Acercar">
              <Plus className="size-3.5" />
            </Button>
          </div>

          <Button
            variant="quiet"
            size="sm"
            onClick={onClearAnnotations}
            disabled={annotationCount === 0}
            aria-label="Vaciar registro"
          >
            <Eraser aria-hidden className="size-4" />
            <span className="hidden sm:inline">Vaciar registro</span>
          </Button>

          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT_ATTRIBUTE}
            className="sr-only"
            tabIndex={-1}
            aria-hidden
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onReplaceFile(file);
              event.target.value = "";
            }}
          />
          <Button variant="line" size="sm" onClick={() => inputRef.current?.click()} aria-label="Cambiar diseño">
            <ImageUp aria-hidden className="size-4" />
            <span className="hidden sm:inline">Cambiar diseño</span>
          </Button>
        </div>
      )}
    </header>
  );
}
