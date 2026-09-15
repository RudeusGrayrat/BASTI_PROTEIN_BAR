"use client";
import Link from "next/link";
import { getOrders } from "../../features/commerce/commerce-api";
import { money } from "../../features/commerce/cart-domain";
import { useCustomerResource } from "../../features/commerce/useCustomerResource";
const states: Record<string, string> = {
  PAID: "Pagado",
  CANCELLED: "Cancelado",
  REFUNDED: "Reembolsado",
};
export default function OrdersPage() {
  const { data, error, loading, retry } = useCustomerResource(getOrders);
  return (
    <>
      <h1 className="font-serif text-4xl">Mis pedidos</h1>
      <p className="mb-8 mt-3 text-[#60664f]">
        Tus últimas 50 compras registradas en Basti. Abre una para ver el
        detalle.
      </p>
      {loading ? (
        <p role="status">Consultando tus compras…</p>
      ) : error ? (
        <div className="basti-panel" role="alert">
          <p>{error}</p>
          <button className="basti-button mt-4" onClick={retry}>
            Reintentar
          </button>
        </div>
      ) : !data?.orders.length ? (
        <div className="basti-panel">
          <h2 className="font-serif text-3xl">
            Aún no tienes compras registradas
          </h2>
          <p className="my-4 text-[#60664f]">
            Cuando una compra esté asociada a tu cuenta, podrás consultarla
            aquí.
          </p>
          <Link className="basti-button" href="/menu">
            Explorar la carta
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {data.orders.map((order) => (
            <details className="basti-panel" key={order.id}>
              <summary className="cursor-pointer">
                <span className="font-semibold">{order.number}</span>
                <span className="ml-3 text-sm text-[#60664f]">
                  {new Date(order.createdAt).toLocaleDateString("es-PE", {
                    timeZone: "America/Lima",
                  })}{" "}
                  · {states[order.status] ?? "Registrado"}
                </span>
                <strong className="ml-4">
                  {money(order.totalCents, order.currency)}
                </strong>
              </summary>
              <ul className="mt-5 divide-y divide-[#e2d6c4]">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between gap-4 py-4">
                    <span>
                      {item.quantity} × {item.name}
                    </span>
                    <span>{money(item.totalCents, order.currency)}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      )}
    </>
  );
}
