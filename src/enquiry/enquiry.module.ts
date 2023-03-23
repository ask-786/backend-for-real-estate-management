import { EnquiryDiscussionModule } from './../enquiry-discussion/enquiry-discussion.module';
import { PropertyModule } from './../property/property.module';
import { EnquiryRepository } from './repository/enquiry.repository';
import { EnquirySchema } from './model/enquiry.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { EnquiryService } from './enquiry.service';
import { EnquiryController } from './enquiry.controller';

@Module({
  providers: [EnquiryService, EnquiryRepository],
  imports: [
    MongooseModule.forFeature([{ name: 'Enquiry', schema: EnquirySchema }]),
    PropertyModule,
    EnquiryDiscussionModule,
  ],
  controllers: [EnquiryController],
})
export class EnquiryModule {}
