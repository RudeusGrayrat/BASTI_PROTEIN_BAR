"use client";
import { useStorefront } from "./StorefrontProvider";
import { money } from "./cart-domain";
import { GiftIcon, ShoppingCartIcon, UserIcon } from "../../components/icons";
export function LoyaltyProgram() {
  const { configuration, loading, retry } = useStorefront();
  const policy = configuration?.loyalty;
  if (!policy)
    return (
      <section className="basti-panel mt-8">
        <h2 className="font-serif text-2xl">Condiciones del programa</h2>
        <p role="status" className="mt-3 text-sm leading-7 text-[#60664f]">
          {loading
            ? "Consultando las condiciones vigentes…"
            : "Las condiciones del programa no están disponibles en este momento."}
        </p>
        {!loading && (
          <button
            className="mt-3 text-sm text-[#556235] underline"
            onClick={retry}
          >
            Volver a consultar
          </button>
        )}
      </section>
    );
  return (
    <section className="loyalty-program">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-serif text-3xl">Así funcionan tus puntos</h2>
        <span className="text-xs uppercase tracking-widest text-[#7b8068]">
          {configuration.name}
        </span>
      </div>
      <div className="loyalty-program-grid">
        {[
          {
            Icon: ShoppingCartIcon,
            title:
              policy.pointsEarned +
              " " +
              (policy.pointsEarned === 1 ? "punto" : "puntos") +
              " por cada " +
              money(policy.spendAmountCents, configuration.currency),
            text: "Se calculan sobre el total final de cada compra, después de los descuentos. Solo cuentan los bloques completos.",
          },
          {
            Icon: GiftIcon,
            title:
              money(policy.discountPerPointCents, configuration.currency) +
              " de descuento por punto",
            text: "Canjea tus puntos al comprar en Basti. El canje depende de tu saldo disponible y el total de la compra debe ser mayor que cero.",
          },
          {
            Icon: UserIcon,
            title: "Tus compras, a tu nombre",
            text: "Identifícate al comprar para que los puntos se asocien a tu cuenta. Revisa aquí tu saldo y tus movimientos.",
          },
        ].map(({ Icon, title, text }) => (
          <article key={title}>
            <Icon className="h-6 w-6 text-[#556235]" />
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#686e5b]">{text}</p>
          </article>
        ))}
      </div>
      {!policy.onlineRedemptionEnabled && (
        <p className="mt-5 border-t border-[#e7deca] pt-5 text-sm text-[#686e5b]">
          El canje online todavía no está habilitado. Consulta en tienda para
          usar tus puntos.
        </p>
      )}
    </section>
  );
}
