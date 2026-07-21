"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  getUserSummaryName,
  navigateAfterAuth,
  useAuth,
} from "../context/auth-context";
import { isApiError } from "../lib/api";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading, logout, user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logout();
      navigateAfterAuth(() => router.replace("/login"));
    } catch (error) {
      if (!isApiError(error)) {
        console.error(error);
      }
    } finally {
      setIsLoggingOut(false);
    }
  }

  const accountLabel = getUserSummaryName(user);

  return (
    <header className="sticky top-0 z-30 border-b border-[#ded5c4]/70 bg-[#fbf7ed]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="leading-none">
          <span className="block font-serif text-2xl tracking-[0.35em] text-[#1d2815]">
            BASTI
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#697056]">
            Consumer Web
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#3b412f] md:flex">
          <Link href="/">Inicio</Link>
          <Link href="/#menu">Menu</Link>
          <Link href="/#beneficios">Beneficios</Link>
          <Link href={isAuthenticated ? "/dashboard" : "/register"}>
            {isAuthenticated ? "Mi cuenta" : "Unirme"}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isLoading ? (
            <span className="rounded-full border border-[#d8ccb6] px-4 py-2 text-sm font-semibold text-[#364026]">
              Cargando...
            </span>
          ) : isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  pathname === "/profile"
                    ? "border-[#385126] bg-[#385126] text-white"
                    : "border-[#d8ccb6] text-[#364026] hover:bg-white"
                }`}
              >
                {accountLabel}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="rounded-full bg-[#385126] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#26391a] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoggingOut ? "Cerrando..." : "Cerrar sesion"}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border border-[#d8ccb6] px-4 py-2 text-sm font-semibold text-[#364026] transition hover:bg-white"
              >
                Iniciar sesion
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[#385126] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#26391a]"
              >
                Crear cuenta
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
