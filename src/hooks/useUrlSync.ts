import { useCallback, useEffect, useRef } from 'react';
import type { ProdeState, PredictionsState } from '../types';
import { saveStateToURL, getStateFromURL } from '../utils/url-persistence';

const DEBOUNCE_MS = 500;

/**
 * Bi-directional sync between app state and URL hash.
 *
 * - On mount: restores state from URL hash (if present).
 * - On state change: debounced write back to URL hash.
 */
export function useUrlSync(
  username: string,
  predictions: PredictionsState,
  setState: (state: ProdeState) => void,
) {
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const isInitialLoad = useRef(true);

  // On mount: restore state from URL
  useEffect(() => {
    if (isInitialLoad.current) {
      const saved = getStateFromURL();
      if (saved) {
        setState(saved);
      }
      isInitialLoad.current = false;
    }
  }, [setState]);

  // Debounced write to URL
  const sync = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const state: ProdeState = { username, predictions };
      saveStateToURL(state);
    }, DEBOUNCE_MS);
  }, [username, predictions]);

  useEffect(() => {
    if (!isInitialLoad.current) {
      sync();
    }
  }, [sync]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);
}
