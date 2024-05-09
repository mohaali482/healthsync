import prisma from '@/lib/prisma';
import { userAddSchema, userEditSchema } from '@/lib/validations/auth';
import { z } from 'zod';

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

type editUserData = z.infer<typeof userEditSchema>;
export async function editUser(id: string, data: editUserData) {
  return prisma.user.update({
    where: { id },
    data
  });
}

export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: {
      id
    }
  });
}

export async function getAllUsers() {
  return prisma.user.findMany({ orderBy: { id: 'asc' } });
}

type addUserData = Omit<z.infer<typeof userAddSchema>, 'confirm_password'>;

export async function addUser(data: addUserData) {
  return prisma.user.create({
    data
  });
}

export async function getSuperAndGovernmentUsers() {
  return prisma.user.findMany({
    where: {
      OR: [{ role: 'GOVERNMENT' }, { role: 'SUPER_USER' }]
    },
    orderBy: {
      id: 'asc'
    }
  });
}
