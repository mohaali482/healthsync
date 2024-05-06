'use server';
import bcrypt from 'bcrypt';

import { changeUserPassword } from '@/data/user';

export async function changeUserPasswordAction(
  userId: string,
  password: string
) {
  try {
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.HASH_ROUNDS!)
    );
    await changeUserPassword(userId, hashedPassword);
  } catch (e) {
    console.log(
      `Error happened while changing user's password with id: ${userId}.`,
      '\n [error]: ',
      e
    );
    return 'Something went wrong, please try again later or contact support if this occurs again.';
  }
}
