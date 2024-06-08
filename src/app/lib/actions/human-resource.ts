'use server';

import {
  createHumanResource,
  deleteHumanResource,
  getHumanResource,
  updateHumanResource
} from '@/data/human-resource';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { logout } from '../actions';
import { humanResourceForm } from '@/lib/validations/human-resource';

type humanResourceFormType = z.infer<typeof humanResourceForm>;

export async function createHumanResourceAction(data: humanResourceFormType) {
  try {
    const user = await auth();
    if (
      !user ||
      user.user.role !== 'HOSPITAL_ADMIN' ||
      user.user.hospitalId === null
    ) {
      await logout();
      return 'Something went wrong';
    }

    await createHumanResource(data, user.user.hospitalId);
    revalidatePath('/dashboard/human-resources');
  } catch (e) {
    console.log(
      'Error happened while trying to add a human resource\n[error]',
      e
    );
    return 'Something went wrong';
  }
}

export async function updateHumanResourceAction(
  id: number,
  data: humanResourceFormType
) {
  try {
    const user = await auth();
    if (
      !user ||
      user.user.role !== 'HOSPITAL_ADMIN' ||
      user.user.hospitalId === null
    ) {
      await logout();
      return 'Something went wrong';
    }

    const resource = await getHumanResource(id);
    if (!resource || user.user.hospitalId !== resource.hospitalId) {
      return 'Resource not found.';
    }

    await updateHumanResource(id, data);
    revalidatePath('/dashboard/human-resources');
  } catch (e) {
    console.log(
      'Error happened while trying to update human resource\n[error]',
      e
    );
    return 'Something went wrong';
  }
}

export async function deleteHumanResourceAction(id: number) {
  try {
    const user = await auth();
    if (
      !user ||
      user.user.role !== 'HOSPITAL_ADMIN' ||
      user.user.hospitalId === null
    ) {
      await logout();
      return 'Something went wrong';
    }

    const resource = await getHumanResource(id);
    if (!resource || user.user.hospitalId !== resource.hospitalId) {
      return 'Resource not found.';
    }

    await deleteHumanResource(id);
    revalidatePath('/dashboard/human-resources');
  } catch (e) {
    console.log(
      'Error happened while trying to delete human resource\n[error]',
      e
    );
    return 'Something went wrong';
  }
}
