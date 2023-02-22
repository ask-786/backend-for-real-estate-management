import { UserRepository } from './repository/user.repository';
import { UserRegistrationData } from './model/user.model';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findUser(id: string) {
    const user = await this.userRepository.findOne({
      $or: [{ email: id }, { phone: id }],
    });
    return user;
  }

  async addUser(user: UserRegistrationData) {
    try {
      return await this.userRepository.create(user);
    } catch (err) {
      throw new BadRequestException('Got invalid data');
    }
  }
}
