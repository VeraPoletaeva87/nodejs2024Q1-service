import { Track } from 'src/tracks/track.schema';
import { User } from 'src/users/user-schema';

export const data: Data = {
  users: [],
  tracks: [],
};

export interface Data {
  users: User[];
  tracks: Track[];
}
