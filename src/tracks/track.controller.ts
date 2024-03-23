import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateTrackDTO } from './tracks-models';
import type { Track } from './track.schema';
import { TrackService } from './tracks.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll(): Promise<Track[]> {
    const response = this.trackService.findAll();
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') prodId: string): Promise<Track> {
    return this.trackService.findOne(prodId);
  }

  @Post()
  async create(@Body() dto: CreateTrackDTO): Promise<Track> {
    return this.trackService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: CreateTrackDTO,
  ): Promise<Track> {
    return this.trackService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.trackService.delete(id);
  }
}
