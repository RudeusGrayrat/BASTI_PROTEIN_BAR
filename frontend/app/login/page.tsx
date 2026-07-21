"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { ProductArt } from "../components/ProductArt";
import { navigateAfterAuth, useAuth } from "../context/auth-context";
import { isApiError } from "../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigateAfterAuth(() => router.replace("/dashboard"));
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

      navigateAfterAuth(() => router.replace("/dashboard"));
    } catch (error) {
      if (isApiError(error)) {
        const firstMessage = error.messages[0] ?? "No se pudo iniciar sesion.";
        setErrorMessage(
          error.status === 401 ? "Credenciales invalidas." : firstMessage,
        );
      } else {
        setErrorMessage("No se pudo iniciar sesion.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#fbf7ed] text-[#385126]">
        Restaurando tu sesion...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbf7ed] text-[#1d2815]">
      <Header />
      <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-3xl border border-[#e1d7c7] bg-white/70 p-6 shadow-xl shadow-[#61451f]/10 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#6d744f]">
            Bienvenido
          </p>
          <h1 className="mt-3 font-serif text-5xl text-[#11170d]">
            Inicia sesion
          </h1>
          <p className="mt-4 text-[#676356]">
            Entra para ver tu cuenta real, completar tu perfil y prepararte para
            los beneficios de BASTI.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-[#3b412f]">
                Correo o DNI
              </span>
              <input
                name="identifier"
                type="text"
                required
                autoComplete="username"
                placeholder="cliente@basti.pe o 76466972"
                className="mt-2 h-12 w-full rounded-2xl border border-[#d8ccb6] bg-[#fffaf0] px-4 text-[#1d2815] placeholder:text-[#aaa08e]"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#3b412f]">
                Contrasena
              </span>
              <input
                name="password"
                type="password"
                minLength={8}
                maxLength={100}
                required
                autoComplete="current-password"
                placeholder="Minimo 8 caracteres"
                className="mt-2 h-12 w-full rounded-2xl border border-[#d8ccb6] bg-[#fffaf0] px-4 text-[#1d2815] placeholder:text-[#aaa08e]"
              />
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
              {isSubmitting ? "Ingresando..." : "Ingresar al dashboard"}
            </button>

            <button
              type="button"
              disabled
              className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-[#d8ccb6] bg-white/80 font-semibold text-[#4c5641] opacity-70"
            >
              <span>Continuar con Google</span>
              <span className="rounded-full bg-[#ece7c7] px-2 py-1 text-xs uppercase tracking-[0.18em] text-[#596247]">
                Proximamente
              </span>
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#676356]">
            Aun no tienes cuenta?{" "}
            <Link href="/register" className="font-bold text-[#385126]">
              Registrate
            </Link>
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-[#e0d4c1] bg-[#efe3d0] shadow-2xl shadow-[#61451f]/10">
          <ProductArt variant="matcha" large />
        </div>
      </section>
    </main>
  );
}
