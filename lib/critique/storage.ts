import { EMPTY_STATE } from "./reducer";
import type { Annotation, CritiqueState, DesignImage } from "./types";

/**
 * Adaptador de persistencia. Es la única pieza que conoce localStorage:
 * migrar a una API solo requiere reemplazar este archivo.
 */

export const STORAGE_KEY = "critiq:v1";

export type SaveResult = "saved" | "quota-exceeded" | "unavailable";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

function isDesign(value: unknown): value is DesignImage {
  return (
    isRecord(value) &&
    typeof value.src === "string" &&
    typeof value.name === "string" &&
    typeof value.width === "number" &&
    typeof value.height === "number"
  );
}

function isAnnotation(value: unknown): value is Annotation {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.x === "number" &&
    typeof value.y === "number" &&
    typeof value.body === "string" &&
    (value.status === "open" || value.status === "resolved")
  );
}

/** Lee y valida el estado guardado. Datos corruptos se descartan en silencio. */
export function loadState(): CritiqueState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return EMPTY_STATE;
    const design = isDesign(parsed.design) ? parsed.design : null;
    const annotations = Array.isArray(parsed.annotations) ? parsed.annotations.filter(isAnnotation) : [];
    return { design, annotations: design ? annotations : [] };
  } catch {
    return EMPTY_STATE;
  }
}

export function saveState(state: CritiqueState): SaveResult {
  try {
    if (!state.design) window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return "saved";
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") return "quota-exceeded";
    return "unavailable";
  }
}
