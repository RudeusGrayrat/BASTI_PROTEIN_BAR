"use client";
import Link from "next/link";
import { getUserSummaryName, useAuth } from "../context/auth-context";
export default function AccountPage() {
  const { user } = useAuth();
  return (
    <>
      <section className="rounded-3xl bg-[#314620] p-8 text-[#fbf7ed] sm:p-12">
        <p className="text-xs uppercase tracking-widest text-[#d4deb6]">
          Qué bueno tenerte aquí
        </p>
        <h1 className="mt-4 break-words font-serif text-4xl sm:text-5xl">
          Hola, {getUserSummaryName(user)}.
        </h1>
        <p className="mt-4 max-w-xl leading-7 text-white/80">
          Tus compras, tus beneficios y toda tu información en un solo lugar.
        </p>
        <Link
          href="/menu"
          className="mt-6 inline-flex rounded-full bg-[#fbf7ed] px-6 py-3 font-semibold text-[#314620]"
        >
          Elegir algo rico →
        </Link>
      </section>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {[
          {
            href: "/cuenta/pedidos",
            title: "Mis pedidos",
            text: "Consulta el detalle de las compras asociadas a tu cuenta.",
          },
          {
            href: "/puntos",
            title: "Mis puntos",
            text: "Revisa tu saldo y los movimientos de tus beneficios.",
          },
          {
            href: "/profile",
            title: "Mi perfil",
            text: "Mantén tus datos personales actualizados.",
          },
        ].map((item) => (
          <Link
            className="basti-panel transition hover:border-[#556235]"
            href={item.href}
            key={item.href}
          >
            <h2 className="font-serif text-3xl">{item.title}</h2>
            <p className="my-4 text-sm leading-6 text-[#60664f]">{item.text}</p>
            <span className="text-sm font-semibold text-[#556235]">
              Consultar →
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
