import { Property, PropertyDocument } from './../model/property.model';
import { EntityRepository } from 'src/database/entity.repository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

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
    sortOption,
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
