import { Album } from 'src/albums/album.schema';
import { Artist } from 'src/artists/artist.schema';
import { Track } from 'src/tracks/track.schema';

export interface Favorites {
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}
