import { ArrowRight } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { ButtonLink } from "@/components/ui/button";

export function Closing() {
  return (
    <>
      <section aria-labelledby="closing-title" className="mx-auto w-full max-w-page px-4 py-32 sm:px-6">
        <h2 id="closing-title" className="max-w-3xl type-title">
          Revisa tu próxima landing antes de que la vea nadie más.
        </h2>
        <ButtonLink href="/critique" variant="lit" size="lg" className="mt-10">
          Empezar un critique
          <ArrowRight aria-hidden className="size-4" />
        </ButtonLink>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-page flex-wrap items-center justify-between gap-4 px-4 py-8 sm:px-6">
          <Wordmark className="text-lg" />
          <p className="text-sm text-muted">Crítica de diseño para landings.</p>
        </div>
      </footer>
    </>
  );
}
