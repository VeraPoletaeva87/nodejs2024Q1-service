import { Injectable } from '@nestjs/common';

import type { CreateUserDTO, UpdatePasswordDto } from './users-models';
import { User } from './user-schema';
import { data } from 'src/data/database';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  findAll(): User[] {
    return data.users;
  }

  findOne(id: string): User {
    const item = data.users.find((item) => item.id === id);
    return item;
  }

  create(dto: CreateUserDTO): User {
    const newUser = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    data.users.push(newUser);
    return newUser;
  }

  //   async update(id: string, dto: UpdateUserDTO): Promise<Word> {
  //     const item = await this.wordModel
  //       .findByIdAndUpdate(id, { $set: dto }, { new: true })
  //       .exec();
  //     return this.returnIfExists(id, item);
  //   }

  //   async delete(id: string): Promise<Word> {
  //     const item = await this.wordModel.findByIdAndDelete(id).exec();
  //     return this.returnIfExists(id, item);
  //   }
}
