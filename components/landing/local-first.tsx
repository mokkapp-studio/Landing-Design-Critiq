import { HardDrive } from "lucide-react";

export function LocalFirst() {
  return (
    <section aria-labelledby="local-title" className="bg-stage text-stage-ink">
      <div className="mx-auto grid w-full max-w-page gap-8 px-4 py-24 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <HardDrive aria-hidden className="size-8 lg:col-span-1" strokeWidth={1.5} />
        <h2 id="local-title" className="type-title lg:col-span-5">
          Tu diseño no sale de tu navegador.
        </h2>
        <div className="max-w-prose space-y-4 text-lg lg:col-span-6">
          <p>
            Critiq guarda la imagen y las críticas en el almacenamiento local de este navegador. No hay cuentas ni
            servidores de por medio.
          </p>
          <p className="text-stage-muted">
            La otra cara: si borras los datos del navegador, o abres Critiq en otro equipo, el critique no estará ahí.
          </p>
        </div>
      </div>
    </section>
  );
}
