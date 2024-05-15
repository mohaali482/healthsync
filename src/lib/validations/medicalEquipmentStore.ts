import { z } from 'zod';

export const medicalEquipmentStoreForm = z.object({
  medicalEquipmentId: z.number().min(1, { message: 'This field is required' }),
  quantity: z.number().min(0, { message: 'This field is required' }),
  thresholdLevel: z.number().min(0, { message: 'This field is required' })
});

export const medicalEquipmentStoreEditForm = z.object({
  quantity: z.number().min(0, { message: 'This field is required' }),
  thresholdLevel: z.number().min(0, { message: 'This field is required' })
});
