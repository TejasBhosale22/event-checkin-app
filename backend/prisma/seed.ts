import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' }
    ],
    skipDuplicates: true,
  });

  await prisma.event.createMany({
    data: [
      {
        name: 'College Fest',
        location: 'Auditorium',
        startTime: new Date().toISOString(),
      },
      {
        name: 'Tech Meetup',
        location: 'Hall 3',
        startTime: new Date(Date.now() + 86400000).toISOString(),
      }
    ],
    skipDuplicates: true,
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
