import { FavoritesRepository } from './repository/favorites.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class FavoritesService {
  constructor(private favoritesRepository: FavoritesRepository) {}

  async getFavoriteProperties(userId: string) {
    return await this.favoritesRepository.findOnePopulate(
      {
        user: new mongoose.Types.ObjectId(userId),
      },
      { favoriteProperties: 1, _id: 0 },
    );
  }

  async addToFavorites(propertyId: string, userId: string) {
    const exists = await this.favoritesRepository.findOne({
      user: new mongoose.Types.ObjectId(userId),
    });
    if (exists !== null) {
      if (
        exists.favoriteProperties.some((el) => el.toString() === propertyId)
      ) {
        throw new ConflictException('Item Alread Exists in the Favorites');
      } else {
        exists.favoriteProperties.push(new mongoose.Types.ObjectId(propertyId));
        const result = await exists.save();
        return { result, message: 'Successfully added to favorites' };
      }
    } else {
      const result = await this.favoritesRepository.create({
        user: new mongoose.Types.ObjectId(userId),
        favoriteProperties: new mongoose.Types.ObjectId(propertyId),
      });
      return { result, message: 'Successfully added to favorites' };
    }
  }
}
