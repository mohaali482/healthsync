import sendEmail from '@/app/lib/actions/sendEmail';
import prisma from '@/lib/prisma';
import {
  medicalEquipmentStoreEditForm,
  medicalEquipmentStoreForm
} from '@/lib/validations/medicalEquipmentStore';
import { z } from 'zod';
import { getHospitalAdminByHospitalId } from './user';

type medicalEquipmentStoreFormType = z.infer<typeof medicalEquipmentStoreForm>;

export function getAllMedicalEquipmentStoreAggregate(region: string) {
  return prisma.medicalEquipmentStore.groupBy({
    by: ['medicalEquipmentId'],
    where: {
      hospital: {
        region: region
      }
    },
    _sum: {
      quantity: true
    }
  });
}

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

export function getAllMedicalEquipmentStoreWithLowQuantityThanThreshold(
  hospitalId: number
) {
  return prisma.medicalEquipmentStore.findMany({
    where: {
      hospitalId: hospitalId,
      quantity: {
        lte: prisma.medicalEquipmentStore.fields.thresholdLevel
      }
    },
    orderBy: { id: 'asc' },
    include: {
      medicalEquipment: true
    }
  });
}

export async function getAllMedicalEquipmentStoreWithLowQuantityThanThresholdCount(
  hospitalId: number
) {
  return await prisma.medicalEquipmentStore.count({
    where: {
      hospitalId: hospitalId,
      quantity: {
        lte: prisma.medicalEquipmentStore.fields.thresholdLevel
      }
    }
  });
}

export function getAllMedicalEquipmentStoreCount(hospitalId: number) {
  return prisma.medicalEquipmentStore.count({
    where: {
      hospitalId
    }
  });
}

export function getMedicalEquipmentStore(id: number) {
  return prisma.medicalEquipmentStore.findFirst({
    where: {
      id
    },
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

export async function updateMedicalEquipmentStore(
  id: number,
  data: medicalEquipmentStoreEditFormType
) {
  await prisma.medicalEquipmentStore.update({
    where: {
      id
    },
    data
  });

  const item = await getMedicalEquipmentStore(id);
  if (item === null) {
    return;
  }

  const hospitalAdmin = await getHospitalAdminByHospitalId(item?.hospitalId);
  if (hospitalAdmin === null) {
    return;
  }

  if (item.quantity < item.thresholdLevel) {
    console.log('Started sending email');
    fetch(process.env.HOME_URL + '/api/send', {
      method: 'POST',
      body: JSON.stringify({
        item: item.medicalEquipment.name,
        currentLevel: item.quantity,
        thresholdLevel: item.thresholdLevel,
        timestamp: new Date().toISOString().substring(0, 10),
        link: process.env.HOME_URL + '/dashboard/alerts',
        email: hospitalAdmin.email,
        personName: hospitalAdmin.first_name + ' ' + hospitalAdmin.last_name
      })
    })
      .then(val => {
        console.log('Finished sending email');
        console.log(val);
      })
      .catch(err => {
        console.log('[Error]:', err);
      });
  }
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

export async function updateMedicalEquipmentStoreQuantity(
  id: number,
  data: { quantity: number }
) {
  await prisma.medicalEquipmentStore.update({
    where: {
      id
    },
    data
  });

  const item = await getMedicalEquipmentStore(id);
  if (item === null) {
    return;
  }

  const hospitalAdmin = await getHospitalAdminByHospitalId(item?.hospitalId);
  if (hospitalAdmin === null) {
    return;
  }

  if (item.quantity < item.thresholdLevel) {
    console.log('Started sending email');
    fetch(process.env.HOME_URL + '/api/send', {
      method: 'POST',
      body: JSON.stringify({
        item: item.medicalEquipment.name,
        currentLevel: item.quantity,
        thresholdLevel: item.thresholdLevel,
        timestamp: new Date().toISOString().substring(0, 10),
        link: process.env.HOME_URL + '/dashboard/alerts',
        email: hospitalAdmin.email,
        personName: hospitalAdmin.first_name + ' ' + hospitalAdmin.last_name
      })
    })
      .then(val => {
        console.log('Finished sending email');
        console.log(val);
      })
      .catch(err => {
        console.log('[Error]:', err);
      });
  }
}
