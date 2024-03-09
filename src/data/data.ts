import { Album } from '../albums/album.schema';
import { Artist } from '../artists/artist.schema';
import { Favorites } from '../favorites/favorite.schema';
import { Track } from '../tracks/track.schema';
import { User } from '../users/user-schema';

export const data: Data = {
  users: [],
  tracks: [],
  artists: [],
  albums: [],
  favorites: {
    albums: [],
    artists: [],
    tracks: [],
  },
};

export interface Data {
  users: User[];
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
  favorites: Favorites;
}
