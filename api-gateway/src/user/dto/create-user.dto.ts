import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import Role from '../entities/role.enum';

export class CreateUserDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role: Role;
}
