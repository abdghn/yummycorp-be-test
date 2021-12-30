import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({cmd :'createOrder' })
  create(@Payload() createOrderDto: CreateOrderDto) {
    const order = new Order()
    order.user = createOrderDto.userId
    order.products = [createOrderDto.productId]

    return this.orderService.create(order);
  }

  @MessagePattern({cmd : 'findAllOrder'})
  findAll() {
    return this.orderService.findAll();
  }

  @MessagePattern('findOneOrder')
  findOne(@Payload() id: number) {
    return this.orderService.findOne(id);
  }

  @MessagePattern('updateOrder')
  update(@Payload() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(updateOrderDto.id, updateOrderDto);
  }

  @MessagePattern('removeOrder')
  remove(@Payload() id: number) {
    return this.orderService.remove(id);
  }
}
