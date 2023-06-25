import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(data: CreateOrderDto) {
    const { userId, products } = data;
    const orderItems = products.map(({ productId, quantity }) => ({
      product_id: productId,
      quantity,
    }));

    return this.prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        order_items: { create: orderItems },
      },
    });
  }

  async deleteOrder(orderId: number) {
    return this.prisma.order.delete({ where: { id: orderId } });
  }

  async addProductToOrder(orderId: number, productId: number) {
    return this.prisma.orderItem.create({
      data: {
        order_id: orderId,
        product_id: productId,
        quantity: 1,
      },
    });
  }

  async removeProductFromOrder(orderId: number, productId: number) {
    const orderItem = await this.prisma.orderItem.findFirst({
      where: { order_id: orderId, product_id: productId },
    });

    if (!orderItem) {
      throw new NotFoundException('Product not found in the order');
    }

    if (orderItem.quantity > 1) {
      return this.prisma.orderItem.update({
        where: { id: orderItem.id },
        data: { quantity: orderItem.quantity - 1 },
      });
    } else {
      return this.prisma.orderItem.delete({ where: { id: orderItem.id } });
    }
  }
}
