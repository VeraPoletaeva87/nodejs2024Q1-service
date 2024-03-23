import { Module, forwardRef } from '@nestjs/common';

import { TrackController } from './track.controller';
import { TrackService } from './tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.schema';
import { AlbumModule } from '../albums/album.module';
import { ArtistModule } from '../artists/artist.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track]),
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
  ],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TypeOrmModule, TrackService],
})
export class TrackModule {}
