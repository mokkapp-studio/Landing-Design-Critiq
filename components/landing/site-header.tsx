import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { ButtonLink } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="mx-auto flex h-toolbar w-full max-w-page items-center justify-between px-4 sm:px-6">
      <Link href="/" aria-label="Critiq, inicio" className="rounded-sm">
        <Wordmark />
      </Link>
      <ButtonLink href="/critique" variant="line" size="sm">
        Abrir la mesa
      </ButtonLink>
    </header>
  );
}
