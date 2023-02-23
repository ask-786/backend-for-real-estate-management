import { Property, PropertyDocument } from './../model/property.model';
import { EntityRepository } from 'src/database/entity.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PropertyRepository extends EntityRepository<PropertyDocument> {
  constructor(
    @InjectModel(Property.name) propertyModel: Model<PropertyDocument>,
  ) {
    super(propertyModel);
  }
}
