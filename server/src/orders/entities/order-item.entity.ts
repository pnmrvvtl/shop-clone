import { OrderItem } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { UserEntity } from '../../users/entities/user.entity';

export class OrderItemEntity implements OrderItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  order_id: number;

  @ApiProperty()
  product_id: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  order: OrderEntity;

  @ApiProperty()
  product: ProductEntity;

  constructor({ order, product, ...data }: Partial<OrderItemEntity>) {
    Object.assign(this, data);

    if (order && product) {
      this.order = new OrderEntity(order);
      this.product = new ProductEntity(product);
    }
  }
}
