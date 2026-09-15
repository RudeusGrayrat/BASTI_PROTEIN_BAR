# Basti Web: integración de consumidores con Kapos

## Una fuente de configuración

El negocio se administra en Kapos. La web consulta Organization, OrganizationSetting, sedes activas, métodos de pago habilitados, productos y datos del cliente mediante una API de consumidores. No utiliza credenciales de empleados ni las rutas administrativas `/erp/settings`.

La web necesita `NEXT_PUBLIC_API_URL` (incluye `/api`) y el slug público existente en Kapos: `NEXT_PUBLIC_BASTI_SLUG` (por defecto `basti`). El slug identifica el negocio, no duplica su configuración. Si el registro tiene otro slug, debe usarse ese valor exacto. Nunca se elige la primera organización de la base de datos.

No se necesitan IDs de sedes, listas manuales de productos ni interruptores de modo de muestra. Las variables antiguas se eliminaron del contrato. No se modifican los datos ni las variables privadas del backend.

## Peticiones

| Método | Ruta relativa a `/api` | Acceso | Respuesta |
| --- | --- | --- | --- |
| GET | `/consumer/storefront/:slug/configuration` | Público | Nombre, contacto, logo, moneda, zona horaria, sedes y métodos de pago |
| GET | `/consumer/storefront/:slug/catalog?branchId=UUID` | Público | Productos y disponibilidad en la sede elegida |
| GET | `/consumer/storefront/:slug/orders` | Bearer de consumidor | Últimas 50 compras asociadas a su perfil en el negocio |
| GET | `/consumer/storefront/:slug/wallet` | Bearer de consumidor | Saldo, nivel y últimos 50 movimientos de puntos |

Registro, sesión y perfil mantienen las rutas `/consumer/auth/*` y `/consumer/users/me` existentes.

Sin `branchId`, el catálogo usa la primera sede activa por fecha de creación e ID. Si no hay sedes, devuelve carta vacía. Una sede ajena o inactiva se rechaza. Un negocio inexistente, suspendido o deshabilitado devuelve error, nunca datos de otra organización.

Se incluyen productos ACTIVE con `availableForPos=true` y categoría activa (o sin categoría), conforme al indicador comercial actualmente existente en Kapos. No existe un indicador separado para venta online en el esquema actual. Disponibilidad: producto sin control de stock, o al menos una unidad libre en la sede tras descontar reservas. No se exponen costos, credenciales o detalles internos de facturación.

## Frontend

`StorefrontProvider` obtiene configuración y catálogo y comparte el resultado con la landing y la carta. La selección de sede vuelve a consultar disponibilidad. `commerce-api.ts` centraliza rutas, token e imágenes relativas al backend. La moneda llega desde Kapos.

La composición y la imagen principal de la landing se conservan. Las tarjetas de productos usan el catálogo real. Los errores muestran reintento, y una carta vacía no se sustituye por productos ficticios.

El carrito conserva solo la selección en el navegador, separado por slug. El formato v2 descarta las antiguas selecciones de muestra. Sus importes son estimaciones; no autorizan una venta. Login y registro mantienen el regreso al carrito.

## Límites y comprobaciones

La consulta de métodos de pago no habilita pagos online: `orderingEnabled=false` hasta implementar cotización, confirmación, idempotencia, entrega y pago de pedidos de consumidor. Las compras del historial son ventas ya registradas por Kapos, no pedidos online creados desde esta web.

Pruebas automatizadas cubren rutas, imágenes, moneda, token, errores sin muestras, aislamiento por negocio/cliente y rechazo de sedes ajenas. Se verifica la compilación web y del backend de producción. La comprobación HTTP local del 11 de septiembre de 2026 recibió ECONNREFUSED; no se validó contra una base de datos activa ni se desplegó.

## Public contact and loyalty policy

The storefront configuration now includes `legalName`, `websiteUrl` and `loyalty` (`spendAmountCents`, `pointsEarned`, `discountPerPointCents`, `onlineRedemptionEnabled`). The footer reads contact details and active branches from this endpoint. Missing fields are omitted, and catalog failures no longer clear loaded business configuration.

The current backend has a fixed loyalty policy, not editable organization-level thresholds or a rewards catalog. `loyalty-policy.ts` is shared by sales, restaurant settlement and the public configuration response; existing amounts and rounding behavior are preserved. Levels still come from the customer's `loyaltyTier`. No tier thresholds or rewards are invented on the web.
