"use client";

import { AuthSwitchLink } from "../features/commerce/AuthSwitchLink";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AuthLayout } from "../features/auth/AuthLayout";
import { AuthField } from "../features/auth/AuthField";
import { ArrowRightIcon } from "../components/icons";
import { navigateAfterAuth, useAuth } from "../context/auth-context";
import { authDestination } from "../features/commerce/cart-domain";
import { isApiError } from "../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigateAfterAuth(() =>
        router.replace(authDestination(window.location.search)),
      );
    }
  }, [isAuthenticated, isLoading, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const form = new FormData(event.currentTarget);
    const identifier = String(form.get("identifier") ?? "").trim();
    const password = String(form.get("password") ?? "");

    try {
      await login({
        identifier,
        password,
      });

      navigateAfterAuth(() =>
        router.replace(authDestination(window.location.search)),
      );
    } catch (error) {
      if (isApiError(error)) {
        const firstMessage = error.messages[0] ?? "No se pudo iniciar sesión.";
        setErrorMessage(
          error.status === 401
            ? "Correo, DNI o contraseña incorrectos."
            : firstMessage,
        );
      } else {
        setErrorMessage("No se pudo iniciar sesión.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Inicia sesión"
      description="Accede a tus compras, puntos y beneficios."
    >
      {isLoading ? (
        <p role="status" className="py-12 text-center text-[#556235]">
          Recuperando tu sesión…
        </p>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            className="auth-form"
            aria-busy={isSubmitting}
          >
            <fieldset
              disabled={isSubmitting}
              className="space-y-5 disabled:opacity-70"
            >
              <AuthField
                label="Correo electrónico o DNI"
                name="identifier"
                required
                autoComplete="username"
                placeholder="Tu correo o DNI"
              />
              <AuthField
                label="Contraseña"
                name="password"
                password
                required
                minLength={8}
                maxLength={100}
                autoComplete="current-password"
                placeholder="Ingresa tu contraseña"
              />

              {errorMessage && (
                <p
                  role="alert"
                  className="rounded-xl border border-[#d39b93] bg-[#fff2ef] px-4 py-3 text-sm text-[#8c3b31]"
                >
                  {errorMessage}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="auth-submit"
              >
                {isSubmitting ? "Ingresando…" : "Ingresar"}
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </fieldset>
          </form>
          <div className="auth-divider">
            <span>o</span>
          </div>
          <AuthSwitchLink to="/register" className="auth-switch">
            Crear cuenta
          </AuthSwitchLink>
        </>
      )}
    </AuthLayout>
  );
}
