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
