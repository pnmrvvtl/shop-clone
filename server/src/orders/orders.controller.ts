import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  createOrder(@Body() data: CreateOrderDto) {
    return this.orderService.createOrder(data);
  }

  @Delete(':orderId')
  deleteOrder(@Param('orderId') orderId: number) {
    return this.orderService.deleteOrder(orderId);
  }

  @Post(':orderId/products/:productId')
  addProductToOrder(
    @Param('orderId') orderId: number,
    @Param('productId') productId: number,
  ) {
    return this.orderService.addProductToOrder(orderId, productId);
  }

  @Delete(':orderId/products/:productId')
  removeProductFromOrder(
    @Param('orderId') orderId: number,
    @Param('productId') productId: number,
  ) {
    return this.orderService.removeProductFromOrder(orderId, productId);
  }
}
