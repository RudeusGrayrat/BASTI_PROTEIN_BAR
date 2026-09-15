"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { CartLine, CatalogProduct } from "./types";
import { storefrontSlug } from "./commerce-api";
import {
  addProduct,
  CART_KEY,
  cartTotal,
  MAX_LINES,
  MAX_QUANTITY,
  restoreCart,
} from "./cart-domain";

type Cart = {
  lines: CartLine[];
  count: number;
  total: number;
  ready: boolean;
  notice: string;
  add: (product: CatalogProduct) => void;
  change: (id: string, quantity: number) => void;
  clear: () => void;
};
const Context = createContext<Cart | null>(null);
const storageKey = `${CART_KEY}:${storefrontSlug}`;
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    // Hydrate after SSR; a denied browser storage must not break shopping.
    const hydrate = () => {
      try {
        setLines(restoreCart(localStorage.getItem(storageKey)));
      } catch {
        setNotice(
          "El carrito se conservará solo mientras esta página esté abierta.",
        );
      }
      setReady(true);
    };
    hydrate();
    function synchronize(event: StorageEvent) {
      if (event.key === storageKey || event.key === null) hydrate();
    }
    window.addEventListener("storage", synchronize);
    return () => window.removeEventListener("storage", synchronize);
  }, []);
  const update = useCallback(
    (operation: (current: CartLine[]) => CartLine[]) => {
      setLines((current) => {
        const next = operation(current);
        return next;
      });
    },
    [],
  );
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(lines));
    } catch {
      /* Session-only cart remains usable. */
    }
  }, [lines, ready]);
  const add = (product: CatalogProduct) => {
    if (!product.available || !ready) return;
    if (
      lines.length >= MAX_LINES &&
      !lines.some((line) => line.product.id === product.id)
    ) {
      setNotice(
        "Tu carrito llegó al máximo de productos diferentes. Revisa tu selección antes de añadir otro.",
      );
      return;
    }
    update((current) => addProduct(current, product));
    setNotice(`${product.name}: selección actualizada en tu carrito.`);
  };
  const change = (id: string, quantity: number) => {
    if (!Number.isInteger(quantity) || quantity < 0 || quantity > MAX_QUANTITY)
      return;
    update((current) =>
      quantity === 0
        ? current.filter((line) => line.product.id !== id)
        : current.map((line) =>
            line.product.id === id ? { ...line, quantity } : line,
          ),
    );
  };
  return (
    <Context.Provider
      value={{
        lines,
        ready,
        notice,
        add,
        change,
        clear: () => update(() => []),
        count: lines.reduce((sum, line) => sum + line.quantity, 0),
        total: cartTotal(lines),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useCart() {
  const cart = useContext(Context);
  if (!cart) throw new Error("CartProvider is required");
  return cart;
}
