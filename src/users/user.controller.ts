import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUserDTO, UpdatePasswordDto } from './users-models';
import type { User } from './user-schema';
import { UserService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':userId')
  getById(@Param('userId') userId: string): Promise<User> {
    return this.userService.findOne(userId);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDTO): User {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdatePasswordDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
