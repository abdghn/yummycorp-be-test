import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from './dto/auth.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly clientUserService: ClientProxy,
    private readonly jwtService: JwtService
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.clientUserService.send({cmd: "register"}, createUserDto);
  }

  public async login(loginDto: LoginDto): Promise<User> {
    const user = await this.clientUserService.send<User>({cmd: "validateUser"}, loginDto).toPromise();
    return user
  }

  public createAccessToken(user: User): string {
    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    }
    const option = { expiresIn: '24h' }
    return this.jwtService.sign(
      payload,
      option,
    )
  }

}
