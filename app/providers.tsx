"use client";

import { AuthProvider } from "./context/auth-context";
import { CartProvider } from "./features/commerce/CartProvider";
import { StorefrontProvider } from "./features/commerce/StorefrontProvider";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <StorefrontProvider>
        <CartProvider>{children}</CartProvider>
      </StorefrontProvider>
    </AuthProvider>
  );
}
