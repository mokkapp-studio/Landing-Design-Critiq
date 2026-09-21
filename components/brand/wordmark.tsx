import { cn } from "@/lib/cn";

/** Logotipo tipográfico: "Critiq" con el punto de lápiz graso como marca. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1 text-lg font-bold tracking-(--tracking-display)",
        className,
      )}
    >
      Critiq
      <span aria-hidden className="size-1.5 rounded-full bg-mark" />
    </span>
  );
}
