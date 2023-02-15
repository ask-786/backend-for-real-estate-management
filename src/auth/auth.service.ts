import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findUser(username);
    if (user === null) {
      throw new UnauthorizedException();
    } else {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        return user;
      } else {
        throw new UnauthorizedException();
      }
    }
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      _id: user._id,
      phone: user.phone,
      firstName: user.firstname,
      lastname: user.lastname,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(user: any) {
    try {
      const result = await this.userService.addUser(user);
      return { status: true, result };
    } catch (err) {
      return { status: false, error: err.message };
    }
  }
}
