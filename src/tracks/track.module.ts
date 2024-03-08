import { Module } from '@nestjs/common';

import { UserController } from './track.controller';
import { TrackService } from './tracks.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [TrackService],
})
export class TrackModule {}
