"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { benefits, products } from "../components/data";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import {
  getProfileStatus,
  getUserDisplayName,
  useAuth,
} from "../context/auth-context";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !user) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#fbf7ed] text-[#385126]">
        Preparando tu dashboard...
      </main>
    );
  }

  const profileStatus = getProfileStatus(user);
  const visibleName = getUserDisplayName(user);
  const documentLabel =
    user.documentType && user.documentNumber
      ? `${user.documentType} ${user.documentNumber}`
      : "Aun no registrado";
  const registrationDate = new Date(user.createdAt).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#fbf7ed] text-[#1d2815]">
      <Header />

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-3xl bg-[#314620] p-6 text-white shadow-2xl shadow-[#314620]/20 sm:p-8">
          <p className="text-sm font-semibold text-[#d6c79d]">Cuenta Consumer</p>
          <h1 className="mt-2 font-serif text-5xl">{visibleName}</h1>
          <p className="mt-4 max-w-2xl text-white/75">
            Tu sesion esta conectada con el backend real. Desde aqui puedes ver
            tu informacion actual y completar tu perfil para futuros beneficios.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-white/70">
                Correo
              </p>
              <p className="mt-2 text-lg font-semibold">
                {user.email ?? "Sin correo"}
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-white/70">
                Estado del perfil
              </p>
              <p className="mt-2 text-lg font-semibold">{profileStatus}</p>
            </div>
          </div>
        </div>

        <aside className="rounded-3xl border border-[#e1d7c7] bg-white/70 p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#6d744f]">
            Tu cuenta
          </p>
          <div className="mt-5 space-y-4">
            <InfoRow
              label="Nombre completo"
              value={
                [user.firstName, user.lastName].filter(Boolean).join(" ") ||
                "Aun no completado"
              }
            />
            <InfoRow label="Correo" value={user.email ?? "Sin correo"} />
            <InfoRow label="Documento" value={documentLabel} />
            <InfoRow label="Telefono" value={user.phone ?? "Aun no registrado"} />
            <InfoRow label="Miembro desde" value={registrationDate} />
          </div>

          <Link
            href="/profile"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#385126] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#26391a]"
          >
            Completar perfil
          </Link>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
        <div className="rounded-3xl border border-[#e1d7c7] bg-white/70 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#6d744f]">
                Beneficios
              </p>
              <h2 className="mt-2 font-serif text-4xl">Programa en vista previa</h2>
            </div>
            <span className="rounded-full bg-[#ece7c7] px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#4c5d2e]">
              Honestamente temporal
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <PreviewCard title="0 puntos" description="Aun no hay puntos reales conectados." />
            <PreviewCard title="Nivel inicial" description="Los niveles reales llegaran despues." />
            <PreviewCard
              title="Programa proximo"
              description="Las recompensas y compras aun no estan disponibles."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#6d744f]">
              Menu
            </p>
            <h2 className="mt-2 font-serif text-4xl">Sigue explorando BASTI</h2>
          </div>
          <Link href="/" className="hidden font-semibold text-[#385126] sm:inline">
            Ver landing
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8">
        <div className="rounded-3xl border border-[#e1d7c7] bg-white/70 p-6 sm:p-8">
          <h2 className="font-serif text-3xl">Beneficios que inspiran esta experiencia</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {benefits.map((benefit) => (
              <div key={benefit} className="rounded-2xl bg-[#fffaf0] p-4">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-[#ece7c7] text-[#385126]">
                  *
                </div>
                <p className="font-semibold">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#fffaf0] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7b7b6b]">
        {label}
      </p>
      <p className="mt-2 font-semibold text-[#26391a]">{value}</p>
    </div>
  );
}

function PreviewCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl bg-[#fffaf0] p-5">
      <p className="font-serif text-2xl text-[#26391a]">{title}</p>
      <p className="mt-2 text-sm text-[#6e6a5d]">{description}</p>
    </div>
  );
}
