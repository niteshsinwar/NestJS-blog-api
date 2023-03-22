import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: (process.env.JWT_SECRET || 'my_secret_key'),
    });
  }

  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      return false;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.user = decoded;
      return true;
    } catch (err) {
      return false;
    }
  }

  extractToken(request) {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      return null;
    }
    const [type, token] = authorizationHeader.split(' ');
    if (type !== 'Bearer') {
      return null;
    }
    return token;
  }
}
