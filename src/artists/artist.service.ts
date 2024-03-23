import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
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

  async findOneId(id: string, isFavorites = false): Promise<Artist> {
    this.validateId(id);
    const artist: Artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      const Exception = isFavorites
        ? UnprocessableEntityException
        : NotFoundException;

      throw new Exception('Incorrect data format');
    }

    return artist;
  }

  async create(dto: CreateArtistDTO): Promise<Artist> {
    if (!dto.name || !dto.grammy) {
      throw new BadRequestException(
        'Request body does not contain required fields (name, grammy)',
      );
    }
    const newArtist: Artist = this.artistRepository.create(dto);

    return await this.artistRepository.save(newArtist);
  }

  async update(id: string, dto: CreateArtistDTO): Promise<Artist> {
    this.validateId(id);

    const item: Artist = await this.artistRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
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
    const item: Artist = await this.artistRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    } else {
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
    }
    return;
  }
}
