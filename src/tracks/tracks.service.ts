import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Track } from './track.schema';
import { data } from 'src/data/data';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateTrackDTO } from './tracks-models';

@Injectable()
export class TrackService {
  validateId(id: string) {
    const validId = validate(id);
    if (!validId) {
      throw new BadRequestException(`User Id ${id} is invalid (not uuid)`);
    }
  }

  findAll(): Track[] {
    return data.tracks;
  }

  findOne(id: string): Track {
    this.validateId(id);

    const item = data.tracks.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return item;
  }

  create(dto: CreateTrackDTO): Track {
    const newTrack = {
      id: uuidv4(),
      name: dto.name,
      artistId: dto.artistId,
      albumId: dto.albumId,
      duration: dto.duration,
    };
    data.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, dto: CreateTrackDTO): Track {
    this.validateId(id);

    const index = data.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    data.tracks[index].name = dto.name;
    data.tracks[index].duration = dto.duration;
    data.tracks[index].artistId = dto.artistId;
    data.tracks[index].albumId = dto.albumId;

    // Return the updated user
    return data.tracks[index];
  }

  delete(id: string) {
    this.validateId(id);
    const index = data.tracks.findIndex((item) => item.id === id);
    if (index !== -1) {
      data.tracks.splice(index, 1);
    } else {
      throw new NotFoundException(`Record with id ${id} does not exist`);
    }
    return HttpStatus.NO_CONTENT;
  }
}
