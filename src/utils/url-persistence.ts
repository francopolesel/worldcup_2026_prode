import type { ProdeState } from '../types';
import LZString from 'lz-string';

const STORAGE_KEY = 'prode-state';

/**
 * Serialize app state to a compressed URL-safe string.
 */
export function serializeState(state: ProdeState): string {
  const json = JSON.stringify(state);
  return LZString.compressToEncodedURIComponent(json);
}

/**
 * Deserialize a compressed URL-safe string back to app state.
 * Returns null if decompression or parsing fails.
 */
export function deserializeState(hash: string): ProdeState | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(hash);
    if (!json) return null;
    return JSON.parse(json) as ProdeState;
  } catch {
    return null;
  }
}

/**
 * Read serialized state from the current URL hash.
 */
export function getStateFromURL(): ProdeState | null {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return null;
  return deserializeState(hash);
}

/**
 * Write serialized state to the URL hash (no history entry).
 */
export function saveStateToURL(state: ProdeState): void {
  const compressed = serializeState(state);
  window.history.replaceState(null, '', `#${compressed}`);
}

/**
 * Read state from localStorage as a fallback.
 */
export function getStateFromLocalStorage(): ProdeState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ProdeState;
  } catch {
    return null;
  }
}

/**
 * Save state to localStorage as a fallback.
 */
export function saveStateToLocalStorage(state: ProdeState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage might be full or unavailable — silently ignore
  }
}
