import type { AuthUser, CartItem, PaymentMethodSummary, ProductSummary } from "./types";

export function currency(value: number) {
  return `S/ ${value.toFixed(2)}`;
}

export function greetingName(user: AuthUser | null) {
  if (!user) return "Operador";
  if (user.firstName?.trim()) return user.firstName.trim();
  if (user.email?.includes("@")) return user.email.split("@")[0];
  return "Operador";
}

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function productAvailableForBranch(product: ProductSummary, branchId: string | null) {
  if (!product.availableForPos || product.status !== "ACTIVE") {
    return false;
  }

  if (!branchId) {
    return true;
  }

  if (!product.trackStock) {
    return true;
  }

  const stock = product.stockItems.find((item) => item.branchId === branchId);
  return (stock?.quantity ?? 0) > 0;
}

export function makeIzipayRef() {
  return `IZI-${Date.now().toString().slice(-8)}`;
}

export function findIzipayMethod(methods: PaymentMethodSummary[]) {
  return methods.find(
    (method) =>
      method.enabled &&
      (method.code.toLowerCase().includes("izipay") ||
        (method.type === "CARD" && method.name.toLowerCase().includes("izipay"))),
  );
}
