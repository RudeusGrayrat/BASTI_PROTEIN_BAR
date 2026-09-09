import { apiRequest } from "./api";
import type {
  AuthResponse,
  AuthUser,
  LoginInput,
  RegisterInput,
  UpdateCurrentUserInput,
} from "../types/auth";

export function registerConsumer(input: RegisterInput) {
  return apiRequest<AuthResponse>("/consumer/auth/register", {
    method: "POST",
    body: input,
  });
}

export function loginConsumer(input: LoginInput) {
  return apiRequest<AuthResponse>("/consumer/auth/login", {
    method: "POST",
    body: input,
  });
}

export function refreshConsumerSession() {
  return apiRequest<AuthResponse>("/consumer/auth/refresh", {
    method: "POST",
  });
}

export function logoutConsumer() {
  return apiRequest<{ message: string }>("/consumer/auth/logout", {
    method: "POST",
  });
}

export function getCurrentUser(accessToken: string) {
  return apiRequest<AuthUser>("/consumer/users/me", {
    method: "GET",
    accessToken,
  });
}

export function updateCurrentUser(
  accessToken: string,
  input: UpdateCurrentUserInput,
) {
  return apiRequest<AuthUser>("/consumer/users/me", {
    method: "PATCH",
    accessToken,
    body: normalizeProfilePayload(input),
  });
}

function normalizeProfilePayload(
  input: UpdateCurrentUserInput,
): UpdateCurrentUserInput {
  return {
    firstName: normalizeOptionalText(input.firstName),
    lastName: normalizeOptionalText(input.lastName),
    phone: normalizeOptionalText(input.phone),
    documentType: input.documentType || "",
    documentNumber: normalizeOptionalText(input.documentNumber),
  };
}

function normalizeOptionalText(value: string | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  const normalizedValue = value.trim();
  return normalizedValue.length > 0 ? normalizedValue : "";
}
