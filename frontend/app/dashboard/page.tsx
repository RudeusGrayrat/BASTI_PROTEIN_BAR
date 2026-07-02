"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { benefits, products, tiers } from "../components/data";
import { Header } from "../components/Header";
import { ProductArt } from "../components/ProductArt";
import { ProductCard } from "../components/ProductCard";

type BastiUser = {
  name: string;
  email: string;
  points: number;
  tier: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user] = useState<BastiUser | null | undefined>(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const rawUser = window.localStorage.getItem("basti-user");
    return rawUser ? (JSON.parse(rawUser) as BastiUser) : null;
  });
  const progress = useMemo(() => Math.min(100, ((user?.points || 0) / 5000) * 100), [user]);

  useEffect(() => {
    if (user === null) {
      router.replace("/login");
    }
  }, [router, user]);

  function logout() {
    window.localStorage.removeItem("basti-user");
    router.push("/");
  }

  if (!user) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#fbf7ed] text-[#385126]">
        Preparando tu experiencia Basti...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbf7ed] text-[#1d2815]">
      <Header mode="private" />

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-3xl bg-[#314620] p-6 text-white shadow-2xl shadow-[#314620]/20 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#d6c79d]">Hola, {user.name}</p>
              <h1 className="mt-2 font-serif text-5xl">Tu nivel actual es {user.tier}</h1>
              <p className="mt-4 max-w-xl text-white/75">
                Tienes {user.points.toLocaleString("es-PE")} puntos disponibles. Sigue acumulando para desbloquear envio gratis, productos exclusivos y descuentos.
              </p>
              <div className="mt-7 h-3 overflow-hidden rounded-full bg-white/20">
                <div className="h-full rounded-full bg-[#d7aa4d]" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-3 text-sm text-white/70">{5000 - user.points} pts para Black</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/15">
              <ProductArt variant="matcha" />
            </div>
          </div>
        </div>

        <aside className="rounded-3xl border border-[#e1d7c7] bg-white/70 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#6d744f]">Cuenta</p>
              <p className="mt-2 font-semibold">{user.email}</p>
            </div>
            <button onClick={logout} className="rounded-full border border-[#d8ccb6] px-4 py-2 text-sm font-bold text-[#385126]">
              Salir
            </button>
          </div>
          <div className="mt-6 space-y-3">
            {["Pedido listo en 18 min", "2 cupones activos", "Favorito: Waffle Clasico"].map((item) => (
              <div key={item} className="rounded-2xl bg-[#fffaf0] p-4 text-sm font-semibold text-[#3b412f]">
                {item}
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div key={tier.name} className="rounded-2xl border border-[#e1d7c7] bg-white/70 p-5">
              <div className={`mb-4 h-10 w-10 rounded-full bg-gradient-to-br ${tier.color}`} />
              <p className="font-serif text-2xl">{tier.name}</p>
              <p className="mt-1 text-sm text-[#6e6a5d]">{tier.range}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#6d744f]">Menu privado</p>
            <h2 className="mt-2 font-serif text-4xl">Recomendado para ti</h2>
          </div>
          <Link href="/" className="hidden font-semibold text-[#385126] sm:inline">
            Ver landing
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8">
        <div className="rounded-3xl border border-[#e1d7c7] bg-white/70 p-6 sm:p-8">
          <h2 className="font-serif text-3xl">Beneficios activos</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {benefits.map((benefit) => (
              <div key={benefit} className="rounded-2xl bg-[#fffaf0] p-4">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-[#ece7c7] text-[#385126]">✓</div>
                <p className="font-semibold">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
