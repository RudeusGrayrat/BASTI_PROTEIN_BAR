"use client";

import Link from "next/link";
import { useMemo } from "react";
import { dashboardMenu, nutritionPreview, products, recentOrders } from "./data";
import {
  BagIcon,
  BellIcon,
  CrownIcon,
  GiftIcon,
  HeartIcon,
  MapPinIcon,
  MenuGridIcon,
} from "./icons";
import { ProductImage } from "./ProductImage";
import {
  getProfileStatus,
  getUserSummaryName,
  useAuth,
} from "../context/auth-context";

export function BastiDashboard() {
  const { user } = useAuth();

  const dashboardStats = useMemo(() => {
    if (!user) {
      return null;
    }

    const seed = user.id
      .split("")
      .reduce((accumulator, character) => accumulator + character.charCodeAt(0), 0);
    const profileScore =
      Number(Boolean(user.firstName?.trim())) +
      Number(Boolean(user.lastName?.trim())) +
      Number(Boolean(user.phone?.trim())) +
      Number(Boolean(user.documentType && user.documentNumber?.trim()));
    const points = 1850 + seed * 7 + profileScore * 180;
    const level =
      points >= 5000 ? "Black" : points >= 2800 ? "Gold" : points >= 1800 ? "Silver" : "Bronze";
    const nextLevel = level === "Black" ? "Maximo nivel" : level === "Gold" ? "Black" : level === "Silver" ? "Gold" : "Silver";
    const nextThreshold = level === "Black" ? points : level === "Gold" ? 5000 : level === "Silver" ? 2800 : 1800;
    const remaining = Math.max(nextThreshold - points, 0);
    const progress =
      level === "Black"
        ? 100
        : Math.min(
            100,
            Math.round(
              ((points - (level === "Gold" ? 2800 : level === "Silver" ? 1800 : 1000)) /
                (nextThreshold - (level === "Gold" ? 2800 : level === "Silver" ? 1800 : 1000))) *
                100,
            ),
          );
    const streakDays = 5 + (seed % 5);

    return {
      points,
      level,
      nextLevel,
      remaining,
      progress: Number.isFinite(progress) ? Math.max(progress, 18) : 18,
      streakDays,
      availableSoles: (points / 100).toFixed(2),
      greeting: getUserSummaryName(user),
      profileStatus: getProfileStatus(user),
    };
  }, [user]);

  if (!user || !dashboardStats) return null;

  const firstName = user.firstName?.trim() || dashboardStats.greeting;
  const profileCardTone =
    dashboardStats.level === "Black"
      ? "from-[#2b2f24] to-[#414635]"
      : dashboardStats.level === "Gold"
        ? "from-[#617343] to-[#82915c]"
        : "from-[#7f806c] to-[#adb098]";

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6f1e5_0%,#f3ede0_100%)] text-[#1c1b15]">
      <div className="mx-auto grid min-h-screen max-w-[1520px] lg:grid-cols-[290px_1fr]">
        <aside className="border-r border-[#e5dbca] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(245,238,227,0.92))] px-6 py-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#171710] text-[#f8efdc] shadow-lg shadow-[#171710]/15">
              <span className="text-2xl font-black">B</span>
            </div>
            <div>
              <p className="font-serif text-4xl leading-none tracking-[0.18em] text-[#171710]">
                BASTI
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#556235]">
                Protein Bar
              </p>
            </div>
          </Link>

          <nav className="mt-10 space-y-2">
            {dashboardMenu.map((item, index) => (
              <Link
                key={item}
                href={item === "Perfil" ? "/profile" : "/"}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium transition ${
                  index === 0
                    ? "bg-[#eeecde] text-[#2b2c22]"
                    : "text-[#44453d] hover:bg-white/70"
                }`}
              >
                {index === 0 ? (
                  <MenuGridIcon className="h-5 w-5" />
                ) : index === 1 ? (
                  <BagIcon className="h-5 w-5" />
                ) : index === 2 ? (
                  <BagIcon className="h-5 w-5" />
                ) : index === 3 ? (
                  <GiftIcon className="h-5 w-5" />
                ) : index === 4 ? (
                  <CrownIcon className="h-5 w-5" />
                ) : index === 5 ? (
                  <HeartIcon className="h-5 w-5" />
                ) : (
                  <MenuGridIcon className="h-5 w-5" />
                )}
                {item}
              </Link>
            ))}
          </nav>

          <div className="mt-10 rounded-[2rem] border border-[#ece1cf] bg-white/75 p-5 shadow-[0_18px_34px_rgba(90,72,39,0.08)]">
            <div className="overflow-hidden rounded-[1.6rem] bg-[#f2e7d6]">
              <ProductImage variant="matcha" alt="Affogato protein matcha" />
            </div>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.24em] text-[#637046]">
              Nuevo
            </p>
            <h3 className="mt-2 text-[2rem] font-semibold leading-tight">
              Affogato Protein Matcha
            </h3>
            <Link
              href="/"
              className="mt-5 inline-flex rounded-full bg-[#556235] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#556235]/18 transition hover:bg-[#45502b]"
            >
              Pedir ahora
            </Link>
          </div>
        </aside>

        <section className="px-5 py-6 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#738055]">
                Consumer App
              </p>
              <h1 className="mt-2 text-5xl font-semibold">
                Dashboard
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-[#ddd1bd] bg-white/70 px-4 py-3 text-sm font-semibold text-[#2a2c22] md:flex">
                <MapPinIcon className="h-4 w-4" />
                BASTI San Isidro
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-full border border-[#ddd1bd] bg-white/80 text-[#556235]">
                <BellIcon className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-3 rounded-full border border-[#ddd1bd] bg-white/80 px-3 py-2 shadow-sm">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#556235] font-bold text-white">
                  {firstName.slice(0, 1).toUpperCase()}
                </div>
                <div className="pr-2">
                  <p className="text-sm font-semibold text-[#25251e]">{firstName}</p>
                  <p className="text-xs text-[#6c6a5f]">{dashboardStats.profileStatus}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
            <div className={`rounded-[2rem] bg-gradient-to-br ${profileCardTone} p-6 text-white shadow-[0_28px_60px_rgba(76,92,45,0.24)]`}>
              <div className="grid gap-6 lg:grid-cols-[1fr_240px] lg:items-center">
                <div>
                  <p className="text-lg font-semibold text-white/88">Tu nivel actual</p>
                  <div className="mt-2 flex items-center gap-3">
                    <h2 className="text-6xl font-semibold">
                      {dashboardStats.level}
                    </h2>
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#f0ca68]/22 text-[#ffdc85]">
                      <CrownIcon className="h-7 w-7" />
                    </div>
                  </div>
                  <p className="mt-4 text-2xl font-semibold">
                    {dashboardStats.points.toLocaleString("es-PE")} pts
                  </p>
                  <div className="mt-5 h-4 overflow-hidden rounded-full bg-white/18">
                    <div
                      className="h-full rounded-full bg-[#e6c76b]"
                      style={{ width: `${dashboardStats.progress}%` }}
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-white/84">
                    <span>
                      {dashboardStats.remaining.toLocaleString("es-PE")} pts para{" "}
                      {dashboardStats.nextLevel}
                    </span>
                    <span className="font-semibold">Vista previa conectada</span>
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
                  <div className="overflow-hidden rounded-[1.4rem] bg-white/20">
                    <ProductImage variant="matcha" alt="Matcha latte proteico" large />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#e7dccb] bg-white/76 p-6 shadow-[0_18px_34px_rgba(90,72,39,0.08)]">
              <p className="text-lg font-semibold">Puntos disponibles</p>
              <p className="mt-4 text-6xl font-semibold text-[#26241b]">
                {dashboardStats.points.toLocaleString("es-PE")}
                <span className="ml-2 text-3xl font-medium">pts</span>
              </p>
              <p className="mt-4 text-lg text-[#5f5b4f]">
                ≈ S/ {dashboardStats.availableSoles} en recompensas
              </p>
              <Link
                href="/"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#dfd2c0] bg-[#f8f4ec] px-6 py-4 text-sm font-bold text-[#24231d] transition hover:bg-white"
              >
                <GiftIcon className="h-5 w-5" />
                Ver recompensas
              </Link>
            </div>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-3">
            <section className="rounded-[2rem] border border-[#e7dccb] bg-white/76 p-6 shadow-[0_18px_34px_rgba(90,72,39,0.08)]">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Progreso nutricional</h3>
                <span className="text-sm font-semibold text-[#68754b]">Hoy</span>
              </div>
              <div className="mt-6 space-y-6">
                {nutritionPreview.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold">{item.label}</p>
                        <p className="text-sm text-[#69675c]">
                          {item.value} / {item.target}
                        </p>
                      </div>
                      <p className="text-lg font-semibold text-[#3d432e]">
                        {item.progress}%
                      </p>
                    </div>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#ece5d7]">
                      <div
                        className={`h-full rounded-full ${
                          item.tone === "amber"
                            ? "bg-[#d79043]"
                            : item.tone === "sage"
                              ? "bg-[#7d855b]"
                              : "bg-[#6e7f47]"
                        }`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#e7dccb] bg-white/76 p-6 shadow-[0_18px_34px_rgba(90,72,39,0.08)]">
              <h3 className="text-2xl font-semibold">Racha actual</h3>
              <div className="mt-6 flex items-center gap-6">
                <div className="grid h-36 w-36 place-items-center rounded-full border-[10px] border-[#d9dbc9] text-center">
                  <div>
                    <p className="text-6xl font-semibold">
                      {dashboardStats.streakDays}
                    </p>
                    <p className="mt-1 text-sm font-medium uppercase tracking-[0.18em] text-[#666459]">
                      dias
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#999380]">
                    {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
                      <span key={`${day}-${index}`}>{day}</span>
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-7 gap-2">
                    {Array.from({ length: 7 }).map((_, index) => (
                      <div
                        key={index}
                        className={`grid h-8 w-8 place-items-center rounded-full text-sm ${
                          index < Math.min(dashboardStats.streakDays, 7)
                            ? "bg-[#dfe6be] text-[#566237]"
                            : "bg-[#f1ecdf] text-[#b0a89b]"
                        }`}
                      >
                        ok
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-lg font-semibold text-[#384025]">
                    Excelente! Sigue asi
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#666459]">
                    Mantienes tu racha activa para ganar mas puntos y beneficios.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#e7dccb] bg-white/76 p-6 shadow-[0_18px_34px_rgba(90,72,39,0.08)]">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-semibold">Desafio semanal</h3>
                <span className="rounded-full bg-[#eff0dd] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#69754b]">
                  Quedan 3 dias
                </span>
              </div>
              <div className="mt-6 flex items-center gap-5">
                <div className="grid h-24 w-24 place-items-center rounded-full bg-[#f4f0e5] text-[#7a8259]">
                  <GiftIcon className="h-10 w-10" />
                </div>
                <div>
                  <p className="text-2xl font-semibold leading-tight">
                    Consume 5 bebidas proteicas esta semana
                  </p>
                  <p className="mt-3 text-sm text-[#666459]">3 / 5 completadas</p>
                </div>
              </div>
              <div className="mt-6 h-3 overflow-hidden rounded-full bg-[#ece5d7]">
                <div className="h-full w-[60%] rounded-full bg-[#7e8e56]" />
              </div>
              <div className="mt-5 inline-flex rounded-full bg-[#eef0dd] px-4 py-2 text-sm font-semibold text-[#5d6840]">
                +200 pts
              </div>
            </section>
          </div>

          <div className="mt-5 grid gap-5 2xl:grid-cols-[1.2fr_1fr]">
            <section className="rounded-[2rem] border border-[#e7dccb] bg-white/76 p-6 shadow-[0_18px_34px_rgba(90,72,39,0.08)]">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Pedidos recientes</h3>
                <Link href="/" className="text-sm font-semibold text-[#5a6840]">
                  Ver todos
                </Link>
              </div>
              <div className="mt-5 space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={`${order.name}-${order.date}`}
                    className="flex flex-wrap items-center gap-4 rounded-[1.4rem] border border-[#eee6da] bg-[#fcfaf4] p-4"
                  >
                    <div className="h-18 w-18 overflow-hidden rounded-2xl bg-[#efe5d4]">
                      <ProductImage variant={order.art} alt={order.name} />
                    </div>
                    <div className="min-w-[220px] flex-1">
                      <p className="text-lg font-semibold">{order.name}</p>
                      <p className="mt-1 text-sm text-[#7b7769]">
                        {order.date} - {order.time}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#eef0dd] px-4 py-2 text-sm font-semibold text-[#5f6942]">
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#e7dccb] bg-white/76 p-6 shadow-[0_18px_34px_rgba(90,72,39,0.08)]">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Favoritos</h3>
                <Link href="/" className="text-sm font-semibold text-[#5a6840]">
                  Ver todos
                </Link>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {products.slice(0, 3).map((product) => (
                  <article
                    key={product.name}
                    className="overflow-hidden rounded-[1.4rem] border border-[#eee6da] bg-[#fcfaf4]"
                  >
                    <div className="relative overflow-hidden bg-[#f2e7d7]">
                      <ProductImage variant={product.image} alt={product.name} />
                      <div className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/85 text-[#6e7b49] shadow-sm">
                        <HeartIcon className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xl font-semibold leading-tight">{product.name}</p>
                      <p className="mt-3 text-base font-medium text-[#35332a]">
                        {product.price}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <section className="mt-5 rounded-[2rem] border border-[#e7dccb] bg-[linear-gradient(90deg,#f6f0e0_0%,#efe8d6_100%)] p-6 shadow-[0_18px_34px_rgba(90,72,39,0.08)]">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-[#e6c76b] text-[#6b531e] shadow-inner">
                  <CrownIcon className="h-10 w-10" />
                </div>
                <div>
                  <p className="text-4xl font-semibold">Eres {dashboardStats.level}</p>
                  <p className="mt-2 text-lg text-[#5f5b4f]">
                    Disfruta de una experiencia premium inspirada en tus visitas y tu
                    perfil real.
                  </p>
                </div>
              </div>

              <Link
                href="/profile"
                className="inline-flex items-center rounded-full bg-[#556235] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#556235]/20 transition hover:bg-[#45502b]"
              >
                Ver mis beneficios
              </Link>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
