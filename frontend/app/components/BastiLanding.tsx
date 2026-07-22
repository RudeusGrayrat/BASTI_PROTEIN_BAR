"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import {
  experienceHighlights,
  featurePillars,
  products,
  rewardPreview,
} from "./data";
import {
  ArrowRightIcon,
  BagIcon,
  BarbellIcon,
  BoltIcon,
  HeartIcon,
  LeafIcon,
  MenuGridIcon,
  SproutIcon,
  UserIcon,
} from "./icons";
import { ProductImage } from "./ProductImage";
import { getUserSummaryName, useAuth } from "../context/auth-context";

const pillarIcons = {
  leaf: LeafIcon,
  barbell: BarbellIcon,
  bolt: BoltIcon,
  sprout: SproutIcon,
} as const;

export function BastiLanding() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const accountLabel = useMemo(() => getUserSummaryName(user), [user]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),transparent_28%),linear-gradient(180deg,#f6f0e3_0%,#f2eadb_100%)] text-[#171710]">
      <header className="sticky top-0 z-30 border-b border-[#dfd4c3] bg-[#f8f4ec]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-6 px-5 py-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#171710] text-[#f8efdc] shadow-lg shadow-[#171710]/15">
              <span className="text-2xl font-black">B</span>
            </div>
            <div>
              <p className="font-serif text-4xl leading-none tracking-[0.14em] text-[#171710]">
                BASTI
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4e5d33]">
                Protein Bar
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-[15px] font-medium text-[#27291f] lg:flex">
            {["Inicio", "Menu", "Beneficios", "Puntos", "Nosotros", "Contacto"].map(
              (item, index) => (
                <Link
                  key={item}
                  href={index === 0 ? "/" : `/#${item.toLowerCase()}`}
                  className={`pb-2 transition hover:text-[#4e5d33] ${index === 0
                    ? "border-b-2 border-[#4e5d33] text-[#171710]"
                    : "border-b-2 border-transparent"
                    }`}
                >
                  {item}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            {isLoading ? (
              <span className="rounded-full border border-[#cfc4b2] px-5 py-3 text-sm font-semibold text-[#464636]">
                Cargando...
              </span>
            ) : isAuthenticated ? (
              <>
                <Link
                  href="/"
                  className="hidden rounded-full border border-[#cfc4b2] bg-white/70 px-5 py-3 text-sm font-semibold text-[#27291f] transition hover:bg-white sm:inline-flex"
                >
                  {accountLabel}
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full bg-[#556235] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#556235]/20 transition hover:bg-[#45502b]"
                >
                  <BagIcon className="h-4 w-4" />
                  Ir a mi cuenta
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-full border border-[#cfc4b2] bg-white/70 px-5 py-3 text-sm font-semibold text-[#27291f] transition hover:bg-white"
                >
                  <UserIcon className="h-4 w-4" />
                  Iniciar sesion
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-[#556235] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#556235]/20 transition hover:bg-[#45502b]"
                >
                  <BagIcon className="h-4 w-4" />
                  Pedir ahora
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="relative min-h-[720px] overflow-hidden">
        <Image
          src={"/images/basti/hero-waffles.png"}
          alt="Waffles proteicos BASTI con platano y cacao"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(246,240,227,0.96)_0%,rgba(246,240,227,0.82)_25%,rgba(246,240,227,0.24)_40%,rgba(246,240,227,0.06)_70%)]" />

        <div className="relative z-10 mx-auto grid max-w-[1380px] gap-10 px-5 pb-10 pt-10 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-0 lg:pt-12">
          <div className="relative z-10 max-w-[590px] pb-6 lg:pb-8">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/78 px-4 py-2 text-sm font-bold text-[#393e2d] shadow-sm backdrop-blur">
              <LeafIcon className="h-4 w-4" />
              100% saludable
            </div>
            <h1 className="font-serif text-6xl leading-none text-[#171710] sm:text-7xl lg:text-8xl">
              Waffles proteicos
              <span className="block text-[#556235]">sin azucar</span>
              anadida
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#4d4b41] sm:text-xl">
              Deliciosos, nutritivos y hechos con ingredientes naturales para
              cuidar de ti sin sacrificar el sabor.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={isAuthenticated ? "/" : "/register"}
                className="inline-flex items-center gap-2 rounded-full bg-[#556235] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#556235]/20 transition hover:bg-[#45502b]"
              >
                Pedir ahora
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="#menu"
                className="inline-flex items-center gap-2 rounded-full border border-[#bfb39d] bg-[#fbf8f1]/80 px-6 py-4 text-sm font-semibold text-[#27291f] transition hover:bg-white"
              >
                <MenuGridIcon className="h-4 w-4" />
                Ver menu
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <div className="flex -space-x-3">
                {["A", "M", "C", "L"].map((letter, index) => (
                  <div
                    key={`${letter}-${index}`}
                    className="grid h-12 w-12 place-items-center rounded-full border-2 border-[#f6f0e3] bg-gradient-to-br from-[#e6d7c0] to-[#b49872] text-sm font-bold text-[#251c13]"
                    style={{ zIndex: 4 - index }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-[#556235]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index}>*</span>
                  ))}
                </div>
                <p className="mt-1 text-base text-[#44433c]">
                  +2,500 clientes felices
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[560px] lg:min-h-[680px]">
            <div className="absolute -right-[10%] -top-[10%] z-10 grid h-36 w-36 place-items-center rounded-full bg-[#f6ebd3]/95 text-center shadow-lg shadow-[#a88f64]/15">
              <div>
                <p className="font-serif text-6xl leading-none text-[#171710]">25g</p>
                <p className="mt-2 text-lg font-black uppercase tracking-[0.12em] text-[#232016]">
                  Proteina
                </p>
                <p className="mt-1 text-sm text-[#4e493b]">por porcion</p>
              </div>
            </div>

            <div className="absolute -bottom-[4%] -right-[30%] z-20 max-w-[280px] rounded-[1.65rem] border border-[#75654f]/35 bg-[#2b281f]/82 p-5 text-[#f5efdf] shadow-2xl shadow-[#15120c]/25 backdrop-blur-md">
              <div className="flex gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-[#7c8256]/55 bg-[#1f1d16] text-[#d6e39e]">
                  <LeafIcon className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xl font-semibold">Ingredientes reales</p>
                  <p className="mt-1 text-sm leading-6 text-[#f3ecdd]/82">
                    Sin conservantes ni colorantes artificiales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-4 max-w-[1380px] px-5 pb-4 sm:px-8 lg:-mt-10">
        <div className="grid gap-px overflow-hidden rounded-[1.85rem] bg-[#3f412f] p-px shadow-2xl shadow-[#1e1c16]/18 lg:grid-cols-4">
          {featurePillars.map((pillar) => {
            const Icon = pillarIcons[pillar.icon];

            return (
              <div
                key={pillar.title}
                className="flex items-start gap-4 bg-[#181813] px-6 py-6 text-white"
              >
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#4a572e] text-[#e9f2ca]">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xl font-semibold">{pillar.title}</p>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-[#e7e1d2]/76">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        id="menu"
        className="mx-auto grid max-w-[1380px] gap-8 px-5 py-10 sm:px-8 xl:grid-cols-[0.64fr_1.36fr]"
      >
        <div className="flex flex-col justify-between rounded-[2rem] bg-[linear-gradient(180deg,#f8f1e5_0%,#f4ebdd_100%)] p-8 shadow-[0_18px_40px_rgba(90,72,39,0.08)]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#5f6942]">
              Nuestro menu
            </p>
            <h2 className="mt-4 font-serif text-5xl leading-tight text-[#1b1a13]">
              Productos favoritos
            </h2>
            <div className="mt-5 h-1 w-16 rounded-full bg-[#5f6942]" />
            <p className="mt-8 max-w-sm text-lg leading-8 text-[#4c4b43]">
              Elige tus sabores favoritos y disfruta de una opcion saludable en
              cualquier momento del dia.
            </p>
          </div>

          <Link
            href={isAuthenticated ? "/" : "/register"}
            className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-[#556235] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#556235]/20 transition hover:bg-[#45502b]"
          >
            Ver todo el menu
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[repeat(4,minmax(0,1fr))_0.95fr]">
          {products.map((product) => (
            <article
              key={product.name}
              className="overflow-hidden rounded-[1.8rem] border border-[#e2d6c4] bg-white/70 shadow-[0_18px_40px_rgba(90,72,39,0.07)]"
            >
              <div className="relative">
                <div className="overflow-hidden bg-[#f2e8d8]">
                  <ProductImage variant={product.image} alt={product.name} />
                </div>
                <span className="absolute left-4 top-4 rounded-full bg-[#f7edd6]/95 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#534328] shadow-sm">
                  {product.protein}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-[1.6rem] font-semibold leading-tight text-[#191911]">
                  {product.name.replace("Proteico", "").replace("Protein", "").trim()}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#59584f]">
                  {product.description}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#6a624d]">
                    Favorito BASTI
                  </span>
                  <HeartIcon className="h-5 w-5 text-[#8c8574]" />
                </div>
              </div>
            </article>
          ))}

          <aside className="overflow-hidden rounded-[1.8rem] bg-[linear-gradient(180deg,rgba(30,30,24,0.94),rgba(38,39,28,0.92))] p-7 text-[#f7f0df] shadow-[0_24px_50px_rgba(23,21,16,0.18)]">
            <div className="mb-12">
              <p className="font-serif text-5xl leading-tight">
                Mas que un lugar,
                <span className="block text-[#d6ddaa]">una experiencia.</span>
              </p>
            </div>
            <div className="space-y-8">
              {experienceHighlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0"
                >
                  <p className="text-lg font-semibold">{highlight.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#f5efdf]/70">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="beneficios" className="mx-auto max-w-[1380px] px-5 pb-16 sm:px-8">
        <div className="grid gap-8 rounded-[2.15rem] border border-[#eadfce] bg-[linear-gradient(180deg,rgba(255,255,255,0.75),rgba(247,239,223,0.88))] p-8 shadow-[0_28px_60px_rgba(90,72,39,0.08)] lg:grid-cols-[0.75fr_1.25fr_auto] lg:items-center">
          <div className="flex items-center gap-5">
            <div className="grid h-28 w-28 shrink-0 place-items-center rounded-[2rem] bg-[#f3e8d2] shadow-inner">
              <div className="text-center">
                <p className="font-serif text-3xl tracking-[0.22em]">BASTI</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.26em] text-[#5f6942]">
                  Rewards
                </p>
              </div>
            </div>
            <div>
              <h2 className="font-serif text-5xl leading-tight text-[#1b1a13]">
                Pide, acumula y disfruta
                <span className="block text-[#556235]">de beneficios exclusivos.</span>
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {rewardPreview.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#f2ecd8] text-[#556235]">
                  <StarIconProxy />
                </div>
                <p className="text-[15px] leading-7 text-[#4d4b41]">{item}</p>
              </div>
            ))}
          </div>

          <Link
            href={isAuthenticated ? "/" : "/register"}
            className="inline-flex items-center justify-center rounded-full bg-[#556235] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#556235]/20 transition hover:bg-[#45502b]"
          >
            Conoce mas
          </Link>
        </div>
      </section>
    </main>
  );
}

function StarIconProxy() {
  return <span className="text-lg">*</span>;
}
