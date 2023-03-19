import { Enquiry, EnquiryDocument } from './../model/enquiry.model';
import { EntityRepository } from 'src/database/entity.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, PopulateOptions } from 'mongoose';

@Injectable()
export class EnquiryRepository extends EntityRepository<EnquiryDocument> {
  enquiryModel: Model<EnquiryDocument>;
  constructor(@InjectModel(Enquiry.name) enquiryModel: Model<EnquiryDocument>) {
    super(enquiryModel);
    this.enquiryModel = enquiryModel;
  }

  async findAndPopulate(
    enquiryFinterQuery: FilterQuery<EnquiryDocument>,
    populateOptions: PopulateOptions,
  ) {
    return await this.enquiryModel
      .find(enquiryFinterQuery)
      .populate(populateOptions);
  }
}
