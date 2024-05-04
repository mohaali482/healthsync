const { en, Faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const faker = new Faker({
  locale: en
});

async function randomHospitalGenerator() {
  console.log('Started creating random hospitals');
  await prisma.hospital.createMany({
    data: Array.from({ length: 10 }).map(() => ({
      region: faker.location.city(),
      woreda: faker.location.city(),
      zone: faker.location.city(),
      name: faker.company.name(),
      city: faker.location.city()
    }))
  });
  console.log('Random hospitals created succefully');
}

randomHospitalGenerator()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
