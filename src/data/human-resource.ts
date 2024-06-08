import prisma from '@/lib/prisma';
import { humanResourceForm } from '@/lib/validations/human-resource';
import { z } from 'zod';

type humanResourceFormType = z.infer<typeof humanResourceForm>;

export function getAllHumanResources(hospitalId: number) {
  return prisma.humanResource.findMany({
    where: {
      hospitalId
    },
    orderBy: { id: 'asc' }
  });
}

export function getHumanResource(id: number) {
  return prisma.humanResource.findFirst({
    where: {
      id
    }
  });
}

export function createHumanResource(
  data: humanResourceFormType,
  hospitalId: number
) {
  return prisma.humanResource.create({
    data: {
      ...data,
      hospitalId
    }
  });
}

export function updateHumanResource(id: number, data: humanResourceFormType) {
  return prisma.humanResource.update({
    where: {
      id
    },
    data
  });
}

export function deleteHumanResource(id: number) {
  return prisma.humanResource.delete({
    where: {
      id
    }
  });
}
