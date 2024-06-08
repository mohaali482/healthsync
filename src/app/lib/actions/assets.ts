'use server';

import {
  createResource,
  deleteResource,
  getResource,
  updateResource
} from '@/data/assets';
import { auth } from '@/lib/auth';
import { assetForm } from '@/lib/validations/assets';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { logout } from '../actions';

type assetFormType = z.infer<typeof assetForm>;

export async function createResourceAction(data: assetFormType) {
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

    await createResource(data, user.user.hospitalId);
    revalidatePath('/dashboard/resources');
  } catch (e) {
    console.log('Error happened while trying to add a resource\n[error]', e);
    return 'Something went wrong';
  }
}

export async function updateResourceAction(id: number, data: assetFormType) {
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

    const resource = await getResource(id);
    if (!resource || user.user.hospitalId !== resource.hospitalId) {
      return 'Resource not found.';
    }

    await updateResource(id, data);
    revalidatePath('/dashboard/resource');
  } catch (e) {
    console.log('Error happened while trying to update resource\n[error]', e);
    return 'Something went wrong';
  }
}

export async function deleteResourceAction(id: number) {
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

    const resource = await getResource(id);
    if (!resource || user.user.hospitalId !== resource.hospitalId) {
      return 'Resource not found.';
    }

    await deleteResource(id);
    revalidatePath('/dashboard/resource');
  } catch (e) {
    console.log('Error happened while trying to delete resource\n[error]', e);
    return 'Something went wrong';
  }
}
