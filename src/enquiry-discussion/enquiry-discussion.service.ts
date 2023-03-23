import { EnquiryDiscussionRepository } from './repository/enquiry-discussion.repository';
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class EnquiryDiscussionService {
  constructor(private chatRepository: EnquiryDiscussionRepository) {}

  async createMessage(message: string, enquiryId: string, senderId: string) {
    return await this.chatRepository.create({
      enquiry: new mongoose.Types.ObjectId(enquiryId),
      message: message,
      sender: new mongoose.Types.ObjectId(senderId),
    });
  }
}
