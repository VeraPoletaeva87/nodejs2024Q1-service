import { Module } from '@nestjs/common';

import { TrackController } from './track.controller';
import { TrackService } from './tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [],
})
export class TrackModule {}
