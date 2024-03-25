import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Favorites } from 'src/favorites/favorite.schema';

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @Exclude()
  @ManyToOne(() => Favorites, (favorites: Favorites) => favorites.albums)
  favorites: Favorites;
}
