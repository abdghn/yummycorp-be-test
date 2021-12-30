import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user/user.service';
import { LoginDto } from './user/dto/auth.dto';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    const user  = await this.userService.login(loginDto);
    return {user, token : this.userService.createAccessToken(user)}
  }
}
