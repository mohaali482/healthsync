import { z } from 'zod';

export const assetTypes = ['CAR', 'MEDICAL_EQUIPMENT', 'OTHER'] as const;

export const assetForm = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string(),
  quantity: z.number().min(1, { message: 'Quantity is required' }),
  assetType: z.enum(assetTypes, {
    required_error: 'Select an asset type from the list'
  })
});
