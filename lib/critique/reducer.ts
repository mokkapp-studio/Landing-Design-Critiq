import type { Annotation, CritiqueAction, CritiqueState } from "./types";

export const EMPTY_STATE: CritiqueState = { design: null, annotations: [] };

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

function updateAnnotation(
  annotations: Annotation[],
  id: string,
  update: (annotation: Annotation) => Annotation,
) {
  return annotations.map((annotation) => (annotation.id === id ? update(annotation) : annotation));
}

/** Reducer puro: toda mutación del critique pasa por aquí. */
export function critiqueReducer(state: CritiqueState, action: CritiqueAction): CritiqueState {
  switch (action.type) {
    case "design/set":
      // Un diseño nuevo invalida las coordenadas de las críticas anteriores.
      return { design: action.design, annotations: [] };

    case "annotation/add": {
      const body = action.body.trim();
      if (!body || !state.design) return state;
      const annotation: Annotation = {
        id: action.id,
        x: clamp01(action.point.x),
        y: clamp01(action.point.y),
        body,
        status: "open",
        createdAt: action.at,
        updatedAt: action.at,
      };
      return { ...state, annotations: [...state.annotations, annotation] };
    }

    case "annotation/edit": {
      const body = action.body.trim();
      if (!body) return state;
      return {
        ...state,
        annotations: updateAnnotation(state.annotations, action.id, (annotation) => ({
          ...annotation,
          body,
          updatedAt: action.at,
        })),
      };
    }

    case "annotation/toggle-status":
      return {
        ...state,
        annotations: updateAnnotation(state.annotations, action.id, (annotation) => ({
          ...annotation,
          status: annotation.status === "open" ? "resolved" : "open",
          updatedAt: action.at,
        })),
      };

    case "annotation/remove":
      return {
        ...state,
        annotations: state.annotations.filter((annotation) => annotation.id !== action.id),
      };

    case "annotations/clear":
      return { ...state, annotations: [] };

    case "state/replace":
      return action.state;
  }
}
