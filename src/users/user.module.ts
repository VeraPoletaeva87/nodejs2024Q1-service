import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './users.service';
import { User } from './user-schema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UserModule {}
