import { Module } from '@nestjs/common';

import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Artist } from './artist.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from '../favorites/favorite.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Favorites])],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [TypeOrmModule],
})
export class ArtistModule {}
