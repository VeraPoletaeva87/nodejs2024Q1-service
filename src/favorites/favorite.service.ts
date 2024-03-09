import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Favorites } from './favorite.schema';
import { data } from 'src/data/data';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateFavDTO } from './favorite.models';

@Injectable()
export class FavoritesService {
  validateId(id: string) {
    const validId = validate(id);
    if (!validId) {
      throw new BadRequestException(`Track Id ${id} is invalid (not uuid)`);
    }
  }

  findAll(): Favorites {
    return data.favorites;
  }

  addTrack(id: string): Favorites {
    this.validateId(id);

    const item = data.tracks.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }

    data.favorites.tracks.push(id);
    return;
  }

  deleteTrack(id: string) {
    this.validateId(id);
    const index = data.favorites.tracks.findIndex((item) => item === id);
    if (index !== -1) {
      data.favorites.tracks.splice(index, 1);
    } else {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return;
  }

  addAlbum(id: string): Favorites {
    this.validateId(id);

    const item = data.albums.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }

    data.favorites.albums.push(id);
    return;
  }

  deleteAlbum(id: string) {
    this.validateId(id);
    const index = data.favorites.albums.findIndex((item) => item === id);
    if (index !== -1) {
      data.favorites.albums.splice(index, 1);
    } else {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return;
  }

  addArtist(id: string): Favorites {
    this.validateId(id);

    const item = data.artists.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }

    data.favorites.artists.push(id);
    return;
  }

  deleteArtist(id: string) {
    this.validateId(id);
    const index = data.favorites.artists.findIndex((item) => item === id);
    if (index !== -1) {
      data.favorites.artists.splice(index, 1);
    } else {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return;
  }
}
