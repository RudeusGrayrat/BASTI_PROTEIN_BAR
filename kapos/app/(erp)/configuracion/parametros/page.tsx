import { AdminPageHeader, PanelCard, StatCard, Tag } from "../../../components/admin/AdminBlocks";

export default function ConfigParametrosPage() {
  return (
    <section className="space-y-8">
      <AdminPageHeader
        eyebrow="Configuracion"
        title="Parametros base del cliente"
        description="Zona para editar series, identidad de empresa, reglas iniciales y ajustes generales sin tocar la estructura central de Kapos."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Series activas"
          value="4"
          hint="Boletas, facturas y numeraciones operativas."
        />
        <StatCard
          label="Integraciones"
          value="2"
          hint="Conexiones listas para encender en el cliente."
          tone="accent"
        />
        <StatCard
          label="Estados criticos"
          value="1"
          hint="Parametros que no deberian editarse sin respaldo."
          tone="dark"
        />
      </div>

      <PanelCard
        title="Bloques iniciales"
        description="Base minima para el modo usable de 20 dias: empresa, series, reglas y preferencias."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {[
            ["Datos de empresa", "RUC, razon social, logo y correo principal."],
            ["Series y correlativos", "Numeracion para documentos y control inicial."],
            ["Preferencias ERP", "Moneda, timezone, limites y reglas basicas."],
            ["Integraciones", "Servicios externos que luego se activan por cliente."],
          ].map(([title, description], index) => (
            <article
              key={title}
              className="rounded-[26px] border border-[#eef2e5] bg-white p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-[#1b2111]">{title}</h3>
                <Tag tone={index % 2 === 0 ? "accent" : "soft"}>Base</Tag>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#5c6646]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </PanelCard>
    </section>
  );
}
