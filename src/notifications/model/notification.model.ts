import { Property } from 'src/property/model/property.model';
import { User } from 'src/users/model/user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: User.name })
  from: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: User.name })
  user: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true, enum: ['enquiry', 'favorite'] })
  type: NotificationTypeEnum;

  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: Property.name })
  property: mongoose.Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  readStatus: boolean;

  @Prop({ type: mongoose.Types.ObjectId, default: false })
  enquiry: mongoose.Types.ObjectId;
}

export enum NotificationTypeEnum {
  enquiry = 'enquiry',
  favorite = 'favorite',
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

export type NotificationDocument = Notification & mongoose.Document;
