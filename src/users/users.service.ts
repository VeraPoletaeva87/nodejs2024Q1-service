import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { CreateUserDTO, UpdatePasswordDto } from './users-models';
import { User } from './user-schema';
import { data } from 'src/data/data';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class UserService {
  validateId(id: string) {
    const validId = validate(id);
    if (!validId) {
      throw new BadRequestException(`User Id ${id} is invalid (not uuid)`);
    }
  }

  findAll(): User[] {
    const users = data.users;
    users.forEach((user) => {
      delete user.password;
    });
    return users;
  }

  findOne(id: string): User {
    this.validateId(id);

    const item = data.users.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return item;
  }

  create(dto: CreateUserDTO): User {
    if (!dto.login || !dto.password) {
      throw new BadRequestException(
        'Request body does not contain required fields (login, password)',
      );
    }

    if (typeof dto.login !== 'string' || typeof dto.password !== 'string') {
      throw new BadRequestException('Login or password not string');
    }
    const newUser = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    data.users.push(newUser);
    delete newUser.password;
    return newUser;
  }

  update(id: string, dto: UpdatePasswordDto): User {
    this.validateId(id);
    if (!dto.oldPassword || !dto.newPassword) {
      throw new BadRequestException('Old password or new password is empty');
    }
    if (
      typeof dto.oldPassword !== 'string' ||
      typeof dto.newPassword !== 'string'
    ) {
      throw new BadRequestException(
        'Old password or new password is not string',
      );
    }

    const index = data.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    if (data.users[index].password === dto.oldPassword) {
      data.users[index].password = dto.newPassword;
      const newVersion = data.users[index].version + 1;
      data.users[index].version = newVersion;
    } else {
      throw new BadRequestException('oldPassword is wrong');
    }
    const res = data.users[index];
    delete res.password;
    // Return the updated user
    return res;
  }

  delete(id: string) {
    this.validateId(id);
    const index = data.users.findIndex((item) => item.id === id);
    if (index !== -1) {
      data.users.splice(index, 1);
    } else {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return;
  }
}
