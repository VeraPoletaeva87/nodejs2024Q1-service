import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Artist } from '../artists/artist.schema'; // Import the Artist entity if it exists

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'int' })
  year: number;

  @ManyToOne(() => Artist, { nullable: true })
  artist: Artist | null;

  @Column({ nullable: true })
  artistId: string | null;
}
