---
name: Critiq
description: Crítica de diseño para landings sobre una mesa de luz; pins numerados de lápiz graso anclados a coordenadas exactas.
colors:
  bg: "#16171a"
  desk: "#0c0d0f"
  surface: "#1b1c20"
  raised: "#222328"
  line: "#2d2f35"
  line-strong: "#3e4148"
  text: "#eceeec"
  muted: "#9195a0"
  faint: "#62666e"
  stage: "#f4f5f2"
  stage-line: "#dcdfd9"
  stage-muted: "#686d65"
  stage-ink: "#16171a"
  action: "#f4f5f2"
  action-hover: "#fbfcfa"
  mark: "#d92f24"
  mark-active: "#b8261d"
  mark-text: "#f06455"
  on-mark: "#fbfcfa"
  warn: "#e5ad35"
  focus: "#f4f5f2"
  ink-700: "#2d2f35"
  ink-300: "#b6b9c0"
  ink-200: "#d6d8dc"
  light-0: "#fbfcfa"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1.5rem + 4vw, 5rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 650
    lineHeight: "2.5rem"
    letterSpacing: "-0.035em"
  body-landing:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: "1.75rem"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: "1.5rem"
  control:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: "1.25rem"
  annotation:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: "1.25rem"
    letterSpacing: "-0.01em"
  numeral:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontWeight: 500
    letterSpacing: "0"
    fontFeature: "\"tnum\" 1"
  meta:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: "1rem"
    letterSpacing: "0"
    fontFeature: "\"tnum\" 1"
rounded:
  xs: "2px"
  sm: "4px"
  md: "6px"
  full: "9999px"
  pin: "9999px 9999px 9999px 2px"
spacing:
  base: "0.25rem"
  toolbar: "3.5rem"
  panel: "22rem"
  pin: "1.75rem"
  ruler: "1.75rem"
  page: "76rem"
  prose: "36rem"
components:
  button-lit:
    backgroundColor: "{colors.action}"
    textColor: "{colors.stage-ink}"
    typography: "{typography.control}"
    rounded: "{rounded.sm}"
    height: "40px"
    padding: "0 16px"
  button-lit-hover:
    backgroundColor: "{colors.action-hover}"
  button-line:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.text}"
    typography: "{typography.control}"
    rounded: "{rounded.sm}"
    height: "40px"
    padding: "0 16px"
  button-line-hover:
    backgroundColor: "{colors.ink-700}"
  button-quiet:
    textColor: "{colors.ink-300}"
    typography: "{typography.control}"
    rounded: "{rounded.sm}"
    height: "32px"
    padding: "0 12px"
  button-quiet-hover:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.text}"
  pin:
    backgroundColor: "{colors.mark}"
    textColor: "{colors.on-mark}"
    typography: "{typography.numeral}"
    rounded: "{rounded.pin}"
    size: "{spacing.pin}"
  pin-active:
    backgroundColor: "{colors.mark-active}"
    textColor: "{colors.on-mark}"
  pin-draft:
    backgroundColor: "{colors.light-0}"
    textColor: "{colors.mark}"
  composer:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.text}"
    typography: "{typography.annotation}"
    rounded: "{rounded.md}"
    width: "22rem"
  registro-row-active:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.text}"
    typography: "{typography.annotation}"
    padding: "14px 12px 14px 20px"
  ruler-readout:
    backgroundColor: "{colors.text}"
    textColor: "{colors.stage-ink}"
    typography: "{typography.meta}"
    rounded: "{rounded.xs}"
    padding: "0 4px"
  ruler-readout-pin:
    backgroundColor: "{colors.mark}"
    textColor: "{colors.on-mark}"
  toolbar:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    height: "{spacing.toolbar}"
---

# Design System: Critiq

> **Fuente de verdad de los valores:** [`tokens.md`](tokens.md). `app/globals.css` lo refleja y `npm run tokens:check` verifica que coinciden. Este documento explica *cómo y dónde* se aplican esos tokens; si alguna vez difiere de `tokens.md`, manda `tokens.md`. Los colores del frontmatter son los valores resueltos de los roles semánticos (`--color-bg` → `#16171a`, etc.).

## Overview

**Creative North Star: "La mesa de luz"**

Critiq trata cada diseño como una hoja de contactos sobre la mesa de luz de un editor fotográfico. La única zona iluminada es el diseño en revisión (el escenario, `stage`); todo lo demás es escritorio grafito en penumbra (`bg`, `desk`, `surface`). La interfaz se retira hacia la sombra para que el diseño y sus marcas ocupen el protagonismo. Sobre la hoja solo escribe una tinta: el lápiz graso rojo, y solo para marcar críticas.

