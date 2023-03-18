import { Property } from './../../property/model/property.model';
import { InternalServerErrorException } from '@nestjs/common';
import { Favorites, FavoritesDocument } from './../model/favorites.model';
import { EntityRepository } from 'src/database/entity.repository';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

export class FavoritesRepository extends EntityRepository<FavoritesDocument> {
  favoritesModel: Model<FavoritesDocument>;
  constructor(
    @InjectModel(Favorites.name) favoritesModel: Model<FavoritesDocument>,
  ) {
    super(favoritesModel);
    this.favoritesModel = favoritesModel;
  }

  async findOnePopulate(
    entityFilterQuery: FilterQuery<FavoritesDocument>,
    projection?: Record<string, number>,
  ): Promise<FavoritesDocument | null> {
    try {
      return await this.favoritesModel
        .findOne(entityFilterQuery, {
          ...projection,
        })
        .populate({ path: 'favoriteProperties', model: Property.name })
        .exec();
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
