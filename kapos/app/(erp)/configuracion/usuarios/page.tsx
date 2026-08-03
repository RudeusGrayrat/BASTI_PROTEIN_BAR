import { adminOrganizations } from "../../../lib/admin-console-data";
import {
  AdminPageHeader,
  PanelCard,
  StatCard,
  Tag,
} from "../../../components/admin/AdminBlocks";

export default function ConfigUsuariosPage() {
  return (
    <section className="space-y-8">
      <AdminPageHeader
        eyebrow="Configuracion"
        title="Usuarios internos"
        description="Pantalla para crear, editar o bloquear usuarios de una empresa cliente sin salir del shell ERP."
        action={
          <button className="rounded-full bg-[#111111] px-5 py-3 text-sm font-semibold text-white">
            Crear usuario interno
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Activos"
          value="26"
          hint="Usuarios que ya trabajan dentro de la empresa."
        />
        <StatCard
          label="Invitados"
          value="3"
          hint="Accesos enviados y pendientes de activacion."
          tone="accent"
        />
        <StatCard
          label="Sedes con acceso"
          value={String(adminOrganizations[0]?.activeWorkers ?? 0)}
          hint="Base visual para delegar por sede y no por toda la empresa."
          tone="dark"
        />
      </div>

      <PanelCard
        title="Flujo minimo"
        description="El owner crea usuarios solo dentro de lo que el superadmin ya le permitio."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Crear usuario y asociarlo a una sede o area.",
            "Asignar un rol existente sin superar el alcance del owner.",
            "Editar o suspender el acceso si cambia la operacion.",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[24px] border border-[#eef2e5] bg-[#fbfcf8] px-4 py-4 text-sm leading-6 text-[#516046]"
            >
              {item}
            </div>
          ))}
        </div>
      </PanelCard>
    </section>
  );
}
