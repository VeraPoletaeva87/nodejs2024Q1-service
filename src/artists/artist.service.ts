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
import { validate } from 'uuid';
import { CreateArtistDTO } from './artist.models';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackService } from '../tracks/tracks.service';
import { AlbumService } from '../albums/album.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
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

  async delete(id: string): Promise<void> {
    this.validateId(id);
    const item: Artist = await this.artistRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    await this.trackService.deleteArtistFromTrack(id);
    await this.albumService.deleteArtistFromAlbum(id);
    await this.artistRepository.delete(id);
  }
}
