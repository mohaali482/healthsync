import { z } from 'zod';

export const reportsForm = z.object({
  diseaseId: z.number().min(1, { message: 'This field is required' }),
  confirmedCase: z.number().min(1, { message: 'This field is required' }),
  confirmedDeath: z.number().min(0, { message: 'This field is required' }),
  reportDate: z.date()
});
