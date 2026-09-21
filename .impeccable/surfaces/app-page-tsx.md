---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/critique/page.tsx"]
---

# Surface brief: Critiq (landing + workspace)

Scope: `/` landing (Persuade) and `/critique` workspace (Operate). Both live in one world.
Audience: diseñador revisando su propia landing antes de entregarla. Job: convertir una revisión en una lista ordenada de críticas ancladas al diseño.
Action: landing → "Empezar un critique" (/critique). Workspace → subir diseño, marcar, repasar.
Proof: la demostración del mecanismo (diseño de ejemplo marcado, sintético y rotulado como tal). Sin testimonios, métricas ni clientes.
Constraints: español; localStorage; sin pulido visual avanzado en esta fase (sin motion firmada aún).

## Direction contract

THESIS: El diseño se revisa como una hoja de contactos sobre una mesa de luz: la única zona iluminada es el diseño; todo lo demás es escritorio en penumbra. Rechaza el lienzo gris con panel blanco del SaaS de feedback.

OWN-WORLD: Escritorio grafito (#16171a) con escenario retroiluminado (#f4f5f2). Una sola tinta de señal: lápiz graso rojo, reservado a las marcas (pins, números). Acciones primarias "encendidas": relleno de luz, texto grafito. Geist Sans para la interfaz y Geist Mono para todo lo que es anotación (números de pin, coordenadas, texto de crítica, medidas); jerarquía por tamaño, peso y tracking. Zonas separadas por tono, sin bordes genéricos ni tarjetas anidadas. Radios pequeños de hoja. Estado como marca: resuelto = tachado, no cambio de tono. Chrome fijo; el escenario es la única zona viva; pins de tamaño fijo a cualquier zoom, anclados por la punta a la coordenada exacta; reglas en % sobre el escenario con lectura del cursor y del pin activo; cada zona rotulada con su nombre literal.

STORY: El visitante ve un diseño ya marcado con críticas numeradas y su registro; entiende que así se revisa aquí; hace click en "Empezar un critique" y en segundos tiene su propio diseño sobre la mesa.

FIRST VIEWPORT: Izquierda (5/12): titular condensado grande, una frase de mecanismo, CTA encendido + nota "Sin registro. Todo queda en tu navegador." Derecha (7/12): mesa de luz con una landing de ejemplo (sintética, rotulada) y 3 pins rojos; bajo ella, la hoja de registro con esas 3 críticas. Móvil: titular, CTA, luego la mesa.

FORM: Mesa de luz del editor fotográfico (hoja de contactos, lápiz graso, lupa); posición 5 de 7 en la lista ordenada; seed key e7ca6d76. Raises: estado como marca (banco de montaje), chrome fijo con una zona viva (consola CD-ROM), pins de tamaño fijo (diagrama de metro), rótulos literales (gramática industrial).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
