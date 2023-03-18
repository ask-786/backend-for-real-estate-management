import { MongooseModule } from '@nestjs/mongoose';
import { FavoritesRepository } from './repository/favorites.repository';
import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { FavoritesSchema } from './model/favorites.model';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
  imports: [
    MongooseModule.forFeature([{ name: 'Favorites', schema: FavoritesSchema }]),
  ],
})
export class FavoritesModule {}
