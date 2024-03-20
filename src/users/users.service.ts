import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4, validate } from 'uuid';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdatePasswordDto } from './users-models';
import { User } from './user-schema';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  validateId(id: string) {
    const validId = validate(id);
    if (!validId) {
      throw new BadRequestException(`User Id ${id} is invalid (not uuid)`);
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    users.forEach((user) => {
      delete user.password;
    });
    return users;
  }

  async findOne(userId: string): Promise<User> {
    this.validateId(userId);
    const item = await this.userRepository.findOne({ where: { id: userId } });
    if (!item) {
      throw new NotFoundException(`Record with id ${userId} does not exist`);
    }
    return item;
  }

  async create(dto: CreateUserDTO): Promise<User> {
    if (!dto.login || !dto.password) {
      throw new BadRequestException(
        'Request body does not contain required fields (login, password)',
      );
    }
    if (typeof dto.login !== 'string' || typeof dto.password !== 'string') {
      throw new BadRequestException('Login or password not string');
    }
    const userData = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return { ...newUser, password: undefined };
  }

  async update(userId: string, dto: UpdatePasswordDto): Promise<User> {
    this.validateId(userId);
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
    const item = await this.userRepository.findOne({ where: { id: userId } });
    if (!item) {
      throw new NotFoundException(`Record with id ${userId} does not exist`);
    }
    if (item && item.password !== dto.oldPassword) {
      throw new ForbiddenException('oldPassword is wrong');
    }

    item.password = dto.newPassword;
    const newVersion = item.version + 1;
    item.version = newVersion;
    item.updatedAt = new Date().getTime();
    await this.userRepository.save(item);
    return { ...item, password: undefined };
  }

  async delete(userId: string) {
    this.validateId(userId);
    const item = await this.userRepository.findOne({ where: { id: userId } });
    if (item) {
      await this.userRepository.remove(item);
    } else {
      throw new NotFoundException(`Record with id ${userId} does not exist`);
    }
  }
}
