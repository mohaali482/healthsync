'use server';
import bcrypt from 'bcrypt';

import {
  addDataEncoder,
  addUser,
  changeUserPassword,
  deleteUser,
  editDataEncoder,
  editUser,
  getUserByEmail,
  getUserByUsername
} from '@/data/user';
import { z } from 'zod';
import {
  dataEncoderAddSchema,
  dataEncoderEditSchema,
  userAddSchema,
  userEditSchema
} from '@/lib/validations/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

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

type editUserData = z.infer<typeof userEditSchema>;
export async function editUserAction(id: string, data: editUserData) {
  try {
    let user = await getUserByEmail(data.email);
    if (user && user.id != id) {
      return {
        key: 'email',
        message: 'User with this email already exists'
      };
    }
    user = await getUserByUsername(data.username);
    if (user && user.id != id) {
      return {
        key: 'username',
        message: 'User with this username already exists'
      };
    }

    await editUser(id, data);
    revalidatePath(`/dashboard/users/`);
  } catch (e) {
    console.log(
      'Error happened while trying to update user with id: ',
      id,
      '\n[error]:',
      e
    );
    return 'Something went wrong.';
  }
}

type editDataEncoderData = z.infer<typeof dataEncoderEditSchema>;
export async function editDataEncoderAction(
  id: string,
  data: editDataEncoderData
) {
  try {
    let user = await getUserByEmail(data.email);
    if (user && user.id != id) {
      return {
        key: 'email',
        message: 'User with this email already exists'
      };
    }
    user = await getUserByUsername(data.username);
    if (user && user.id != id) {
      return {
        key: 'username',
        message: 'User with this username already exists'
      };
    }

    await editDataEncoder(id, data);
    revalidatePath(`/dashboard/data-encoders/`);
  } catch (e) {
    console.log(
      'Error happened while trying to update user with id: ',
      id,
      '\n[error]:',
      e
    );
    return 'Something went wrong.';
  }
}

export async function deleteUserAction(id: string) {
  try {
    await deleteUser(id);
    revalidatePath('/dashboard/users/');
  } catch (e) {
    console.log(
      'Error happened while trying to delete user with id: ',
      id,
      '\n[error]:',
      e
    );
    return 'Something went wrong.';
  }
}

type addUserData = z.infer<typeof userAddSchema>;
export async function addUserAction(data: addUserData) {
  try {
    let user = await getUserByEmail(data.email);
    if (user) {
      return {
        key: 'email',
        message: 'User with this email already exists'
      };
    }
    user = await getUserByUsername(data.username);
    if (user) {
      return {
        key: 'username',
        message: 'User with this username already exists'
      };
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      parseInt(process.env.HASH_ROUNDS!)
    );

    data.password = hashedPassword;
    const validatedData = {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role
    };

    await addUser(validatedData);
  } catch (e) {
    console.log('Error happened while trying to create user', '\n[error]:', e);
    return 'Something went wrong.';
  }

  revalidatePath('/dashboards/users');
  redirect('/dashboard/users');
}

export async function changeSelfUserPasswordAction(
  password: string,
  newPassword: string
) {
  try {
    const session = await auth();
    if (!session) {
      return redirect('/login');
    }

    const user = await getUserByUsername(session.user.username);
    if (!user) {
      return redirect('/login');
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return 'Wrong password.';
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      parseInt(process.env.HASH_ROUNDS!)
    );
    await changeUserPassword(user.id, hashedPassword);
  } catch (e) {
    console.log(
      `Error happened while changing user's password.`,
      '\n [error]: ',
      e
    );
    return 'Something went wrong, please try again later or contact support if this occurs again.';
  }
}

type addDataEncoderData = z.infer<typeof dataEncoderAddSchema>;
export async function addDataEncoderAction(
  hospitalId: number,
  data: addDataEncoderData
) {
  try {
    let user = await getUserByEmail(data.email);
    if (user) {
      return {
        key: 'email',
        message: 'User with this email already exists'
      };
    }
    user = await getUserByUsername(data.username);
    if (user) {
      return {
        key: 'username',
        message: 'User with this username already exists'
      };
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      parseInt(process.env.HASH_ROUNDS!)
    );

    data.password = hashedPassword;
    const validatedData = {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      email: data.email,
      password: data.password,
      role: 'DATA_ENCODER',
      hospitalId: hospitalId
    };

    await addDataEncoder(validatedData);
  } catch (e) {
    console.log(
      'Error happened while trying to create data encoder',
      '\n[error]:',
      e
    );
    return 'Something went wrong.';
  }
}
