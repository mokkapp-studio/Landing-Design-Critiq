import { PinMark } from "@/components/critique/pin-mark";

const STEPS = [
  {
    title: "Sube el diseño",
    body: "Arrastra una captura o export de tu landing. PNG, JPG, WEBP, GIF o SVG.",
  },
  {
    title: "Marca el problema",
    body: "Haz click donde algo falla. Aparece un pin numerado y escribes la crítica ahí mismo.",
  },
  {
    title: "Repasa y resuelve",
    body: "El registro lista cada crítica en orden. Táchala como resuelta cuando corrijas el diseño.",
  },
] as const;

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="border-t border-line">
      <div className="mx-auto grid w-full max-w-page gap-12 px-4 py-24 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <h2 id="how-title" className="type-title lg:col-span-4">
          Tres gestos. Ninguna configuración.
        </h2>
        <ol className="grid gap-10 sm:grid-cols-3 sm:gap-0 lg:col-span-8">
          {STEPS.map((step, index) => (
            <li key={step.title} className="sm:border-l sm:border-line sm:px-6 sm:first:border-l-0 sm:first:pl-0">
              <PinMark number={index + 1} />
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-base text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
