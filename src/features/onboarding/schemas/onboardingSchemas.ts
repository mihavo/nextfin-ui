import { z } from 'zod';

export const termsSchema = z.object({
  acceptedTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the Terms of Service to continue',
  }),
});
