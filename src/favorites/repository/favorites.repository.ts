import { InternalServerErrorException } from '@nestjs/common';
import { Favorites, FavoritesDocument } from './../model/favorites.model';
import { EntityRepository } from 'src/database/entity.repository';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PopulateOptions } from 'mongoose';

export class FavoritesRepository extends EntityRepository<FavoritesDocument> {
  favoritesModel: Model<FavoritesDocument>;
  constructor(
    @InjectModel(Favorites.name) favoritesModel: Model<FavoritesDocument>,
  ) {
    super(favoritesModel);
    this.favoritesModel = favoritesModel;
  }

  async findOneAndPopulate(
    entityFilterQuery: FilterQuery<FavoritesDocument>,
    populateOptions: PopulateOptions,
    projection?: Record<string, number>,
  ): Promise<FavoritesDocument | null> {
    try {
      return await this.favoritesModel
        .findOne(entityFilterQuery, {
          ...projection,
        })
        .populate(populateOptions)
        .exec();
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
