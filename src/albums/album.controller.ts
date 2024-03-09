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

import { CreateAlbumDTO } from './album.model';
import type { Album } from './album.schema';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll(): Album[] {
    const response = this.albumService.findAll();
    return response;
  }

  @Get(':id')
  findOne(@Param('id') prodId: string): Album {
    return this.albumService.findOne(prodId);
  }

  @Post()
  create(@Body() dto: CreateAlbumDTO): Album {
    return this.albumService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateAlbumDTO): Album {
    return this.albumService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.albumService.delete(id);
  }
}
