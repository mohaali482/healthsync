import prisma from '@/lib/prisma';

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id
    }
  });
}

export async function getUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: {
      username
    }
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email
    }
  });
}

export async function changeUserPassword(id: string, password: string) {
  return prisma.user.update({
    where: {
      id
    },
    data: {
      password
    }
  });
}
