import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constant';
import { LocalStrategy } from '../auth/local.strategy';
import { JwtStrategy } from '../auth/jwt.strategy';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8887,
        },
      },
    ]),
    PassportModule.register({defaultStrategy: "jwt"}),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, JwtStrategy],
  exports: [UserService, JwtModule],
})
export class UserModule {}
