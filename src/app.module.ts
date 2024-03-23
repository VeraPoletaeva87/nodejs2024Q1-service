import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { TrackModule } from './tracks/track.module';
import { ArtistModule } from './artists/artist.module';
import { AlbumModule } from './albums/album.module';
import { FavoriteModule } from './favorites/favorite.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Artist } from './artists/artist.schema';
import { User } from './users/user-schema';
import { Track } from './tracks/track.schema';
import { Album } from './albums/album.schema';
import { Favorites } from './favorites/favorite.schema';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('PG_HOST'),
          port: +configService.get('PG_PORT'),
          username: configService.get('PG_USER'),
          password: configService.get('PG_PASSWORD'),
          database: configService.get('PG_DB'),
          entities: [User, Artist, Album, Track, Favorites],
          synchronize: true,
          logging: false,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
