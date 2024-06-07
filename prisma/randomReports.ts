import { PrismaClient } from '@prisma/client';
import { en, Faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { randomInt } from 'crypto';

const faker = new Faker({
  locale: en
});

const prisma = new PrismaClient();

const generateFakeData = () => {
  const fakeData = [];

  for (let i = 0; i < 100; i++) {
    const fakeEntry = {
      id: i + 1,
      confirmedCase: faker.datatype.number({ min: 1, max: 1000 }),
      confirmedDeath: faker.datatype.number({ min: 0, max: 100 }),
      reportDate: faker.date.past(2), // Reports from the past 2 years
      diseaseId: randomInt(1, 3),
      hospitalId: randomInt(1, 20), // Assuming you have 20 hospitals
      createdAt: new Date()
    };
    fakeData.push(fakeEntry);
  }

  return fakeData;
};

async function main() {
  console.log('Started creating reports');
  const fakeData = generateFakeData();
  await prisma.report.createMany({
    data: fakeData
  });
  console.log('Reports created succefully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
