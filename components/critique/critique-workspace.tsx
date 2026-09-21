"use client";

import { TriangleAlert, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { DesignFileError, readDesignFile } from "@/lib/critique/image";
import { createId, dispatch, useCritique } from "@/lib/critique/store";
import type { Point } from "@/lib/critique/types";
import { AnnotationPanel } from "./annotation-panel";
import { CritiqueCanvas, type Zoom } from "./critique-canvas";
import { DesignDropzone } from "./design-dropzone";
import { stepZoom, WorkspaceToolbar } from "./workspace-toolbar";

type PendingConfirm = { kind: "replace"; file: File } | { kind: "clear" } | null;

const plural = (count: number) => (count === 1 ? "1 crítica" : `${count} críticas`);

/**
 * Orquestador de la herramienta. El estado persistido vive en el store;
 * aquí solo vive el estado de interfaz: qué crítica está abierta, borrador, hover y zoom.
 */
export function CritiqueWorkspace() {
  const { status, data, persistence } = useCritique();
  const { design, annotations } = data;

  const [draft, setDraft] = useState<Point | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [zoom, setZoom] = useState<Zoom>("fit");
  const [loadingFile, setLoadingFile] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [pending, setPending] = useState<PendingConfirm>(null);

  // Atajos de zoom (+ − 0), nunca mientras se escribe una crítica.
  useEffect(() => {
    if (!design) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable='true']")) return;
      if (event.key === "+" || event.key === "=") setZoom((zoom) => stepZoom(zoom, 1));
      else if (event.key === "-") setZoom((zoom) => stepZoom(zoom, -1));
      else if (event.key === "0") setZoom((zoom) => (zoom === "fit" ? 1 : "fit"));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [design]);

  function closeComposer() {
    setDraft(null);
    setActiveId(null);
  }

  async function loadDesign(file: File) {
    setLoadingFile(true);
    setFileError(null);
    try {
      const next = await readDesignFile(file);
      closeComposer();
      setZoom("fit");
      dispatch({ type: "design/set", design: next });
    } catch (error) {
      setFileError(error instanceof DesignFileError ? error.message : "No se pudo abrir la imagen.");
    } finally {
      setLoadingFile(false);
    }
  }

  function requestReplace(file: File) {
    if (annotations.length > 0) setPending({ kind: "replace", file });
    else void loadDesign(file);
  }

  function confirmPending() {
    if (pending?.kind === "replace") void loadDesign(pending.file);
    if (pending?.kind === "clear") {
      closeComposer();
      dispatch({ type: "annotations/clear" });
    }
    setPending(null);
  }

  function removeAnnotation(id: string) {
    if (activeId === id) setActiveId(null);
    if (hoveredId === id) setHoveredId(null);
    dispatch({ type: "annotation/remove", id });
  }

  if (status === "loading") {
    return <div className="h-dvh bg-desk" aria-busy="true" />;
  }

  return (
    <div className="flex h-dvh flex-col">
      <WorkspaceToolbar
        design={design}
        annotationCount={annotations.length}
        zoom={zoom}
        persistence={persistence}
        onZoomChange={setZoom}
        onReplaceFile={requestReplace}
        onClearAnnotations={() => setPending({ kind: "clear" })}
      />

      {design && fileError && (
        <div role="alert" className="flex items-center gap-3 bg-surface px-5 py-2 text-sm text-warn">
          <TriangleAlert aria-hidden className="size-4 shrink-0" />
          <p className="flex-1">{fileError}</p>
          <button
            type="button"
            onClick={() => setFileError(null)}
            aria-label="Cerrar aviso"
            className="grid size-7 place-items-center rounded-sm text-ink-300 hover:bg-raised hover:text-text"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      <main className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_minmax(0,40%)] lg:grid-cols-[minmax(0,1fr)_var(--spacing-panel)] lg:grid-rows-1">
        <h1 className="sr-only">Critique de diseño</h1>
        <div className="min-h-0 min-w-0">
          {design ? (
            <CritiqueCanvas
              design={design}
              annotations={annotations}
              zoom={zoom}
              draft={draft}
              activeId={activeId}
              hoveredId={hoveredId}
              onPlace={(point) => {
                setActiveId(null);
                setDraft(point);
              }}
              onActivate={(id) => {
                setDraft(null);
                setActiveId(id);
              }}
              onHover={setHoveredId}
              onDraftSubmit={(body) => {
                if (draft) dispatch({ type: "annotation/add", id: createId(), point: draft, body, at: Date.now() });
                setDraft(null);
              }}
              onEditSubmit={(id, body) => {
                const current = annotations.find((annotation) => annotation.id === id);
                if (current && current.body !== body.trim()) {
                  dispatch({ type: "annotation/edit", id, body, at: Date.now() });
                }
                setActiveId(null);
              }}
              onToggleStatus={(id) => dispatch({ type: "annotation/toggle-status", id, at: Date.now() })}
              onRemove={removeAnnotation}
              onClose={closeComposer}
            />
          ) : (
            <DesignDropzone onFile={loadDesign} busy={loadingFile} error={fileError} />
          )}
        </div>

        <AnnotationPanel
          annotations={annotations}
          hasDesign={design !== null}
          activeId={activeId}
          hoveredId={hoveredId}
          onActivate={(id) => {
            setDraft(null);
            setActiveId(id);
          }}
          onHover={setHoveredId}
          onToggleStatus={(id) => dispatch({ type: "annotation/toggle-status", id, at: Date.now() })}
          onRemove={removeAnnotation}
        />
      </main>

      <ConfirmDialog
        open={pending !== null}
        onOpenChange={(open) => !open && setPending(null)}
        onConfirm={confirmPending}
        title={pending?.kind === "replace" ? "¿Cambiar de diseño?" : "¿Vaciar el registro?"}
        description={
          pending?.kind === "replace"
            ? `Se borrarán de este navegador el diseño actual y ${plural(annotations.length)}. No se puede deshacer.`
            : `Se borrarán ${plural(annotations.length)}. El diseño se mantiene. No se puede deshacer.`
        }
        confirmLabel={pending?.kind === "replace" ? "Cambiar diseño" : "Vaciar registro"}
      />
    </div>
  );
}
