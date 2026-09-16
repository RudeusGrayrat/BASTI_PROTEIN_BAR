"use client";

import Link from "next/link";
import Image from "next/image";
import { Header } from "./Header";
import { featurePillars } from "./data";
import {
  ArrowRightIcon,
  UserIcon,
  GiftIcon,
  BarbellIcon,
  BoltIcon,
  HeartIcon,
  LeafIcon,
  MenuGridIcon,
  SproutIcon,
} from "./icons";
import { ProductPhoto } from "../features/commerce/ProductPhoto";
import { useStorefront } from "../features/commerce/StorefrontProvider";

const pillarIcons = {
  leaf: LeafIcon,
  barbell: BarbellIcon,
  bolt: BoltIcon,
  sprout: SproutIcon,
} as const;

export function BastiLanding() {
  const { catalog, loading, error, retry } = useStorefront();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),transparent_28%),linear-gradient(180deg,#f6f0e3_0%,#f2eadb_100%)] text-[#171710]">
      <Header />

      <section className="landing-hero relative min-h-[680px] max-h-[80vh] overflow-hidden">
        <div className="landing-hero-image absolute inset-y-0 right-0 w-[60vw] max-w-[1500px] lg:w-[90vw]">
          <Image
            src={"/images/basti/hero-waffles.png"}
            alt="Waffles proteícos BASTI con platano y cacao"
            fill
            priority
            sizes="(max-width: 1124px) 100vw, 90vw"
            className="object-cover object-right"
          />
        </div>
        <div className="landing-hero-shade absolute inset-0 bg-[linear-gradient(90deg,rgba(246,240,227,0.96)_0%,rgba(249,240,229,1)_30%,rgba(246,240,227,0.34)_45%,rgba(246,240,227,0.06)_60%)]" />

        <div className="landing-hero-grid relative z-10  mx-auto max-h-[680px] grid max-w-[1380px] gap-10 px-5  sm:px-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:gap-0">
          <div className="landing-hero-copy relative py-6 z-10 min-h-[560px] lg:min-h-[680px] lg:py-8">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/78 px-4 py-2 text-sm font-bold text-[#393e2d] shadow-sm backdrop-blur">
              <LeafIcon className="h-4 w-4" />
              100% saludable
            </div>
            <h1
              style={{
                fontFamily: "BJCree",
              }}
              className="font-semibold text-4xl leading-none text-[#171710] sm:text-5xl lg:text-7xl"
            >
              Waffles proteicos
              <span className="block text-[#B68A5B]">sin azúcar</span>
              añadida
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#4d4b41] sm:text-xl">
              Deliciosos, nutritivos y hechos con ingredientes naturales para
              cuidar de ti sin sacrificar el sabor.
            </p>

            <div className="landing-hero-actions mt-8 flex flex-wrap gap-3">
              <Link
                href="/menu"
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

            <div className="landing-hero-note mt-8 flex items-center gap-4 text-[#44433c]">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#d8ccb6] bg-white/60">
                <HeartIcon className="h-5 w-5 text-[#556235]" />
              </div>
              <div>
                <p className="font-semibold">Tu pausa favorita empieza aquí.</p>
                <p className="mt-1 text-sm">
                  Descubre el sabor de Basti, a tu ritmo.
                </p>
              </div>
            </div>
          </div>

          <div className="landing-hero-decor relative min-h-[560px] lg:min-h-[680px]">
            <div className="landing-protein absolute right-0 top-[5%] z-10 grid h-36 w-36 place-items-center rounded-full bg-[#f6ebd3]/95 text-center shadow-lg shadow-[#a88f64]/15 p-5">
              <p className="font-serif text-5xl leading-none text-[#363C20]">
                25<span className="text-[#B68A5B]">g</span>
              </p>
              <p className="mt-2 text-md font-black uppercase tracking-[0.10em] text-[#232016]">
                Proteína
              </p>
              <p className=" text-sm text-[#4e493b]">por porción</p>
            </div>

            <div className="landing-ingredients absolute bottom-[15%] flex gap-4 right-0 z-20 max-w-[400px] rounded-[1.65rem] border border-[#75654f]/35 bg-[#2b281f]/82 p-5 text-[#f5efdf] shadow-2xl shadow-[#15120c]/25 backdrop-blur-md">
              <div className="grid h-16! w-16! place-items-center rounded-full! border border-[#7c8256]/55 bg-[#1f1d16] text-[#d6e39e]">
                <LeafIcon className="h-9 w-9 " />
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
      </section>

      <section className="relative z-10 mx-auto  -mt-8 max-w-[1380px] px-5 pb-4 sm:px-8 lg:-mt-15">
        <div className="landing-pillars grid gap-px overflow-hidden rounded-2xl bg-[#3f412f] p-px shadow-2xl shadow-[#1e1c16]/18 lg:grid-cols-4">
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
        className="mx-auto grid max-w-[1380px] gap-12 px-5  mt-5 sm:px-8 "
      >
        <div
          className="flex flex-col justify-between 
          "
        >
          <div className=" w-full mb-4 flex justify-between items-center gap-5 flex-wrap lg:flex-nowrap">
            <div>
              <h2 className=" font-serif text-4xl my-2 leading-tight text-[#1b1a13]">
                Productos favoritos
              </h2>
              <div className="mb-2 h-1 w-16 rounded-full bg-[#5f6942]" />
            </div>
            <Link
              href="/menu"
              className="mb-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#556235] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#556235]/20 transition hover:bg-[#45502b]"
            >
              Ver todo el menu
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          {loading && (
            <p role="status" className="py-8 text-[#556235]">
              Cargando productos…
            </p>
          )}
          {error && (
            <div role="alert" className="py-8">
              <p>{error}</p>
              <button className="basti-button mt-3" onClick={retry}>
                Reintentar
              </button>
            </div>
          )}
          {!loading && !error && !catalog?.products.length && (
            <p className="py-8">La carta estará disponible próximamente.</p>
          )}
          <div className="landing-favorites grid gap-5 lg:grid-cols-[repeat(3,minmax(0,1fr))_0.95fr]">
            {catalog?.products.slice(0, 4).map((product) => (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#e2d6c4] bg-white/70 shadow-[0_18px_40px_rgba(90,72,39,0.07)] transition duration-300 hover:shadow-xl motion-safe:hover:-translate-y-1"
              >
                <div className="relative shrink-0">
                  <div className="overflow-hidden bg-[#f2e8d8]">
                    <ProductPhoto src={product.imageUrl} name={product.name} />
                  </div>
                  <span className="absolute left-4 top-4 rounded-full bg-[#f7edd6]/95 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#534328] shadow-sm">
                    {product.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[1.6rem] font-semibold leading-tight text-[#191911]">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-[#59584f]">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                    <span className="text-sm font-semibold text-[#6a624d]">
                      Favorito BASTI
                    </span>
                    <Link
                      href="/menu"
                      aria-label={`Elegir ${product.name}`}
                      className="rounded-full border border-[#d8ccb6] shrink-0 px-4 py-2 text-sm font-semibold text-[#556235] transition duration-200 hover:bg-white hover:shadow-sm motion-safe:active:scale-95"
                    >
                      Elegir →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="beneficios"
        className="landing-rewards mx-auto max-w-[1380px] px-5 p-16 sm:px-8"
      >
        <div className=" gap-8 flex flex-col rounded-3xl border border-[#eadfce] bg-[linear-gradient(180deg,rgba(255,255,255,0.75),rgba(247,239,223,0.88))] p-8 shadow-[0_28px_60px_rgba(90,72,39,0.08)] lg:grid-cols-[0.75fr_1.25fr_auto] lg:items-center">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
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
                Tu próxima pausa
                <span className="block text-[#556235]">también suma.</span>
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                Icon: UserIcon,
                title: "Tu cuenta, tu espacio",
                text: "Crea tu cuenta para consultar tus compras y puntos.",
              },
              {
                Icon: HeartIcon,
                title: "Cada visita cuenta",
                text: "Descubre cómo sumar puntos con tus compras en Basti.",
              },
              {
                Icon: GiftIcon,
                title: "Todo sobre tus puntos",
                text: "Conoce el programa y consulta las opciones disponibles para ti.",
              },
            ].map(({ Icon, title, text }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#f2ecd8] text-[#556235]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#314620]">{title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-[#4d4b41]">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/puntos"
            className="inline-flex items-center justify-center rounded-full bg-[#556235] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#556235]/20 transition hover:bg-[#45502b]"
          >
            Descubre Puntos Basti
          </Link>
        </div>
      </section>
    </main>
  );
}
