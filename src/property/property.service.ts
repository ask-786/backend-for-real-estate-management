import { PropertyRepository } from './repository/property.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyDocument } from './model/property.model';

@Injectable()
export class PropertyService {
  constructor(private propertyRepository: PropertyRepository) {}
  getProperties(
    skip: number,
    searchValue?: string,
  ): Promise<PropertyDocument[]> {
    if (searchValue) {
      const regEx = new RegExp(searchValue, 'i');
      console.log(regEx);
      return this.propertyRepository.paginatedFind(
        {
          $or: [
            { title: { $regex: regEx } },
            { description: { $regex: regEx } },
            { tags: { $regex: regEx } },
          ],
        },
        skip,
        8,
      );
    } else {
      return this.propertyRepository.paginatedFind({}, skip, 8);
    }
  }

  async getProperty(_id: string): Promise<PropertyDocument> {
    const property = await this.propertyRepository.findOne({ _id });
    if (property !== null) {
      return property;
    }
    throw new NotFoundException('Property Not Found');
  }

  async createProperty(data: unknown) {
    return await this.propertyRepository.create(data);
  }

  async getOwnProperties(id: string) {
    return this.propertyRepository.find({ owner: id });
  }

  async updateProperty(id: string, data: unknown) {
    return await this.propertyRepository.findOneAndUpdate(
      { _id: id },
      { $set: data },
    );
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
