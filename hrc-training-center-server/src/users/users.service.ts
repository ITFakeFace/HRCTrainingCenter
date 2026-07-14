import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { HashUtil } from '@/common/utils/hash.util';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await HashUtil.hashPassword(createUserDto.password); // Replace this with actual hashing logic
    const data = await this.prisma.client.user.create({
      data: {
        pID: createUserDto.pID,
        fullname: createUserDto.fullname,
        email: createUserDto.email,
        phone: createUserDto.phone,
        password: hashedPassword,
        avatar: createUserDto.avatar,
        gender: createUserDto.gender,
        dob: createUserDto.dob,
      },
    });
    const { password, ...userWithoutPassword } = data;
    return userWithoutPassword;
  }

  async findAll() {
    const data = await this.prisma.client.user.findMany();
    const responseDate = data.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    return responseDate;
  }

  async findOne(id: string) {
    const user = await this.prisma.client.user.findUnique({
      where: { id },
    });
    if (!user) {
      return null;
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log('Updating user with ID:', id);
    console.log('updateUserDto:', updateUserDto); // Log the received DTO for debugging
    let model = { ...updateUserDto };

    if (updateUserDto.password) {
      model.password = await HashUtil.hashPassword(updateUserDto.password);
    } else {
      delete model.password; // Remove password field if not provided
    }

    const data = await this.prisma.client.user.update({
      where: { id: id },
      data: model,
    });
    const { password, ...userWithoutPassword } = data;
    return userWithoutPassword;
  }

  async remove(id: string) {
    return await this.prisma.client.user.delete({
      where: { id },
    });
  }
}
