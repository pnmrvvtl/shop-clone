import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/order-item.entity';
@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  @ApiCreatedResponse({ type: OrderEntity })
  async createOrder(@Body() data: CreateOrderDto) {
    return new OrderEntity(await this.orderService.createOrder(data));
  }

  @Delete(':id')
  @ApiOkResponse({ type: OrderEntity })
  async deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return new OrderEntity(await this.orderService.deleteOrder(id));
  }

  @Get(':id')
  @ApiOkResponse({ type: OrderEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new OrderEntity(await this.orderService.findOne(id));
  }

  @Post(':orderId/products/:productId')
  @ApiOkResponse({ type: OrderItemEntity })
  async addProductToOrder(
    @Param('orderId') orderId: number,
    @Param('productId') productId: number,
  ) {
    return new OrderItemEntity(
      await this.orderService.addProductToOrder(orderId, productId),
    );
  }

  @Delete(':orderId/products/dec/:productId')
  @ApiOkResponse({ type: OrderItemEntity })
  async decrementProductInOrder(
    @Param('orderId') orderId: number,
    @Param('productId') productId: number,
  ) {
    return new OrderItemEntity(
      await this.orderService.decrementProductInOrder(orderId, productId),
    );
  }

  @Delete(':orderId/products/:productId')
  @ApiOkResponse({ type: OrderItemEntity })
  async removeProductFromOrder(
    @Param('orderId') orderId: number,
    @Param('productId') productId: number,
  ) {
    return new OrderItemEntity(
      await this.orderService.removeProductFromOrder(orderId, productId),
    );
  }
}
