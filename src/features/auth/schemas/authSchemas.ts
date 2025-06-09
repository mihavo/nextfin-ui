import { addressSchema, phoneNumberSchema, ssnSchema } from '@/lib/coreSchemas';
import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: 'Username must be at least 2 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    phoneNumber: phoneNumberSchema,
    socialSecurityNumber: ssnSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const holderSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.date().refine((date) => date <= new Date(), {
    message: 'Date of birth must be in the past',
  }),
  phoneNumber: phoneNumberSchema,
  address: addressSchema,
});
