"use client";

import * as Popover from "@radix-ui/react-popover";
import { useEffect, useRef, type CSSProperties, type MouseEvent, type PointerEvent } from "react";
import { cn } from "@/lib/cn";
import type { Annotation, DesignImage, Point } from "@/lib/critique/types";
import { AnnotationComposer } from "./annotation-composer";
import { percent, PIN_ANCHOR, PinMark, pinPosition } from "./pin-mark";

/** "fit" ajusta el diseño al ancho disponible; un número es escala sobre el tamaño natural. */
export type Zoom = "fit" | number;

type CritiqueCanvasProps = {
  design: DesignImage;
  annotations: Annotation[];
  zoom: Zoom;
  draft: Point | null;
  activeId: string | null;
  hoveredId: string | null;
  onPlace: (point: Point) => void;
  onActivate: (id: string) => void;
  onHover: (id: string | null) => void;
  onDraftSubmit: (body: string) => void;
  onEditSubmit: (id: string, body: string) => void;
  onToggleStatus: (id: string) => void;
  onRemove: (id: string) => void;
  onClose: () => void;
};

const TICKS = Array.from({ length: 21 }, (_, index) => index * 5);

type Axis = "x" | "y";

/**
 * Regla en % del diseño. Escala con él, así que una marca en la regla y un pin en el diseño
 * comparten la misma coordenada a cualquier zoom.
 */
function Ruler({ axis, focus }: { axis: Axis; focus: number | null }) {
  const horizontal = axis === "x";
  const along = (value: number): CSSProperties => (horizontal ? { left: `${value}%` } : { top: `${value}%` });
  const cursorVar = horizontal ? "var(--cx)" : "var(--cy)";

  return (
    <div
      aria-hidden
      className={cn(
        "relative z-(--z-pin-active) bg-desk select-none",
        horizontal ? "sticky top-0 h-ruler" : "sticky left-0 w-ruler",
      )}
    >
      {TICKS.map((tick) => {
        const major = tick % 25 === 0;
        return (
          <span key={tick}>
            <span
              style={along(tick)}
              className={cn(
                "absolute",
                horizontal ? "bottom-0 w-px -translate-x-1/2" : "right-0 h-px -translate-y-1/2",
                horizontal ? (major ? "h-2.5" : "h-1") : major ? "w-2.5" : "w-1",
                major ? "bg-ink-500" : "bg-ink-700",
              )}
            />
            {major && (focus === null || Math.abs(focus * 100 - tick) > (horizontal ? 3 : 1.5)) && (
              <span
                style={along(tick)}
                className={cn(
                  "absolute type-meta text-muted",
                  horizontal ? "top-1" : "right-3.5",
                  horizontal &&
                    (tick === 0 ? "translate-x-0.5" : tick === 100 ? "-translate-x-full" : "-translate-x-1/2"),
                  !horizontal && (tick === 0 ? "translate-y-0" : tick === 100 ? "-translate-y-full" : "-translate-y-1/2"),
                )}
              >
                {tick}
              </span>
            )}
          </span>
        );
      })}

      {/* Cursor: posición y valor los escribe el lienzo directamente en el DOM, sin re-render. */}
      <span
        style={horizontal ? { left: cursorVar } : { top: cursorVar }}
        className={cn(
          "absolute bg-text opacity-0 group-data-[cursor=on]/frame:opacity-100",
          horizontal ? "inset-y-0 w-px" : "inset-x-0 h-px",
        )}
      />
      <span
        data-readout={axis}
        style={horizontal ? { left: cursorVar } : { top: cursorVar }}
        className={cn(
          "absolute rounded-xs bg-text px-1 type-meta text-stage-ink opacity-0 group-data-[cursor=on]/frame:opacity-100",
          horizontal ? "top-1 -translate-x-1/2" : "right-1 -translate-y-1/2",
        )}
      />

      {/* Coordenada del pin abierto o señalado en el registro */}
      {focus !== null && (
        <>
          <span
            style={along(focus * 100)}
            className={cn("absolute bg-mark", horizontal ? "inset-y-0 w-px" : "inset-x-0 h-px")}
          />
          <span
            style={along(focus * 100)}
            className={cn(
              "absolute rounded-xs bg-mark px-1 type-meta text-on-mark group-data-[cursor=on]/frame:opacity-0",
              horizontal ? "top-1 -translate-x-1/2" : "right-1 -translate-y-1/2",
            )}
          >
            {percent(focus)}
          </span>
        </>
      )}
    </div>
  );
}

/**
 * El escenario: la única zona iluminada, con reglas en % en dos bordes.
 * Click sobre el diseño → pin nuevo. Los pins se anclan por la punta en % del diseño
 * y mantienen tamaño fijo a cualquier zoom.
 */
