import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  name: string;

  @IsPositive()
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsString()
  @ApiProperty()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  car: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  category: string;
}
