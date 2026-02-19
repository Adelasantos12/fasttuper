import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ROLES = [
  'ADMIN',
  'CHEF',
  'NUTRITIONIST',
  'DRIVER',
  'VENDOR',
  'CUSTOMER',
];

async function main() {
  console.log('Seeding roles...');

  for (const roleName of ROLES) {
    const role = await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
    console.log(`Role created/verified: ${role.name}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
