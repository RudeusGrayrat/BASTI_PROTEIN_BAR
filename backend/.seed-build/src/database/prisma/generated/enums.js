"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionOverrideEffect = exports.ModuleAudience = exports.PlatformAccessStatus = exports.PermissionScope = exports.RoleContext = exports.CustomerProfileStatus = exports.MembershipStatus = exports.BranchStatus = exports.OrganizationStatus = exports.OrganizationDocumentType = exports.OAuthProvider = exports.UserStatus = exports.DocumentType = void 0;
exports.DocumentType = {
    DNI: 'DNI',
    CE: 'CE',
    PASSPORT: 'PASSPORT'
};
exports.UserStatus = {
    ACTIVE: 'ACTIVE',
    INVITED: 'INVITED',
    SUSPENDED: 'SUSPENDED',
    DISABLED: 'DISABLED'
};
exports.OAuthProvider = {
    GOOGLE: 'GOOGLE'
};
exports.OrganizationDocumentType = {
    RUC: 'RUC',
    OTHER: 'OTHER'
};
exports.OrganizationStatus = {
    ACTIVE: 'ACTIVE',
    TRIAL: 'TRIAL',
    SUSPENDED: 'SUSPENDED',
    DISABLED: 'DISABLED',
    ARCHIVED: 'ARCHIVED'
};
exports.BranchStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    CLOSED: 'CLOSED'
};
exports.MembershipStatus = {
    INVITED: 'INVITED',
    ACTIVE: 'ACTIVE',
    SUSPENDED: 'SUSPENDED',
    INACTIVE: 'INACTIVE',
    TERMINATED: 'TERMINATED'
};
exports.CustomerProfileStatus = {
    ACTIVE: 'ACTIVE',
    BLOCKED: 'BLOCKED',
    ARCHIVED: 'ARCHIVED'
};
exports.RoleContext = {
    PLATFORM: 'PLATFORM',
    ORGANIZATION: 'ORGANIZATION'
};
exports.PermissionScope = {
    OWN: 'OWN',
    BRANCH: 'BRANCH',
    ORGANIZATION: 'ORGANIZATION',
    PLATFORM: 'PLATFORM'
};
exports.PlatformAccessStatus = {
    ACTIVE: 'ACTIVE',
    SUSPENDED: 'SUSPENDED',
    DISABLED: 'DISABLED'
};
exports.ModuleAudience = {
    PLATFORM: 'PLATFORM',
    ORGANIZATION: 'ORGANIZATION',
    BOTH: 'BOTH'
};
exports.PermissionOverrideEffect = {
    ALLOW: 'ALLOW',
    DENY: 'DENY'
};