El sistema es denso, preciso y de instrumento. La interfaz habla en Geist Sans; todo lo que es anotación (números de pin, coordenadas, texto de crítica, medidas, zoom, recuentos) habla en Geist Mono, como una etiqueta escrita a mano sobre un contacto. El lienzo tiene reglas en % con lectura del cursor y del pin activo; los pins tienen tamaño fijo a cualquier zoom y se anclan por la punta a la coordenada exacta. El chrome es fijo; el escenario es la única zona viva.

Rechazo confirmado: el lienzo gris con panel blanco del SaaS de feedback.

**Key Characteristics:**
- Escritorio grafito oscuro con un único escenario claro retroiluminado.
- Una sola tinta de señal (lápiz graso rojo) reservada a las marcas de crítica.
- Acciones primarias "encendidas": relleno de luz, texto grafito.
- Geist Sans para la interfaz, Geist Mono para toda anotación y medida.
- Zonas separadas por tono, no por bordes; radios pequeños de hoja.
- Estado como marca: resuelto = tachado, mismo color.
- Pins anclados por la punta, tamaño fijo; reglas en % sobre el escenario.

## Colors

Neutros grafito ligeramente fríos, un escenario de luz casi blanca y una única tinta roja de lápiz graso; los componentes usan roles semánticos, nunca primitivos, salvo en la marca y en los matices de texto documentados abajo.

### Primary
- **Lápiz graso** (`--color-mark`, sobre `--color-marker-500`): relleno del pin. Es la tinta de la crítica y nada más.
- **Lápiz graso apretado** (`--color-mark-active`, sobre `--color-marker-600`): pin activo, en hover o señalado desde el registro, y el pin del ejemplo destacado en la landing.
- **Trazo de lápiz sobre tinta** (`--color-mark-text`, sobre `--color-marker-400`): número de crítica en texto (`01`, `02`) en el registro y en el composer; color del tachado de un número resuelto; punto del logotipo (vía `mark`).
- **Luz sobre marca** (`--color-on-mark`): número dentro del pin y lectura de coordenada sobre fondo `mark` en las reglas.

### Secondary
- **Luz encendida** (`--color-action` / `--color-action-hover`): la acción primaria es un trozo de escenario: relleno de luz con texto `stage-ink`. En hover sube a `light-0`. Una acción encendida por zona.

### Neutral
- **Escritorio hundido** (`--color-desk`): el área del lienzo alrededor del diseño, el fondo de las reglas, la mesa vacía del dropzone y el velo (`desk` al 80 %) bajo los diálogos.
- **Escritorio** (`--color-bg`): fondo de página, barra de herramientas y registro.
- **Superficie** (`--color-surface`): pie del composer, fila en hover del registro, grupo de zoom, banda de error y hoja de registro de la demo.
- **Elevado** (`--color-raised`): composer, diálogos, fila activa del registro, botón `line` y hover de los `quiet`.
- **Línea** (`--color-line`) / **Línea fuerte** (`--color-line-strong`): filetes finos en flujos de lectura largos (divisores de sección de la landing) y barra de scroll. Nunca para encerrar una zona.
- **Texto** (`--color-text`) · **Apagado** (`--color-muted`, ≥ 4.5:1 sobre `bg`, `surface` y `raised`) · **Tenue** (`--color-faint`, solo deshabilitado y decoración, nunca texto legible).
- **Matices de tinta en texto**: `ink-300` para texto secundario sobre superficies elevadas y el color en reposo de los botones `quiet`; `ink-200` para el cuerpo de una crítica abierta en reposo (sube a `text` al iluminarse).
- **Escenario** (`--color-stage`), **línea de escenario** (`--color-stage-line`), **texto apagado de escenario** (`--color-stage-muted`, 4.8:1) y **tinta sobre escenario** (`--color-stage-ink`): todo lo que vive dentro de la zona iluminada, incluida la sección "local primero" de la landing, que es un escenario a sangre.
- **Aviso** (`--color-warn`): errores de validación y avisos de persistencia, siempre como texto e icono sobre tinta.
- **Foco** (`--color-focus`): anillo de foco de luz, 2px con 2px de separación.

