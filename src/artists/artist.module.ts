import { Module } from '@nestjs/common';

import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Artist } from './artist.schema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
