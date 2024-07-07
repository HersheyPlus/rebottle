import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const bottleTypes = [
    { name: 'Plastic', points: 5 },
    { name: 'Glass', points: 10 },
    { name: 'Aluminum', points: 15 },
    { name: 'Milk', points: 8 },
  ];

  for (const bottleType of bottleTypes) {
    await prisma.bottleType.upsert({
      where: { name: bottleType.name },
      update: {},
      create: bottleType,
    });
  }

  console.log('Seed data inserted successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });