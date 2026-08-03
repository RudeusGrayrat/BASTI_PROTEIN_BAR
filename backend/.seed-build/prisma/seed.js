"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const bcryptjs_1 = require("bcryptjs");
const client_1 = require("../src/database/prisma/generated/client");
const kapos_catalog_1 = require("./kapos-catalog");
function createPrismaClient() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error('DATABASE_URL no esta definido.');
    }
    const adapter = new adapter_pg_1.PrismaPg({
        connectionString: databaseUrl,
    });
    return new client_1.PrismaClient({ adapter });
}
async function seedModules(prisma) {
    for (const moduleItem of kapos_catalog_1.platformModules) {
        await prisma.platformModule.upsert({
            where: { key: moduleItem.key },
            update: {
                name: moduleItem.name,
                icon: moduleItem.icon,
                audience: moduleItem.audience,
                sortOrder: moduleItem.sortOrder,
            },
            create: {
                key: moduleItem.key,
                name: moduleItem.name,
                icon: moduleItem.icon,
                audience: moduleItem.audience,
                sortOrder: moduleItem.sortOrder,
            },
        });
        const persistedModule = await prisma.platformModule.findUniqueOrThrow({
            where: { key: moduleItem.key },
            select: { id: true },
        });
        for (const submodule of moduleItem.submodules) {
            await prisma.platformSubmodule.upsert({
                where: {
                    moduleId_key: {
                        moduleId: persistedModule.id,
                        key: submodule.key,
                    },
                },
                update: {
                    name: submodule.name,
                    route: submodule.route,
                    permissionKey: submodule.permissionKey,
                    sortOrder: submodule.sortOrder,
                },
                create: {
                    moduleId: persistedModule.id,
                    key: submodule.key,
                    name: submodule.name,
                    route: submodule.route,
                    permissionKey: submodule.permissionKey,
                    sortOrder: submodule.sortOrder,
                },
            });
        }
    }
}
async function seedPermissions(prisma) {
    for (const permission of kapos_catalog_1.permissions) {
        await prisma.permission.upsert({
            where: { key: permission.key },
            update: {
                name: permission.name,
                description: permission.description,
                moduleKey: permission.moduleKey,
                submoduleKey: permission.submoduleKey,
                scope: permission.scope,
                audience: permission.audience,
            },
            create: permission,
        });
    }
}
async function seedRoles(prisma) {
    for (const role of kapos_catalog_1.roles) {
        await prisma.role.upsert({
            where: { scopeKey: role.scopeKey },
            update: {
                name: role.name,
                description: role.description,
                isSystem: role.isSystem,
            },
            create: {
                context: role.context,
                scopeKey: role.scopeKey,
                organizationId: null,
                key: role.key,
                name: role.name,
                description: role.description,
                isSystem: role.isSystem,
            },
        });
        const persistedRole = await prisma.role.findUniqueOrThrow({
            where: { scopeKey: role.scopeKey },
            select: { id: true },
        });
        await prisma.rolePermission.deleteMany({
            where: { roleId: persistedRole.id },
        });
        for (const permissionKey of role.permissionKeys) {
            const permission = await prisma.permission.findUniqueOrThrow({
                where: { key: permissionKey },
                select: { id: true },
            });
            await prisma.rolePermission.create({
                data: {
                    roleId: persistedRole.id,
                    permissionId: permission.id,
                },
            });
        }
    }
}
async function seedLocalMasterAccess(prisma) {
    const platformSuperAdminRole = await prisma.role.findUniqueOrThrow({
        where: { scopeKey: 'platform:platform.super_admin' },
        select: { id: true },
    });
    const masterPasswordHash = await (0, bcryptjs_1.hash)('admin', 12);
    const masterUser = await prisma.user.upsert({
        where: { email: 'admin@kapos.local' },
        update: {
            firstName: 'Super',
            lastName: 'Admin',
            documentType: 'PASSPORT',
            documentNumber: 'ADMIN',
            passwordHash: masterPasswordHash,
            status: 'ACTIVE',
        },
        create: {
            email: 'admin@kapos.local',
            passwordHash: masterPasswordHash,
            firstName: 'Super',
            lastName: 'Admin',
            documentType: 'PASSPORT',
            documentNumber: 'ADMIN',
            status: 'ACTIVE',
        },
        select: {
            id: true,
        },
    });
    const platformAccess = await prisma.platformAccess.upsert({
        where: { userId: masterUser.id },
        update: {
            status: 'ACTIVE',
        },
        create: {
            userId: masterUser.id,
            status: 'ACTIVE',
        },
        select: {
            id: true,
        },
    });
    await prisma.platformAccessRole.upsert({
        where: {
            platformAccessId_roleId: {
                platformAccessId: platformAccess.id,
                roleId: platformSuperAdminRole.id,
            },
        },
        update: {},
        create: {
            platformAccessId: platformAccess.id,
            roleId: platformSuperAdminRole.id,
        },
    });
}
async function main() {
    const prisma = createPrismaClient();
    try {
        await seedModules(prisma);
        await seedPermissions(prisma);
        await seedRoles(prisma);
        await seedLocalMasterAccess(prisma);
        console.log('Seed base de Kapos completado.');
    }
    finally {
        await prisma.$disconnect();
    }
}
main().catch((error) => {
    console.error('Error al ejecutar el seed base de Kapos:', error);
    process.exit(1);
});
