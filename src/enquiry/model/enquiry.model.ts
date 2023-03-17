import { Property } from './../../property/model/property.model';
import { User } from 'src/users/model/user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Enquiry {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: User.name })
  sender: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: User.name })
  propertyOwner: string;

  @Prop({ required: true, type: String })
  senderEmail: string;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Property.name, required: true })
  property: string;

  @Prop({ type: String, required: true })
  topic: string;
}

export const EnquirySchema = SchemaFactory.createForClass(Enquiry);

export type EnquiryDocument = Enquiry & mongoose.Document;
