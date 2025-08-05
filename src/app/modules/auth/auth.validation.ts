import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ error: 'Name is required.' }),
    email: z.email({ error: 'Please give a valid email.' }),
    password: z.string({ error: 'Password is required.' }),
    phone: z.string({ error: 'Phone number is required.' }),
    address: z.string({ error: 'Address is required.' }),
    role: z.enum(['admin', 'user','tourGuide']).optional(),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.email({error:"Email is required."}),
    password: z.string({ error: 'Password is required.' }),
  }),
});

export const AuthValidations = {
  createUserValidationSchema,
  loginUserValidationSchema,
};