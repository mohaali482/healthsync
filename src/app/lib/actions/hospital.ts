'use server';

import { createHospital, deleteHospital } from '@/data/hospitals';
import { getUserByEmail, getUserByUsername } from '@/data/user';
import { hospitalSchema } from '@/lib/validations/hospital';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function deleteHospitalAction({ id }: { id: number }) {
  try {
    await deleteHospital(id);
    revalidatePath('/dashboard/hospitals');
  } catch (e) {
    console.log(
      'Error happened while deleting hospital with id: ',
      id,
      '\n [error]: ',
      e
    );
    return 'Something went wrong, please try again later or contact support if this occurs again.';
  }
}

type CreateHospital = z.infer<typeof hospitalSchema>;
export async function createHospitalAction(data: CreateHospital) {
  try {
    let user = await getUserByUsername(data.username);
    if (user) {
      return {
        key: 'username',
        message: 'User with this username already exists'
      };
    }

    user = await getUserByEmail(data.email);
    if (user) {
      return { key: 'email', message: 'User with this email already exists' };
    }

    await createHospital(data);
    revalidatePath('/dashboard/hospitals');
  } catch (e) {
    console.log('Error happened while creating a hospital', '\n [error]: ', e);
    return 'Something went wrong, please try again later or contact support if this occurs again.';
  }
}
