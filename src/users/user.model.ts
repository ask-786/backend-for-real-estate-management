import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    aboutme: {
      type: String,
    },
    isblocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next();
  } else {
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
      if (err) {
        throw new Error('Something went wrong while securing your password');
      } else {
        this.password = hashedPassword;
        next();
      }
    });
  }
});

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

export interface UserRegistrationForm {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
}
