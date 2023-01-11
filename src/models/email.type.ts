import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address').brand('email');

export type Email = z.infer<typeof emailSchema>;
