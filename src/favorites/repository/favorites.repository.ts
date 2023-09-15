import { InternalServerErrorException } from '@nestjs/common';
import { Favorites, FavoritesDocument } from './../model/favorites.model';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PopulateOptions } from 'mongoose';
import { EntityRepository } from 'src/repository/entity.repository';

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
