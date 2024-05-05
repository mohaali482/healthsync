import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Started creating superuser');
  await prisma.user.create({
    data: {
      first_name: process.env.SUPER_USER_FIRST_NAME!,
      last_name: process.env.SUPER_USER_LAST_NAME!,
      username: process.env.SUPER_USER_USERNAME!,
      email: process.env.SUPER_USER_EMAIL!,
      password: await bcrypt.hash(
        process.env.SUPER_USER_PASSWORD!,
        parseInt(process.env.HASH_ROUNDS!)
      ),
      role: 'SUPER_USER'
    }
  });
  console.log('Superuser created succefully');
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
