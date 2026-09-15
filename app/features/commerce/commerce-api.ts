import { apiRequest } from "../../lib/api";
import type {
  Catalog,
  CustomerOrder,
  CustomerWallet,
  StorefrontConfiguration,
} from "./types";

// Only a public identifier. Business settings belong to Kapos.
export const storefrontSlug =
  process.env.NEXT_PUBLIC_BASTI_SLUG?.trim() || "basti";
const basePath = `/consumer/storefront/${encodeURIComponent(storefrontSlug)}`;
export function assetUrl(path: string | null): string | null {
  if (!path) return null;
  try {
    const url = new URL(
      path,
      `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "")}/`,
    );
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
export async function getStorefront(signal?: AbortSignal) {
  const config = await apiRequest<StorefrontConfiguration>(
    `${basePath}/configuration`,
    { signal },
  );
  return { ...config, logoUrl: assetUrl(config.logoUrl) };
}
export async function getCatalog(
  signal?: AbortSignal,
  branchId?: string,
): Promise<Catalog> {
  const query = branchId ? `?branchId=${encodeURIComponent(branchId)}` : "";
  const catalog = await apiRequest<Catalog>(`${basePath}/catalog${query}`, {
    signal,
  });
  return {
    ...catalog,
    products: catalog.products.map((product) => ({
      ...product,
      currency: catalog.currency,
      imageUrl: assetUrl(product.imageUrl),
    })),
  };
}
export const getOrders = (accessToken: string) =>
  apiRequest<{ orders: CustomerOrder[] }>(`${basePath}/orders`, {
    accessToken,
  });
export const getWallet = (accessToken: string) =>
  apiRequest<CustomerWallet>(`${basePath}/wallet`, { accessToken });
