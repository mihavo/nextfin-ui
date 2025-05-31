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
    phoneNumber: z
      .string()
      .length(10, { message: 'Phone number must be exactly 10 digits' }),
    socialSecurityNumber: z
      .string()
      .length(9, {
        message: 'Social Security Number must be exactly 9 digits',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

  
export const addressSchema = z.object({
  street: z.string(),
  number: z.string().or(z.number()),
  city: z.string(),
  state: z.string(),
  zipCode: z.string().regex(/^\d+$/, 'Zip code must be numeric'),
  addressType: z.enum(['BILLING', 'SHIPPING']),
});

export const holderSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z
    .string()
    .regex(/^\d{2}-\d{2}-\d{4}$/, 'Invalid date format (DD-MM-YYYY)'),
  phoneNumber: z.string(),
  address: addressSchema,
});

