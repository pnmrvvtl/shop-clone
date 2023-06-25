import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  create(createArticleDto: CreateProductDto) {
    return this.prisma.product.create({ data: createArticleDto });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  update(id: number, updateArticleDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }

  findByCar(car: string) {
    return this.prisma.product.findMany({ where: { car: car } });
  }

  findByCategory(category: string) {
    return this.prisma.product.findMany({ where: { category: category } });
  }
}
