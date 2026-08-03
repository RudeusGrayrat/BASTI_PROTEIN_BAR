import { adminRoleTemplates } from "../../../lib/admin-console-data";
import {
  AdminPageHeader,
  PanelCard,
  StatCard,
  Tag,
} from "../../../components/admin/AdminBlocks";

export default function ConfigRolesPage() {
  return (
    <section className="space-y-8">
      <AdminPageHeader
        eyebrow="Configuracion"
        title="Roles y permisos internos"
        description="Aqui el owner o admin de una empresa crea perfiles derivados de lo que Kapos ya le habilito desde superadmin."
        action={
          <button className="rounded-full border border-[#d6debf] bg-white px-5 py-3 text-sm font-semibold text-[#243016] transition hover:border-[#91aa47]">
            Crear rol
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Owners"
          value="1"
          hint="Perfil maximo dentro de la organizacion."
          tone="dark"
        />
        <StatCard
          label="Admins internos"
          value="3"
          hint="Roles que ya pueden delegar operacion diaria."
          tone="accent"
        />
        <StatCard
          label="Operadores"
          value="12"
          hint="Flujos limitados a tareas concretas de cada modulo."
        />
      </div>

      <PanelCard
        title="Plantillas de referencia"
        description="Base visual para luego permitir crear, editar o archivar roles propios del cliente."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {adminRoleTemplates
            .filter((role) => role.scope === "Organization")
            .map((role) => (
              <article
                key={role.key}
                className="rounded-[26px] border border-[#eef2e5] bg-[#fbfcf8] p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-[#1b2111]">
                    {role.label}
                  </h3>
                  <Tag tone="accent">{role.permissionCount} permisos</Tag>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#5c6646]">
                  {role.summary}
                </p>
              </article>
            ))}
        </div>
      </PanelCard>
    </section>
  );
}
