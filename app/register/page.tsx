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

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, register } = useAuth();
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
    const firstName = String(form.get("firstName") ?? "").trim();
    const lastName = String(form.get("lastName") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");
    const acceptedTerms = form.get("acceptedTerms") === "on";

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas deben coincidir.");
      setIsSubmitting(false);
      return;
    }

    if (!acceptedTerms) {
      setErrorMessage("Debes aceptar los términos para crear tu cuenta.");
      setIsSubmitting(false);
      return;
    }

    try {
      await register({
        email,
        password,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
      });

      navigateAfterAuth(() =>
        router.replace(authDestination(window.location.search)),
      );
    } catch (error) {
      if (isApiError(error)) {
        setErrorMessage(
          error.messages[0] ?? "No se pudo crear tu cuenta en este momento.",
        );
      } else {
        setErrorMessage("No se pudo crear tu cuenta en este momento.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      register
      title="Crea tu cuenta"
      description="Tu próxima pausa favorita empieza aquí."
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
              <div className="grid gap-4 sm:grid-cols-2">
                <AuthField
                  label="Nombre"
                  name="firstName"
                  autoComplete="given-name"
                  maxLength={100}
                  placeholder="Tu nombre (opcional)"
                />
                <AuthField
                  label="Apellido"
                  name="lastName"
                  autoComplete="family-name"
                  maxLength={100}
                  placeholder="Tu apellido (opcional)"
                />
              </div>
              <AuthField
                label="Correo electrónico"
                name="email"
                type="email"
                required
                maxLength={255}
                autoComplete="email"
                placeholder="tu@correo.com"
              />
              <AuthField
                label="Contraseña"
                name="password"
                password
                required
                minLength={8}
                maxLength={100}
                autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
              />
              <AuthField
                label="Confirmar contraseña"
                name="confirmPassword"
                password
                required
                minLength={8}
                maxLength={100}
                autoComplete="new-password"
                placeholder="Repite tu contraseña"
              />
              <label className="flex items-start gap-3 text-sm leading-6 text-[#666458]">
                <input
                  name="acceptedTerms"
                  type="checkbox"
                  className="mt-1 h-4 w-4 shrink-0 accent-[#556235]"
                />
                <span>Acepto los términos de Basti para crear mi cuenta.</span>
              </label>
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
                {isSubmitting ? "Creando cuenta…" : "Crear cuenta"}
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </fieldset>
          </form>
          <div className="auth-divider">
            <span>¿Ya tienes cuenta?</span>
          </div>
          <AuthSwitchLink to="/login" className="auth-switch">
            Iniciar sesión
          </AuthSwitchLink>
        </>
      )}
    </AuthLayout>
  );
}
