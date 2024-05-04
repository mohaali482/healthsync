'use server';

import { deleteHospital } from '@/data/hospitals';
import { revalidatePath } from 'next/cache';

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
