import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Favorites } from './favorite.schema';
import { data } from 'src/data/data';
import { validate } from 'uuid';
import { Track } from 'src/tracks/track.schema';
import { Album } from 'src/albums/album.schema';
import { Artist } from 'src/artists/artist.schema';

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

  addTrack(id: string): Track {
    this.validateId(id);

    const item = data.tracks.find((item) => item.id === id);
    if (!item) {
      throw new HttpException(
        'Record not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
      //throw new NotFoundException(`Record with id ${id} does not exist`);
    }

    data.favorites.tracks.push(item);
    return item;
  }

  deleteTrack(id: string) {
    this.validateId(id);
    const index = data.favorites.tracks.findIndex((item) => item.id === id);
    if (index !== -1) {
      data.favorites.tracks.splice(index, 1);
    } else {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return;
  }

  addAlbum(id: string): Album {
    this.validateId(id);

    const item = data.albums.find((item) => item.id === id);
    if (!item) {
      throw new HttpException(
        'Record not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    data.favorites.albums.push(item);
    return item;
  }

  deleteAlbum(id: string) {
    this.validateId(id);
    const index = data.favorites.albums.findIndex((item) => item.id === id);
    if (index !== -1) {
      data.favorites.albums.splice(index, 1);
    } else {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return;
  }

  addArtist(id: string): Artist {
    this.validateId(id);

    const item = data.artists.find((item) => item.id === id);
    if (!item) {
      throw new HttpException(
        'Record not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    data.favorites.artists.push(item);
    return item;
  }

  deleteArtist(id: string) {
    this.validateId(id);
    const index = data.favorites.artists.findIndex((item) => item.id === id);
    if (index !== -1) {
      data.favorites.artists.splice(index, 1);
    } else {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return;
  }
}
