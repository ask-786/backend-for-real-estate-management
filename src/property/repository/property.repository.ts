import { Property, PropertyDocument } from './../model/property.model';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, SortOrder } from 'mongoose';
import { EntityRepository } from 'src/repository/entity.repository';

@Injectable()
export class PropertyRepository extends EntityRepository<PropertyDocument> {
  propertyModel: Model<PropertyDocument>;
  constructor(
    @InjectModel(Property.name) propertyModel: Model<PropertyDocument>,
  ) {
    super(propertyModel);
    this.propertyModel = propertyModel;
  }

  async propertyFind(
    entityFilterQuery: FilterQuery<PropertyDocument>,
    skip: number,
    limit: number,
    sortOption:
      | string
      | { [key: string]: SortOrder | { $meta: 'textScore' } }
      | [string, SortOrder][],
  ): Promise<PropertyDocument[] | null> {
    try {
      return await this.propertyModel
        .find(entityFilterQuery)
        .sort(sortOption)
        .skip(skip * limit)
        .limit(limit)
        .exec();
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
