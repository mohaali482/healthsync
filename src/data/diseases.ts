import prisma from '@/lib/prisma';
import { diseaseForm } from '@/lib/validations/diseases';
import { z } from 'zod';

type diseaseFormType = z.infer<typeof diseaseForm>;

export function getAllDiseases() {
  return prisma.disease.findMany({
    orderBy: { id: 'asc' }
  });
}

export function createDisease(data: diseaseFormType) {
  return prisma.disease.create({
    data
  });
}

export function updateDisease(id: number, data: diseaseFormType) {
  return prisma.disease.update({
    where: {
      id
    },
    data
  });
}

export function deleteDisease(id: number) {
  return prisma.disease.delete({
    where: {
      id
    }
  });
}
