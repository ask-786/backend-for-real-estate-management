import mongoose, { FilterQuery } from 'mongoose';
import { PropertyRepository } from './repository/property.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  PropertyDocument,
  ascOrDescEnum,
  sortTypeEnum,
} from './model/property.model';

@Injectable()
export class PropertyService {
  constructor(private propertyRepository: PropertyRepository) {}
  getProperties(
    skip: number,
    desc: string,
    searchValue?: string,
    sortValue?: string,
    filterValue?: string,
  ): Promise<PropertyDocument[]> {
    const query: FilterQuery<PropertyDocument> = {};
    const sortOption = {};

    if (searchValue) {
      const regEx = new RegExp(searchValue, 'i');
      query.$or = [
        { title: { $regex: regEx } },
        { description: { $regex: regEx } },
        { tags: { $regex: regEx } },
      ];
    }

    if (sortValue !== '' && sortValue !== undefined) {
      const sort = sortTypeEnum[sortValue];
      sortOption[sort] = ascOrDescEnum[desc];
    }

    if (filterValue !== '' && filterValue !== undefined) {
      query.propertyType = { $in: filterValue.split(' ') };
    }

    return this.propertyRepository.propertyFind(query, skip, 8, sortOption);
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

  async pushEnquirers(id: string, user: string) {
    return await this.propertyRepository.findOneAndUpdate(
      { _id: id },
      { $push: { enquirers: new mongoose.Types.ObjectId(user) } },
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
