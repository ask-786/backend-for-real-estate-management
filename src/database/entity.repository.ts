import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Document, FilterQuery, InferId, Model, UpdateQuery } from 'mongoose';

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
      throw new BadRequestException(err.message);
    }
  }

  async paginatedFind(
    entityFilterQuery: FilterQuery<T>,
    skip: number,
    limit: number,
  ): Promise<T[] | null> {
    try {
      return await this.entityModel
        .find(entityFilterQuery)
        .skip(skip * limit)
        .limit(limit)
        .exec();
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async exists(
    entityFilterQuery: FilterQuery<T>,
  ): Promise<{ _id: InferId<T> }> {
    try {
      return await this.entityModel.exists(entityFilterQuery).exec();
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong !!');
    }
  }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    try {
      return await this.entityModel.find(entityFilterQuery).exec();
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    try {
      return await entity.save();
    } catch (err) {
      throw new ConflictException(err._message);
    }
  }

  async deleteOne(entityDeleteQuery: FilterQuery<T>) {
    try {
      return await this.entityModel.deleteOne(entityDeleteQuery);
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async updateOne(
    entityUpdateQuery: FilterQuery<T>,
    entityUpdateData: UpdateQuery<T>,
  ) {
    try {
      return await this.entityModel.updateOne(
        entityUpdateQuery,
        entityUpdateData,
      );
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
