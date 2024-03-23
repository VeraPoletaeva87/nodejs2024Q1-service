import { Exclude } from 'class-transformer';
import { Favorites } from 'src/favorites/favorite.schema';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('track')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column({ type: 'integer' })
  duration: number;

  @Exclude()
  @ManyToOne(() => Favorites, (favorites: Favorites) => favorites.tracks)
  favorites: Favorites;
}
