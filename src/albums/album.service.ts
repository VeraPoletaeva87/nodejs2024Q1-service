import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Album } from './album.schema';
import { data } from 'src/data/data';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateAlbumDTO } from './album.model';

@Injectable()
export class AlbumService {
  validateId(id: string) {
    const validId = validate(id);
    if (!validId) {
      throw new BadRequestException(`Track Id ${id} is invalid (not uuid)`);
    }
  }

  findAll(): Album[] {
    return data.albums;
  }

  findOne(id: string): Album {
    this.validateId(id);

    const item = data.albums.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return item;
  }

  create(dto: CreateAlbumDTO): Album {
    if (!dto.name || !dto.year) {
      throw new BadRequestException(
        'Request body does not contain required fields (name, duration)',
      );
    }
    const newAlbum = {
      id: uuidv4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    };
    data.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, dto: CreateAlbumDTO): Album {
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

    const index = data.albums.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    data.albums[index].name = dto.name;
    data.albums[index].year = dto.year;
    data.albums[index].artistId = dto.artistId;

    // Return the updated user
    return data.albums[index];
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
