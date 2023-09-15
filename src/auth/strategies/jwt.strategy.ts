import { jwtConstants } from '../jwt.constants';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/model/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: User & { _id: string }) {
    return {
      email: payload.email,
      _id: payload._id,
      phone: payload.phone,
      firstname: payload.firstname,
      lastname: payload.lastname,
    };
  }
}
