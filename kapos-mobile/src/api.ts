import type {
  BranchSummary,
  CashRegisterSummary,
  CashSessionSummary,
  ErpAccessSummary,
  MobileAuthResponse,
  PaginatedResponse,
  PaymentIntent,
  PaymentMethodSummary,
  ProductSummary,
  SaleSummary,
} from "./types";

type ApiOptions = {
  method?: "GET" | "POST";
  body?: unknown;
  accessToken?: string | null;
  organizationId?: string | null;
};

type LoginInput = {
  identifier: string;
  password: string;
};

export class MobileApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "MobileApiError";
    this.status = status;
  }
}

function normalizeApiUrl(apiBaseUrl: string) {
  return apiBaseUrl.trim().replace(/\/+$/, "");
}

async function request<T>(apiBaseUrl: string, path: string, options: ApiOptions = {}) {
  const headers = new Headers();
  const hasBody = options.body !== undefined;

  if (hasBody) {
    headers.set("Content-Type", "application/json");
  }

  if (options.accessToken) {
    headers.set("Authorization", `Bearer ${options.accessToken}`);
  }

  if (options.organizationId) {
    headers.set("x-organization-id", options.organizationId);
  }

  const response = await fetch(`${normalizeApiUrl(apiBaseUrl)}${path}`, {
    method: options.method ?? (hasBody ? "POST" : "GET"),
    headers,
    body: hasBody ? JSON.stringify(options.body) : undefined,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text().catch(() => "");

  if (!response.ok) {
    const message =
      typeof payload === "string"
        ? payload
        : Array.isArray((payload as { message?: string[] | string } | null)?.message)
          ? (payload as { message: string[] }).message[0]
          : (payload as { message?: string } | null)?.message ?? "No se pudo completar la solicitud.";
    throw new MobileApiError(response.status, message);
  }

  return payload as T;
}

export function loginMobile(apiBaseUrl: string, input: LoginInput) {
  return request<MobileAuthResponse>(apiBaseUrl, "/mobile/auth/login", {
    method: "POST",
    body: input,
  });
}

export function refreshMobile(apiBaseUrl: string, refreshToken: string) {
  return request<MobileAuthResponse>(apiBaseUrl, "/mobile/auth/refresh", {
    method: "POST",
    body: { refreshToken },
  });
}

export function logoutMobile(apiBaseUrl: string, refreshToken: string) {
  return request<{ message: string }>(apiBaseUrl, "/mobile/auth/logout", {
    method: "POST",
    body: { refreshToken },
  });
}

export function getAccessSummary(apiBaseUrl: string, accessToken: string) {
  return request<ErpAccessSummary>(apiBaseUrl, "/erp/access/me", {
    accessToken,
  });
}

export function getBranches(apiBaseUrl: string, accessToken: string, organizationId: string) {
  return request<BranchSummary[]>(apiBaseUrl, "/erp/settings/branches", {
    accessToken,
    organizationId,
  });
}

export function getPaymentMethods(apiBaseUrl: string, accessToken: string, organizationId: string) {
  return request<PaymentMethodSummary[]>(apiBaseUrl, "/erp/settings/payment-methods", {
    accessToken,
    organizationId,
  });
}

export function getCashRegisters(apiBaseUrl: string, accessToken: string, organizationId: string) {
  return request<CashRegisterSummary[]>(apiBaseUrl, "/erp/cash/registers", {
    accessToken,
    organizationId,
  });
}

export function getOpenCashSessions(apiBaseUrl: string, accessToken: string, organizationId: string) {
  return request<PaginatedResponse<CashSessionSummary>>(
    apiBaseUrl,
    "/erp/cash/sessions?status=OPEN&page=1&limit=100",
    {
      accessToken,
      organizationId,
    },
  );
}

export function openCashSession(
  apiBaseUrl: string,
  accessToken: string,
  organizationId: string,
  input: { branchId: string; cashRegisterId: string; openingAmount: number; openingNote?: string },
) {
  return request<CashSessionSummary>(apiBaseUrl, "/erp/cash/sessions/open", {
    method: "POST",
    accessToken,
    organizationId,
    body: input,
  });
}

export function getProducts(
  apiBaseUrl: string,
  accessToken: string,
  organizationId: string,
  search?: string,
) {
  const query = search?.trim()
    ? `?page=1&limit=100&search=${encodeURIComponent(search.trim())}`
    : "?page=1&limit=100";

  return request<PaginatedResponse<ProductSummary>>(apiBaseUrl, `/erp/catalog/products${query}`, {
    accessToken,
    organizationId,
  });
}

export function createPaymentIntent(
  apiBaseUrl: string,
  accessToken: string,
  organizationId: string,
  input: {
    amount: number;
    provider: string;
    branchId: string;
    cashSessionId: string;
    paymentMethodId: string;
    providerRef?: string;
    rawRequest?: unknown;
  },
) {
  return request<PaymentIntent>(apiBaseUrl, "/erp/payments/intents", {
    method: "POST",
    accessToken,
    organizationId,
    body: input,
  });
}

export function confirmPaymentIntent(
  apiBaseUrl: string,
  accessToken: string,
  organizationId: string,
  paymentIntentId: string,
  input: { providerRef?: string; rawResponse?: unknown },
) {
  return request<PaymentIntent>(apiBaseUrl, `/erp/payments/intents/${paymentIntentId}/confirm`, {
    method: "POST",
    accessToken,
    organizationId,
    body: input,
  });
}

export function failPaymentIntent(
  apiBaseUrl: string,
  accessToken: string,
  organizationId: string,
  paymentIntentId: string,
  input: { providerRef?: string; rawResponse?: unknown },
) {
  return request<PaymentIntent>(apiBaseUrl, `/erp/payments/intents/${paymentIntentId}/fail`, {
    method: "POST",
    accessToken,
    organizationId,
    body: input,
  });
}

export function createSale(
  apiBaseUrl: string,
  accessToken: string,
  organizationId: string,
  input: {
    branchId: string;
    cashSessionId: string;
    channel: "MOBILE_POS";
    billingDocumentType: "TICKET" | "BOLETA" | "FACTURA";
    note?: string;
    items: Array<{ productId: string; quantity: number }>;
    payments: Array<{
      paymentMethodId?: string;
      paymentIntentId?: string;
      amount: number;
      status?: "CONFIRMED" | "PENDING";
      provider?: string;
      providerRef?: string;
    }>;
  },
) {
  return request<SaleSummary>(apiBaseUrl, "/erp/sales", {
    method: "POST",
    accessToken,
    organizationId,
    body: input,
  });
}
