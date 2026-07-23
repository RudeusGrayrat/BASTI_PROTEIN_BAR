"use client";

import { BastiDashboard } from "./components/BastiDashboard";
import { BastiLanding } from "./components/BastiLanding";
import { useAuth } from "./context/auth-context";

export default function HomePage() {
  const { isLoading} = useAuth();

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f6f1e5] text-[#556235]">
        Restaurando tu experiencia...
      </main>
    );
  }

  return <BastiLanding />;
}
