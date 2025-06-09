import { z } from 'zod';

export enum AddressType {
  BILLING = 'BILLING',
  SHIPPING = 'SHIPPING',
}

export const addressSchema = z.object({
  street: z.string(),
  number: z.string().or(z.number()),
  city: z.string(),
  state: z.string(),
  zipCode: z.string().regex(/^\d+$/, 'Zip code must be numeric'),
  type: z.nativeEnum(AddressType),
});

export const phoneNumberSchema = z
  .string()
  .min(10)
  .max(15)
  .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number');

export const ssnSchema = z.string().length(9, {
  message: 'Social Security Number must be exactly 9 digits',
});