import prisma from '@/lib/prisma';
import {
  hospitalAdminSchema,
  hospitalSchema
} from '@/lib/validations/hospital';
import { z } from 'zod';

export async function getAllHospitals() {
  return await prisma.hospital.findMany();
}

export async function deleteHospital(id: number) {
  return await prisma.hospital.delete({
    where: {
      id
    }
  });
}

type CreateHospital = z.infer<typeof hospitalSchema>;
export async function createHospital(data: CreateHospital) {
  return await prisma.hospital.create({
    data: {
      name: data.name,
      city: data.city,
      region: data.region,
      woreda: data.woreda,
      zone: data.zone,
      admins: {
        create: {
          first_name: data.first_name,
          last_name: data.last_name,
          username: data.username,
          email: data.email,
          password: data.password,
          role: 'HOSPITAL_ADMIN'
        }
      }
    }
  });
}

export async function getHospitalById(id: number) {
  try {
    return await prisma.hospital.findUnique({
      where: {
        id
      },
      include: {
        admins: true,
        medicalEquipmentStore: {
          include: {
            medicalEquipment: true
          }
        },
        assets: true
      }
    });
  } catch (e) {
    console.log(e);
    return null;
  }
}

type hospitalAdmin = z.infer<typeof hospitalAdminSchema>;

export async function createAdminForHospital(
  hospitalId: number,
  admin: hospitalAdmin
) {
  return await prisma.hospital.update({
    where: {
      id: hospitalId
    },
    data: {
      admins: {
        create: {
          first_name: admin.first_name,
          last_name: admin.last_name,
          username: admin.username,
          email: admin.email,
          password: admin.password,
          role: 'HOSPITAL_ADMIN'
        }
      }
    }
  });
}
