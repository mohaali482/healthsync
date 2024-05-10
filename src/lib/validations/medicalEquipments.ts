import { z } from 'zod';

export const equipmentForm = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string()
});
