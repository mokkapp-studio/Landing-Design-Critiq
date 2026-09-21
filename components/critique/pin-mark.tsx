import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import type { AnnotationStatus, Point } from "@/lib/critique/types";

type PinMarkProps = {
  number: number;
  status?: AnnotationStatus;
  active?: boolean;
  draft?: boolean;
  className?: string;
};

/**
 * Coloca un pin sobre el diseño: la punta (esquina inferior izquierda) cae en la coordenada exacta,
 * así el pin nunca tapa el punto que señala. Úsalo junto a `PIN_ANCHOR`.
 */
export const pinPosition = (point: Point): CSSProperties => ({ left: `${point.x * 100}%`, top: `${point.y * 100}%` });

export const PIN_ANCHOR = "absolute -translate-y-full";

/** Número de crítica con dos cifras, como en el registro. */
export const pinLabel = (number: number) => String(number).padStart(2, "0");

/** Coordenada relativa como porcentaje con un decimal: 0.4213 → "42.1". */
export const percent = (value: number) => (value * 100).toFixed(1);

/**
 * Marca visual de un pin: lápiz graso con su número en Geist Mono.
 * Tamaño fijo (`size-pin`) a cualquier zoom. Resuelto = tachado, mismo color.
 * Es solo presentación; la interacción la aporta quien lo envuelve.
 */
export function PinMark({ number, status = "open", active = false, draft = false, className }: PinMarkProps) {
  const resolved = status === "resolved" && !draft;

  return (
    <span
      aria-hidden
      className={cn(
        "relative grid size-pin origin-bottom-left place-items-center rounded-pin text-xs type-numeral shadow-pin ring-2",
        "transition-[background-color,scale] duration-(--duration-fast) ease-(--ease-out)",
        draft ? "bg-light-0 text-mark ring-mark" : "bg-mark text-on-mark ring-light-0",
        active && !draft && "scale-115 bg-mark-active",
        className,
      )}
    >
      <span className={cn(resolved && "line-through decoration-2")}>{number}</span>
    </span>
  );
}
