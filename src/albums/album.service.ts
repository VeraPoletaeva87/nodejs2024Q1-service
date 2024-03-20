import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Album } from './album.schema';
import { data } from 'src/data/data';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateAlbumDTO } from './album.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}
  validateId(id: string) {
    const validId = validate(id);
    if (!validId) {
      throw new BadRequestException(`Track Id ${id} is invalid (not uuid)`);
    }
  }

  async findAll(): Promise<Album[]> {
    const items = await this.albumRepository.find();
    return items;
  }

  async findOne(id: string): Promise<Album> {
    this.validateId(id);
    const item = await this.albumRepository.findOne({
      where: { id: id },
    });
    if (!item) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return item;
  }

  async create(dto: CreateAlbumDTO): Promise<Album> {
    if (!dto.name || !dto.year) {
      throw new BadRequestException(
        'Request body does not contain required fields (name, duration)',
      );
    }
    const newAlbumData = {
      id: uuidv4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    };
    const newAlbum = this.albumRepository.create(newAlbumData);
    this.albumRepository.save(newAlbum);
    return newAlbum;
  }

  async update(id: string, dto: CreateAlbumDTO): Promise<Album> {
    this.validateId(id);

    if (!dto.name || !dto.year) {
      throw new BadRequestException(
        'Request body does not contain required fields',
      );
    }

    if (
      typeof dto.name !== 'string' ||
      typeof dto.year !== 'number' ||
      (dto.artistId && typeof dto.artistId !== 'string')
    ) {
      throw new BadRequestException('Request body fields has wrong types');
    }

    const item = await this.albumRepository.findOne({ where: { id } });

    if (!item) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }

    const updatedAlbum = {
      ...item,
      ...dto,
    } as Album;

    // Return the updated user
    return await this.albumRepository.save(updatedAlbum);
  }

  delete(id: string) {
    this.validateId(id);
    const index = data.albums.findIndex((item) => item.id === id);
    if (index !== -1) {
      data.albums.splice(index, 1);
      data.tracks.forEach((item) => {
        if (item.albumId === id) {
          item.albumId = null;
        }
      });
    } else {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return;
  }
}
