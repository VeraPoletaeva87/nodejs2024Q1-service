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
  findAll(): Track[] {
    const response = this.trackService.findAll();
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

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateTrackDTO): Track {
    return this.trackService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.trackService.delete(id);
  }
}
