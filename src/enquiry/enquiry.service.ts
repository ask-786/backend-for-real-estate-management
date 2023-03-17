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
  ) {}

  async getUserEnquiries(userId: string) {
    const enquiries = await this.enquiryRepostory.find({
      propertyOwner: new mongoose.Types.ObjectId(userId),
    });
    return { enquiries };
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
        return await this.enquiryRepostory.create({
          title: enquiryData.title,
          sender: new mongoose.Types.ObjectId(user),
          propertyOwner: new mongoose.Types.ObjectId(property.owner),
          senderEmail: email,
          content: enquiryData.content,
          property: property._id,
          topic: enquiryData.topic,
        });
      } else {
        throw new NotFoundException('Property not found ');
      }
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
