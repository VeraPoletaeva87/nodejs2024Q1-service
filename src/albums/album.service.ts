import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';

import { Album } from './album.schema';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateAlbumDTO } from './album.model';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackService } from 'src/tracks/tracks.service';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
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

  async findOne(id: string, isFavorites = false): Promise<Album> {
    this.validateId(id);
    const item: Album | null = await this.albumRepository.findOneBy({ id });
    if (!item) {
      if (isFavorites) {
        throw new HttpException(
          'Record not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      } else {
        throw new NotFoundException(`Record with id ${id} does not exist`);
      }
    }
    return item;
  }

  async create(dto: CreateAlbumDTO): Promise<Album> {
    if (!dto.name || !dto.year) {
      throw new BadRequestException(
        'Request body does not contain required fields (name, duration)',
      );
    }
    const newAlbum = this.albumRepository.create({
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    });

    return await this.albumRepository.save(newAlbum);
  }

  async update(id: string, dto: Partial<CreateAlbumDTO>): Promise<Album> {
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

  async delete(id: string) {
    this.validateId(id);
    const item: Album = await this.albumRepository.findOneBy({ id });
    if (item) {
      await this.albumRepository.delete(id);
      await this.trackService.deleteAlbumFromTrack(id);
    } else {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return;
  }

  public async deleteArtistFromAlbum(id: string): Promise<UpdateResult[]> {
    const albums: Album[] = await this.albumRepository.findBy({ artistId: id });
    return Promise.all(
      albums.map((item) =>
        this.albumRepository.update(item.id, { artistId: null }),
      ),
    );
  }
}
