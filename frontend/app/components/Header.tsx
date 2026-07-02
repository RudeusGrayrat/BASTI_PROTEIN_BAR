import Link from "next/link";

type HeaderProps = {
  mode?: "public" | "private";
};

export function Header({ mode = "public" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#ded5c4]/70 bg-[#fbf7ed]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="leading-none">
          <span className="block font-serif text-2xl tracking-[0.35em] text-[#1d2815]">
            BASTI
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#697056]">
            Protein Bar
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#3b412f] md:flex">
          <Link href="/">Inicio</Link>
          <Link href="/#menu">Menu</Link>
          <Link href="/#beneficios">Beneficios</Link>
          <Link href={mode === "private" ? "/dashboard" : "/#puntos"}>Puntos</Link>
        </nav>

        <div className="flex items-center gap-3">
          {mode === "private" ? (
            <Link
              href="/"
              className="rounded-full border border-[#d8ccb6] px-4 py-2 text-sm font-semibold text-[#364026] transition hover:bg-white"
            >
              Salir
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-[#d8ccb6] px-4 py-2 text-sm font-semibold text-[#364026] transition hover:bg-white"
            >
              Iniciar sesion
            </Link>
          )}
          <Link
            href={mode === "private" ? "/dashboard" : "/register"}
            className="rounded-full bg-[#385126] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#26391a]"
          >
            Pedir ahora
          </Link>
        </div>
      </div>
    </header>
  );
}
