import { PIN_ANCHOR, PinMark, pinLabel, pinPosition } from "@/components/critique/pin-mark";

/**
 * Demostración del mecanismo: una landing ficticia sobre la mesa de luz,
 * ya marcada, y el registro con esas mismas críticas.
 * Todo el contenido es sintético y se rotula como tal.
 */

const DEMO_CRITIQUES = [
  {
    x: 0.06,
    y: 0.22,
    body: "El titular no dice qué hace el producto. Nombra el trabajo que resuelve, no la ambición.",
  },
  {
    x: 0.3,
    y: 0.62,
    body: "Dos CTAs con el mismo peso. ¿Cuál es la acción principal?",
  },
  {
    x: 0.78,
    y: 0.86,
    body: "Logos sin contexto: falta una línea que explique quién los usa y para qué.",
  },
] as const;

function SampleLanding() {
  return (
    <div
      role="img"
      aria-label="Landing ficticia de un producto llamado Nimbo: titular genérico, dos botones iguales y una fila de logos."
      className="relative aspect-[16/10] w-full overflow-hidden rounded-xs bg-light-0 text-stage-ink"
    >
      <div aria-hidden className="flex h-full flex-col px-[6%] py-[4%]">
        <div className="flex items-center justify-between text-[clamp(0.5rem,1.1vw,0.75rem)]">
          <span className="font-bold tracking-(--tracking-display)">Nimbo</span>
          <span className="flex gap-[1.5em] text-stage-muted">
            <span>Producto</span>
            <span>Precios</span>
            <span>Blog</span>
          </span>
        </div>

        <div className="mt-[7%] max-w-[70%]">
          <p className="text-[clamp(1rem,3.1vw,2.1rem)] leading-[1.05] font-bold tracking-(--tracking-display)">
            La plataforma que impulsa tu crecimiento
          </p>
          <p className="mt-[3%] text-[clamp(0.5rem,1.1vw,0.8rem)] text-stage-muted">
            Soluciones innovadoras para equipos modernos que quieren llegar más lejos.
          </p>
          <div className="mt-[5%] flex gap-[3%] text-[clamp(0.45rem,1vw,0.7rem)] font-semibold">
            <span className="rounded-xs bg-stage-ink px-[1.2em] py-[0.6em] text-light-0">Empezar gratis</span>
            <span className="rounded-xs bg-stage-ink px-[1.2em] py-[0.6em] text-light-0">Pedir una demo</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-[4%] border-t border-stage-line pt-[3%]">
          {[18, 14, 20, 12, 16].map((width, index) => (
            <span key={index} className="h-[0.6rem] rounded-full bg-stage-line" style={{ width: `${width}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function LightTableDemo() {
  return (
    <figure className="w-full">
      <figcaption className="mb-3 flex items-center justify-between type-meta text-muted">
        <span>Diseño de ejemplo</span>
        <span>Ficticio</span>
      </figcaption>

      <div className="rounded-t-md bg-desk p-4 sm:p-6">
        <div className="relative shadow-sheet">
          <SampleLanding />
          {DEMO_CRITIQUES.map((critique, index) => (
            <span key={critique.body} className={PIN_ANCHOR} style={pinPosition(critique)}>
              <PinMark number={index + 1} active={index === 1} />
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-b-md bg-surface pb-2">
        <p className="px-5 pt-4 pb-2 text-sm font-semibold text-text">Registro</p>
        <ol>
          {DEMO_CRITIQUES.map((critique, index) => (
            <li key={critique.body} className={index === 1 ? "flex gap-4 bg-raised px-5 py-3" : "flex gap-4 px-5 py-3"}>
              <span className="w-5 shrink-0 type-numeral text-sm text-mark-text">{pinLabel(index + 1)}</span>
              <span className="type-annotation text-ink-200">{critique.body}</span>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
