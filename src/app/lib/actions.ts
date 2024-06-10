'use server';

import { getUserByUsername } from '@/data/user';
import { signIn, signOut } from '@/lib/auth';
import { userAuthSchema } from '@/lib/validations/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import bcrypt from 'bcrypt';

type FormData = z.infer<typeof userAuthSchema>;

export async function authenticate(formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    const user = await getUserByUsername(formData.username);

    if (user && !user.isActive) {
      const passwordsMatch = await bcrypt.compare(
        formData.password,
        user.password
      );
      if (passwordsMatch) {
        return 'Your account is deactivated, contact your admin';
      }
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Unknown error.';
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: '/login', redirect: true });
}
