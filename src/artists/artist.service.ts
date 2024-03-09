import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Artist } from './artist.schema';
import { data } from 'src/data/data';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateArtistDTO } from './artist.models';

@Injectable()
export class ArtistService {
  validateId(id: string) {
    const validId = validate(id);
    if (!validId) {
      throw new BadRequestException(`Track Id ${id} is invalid (not uuid)`);
    }
  }

  findAll(): Artist[] {
    return data.artists;
  }

  findOne(id: string): Artist {
    this.validateId(id);

    const item = data.artists.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return item;
  }

  create(dto: CreateArtistDTO): Artist {
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
    data.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, dto: CreateArtistDTO): Artist {
    this.validateId(id);

    if (!dto.name || !dto.grammy) {
      throw new BadRequestException(
        'Request body does not contain required fields (name, duration)',
      );
    }

    const index = data.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    data.artists[index].name = dto.name;
    data.artists[index].grammy = dto.grammy;

    // Return the updated user
    return data.artists[index];
  }

  delete(id: string) {
    this.validateId(id);
    const index = data.artists.findIndex((item) => item.id === id);
    if (index !== -1) {
      data.artists.splice(index, 1);
    } else {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return;
  }
}
