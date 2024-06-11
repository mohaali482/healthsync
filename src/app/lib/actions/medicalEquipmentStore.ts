'use server';

import {
  createMedicalEquipmentStore,
  deleteMedicalEquipmentStore,
  getAllMedicalEquipmentStoreWithLowQuantityThanThresholdCount,
  getMedicalEquipmentStore,
  getMedicalEquipmentStoreByHospitalIdAndMedicalEquipmentId,
  updateMedicalEquipmentStore,
  updateMedicalEquipmentStoreQuantity
} from '@/data/medicalEquipmentStore';
import { auth } from '@/lib/auth';
import {
  medicalEquipmentStoreEditForm,
  medicalEquipmentStoreForm
} from '@/lib/validations/medicalEquipmentStore';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

type medicalEquipmentStoreFormType = z.infer<typeof medicalEquipmentStoreForm>;

export async function getAlertCount() {
  const session = await auth();
  if (!session) {
    return;
  }

  return await getAllMedicalEquipmentStoreWithLowQuantityThanThresholdCount(
    session.user.hospitalId!
  );
}

export async function createMedicalEquipmentStoreAction(
  data: medicalEquipmentStoreFormType
) {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.hospitalId === null) {
      return 'Please provide correct credentials';
    }
    const medicalEquipmentStore =
      await getMedicalEquipmentStoreByHospitalIdAndMedicalEquipmentId(
        session.user.hospitalId,
        data.medicalEquipmentId
      );
    if (medicalEquipmentStore !== null) {
      return 'Equipment already added, please check again.';
    }

    await createMedicalEquipmentStore(data, session.user.hospitalId);
    revalidatePath('/dashboard/equipment');
  } catch (e) {
    console.log('Error happened while trying to create equipment.\n[error]', e);
    return 'Something went wrong';
  }
}

type medicalEquipmentStoreFormEditType = z.infer<
  typeof medicalEquipmentStoreEditForm
>;

export async function updateMedicalEquipmentStoreAction(
  id: number,
  data: medicalEquipmentStoreFormEditType
) {
  try {
    await updateMedicalEquipmentStore(id, data);
    revalidatePath('/dashboard/equipment');
  } catch (e) {
    console.log(
      'Error happened while trying to update equipment with id: ',
      id,
      '\n[error]',
      e
    );
    return 'Something went wrong';
  }
}

export async function deleteMedicalEquipmentStoreAction(id: number) {
  try {
    await deleteMedicalEquipmentStore(id);
    revalidatePath('/dashboard/equipment');
  } catch (e) {
    console.log(
      'Error happened while trying to delete medical equipment with id: ',
      id,
      '\n[error]: ',
      e
    );
    return 'Something went wrong.';
  }
}

export async function incrementMedicalEquipmentStoreAction(
  id: number,
  quantity: number
) {
  try {
    const equipment = await getMedicalEquipmentStore(id);
    if (!equipment) {
      return 'Something went wrong';
    }

    const newQuantity = equipment.quantity + quantity;
    await updateMedicalEquipmentStoreQuantity(id, { quantity: newQuantity });
    revalidatePath('/dashboard/equipment');
  } catch (e) {
    console.log(
      'Error happened while trying to increment equipment with id: ',
      id,
      'and quantity',
      quantity,
      '\n[error]',
      e
    );
    return 'Something went wrong';
  }
}

export async function decrementMedicalEquipmentStoreAction(
  id: number,
  quantity: number
) {
  try {
    const equipment = await getMedicalEquipmentStore(id);
    if (!equipment) {
      return 'Something went wrong';
    }

    if (equipment.quantity - quantity < 0) {
      return "There isn't enough amount of this equipment in the store.";
    }

    const newQuantity = equipment.quantity - quantity;
    await updateMedicalEquipmentStoreQuantity(id, { quantity: newQuantity });
    revalidatePath('/dashboard/equipment');
  } catch (e) {
    console.log(
      'Error happened while trying to decrement equipment with id: ',
      id,
      'and quantity',
      quantity,
      '\n[error]',
      e
    );
    return 'Something went wrong';
  }
}
