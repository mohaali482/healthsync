import prisma from '@/lib/prisma';
import { assetForm } from '@/lib/validations/assets';
import { z } from 'zod';

type assetFormType = z.infer<typeof assetForm>;

export function getAllResources(hospitalId: number) {
  return prisma.asset.findMany({
    where: {
      hospitalId
    },
    orderBy: { id: 'asc' }
  });
}

export function getResource(id: number) {
  return prisma.asset.findFirst({
    where: {
      id
    }
  });
}

export function createResource(data: assetFormType, hospitalId: number) {
  return prisma.asset.create({
    data: {
      ...data,
      hospitalId
    }
  });
}

export function updateResource(id: number, data: assetFormType) {
  return prisma.asset.update({
    where: {
      id
    },
    data
  });
}

export function deleteResource(id: number) {
  return prisma.asset.delete({
    where: {
      id
    }
  });
}
