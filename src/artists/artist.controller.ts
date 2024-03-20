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

import { CreateArtistDTO } from './artist.models';
import type { Artist } from './artist.schema';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll(): Promise<Artist[]> {
    const response = this.artistService.findAll();
    return response;
  }

  @Get(':id')
  findOne(@Param('id') prodId: string): Promise<Artist> {
    return this.artistService.findOne(prodId);
  }

  @Post()
  create(@Body() dto: CreateArtistDTO): Promise<Artist> {
    return this.artistService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: CreateArtistDTO,
  ): Promise<Artist> {
    return this.artistService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.artistService.delete(id);
  }
}
