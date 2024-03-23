import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';

import { Favorites } from './favorite.schema';
import { validate } from 'uuid';
import { Track } from 'src/tracks/track.schema';
import { Album } from 'src/albums/album.schema';
import { Artist } from 'src/artists/artist.schema';
import { AlbumService } from '../albums/album.service';
import { ArtistService } from '../artists/artist.service';
import { TrackService } from '../tracks/tracks.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
  ) {}

  validateId(id: string) {
    const validId = validate(id);
    if (!validId) {
      throw new BadRequestException(`Track Id ${id} is invalid (not uuid)`);
    }
  }

  async findAll(): Promise<Favorites> {
    const [favorites] = await this.favoritesRepository.find();
    if (!favorites) {
      const newFavorites: Favorites = this.favoritesRepository.create();
      newFavorites.tracks = [];
      newFavorites.albums = [];
      newFavorites.artists = [];
      return await this.favoritesRepository.save(newFavorites);
    }
    return favorites;
  }

  async addTrack(id: string): Promise<Track> {
    this.validateId(id);

    const item: Track = await this.trackService.findOne(id);
    const favorites: Favorites = await this.findAll();

    if (!item) {
      throw new HttpException(
        'Record not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    favorites.tracks.push(item);
    await this.favoritesRepository.save(favorites);
    return item;
  }

  async deleteTrack(id: string) {
    this.validateId(id);

    const favorites: Favorites = await this.findAll();
    const index = favorites.tracks.findIndex((item) => item.id === id);
    if (index !== -1) {
      favorites.tracks.splice(index, 1);
    } else {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return;
  }

  async addAlbum(id: string): Promise<Album> {
    this.validateId(id);

    const item: Album = await this.albumService.findOne(id);
    const favorites: Favorites = await this.findAll();

    if (!item) {
      throw new HttpException(
        'Record not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    favorites.albums.push(item);
    await this.favoritesRepository.save(favorites);
    return item;
  }

  async deleteAlbum(id: string) {
    this.validateId(id);
    const favorites: Favorites = await this.findAll();
    const index = favorites.albums.findIndex((item) => item.id === id);
    if (index !== -1) {
      favorites.albums.splice(index, 1);
    } else {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return;
  }

  async addArtist(id: string): Promise<Artist> {
    this.validateId(id);
    const item: Artist = await this.artistService.findOneId(id);
    const favorites: Favorites = await this.findAll();

    if (!item) {
      throw new HttpException(
        'Record not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    favorites.artists.push(item);
    await this.favoritesRepository.save(favorites);
    return item;
  }

  async deleteArtist(id: string) {
    this.validateId(id);
    const favorites: Favorites = await this.findAll();
    const index = favorites.artists.findIndex((item) => item.id === id);
    if (index !== -1) {
      favorites.artists.splice(index, 1);
    } else {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return;
  }
}
