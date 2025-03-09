import mongoose from 'mongoose';
import { hash } from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  location: string;

  @Prop()
  profilePicture: string;

  @Prop()
  aboutme: string;

  @Prop({ default: false })
  isblocked: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & mongoose.Document;

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next();
  } else {
    hash(this.password, 10, (err, hashedPassword) => {
      if (err) {
        throw new InternalServerErrorException(
          'Something went wrong while securing your password',
        );
      } else {
        this.password = hashedPassword;
        next();
      }
    });
  }
});
