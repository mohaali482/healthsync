import prisma from '@/lib/prisma';
import { equipmentForm } from '@/lib/validations/medicalEquipments';
import { z } from 'zod';

type equipmentFormType = z.infer<typeof equipmentForm>;

export function getAllMedicalEquipments() {
  return prisma.medicalEquipment.findMany({
    orderBy: { id: 'asc' }
  });
}

export function getAllMedicalEquipmentsCount() {
  return prisma.medicalEquipment.count();
}

export function getMedicalEquipment(id: number) {
  return prisma.medicalEquipment.findUnique({
    where: {
      id
    }
  });
}

export function createMedicalEquipment(data: equipmentFormType) {
  return prisma.medicalEquipment.create({
    data
  });
}

export function updateMedicalEquipment(id: number, data: equipmentFormType) {
  return prisma.medicalEquipment.update({
    where: {
      id
    },
    data
  });
}

export function deleteMedicalEquipment(id: number) {
  return prisma.medicalEquipment.delete({
    where: {
      id
    }
  });
}
