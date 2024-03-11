import { Module } from '@nestjs/common';

import { TrackController } from './track.controller';
import { TrackService } from './tracks.service';

@Module({
  imports: [],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
