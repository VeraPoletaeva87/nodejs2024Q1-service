import { Module, forwardRef } from '@nestjs/common';

import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Album } from './album.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from '../artists/artist.module';
import { TrackModule } from '../tracks/track.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [TypeOrmModule, AlbumService],
})
export class AlbumModule {}
