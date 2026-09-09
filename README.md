# Basti Web

Web para clientes de Basti Protein Bar. Next.js, React y TypeScript.

## Desarrollo

1. Ejecutar `pnpm install --frozen-lockfile` desde esta carpeta.
2. Copiar `.env.example` a `.env.local` y configurar la URL de Kapos.
3. Ejecutar `pnpm dev` (puerto 3001).

Validación: `pnpm lint` y `pnpm build`.

El proyecto está directamente en la raíz de este repositorio. En el proveedor de hosting, usar `.` como directorio raíz (antes `frontend`).

## Alcance

Basti Web y Basti Mobile son canales para consumidores. Kapos administra el negocio, clientes, promociones, descuentos y puntos. Caja, facturación y POS pertenecen a Kapos.

La autenticación web usa `/api/consumer/auth/*` y el perfil `/api/consumer/users/me`. La URL configurada incluye `/api`. Los datos comerciales y beneficios deben ser validados por Kapos y restringidos al negocio Basti; las vistas de muestra no sustituyen esa integración.

El README original de Next.js se conserva en `README.nextjs.md`.
