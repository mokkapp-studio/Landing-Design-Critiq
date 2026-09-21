/** Estado de una crítica. "resolved" se dibuja como tachado, no con otro color. */
export type AnnotationStatus = "open" | "resolved";

export type Annotation = {
  id: string;
  /** Posición horizontal relativa al diseño, 0–1. */
  x: number;
  /** Posición vertical relativa al diseño, 0–1. */
  y: number;
  body: string;
  status: AnnotationStatus;
  createdAt: number;
  updatedAt: number;
};

export type DesignImage = {
  /** Data URL de la imagen, para poder persistirla en localStorage. */
  src: string;
  name: string;
  width: number;
  height: number;
};

export type CritiqueState = {
  design: DesignImage | null;
  annotations: Annotation[];
};

/** Punto sobre el diseño en coordenadas relativas 0–1. */
export type Point = { x: number; y: number };

export type CritiqueAction =
  | { type: "design/set"; design: DesignImage }
  | { type: "annotation/add"; id: string; point: Point; body: string; at: number }
  | { type: "annotation/edit"; id: string; body: string; at: number }
  | { type: "annotation/toggle-status"; id: string; at: number }
  | { type: "annotation/remove"; id: string }
  | { type: "annotations/clear" }
  | { type: "state/replace"; state: CritiqueState };
