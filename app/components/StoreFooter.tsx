"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStorefront } from "../features/commerce/StorefrontProvider";

function Phone({ value }: { value: string }) {
  const dial = value.replace(/[^+\d]/g, "");
  return dial ? <a href={"tel:" + dial}>{value}</a> : <span>{value}</span>;
}
function websiteLink(value: string | null | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
export function StoreFooter() {
  const { configuration, loading, retry } = useStorefront();
  const pathname = usePathname();
  if (["/login", "/register"].includes(pathname)) return null;
  const website = websiteLink(configuration?.websiteUrl);
  return (
    <footer className="store-footer">
      <div className="store-footer-grid">
        <div>
          <Link href="/" className="font-serif text-3xl tracking-[.2em]">
            {configuration?.name || "BASTI"}
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-7 text-[#cbd0bb]">
            Tu pausa favorita, a tu ritmo.
          </p>
          <nav
            aria-label="Más sobre Basti"
            className="mt-5 flex flex-wrap gap-5 text-sm"
          >
            <Link href="/nosotros">Nosotros</Link>
            <Link href="/menu">Menú</Link>
            <Link href="/puntos">Puntos</Link>
          </nav>
        </div>
        {configuration ? (
          <>
            <section>
              <h2>Conversemos</h2>
              <div className="store-footer-details">
                {configuration.email && (
                  <a href={"mailto:" + encodeURIComponent(configuration.email)}>
                    {configuration.email}
                  </a>
                )}
                {configuration.phone && <Phone value={configuration.phone} />}{" "}
                {website && (
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    Sitio web de {configuration.name} ↗
                  </a>
                )}
                {!configuration.email && !configuration.phone && !website && (
                  <p>Los datos de contacto estarán disponibles próximamente.</p>
                )}
              </div>
            </section>
            <section>
              <h2>Encuéntranos</h2>
              {configuration.branches.length ? (
                <ul className="store-footer-branches">
                  {configuration.branches.map((branch) => (
                    <li key={branch.id}>
                      <h3>{branch.name}</h3>
                      {branch.address && (
                        <address className="not-italic">
                          {branch.address}
                        </address>
                      )}
                      {branch.phone && <Phone value={branch.phone} />}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-[#cbd0bb]">
                  Pronto compartiremos nuestras sedes.
                </p>
              )}
            </section>
          </>
        ) : (
          <p role="status" className="text-sm text-[#cbd0bb]">
            {loading
              ? "Cargando información de contacto…"
              : "No pudimos cargar los datos de contacto."}
            {!loading && (
              <button onClick={retry} className="ml-3 underline">
                Reintentar
              </button>
            )}
          </p>
        )}
      </div>
      <div className="store-footer-bottom">
        <span>
          © {new Date().getFullYear()}{" "}
          {configuration?.legalName || configuration?.name || "Basti"}
        </span>
        <span>Pequeños hábitos, buenos momentos.</span>
      </div>
    </footer>
  );
}
