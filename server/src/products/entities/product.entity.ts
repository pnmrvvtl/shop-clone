import { Product } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProductEntity implements Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ required: false, nullable: true })
  description: string;

  @ApiProperty()
  car: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  constructor(data: Partial<ProductEntity>) {
    Object.assign(this, data);
  }
}
