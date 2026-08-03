export type AdminOrganization = {
  id: string;
  name: string;
  slug: string;
  owner: string;
  ruc: string;
  status: "Activa" | "Pendiente" | "Suspendida";
  activeModules: number;
  activeWorkers: number;
};

export type AdminGlobalUser = {
  id: string;
  name: string;
  email: string;
  identifier: string;
  scope: "Platform" | "Owner" | "Manager";
  status: "Activo" | "Invitado" | "Suspendido";
};

export type AdminPermission = {
  key: string;
  label: string;
  module: string;
  submodule: string;
  scope: "PLATFORM" | "ORGANIZATION" | "BRANCH";
};

export type AdminSubmodule = {
  key: string;
  label: string;
  route: string;
  permissionKey: string;
};

export type AdminModule = {
  key: string;
  label: string;
  audience: "Platform" | "Organization";
  summary: string;
  submodules: AdminSubmodule[];
};

export type AdminRoleTemplate = {
  key: string;
  label: string;
  scope: "Platform" | "Organization";
  summary: string;
  members: number;
  permissionCount: number;
};

export const adminOrganizations: AdminOrganization[] = [
  {
    id: "org-basti",
    name: "Basti",
    slug: "basti",
    owner: "Andrea Figueroa",
    ruc: "20601234567",
    status: "Activa",
    activeModules: 8,
    activeWorkers: 26,
  },
  {
    id: "org-atlasfit",
    name: "AtlasFit",
    slug: "atlasfit",
    owner: "Miguel Torres",
    ruc: "20604567891",
    status: "Pendiente",
    activeModules: 5,
    activeWorkers: 12,
  },
  {
    id: "org-fuelbar",
    name: "Fuel Bar Norte",
    slug: "fuel-bar-norte",
    owner: "Lucia Montalvo",
    ruc: "20599887766",
    status: "Suspendida",
    activeModules: 4,
    activeWorkers: 9,
  },
];

export const adminGlobalUsers: AdminGlobalUser[] = [
  {
    id: "usr-admin",
    name: "Super Admin Kapos",
    email: "admin@kapos.local",
    identifier: "ADMIN",
    scope: "Platform",
    status: "Activo",
  },
  {
    id: "usr-andrea",
    name: "Andrea Figueroa",
    email: "andrea@basti.pe",
    identifier: "74125896",
    scope: "Owner",
    status: "Activo",
  },
  {
    id: "usr-miguel",
    name: "Miguel Torres",
    email: "miguel@atlasfit.pe",
    identifier: "76466972",
    scope: "Owner",
    status: "Invitado",
  },
  {
    id: "usr-lucia",
    name: "Lucia Montalvo",
    email: "lucia@fuelbar.pe",
    identifier: "73214588",
    scope: "Manager",
    status: "Suspendido",
  },
];

export const adminModules: AdminModule[] = [
  {
    key: "platform",
    label: "Superadmin",
    audience: "Platform",
    summary: "Gestiona clientes, owners, usuarios globales y permisos raiz.",
    submodules: [
      {
        key: "organizations",
        label: "Organizaciones",
        route: "/platform/organizaciones",
        permissionKey: "platform.organizations.read",
      },
      {
        key: "global-users",
        label: "Usuarios globales",
        route: "/platform/usuarios",
        permissionKey: "platform.users.read",
      },
      {
        key: "permissions",
        label: "Permisos",
        route: "/platform/permisos",
        permissionKey: "platform.organizations.manage",
      },
      {
        key: "modules",
        label: "Modulos",
        route: "/platform/modulos",
        permissionKey: "platform.organizations.manage",
      },
    ],
  },
  {
    key: "settings",
    label: "Configuracion",
    audience: "Organization",
    summary: "Controla usuarios internos, roles, parametros y accesos del cliente.",
    submodules: [
      {
        key: "users",
        label: "Usuarios",
        route: "/configuracion/usuarios",
        permissionKey: "settings.users.read",
      },
      {
        key: "roles",
        label: "Roles",
        route: "/configuracion/roles",
        permissionKey: "settings.roles.read",
      },
      {
        key: "parameters",
        label: "Parametros",
        route: "/configuracion/parametros",
        permissionKey: "settings.parameters.read",
      },
    ],
  },
  {
    key: "rrhh",
    label: "Recursos humanos",
    audience: "Organization",
    summary: "Administra colaboradores, asistencia y boletas dentro de cada empresa.",
    submodules: [
      {
        key: "collaborators",
        label: "Colaboradores",
        route: "/rrhh/colaboradores",
        permissionKey: "rrhh.collaborators.read",
      },
      {
        key: "attendance",
        label: "Asistencia",
        route: "/rrhh/asistencia",
        permissionKey: "rrhh.attendance.read",
      },
      {
        key: "payroll",
        label: "Boletas de pago",
        route: "/rrhh/boletas-pago",
        permissionKey: "rrhh.payroll.read",
      },
    ],
  },
];

