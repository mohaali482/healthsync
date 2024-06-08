'use server';

import {
  createResource,
  deleteResource,
  getResource,
  updateResource,
  updateResourceStatus
} from '@/data/assets';
import { auth } from '@/lib/auth';
import { assetAddForm, assetForm } from '@/lib/validations/assets';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { logout } from '../actions';

type assetAddFormType = z.infer<typeof assetAddForm>;

type assetFormType = z.infer<typeof assetForm>;

const ALLOWED_ROLES = ['HOSPITAL_ADMIN', 'DATA_ENCODER'];

export async function createResourceAction(data: assetAddFormType) {
  try {
    const user = await auth();
    if (
      !user ||
      !ALLOWED_ROLES.includes(user.user.role) ||
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
      !ALLOWED_ROLES.includes(user.user.role) ||
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
    revalidatePath('/dashboard/resources');
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
      !ALLOWED_ROLES.includes(user.user.role) ||
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
    revalidatePath('/dashboard/resources');
  } catch (e) {
    console.log('Error happened while trying to delete resource\n[error]', e);
    return 'Something went wrong';
  }
}

export async function updateResourceStatusAction(
  id: number,
  isActive: boolean
) {
  try {
    await updateResourceStatus(id, isActive);
    revalidatePath('/dashboard/resources');
  } catch (e) {
    console.log(
      'Error happened while trying to change status of resource\n[error]',
      e
    );
    return 'Something went wrong';
  }
}
