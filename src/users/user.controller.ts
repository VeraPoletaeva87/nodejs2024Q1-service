import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateUserDTO, UpdatePasswordDto } from './users-models';
import type { User } from './user-schema';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    const response = await this.userService.findAll();
    console.log(response);
    return response;
  }

  @Get(':id')
  findOne(@Param('id') prodId: string): User {
    return this.userService.findOne(prodId);
  }

  @Post()
  create(@Body() dto: CreateUserDTO): User {
    return this.userService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePasswordDto): User {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