export const adminPermissions: AdminPermission[] = [
  {
    key: "platform.organizations.read",
    label: "Ver organizaciones",
    module: "Superadmin",
    submodule: "Organizaciones",
    scope: "PLATFORM",
  },
  {
    key: "platform.organizations.manage",
    label: "Crear o suspender organizaciones",
    module: "Superadmin",
    submodule: "Organizaciones",
    scope: "PLATFORM",
  },
  {
    key: "platform.users.read",
    label: "Ver usuarios globales",
    module: "Superadmin",
    submodule: "Usuarios globales",
    scope: "PLATFORM",
  },
  {
    key: "platform.memberships.manage",
    label: "Asignar owners y memberships",
    module: "Superadmin",
    submodule: "Usuarios globales",
    scope: "PLATFORM",
  },
  {
    key: "settings.users.read",
    label: "Ver usuarios del cliente",
    module: "Configuracion",
    submodule: "Usuarios",
    scope: "ORGANIZATION",
  },
  {
    key: "settings.users.create",
    label: "Crear usuarios del cliente",
    module: "Configuracion",
    submodule: "Usuarios",
    scope: "ORGANIZATION",
  },
  {
    key: "settings.roles.manage_permissions",
    label: "Editar permisos de roles",
    module: "Configuracion",
    submodule: "Roles",
    scope: "ORGANIZATION",
  },
  {
    key: "rrhh.collaborators.read",
    label: "Ver colaboradores",
    module: "Recursos humanos",
    submodule: "Colaboradores",
    scope: "ORGANIZATION",
  },
  {
    key: "rrhh.collaborators.create",
    label: "Crear colaboradores",
    module: "Recursos humanos",
    submodule: "Colaboradores",
    scope: "ORGANIZATION",
  },
  {
    key: "finance.treasury.read",
    label: "Ver tesoreria",
    module: "Finanzas",
    submodule: "Tesoreria",
    scope: "ORGANIZATION",
  },
];

export const adminRoleTemplates: AdminRoleTemplate[] = [
  {
    key: "platform.super_admin",
    label: "Superadmin de plataforma",
    scope: "Platform",
    summary: "Puede crear empresas, owners y definir modulos base.",
    members: 1,
    permissionCount: 12,
  },
  {
    key: "organization.owner",
    label: "Owner de organizacion",
    scope: "Organization",
    summary: "Administra su empresa y delega permisos hasta su propio alcance.",
    members: 2,
    permissionCount: 21,
  },
  {
    key: "organization.admin",
    label: "Administrador interno",
    scope: "Organization",
    summary: "Gestiona usuarios, roles y operacion del negocio.",
    members: 4,
    permissionCount: 17,
  },
  {
    key: "organization.cashier",
    label: "Operador base",
    scope: "Organization",
    summary: "Consulta y ejecuta solo flujos operativos permitidos.",
    members: 12,
    permissionCount: 5,
  },
];
