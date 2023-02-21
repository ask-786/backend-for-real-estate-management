import { jwtConstants } from './jwt.constants';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    return {
      email: payload.email,
      _id: payload._id,
      phone: payload.phone,
      firstname: payload.firstname,
      lastname: payload.lastname,
    };
  }
}
