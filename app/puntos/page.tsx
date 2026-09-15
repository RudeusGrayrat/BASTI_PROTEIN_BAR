"use client";
import { RouteHero } from "../components/RouteHero";
import { CrownIcon, StarIcon } from "../components/icons";
import { LoyaltyProgram } from "../features/commerce/LoyaltyProgram";
import { Header } from "../components/Header";

import { getWallet } from "../features/commerce/commerce-api";
import { useCustomerResource } from "../features/commerce/useCustomerResource";
import { useAuth } from "../context/auth-context";
import Link from "next/link";
import { GiftIcon } from "../components/icons";
export default function PointsPage() {
  return (
    <>
      <Header />
      <main>
        <RouteHero
          eyebrow="Pequeñas elecciones, grandes recompensas"
          title="Puntos y"
          accent="beneficios Basti."
          description="Tus momentos favoritos merecen un lugar especial. Descubre lo que significa ser parte de Basti."
          image="/images/basti/points-hero.png"
          alt="Matcha en una taza, un momento de calma"
        />
        <div className="route-body points-body">
          <PointsContent />
          <LoyaltyProgram />
        </div>
      </main>
    </>
  );
}
function PointsContent() {
  const { isAuthenticated, isLoading, user } = useAuth();
  if (isLoading)
    return (
      <section className="basti-panel min-h-64">
        <p className="text-xs uppercase tracking-widest text-[#556235]">
          Basti Rewards
        </p>
        <h1 className="mt-4 font-serif text-4xl">Cada visita cuenta</h1>
        <p role="status" className="mt-6 text-[#60664f]">
          Preparando tu espacio de puntos…
        </p>
      </section>
    );
  return isAuthenticated ? (
    <MemberPoints key={user?.id} />
  ) : (
    <PointsInvitation />
  );
}

function PointsInvitation() {
  return (
    <>
      <section className="points-invitation">
        <div>
          <p className="route-eyebrow">Tu espacio Basti</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            Cada visita cuenta.
          </h2>
          <p className="mt-3 max-w-xl leading-7 text-[#666b58]">
            Crea tu cuenta para consultar tu saldo, conocer tu nivel y seguir
            los puntos de tus compras elegibles.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/register?next=/puntos" className="basti-button">
            Quiero ser parte
          </Link>
          <Link href="/login?next=/puntos" className="points-secondary">
            Ya tengo cuenta
          </Link>
        </div>
      </section>
    </>
  );
}

function MemberPoints() {
  const { data, error, loading, retry } = useCustomerResource(getWallet);
  return (
    <>
      <h2 className="sr-only">Mis puntos</h2>
      <p className="mb-6 text-sm text-[#60664f]">
        Tu saldo y el historial de movimientos, siempre en tu cuenta.
      </p>
      {loading ? (
        <p role="status">Consultando tus puntos…</p>
      ) : error ? (
        <div className="basti-panel" role="alert">
          <p>{error}</p>
          <button className="basti-button mt-4" onClick={retry}>
            Reintentar
          </button>
        </div>
      ) : (
        data && (
          <>
            <section
              className="membership-overview"
              aria-label="Tu membresía Basti"
            >
              <div className="points-balance">
                <span className="membership-kicker">
                  <StarIcon className="h-5 w-5" /> Tu saldo de puntos
                </span>
                <p className="points-number">
                  {data.points.toLocaleString("es-PE")}
                </p>
                <p className="points-unit">puntos disponibles</p>
                <p className="mt-6 text-sm leading-6 text-[#74684e]">
                  {data.lifetimePoints.toLocaleString("es-PE")} puntos
                  acumulados en tu historia con Basti.
                </p>
              </div>
              <div className="membership-tier">
                <div className="membership-medal">
                  <CrownIcon />
                </div>
                <div className="relative min-w-0">
                  <p className="membership-kicker">
                    {data.tier ? "Tu distinción Basti" : "Tu comunidad"}
                  </p>
                  <h2 className="membership-name">
                    {data.tier || "Miembro Basti"}
                  </h2>
                  <span className="membership-ribbon">
                    {data.tier ? "Nivel actual" : "Bienvenido a Basti"}
                  </span>
                  <p className="mt-6 max-w-md text-sm leading-7 text-[#e3dfc9]">
                    {data.tier
                      ? "Un reconocimiento a los momentos que compartes con nosotros. Gracias por ser parte de Basti."
                      : "Cada momento compartido es parte de tu historia. Tu nivel aparecerá aquí cuando el programa lo asigne."}
                  </p>
                </div>
              </div>
            </section>
            <section className="basti-panel mt-6">
              <div className="flex items-center gap-3">
                <GiftIcon className="h-6 w-6 text-[#556235]" />
                <h2 className="font-serif text-3xl">Tus próximos canjes</h2>
              </div>
              <p className="mt-4 text-[#60664f]">
                Los canjes online estarán disponibles próximamente. Mientras
                tanto, consulta en Basti los beneficios y condiciones aplicables
                a tus puntos.
              </p>
            </section>
            <section className="basti-panel mt-6">
              <h2 className="font-serif text-3xl">Tus movimientos</h2>
              {!data.movements.length ? (
                <p className="mt-4 text-[#60664f]">
                  Todavía no hay movimientos de puntos.
                </p>
              ) : (
                <ul className="mt-4 divide-y divide-[#e2d6c4]">
                  {data.movements.map((movement) => (
                    <li
                      key={movement.id}
                      className="flex justify-between gap-4 py-4"
                    >
                      <div>
                        <p>{movement.reason || "Movimiento de puntos"}</p>
                        <p className="mt-1 text-xs text-[#60664f]">
                          {new Date(movement.createdAt).toLocaleDateString(
                            "es-PE",
                            { timeZone: "America/Lima" },
                          )}
                        </p>
                      </div>
                      <strong>
                        {movement.points > 0 ? "+" : ""}
                        {movement.points} pts
                      </strong>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )
      )}
    </>
  );
}
