import { Module, forwardRef } from '@nestjs/common';

import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Artist } from './artist.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from '../favorites/favorite.schema';
import { TrackModule } from '../tracks/track.module';
import { AlbumModule } from '../albums/album.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Artist, Favorites]),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [TypeOrmModule, ArtistService],
})
export class ArtistModule {}
