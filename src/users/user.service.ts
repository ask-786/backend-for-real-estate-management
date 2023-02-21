import { UserModel, UserRegistrationForm } from './user.model';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserModel>,
  ) {}

  async findUser(id: string) {
    const user = await this.userModel.findOne({
      $or: [{ email: id }],
    });
    return user;
  }

  async addUser(user: UserRegistrationForm) {
    try {
      return await this.userModel.create(user);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
