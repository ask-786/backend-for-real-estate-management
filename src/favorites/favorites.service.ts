import { FavoritesDocument } from './model/favorites.model';
import { FavoritesRepository } from './repository/favorites.repository';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { Property } from 'src/property/model/property.model';

@Injectable()
export class FavoritesService {
  constructor(private favoritesRepository: FavoritesRepository) {}

  async getFavoriteProperties(userId: string): Promise<FavoritesDocument> {
    return await this.favoritesRepository.findOneAndPopulate(
      {
        user: new mongoose.Types.ObjectId(userId),
      },
      { path: 'favoriteProperties', model: Property.name },
      { favoriteProperties: 1, _id: 0 },
    );
  }

  async getFavoritePropertiesCount(userId: string): Promise<FavoritesDocument> {
    return await this.favoritesRepository.findOne({
      user: new mongoose.Types.ObjectId(userId),
    });
  }

  async addToFavorites(
    propertyId: string,
    userId: string,
  ): Promise<{ result: FavoritesDocument; message: string; id: string }> {
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
        return {
          result,
          message: 'Successfully added to favorites',
          id: propertyId,
        };
      }
    } else {
      const result = await this.favoritesRepository.create({
        user: new mongoose.Types.ObjectId(userId),
        favoriteProperties: new mongoose.Types.ObjectId(propertyId),
      });
      return {
        result,
        message: 'Successfully added to favorites',
        id: propertyId,
      };
    }
  }

  async removeFromFavorites(
    propertyId: string,
    userId: string,
  ): Promise<{ result: unknown; message: string; id: string }> {
    const result = await this.favoritesRepository.updateOne(
      {
        user: new mongoose.Types.ObjectId(userId),
      },
      {
        $pull: { favoriteProperties: new mongoose.Types.ObjectId(propertyId) },
      },
    );
    if (result.modifiedCount > 0) {
      return {
        result,
        message: 'Successfully removed from favorites',
        id: propertyId,
      };
    } else {
      throw new BadRequestException("Couldn't found the Property");
    }
  }

  async getFavoriteIds(userId: string): Promise<FavoritesDocument> {
    return await this.favoritesRepository.findOne(
      {
        user: new mongoose.Types.ObjectId(userId),
      },
      { createdAt: 0, updatedAt: 0, _id: 0 },
    );
  }
}
