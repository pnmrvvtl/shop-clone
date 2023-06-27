import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}

  async createCart(data: CreateCartDto) {
    const { userId, products } = data;
    const cartItems = products.map(({ productId, quantity }) => ({
      product_id: productId,
      quantity,
    }));

    return this.prisma.cart.create({
      data: {
        user: { connect: { id: userId } },
        cart_items: { create: cartItems },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.cart.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async deleteCart(cartId: number) {
    return this.prisma.cart.delete({ where: { id: cartId } });
  }

  async addProductToCart(cartId: number, productId: number) {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: { cart_id: cartId, product_id: productId },
    });

    if (!cartItem) {
      return this.prisma.cartItem.create({
        data: {
          cart_id: cartId,
          product_id: productId,
          quantity: 1,
        },
      });
    } else {
      return this.prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity - 1 },
      });
    }
  }

  async decrementProductInCart(cartId: number, productId: number) {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: { cart_id: cartId, product_id: productId },
    });

    if (!cartItem) {
      throw new NotFoundException('Product not found in the cart');
    }

    if (cartItem.quantity > 1) {
      return this.prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity - 1 },
      });
    } else {
      return this.prisma.cartItem.delete({ where: { id: cartItem.id } });
    }
  }

  async removeProductFromCart(cartId: number, productId: number) {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: { cart_id: cartId, product_id: productId },
    });

    if (!cartItem) {
      throw new NotFoundException('Product not found in the cart');
    } else {
      return this.prisma.cartItem.delete({ where: { id: cartItem.id } });
    }
  }
}
