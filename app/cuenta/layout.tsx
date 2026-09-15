"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Header } from "../components/Header";
import { useAuth } from "../context/auth-context";

const navigation = [
  { href: "/cuenta", label: "Resumen" },
  { href: "/cuenta/pedidos", label: "Mis pedidos" },
  { href: "/puntos", label: "Mis puntos" },
  { href: "/profile", label: "Mi perfil" },
];
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isLoading, isAuthenticated } = useAuth();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        {
          <>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#556235]">
              Mi espacio Basti
            </p>
            <nav aria-label="Mi cuenta" className="my-6 flex flex-wrap gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`rounded-full border px-5 py-3 text-sm font-semibold ${pathname === item.href ? "bg-[#556235] text-white" : "border-[#d8ccb6] bg-white/70"}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </>
        }
        {isLoading ? (
          <p role="status">Recuperando tu cuenta…</p>
        ) : !isAuthenticated ? (
          <section className="basti-panel">
            <h1 className="font-serif text-4xl">Tu cuenta, tus momentos</h1>
            <p className="my-5 text-[#60664f]">
              Inicia sesión para ver tus compras, puntos y datos personales.
            </p>
            <Link
              className="basti-button"
              href={`/login?next=${encodeURIComponent(pathname)}`}
            >
              Ingresar a mi cuenta
            </Link>
          </section>
        ) : (
          children
        )}
      </main>
    </>
  );
}
