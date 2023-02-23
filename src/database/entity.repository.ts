import { BadRequestException } from '@nestjs/common';
import { Document, FilterQuery, Model } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}
  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    try {
      return await this.entityModel
        .findOne(entityFilterQuery, {
          __v: 0,
          ...projection,
        })
        .exec();
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    try {
      return await this.entityModel.find(entityFilterQuery).exec();
    } catch (err) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    try {
      return await entity.save();
    } catch (err) {
      console.log(err.message);
      throw new BadRequestException('Data Is not valid');
    }
  }
}
