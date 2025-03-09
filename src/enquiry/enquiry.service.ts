import { EnquiryDiscussionRepository } from './../enquiry-discussion/repository/enquiry-discussion.repository';
import { Property } from './../property/model/property.model';
import { EnquiryRequestData } from './model/enquiryRequest.interface';
import { PropertyService } from './../property/property.service';
import { EnquiryRepository } from './repository/enquiry.repository';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class EnquiryService {
  constructor(
    private enquiryRepostory: EnquiryRepository,
    private propertyService: PropertyService,
    private enquiryDiscussonRepository: EnquiryDiscussionRepository,
  ) {}

  async getUserEnquiries(userId: string) {
    const enquiries = await this.enquiryRepostory.findAndPopulate(
      { propertyOwner: new mongoose.Types.ObjectId(userId) },
      { path: 'property', model: Property.name },
    );
    return { enquiries };
  }

  async getUserSentEnquiries(userId: string) {
    const enquiries = await this.enquiryRepostory.findAndPopulate(
      { sender: new mongoose.Types.ObjectId(userId) },
      { path: 'property', model: Property.name },
    );
    return { enquiries };
  }

  async getOneEnquiry(id: string) {
    return await this.enquiryRepostory.findOneAndPopulate(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      { path: 'property', model: Property.name },
    );
  }

  async createEnquiry(
    enquiryData: EnquiryRequestData,
    user: string,
    email: string,
  ) {
    try {
      const property = await this.propertyService.getProperty(
        enquiryData.property,
      );
      if (property !== null) {
        const createdEnquiry = await this.enquiryRepostory.create({
          ...enquiryData,
          sender: new mongoose.Types.ObjectId(user),
          propertyOwner: new mongoose.Types.ObjectId(property.owner),
          senderEmail: email,
          property: property._id,
        });
        await this.propertyService.pushEnquirers(property._id, user);
        return createdEnquiry;
      } else {
        throw new NotFoundException('Property not found ');
      }
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getEnquiryDiscussions(id: string) {
    return await this.enquiryDiscussonRepository.find({
      enquiry: new mongoose.Types.ObjectId(id),
    });
  }
}
