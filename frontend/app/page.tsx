import Link from "next/link";
import { benefits, products, tiers } from "./components/data";
import { Header } from "./components/Header";
import { ProductArt } from "./components/ProductArt";
import { ProductCard } from "./components/ProductCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbf7ed] text-[#1d2815]">
      <Header />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:py-16">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d7cfbd] bg-white/70 px-4 py-2 text-sm font-semibold text-[#385126]">
            <span className="h-2 w-2 rounded-full bg-[#6d8b3e]" />
            100% saludable
          </div>
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.02] tracking-normal text-[#11170d] sm:text-7xl">
            Waffles proteicos sin azucar anadida
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f6154]">
            Deliciosos, nutritivos y hechos con ingredientes naturales para cuidar de ti sin sacrificar el sabor.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register" className="rounded-full bg-[#385126] px-6 py-3 font-semibold text-white shadow-lg shadow-[#385126]/20 transition hover:bg-[#283b1b]">
              Pedir ahora
            </Link>
            <a href="#menu" className="rounded-full border border-[#cfc5b2] bg-white/60 px-6 py-3 font-semibold text-[#29351e] transition hover:bg-white">
              Ver menu
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-[28px] border border-[#e0d4c1] bg-[#efe3d0] shadow-2xl shadow-[#61451f]/10">
          <ProductArt variant="waffle" large />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-12 sm:grid-cols-3 sm:px-8">
        {["Alta proteina|Hasta 25g por porcion", "Sin azucar anadida|Endulzado naturalmente", "Ingredientes reales|Naturales y de calidad"].map((item) => {
          const [title, subtitle] = item.split("|");
          return (
            <div key={title} className="rounded-2xl border border-[#e1d7c7] bg-white/65 p-6 shadow-sm">
              <p className="text-lg font-bold text-[#26391a]">{title}</p>
              <p className="mt-2 text-sm text-[#6e6a5d]">{subtitle}</p>
            </div>
          );
        })}
      </section>

      <section id="menu" className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#6d744f]">Menu</p>
            <h2 className="mt-2 font-serif text-4xl text-[#11170d]">Productos favoritos</h2>
          </div>
          <Link href="/login" className="hidden font-semibold text-[#385126] sm:inline">
            Ver todo el menu
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>

      <section id="puntos" className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="grid overflow-hidden rounded-3xl bg-[#314620] text-white shadow-2xl shadow-[#314620]/20 lg:grid-cols-[1fr_1.4fr]">
          <div className="p-8 sm:p-10">
            <p className="text-sm font-semibold text-[#d6c79d]">Programa de puntos</p>
            <h2 className="mt-3 font-serif text-4xl">Gana puntos, sube de nivel y disfruta mas beneficios</h2>
            <Link href="/register" className="mt-7 inline-flex rounded-full bg-[#f7efd9] px-5 py-3 font-semibold text-[#26391a]">
              Conoce el programa
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-4 sm:p-8">
            {tiers.map((tier) => (
              <div key={tier.name} className={`rounded-2xl bg-gradient-to-br ${tier.color} p-5 shadow-lg`}>
                <div className="mb-8 grid h-11 w-11 place-items-center rounded-full bg-white/25 text-xl">★</div>
                <p className="font-serif text-2xl">{tier.name}</p>
                <p className="mt-1 text-sm text-white/85">{tier.range}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="beneficios" className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#6d744f]">Nuestra filosofia</p>
          <h2 className="mt-3 font-serif text-4xl">Comer saludable no significa sacrificar sabor.</h2>
          <p className="mt-5 leading-8 text-[#666458]">
            En Basti Protein Bar creamos experiencias deliciosas que nutren tu cuerpo y te acompanan en tu proposito diario.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div key={benefit} className="rounded-2xl border border-[#e1d7c7] bg-white/65 p-6">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-[#ece7c7] text-[#385126]">✓</div>
              <h3 className="font-bold">{benefit}</h3>
              <p className="mt-2 text-sm text-[#6e6a5d]">Pensado para tu rutina, tu energia y tus antojos.</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
