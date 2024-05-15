import prisma from '@/lib/prisma';
import {
  medicalEquipmentStoreEditForm,
  medicalEquipmentStoreForm
} from '@/lib/validations/medicalEquipmentStore';
import { z } from 'zod';

type medicalEquipmentStoreFormType = z.infer<typeof medicalEquipmentStoreForm>;

export function getAllMedicalEquipmentStore(hospitalId: number) {
  return prisma.medicalEquipmentStore.findMany({
    where: {
      hospitalId
    },
    orderBy: { id: 'asc' },
    include: {
      medicalEquipment: true
    }
  });
}

export function createMedicalEquipmentStore(
  data: medicalEquipmentStoreFormType,
  hospitalId: number
) {
  return prisma.medicalEquipmentStore.create({
    data: {
      ...data,
      hospitalId
    }
  });
}

type medicalEquipmentStoreEditFormType = z.infer<
  typeof medicalEquipmentStoreEditForm
>;

export function updateMedicalEquipmentStore(
  id: number,
  data: medicalEquipmentStoreEditFormType
) {
  return prisma.medicalEquipmentStore.update({
    where: {
      id
    },
    data
  });
}

export function deleteMedicalEquipmentStore(id: number) {
  return prisma.medicalEquipmentStore.delete({
    where: {
      id
    }
  });
}

export function getMedicalEquipmentStoreByHospitalIdAndMedicalEquipmentId(
  hospitalId: number,
  medicalEquipmentId: number
) {
  return prisma.medicalEquipmentStore.findFirst({
    where: {
      hospitalId,
      medicalEquipmentId
    }
  });
}
