"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullsOrder = exports.QueryMode = exports.SortOrder = exports.OrganizationModuleScalarFieldEnum = exports.PlatformSubmoduleScalarFieldEnum = exports.PlatformModuleScalarFieldEnum = exports.CashMovementScalarFieldEnum = exports.CashSessionScalarFieldEnum = exports.CashRegisterScalarFieldEnum = exports.ProductStockScalarFieldEnum = exports.ProductScalarFieldEnum = exports.ProductCategoryScalarFieldEnum = exports.PaymentMethodScalarFieldEnum = exports.OrganizationSettingScalarFieldEnum = exports.CustomerProfileScalarFieldEnum = exports.MembershipBranchScalarFieldEnum = exports.PlatformAccessPermissionOverrideScalarFieldEnum = exports.MembershipPermissionOverrideScalarFieldEnum = exports.RolePermissionScalarFieldEnum = exports.PlatformAccessRoleScalarFieldEnum = exports.MembershipRoleScalarFieldEnum = exports.PermissionScalarFieldEnum = exports.RoleScalarFieldEnum = exports.PlatformAccessScalarFieldEnum = exports.MembershipScalarFieldEnum = exports.BranchScalarFieldEnum = exports.OrganizationScalarFieldEnum = exports.OAuthAccountScalarFieldEnum = exports.SessionScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Session: 'Session',
    OAuthAccount: 'OAuthAccount',
    Organization: 'Organization',
    Branch: 'Branch',
    Membership: 'Membership',
    PlatformAccess: 'PlatformAccess',
    Role: 'Role',
    Permission: 'Permission',
    MembershipRole: 'MembershipRole',
    PlatformAccessRole: 'PlatformAccessRole',
    RolePermission: 'RolePermission',
    MembershipPermissionOverride: 'MembershipPermissionOverride',
    PlatformAccessPermissionOverride: 'PlatformAccessPermissionOverride',
    MembershipBranch: 'MembershipBranch',
    CustomerProfile: 'CustomerProfile',
    OrganizationSetting: 'OrganizationSetting',
    PaymentMethod: 'PaymentMethod',
    ProductCategory: 'ProductCategory',
    Product: 'Product',
    ProductStock: 'ProductStock',
    CashRegister: 'CashRegister',
    CashSession: 'CashSession',
    CashMovement: 'CashMovement',
    PlatformModule: 'PlatformModule',
    PlatformSubmodule: 'PlatformSubmodule',
    OrganizationModule: 'OrganizationModule'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    documentType: 'documentType',
    documentNumber: 'documentNumber',
    firstName: 'firstName',
    lastName: 'lastName',
    phone: 'phone',
    avatarUrl: 'avatarUrl',
    emailVerifiedAt: 'emailVerifiedAt',
    documentVerifiedAt: 'documentVerifiedAt',
    status: 'status',
    lastLoginAt: 'lastLoginAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SessionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    refreshTokenHash: 'refreshTokenHash',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.OAuthAccountScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.OrganizationScalarFieldEnum = {
    id: 'id',
    slug: 'slug',
    legalName: 'legalName',
    tradeName: 'tradeName',
    documentType: 'documentType',
    documentNumber: 'documentNumber',
    email: 'email',
    phone: 'phone',
    websiteUrl: 'websiteUrl',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BranchScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    code: 'code',
    name: 'name',
    address: 'address',
    phone: 'phone',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.MembershipScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    organizationId: 'organizationId',
    employeeCode: 'employeeCode',
    title: 'title',
    status: 'status',
    startsAt: 'startsAt',
    endsAt: 'endsAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PlatformAccessScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RoleScalarFieldEnum = {
    id: 'id',
    context: 'context',
    scopeKey: 'scopeKey',
    organizationId: 'organizationId',
    key: 'key',
    name: 'name',
    description: 'description',
    isSystem: 'isSystem',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PermissionScalarFieldEnum = {
    id: 'id',
    key: 'key',
    name: 'name',
    description: 'description',
    moduleKey: 'moduleKey',
    submoduleKey: 'submoduleKey',
    scope: 'scope',
    audience: 'audience',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.MembershipRoleScalarFieldEnum = {
    id: 'id',
    membershipId: 'membershipId',
    roleId: 'roleId'
};
exports.PlatformAccessRoleScalarFieldEnum = {
    id: 'id',
    platformAccessId: 'platformAccessId',
    roleId: 'roleId'
};
exports.RolePermissionScalarFieldEnum = {
    id: 'id',
    roleId: 'roleId',
    permissionId: 'permissionId'
};
exports.MembershipPermissionOverrideScalarFieldEnum = {
    id: 'id',
    membershipId: 'membershipId',
    permissionId: 'permissionId',
    effect: 'effect',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PlatformAccessPermissionOverrideScalarFieldEnum = {
    id: 'id',
    platformAccessId: 'platformAccessId',
    permissionId: 'permissionId',
    effect: 'effect',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.MembershipBranchScalarFieldEnum = {
    id: 'id',
    membershipId: 'membershipId',
    branchId: 'branchId'
};
exports.CustomerProfileScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    organizationId: 'organizationId',
    externalCustomerCode: 'externalCustomerCode',
    loyaltyTier: 'loyaltyTier',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.OrganizationSettingScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    currencyCode: 'currencyCode',
    timezone: 'timezone',
    taxRate: 'taxRate',
    receiptFooter: 'receiptFooter',
    logoUrl: 'logoUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PaymentMethodScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    code: 'code',
    name: 'name',
    type: 'type',
    enabled: 'enabled',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ProductCategoryScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    parentId: 'parentId',
    name: 'name',
    slug: 'slug',
    description: 'description',
    color: 'color',
    sortOrder: 'sortOrder',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ProductScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    categoryId: 'categoryId',
    sku: 'sku',
    name: 'name',
    description: 'description',
    type: 'type',
    status: 'status',
    price: 'price',
    cost: 'cost',
    taxRate: 'taxRate',
    trackStock: 'trackStock',
    availableForPos: 'availableForPos',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ProductStockScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    branchId: 'branchId',
    quantity: 'quantity',
    minQuantity: 'minQuantity',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CashRegisterScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    branchId: 'branchId',
    code: 'code',
    name: 'name',
    status: 'status',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CashSessionScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    branchId: 'branchId',
    cashRegisterId: 'cashRegisterId',
    openedByUserId: 'openedByUserId',
    closedByUserId: 'closedByUserId',
    status: 'status',
    openingAmount: 'openingAmount',
    expectedAmount: 'expectedAmount',
    countedAmount: 'countedAmount',
    differenceAmount: 'differenceAmount',
    openedAt: 'openedAt',
    closedAt: 'closedAt',
    openingNote: 'openingNote',
    closingNote: 'closingNote',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CashMovementScalarFieldEnum = {
    id: 'id',
    cashSessionId: 'cashSessionId',
    paymentMethodId: 'paymentMethodId',
    createdByUserId: 'createdByUserId',
    type: 'type',
    amount: 'amount',
    concept: 'concept',
    note: 'note',
    occurredAt: 'occurredAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PlatformModuleScalarFieldEnum = {
    id: 'id',
    key: 'key',
    name: 'name',
    icon: 'icon',
    audience: 'audience',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PlatformSubmoduleScalarFieldEnum = {
    id: 'id',
    moduleId: 'moduleId',
    key: 'key',
    name: 'name',
    route: 'route',
    permissionKey: 'permissionKey',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.OrganizationModuleScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    moduleKey: 'moduleKey',
    enabled: 'enabled',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
