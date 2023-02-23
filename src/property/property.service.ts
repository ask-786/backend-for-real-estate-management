import { PropertyRepository } from './repository/property.repository';
import { Injectable } from '@nestjs/common';
import { PropertyDocument } from './model/property.model';

@Injectable()
export class PropertyService {
  constructor(private propertyRepository: PropertyRepository) {}
  getProperties(): Promise<PropertyDocument[]> {
    return this.propertyRepository.find({});
  }

  getProperty(_id: string): Promise<PropertyDocument> {
    return this.propertyRepository.findOne({ _id });
  }

  createProperty(data) {
    return this.propertyRepository.create(data);
  }
}
