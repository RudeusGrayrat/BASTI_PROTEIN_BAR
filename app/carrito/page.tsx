"use client";
import Link from "next/link";
import { ProductPhoto } from "../features/commerce/ProductPhoto";
import { RouteHero, BrandValues } from "../components/RouteHero";
import { GiftIcon } from "../components/icons";
import { Header } from "../components/Header";
import { useCart } from "../features/commerce/CartProvider";
import { MAX_QUANTITY, money } from "../features/commerce/cart-domain";
import { useAuth } from "../context/auth-context";

export default function CartPage() {
  const { lines, ready, total, change, clear } = useCart();
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Header />
      <main>
        <RouteHero
          eyebrow="Tu selección"
          title="Tu bienestar,"
          accent="en cada pausa."
          description="Revisa tus favoritos y ajusta tu selección. Tu próximo momento Basti empieza aquí."
          image="/images/basti/cart-hero.png"
          alt="Shake de chocolate servido en un vaso"
        />
        <div className="route-body cart-body">
          {!ready ? (
            <p role="status" className="mt-8">
              Recuperando tu selección…
            </p>
          ) : !lines.length ? (
            <div className="basti-panel mt-8 text-center">
              <h2 className="font-serif text-3xl">
                Tu próximo favorito te espera
              </h2>
              <p className="my-4 text-[#60664f]">
                Añade algo rico de nuestra carta para comenzar.
              </p>
              <Link className="basti-button" href="/menu">
                Explorar la carta
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              <section
                aria-label="Productos del carrito"
                className="cart-products"
              >
                <div className="cart-products-heading">
                  <h2>Productos en tu carrito ({lines.length})</h2>
                  <button onClick={clear}>Vaciar carrito</button>
                </div>
                {lines.map(({ product, quantity }) => (
                  <article className="cart-product" key={product.id}>
                    <div className="cart-product-info">
                      <ProductPhoto
                        src={product.imageUrl}
                        name={product.name}
                        compact
                      />
                      <div className="min-w-0 flex-1">
                        <h2 className="font-serif text-2xl">{product.name}</h2>
                        <p className="mt-2 text-sm text-[#60664f]">
                          {product.description}
                        </p>
                        <p className="mt-2 text-sm text-[#60664f]">
                          {money(product.priceCents, product.currency)} por
                          unidad
                        </p>
                        <strong className="mt-2 block">
                          {money(
                            product.priceCents * quantity,
                            product.currency,
                          )}
                        </strong>
                      </div>
                    </div>
                    <div className="cart-product-actions">
                      <div className="flex items-center gap-4 rounded-full border border-[#d8ccb6] p-1">
                        <button
                          aria-label={`Reducir ${product.name}`}
                          className="h-10 w-10 rounded-full hover:bg-[#ebe5d8]"
                          onClick={() => change(product.id, quantity - 1)}
                        >
                          −
                        </button>
                        <span aria-label={`Cantidad de ${product.name}`}>
                          {quantity}
                        </span>
                        <button
                          aria-label={`Aumentar ${product.name}`}
                          disabled={quantity >= MAX_QUANTITY}
                          className="h-10 w-10 rounded-full hover:bg-[#ebe5d8] disabled:opacity-40"
                          onClick={() => change(product.id, quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="min-h-11 text-sm text-[#8c3b31] underline"
                        onClick={() => change(product.id, 0)}
                        aria-label={`Quitar ${product.name}`}
                      >
                        Quitar
                      </button>
                    </div>
                  </article>
                ))}
                <Link href="/menu" className="cart-continue">
                  ← Seguir eligiendo
                </Link>
              </section>
              <aside className="cart-summary">
                <h2 className="font-serif text-3xl">Resumen de tu selección</h2>
                <div className="my-6 flex justify-between border-y border-[#e2d6c4] py-5">
                  <span>Subtotal estimado</span>
                  <strong className="font-serif text-3xl">
                    {money(total, lines[0]?.product.currency)}
                  </strong>
                </div>
                <p className="text-sm leading-6 text-[#60664f]">
                  Guardamos tu carrito en este navegador. Al comprar elegirás la
                  sede y se comprobarán los precios y la disponibilidad antes de
                  confirmar.
                </p>
                <p className="mt-4 rounded-xl bg-[#f4ecd9] p-4 text-sm leading-6">
                  Los pedidos online todavía no están habilitados. Tu selección
                  no genera un pedido ni un cobro.
                </p>
                {!isAuthenticated && (
                  <Link
                    className="basti-button mt-5 w-full"
                    href="/login?next=/carrito"
                  >
                    Ingresar y conservar mi selección
                  </Link>
                )}
                <Link
                  className="mt-5 block text-center text-sm text-[#556235] underline"
                  href={isAuthenticated ? "/cuenta" : "/register?next=/carrito"}
                >
                  {isAuthenticated ? "Ir a mi cuenta" : "Crear mi cuenta"}
                </Link>
                <Link href="/puntos" className="cart-rewards">
                  <GiftIcon className="h-7 w-7 shrink-0" />
                  <span>
                    <strong>Tus momentos pueden darte más.</strong>
                    <span className="mt-1 block text-xs leading-5">
                      Conoce los puntos y beneficios Basti.
                    </span>
                  </span>
                  <span aria-hidden="true">→</span>
                </Link>
              </aside>
            </div>
          )}
          <BrandValues />
        </div>
      </main>
    </>
  );
}
