import { jwtConstants } from '../jwt.constants';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDocument } from 'src/users/model/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: UserDocument) {
    const { password, ...user } = payload.toObject();
    return { ...user };
  }
}
