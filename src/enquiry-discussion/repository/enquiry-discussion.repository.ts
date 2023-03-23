import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { Chat, ChatDocument } from '../model/chat.model';

@Injectable()
export class EnquiryDiscussionRepository extends EntityRepository<ChatDocument> {
  constructor(@InjectModel(Chat.name) chatModel: Model<ChatDocument>) {
    super(chatModel);
  }
}
