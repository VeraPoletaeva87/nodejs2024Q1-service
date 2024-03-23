import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Track } from './track.schema';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateTrackDTO } from './tracks-models';
import { Repository } from 'typeorm';
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

  async findOne(id: string): Promise<Track> {
    this.validateId(id);
    const item: Track = await this.trackRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
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

  async update(id: string, dto: CreateTrackDTO): Promise<Track> {
    this.validateId(id);

    if (!dto.name || !dto.duration) {
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
    return;
  }
}
