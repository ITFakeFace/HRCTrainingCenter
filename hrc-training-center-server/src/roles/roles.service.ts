import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.prisma.client.role.create({
      data: {
        shortname: createRoleDto.shortname,
        fullname: createRoleDto.fullname,
        level: createRoleDto.level,
        parentRoles: {
          connect: createRoleDto.roles.map((roleId) => ({ id: roleId })),
        },
        permissions: {
          connect: createRoleDto.permissions.map((permissionId) => ({
            id: permissionId,
          })),
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.client.role.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.client.role.findUnique({ where: { id } });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return await this.prisma.client.role.update({
      where: { id },
      data: {
        shortname: updateRoleDto.shortname,
        fullname: updateRoleDto.fullname,
        level: updateRoleDto.level,
        parentRoles: {
          set: updateRoleDto.roles?.map((roleId) => ({ id: roleId })),
        },
        permissions: {
          set: updateRoleDto.permissions?.map((permissionId) => ({
            id: permissionId,
          })),
        },
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.client.role.delete({
      where: { id },
    });
  }
}
