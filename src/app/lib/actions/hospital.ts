'use server';

import bcrypt from 'bcrypt';
import {
  createAdminForHospital,
  createHospital,
  deleteHospital,
  deleteHospitalAdmin,
  hospitalEdit,
  updateHospitalAdminUser
} from '@/data/hospitals';
import { getUserByEmail, getUserByUsername } from '@/data/user';
import {
  hospitalAdminEditSchema,
  hospitalAdminSchema,
  hospitalEditSchema,
  hospitalSchema
} from '@/lib/validations/hospital';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
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

    data.password = await bcrypt.hash(
      data.password,
      parseInt(process.env.HASH_ROUNDS!)
    );

    await createHospital(data);
    revalidatePath('/dashboard/hospitals');
  } catch (e) {
    console.log('Error happened while creating a hospital', '\n [error]: ', e);
    return 'Something went wrong, please try again later or contact support if this occurs again.';
  }
}

type hospitalAdmin = z.infer<typeof hospitalAdminSchema>;
export async function createHospitalAdminAction(
  hospitalId: number,
  data: hospitalAdmin
) {
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

    data.password = await bcrypt.hash(
      data.password,
      parseInt(process.env.HASH_ROUNDS)
    );
    await createAdminForHospital(hospitalId, data);
    revalidatePath(`/dashboard/hospitals/${hospitalId}`);
    revalidatePath('/dashboard/hospitals');
  } catch (e) {
    console.log('Error happened while creating a hospital', '\n [error]: ', e);
    return 'Something went wrong, please try again later or contact support if this occurs again.';
  }
}

type hospitalEditData = z.infer<typeof hospitalEditSchema>;
export async function editHospitalAction(
  hospitalId: number,
  data: hospitalEditData
) {
  try {
    await hospitalEdit(hospitalId, data);
    revalidatePath(`/dashboard/hospitals/${hospitalId}`);
  } catch (e) {
    console.log('Error happened while editing a hospital', '\n [error]: ', e);
    return 'Something went wrong, please try again later or contact support if this occurs again.';
  }

  redirect('/dashboard/hospitals');
}

export async function deleteHospitalAdminAction(
  hospitalId: number,
  userId: string
) {
  try {
    await deleteHospitalAdmin(userId);
    revalidatePath(`/dashboard/hospitals/${hospitalId}`);
  } catch (e) {
    console.log('Error happened while deleting a hospital', '\n [error]: ', e);
    return 'Something went wrong, please try again later or contact support if this occurs again.';
  }
}

type updateUserData = z.infer<typeof hospitalAdminEditSchema>;
export async function updateHospitalAdminAction(
  hospitalId: number,
  userId: string,
  data: updateUserData
) {
  try {
    let user = await getUserByUsername(data.username);
    if (user && user.id !== userId) {
      return {
        key: 'username',
        message: 'User with this username already exists'
      };
    }
    user = await getUserByEmail(data.email);
    if (user && user.id !== userId) {
      return {
        key: 'email',
        message: 'User with this email already exists'
      };
    }
    await updateHospitalAdminUser(userId, data);
    revalidatePath(`/dashboard/hospitals/${hospitalId}`);
  } catch (e) {
    console.log('Error happened while deleting a hospital', '\n [error]: ', e);
    return 'Something went wrong, please try again later or contact support if this occurs again.';
  }
}
