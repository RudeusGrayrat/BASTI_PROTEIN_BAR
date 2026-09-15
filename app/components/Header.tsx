"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getUserSummaryName, useAuth } from "../context/auth-context";
import { CartLink } from "../features/commerce/CartLink";
import { UserIcon } from "./icons";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "Menú" },
  { href: "/puntos", label: "Puntos" },
  { href: "/nosotros", label: "Nosotros" },
];
export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading, logout, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  async function signOut() {
    setBusy(true);
    setError("");
    try {
      await logout();
      setOpen(false);
      router.refresh();
    } catch {
      setError(
        "Saliste de la cuenta, pero no pudimos confirmar el cierre en el servidor.",
      );
    } finally {
      setBusy(false);
    }
  }
  const returnPath =
    pathname.startsWith("/cuenta") ||
    ["/carrito", "/profile", "/puntos"].includes(pathname)
      ? pathname
      : "/cuenta";
  return (
    <header className="sticky top-0 z-40 border-b border-[#dcd5c5]/70 bg-[#fbf7ed]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-x-6 px-5 sm:px-8">
        <Link href="/" aria-label="Basti, inicio" className="py-4 leading-none">
          <span className="block font-serif text-3xl tracking-[0.22em] text-[#1d2815]">
            BASTI
          </span>
          <span className="mt-1.5 block text-[9px] font-semibold uppercase tracking-[0.3em] text-[#697056]">
            Protein Bar
          </span>
        </Link>
        <nav
          aria-label="Navegación principal"
          className="order-3 flex w-full items-center justify-between gap-3 overflow-x-auto border-t border-[#ded5c4]/50 lg:order-none lg:w-auto lg:gap-8 lg:border-0"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`shrink-0 py-3 text-sm font-medium transition hover:text-[#556235] lg:py-7 ${pathname === link.href ? "text-[#314620]" : "text-[#636650]"}`}
            >
              <span
                className={
                  pathname === link.href
                    ? "underline decoration-2 underline-offset-4"
                    : ""
                }
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <CartLink />
          <div
            className="relative"
            ref={container}
            onBlur={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null,
                )
              )
                setOpen(false);
            }}
          >
            <button
              ref={trigger}
              type="button"
              title="Mi cuenta"
              aria-label="Mi cuenta"
              aria-expanded={open}
              aria-controls="account-navigation"
              onClick={() => setOpen((value) => !value)}
              className={`grid h-11 w-11 place-items-center rounded-full border transition focus-visible:outline-2 focus-visible:outline-offset-4 ${open ? "border-[#556235] bg-[#556235] text-white" : "border-[#dcd5c5] bg-white/60 text-[#45502b] hover:bg-[#eee9dc]"}`}
            >
              <UserIcon className="h-5 w-5" />
            </button>
            {open && (
              <div
                id="account-navigation"
                className="absolute right-0 top-full mt-3 w-64 max-w-[calc(100vw-2.5rem)] rounded-2xl border border-[#e2d6c4] bg-[#fffaf1] p-2 shadow-xl shadow-[#314620]/10"
              >
                {isLoading ? (
                  <p role="status" className="p-3 text-sm text-[#60664f]">
                    Recuperando tu cuenta…
                  </p>
                ) : isAuthenticated ? (
                  <>
                    <p className="border-b border-[#e2d6c4] px-3 pb-3 pt-2 text-sm font-semibold">
                      {getUserSummaryName(user)}
                    </p>
                    {[
                      ["/cuenta", "Mi cuenta"],
                      ["/profile", "Mi perfil"],
                      ["/cuenta/pedidos", "Mis compras"],
                      ["/puntos", "Mis puntos"],
                    ].map(([href, label]) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-3 py-3 text-sm hover:bg-[#eee9dc]"
                      >
                        {label}
                      </Link>
                    ))}
                    <button
                      type="button"
                      disabled={busy}
                      onClick={signOut}
                      className="mt-1 w-full border-t border-[#e2d6c4] px-3 py-3 text-left text-sm text-[#8c3b31] disabled:opacity-50"
                    >
                      {busy ? "Cerrando sesión…" : "Cerrar sesión"}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="px-3 pb-2 pt-3 font-serif text-xl">
                      Tu espacio Basti
                    </p>
                    <Link
                      href={`/login?next=${encodeURIComponent(returnPath)}`}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-3 text-sm hover:bg-[#eee9dc]"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      href={`/register?next=${encodeURIComponent(returnPath)}`}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-3 text-sm hover:bg-[#eee9dc]"
                    >
                      Crear una cuenta
                    </Link>
                  </>
                )}
                {error && (
                  <p role="alert" className="p-3 text-sm text-[#8c3b31]">
                    {error}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
