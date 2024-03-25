import { Module, forwardRef } from '@nestjs/common';

import { FavoriteController } from './favorite.controller';
import { FavoritesService } from './favorite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './favorite.schema';
import { TrackModule } from '../tracks/track.module';
import { ArtistModule } from '../artists/artist.module';
import { AlbumModule } from '../albums/album.module';
import { AlbumService } from '../albums/album.service';
import { ArtistService } from '../artists/artist.service';
import { TrackService } from '../tracks/tracks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorites]),
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
  ],
  controllers: [FavoriteController],
  providers: [FavoritesService, TrackService, ArtistService, AlbumService],
  exports: [TypeOrmModule],
})
export class FavoriteModule {}
