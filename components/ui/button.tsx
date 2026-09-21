import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/**
 * lit    → acción primaria "encendida": relleno de luz sobre el escritorio.
 * line   → acción secundaria: relleno tonal de tinta, sin contorno.
 * quiet  → acción de barra de herramientas: solo texto/icono.
 */
type Variant = "lit" | "line" | "quiet";
type Size = "sm" | "md" | "lg" | "icon";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium select-none " +
  "transition-colors duration-(--duration-fast) ease-(--ease-out) " +
  "disabled:pointer-events-none disabled:text-faint";

const variants: Record<Variant, string> = {
  lit: "bg-action text-stage-ink hover:bg-action-hover disabled:bg-raised",
  line: "bg-raised text-text hover:bg-ink-700 disabled:bg-surface",
  quiet: "text-ink-300 hover:bg-raised hover:text-text",
};

const sizes: Record<Size, string> = {
  sm: "h-8 rounded-sm px-3 text-sm",
  md: "h-10 rounded-sm px-4 text-sm",
  lg: "h-12 rounded-sm px-6 text-base",
  icon: "size-8 rounded-sm",
};

type StyleProps = { variant?: Variant; size?: Size };

export function buttonClasses({ variant = "line", size = "md" }: StyleProps = {}, className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({ variant, size, className, type = "button", ...props }: ComponentProps<"button"> & StyleProps) {
  return <button type={type} className={buttonClasses({ variant, size }, className)} {...props} />;
}

export function ButtonLink({ variant, size, className, ...props }: ComponentProps<typeof Link> & StyleProps) {
  return <Link className={buttonClasses({ variant, size }, className)} {...props} />;
}
