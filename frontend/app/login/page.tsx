"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Header } from "../components/Header";
import { ProductArt } from "../components/ProductArt";

export default function LoginPage() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "cliente@basti.pe");

    window.localStorage.setItem(
      "basti-user",
      JSON.stringify({
        name: email.split("@")[0] || "Cliente",
        email,
        points: 3250,
        tier: "Gold",
      }),
    );

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#fbf7ed] text-[#1d2815]">
      <Header />
      <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-3xl border border-[#e1d7c7] bg-white/70 p-6 shadow-xl shadow-[#61451f]/10 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#6d744f]">Bienvenido</p>
          <h1 className="mt-3 font-serif text-5xl text-[#11170d]">Inicia sesion</h1>
          <p className="mt-4 text-[#676356]">
            Entra para ver tu menu personalizado, puntos y beneficios activos.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-[#3b412f]">Correo</span>
              <input
                name="email"
                type="email"
                required
                placeholder="cliente@basti.pe"
                className="mt-2 h-12 w-full rounded-2xl border border-[#d8ccb6] bg-[#fffaf0] px-4 text-[#1d2815] placeholder:text-[#aaa08e]"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#3b412f]">Contrasena</span>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="mt-2 h-12 w-full rounded-2xl border border-[#d8ccb6] bg-[#fffaf0] px-4 text-[#1d2815] placeholder:text-[#aaa08e]"
              />
            </label>
            <button type="submit" className="h-12 w-full rounded-full bg-[#385126] font-bold text-white shadow-lg shadow-[#385126]/20 transition hover:bg-[#26391a]">
              Ingresar al dashboard
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#676356]">
            Aun no tienes cuenta?{" "}
            <Link href="/register" className="font-bold text-[#385126]">
              Registrate
            </Link>
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-[#e0d4c1] bg-[#efe3d0] shadow-2xl shadow-[#61451f]/10">
          <ProductArt variant="matcha" large />
        </div>
      </section>
    </main>
  );
}
