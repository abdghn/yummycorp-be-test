import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { plainToClass } from 'class-transformer';
import { LoginDto } from './dto/auth.dto';
import { genSalt, genSaltSync, hash, hashSync } from 'bcrypt';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({cmd : 'register'})
  async create(@Payload() createUserDto: CreateUserDto) {
    const user = Object.assign(new User, createUserDto)
    return this.userService.create(user);
  }


  @MessagePattern({ cmd :'validateUser' })
  login(@Payload() loginDto: LoginDto) {
    return this.userService.validate(loginDto);
  }

}
