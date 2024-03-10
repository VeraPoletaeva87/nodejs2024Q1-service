import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';

import type { Favorites } from './favorite.schema';
import { FavoritesService } from './favorite.service';
import { Track } from 'src/tracks/track.schema';
import { Album } from 'src/albums/album.schema';
import { Artist } from 'src/artists/artist.schema';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(): Favorites {
    const response = this.favoritesService.findAll();
    return response;
  }

  @Post('track/:id')
  createTrack(@Param('id') id: string): Track {
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    return this.favoritesService.deleteTrack(id);
  }

  @Post('album/:id')
  createAlbum(@Param('id') id: string): Album {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    return this.favoritesService.deleteAlbum(id);
  }

  @Post('artist/:id')
  createArtist(@Param('id') id: string): Artist {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.favoritesService.deleteArtist(id);
  }
}
