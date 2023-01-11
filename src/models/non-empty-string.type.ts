import { z } from 'zod';

export const nonEmptyStringSchema = z.string().min(1, 'This value cannot be empty').brand('nonEmptyString');

export type NonEmptyString = z.infer<typeof nonEmptyStringSchema>;
