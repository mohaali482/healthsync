'use server';

import { createDisease, deleteDisease, updateDisease } from '@/data/diseases';
import { diseaseForm } from '@/lib/validations/diseases';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

type diseaseFormType = z.infer<typeof diseaseForm>;

export async function createDiseaseAction(data: diseaseFormType) {
  try {
    await createDisease(data);
    revalidatePath('/dashboard/diseases');
  } catch (e) {
    console.log('Error happened while trying to add a disease\n[error]', e);
    return 'Something went wrong';
  }
}

export async function updateDiseaseAction(id: number, data: diseaseFormType) {
  try {
    await updateDisease(id, data);
    revalidatePath('/dashboard/diseases');
  } catch (e) {
    console.log('Error happened while trying to update disease\n[error]', e);
    return 'Something went wrong';
  }
}

export async function deleteDiseaseAction(id: number) {
  try {
    await deleteDisease(id);
    revalidatePath('/dashboard/diseases');
  } catch (e) {
    console.log('Error happened while trying to delete disease\n[error]', e);
    return 'Something went wrong';
  }
}
