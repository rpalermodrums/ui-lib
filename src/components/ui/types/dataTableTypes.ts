import { z } from 'zod';

export type InvoiceStatus = 'pending' | 'processing' | 'success' | 'failed';

export const Payment = z.object({
  id: z.string(),
  amount: z.number(),
  status: z.union([
    z.literal('pending'),
    z.literal('processing'),
    z.literal('success'),
    z.literal('failed'),
  ]),
  email: z.string(),
});
