import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Artist } from '../artists/artist.schema'; // Import the Artist entity if it exists
import { Album } from '../albums/album.schema'; // Import the Album entity if it exists

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Artist, { nullable: true })
  artist: Artist | null;

  @ManyToOne(() => Album, { nullable: true })
  album: Album | null;

  @Column({ type: 'integer' })
  duration: number;
}
