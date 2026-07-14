import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.client.permission.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.client.permission.findUnique({ where: { id } });
  }

  async create(createPermissionDto: CreatePermissionDto) {
    return await this.prisma.client.permission.create({
      data: createPermissionDto,
    });
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return await this.prisma.client.permission.update({
      where: { id },
      data: updatePermissionDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.client.permission.delete({
      where: { id },
    });
  }
}
