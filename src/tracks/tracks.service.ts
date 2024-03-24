import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Track } from './track.schema';
import { validate } from 'uuid';
import { CreateTrackDTO } from './tracks-models';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  validateId(id: string) {
    const validId = validate(id);
    if (!validId) {
      throw new BadRequestException(`Track Id ${id} is invalid (not uuid)`);
    }
  }

  async findAll(): Promise<Track[]> {
    const items = await this.trackRepository.find();
    return items;
  }

  async findOne(id: string, isFavorites = false): Promise<Track> {
    this.validateId(id);
    const item: Track | null = await this.trackRepository.findOneBy({ id });
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

  async create(dto: CreateTrackDTO): Promise<Track> {
    if (!dto.name || !dto.duration) {
      throw new BadRequestException(
        'Request body does not contain required fields (name, duration)',
      );
    }
    const newTrack: Track = this.trackRepository.create(dto);

    return await this.trackRepository.save(newTrack);
  }

  async update(id: string, dto: Partial<CreateTrackDTO>): Promise<Track> {
    this.validateId(id);
    console.log('track UPDATE', dto);
    if (!dto.name || !dto.duration) {
      console.log('track DTO', dto);
      throw new BadRequestException(
        'Request body does not contain required fields (name, duration)',
      );
    }

    const item: Track = await this.trackRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }

    Object.assign(item, CreateTrackDTO);
    await this.trackRepository.save(item);

    // Return the updated user
    return item;
  }

  async delete(id: string) {
    this.validateId(id);
    const item: Track = await this.trackRepository.findOneBy({ id });
    if (item) {
      await this.trackRepository.delete(id);
    } else {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
  }

  public async deleteArtistFromTrack(id: string): Promise<UpdateResult[]> {
    const tracks: Track[] = await this.trackRepository.findBy({
      artistId: id,
    });
    return Promise.all(
      tracks.map((item) =>
        this.trackRepository.update(item.id, { artistId: null }),
      ),
    );
  }

  public async deleteAlbumFromTrack(id: string): Promise<UpdateResult[]> {
    const tracks: Track[] = await this.trackRepository.findBy({
      albumId: id,
    });
    return Promise.all(
      tracks.map((item) =>
        this.trackRepository.update(item.id, { albumId: null }),
      ),
    );
  }
}
