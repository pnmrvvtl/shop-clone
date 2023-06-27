import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CartEntity } from './entities/cart.entity';
import { CartItemEntity } from './entities/cart-item.entity';
@Controller('orders')
@ApiTags('orders')
export class CartsController {
  constructor(private readonly cartService: CartsService) {}

  @Post()
  @ApiCreatedResponse({ type: CartEntity })
  async createOrder(@Body() data: CreateCartDto) {
    return new CartEntity(await this.cartService.createCart(data));
  }

  @Delete(':id')
  @ApiOkResponse({ type: CartEntity })
  async deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return new CartEntity(await this.cartService.deleteCart(id));
  }

  @Get(':id')
  @ApiOkResponse({ type: CartEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new CartEntity(await this.cartService.findOne(id));
  }

  @Post(':cartId/products/:productId')
  @ApiOkResponse({ type: CartItemEntity })
  async addProductToOrder(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
  ) {
    return new CartItemEntity(
      await this.cartService.addProductToCart(cartId, productId),
    );
  }

  @Delete(':cartId/products/dec/:productId')
  @ApiOkResponse({ type: CartItemEntity })
  async decrementProductInOrder(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
  ) {
    return new CartItemEntity(
      await this.cartService.decrementProductInCart(cartId, productId),
    );
  }

  @Delete(':cartId/products/:productId')
  @ApiOkResponse({ type: CartItemEntity })
  async removeProductFromOrder(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
  ) {
    return new CartItemEntity(
      await this.cartService.removeProductFromCart(cartId, productId),
    );
  }
}
