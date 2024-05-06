import prisma from '@/lib/prisma';
import {
  hospitalAdminEditSchema,
  hospitalAdminSchema,
  hospitalEditSchema,
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

type hospitalEditData = z.infer<typeof hospitalEditSchema>;

export async function hospitalEdit(hospitalId: number, data: hospitalEditData) {
  return await prisma.hospital.update({
    where: {
      id: hospitalId
    },
    data: {
      name: data.name,
      city: data.city,
      region: data.region,
      woreda: data.woreda,
      zone: data.zone
    }
  });
}

export async function deleteHospitalAdmin(userId: string) {
  return await prisma.user.delete({
    where: {
      id: userId
    }
  });
}

type updateUserData = z.infer<typeof hospitalAdminEditSchema>;
export async function updateHospitalAdminUser(
  id: string,
  data: updateUserData
) {
  return await prisma.user.update({
    where: {
      id
    },
    data: {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      username: data.username
    }
  });
}
