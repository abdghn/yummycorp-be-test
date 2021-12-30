import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'yummycorp-nest',
    database: 'yummycorp-user',
    "entities": ["dist/**/*.entity.js"],
    synchronize: true,
  }),OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
