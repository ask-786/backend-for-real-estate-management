import { User } from '../../users/model/user.model';
import { Enquiry } from '../../enquiry/model/enquiry.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Chat {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Enquiry.name,
    required: true,
  })
  enquiry: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  message: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  sender: mongoose.Types.ObjectId;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

export type ChatDocument = Chat & mongoose.Document;
