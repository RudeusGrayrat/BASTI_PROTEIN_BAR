"use client";
import Link from "next/link";
import { ShoppingCartIcon } from "../../components/icons";
import { useCart } from "./CartProvider";
export function CartLink() {
  const { count } = useCart();
  return (
    <Link
      href="/carrito"
      title="Carrito de compras"
      aria-label={`Carrito, ${count} productos`}
      className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#dcd5c5] bg-white/60 text-[#45502b] transition hover:bg-[#eee9dc] focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <ShoppingCartIcon className="h-5 w-5" />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -right-1 -top-1 grid min-h-4 min-w-4 place-items-center rounded-full bg-[#556235] px-1 text-[10px] font-bold text-white"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
