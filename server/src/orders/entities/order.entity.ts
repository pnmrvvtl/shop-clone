import { Order } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class OrderEntity implements Order {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
