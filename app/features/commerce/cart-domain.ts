import type { CartLine, CatalogProduct } from "./types";

export const MAX_QUANTITY = 20;
export const MAX_LINES = 50;
export const CART_KEY = "basti.cart.v2";
export function money(cents: number, currency = "PEN") {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency,
  }).format(cents / 100);
}
export function cartTotal(lines: CartLine[]) {
  return lines.reduce(
    (sum, line) => sum + line.product.priceCents * line.quantity,
    0,
  );
}
export function addProduct(
  lines: CartLine[],
  product: CatalogProduct,
): CartLine[] {
  if (!product.available) return lines;
  const existing = lines.find((line) => line.product.id === product.id);
  if (existing)
    return lines.map((line) =>
      line.product.id === product.id
        ? { product, quantity: Math.min(MAX_QUANTITY, line.quantity + 1) }
        : line,
    );
  return lines.length < MAX_LINES
    ? [...lines, { product, quantity: 1 }]
    : lines;
}
export function restoreCart(raw: string | null): CartLine[] {
  try {
    const value: unknown = JSON.parse(raw ?? "[]");
    if (!Array.isArray(value)) return [];
    const seen = new Set<string>();
    return value
      .filter((line): line is CartLine => {
        const p = line?.product;
        if (
          !p ||
          typeof p.id !== "string" ||
          p.id.length > 150 ||
          seen.has(p.id) ||
          typeof p.name !== "string" ||
          p.name.length > 300 ||
          typeof p.category !== "string" ||
          typeof p.currency !== "string" ||
          !/^[A-Z]{3}$/.test(p.currency) ||
          p.preview === true ||
          p.id.startsWith("preview-") ||
          !(p.description === null || typeof p.description === "string") ||
          !(p.imageUrl === null || typeof p.imageUrl === "string") ||
          typeof p.available !== "boolean" ||
          !(p.preview === undefined || typeof p.preview === "boolean") ||
          !Number.isSafeInteger(p.priceCents) ||
          p.priceCents < 0 ||
          p.priceCents > 10000000 ||
          !Number.isInteger(line.quantity) ||
          line.quantity < 1 ||
          line.quantity > MAX_QUANTITY
        )
          return false;
        seen.add(p.id);
        return true;
      })
      .slice(0, MAX_LINES);
  } catch {
    return [];
  }
}

export function authDestination(search: string) {
  const requested = new URLSearchParams(search).get("next");
  const next = requested === "/cuenta/puntos" ? "/puntos" : requested;
  return next &&
    ["/carrito", "/cuenta", "/cuenta/pedidos", "/puntos", "/profile"].includes(
      next,
    )
    ? next
    : "/cuenta";
}
