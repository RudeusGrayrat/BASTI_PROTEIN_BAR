import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../database/prisma/prisma.module';
import { ConsumerUsersController } from './consumer-users.controller';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController, ConsumerUsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
