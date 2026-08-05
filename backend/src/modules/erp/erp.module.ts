import { Module } from '@nestjs/common';
import { AuthorizationModule } from '../../common/authorization/authorization.module';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { CashController } from './cash/cash.controller';
import { CashService } from './cash/cash.service';
import { CatalogController } from './catalog/catalog.controller';
import { CatalogService } from './catalog/catalog.service';
import { SettingsController } from './settings/settings.controller';
import { SettingsService } from './settings/settings.service';

@Module({
  imports: [AuthorizationModule, PrismaModule],
  controllers: [SettingsController, CatalogController, CashController],
  providers: [SettingsService, CatalogService, CashService],
})
export class ErpModule {}
