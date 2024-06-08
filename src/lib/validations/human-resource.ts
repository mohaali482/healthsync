import { z } from 'zod';

export const humanResourceType = ['DOCTOR', 'NURSE'] as const;

export const humanResourceForm = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  type: z.enum(humanResourceType, {
    required_error: 'Select a human resource type from the list'
  })
});
