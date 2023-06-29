// src/Products/Products.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';

@Controller('Products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductEntity })
  async create(@Body() createProductDto: CreateProductDto) {
    return new ProductEntity(
      await this.productsService.create(createProductDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  async findAll() {
    const products = await this.productsService.findAll();
    return products.map((Product) => new ProductEntity(Product));
  }

  @Get('by_car/:car')
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  async findByCar(@Param('car') car: string) {
    const products = await this.productsService.findByCar(car);
    return products.map((product) => new ProductEntity(product));
  }

  @Get('by_category/:category')
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  async findByCategory(@Param('category') category: string) {
    const products = await this.productsService.findByCategory(category);
    return products.map((product) => new ProductEntity(product));
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new ProductEntity(await this.productsService.findOne(id));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ProductEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return new ProductEntity(
      await this.productsService.update(id, updateProductDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: ProductEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new ProductEntity(await this.productsService.remove(id));
  }
}
