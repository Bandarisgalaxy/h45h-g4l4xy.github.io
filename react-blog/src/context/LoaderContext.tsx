"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface LoaderContextValue {
  /** True once the first-visit loader has finished (or been skipped). */
  loaderDone: boolean;
  markLoaderDone: () => void;
}

const LoaderContext = createContext<LoaderContextValue>({
  loaderDone: false,
  markLoaderDone: () => {},
});

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [loaderDone, setLoaderDone] = useState(false);
  const markLoaderDone = useCallback(() => setLoaderDone(true), []);
  return (
    <LoaderContext.Provider value={{ loaderDone, markLoaderDone }}>
      {children}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);
