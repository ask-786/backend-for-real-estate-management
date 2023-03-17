import { Enquiry, EnquiryDocument } from './../model/enquiry.model';
import { EntityRepository } from 'src/database/entity.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EnquiryRepository extends EntityRepository<EnquiryDocument> {
  constructor(@InjectModel(Enquiry.name) enquiryModel: Model<EnquiryDocument>) {
    super(enquiryModel);
  }
}
