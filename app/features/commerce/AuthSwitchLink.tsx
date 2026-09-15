"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authDestination } from "./cart-domain";
export function AuthSwitchLink({
  to,
  children,
  className = "font-bold text-[#385126]",
}: {
  to: "/login" | "/register";
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Link
      className={className}
      href={to}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;
        event.preventDefault();
        router.push(
          `${to}?next=${encodeURIComponent(authDestination(window.location.search))}`,
        );
      }}
    >
      {children}
    </Link>
  );
}
