# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Diseñadores (in-house o freelance) que revisan su propia landing antes de entregarla o publicarla. Suben una captura o export del diseño y anotan, punto por punto, lo que no funciona: jerarquía, copy, contraste, ritmo, CTA.

## Product Purpose

Critiq es una herramienta minimalista de design critique para landings. Convierte una revisión dispersa (notas sueltas, capturas con flechas) en una lista ordenada de pins numerados anclados a coordenadas exactas del diseño. Éxito: el diseñador termina la sesión con una lista de críticas accionables que puede resolver en orden.

## Positioning

Feedback tipo Figma, sin Figma: basta una imagen. Sin cuentas, sin equipo, sin backend; el critique vive en el navegador del diseñador.

## Operating Context

Sesión individual en escritorio, junto al archivo de diseño. El flujo es: subir o arrastrar imagen → click sobre el diseño → escribir la crítica → repasar la lista lateral.

## Capabilities and Constraints

- Stack: Next.js 16 (App Router), Tailwind CSS v4, Lucide Icons, Radix primitives.
- Subida por input o drag & drop de imágenes (PNG, JPG, WEBP, GIF, SVG).
- Pins numerados en coordenadas relativas (%) al diseño, editables y eliminables.
- Panel lateral con todas las anotaciones, sincronizado con el lienzo.
- Persistencia en localStorage (imagen + anotaciones), detrás de un store aislado para migrar a API después.
- Undecided: exportación, colaboración, múltiples diseños por proyecto.

## Brand Commitments

Nombre: Critiq. Sin logo, colores ni voz establecidos. Idioma de la interfaz: español.

## Evidence on Hand

Ninguna. No existen testimonios, clientes, métricas ni precios; no deben inventarse.

## Product Principles

1. La crítica es el producto: el diseño y sus pins ocupan el protagonismo, la interfaz se retira.
2. Cada pin es una acción: numerado, localizable, resoluble.
3. Cero fricción de entrada: de la imagen al primer pin en segundos, sin registro.
4. Local primero: los datos del diseñador no salen de su navegador.
