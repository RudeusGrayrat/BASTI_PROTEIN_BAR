"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getCatalog, getStorefront } from "./commerce-api";
import type { Catalog, StorefrontConfiguration } from "./types";

type StorefrontState = {
  configuration: StorefrontConfiguration | null;
  catalog: Catalog | null;
  error: string;
  loading: boolean;
};
type Storefront = StorefrontState & {
  selectBranch: (id: string) => void;
  retry: () => void;
};
const Context = createContext<Storefront | null>(null);
const initial: StorefrontState = {
  configuration: null,
  catalog: null,
  error: "",
  loading: true,
};
export function StorefrontProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState(initial);
  const [branchId, setBranchId] = useState<string>();
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      try {
        const configuration = await getStorefront(controller.signal);
        if (controller.signal.aborted) return;
        setState((current) => ({ ...current, configuration }));
        const selected = configuration.branches.some(
          (branch) => branch.id === branchId,
        )
          ? branchId
          : configuration.branches[0]?.id;
        const catalog = await getCatalog(controller.signal, selected);
        if (!controller.signal.aborted)
          setState({ configuration, catalog, error: "", loading: false });
      } catch {
        if (!controller.signal.aborted)
          setState((current) => ({
            configuration: current.configuration,
            catalog: null,
            error:
              "No pudimos consultar la información de Basti. Inténtalo nuevamente.",
            loading: false,
          }));
      }
    })();
    return () => controller.abort();
  }, [branchId, attempt]);
  function selectBranch(id: string) {
    if (id === state.catalog?.branchId) return;
    setState((current) => ({
      ...current,
      catalog: null,
      loading: true,
      error: "",
    }));
    setBranchId(id);
  }
  function retry() {
    setState(initial);
    setAttempt((value) => value + 1);
  }
  return (
    <Context.Provider value={{ ...state, selectBranch, retry }}>
      {children}
    </Context.Provider>
  );
}
export function useStorefront() {
  const value = useContext(Context);
  if (!value) throw new Error("StorefrontProvider is required");
  return value;
}
