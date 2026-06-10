import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ProdeState, PredictionsState, Prediction } from '../types';
import { useUrlSync } from '../hooks/useUrlSync';
import { getStateFromLocalStorage, saveStateToLocalStorage } from '../utils/url-persistence';

interface PredictionsContextType {
  username: string;
  setUsername: (name: string) => void;
  predictions: PredictionsState;
  setPrediction: (matchId: string, prediction: Prediction) => void;
  getPrediction: (matchId: string) => Prediction | undefined;
  resetAll: () => void;
  hasUnsavedChanges: boolean;
}

const PredictionsContext = createContext<PredictionsContextType | null>(null);

export function PredictionsProvider({
  children,
  confirmResetMessage = '¿Estás seguro? Se borrarán todos tus pronósticos.',
}: {
  children: ReactNode;
  confirmResetMessage?: string;
}) {
  // Initialize from localStorage first (persists across sessions without URL sharing)
  const savedState = getStateFromLocalStorage();
  
  const [username, setUsernameState] = useState<string>(savedState?.username || '');
  const [predictions, setPredictions] = useState<PredictionsState>(savedState?.predictions || {});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const setFullState = useCallback((state: ProdeState) => {
    setUsernameState(state.username || '');
    setPredictions(state.predictions || {});
    setHasUnsavedChanges(false);
  }, []);

  // URL sync hook
  useUrlSync(username, predictions, setFullState);

  const setUsername = useCallback((name: string) => {
    setUsernameState(name);
    setHasUnsavedChanges(true);
  }, []);

  const setPrediction = useCallback((matchId: string, prediction: Prediction) => {
    setPredictions(prev => {
      const next = { ...prev, [matchId]: prediction };
      // Also save to localStorage for persistence
      const state: ProdeState = { username, predictions: next };
      saveStateToLocalStorage(state);
      return next;
    });
    setHasUnsavedChanges(true);
  }, [username]);

  const getPrediction = useCallback((matchId: string): Prediction | undefined => {
    return predictions[matchId];
  }, [predictions]);

  const resetAll = useCallback(() => {
    if (window.confirm(confirmResetMessage)) {
      setUsernameState('');
      setPredictions({});
      setHasUnsavedChanges(false);
      window.history.replaceState(null, '', window.location.pathname);
      localStorage.removeItem('prode-state');
    }
  }, []);

  return (
    <PredictionsContext.Provider value={{
      username, setUsername,
      predictions, setPrediction, getPrediction,
      resetAll, hasUnsavedChanges,
    }}>
      {children}
    </PredictionsContext.Provider>
  );
}

export function usePredictions(): PredictionsContextType {
  const ctx = useContext(PredictionsContext);
  if (!ctx) throw new Error('usePredictions must be used within PredictionsProvider');
  return ctx;
}
