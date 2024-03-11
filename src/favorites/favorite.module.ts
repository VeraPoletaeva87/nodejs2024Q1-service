import { Module } from '@nestjs/common';

import { FavoriteController } from './favorite.controller';
import { FavoritesService } from './favorite.service';

@Module({
  imports: [],
  controllers: [FavoriteController],
  providers: [FavoritesService],
})
export class FavoriteModule {}
