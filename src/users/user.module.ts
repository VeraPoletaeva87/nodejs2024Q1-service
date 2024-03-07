import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { User } from './user-schema';
import { UserService } from './users.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class WordsModule {}
