import * as z from 'zod';

export const userAuthSchema = z.object({
  username: z.string().min(1, 'Username cannot be empty'),
  password: z.string().min(4, 'Password cannot be less than 4 character(s)')
});

export const changePasswordSchema = z
  .object({
    password: z.string().min(1, 'Password is required'),
    confirm_password: z.string().min(1, 'Confirm password is required')
  })
  .refine(data => data.password === data.confirm_password, {
    message: 'Passwords must match.',
    path: ['confirm_password']
  });

export const roles = ['GOVERNMENT', 'SUPER_USER'] as const;

export const userEditSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email(),
  isActive: z.boolean(),
  role: z.enum(roles, {
    required_error: 'Select a role from the roles listed'
  })
});

export const dataEncoderEditSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email(),
  isActive: z.boolean(),
});

export const userAddSchema = z
  .object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
    confirm_password: z.string().min(1, 'Confirm password'),
    email: z.string().email(),
    role: z.enum(roles, {
      required_error: 'Select a role from the roles listed'
    })
  })
  .refine(data => data.password === data.confirm_password, {
    message: 'Passwords must match.',
    path: ['confirm_password']
  });

  export const userDataEncoderSchema = z.object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    username: z.string().min(1, 'Username is required'),
    email: z.string().email(),
    isActive: z.boolean()
  });

  export const dataEncoderAddSchema = z
  .object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
    confirm_password: z.string().min(1, 'Confirm password'),
    email: z.string().email(),
  })
  .refine(data => data.password === data.confirm_password, {
    message: 'Passwords must match.',
    path: ['confirm_password']
  });
