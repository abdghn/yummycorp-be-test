import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_SERVICE') private readonly clientOrderService: ClientProxy,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return this.clientOrderService.send({cmd: "createOrder"},createOrderDto);
  }

  findAll(){
    return this.clientOrderService.send({cmd: "findAllOrder"}, { });
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
