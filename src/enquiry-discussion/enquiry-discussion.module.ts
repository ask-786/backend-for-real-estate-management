import { Module } from '@nestjs/common';
import { DiscussionGateway } from './gateway/discussion/discussion.gateway';

@Module({
  providers: [DiscussionGateway],
})
export class EnquiryDiscussionModule {}
