import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }
  async validate(payload: any): Promise<any> {
    const user = await this.userService.login(payload);
    if (!user) throw new UnauthorizedException();

    return user;
  }

}
