# Critiq — Design Tokens

Fuente de verdad de todos los tokens de diseño. `app/globals.css` declara **exactamente** estos nombres y valores dentro de sus bloques `@theme`; `npm run tokens:check` falla si difieren en cualquier dirección.

Reglas:

- Un token se añade aquí primero y luego en `globals.css`, nunca al revés.
- Tailwind expone cada token como utilidad (`bg-stage`, `text-muted`, `rounded-sm`, `shadow-sheet`) y como variable CSS (`var(--color-stage)`).
- La paleta por defecto de Tailwind está desactivada (`--color-*: initial`, etc.). Si una utilidad de color no existe aquí, no existe en el proyecto.
- Nada de valores arbitrarios de color, radio o sombra en componentes (`bg-[#...]`, `rounded-[7px]`). Los valores arbitrarios de layout (anchos puntuales, posiciones en %) están permitidos.

---

## 1. Color — primitivos

### Tinta (escritorio en penumbra)

Neutros grafito, levemente fríos. Forman todo lo que no es el diseño revisado.

| Token | Valor | Uso |
|---|---|---|
| `--color-ink-950` | `#0c0d0f` | Fondo hundido: el escritorio bajo el escenario |
| `--color-ink-900` | `#16171a` | Fondo de página y de la app |
| `--color-ink-850` | `#1b1c20` | Superficie: paneles, barra de herramientas |
| `--color-ink-800` | `#222328` | Superficie elevada: popovers, hover de filas |
| `--color-ink-700` | `#2d2f35` | Línea por defecto |
| `--color-ink-600` | `#3e4148` | Línea fuerte, bordes de controles |
| `--color-ink-500` | `#62666e` | Solo decorativo o deshabilitado (no texto) |
| `--color-ink-400` | `#9195a0` | Texto secundario |
| `--color-ink-300` | `#b6b9c0` | Texto secundario sobre superficies elevadas |
| `--color-ink-200` | `#d6d8dc` | Texto enfatizado suave |
| `--color-ink-100` | `#eceeec` | Texto principal |

### Luz (el escenario retroiluminado)

| Token | Valor | Uso |
|---|---|---|
| `--color-light-0` | `#fbfcfa` | Luz máxima: hover de acción primaria, número sobre marca |
| `--color-light-50` | `#f4f5f2` | Escenario y acción primaria "encendida" |
| `--color-light-200` | `#dcdfd9` | Regla/borde dentro del escenario |
| `--color-light-400` | `#686d65` | Texto secundario dentro del escenario |

### Marca (lápiz graso rojo)

Reservado para las marcas de crítica: pins, números, el punto del logotipo. Nunca botones, enlaces ni errores.

| Token | Valor | Uso |
|---|---|---|
| `--color-marker-400` | `#f06455` | Marca como texto o icono sobre tinta |
| `--color-marker-500` | `#d92f24` | Relleno de pin |
| `--color-marker-600` | `#b8261d` | Pin activo / presionado |

### Señal

| Token | Valor | Uso |
|---|---|---|
| `--color-warn-400` | `#e5ad35` | Avisos y errores de validación (texto/icono sobre tinta) |

---

## 2. Color — roles semánticos

Los componentes usan roles, no primitivos, salvo en la marca.

| Token | Valor | Uso |
|---|---|---|
| `--color-bg` | `var(--color-ink-900)` | Fondo base |
| `--color-desk` | `var(--color-ink-950)` | Área del lienzo alrededor del diseño |
| `--color-surface` | `var(--color-ink-850)` | Paneles y barras |
| `--color-raised` | `var(--color-ink-800)` | Popovers, filas en hover |
| `--color-line` | `var(--color-ink-700)` | Divisores y bordes por defecto |
| `--color-line-strong` | `var(--color-ink-600)` | Bordes de controles, divisores enfatizados |
| `--color-text` | `var(--color-ink-100)` | Texto principal |
| `--color-muted` | `var(--color-ink-400)` | Texto secundario (≥ 4.5:1 sobre `bg` y `surface`) |
| `--color-faint` | `var(--color-ink-500)` | Deshabilitado, decoración. Nunca texto legible |
| `--color-stage` | `var(--color-light-50)` | Escenario iluminado |
| `--color-stage-line` | `var(--color-light-200)` | Líneas dentro del escenario |
| `--color-stage-muted` | `var(--color-light-400)` | Texto secundario dentro del escenario (4.8:1 sobre `stage`) |
| `--color-stage-ink` | `var(--color-ink-900)` | Texto sobre el escenario o la acción encendida |
| `--color-action` | `var(--color-light-50)` | Botón primario encendido |
| `--color-action-hover` | `var(--color-light-0)` | Botón primario en hover |
| `--color-mark` | `var(--color-marker-500)` | Pin |
| `--color-mark-active` | `var(--color-marker-600)` | Pin seleccionado |
| `--color-mark-text` | `var(--color-marker-400)` | Número de crítica en texto |
| `--color-on-mark` | `var(--color-light-0)` | Número sobre el pin |
| `--color-warn` | `var(--color-warn-400)` | Aviso |
| `--color-focus` | `var(--color-light-50)` | Anillo de foco |

