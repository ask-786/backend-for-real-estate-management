import { PropertyRepository } from './repository/property.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyDocument } from './model/property.model';

@Injectable()
export class PropertyService {
  constructor(private propertyRepository: PropertyRepository) {}
  getProperties(skip: number): Promise<PropertyDocument[]> {
    return this.propertyRepository.paginatedFind({}, skip, 8);
  }

  async getProperty(_id: string): Promise<PropertyDocument> {
    const property = await this.propertyRepository.findOne({ _id });
    if (property !== null) {
      return property;
    }
    throw new NotFoundException('Property Not Found');
  }

  createProperty(data: unknown) {
    return this.propertyRepository.create(data);
  }

  getOwnProperties(id: string) {
    return this.propertyRepository.find({ owner: id });
  }

  async deleteProperty(
    _id: string,
  ): Promise<{ deletedPropertyId: string | null }> {
    const deleted = await this.propertyRepository.deleteOne({ _id });
    if (deleted.acknowledged) {
      return { deletedPropertyId: _id };
    } else {
      throw new NotFoundException('Property Not Found');
    }
  }
}
