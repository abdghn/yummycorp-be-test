import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';;
import Role from '../user/entities/role.enum';
import { Roles, RolesGuard } from '../auth/role.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.orderService.findAll();
  }

}