Contraste verificado (WCAG): `text` sobre `bg` 15.4:1 · `muted` sobre `bg` 6.0:1 · `muted` sobre `surface` 5.7:1 · `muted` sobre `raised` 5.2:1 · `on-mark` sobre `mark` 4.7:1 · `mark-text` sobre `bg` 5.7:1 · `stage-ink` sobre `stage` 16.4:1 · `stage-muted` sobre `stage` 4.8:1 · `warn` sobre `surface` 8.4:1.

---

## 3. Tipografía

Dos familias de un mismo sistema: **Geist Sans** para la interfaz y **Geist Mono** para todo lo que es anotación: números de pin, coordenadas, texto de las críticas y metadatos medibles (dimensiones, zoom, recuentos). La jerarquía se construye con tamaño, peso y tracking; Geist no tiene eje de ancho.

| Token | Valor | Uso |
|---|---|---|
| `--font-sans` | `var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif` | Toda la interfaz |
| `--font-mono` | `var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace` | Anotaciones, pins, coordenadas, medidas |

### Escala

| Token | Valor | Line-height (`--text-*--line-height`) | Uso |
|---|---|---|---|
| `--text-xs` | `0.75rem` | `1rem` | Metadatos, atajos |
| `--text-sm` | `0.8125rem` | `1.25rem` | Controles, filas de registro |
| `--text-base` | `0.9375rem` | `1.5rem` | Cuerpo de interfaz |
| `--text-lg` | `1.125rem` | `1.75rem` | Cuerpo de landing |
| `--text-xl` | `1.5rem` | `1.875rem` | Subtítulos |
| `--text-2xl` | `2.25rem` | `2.5rem` | Titulares de sección |
| `--text-display` | `clamp(2.75rem, 1.5rem + 4vw, 5rem)` | `0.98` | Titular del hero |

### Tracking

| Token | Valor | Uso |
|---|---|---|
| `--tracking-display` | `-0.035em` | Display y titulares |
| `--tracking-mono` | `-0.01em` | Texto de anotación en Geist Mono |
| `--tracking-label` | `0.06em` | Rótulos de zona en mayúsculas |

---

## 4. Espaciado

Base de 4px. Tailwind multiplica `--spacing` (`p-4` = 16px). Pasos permitidos: `1 2 3 4 5 6 8 10 12 16 20 24 32` (4px → 128px).

| Token | Valor | Uso |
|---|---|---|
| `--spacing` | `0.25rem` | Unidad base (4px) |
| `--spacing-toolbar` | `3.5rem` | Alto de la barra de herramientas (`h-toolbar`) |
| `--spacing-panel` | `22rem` | Ancho del panel de registro (`w-panel`) |
| `--spacing-pin` | `1.75rem` | Lado del pin (`size-pin`), fijo a cualquier zoom |
| `--spacing-ruler` | `1.75rem` | Grosor de las reglas del lienzo (`h-ruler`, `w-ruler`) |
| `--container-page` | `76rem` | Ancho máximo de la landing (`max-w-page`) |
| `--container-prose` | `36rem` | Medida máxima de párrafos (`max-w-prose`) |

---

## 5. Radios

Esquinas de hoja: pequeñas y consistentes. Nada de tarjetas redondeadas.

| Token | Valor | Uso |
|---|---|---|
| `--radius-xs` | `2px` | El diseño sobre el escenario, chips |
| `--radius-sm` | `4px` | Botones, inputs, filas |
| `--radius-md` | `6px` | Popovers, dropzone, diálogos |
| `--radius-full` | `9999px` | Puntos y marcadores circulares |
| `--radius-pin` | `9999px 9999px 9999px 2px` | Pin: la esquina inferior izquierda es la punta, anclada a la coordenada exacta |

---

## 6. Sombras

Toda sombra tiene desplazamiento y desenfoque; representan una hoja que se separa del escritorio.

| Token | Valor | Uso |
|---|---|---|
| `--shadow-sheet` | `0 1px 2px rgb(0 0 0 / 0.5), 0 16px 40px -12px rgb(0 0 0 / 0.7)` | El diseño sobre el escritorio |
| `--shadow-pin` | `0 1px 2px rgb(0 0 0 / 0.45), 0 3px 8px rgb(0 0 0 / 0.3)` | Pin sobre el diseño |
| `--shadow-popover` | `0 2px 4px rgb(0 0 0 / 0.4), 0 20px 48px -16px rgb(0 0 0 / 0.8)` | Composer y diálogos |

---

## 7. Movimiento

Sin coreografía todavía. Solo transiciones de estado.

| Token | Valor | Uso |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Toda transición |
| `--duration-fast` | `120ms` | Hover, foco |
| `--duration-base` | `200ms` | Apertura de popovers |

---

## 8. Capas

| Token | Valor | Uso |
|---|---|---|
| `--z-pin` | `10` | Pins sobre el diseño |
| `--z-pin-active` | `20` | Pin seleccionado |
| `--z-overlay` | `50` | Popovers y diálogos |
