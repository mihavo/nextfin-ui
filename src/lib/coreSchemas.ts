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
  .min(7)
  .max(15)
  .regex(/^\+?[0-9]{7,15}$/, 'Invalid phone number');
