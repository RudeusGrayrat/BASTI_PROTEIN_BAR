import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AssignPlatformMembershipDto } from './dto/assign-platform-membership.dto';
import { AuthorizationService } from '../../../common/authorization/authorization.service';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { OrganizationContext } from '../../../common/decorators/organization-context.decorator';
import { RequirePermissions } from '../../../common/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { OrganizationContextGuard } from '../../../common/guards/organization-context.guard';
import { PermissionsGuard } from '../../../common/guards/permissions.guard';
import { CreateOrganizationRoleDto } from './dto/create-organization-role.dto';
import { CreatePlatformModuleDto } from './dto/create-platform-module.dto';
import { CreatePlatformOrganizationDto } from './dto/create-platform-organization.dto';
import { CreatePlatformPermissionDto } from './dto/create-platform-permission.dto';
import { CreatePlatformSubmoduleDto } from './dto/create-platform-submodule.dto';
import { CreatePlatformUserDto } from './dto/create-platform-user.dto';
import { UpdatePlatformModuleDto } from './dto/update-platform-module.dto';
import { UpdatePlatformOrganizationDto } from './dto/update-platform-organization.dto';
import { UpdatePlatformPermissionDto } from './dto/update-platform-permission.dto';
import { UpdatePlatformRoleDto } from './dto/update-platform-role.dto';
import { UpdatePlatformSubmoduleDto } from './dto/update-platform-submodule.dto';
import { UpdatePlatformUserDto } from './dto/update-platform-user.dto';
import { UpdatePermissionOverridesDto } from './dto/update-permission-overrides.dto';
import { PlatformAdminService } from './platform-admin.service';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('erp/access')
export class ErpAccessController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authorizationService: AuthorizationService,
    private readonly platformAdminService: PlatformAdminService,
  ) {}

  @Get('me')
  async getAccessSummary(@CurrentUser() user: { userId: string }) {
    const [safeUser, platformContext, memberships, navigationCatalog] =
      await Promise.all([
      this.usersService.getCurrentUser(user.userId),
      this.authorizationService.getPlatformContextForUser(user.userId),
      this.authorizationService.listMembershipContextsForUser(user.userId),
      this.authorizationService.getNavigationCatalogForUser(user.userId),
    ]);

    return {
      user: safeUser,
      platformContext,
      memberships,
      navigationCatalog,
      effectivePermissionKeys: Array.from(
        new Set([
          ...(platformContext?.permissionKeys ?? []),
          ...memberships.flatMap((membership) => membership.permissionKeys),
        ]),
      ),
    };
  }

  @Get('organization')
  @UseGuards(OrganizationContextGuard)
  getOrganizationAccess(
    @CurrentUser()
    user: {
      userId: string;
      organizationContext?: {
        organizationId: string;
        organizationSlug: string;
        organizationName: string;
        membershipId: string;
        roleKeys: string[];
        permissionKeys: string[];
        branchIds: string[];
      };
    },
    @OrganizationContext()
    organizationContext: {
      organizationId: string;
      organizationSlug: string;
      organizationName: string;
      membershipId: string;
      roleKeys: string[];
      permissionKeys: string[];
      branchIds: string[];
    },
  ) {
    return {
      userId: user.userId,
      organizationContext,
    };
  }

  @Get('platform')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.organizations.read')
  getPlatformAccess(
    @CurrentUser()
    user: {
      userId: string;
      platformContext?: {
        platformAccessId: string;
        roleKeys: string[];
        permissionKeys: string[];
      };
    },
  ) {
    return {
      userId: user.userId,
      platformContext: user.platformContext ?? null,
    };
  }

  @Get('organization/dashboard')
  @UseGuards(OrganizationContextGuard, PermissionsGuard)
  @RequirePermissions('dashboard.read')
  getOrganizationDashboardAccess(
    @CurrentUser()
    user: {
      userId: string;
      organizationContext?: {
        organizationId: string;
        organizationSlug: string;
        organizationName: string;
        membershipId: string;
        roleKeys: string[];
        permissionKeys: string[];
        branchIds: string[];
      };
    },
  ) {
    return {
      userId: user.userId,
      organizationContext: user.organizationContext ?? null,
      allowed: true,
    };
  }

  @Get('platform/organizations')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.organizations.read')
  listPlatformOrganizations() {
    return this.platformAdminService.listOrganizations();
  }

  @Get('platform/users')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.users.read')
  listPlatformUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.platformAdminService.listGlobalUsers({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search,
    });
  }

  @Get('platform/roles')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.roles.read')
  listPlatformRoles() {
    return this.platformAdminService.listRoleTemplates();
  }

  @Get('platform/organizations/:id/roles')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.roles.read')
  listOrganizationRoles(@Param('id') id: string) {
    return this.platformAdminService.listOrganizationRoles(id);
  }

  @Get('platform/modules')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.modules.read')
  listPlatformModules() {
    return this.platformAdminService.listPlatformModules();
  }

  @Get('platform/permissions')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.permissions.read')
  listPlatformPermissions() {
    return this.platformAdminService.listPermissions();
  }

  @Post('platform/organizations')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.organizations.create')
  createPlatformOrganization(@Body() input: CreatePlatformOrganizationDto) {
    return this.platformAdminService.createOrganization(input);
  }

  @Patch('platform/organizations/:id')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.organizations.manage')
  updatePlatformOrganization(
    @Param('id') id: string,
    @Body() input: UpdatePlatformOrganizationDto,
  ) {
    return this.platformAdminService.updateOrganization(id, input);
  }

  @Post('platform/users')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.users.create')
  createPlatformUser(@Body() input: CreatePlatformUserDto) {
    return this.platformAdminService.createGlobalUser(input);
  }

  @Patch('platform/users/:id')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.users.manage')
  updatePlatformUser(
    @Param('id') id: string,
    @Body() input: UpdatePlatformUserDto,
  ) {
    return this.platformAdminService.updateGlobalUser(id, input);
  }

  @Post('platform/users/:id/memberships')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.memberships.manage')
  assignPlatformMembership(
    @Param('id') id: string,
    @Body() input: AssignPlatformMembershipDto,
  ) {
    return this.platformAdminService.assignMembership(id, input);
  }

  @Patch('platform/users/:id/platform-permissions')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.users.manage')
  updatePlatformPermissionOverrides(
    @Param('id') id: string,
    @Body() input: UpdatePermissionOverridesDto,
  ) {
    return this.platformAdminService.updatePlatformPermissionOverrides(id, input);
  }

  @Patch('platform/users/:id/memberships/:membershipId/permissions')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.memberships.manage')
  updateMembershipPermissionOverrides(
    @Param('id') id: string,
    @Param('membershipId') membershipId: string,
    @Body() input: UpdatePermissionOverridesDto,
  ) {
    return this.platformAdminService.updateMembershipPermissionOverrides(
      id,
      membershipId,
      input,
    );
  }

  @Delete('platform/users/:id/memberships/:membershipId')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.memberships.manage')
  unlinkPlatformMembership(
    @Param('id') id: string,
    @Param('membershipId') membershipId: string,
  ) {
    return this.platformAdminService.unlinkMembership(id, membershipId);
  }

  @Post('platform/modules')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.modules.manage')
  createPlatformModule(@Body() input: CreatePlatformModuleDto) {
    return this.platformAdminService.createModule(input);
  }

  @Patch('platform/modules/:id')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.modules.manage')
  updatePlatformModule(
    @Param('id') id: string,
    @Body() input: UpdatePlatformModuleDto,
  ) {
    return this.platformAdminService.updateModule(id, input);
  }

  @Post('platform/submodules')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.modules.manage')
  createPlatformSubmodule(@Body() input: CreatePlatformSubmoduleDto) {
    return this.platformAdminService.createSubmodule(input);
  }

  @Patch('platform/submodules/:id')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.modules.manage')
  updatePlatformSubmodule(
    @Param('id') id: string,
    @Body() input: UpdatePlatformSubmoduleDto,
  ) {
    return this.platformAdminService.updateSubmodule(id, input);
  }

  @Post('platform/permissions')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.permissions.manage')
  createPlatformPermission(@Body() input: CreatePlatformPermissionDto) {
    return this.platformAdminService.createPermission(input);
  }

  @Patch('platform/permissions/:id')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.permissions.manage')
  updatePlatformPermission(
    @Param('id') id: string,
    @Body() input: UpdatePlatformPermissionDto,
  ) {
    return this.platformAdminService.updatePermission(id, input);
  }

  @Patch('platform/roles/:id')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.roles.manage')
  updatePlatformRole(
    @Param('id') id: string,
    @Body() input: UpdatePlatformRoleDto,
  ) {
    return this.platformAdminService.updateRoleTemplate(id, input);
  }

  @Post('platform/organizations/:id/roles')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.roles.manage')
  createOrganizationRole(
    @Param('id') id: string,
    @Body() input: CreateOrganizationRoleDto,
  ) {
    return this.platformAdminService.createOrganizationRole(id, input);
  }

  @Patch('platform/organizations/:id/roles/:roleId')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('platform.roles.manage')
  updateOrganizationRole(
    @Param('id') id: string,
    @Param('roleId') roleId: string,
    @Body() input: UpdatePlatformRoleDto,
  ) {
    return this.platformAdminService.updateOrganizationRole(id, roleId, input);
  }
}
