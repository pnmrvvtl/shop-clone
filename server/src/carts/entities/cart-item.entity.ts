import { CartItem } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from '../../products/entities/product.entity';
import { CartEntity } from './cart.entity';

export class CartItemEntity implements CartItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  cart_id: number;

  @ApiProperty()
  product_id: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  cart: CartEntity;

  @ApiProperty()
  product: ProductEntity;

  constructor({ cart, product, ...data }: Partial<CartItemEntity>) {
    Object.assign(this, data);

    if (cart && product) {
      this.cart = new CartEntity(cart);
      this.product = new ProductEntity(product);
    }
  }
}
