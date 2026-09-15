"use client";
import { useState } from "react";
import Link from "next/link";
import { RouteHero, BrandValues } from "../components/RouteHero";
import { ShoppingCartIcon, MenuGridIcon } from "../components/icons";
import { Header } from "../components/Header";
import { useStorefront } from "../features/commerce/StorefrontProvider";
import { useCart } from "../features/commerce/CartProvider";
import { money, MAX_QUANTITY } from "../features/commerce/cart-domain";
import { ProductPhoto } from "../features/commerce/ProductPhoto";

export default function MenuPage() {
  const { catalog, error, retry } = useStorefront();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const { add, lines, notice, ready } = useCart();
  const categories = [
    "Todos",
    ...new Set(catalog?.products.map((product) => product.category) ?? []),
  ];
  const visible = catalog?.products.filter(
    (product) =>
      (category === "Todos" || product.category === category) &&
      product.name
        .toLocaleLowerCase("es")
        .includes(search.toLocaleLowerCase("es")),
  );
  return (
    <>
      <Header />
      <main>
        <RouteHero
          eyebrow="Comida real, mejores días"
          title="Nuestro menú"
          accent="Tu pausa, a tu gusto."
          description="Descubre algo rico para cada momento. Elige tus favoritos y arma tu próxima pausa Basti."
          image="/images/basti/menu-hero.png"
          alt="Bowl de frutas y granola, una propuesta llena de color"
        />
        <div className="route-body">
          <div className="menu-toolbar">
            <label className="menu-search">
              <span className="sr-only">Buscar productos</span>
              <input
                className="basti-input max-w-lg"
                type="search"
                placeholder="¿Qué te provoca hoy?"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <div className="menu-categories" aria-label="Categorías">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2 text-sm transition duration-200 hover:shadow-md motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-95 ${category === item ? "bg-[#556235] text-white" : "border-[#d8ccb6] bg-white/60"}`}
                >
                  <MenuGridIcon className="h-4 w-4" />
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="menu-section-heading">
            <h2>{category === "Todos" ? "Encuentra tu favorito" : category}</h2>
            <Link href="/carrito">Ver mi carrito →</Link>
          </div>
          <p
            role="status"
            aria-live="polite"
            className="mb-4 min-h-6 text-sm text-[#45502b]"
          >
            {notice}
          </p>
          {error ? (
            <div role="alert" className="basti-panel">
              <p>{error}</p>
              <button className="basti-button mt-4" onClick={retry}>
                Volver a intentar
              </button>
            </div>
          ) : !catalog ? (
            <p role="status">Cargando la carta…</p>
          ) : (
            <>
              <div className="menu-product-grid">
                {visible?.map((product) => {
                  const quantity =
                    lines.find((line) => line.product.id === product.id)
                      ?.quantity ?? 0;
                  return (
                    <article
                      key={product.id}
                      className="group menu-product-card"
                    >
                      <ProductPhoto
                        src={product.imageUrl}
                        name={product.name}
                      />
                      <div className="menu-product-copy">
                        {quantity > 0 && (
                          <p className="mt-3 text-xs font-semibold text-[#556235]">
                            ✓ {quantity} en tu carrito
                          </p>
                        )}
                        <p className="mt-1 text-xs uppercase tracking-widest text-[#697056]">
                          {product.category}
                        </p>
                        <h2 className="mt-2 font-serif text-2xl">
                          {product.name}
                        </h2>
                        <p className="mt-3 flex-1 text-sm leading-6 text-[#60664f]">
                          {product.description}
                        </p>
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                          <span className="font-serif text-2xl font-semibold">
                            {money(product.priceCents, product.currency)}
                          </span>
                          <button
                            type="button"
                            className="basti-button gap-2"
                            disabled={
                              !ready ||
                              !product.available ||
                              quantity >= MAX_QUANTITY
                            }
                            onClick={() => add(product)}
                            aria-label={`Añadir ${product.name} al carrito`}
                          >
                            <ShoppingCartIcon className="h-4 w-4" />
                            {!product.available
                              ? "Agotado"
                              : quantity >= MAX_QUANTITY
                                ? "Máximo"
                                : quantity > 0
                                  ? "Añadir otro +"
                                  : "Añadir +"}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
              {visible?.length === 0 && (
                <p className="basti-panel">
                  No hay productos para esta búsqueda.
                </p>
              )}
            </>
          )}
          <div className="menu-bottom">
            <div>
              <p className="route-eyebrow">Cada visita cuenta</p>
              <h2 className="mt-3 font-serif text-3xl">
                Tus favoritos también suman.
              </h2>
              <p className="mt-3 text-sm text-[#666b58]">
                Conoce el programa de puntos y reúne tus momentos Basti en una
                cuenta.
              </p>
              <Link href="/puntos" className="basti-button mt-5">
                Descubre Puntos Basti →
              </Link>
            </div>
            <BrandValues />
          </div>
        </div>
      </main>
    </>
  );
}