### Named Rules
**La Regla del Lápiz Graso.** El rojo (`mark`, `mark-active`, `mark-text`) solo marca críticas: pins, números de crítica, la coordenada del pin activo en las reglas y el punto del logotipo. Nunca botones, enlaces, errores ni decoración. Si algo rojo no es una crítica, está mal.

**La Regla de la Única Luz.** Lo claro es el escenario. Solo el diseño revisado, la acción encendida, las lecturas del cursor y las secciones que *son* escenario usan la familia `light`/`stage`. Ningún panel de interfaz es claro.

**La Regla del Error Ámbar.** Los errores y avisos usan `warn`, nunca `mark`: el rojo ya significa "crítica".

## Typography

**Display Font:** Geist Sans (con `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** Geist Sans
**Label/Mono Font:** Geist Mono (con `ui-monospace, SFMono-Regular, Menlo, monospace`)

**Character:** Dos voces de una misma familia. Geist Sans es la interfaz: neutra, compacta, con titulares muy apretados. Geist Mono es la mano del revisor: cada número, coordenada y crítica se lee como una anotación medida, no como prosa de interfaz. Las familias llegan por `next/font` como `--font-geist-sans` y `--font-geist-mono`, y se consumen solo a través de `--font-sans` y `--font-mono`.

### Hierarchy
- **Display** (700, `--text-display`, line-height 0.98, `--tracking-display`, `text-wrap: balance`): solo el titular del hero (utilidad `type-display`).
- **Title** (650, `--text-2xl` / 2.5rem, `--tracking-display`, balance): titulares de sección de la landing y el título del dropzone (utilidad `type-title`).
- **Body landing** (400, `--text-lg` / 1.75rem): párrafos de la landing, limitados a `--container-prose`.
- **Body** (400, `--text-base` / 1.5rem): cuerpo de interfaz; valor por defecto del `body`.
- **Control** (500–600, `--text-sm` / 1.25rem): botones, filas, nombre del archivo, rótulos de zona ("Registro" en `text-sm` semibold, con su nombre literal y en mayúscula inicial).
- **Annotation** (Geist Mono 400, `--text-sm`, `--tracking-mono`): el texto de cada crítica en el registro, el composer y la demo (utilidad `type-annotation`).
- **Numeral** (Geist Mono 500, cifras tabulares, tracking 0): número de pin, número de crítica con dos cifras (`01`), recuentos (utilidad `type-numeral`).
- **Meta** (Geist Mono 400, `--text-xs` / 1rem, cifras tabulares): coordenadas `x 42.1 · y 18.0`, dimensiones `1440 × 3200`, zoom, marcas de las reglas, atajos, formatos admitidos (utilidad `type-meta`).

`--text-xl` existe en la escala para subtítulos pero la construcción actual no lo usa. Lo mismo `type-label` (`--text-xs`, 600, `--tracking-label`, mayúsculas): reservado en `tokens.md` para rótulos de zona en mayúsculas, sin uso hoy; si se usa, rotula una zona, nunca encabeza un titular.

### Named Rules
**La Regla de la Anotación.** Si es un número, una coordenada, una medida o el texto de una crítica, va en Geist Mono (`type-numeral`, `type-annotation`, `type-meta`). Si es interfaz, va en Geist Sans. Nunca al revés.

**La Regla del Tamaño, Peso y Tracking.** Geist no tiene eje de ancho: la jerarquía se construye solo con tamaño, peso y `--tracking-*`. No se simulan variantes condensadas.

**La Regla del Rótulo Literal.** Cada zona se rotula con su nombre literal ("Registro", "Diseño de ejemplo", "Ficticio") en tamaño de control o meta. No hay antetítulos ni kickers sobre los titulares.

## Layout

Base de 4px (`--spacing`); pasos permitidos `1 2 3 4 5 6 8 10 12 16 20 24 32`.

**Workspace (`/critique`):** columna a pantalla completa (`h-dvh`). Barra de herramientas fija de `--spacing-toolbar` arriba; debajo, el lienzo y el registro. En `lg` el registro es una columna fija de `--spacing-panel` a la derecha; por debajo, el lienzo ocupa la parte superior y el registro el 40 % inferior. El chrome no se desplaza; solo el lienzo hace scroll y zoom.

**Lienzo:** el escenario se enmarca en una rejilla con reglas pegajosas de `--spacing-ruler` en los bordes superior e izquierdo y un cuadrado `%` en la esquina. Las reglas escalan con el diseño: marcas cada 5 %, marcas mayores y cifras cada 25 %. Al mover el cursor aparece una línea y una lectura (`type-meta` sobre `text`); el pin abierto o señalado proyecta su coordenada en rojo sobre ambas reglas. Zoom: "Ajustar" al ancho o pasos `25 50 75 100 150 200 %`.

**Landing (`/`):** contenedor `--container-page` con márgenes de 16px (24px desde `sm`), rejilla de 12 columnas en `lg`. Hero 5/12 texto + 7/12 mesa de luz; en móvil, titular, CTA y después la mesa. Secciones con `py-24`; cierre con `py-32`.

**Densidad:** filas del registro con 14px verticales y 20px a la izquierda; cabeceras de zona de 56px (`h-14`), alineadas con la barra.

### Named Rules
**La Regla del Chrome Fijo.** El escenario es la única zona viva. Barra, registro y reglas no cambian de tamaño ni se mueven con el diseño.

## Elevation & Depth

Híbrido: la estructura de la interfaz es plana y se separa por tono (`desk` < `bg` < `surface` < `raised`); las sombras existen solo para objetos físicos que se separan del escritorio. Toda sombra tiene desplazamiento y desenfoque, sin sombras duras ni resplandores.

### Shadow Vocabulary
- **Hoja** (`--shadow-sheet`): el diseño sobre el escritorio, la mesa de la demo y el dropzone mientras arrastras un archivo.
- **Pin** (`--shadow-pin`): cada pin sobre el diseño, junto a su anillo de 2px en `light-0`.
- **Popover** (`--shadow-popover`): composer y diálogo de confirmación.

Capas: `--z-pin` para pins, `--z-pin-active` para el pin seleccionado y las reglas, `--z-overlay` para popovers, diálogos y la esquina de las reglas.

### Named Rules
**La Regla del Tono, no del Borde.** Las zonas (barra, lienzo, registro, cabecera y pie del composer, fila activa) se distinguen por escalón de tinta, no con contornos. `line` queda para filetes finos en flujos de lectura y marcas de registro, nunca para encerrar una tarjeta o una zona.

**La Regla del Objeto Físico.** Solo proyecta sombra lo que es un objeto sobre la mesa: la hoja, el pin y lo que flota sobre ellos. Los paneles no tienen sombra.

## Shapes

Esquinas de hoja: pequeñas y consistentes. `--radius-xs` para el diseño sobre el escenario, las lecturas de las reglas y chips; `--radius-sm` para botones, inputs y filas; `--radius-md` para composer, diálogos, dropzone y la mesa de la demo; `--radius-full` para puntos (el punto del logotipo).

El pin es la única silueta propia: `--radius-pin` redondea tres esquinas y deja la inferior izquierda casi recta (2px). Esa esquina es la punta y cae exactamente en la coordenada; el pin se coloca con su esquina superior izquierda en el punto y se desplaza su propia altura hacia arriba, y crece (`scale-115`) desde esa punta.

El dropzone vacío no tiene contorno: cuatro marcas de registro en las esquinas (20px, `ink-500`) delimitan el hueco de la hoja sobre la mesa.

### Named Rules
**La Regla de la Punta.** Un pin nunca tapa el punto que señala: siempre se ancla por la esquina inferior izquierda, a tamaño fijo `--spacing-pin`, sea cual sea el zoom.

## Components

### Buttons
Instrumento sobrio: sin contornos, sin sombras, transición de color `--duration-fast` con `--ease-out`.
- **Shape:** esquinas de control (`--radius-sm`). Tallas `sm` 32px / `md` 40px / `lg` 48px (texto `base`), `icon` 32×32.
- **Encendido (`lit`):** relleno `action`, texto `stage-ink`, peso 500; hover a `action-hover`. La acción principal de cada zona: "Empezar un critique", "Elegir imagen", "Añadir"/"Guardar", confirmar en diálogos.
- **Tonal (`line`):** relleno `raised`, texto `text`, sin contorno; hover a `ink-700`. Acciones secundarias ("Cambiar diseño", "Abrir la mesa").
- **Silencioso (`quiet`):** solo texto/icono `ink-300`; hover rellena `raised` y sube a `text`. Acciones de barra y de fila (resolver, reabrir, eliminar, zoom, cancelar).
- **Deshabilitado:** texto `faint`; `lit` baja a `raised`, `line` a `surface`.
- **Foco:** anillo global `focus` de 2px con 2px de separación.

### Pin (componente firma)
- Cuadrado de `--spacing-pin` con `--radius-pin`, número en `type-numeral` `text-xs`, `shadow-pin` y anillo de 2px `light-0`.
- **Abierto:** `mark` + `on-mark`. **Activo / señalado:** `mark-active` y `scale-115` desde la punta. **Borrador:** relleno `light-0`, número y anillo en `mark`.
- **Resuelto:** el número se tacha (grosor 2px); el color no cambia.

### Registro (lista de críticas)
- Zona en `bg` con cabecera "Registro" + recuento en `type-numeral` y resumen `abiertas / resueltas` en `type-meta`.
- Cada fila: número de dos cifras en `mark-text`, crítica en `type-annotation` (`ink-200`, sube a `text` al iluminarse, máximo 4 líneas), coordenadas `x · y` en `type-meta` `muted`.
- Hover: `surface`. Activa: `raised`. Acciones `quiet` visibles al hover/foco en escritorio, siempre visibles en táctil.
- Resuelta: número y texto en `muted` tachados; el tachado del número conserva `mark-text`.

### Composer (popover de crítica)
- `raised`, `--radius-md`, `--shadow-popover`, ancho `min(22rem, 100vw − 2rem)`, anclado arriba del pin, entrada `composer-in` (4px hacia arriba, 0.98 → 1) en `--duration-base`.
- Cabecera de 44px: número en `mark-text` + coordenadas en `type-meta`. Cuerpo: textarea transparente en `type-annotation`. Pie en `surface` con atajos (`Enter` guarda · `Esc` descarta) y botón `lit` `sm`.

### Reglas del lienzo
- Fondo `desk`, grosor `--spacing-ruler`. Marcas menores `ink-700`, mayores `ink-500`; cifras en `type-meta` `muted`.
- Lectura del cursor: pastilla `text` con `stage-ink`, `--radius-xs`. Coordenada del pin activo: línea y pastilla en `mark` con `on-mark`, con un decimal.

### Barra de herramientas
- `--spacing-toolbar` de alto, `bg`, sin borde inferior. Logotipo, nombre del archivo (`ink-300`) + dimensiones en `type-meta`, aviso en `warn`, grupo de zoom en `surface`, acciones `quiet` y `line` a la derecha.

### Diálogos
- `raised`, `--radius-md`, `--shadow-popover`, padding 24px, sobre velo `desk` al 80 %. Título `text-lg` semibold, descripción `text-sm` `ink-300`, acciones `quiet` + `lit` alineadas a la derecha.

### Logotipo
- "Critiq" en Geist Sans `text-lg` bold con `--tracking-display`, seguido del punto de lápiz graso (6px, `mark`, `--radius-full`).

## Do's and Don'ts

### Do:
- **Do** tomar todo valor de color, radio, sombra, tipo o movimiento de `tokens.md`; añadir un token ahí primero y después en `globals.css`.
- **Do** usar roles semánticos (`bg`, `surface`, `raised`, `muted`, `stage`, `action`, `mark`…) en componentes; primitivos solo para la marca y los matices de texto `ink-200`/`ink-300`.
- **Do** separar zonas por escalón de tono (`desk` → `bg` → `surface` → `raised`).
- **Do** escribir números, coordenadas, medidas y críticas en Geist Mono (`type-numeral`, `type-annotation`, `type-meta`) con cifras tabulares.
- **Do** anclar cada pin por la punta (`--radius-pin`, esquina inferior izquierda) a tamaño fijo `--spacing-pin`.
- **Do** expresar el estado resuelto como tachado, sin cambiar el rojo del pin.
- **Do** mostrar coordenadas como porcentaje con un decimal y números de crítica con dos cifras (`01`).
- **Do** rotular cada zona con su nombre literal.

### Don't:
- **Don't** usar el rojo de lápiz graso para botones, enlaces, errores ni decoración; los errores van en `warn`.
- **Don't** dar contorno a los botones secundarios; son tonales (`raised`).
- **Don't** encerrar zonas o tarjetas con bordes, ni anidar tarjetas.
- **Don't** hacer claro ningún panel de interfaz: lo claro es el escenario.
- **Don't** usar valores arbitrarios de color, radio o sombra (`bg-[#…]`, `rounded-[7px]`); los de layout sí se permiten.
- **Don't** escalar los pins con el zoom ni centrarlos sobre la coordenada.
- **Don't** poner antetítulos o kickers sobre los titulares.
- **Don't** confiar en la paleta o escalas por defecto de Tailwind: están desactivadas (`tracking-tight`, `text-gray-*` y similares no existen).
