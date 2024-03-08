import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateTrackDTO } from './tracks-models';
import type { Track } from './track.schema';
import { TrackService } from './tracks.service';

@Controller('tracks')
export class UserController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll(): Promise<Track[]> {
    const response = await this.trackService.findAll();
    console.log(response);
    return response;
  }

  @Get(':id')
  findOne(@Param('id') prodId: string): Track {
    return this.trackService.findOne(prodId);
  }

  @Post()
  create(@Body() dto: CreateTrackDTO): Track {
    return this.trackService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateTrackDTO): Track {
    return this.trackService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.trackService.delete(id);
  }
}
