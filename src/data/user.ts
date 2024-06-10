import prisma from '@/lib/prisma';
import { dataEncoderAddSchema, userAddSchema, userEditSchema } from '@/lib/validations/auth';
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

const Role: {
  USER: 'USER';
  HOSPITAL_ADMIN: 'HOSPITAL_ADMIN';
  DATA_ENCODER: 'DATA_ENCODER';
  SUPER_USER: 'SUPER_USER';
} = {
  USER: 'USER',
  HOSPITAL_ADMIN: 'HOSPITAL_ADMIN',
  DATA_ENCODER: 'DATA_ENCODER',
  SUPER_USER: 'SUPER_USER'
};
type Role = (typeof Role)[keyof typeof Role];

export async function getUserByRoleAndHospital(role: Role, hospitalId: number) {
  return prisma.user.findMany({
    where: {
      role,
      hospitalId
    }
  })
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

type editDataEncoderData = z.infer<typeof dataEncoderEditSchema>;
export async function editDataEncoder(id: string, data: editDataEncoderData) {
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

type addDataEncoderData = Omit<z.infer<typeof dataEncoderAddSchema>, 'confirm_password'>;

export async function addDataEncoder(data: addDataEncoderData) {
  return prisma.user.create({
    data,
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
