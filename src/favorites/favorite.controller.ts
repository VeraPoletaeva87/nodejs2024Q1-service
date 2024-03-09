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

import { CreateFavDTO } from './favorite.models';
import type { Favorites } from './favorite.schema';
import { FavoritesService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(): Favorites {
    const response = this.favoritesService.findAll();
    return response;
  }

  @Post('track/:id')
  createTrack(@Param('id') id: string): Favorites {
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    return this.favoritesService.deleteTrack(id);
  }

  @Post('album/:id')
  createAlbum(@Param('id') id: string): Favorites {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    return this.favoritesService.deleteAlbum(id);
  }

  @Post('artist/:id')
  createArtist(@Param('id') id: string): Favorites {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.favoritesService.deleteArtist(id);
  }
}
