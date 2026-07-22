"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { ProductImage } from "../components/ProductImage";
import { navigateAfterAuth, useAuth } from "../context/auth-context";
import { isApiError } from "../lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigateAfterAuth(() => router.replace("/"));
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
      setErrorMessage("La confirmacion de contrasena debe coincidir.");
      setIsSubmitting(false);
      return;
    }

    if (!acceptedTerms) {
      setErrorMessage("Debes aceptar los terminos para crear tu cuenta.");
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

      navigateAfterAuth(() => router.replace("/"));
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

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#fbf7ed] text-[#385126]">
        Preparando el registro...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbf7ed] text-[#1d2815]">
      <Header />
      <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="overflow-hidden rounded-[28px] border border-[#e0d4c1] bg-[#efe3d0] shadow-2xl shadow-[#61451f]/10 max-lg:order-2">
          <ProductImage variant="waffle" alt="Waffle proteico clasico" large />
        </div>

        <div className="rounded-3xl border border-[#e1d7c7] bg-white/70 p-6 shadow-xl shadow-[#61451f]/10 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#6d744f]">
            Cuenta BASTI
          </p>
          <h1 className="mt-3 font-serif text-5xl text-[#11170d]">
            Crea tu cuenta
          </h1>
          <p className="mt-4 text-[#676356]">
            Empieza con tu correo y tu contrasena. El resto del perfil lo podras
            completar despues.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-[#3b412f]">
                  Nombre
                </span>
                <input
                  name="firstName"
                  maxLength={100}
                  autoComplete="given-name"
                  placeholder="Opcional"
                  className="mt-2 h-12 w-full rounded-2xl border border-[#d8ccb6] bg-[#fffaf0] px-4 text-[#1d2815] placeholder:text-[#aaa08e]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#3b412f]">
                  Apellido
                </span>
                <input
                  name="lastName"
                  maxLength={100}
                  autoComplete="family-name"
                  placeholder="Opcional"
                  className="mt-2 h-12 w-full rounded-2xl border border-[#d8ccb6] bg-[#fffaf0] px-4 text-[#1d2815] placeholder:text-[#aaa08e]"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-[#3b412f]">Correo</span>
              <input
                name="email"
                type="email"
                required
                maxLength={255}
                autoComplete="email"
                placeholder="cliente@basti.pe"
                className="mt-2 h-12 w-full rounded-2xl border border-[#d8ccb6] bg-[#fffaf0] px-4 text-[#1d2815] placeholder:text-[#aaa08e]"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-[#3b412f]">
                  Contrasena
                </span>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  maxLength={100}
                  autoComplete="new-password"
                  placeholder="Minimo 8 caracteres"
                  className="mt-2 h-12 w-full rounded-2xl border border-[#d8ccb6] bg-[#fffaf0] px-4 text-[#1d2815] placeholder:text-[#aaa08e]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#3b412f]">
                  Confirmar contrasena
                </span>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={8}
                  maxLength={100}
                  autoComplete="new-password"
                  placeholder="Repite tu contrasena"
                  className="mt-2 h-12 w-full rounded-2xl border border-[#d8ccb6] bg-[#fffaf0] px-4 text-[#1d2815] placeholder:text-[#aaa08e]"
                />
              </label>
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-[#e4dac8] bg-[#fffaf0] px-4 py-3">
              <input
                name="acceptedTerms"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-[#bdb19d]"
              />
              <span className="text-sm text-[#5e5b50]">
                Acepto los terminos del Consumer Web de BASTI para crear mi
                cuenta.
              </span>
            </label>

            {errorMessage ? (
              <div className="rounded-2xl border border-[#d39b93] bg-[#fff2ef] px-4 py-3 text-sm font-medium text-[#8c3b31]">
                {errorMessage}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-full bg-[#385126] font-bold text-white shadow-lg shadow-[#385126]/20 transition hover:bg-[#26391a] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#676356]">
            Ya tienes cuenta?{" "}
            <Link href="/login" className="font-bold text-[#385126]">
              Inicia sesion
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
