import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();
const adminPassword = process.env.SEED_ADMIN_PASSWORD || '';
const userPassword = process.env.SEED_USER_PASSWORD || '';

function hashPassword(password: string) {
  return hash(password, 10);
}

async function main() {
  console.log('Seeding database...🌱');
  const adminAndre = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      username: 'admin_andre',
      email: 'andre@gmail.com',
      name: 'Andre',
      password: await hashPassword(adminPassword),
      role: 'ADMIN',
    },
  });

  const testUser = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      username: 'test_user',
      email: 'testUser@gmail.com',
      name: 'Test User',
      password: await hashPassword(userPassword),
      role: 'USER',
    },
  });

  const gameMemory = await prisma.game.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Memory Game',
      description: 'A simple memory game',
    },
  });

  console.log(`Created users: ${adminAndre.name}, ${testUser.name}`);
  console.log(`Created game: ${gameMemory.name}`);
  console.log(`Seeding completed!🌱`);
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
