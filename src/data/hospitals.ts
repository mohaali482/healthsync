import prisma from '@/lib/prisma';

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
