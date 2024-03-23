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
import { ArtistService } from './artist.service';
import { CreateArtistDTO } from './artist.models';
import { Artist } from './artist.schema';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOneId(@Param('id') id: string): Promise<Artist> {
    return this.artistService.findOneId(id);
  }

  @Post()
  async createArtist(
    @Body() createArtistDto: CreateArtistDTO,
  ): Promise<Artist> {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  async updateArtist(
    @Param('id') id: string,
    @Body() dto: CreateArtistDTO,
  ): Promise<Artist> {
    return this.artistService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeArtist(@Param('id') id: string): Promise<void> {
    await this.artistService.delete(id);
  }
}
