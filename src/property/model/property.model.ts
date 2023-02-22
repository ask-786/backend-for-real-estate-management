import * as mongoose from 'mongoose';

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
  streedAddress: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
});

export const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    requried: true,
  },
  tags: {
    type: [String],
  },
  corodeinates: {
    type: Object,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  propertyType: {
    type: String,
    enum: ['land', 'property'],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  address: AddressSchema,
});
