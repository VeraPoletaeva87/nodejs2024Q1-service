import { Module, forwardRef } from '@nestjs/common';

import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Album } from './album.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from '../artists/artist.module';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), forwardRef(() => ArtistModule)],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [TypeOrmModule, AlbumService],
})
export class AlbumModule {}
