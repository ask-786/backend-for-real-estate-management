import { MongooseModule } from '@nestjs/mongoose';
import { EnquiryDiscussionRepository } from './repository/enquiry-discussion.repository';
import { Module } from '@nestjs/common';
import { DiscussionGateway } from './gateway/discussion.gateway';
import { EnquiryDiscussionService } from './enquiry-discussion.service';
import { ChatSchema } from './model/chat.model';

@Module({
  providers: [
    DiscussionGateway,
    EnquiryDiscussionService,
    EnquiryDiscussionRepository,
  ],
  imports: [MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }])],
  exports: [EnquiryDiscussionRepository],
})
export class EnquiryDiscussionModule {}
