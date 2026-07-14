import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeders/user.seeder';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
// Import thêm các file seed khác nếu có ở đây:
// import { seedInvoices } from './seeds/invoice.seed';

dotenv.config();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter: adapter });

async function main() {
  console.log('🚀 Bắt đầu quá trình seed toàn bộ Database...');
  console.log('Connection String:', process.env.DATABASE_URL!);

  // Gọi lần lượt các hàm seed và truyền biến prisma vào
  await seedUsers(prisma);

  // Bạn có thể tiếp tục thêm:
  // await seedBatches(prisma);
  // await seedInvoices(prisma);

  console.log('🎉 Quá trình seed hoàn tất!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi nghiêm trọng khi seed dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
