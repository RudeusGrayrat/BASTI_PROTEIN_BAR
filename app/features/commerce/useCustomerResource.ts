"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
export function useCustomerResource<T>(load: (token: string) => Promise<T>) {
  const { runAuthenticatedRequest, user } = useAuth();
  const userId = user?.id;
  const [state, setState] = useState<{
    data: T | null;
    error: string;
    loading: boolean;
  }>({ data: null, error: "", loading: true });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    if (!userId) return;
    runAuthenticatedRequest(load)
      .then((data) => {
        if (active) setState({ data, error: "", loading: false });
      })
      .catch(() => {
        if (active)
          setState({
            data: null,
            error:
              "No pudimos consultar esta información. Vuelve a intentarlo en unos momentos.",
            loading: false,
          });
      });
    return () => {
      active = false;
    };
  }, [runAuthenticatedRequest, load, attempt, userId]);
  return {
    ...state,
    retry: () => {
      setState({ data: null, error: "", loading: true });
      setAttempt((value) => value + 1);
    },
  };
}
