import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.client.category.create({
      data: {
        name: createCategoryDto.name,
        description: createCategoryDto.description,
      },
    });
  }

  async findAll() {
    return await this.prisma.client.category.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.client.category.findUnique({ where: { id } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.prisma.client.category.update({
      where: { id },
      data: {
        name: updateCategoryDto.name,
        description: updateCategoryDto.description,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.client.category.delete({
      where: { id },
    });
  }
}
