import { Module, forwardRef } from '@nestjs/common';

import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Album } from './album.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from '../artists/artist.module';
import { ArtistService } from '../artists/artist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), forwardRef(() => ArtistModule)],
  controllers: [AlbumController],
  providers: [AlbumService, ArtistService],
  exports: [TypeOrmModule],
})
export class AlbumModule {}
