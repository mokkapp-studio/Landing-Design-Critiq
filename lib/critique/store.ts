"use client";

import { useSyncExternalStore } from "react";
import { critiqueReducer, EMPTY_STATE } from "./reducer";
import { loadState, saveState, STORAGE_KEY, type SaveResult } from "./storage";
import type { CritiqueAction, CritiqueState } from "./types";

/**
 * Store externo del critique: estado persistido + estado de la persistencia.
 * Se consume con `useCritique()`; se modifica con `dispatch()`.
 */

export type CritiqueSnapshot = {
  /** "loading" solo en el servidor y durante la hidratación. */
  status: "loading" | "ready";
  data: CritiqueState;
  persistence: SaveResult;
};

const SERVER_SNAPSHOT: CritiqueSnapshot = { status: "loading", data: EMPTY_STATE, persistence: "saved" };

let snapshot: CritiqueSnapshot | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function current(): CritiqueSnapshot {
  if (!snapshot) snapshot = { status: "ready", data: loadState(), persistence: "saved" };
  return snapshot;
}

export function dispatch(action: CritiqueAction) {
  const previous = current();
  const data = critiqueReducer(previous.data, action);
  if (data === previous.data) return;
  snapshot = { status: "ready", data, persistence: saveState(data) };
  emit();
}

/** Sincroniza pestañas: si otra pestaña guarda, esta recarga el estado. */
function onStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY) return;
  snapshot = { status: "ready", data: loadState(), persistence: "saved" };
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

export function useCritique(): CritiqueSnapshot {
  return useSyncExternalStore(subscribe, current, () => SERVER_SNAPSHOT);
}

export function createId() {
  return crypto.randomUUID();
}
