import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { LightTableDemo } from "./light-table-demo";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto grid w-full max-w-page gap-12 px-4 pt-10 pb-24 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:pt-16"
    >
      <div className="lg:col-span-5 lg:pt-8">
        <h1 id="hero-title" className="type-display">
          Marca lo que falla en tu landing.
        </h1>
        <p className="mt-6 max-w-prose text-lg text-ink-300">
          Sube una captura, haz click donde algo no funciona y escribe por qué. Cada crítica queda como un pin
          numerado sobre el diseño, y todas juntas en un registro que resuelves en orden.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <ButtonLink href="/critique" variant="lit" size="lg">
            Empezar un critique
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
          <p className="text-sm text-muted">Sin cuenta. Todo queda en tu navegador.</p>
        </div>
      </div>

      <div className="lg:col-span-7">
        <LightTableDemo />
      </div>
    </section>
  );
}
