import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsUUID } from 'class-validator';
import { Album } from '../albums/album.schema';
import { Artist } from '../artists/artist.schema';
import { Track } from '../tracks/track.schema';

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @FavoritesOneToManyForAlbums()
  albums: Album[];

  @FavoritesOneToManyForTracks()
  tracks: Track[];

  @FavoritesOneToManyForArtists()
  artists: Artist[];
}

function FavoritesOneToManyForAlbums() {
  return OneToMany(
    () => Album,
    (album: Album) => album.favorites,
    {
      onDelete: 'SET NULL',
      eager: true,
    },
  );
}

function FavoritesOneToManyForTracks() {
  return OneToMany(
    () => Track,
    (track: Track) => track.favorites,
    {
      onDelete: 'SET NULL',
      eager: true,
    },
  );
}

function FavoritesOneToManyForArtists() {
  return OneToMany(
    () => Artist,
    (artist: Artist) => artist.favorites,
    {
      onDelete: 'SET NULL',
      eager: true,
    },
  );
}
