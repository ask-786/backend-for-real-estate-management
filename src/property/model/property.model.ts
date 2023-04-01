import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/model/user.model';

const AddressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
});

export enum propertyType {
  land = 'land',
  residential = 'residential',
  commercial = 'commercial',
  industrial = 'industrial',
}

export enum sortTypeEnum {
  price = 'price',
  date = 'createdAt',
  name = 'title',
}

export interface propertyTypeInterface {
  land: boolean;
  residential: boolean;
  commercial: boolean;
  industrial: boolean;
}

export interface coOrdinates {
  lattitude: number;
  longitude: number;
}

@Schema({ timestamps: true })
export class Property {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: [String] })
  tags: string[];

  @Prop({ required: true, type: Object })
  coOrdinates: coOrdinates;

  @Prop({ required: true, type: [String] })
  images: string[];

  @Prop({
    required: true,
    type: String,
    enum: ['land', 'residential', 'commercial', 'industrial'],
  })
  propertyType: propertyType;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: User.name })
  owner: mongoose.Types.ObjectId;

  @Prop({ required: true, type: AddressSchema })
  address: object;

  @Prop({ type: [mongoose.Types.ObjectId] })
  enquirers: mongoose.Types.ObjectId[];
}

export const PropertySchema = SchemaFactory.createForClass(Property);

export type PropertyDocument = Property & mongoose.Document;

export interface propertyAddressType {
  country: string;
  state: string;
  district: string;
  city: string;
  streetAddress: string;
  zipCode: string;
}
