import { Gender, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedUsers(prisma: PrismaClient) {
  console.log('🔄 Đang bắt đầu seed Users...');

  const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');
  const adminPassword = await bcrypt.hash('DoThanhHung66@4', saltRounds);
  const userPassword = await bcrypt.hash('User@123', saltRounds);

  const isAdminExists = await prisma.user.findUnique({
    where: { email: 'dthung6604@gmail.com' },
  });

  // Tạo Super Admin
  if (!isAdminExists) {
    const superAdmin = await prisma.user.upsert({
      where: { email: 'dthung6604@gmail.com' },
      update: {},
      create: {
        status: 'ACTIVE',
        lockoutEnd: null,
        avatar: null,

        fullname: 'Super Admin Đỗ Thanh Hùng',
        email: 'dthung6604@gmail.com',
        phone: '0913636373',
        password: adminPassword,
        isEmailVerified: true,
        gender: Gender.MALE,
        dob: new Date('2004-06-06T00:00:00Z'),
      },
    });
    console.log('✅ Đã tạo/Kiểm tra Super Admin:', superAdmin.email);
  }

  // Tạo User thường
  const regularUser = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      fullname: 'Nguyễn Văn Học Viên',
      email: 'student@example.com',
      phone: '0900000001',
      password: userPassword,
      isEmailVerified: true,
      gender: Gender.OTHER,
      dob: new Date('2000-01-01T00:00:00Z'),
    },
  });

  console.log('✅ Đã tạo/Kiểm tra User test:', regularUser.email);
}
