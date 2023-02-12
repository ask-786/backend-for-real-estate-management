import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    aboutMe: {
      type: String,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export interface UserModel {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  location: string;
  profilePicture: string;
  aboutMe: string;
  isBlocked: boolean;
}
