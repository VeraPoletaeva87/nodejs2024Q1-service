import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Artist } from './artist.schema';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateArtistDTO } from './artist.models';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  validateId(id: string) {
    const validId = validate(id);
    if (!validId) {
      throw new BadRequestException(`Track Id ${id} is invalid (not uuid)`);
    }
  }

  async findAll(): Promise<Artist[]> {
    const items = await this.artistRepository.find();
    return items;
  }

  async findOne(id: string): Promise<Artist> {
    this.validateId(id);

    const item = await this.artistRepository.findOne({
      where: { id: id },
    });
    if (!item) {
      throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  async create(dto: CreateArtistDTO): Promise<Artist> {
    if (!dto.name || !dto.grammy) {
      throw new BadRequestException(
        'Request body does not contain required fields (name, duration)',
      );
    }
    const newArtist = {
      id: uuidv4(),
      name: dto.name,
      grammy: dto.grammy,
    };
    await this.artistRepository.save(dto);
    return newArtist;
  }

  async update(id: string, dto: CreateArtistDTO): Promise<Artist> {
    this.validateId(id);
    const item = await this.artistRepository.findOne({
      where: { id: id },
    });

    if (item) {
      throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
    }

    if (
      (dto.name !== null && typeof dto.name !== 'string') ||
      (dto.grammy !== null && typeof dto.grammy !== 'boolean')
    ) {
      throw new BadRequestException('Request body fields have wrong type');
    }

    await this.artistRepository.save({
      ...item,
      ...dto,
    });
    return item;
  }

  async delete(id: string) {
    this.validateId(id);
    const item = await this.artistRepository.findOne({ where: { id } });
    if (item) {
      await this.artistRepository.delete(id);
      // data.tracks.forEach((item) => {
      //   if (item.artistId === id) {
      //     item.artistId = null;
      //   }
      // });
      // data.albums.forEach((item) => {
      //   if (item.artistId === id) {
      //     item.artistId = null;
      //   }
      // });
    } else {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return;
  }
}
