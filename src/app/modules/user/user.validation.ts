import { z } from 'zod';

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.enum(['admin', 'user','tourGuide']).optional(),
  }),
});

export const UserValidations = {
  updateUserValidationSchema,
};