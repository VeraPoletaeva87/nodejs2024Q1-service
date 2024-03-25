import { Exclude } from 'class-transformer';
import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { Favorites } from '../favorites/favorite.schema';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('artist')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column({ default: false })
  @IsBoolean()
  grammy: boolean;

  @Exclude()
  @ManyToOne(() => Favorites, (favorites: Favorites) => favorites.artists, {
    onDelete: 'SET NULL',
  })
  favorites: Favorites;
}
