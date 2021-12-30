import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { compare, compareSync, genSalt, genSaltSync, hash, hashSync } from 'bcrypt';
import { LoginDto } from './dto/auth.dto';
import { RpcException } from '@nestjs/microservices';
import bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto)
  }


  async validate(loginDto : LoginDto) {
    const emailUser = await this.userRepository.findOne({email : loginDto.email})
      if (!emailUser) {
      throw new RpcException(
        new ConflictException(
          'User with provided email not exists'
        )
      )
    }

    if (loginDto.password){
      const comparePassword = await compare(loginDto.password, emailUser.password)
      if (comparePassword) {
        emailUser.password = undefined
        return emailUser
      } else {
        throw new RpcException(new UnauthorizedException('Password is incorrect'))
      }
    } else {
      return emailUser
    }

  }

}
