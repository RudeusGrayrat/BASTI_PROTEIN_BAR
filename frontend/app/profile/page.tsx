"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { getProfileStatus, useAuth } from "../context/auth-context";
import { isApiError } from "../lib/api";
import type { DocumentType } from "../types/auth";

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, updateProfile, user } = useAuth();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);
    setErrorMessage(null);

    const form = new FormData(event.currentTarget);

    try {
      await updateProfile({
        firstName: String(form.get("firstName") ?? ""),
        lastName: String(form.get("lastName") ?? ""),
        phone: String(form.get("phone") ?? ""),
        documentType: String(form.get("documentType") ?? "") as DocumentType | "",
        documentNumber: String(form.get("documentNumber") ?? ""),
      });
      setFeedback("Tu perfil se actualizo correctamente.");
    } catch (error) {
      if (isApiError(error)) {
        if (error.status === 409) {
          setErrorMessage(
            "Ese documento ya esta asociado a otra cuenta. Revisa el numero ingresado.",
          );
        } else {
          setErrorMessage(
            error.messages[0] ?? "No se pudo actualizar tu perfil.",
          );
        }
      } else {
        setErrorMessage("No se pudo actualizar tu perfil.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading || !user) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#fbf7ed] text-[#385126]">
        Cargando tu perfil...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbf7ed] text-[#1d2815]">
      <Header />

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="rounded-3xl bg-[#314620] p-6 text-white shadow-2xl shadow-[#314620]/20 sm:p-8">
          <p className="text-sm font-semibold text-[#d6c79d]">Perfil Consumer</p>
          <h1 className="mt-2 font-serif text-5xl">Completa tu informacion</h1>
          <p className="mt-4 text-white/75">
            Este perfil alimenta la experiencia real de tu cuenta en BASTI
            Consumer Web.
          </p>

          <div className="mt-8 space-y-4">
            <ProfileAsideRow label="Correo" value={user.email ?? "Sin correo"} />
            <ProfileAsideRow label="Estado actual" value={getProfileStatus(user)} />
            <ProfileAsideRow
              label="Documento"
              value={
                user.documentType && user.documentNumber
                  ? `${user.documentType} ${user.documentNumber}`
                  : "Aun pendiente"
              }
            />
          </div>
        </aside>

        <div className="rounded-3xl border border-[#e1d7c7] bg-white/70 p-6 shadow-xl shadow-[#61451f]/10 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#6d744f]">
            Datos editables
          </p>
          <h2 className="mt-3 font-serif text-4xl text-[#11170d]">
            Actualiza tu perfil
          </h2>
          <p className="mt-4 text-[#676356]">
            El correo se muestra como solo lectura. El documento debe ser unico.
          </p>

          <form
            key={`${user.id}-${user.updatedAt}`}
            onSubmit={handleSubmit}
            className="mt-8 space-y-4"
          >
            <label className="block">
              <span className="text-sm font-semibold text-[#3b412f]">Correo</span>
              <input
                value={user.email ?? ""}
                readOnly
                className="mt-2 h-12 w-full rounded-2xl border border-[#ddd4c4] bg-[#f2eee4] px-4 text-[#6b6659]"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-[#3b412f]">
                  Nombre
                </span>
                <input
                  name="firstName"
                  defaultValue={user.firstName ?? ""}
                  maxLength={100}
                  autoComplete="given-name"
                  className="mt-2 h-12 w-full rounded-2xl border border-[#d8ccb6] bg-[#fffaf0] px-4 text-[#1d2815]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#3b412f]">
                  Apellido
                </span>
                <input
                  name="lastName"
                  defaultValue={user.lastName ?? ""}
                  maxLength={100}
                  autoComplete="family-name"
                  className="mt-2 h-12 w-full rounded-2xl border border-[#d8ccb6] bg-[#fffaf0] px-4 text-[#1d2815]"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-[#3b412f]">
                  Telefono
                </span>
                <input
                  name="phone"
                  defaultValue={user.phone ?? ""}
                  maxLength={30}
                  autoComplete="tel"
                  placeholder="999888777"
                  className="mt-2 h-12 w-full rounded-2xl border border-[#d8ccb6] bg-[#fffaf0] px-4 text-[#1d2815]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#3b412f]">
                  Tipo de documento
                </span>
                <select
                  name="documentType"
                  defaultValue={user.documentType ?? ""}
                  className="mt-2 h-12 w-full rounded-2xl border border-[#d8ccb6] bg-[#fffaf0] px-4 text-[#1d2815]"
                >
                  <option value="">Selecciona una opcion</option>
                  <option value="DNI">DNI</option>
                  <option value="CE">CE</option>
                  <option value="PASSPORT">PASSPORT</option>
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-[#3b412f]">
                Numero de documento
              </span>
              <input
                name="documentNumber"
                defaultValue={user.documentNumber ?? ""}
                maxLength={30}
                placeholder="76466972"
                className="mt-2 h-12 w-full rounded-2xl border border-[#d8ccb6] bg-[#fffaf0] px-4 text-[#1d2815]"
              />
            </label>

            {feedback ? (
              <div className="rounded-2xl border border-[#9db57b] bg-[#f1f8e8] px-4 py-3 text-sm font-medium text-[#446126]">
                {feedback}
              </div>
            ) : null}

            {errorMessage ? (
              <div className="rounded-2xl border border-[#d39b93] bg-[#fff2ef] px-4 py-3 text-sm font-medium text-[#8c3b31]">
                {errorMessage}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-[#385126] px-6 py-3 font-bold text-white shadow-lg shadow-[#385126]/20 transition hover:bg-[#26391a] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Guardando..." : "Guardar cambios"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="rounded-full border border-[#d8ccb6] px-6 py-3 font-semibold text-[#364026] transition hover:bg-white"
              >
                Volver al inicio
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function ProfileAsideRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
        {label}
      </p>
      <p className="mt-2 font-semibold">{value}</p>
    </div>
  );
}
