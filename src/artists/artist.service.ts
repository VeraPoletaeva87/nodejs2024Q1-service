import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';

import { Artist } from './artist.schema';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateArtistDTO } from './artist.models';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from '../tracks/track.schema';
import { TrackService } from '../tracks/tracks.service';
import { AlbumService } from '../albums/album.service';
import { Album } from 'src/albums/album.schema';
import { CreateTrackDTO } from 'src/tracks/tracks-models';
import { CreateAlbumDTO } from 'src/albums/album.model';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => TrackService))
    private readonly albumService: AlbumService,
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
      if (isFavorites) {
        throw new HttpException(
          'Record not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      } else {
        throw new NotFoundException(`Record with id ${id} does not exist`);
      }
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

    if (
      (dto.name !== null && typeof dto.name !== 'string') ||
      (dto.grammy !== null && typeof dto.grammy !== 'boolean')
    ) {
      throw new BadRequestException('Request body fields have wrong type');
    }

    const item: Artist = await this.artistRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }

    item.name = dto.name;
    item.grammy = dto.grammy;

    return await this.artistRepository.save(item);
  }

  async deleteArtistFromTrack(id: string) {
    const tracks: Track[] = await this.trackService.findAll();
    tracks.forEach(async (item) => {
      if (item.artistId === id) {
        const data: CreateTrackDTO = {
          name: item.name,
          duration: item.duration,
          artistId: null,
          albumId: item.albumId,
        };
        await this.trackService.update(item.id, data);
      }
    });
  }

  async deleteArtistFromAlbum(id: string) {
    const albums: Album[] = await this.albumService.findAll();

    albums.forEach(async (item) => {
      if (item.artistId === id) {
        const albumDto: CreateAlbumDTO = {
          name: item.name,
          artistId: null,
          year: item.year,
        };
        await this.albumService.update(item.id, albumDto);
      }
    });
  }

  async delete(id: string) {
    this.validateId(id);
    const item: Artist = await this.artistRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    } else {
      await this.artistRepository.delete(id);
      await this.deleteArtistFromTrack(id);
      await this.deleteArtistFromAlbum(id);
    }
    return;
  }
}
