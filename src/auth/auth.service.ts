import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string, password: string) {
    const user = await this.userService.findUser(id);
    if (user === null) {
      throw new BadRequestException('Couldnt find user');
    } else {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        return user;
      } else {
        throw new UnauthorizedException('Password or username is invalid');
      }
    }
  }

  login(user: any) {
    const payload = {
      email: user.email,
      _id: user._id,
      phone: user.phone,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    return {
      user,
      status: true,
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(user: any) {
    const isExists = await this.userService.userExists(user.phone, user.email);
    if (isExists === null) {
      const result = await this.userService.addUser(user);
      return {
        status: true,
        user: result,
        message: 'User Successfully registered',
      };
    } else {
      throw new ConflictException('User alread exists');
    }
  }
}
