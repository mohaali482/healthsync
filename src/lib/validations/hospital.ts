import { z } from 'zod';

export const hospitalSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  region: z.string().min(1, 'Region is required'),
  city: z.string().min(1, 'City is required'),
  zone: z.string().min(1, 'Zone is required'),
  woreda: z.string().min(1, 'Woreda is required'),

  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email(),
  password: z.string().min(1, 'Password is required')
});

export const hospitalAdminSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email(),
  password: z.string().min(1, 'Password is required')
});

export const hospitalAdminEditSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email()
});

export const hospitalEditSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  region: z.string().min(1, 'Region is required'),
  city: z.string().min(1, 'City is required'),
  zone: z.string().min(1, 'Zone is required'),
  woreda: z.string().min(1, 'Woreda is required')
});
