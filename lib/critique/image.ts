import type { DesignImage } from "./types";

export const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"];
export const ACCEPT_ATTRIBUTE = ACCEPTED_TYPES.join(",");

/** Límite de entrada. Por encima, el navegador sufre al decodificar y persistir. */
const MAX_FILE_BYTES = 25 * 1024 * 1024;
/** Por encima de este tamaño en data URL se re-codifica para caber en localStorage. */
const REENCODE_THRESHOLD = 1_500_000;
/** Ancho máximo al re-codificar. Las coordenadas son relativas, así que no se pierden. */
const REENCODE_MAX_WIDTH = 2000;

export class DesignFileError extends Error {}

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new DesignFileError("No se pudo leer el archivo."));
    reader.readAsDataURL(file);
  });
}

function decode(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new DesignFileError("El archivo no es una imagen válida."));
    image.src = src;
  });
}

/** Reduce el peso de imágenes grandes a WebP. Si falla, devuelve el original. */
function reencode(image: HTMLImageElement, src: string) {
  try {
    const scale = Math.min(1, REENCODE_MAX_WIDTH / image.naturalWidth);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);
    const context = canvas.getContext("2d");
    if (!context) return src;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const encoded = canvas.toDataURL("image/webp", 0.86);
    return encoded.startsWith("data:image/webp") && encoded.length < src.length ? encoded : src;
  } catch {
    return src;
  }
}

export async function readDesignFile(file: File): Promise<DesignImage> {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    throw new DesignFileError("Formato no admitido. Usa PNG, JPG, WEBP, GIF o SVG.");
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new DesignFileError("El archivo supera 25 MB. Exporta el diseño a menor resolución.");
  }

  const original = await readAsDataUrl(file);
  const image = await decode(original);
  const width = image.naturalWidth || 1440;
  const height = image.naturalHeight || 900;
  const canReencode = file.type !== "image/svg+xml" && file.type !== "image/gif";
  const src = canReencode && original.length > REENCODE_THRESHOLD ? reencode(image, original) : original;

  return { src, name: file.name, width, height };
}