export function CritiqueCanvas({
  design,
  annotations,
  zoom,
  draft,
  activeId,
  hoveredId,
  onPlace,
  onActivate,
  onHover,
  onDraftSubmit,
  onEditSubmit,
  onToggleStatus,
  onRemove,
  onClose,
}: CritiqueCanvasProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  /** Un click que cierra el composer no debe crear, además, un pin nuevo. */
  const swallowNextClick = useRef(false);

  const composerOpen = draft !== null || activeId !== null;
  const focused = draft ?? annotations.find((annotation) => annotation.id === (activeId ?? hoveredId)) ?? null;

  // Al activar una crítica desde el registro, trae su pin a la vista.
  useEffect(() => {
    if (!activeId) return;
    sheetRef.current
      ?.querySelector(`[data-pin-id="${activeId}"]`)
      ?.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
  }, [activeId]);

  function relativePoint(event: { clientX: number; clientY: number }): Point {
    const rect = sheetRef.current!.getBoundingClientRect();
    return {
      x: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
      y: Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)),
    };
  }

  function trackCursor(event: PointerEvent<HTMLDivElement>) {
    const frame = frameRef.current;
    if (!frame || event.pointerType !== "mouse") return;
    const { x, y } = relativePoint(event);
    frame.style.setProperty("--cx", `${x * 100}%`);
    frame.style.setProperty("--cy", `${y * 100}%`);
    frame.dataset.cursor = "on";
    const [readoutX, readoutY] = frame.querySelectorAll<HTMLElement>("[data-readout]");
    readoutX.textContent = percent(x);
    readoutY.textContent = percent(y);
  }

  function handleSheetClick(event: MouseEvent<HTMLDivElement>) {
    if (swallowNextClick.current) {
      swallowNextClick.current = false;
      return;
    }
    if (composerOpen) {
      onClose();
      return;
    }
    onPlace(relativePoint(event));
  }

  function handleOutsidePress(target: EventTarget | null) {
    if (target instanceof Node && sheetRef.current?.contains(target)) swallowNextClick.current = true;
  }

  const frameStyle: CSSProperties =
    zoom === "fit"
      ? { width: "100%", maxWidth: `calc(${design.width}px + var(--spacing-ruler))` }
      : { width: `calc(${Math.round(design.width * zoom)}px + var(--spacing-ruler))` };

  return (
    <div className="h-full overflow-auto overscroll-contain bg-desk" aria-label="Diseño">
      <div className="flex min-h-full min-w-fit items-start justify-center pt-4 pr-4 pb-16 pl-2 sm:pt-8 sm:pr-12 sm:pb-24 sm:pl-8">
        <div
          ref={frameRef}
          style={frameStyle}
          className="group/frame grid shrink-0 grid-cols-[var(--spacing-ruler)_minmax(0,1fr)] grid-rows-[var(--spacing-ruler)_auto]"
        >
          <div aria-hidden className="sticky top-0 left-0 z-(--z-overlay) grid place-items-center bg-desk">
            <span className="type-meta text-muted">%</span>
          </div>
          <Ruler axis="x" focus={focused?.x ?? null} />
          <Ruler axis="y" focus={focused?.y ?? null} />

          <div
            ref={sheetRef}
            onClick={handleSheetClick}
            onPointerMove={trackCursor}
            onPointerLeave={() => frameRef.current && (frameRef.current.dataset.cursor = "off")}
            className="relative isolate cursor-crosshair rounded-xs bg-stage shadow-sheet"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- data URL local; next/image no aporta nada aquí */}
            <img
              src={design.src}
              alt={`Diseño en revisión: ${design.name}`}
              width={design.width}
              height={design.height}
              draggable={false}
              className="block h-auto w-full rounded-xs select-none"
            />

            {annotations.map((annotation, index) => {
              const isActive = annotation.id === activeId;
              const isLit = isActive || annotation.id === hoveredId;
              const pin = (
                <button
                  key={annotation.id}
                  type="button"
                  data-pin-id={annotation.id}
                  style={pinPosition(annotation)}
                  onClick={(event) => {
                    event.stopPropagation();
                    swallowNextClick.current = false;
                    if (!isActive) onActivate(annotation.id);
                  }}
                  onMouseEnter={() => onHover(annotation.id)}
                  onMouseLeave={() => onHover(null)}
                  aria-label={`Crítica ${index + 1}${annotation.status === "resolved" ? " (resuelta)" : ""}: ${annotation.body}`}
                  aria-expanded={isActive}
                  className={cn(
                    PIN_ANCHOR,
                    "cursor-pointer rounded-pin",
                    isLit ? "z-(--z-pin-active)" : "z-(--z-pin)",
                  )}
                >
                  <PinMark number={index + 1} status={annotation.status} active={isLit} />
                </button>
              );

              if (!isActive) return pin;

              return (
                <Popover.Root key={annotation.id} open onOpenChange={(open) => !open && onClose()}>
                  <Popover.Anchor asChild>{pin}</Popover.Anchor>
                  <Popover.Portal>
                    <AnnotationComposer
                      number={index + 1}
                      point={annotation}
                      initialBody={annotation.body}
                      status={annotation.status}
                      onSubmit={(body) => onEditSubmit(annotation.id, body)}
                      onCancel={onClose}
                      onToggleStatus={() => onToggleStatus(annotation.id)}
                      onRemove={() => onRemove(annotation.id)}
                      onOutsideCanvasPress={handleOutsidePress}
                    />
                  </Popover.Portal>
                </Popover.Root>
              );
            })}

            {draft && (
              <Popover.Root open onOpenChange={(open) => !open && onClose()}>
                <Popover.Anchor asChild>
                  <span style={pinPosition(draft)} className={cn(PIN_ANCHOR, "z-(--z-pin-active)")}>
                    <PinMark number={annotations.length + 1} draft />
                  </span>
                </Popover.Anchor>
                <Popover.Portal>
                  <AnnotationComposer
                    number={annotations.length + 1}
                    point={draft}
                    onSubmit={onDraftSubmit}
                    onCancel={onClose}
                    onOutsideCanvasPress={handleOutsidePress}
                  />
                </Popover.Portal>
              </Popover.Root>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
